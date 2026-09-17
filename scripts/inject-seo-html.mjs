import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const seoPages = JSON.parse(fs.readFileSync(path.join(root, 'scripts/seo-pages.json'), 'utf8'));

const SITE_URL = seoPages.siteUrl;
const DEFAULT_OG_PATH = '/og-image.png';
const PAGE_OG_IMAGES = {
  '/': '/og-image.png',
  '/json-formatter': '/og/json-formatter.png',
  '/base64': '/og/base64.png',
  '/hash': '/og/hash.png',
  '/uuid': '/og/uuid.png',
  '/regex': '/og/regex.png',
  '/timestamp': '/og/timestamp.png',
};

const pageMeta = {
  '/': {
    title: 'ByteToolBox — Free Developer Tools for JSON, Base64, Hashes, UUIDs, Regex & Timestamps',
    description:
      'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
  },
  '/json-formatter': {
    title: 'JSON Formatter & Validator - Free Online Tool | ByteToolBox',
    description:
      'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting, error detection, and minification.',
  },
  '/base64': {
    title: 'Base64 Encoder & Decoder - Free Online Tool | ByteToolBox',
    description:
      'Encode and decode Base64 strings with Unicode support and file handling. Free, private, browser-based Base64 tool.',
  },
  '/hash': {
    title: 'Hash Generator - SHA-256, SHA-512, MD5 | ByteToolBox',
    description:
      'Generate SHA-256, SHA-512, SHA-1, and MD5 hashes online. Compare hashes and hash file contents locally in your browser.',
  },
  '/uuid': {
    title: 'UUID Generator (v4) - Bulk UUID Creator | ByteToolBox',
    description:
      'Generate UUID v4 identifiers in bulk with formatting options. Free online UUID generator that runs locally in your browser.',
  },
  '/regex': {
    title: 'Regex Tester - Test Regular Expressions Online | ByteToolBox',
    description:
      'Test regular expressions with real-time matching, flags, and pattern examples. Free regex tester for developers.',
  },
  '/timestamp': {
    title: 'Timestamp Converter - Unix Time to Date | ByteToolBox',
    description:
      'Convert Unix timestamps to human-readable dates and back. Supports multiple timezones with live current time.',
  },
  '/blog': {
    title: 'Developer Blog - ByteToolBox | Tips, Tutorials & Guides',
    description:
      'Developer tips, tutorials, and guides for JSON, Base64, hashing, regex, UUIDs, and more.',
  },
  '/about': {
    title: 'About ByteToolBox - Privacy-Focused Developer Tools',
    description:
      'Learn about ByteToolBox — free developer tools that run entirely in your browser with a privacy-first approach.',
  },
  '/comparisons': {
    title: 'ByteToolBox vs Other Developer Tools | Feature Comparison',
    description:
      'Compare ByteToolBox with other developer tool websites for privacy, speed, and tool coverage.',
  },
  '/faq': {
    title: 'Frequently Asked Questions - ByteToolBox',
    description:
      'Answers to common questions about ByteToolBox developer tools, privacy, analytics, and usage.',
  },
  '/privacy': {
    title: 'Privacy Policy - ByteToolBox',
    description: 'How ByteToolBox handles privacy, local processing, cookies, and Google Analytics.',
  },
  '/terms': {
    title: 'Terms of Service - ByteToolBox',
    description: 'Terms of service for using ByteToolBox developer tools.',
  },
};

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
    const title =
      parseBlogField(blogPostsFile, slug, 'metaTitle') ??
      parseBlogField(blogPostsFile, slug, 'title') ??
      `${slugToTitle(slug)} | ByteToolBox Blog`;
    const description =
      parseBlogField(blogPostsFile, slug, 'metaDescription') ??
      parseBlogField(blogPostsFile, slug, 'excerpt') ??
      `Read ${slugToTitle(slug)} on the ByteToolBox developer blog.`;
    return {
      slug,
      title,
      description,
      relatedToolRoute: parseBlogField(blogPostsFile, slug, 'relatedToolRoute'),
    };
  });
}

function ogImageUrl(ogPath) {
  return `${SITE_URL}${ogPath ?? DEFAULT_OG_PATH}`;
}

function injectMeta(html, { title, description, canonical, ogImage, noindex = false }) {
  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}" />`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  out = out.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${ogImageUrl(ogImage)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`
  );
  out = out.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${ogImageUrl(ogImage)}" />`
  );
  return out;
}

function writeRouteHtml(routePath, meta) {
  const templatePath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  const canonical = `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
  const ogImage = meta.ogImage ?? PAGE_OG_IMAGES[routePath] ?? DEFAULT_OG_PATH;
  const html = injectMeta(template, { ...meta, canonical, ogImage });

  if (routePath === '/') {
    fs.writeFileSync(templatePath, html);
    return;
  }

  const dir = path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

for (const [routePath, meta] of Object.entries(pageMeta)) {
  writeRouteHtml(routePath, meta);
}

for (const post of loadBlogMeta()) {
  writeRouteHtml(`/blog/${post.slug}`, {
    title: post.title,
    description: post.description,
    ogImage: PAGE_OG_IMAGES[post.relatedToolRoute] ?? DEFAULT_OG_PATH,
  });
}

console.log(`Injected SEO HTML for ${Object.keys(pageMeta).length + seoPages.blogSlugs.length} routes`);
