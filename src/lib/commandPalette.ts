import { blogPosts } from '@/data/blogPosts';

export type CommandPaletteItemType = 'tool' | 'guide' | 'page';

export interface CommandPaletteTool {
  type: 'tool';
  name: string;
  path: string;
  keywords: string[];
}

export interface CommandPaletteGuide {
  type: 'guide';
  title: string;
  path: string;
  excerpt: string;
  keywords: string[];
}

export interface CommandPalettePage {
  type: 'page';
  title: string;
  path: string;
  keywords: string[];
}

export type CommandPaletteItem = CommandPaletteTool | CommandPaletteGuide | CommandPalettePage;

export const COMMAND_PALETTE_TOOLS: CommandPaletteTool[] = [
  {
    type: 'tool',
    name: 'JSON Formatter',
    path: '/json-formatter',
    keywords: ['json', 'format', 'validate', 'invalid json', 'prettify'],
  },
  {
    type: 'tool',
    name: 'Base64 Encoder',
    path: '/base64',
    keywords: ['base64', 'encode', 'decode', 'base64url', 'jwt', 'unicode'],
  },
  {
    type: 'tool',
    name: 'Hash Generator',
    path: '/hash',
    keywords: ['hash', 'sha-256', 'sha256', 'sha-512', 'checksum', 'md5'],
  },
  {
    type: 'tool',
    name: 'UUID Generator',
    path: '/uuid',
    keywords: ['uuid', 'guid', 'v4', 'uuid v4'],
  },
  {
    type: 'tool',
    name: 'Regex Tester',
    path: '/regex',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'flags'],
  },
  {
    type: 'tool',
    name: 'Timestamp Converter',
    path: '/timestamp',
    keywords: ['timestamp', 'unix time', 'epoch', 'iso 8601', 'utc'],
  },
];

export const COMMAND_PALETTE_PAGES: CommandPalettePage[] = [
  { type: 'page', title: 'About ByteToolBox', path: '/about', keywords: ['about', 'privacy'] },
  { type: 'page', title: 'FAQ', path: '/faq', keywords: ['faq', 'help', 'questions'] },
  { type: 'page', title: 'Developer Guides', path: '/blog', keywords: ['blog', 'guides', 'tutorials'] },
  { type: 'page', title: 'Tool Comparisons', path: '/comparisons', keywords: ['compare', 'alternatives'] },
];

export const COMMAND_PALETTE_GUIDES: CommandPaletteGuide[] = blogPosts.map((post) => ({
  type: 'guide' as const,
  title: post.title,
  path: `/blog/${post.slug}`,
  excerpt: post.excerpt,
  keywords: [
    ...post.tags,
    post.category,
    post.slug.replace(/-/g, ' '),
    ...(post.relatedToolRoute ? [post.relatedToolRoute.replace('/', '')] : []),
  ],
}));

export const COMMAND_PALETTE_ITEMS: CommandPaletteItem[] = [
  ...COMMAND_PALETTE_TOOLS,
  ...COMMAND_PALETTE_GUIDES,
  ...COMMAND_PALETTE_PAGES,
];

function matchesQuery(text: string, q: string): boolean {
  return text.toLowerCase().includes(q);
}

export function filterCommandPaletteItems(query: string): CommandPaletteItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return COMMAND_PALETTE_ITEMS;
  }

  return COMMAND_PALETTE_ITEMS.filter((item) => {
    if (item.type === 'tool') {
      return (
        matchesQuery(item.name, q) || item.keywords.some((keyword) => matchesQuery(keyword, q))
      );
    }

    if (item.type === 'page') {
      return (
        matchesQuery(item.title, q) || item.keywords.some((keyword) => matchesQuery(keyword, q))
      );
    }

    return (
      matchesQuery(item.title, q) ||
      matchesQuery(item.excerpt, q) ||
      item.keywords.some((keyword) => matchesQuery(keyword, q))
    );
  });
}

export function getCommandPaletteItemLabel(item: CommandPaletteItem): string {
  if (item.type === 'tool') {
    return item.name;
  }
  return item.title;
}

export const COMMAND_PALETTE_TYPE_LABELS: Record<CommandPaletteItemType, string> = {
  tool: 'Tool',
  guide: 'Guide',
  page: 'Page',
};
