import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ALLOW_TRAINING_CRAWLERS,
  INDEXNOW_KEY,
  LLMS_ABOUT,
  LLMS_GUIDES,
  RELATED_SITES,
  SEARCH_CRAWLERS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STATIC_PAGES,
  TOOLS,
  TRAINING_CRAWLERS,
} from './site-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const lastmod = new Date().toISOString().split('T')[0];

const blogDir = path.join(root, 'src/data/blog');
const blogSlugs = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace(/\.ts$/, ''));

const allPages = [
  ...STATIC_PAGES.map((page) => ({
    loc: page.path,
    changefreq: page.changefreq,
    priority: page.priority,
  })),
  ...blogSlugs.map((slug) => ({
    loc: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

export function buildSitemapXml(pages = allPages, modified = lastmod) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${modified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>
`;
}

export function buildRobotsTxt({ allowTraining = ALLOW_TRAINING_CRAWLERS } = {}) {
  const directive = (allow) => (allow ? 'Allow: /' : 'Disallow: /');
  const blocks = (agents, allow) =>
    agents.map((agent) => `User-agent: ${agent}\n${directive(allow)}`).join('\n\n');
  const trainingPolicy = allowTraining ? 'allow' : 'disallow';

  return `# ${SITE_NAME}
# ${SITE_URL}

User-agent: *
Allow: /

# Search and discovery
${blocks(SEARCH_CRAWLERS, true)}

# Training — separate from search. Currently: ${trainingPolicy}
${blocks(TRAINING_CRAWLERS, allowTraining)}

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function buildLlmsTxt() {
  const toolsList = TOOLS.map(
    (tool) => `- [${tool.name}](${SITE_URL}${tool.path}): ${tool.llmsDescription}`
  ).join('\n');

  const guidesList = LLMS_GUIDES.map(
    (guide) => `- [${guide.name}](${SITE_URL}${guide.path}): ${guide.description}`
  ).join('\n');

  const aboutList = LLMS_ABOUT.map(
    (page) => `- [${page.name}](${SITE_URL}${page.path})`
  ).join('\n');

  const relatedList = RELATED_SITES.map(
    (site) => `- [${site.name}](${site.url}): ${site.description}`
  ).join('\n');

  const summary = SITE_DESCRIPTION.trim().split('\n').join('\n> ');

  return `# ${SITE_NAME}

> ${summary}

## Tools

${toolsList}

## Guides

${guidesList}

## About

${aboutList}

## Related sites

${relatedList}
`;
}

async function pingIndexNow(urls) {
  const shouldPing =
    process.env.INDEXNOW_PING === '1' || process.env.VERCEL_ENV === 'production';

  if (!shouldPing) {
    console.log('Skipping IndexNow ping (set INDEXNOW_PING=1 or VERCEL_ENV=production to enable)');
    return;
  }

  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`IndexNow ping returned HTTP ${response.status}`);
      return;
    }

    console.log(`IndexNow notified for ${urls.length} URLs`);
  } catch (error) {
    console.warn(`IndexNow ping failed: ${error instanceof Error ? error.message : error}`);
  }
}

function writeDiscoveryFiles() {
  const sitemapXml = buildSitemapXml();
  const robotsTxt = buildRobotsTxt();
  const llmsTxt = buildLlmsTxt();

  fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(root, 'public/robots.txt'), robotsTxt);
  fs.writeFileSync(path.join(root, 'public/llms.txt'), llmsTxt);
  fs.writeFileSync(path.join(root, 'public', `${INDEXNOW_KEY}.txt`), `${INDEXNOW_KEY}\n`);

  const apiSitemap = `export default function handler(req, res) {
  const sitemap = ${JSON.stringify(sitemapXml)};
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(sitemap);
};
`;

  fs.writeFileSync(path.join(root, 'api/sitemap.xml.js'), apiSitemap);

  fs.writeFileSync(
    path.join(root, 'scripts/seo-pages.json'),
    JSON.stringify(
      {
        siteUrl: SITE_URL,
        lastmod,
        routes: allPages.map((page) => page.loc),
        blogSlugs,
      },
      null,
      2
    )
  );

  console.log(
    `Generated discovery files: sitemap (${allPages.length} URLs), robots.txt, llms.txt, IndexNow key (lastmod: ${lastmod})`
  );

  return allPages.map((page) => `${SITE_URL}${page.loc}`);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const urls = writeDiscoveryFiles();
  await pingIndexNow(urls);
}
