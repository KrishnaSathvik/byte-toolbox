export interface BlogToolLink {
  route: string;
  label: string;
  description: string;
}

export const BLOG_TOOLS: Record<string, BlogToolLink> = {
  '/json-formatter': {
    route: '/json-formatter',
    label: 'JSON Formatter',
    description: 'Format, validate, and minify JSON in your browser.',
  },
  '/base64': {
    route: '/base64',
    label: 'Base64 Encoder & Decoder',
    description: 'Encode and decode Base64 with Unicode support.',
  },
  '/hash': {
    route: '/hash',
    label: 'Hash Generator',
    description: 'Generate SHA-256, SHA-512, SHA-1, and MD5 checksums.',
  },
  '/uuid': {
    route: '/uuid',
    label: 'UUID Generator',
    description: 'Generate UUID v4 identifiers in bulk.',
  },
  '/regex': {
    route: '/regex',
    label: 'Regex Tester',
    description: 'Test regular expressions with live matching.',
  },
  '/timestamp': {
    route: '/timestamp',
    label: 'Timestamp Converter',
    description: 'Convert Unix timestamps to dates and back.',
  },
};

export function getBlogTool(route: string): BlogToolLink | undefined {
  return BLOG_TOOLS[route];
}
