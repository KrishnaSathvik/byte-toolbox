import type { BlogPost } from '@/data/blogPosts';

/** Compact “Start here” row on /blog */
export const BLOG_START_HERE_SLUGS = [
  'find-and-fix-invalid-json-examples',
  'unix-timestamp-to-date-developer-cheat-sheet',
  'verify-file-integrity-sha-256-checksum',
] as const;

/** Priority when capping featured posts (max 3) */
export const BLOG_FEATURED_PRIORITY_SLUGS = [
  'unix-timestamp-to-date-developer-cheat-sheet',
  'find-and-fix-invalid-json-examples',
  'base64url-jwt-api-encoding-rules',
] as const;

export const BLOG_CATEGORY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'json', label: 'JSON' },
  { id: 'base64', label: 'Base64' },
  { id: 'hashing', label: 'Hashing' },
  { id: 'uuid', label: 'UUIDs' },
  { id: 'regex', label: 'Regex' },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'security', label: 'Security' },
  { id: 'performance', label: 'Performance' },
] as const;

export type BlogDisplayCategory = (typeof BLOG_CATEGORY_FILTERS)[number]['id'];

function matchesDisplayCategory(post: BlogPost, categoryId: string): boolean {
  if (categoryId === 'all') {
    return true;
  }

  const tagText = post.tags.join(' ').toLowerCase();
  const slug = post.slug.toLowerCase();

  switch (categoryId) {
    case 'json':
      return tagText.includes('json') || slug.includes('json');
    case 'base64':
      return tagText.includes('base64') || slug.includes('base64');
    case 'hashing':
      return (
        tagText.includes('hash') ||
        tagText.includes('sha') ||
        tagText.includes('checksum') ||
        slug.includes('hash') ||
        slug.includes('sha') ||
        slug.includes('checksum')
      );
    case 'uuid':
      return post.category === 'uuid' || tagText.includes('uuid') || slug.includes('uuid');
    case 'regex':
      return post.category === 'regex' || tagText.includes('regex') || slug.includes('regex');
    case 'timestamps':
      return (
        tagText.includes('timestamp') ||
        tagText.includes('unix') ||
        tagText.includes('iso 8601') ||
        slug.includes('timestamp') ||
        slug.includes('iso-8601')
      );
    case 'security':
      return post.category === 'security';
    case 'performance':
      return post.category === 'performance';
    default:
      return false;
  }
}

export function filterPostsByDisplayCategory(posts: BlogPost[], categoryId: string): BlogPost[] {
  return posts.filter((post) => matchesDisplayCategory(post, categoryId));
}

export function getPostDisplayBadge(post: BlogPost): string {
  if (post.relatedToolRoute === '/json-formatter') return 'JSON';
  if (post.relatedToolRoute === '/base64') return 'Base64';
  if (post.relatedToolRoute === '/hash') return 'Hashing';
  if (post.relatedToolRoute === '/uuid') return 'UUIDs';
  if (post.relatedToolRoute === '/regex') return 'Regex';
  if (post.relatedToolRoute === '/timestamp') return 'Timestamps';
  if (post.category === 'security') return 'Security';
  if (post.category === 'performance') return 'Performance';
  return post.tags[0] ?? 'Guide';
}

export function pickFeaturedPosts(posts: BlogPost[], max = 3): BlogPost[] {
  const featured = posts.filter((post) => post.featured);
  const byPriority = BLOG_FEATURED_PRIORITY_SLUGS.map((slug) =>
    featured.find((post) => post.slug === slug)
  ).filter((post): post is BlogPost => Boolean(post));

  const remaining = featured
    .filter((post) => !BLOG_FEATURED_PRIORITY_SLUGS.includes(post.slug as (typeof BLOG_FEATURED_PRIORITY_SLUGS)[number]))
    .sort((a, b) => b.date.localeCompare(a.date));

  return [...byPriority, ...remaining].slice(0, max);
}

export function filterPostsBySearch(posts: BlogPost[], query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return posts;
  }

  return posts.filter((post) => {
    const toolRoute = post.relatedToolRoute?.replace('/', '') ?? '';
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      toolRoute.includes(q) ||
      post.slug.replace(/-/g, ' ').includes(q)
    );
  });
}
