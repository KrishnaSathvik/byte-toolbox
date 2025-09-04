export default function handler(req, res) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>https://www.bytetoolbox.com/</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Developer Tools Pages -->
  <url>
    <loc>https://www.bytetoolbox.com/json-formatter</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/base64</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/hash</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/uuid</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/regex</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/timestamp</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Content Pages -->
  <url>
    <loc>https://www.bytetoolbox.com/blog</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/about</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/comparisons</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/faq</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Legal Pages -->
  <url>
    <loc>https://www.bytetoolbox.com/privacy</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://www.bytetoolbox.com/terms</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(sitemap);
}
