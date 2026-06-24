import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE_URL = 'https://www.bytetoolbox.com';
const lastmod = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/json-formatter', changefreq: 'weekly', priority: '0.9' },
  { loc: '/base64', changefreq: 'weekly', priority: '0.9' },
  { loc: '/hash', changefreq: 'weekly', priority: '0.9' },
  { loc: '/uuid', changefreq: 'weekly', priority: '0.9' },
  { loc: '/regex', changefreq: 'weekly', priority: '0.9' },
  { loc: '/timestamp', changefreq: 'weekly', priority: '0.9' },
  { loc: '/blog', changefreq: 'daily', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/comparisons', changefreq: 'weekly', priority: '0.7' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.6' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const blogDir = path.join(root, 'src/data/blog');
const blogSlugs = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace(/\.ts$/, ''));

const blogPages = blogSlugs.map((slug) => ({
  loc: `/blog/${slug}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

const allPages = [...staticPages, ...blogPages];

function buildSitemapXml() {
  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
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

const sitemapXml = buildSitemapXml();
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemapXml);

const apiSitemap = `export default function handler(req, res) {
  const sitemap = ${JSON.stringify(sitemapXml)};
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(sitemap);
};
`;

fs.writeFileSync(path.join(root, 'api/sitemap.xml.js'), apiSitemap);

const seoPagesPath = path.join(root, 'scripts/seo-pages.json');
fs.writeFileSync(
  seoPagesPath,
  JSON.stringify(
    {
      siteUrl: SITE_URL,
      lastmod,
      routes: allPages.map((p) => p.loc),
      blogSlugs,
    },
    null,
    2
  )
);

console.log(`Generated sitemap with ${allPages.length} URLs (lastmod: ${lastmod})`);
