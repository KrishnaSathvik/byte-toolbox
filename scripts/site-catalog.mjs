export const SITE_URL = 'https://www.bytetoolbox.com';
export const SITE_NAME = 'ByteToolBox';
export const SITE_DESCRIPTION = `ByteToolBox provides free, privacy-first browser-based developer tools.
Tools run locally in the user's browser and include JSON formatting,
Base64 encoding and decoding, hashing, UUID generation, regex testing,
and timestamp conversion.`;

/** Public IndexNow key (hosted at /{key}.txt). This is a verification token, not a secret. */
export const INDEXNOW_KEY = 'a7f3c91e4b6d28e05c1a9f47d3e8b260';

export const SEARCH_CRAWLERS = [
  'Googlebot',
  'OAI-SearchBot',
  'Claude-SearchBot',
  'Claude-User',
];

export const TRAINING_CRAWLERS = ['GPTBot', 'ClaudeBot', 'Google-Extended'];

/** Flip to false to opt public pages out of model-training crawls. Search crawlers stay allowed. */
export const ALLOW_TRAINING_CRAWLERS = true;

export const TOOLS = [
  {
    path: '/json-formatter',
    name: 'JSON Formatter',
    llmsDescription: 'Format, validate, and debug JSON locally in the browser.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/base64',
    name: 'Base64 Encoder & Decoder',
    llmsDescription: 'Encode and decode Base64 and Base64URL data.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/hash',
    name: 'Hash Generator',
    llmsDescription: 'Generate SHA-256 and SHA-512 hashes locally.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/uuid',
    name: 'UUID Generator',
    llmsDescription: 'Generate UUID v4 values.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/regex',
    name: 'Regex Tester',
    llmsDescription: 'Test regular expressions against sample text.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/timestamp',
    name: 'Timestamp Converter',
    llmsDescription: 'Convert Unix timestamps, UTC, and ISO dates.',
    changefreq: 'weekly',
    priority: '0.9',
  },
];

export const STATIC_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  ...TOOLS.map(({ path, changefreq, priority }) => ({ path, changefreq, priority })),
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/comparisons', changefreq: 'weekly', priority: '0.7' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

export const LLMS_GUIDES = [
  {
    path: '/blog',
    name: 'Developer Guides',
    description: 'Practical references for JSON, Base64, hashing, regex, UUIDs, and timestamps.',
  },
  {
    path: '/blog/find-and-fix-invalid-json-examples',
    name: 'How to Find and Fix Invalid JSON',
    description: 'Fix trailing commas, unquoted keys, comments, and other common JSON errors.',
  },
  {
    path: '/blog/unix-timestamp-to-date-developer-cheat-sheet',
    name: 'Unix Timestamp to Date Cheat Sheet',
    description: 'Convert epoch time, seconds vs milliseconds, UTC, and ISO-8601 dates.',
  },
  {
    path: '/blog/verify-file-integrity-sha-256-checksum',
    name: 'Verify File Integrity With SHA-256',
    description: 'Generate and compare SHA-256 checksums for downloads and release artifacts.',
  },
  {
    path: '/blog/base64url-jwt-api-encoding-rules',
    name: 'Base64URL and JWT Encoding Rules',
    description: 'When to use Base64 vs Base64URL for APIs, JWTs, and URL-safe payloads.',
  },
];

export const LLMS_ABOUT = [
  { path: '/about', name: 'About ByteToolBox' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/faq', name: 'FAQ' },
];

export const RELATED_SITES = [
  {
    name: 'TextCraft',
    url: 'https://www.textcraft.dev/',
    description: 'Browser tools for counting, cleaning, converting, comparing, and organizing text.',
  },
  {
    name: 'SecureTools',
    url: 'https://www.securetools.dev/',
    description: 'Browser security tools for passwords, encryption, 2FA, random data, and privacy.',
  },
];
