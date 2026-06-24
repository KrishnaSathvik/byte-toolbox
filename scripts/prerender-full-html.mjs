import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const seoPagesPath = path.join(root, 'scripts/seo-pages.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const PRERENDER_READY_EVENT = 'bytetoolbox-prerender-ready';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchBrowser() {
  const puppeteer = await import('puppeteer-core');

  if (process.env.VERCEL === '1') {
    const chromium = (await import('@sparticuz/chromium')).default;
    chromium.setHeadlessMode = true;
    chromium.setGraphicsMode = false;

    return puppeteer.default.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { chromium } = await import('playwright');
  return puppeteer.default.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: chromium.executablePath(),
    headless: true,
  });
}

const ROUTE_CONTENT_CHECKS = {
  '/': ['ByteToolBox', 'JSON Formatter', 'Popular developer guides'],
  '/json-formatter': ['JSON Formatter & Validator', 'Input JSON', 'Why Use Our JSON Formatter?'],
  '/base64': ['Base64', 'Encode'],
  '/hash': ['Hash Generator', 'SHA-256', 'Recommended', 'Legacy', 'Argon2'],
  '/uuid': ['UUID', 'UUID v4'],
  '/regex': ['Regex', 'pattern'],
  '/timestamp': ['Timestamp', 'Convert'],
  '/blog': ['Developer Guides', 'Start here'],
  '/about': ['About ByteToolBox', 'Our Mission'],
  '/comparisons': ['ByteToolBox vs Competitors', 'Key Advantages'],
  '/faq': ['Frequently Asked Questions', 'What is ByteToolBox?'],
  '/privacy': ['Privacy Policy', 'Google Analytics'],
  '/terms': ['Terms of Service'],
};

function isAssetPath(pathname) {
  return pathname.startsWith('/assets/') || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function parseBlogField(blogPostsFile, slug, field) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `slug: '${escaped}',[\\s\\S]*?\\n\\s*${field}: (["'])((?:\\\\.|(?!\\1).)*)\\1`
  );
  const match = blogPostsFile.match(pattern);
  return match?.[2]?.replace(/\\'/g, "'").replace(/\\"/g, '"') ?? null;
}

function loadBlogMeta() {
  const blogPostsFile = fs.readFileSync(path.join(root, 'src/data/blogPosts.ts'), 'utf8');
  const slugs = fs
    .readdirSync(path.join(root, 'src/data/blog'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace(/\.ts$/, ''));

  return slugs.map((slug) => {
    const title = parseBlogField(blogPostsFile, slug, 'title') ?? slug;
    return {
      slug,
      route: `/blog/${slug}`,
      title,
    };
  });
}

function routeToOutputPath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function createStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const host = req.headers.host ?? '127.0.0.1';
        const url = new URL(req.url ?? '/', `http://${host}`);
        const pathname = decodeURIComponent(url.pathname);

        const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');

        if (isAssetPath(safePath)) {
          const candidate = path.join(distDir, safePath);
          if (candidate.startsWith(distDir) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            const ext = path.extname(candidate);
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] ?? 'application/octet-stream' });
            fs.createReadStream(candidate).pipe(res);
            return;
          }

          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Not found');
          return;
        }

        const spaIndex = path.join(distDir, 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(spaIndex).pipe(res);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Server error: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Failed to bind static server'));
        return;
      }
      resolve({ server, port: address.port });
    });
  });
}

function validateRenderedHtml(route, html, rootMetrics, blogMeta) {
  if (!rootMetrics || rootMetrics.innerHtmlLength < 100 || rootMetrics.textLength < 120) {
    throw new Error(
      `Route ${route} has empty or too-small #root content (${rootMetrics?.textLength ?? 0} chars)`
    );
  }
  if (rootMetrics.text.includes('Loading…')) {
    throw new Error(`Route ${route} still shows Suspense loading fallback`);
  }

  const blogPost = blogMeta.find((post) => post.route === route);
  if (blogPost) {
    if (!html.includes('<article')) {
      throw new Error(`Route ${route} is missing <article> element`);
    }
    if (!html.includes(blogPost.title)) {
      throw new Error(`Route ${route} is missing blog title "${blogPost.title}"`);
    }
    if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) {
      throw new Error(`Route ${route} is missing Article JSON-LD`);
    }
    return;
  }

  const checks = ROUTE_CONTENT_CHECKS[route];
  if (!checks) {
    throw new Error(`Route ${route} has no content validation rules`);
  }

  for (const snippet of checks) {
    if (!html.includes(snippet)) {
      throw new Error(`Route ${route} is missing expected content: "${snippet}"`);
    }
  }
}

async function waitForRouteReady(page) {
  await page.waitForFunction(
    () => {
      const root = document.querySelector('#root');
      if (!root) return false;
      const text = root.textContent?.replace(/\s+/g, ' ').trim() ?? '';
      return text.length > 120 && !text.includes('Loading…');
    },
    { timeout: 60000 }
  );

  await page
    .waitForFunction(
      (eventName) =>
        new Promise((resolve) => {
          const root = document.querySelector('#root');
          const text = root?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
          if (text.length > 120 && !text.includes('Loading…')) {
            resolve(true);
            return;
          }

          const onReady = () => resolve(true);
          document.addEventListener(eventName, onReady, { once: true });
          window.setTimeout(onReady, 5000);
        }),
      { timeout: 65000 },
      PRERENDER_READY_EVENT
    )
    .catch(() => {});

  await sleep(500);
}

async function getRootMetrics(page) {
  return page.evaluate(() => {
    const root = document.querySelector('#root');
    const text = root?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    return {
      innerHtmlLength: root?.innerHTML.trim().length ?? 0,
      textLength: text.length,
      text,
    };
  });
}

async function prerenderRoute(page, baseUrl, route, blogMeta) {
  const url = `${baseUrl}${route === '/' ? '/' : route}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await waitForRouteReady(page);

  const rootMetrics = await getRootMetrics(page);
  const html = await page.content();
  validateRenderedHtml(route, html, rootMetrics, blogMeta);

  const outputPath = routeToOutputPath(route);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, 'utf8');

  return outputPath;
}

async function main() {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    console.error('dist/index.html not found. Run vite build and inject-seo-html first.');
    process.exit(1);
  }

  if (!fs.existsSync(seoPagesPath)) {
    console.error('scripts/seo-pages.json not found. Run generate-sitemap first.');
    process.exit(1);
  }

  const seoPages = JSON.parse(fs.readFileSync(seoPagesPath, 'utf8'));
  const blogMeta = loadBlogMeta();
  const routes = seoPages.routes;

  const { server, port } = await createStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`Prerender server listening on ${baseUrl}`);

  const browser = await launchBrowser();
  const page = await browser.newPage();

  const failures = [];
  const successes = [];

  try {
    for (const route of routes) {
      try {
        const outputPath = await prerenderRoute(page, baseUrl, route, blogMeta);
        successes.push({ route, outputPath });
        console.log(`✓ Prerendered ${route}`);
      } catch (error) {
        failures.push({
          route,
          error: error instanceof Error ? error.message : String(error),
        });
        console.error(`✗ Failed ${route}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  } finally {
    await page.close();
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  console.log(`\nPrerender complete: ${successes.length}/${routes.length} routes`);

  if (failures.length > 0) {
    console.error('\nFailures:');
    for (const failure of failures) {
      console.error(`- ${failure.route}: ${failure.error}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
