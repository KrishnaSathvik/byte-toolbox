export const SITE_URL = 'https://www.bytetoolbox.com';
export const SITE_NAME = 'ByteToolBox';
export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export interface PageSeoConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

export const STATIC_PAGE_SEO: PageSeoConfig[] = [
  {
    path: '/',
    title: 'ByteToolBox — Free Developer Tools for JSON, Base64, Hashes, UUIDs, Regex & Timestamps',
    description:
      'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
    keywords:
      'developer tools, JSON formatter, Base64 encoder, hash generator, UUID generator, regex tester, timestamp converter, online tools, free tools',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '/json-formatter',
    title: 'JSON Formatter & Validator - Free Online Tool | ByteToolBox',
    description:
      'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting, error detection, and minification.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON minifier',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/base64',
    title: 'Base64 Encoder & Decoder - Free Online Tool | ByteToolBox',
    description:
      'Encode and decode Base64 strings with Unicode support and file handling. Free, private, browser-based Base64 tool.',
    keywords: 'Base64 encoder, Base64 decoder, Base64 encode decode',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/hash',
    title: 'Hash Generator - SHA-256, SHA-512, MD5 | ByteToolBox',
    description:
      'Generate SHA-256, SHA-512, SHA-1, and MD5 hashes online. Compare hashes and hash file contents locally in your browser.',
    keywords: 'hash generator, SHA-256, MD5, checksum generator',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/uuid',
    title: 'UUID Generator (v4) - Bulk UUID Creator | ByteToolBox',
    description:
      'Generate UUID v4 identifiers in bulk with formatting options. Free online UUID generator that runs locally in your browser.',
    keywords: 'UUID generator, GUID generator, UUID v4, bulk UUID',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/regex',
    title: 'Regex Tester - Test Regular Expressions Online | ByteToolBox',
    description:
      'Test regular expressions with real-time matching, flags, and pattern examples. Free regex tester for developers.',
    keywords: 'regex tester, regular expression tester, regex online',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/timestamp',
    title: 'Timestamp Converter - Unix Time to Date | ByteToolBox',
    description:
      'Convert Unix timestamps to human-readable dates and back. Supports multiple timezones with live current time.',
    keywords: 'timestamp converter, unix timestamp, epoch converter',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/blog',
    title: 'Developer Blog - ByteToolBox | Tips, Tutorials & Guides',
    description:
      'Developer tips, tutorials, and guides for JSON, Base64, hashing, regex, UUIDs, and more.',
    keywords: 'developer blog, programming tips, development tutorials',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    path: '/about',
    title: 'About ByteToolBox - Privacy-Focused Developer Tools',
    description:
      'Learn about ByteToolBox — free developer tools that run entirely in your browser with a privacy-first approach.',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/comparisons',
    title: 'ByteToolBox vs Other Developer Tools | Feature Comparison',
    description:
      'Compare ByteToolBox with other developer tool websites for privacy, speed, and tool coverage.',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions - ByteToolBox',
    description:
      'Answers to common questions about ByteToolBox developer tools, privacy, analytics, and usage.',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy - ByteToolBox',
    description:
      'How ByteToolBox handles privacy, local processing, cookies, and Google Analytics.',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/terms',
    title: 'Terms of Service - ByteToolBox',
    description: 'Terms of service for using ByteToolBox developer tools.',
    changefreq: 'yearly',
    priority: 0.3,
  },
];

export function getPageSeoByPath(path: string): PageSeoConfig | undefined {
  return STATIC_PAGE_SEO.find((page) => page.path === path);
}
