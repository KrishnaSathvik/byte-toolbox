import { BLOG_TOOLS } from '@/lib/blogTools';
import { getBlogPostBySlug } from '@/data/blogPosts';

export const TOOL_GUIDE_SLUGS: Record<string, string> = {
  '/json-formatter': 'find-and-fix-invalid-json-examples',
  '/timestamp': 'iso-8601-dates-json-api-formatting',
  '/hash': 'verify-file-integrity-sha-256-checksum',
  '/base64': 'base64url-jwt-api-encoding-rules',
  '/regex': 'regex-flags-javascript-developer-reference',
  '/uuid': 'generate-uuid-v4-api-database-keys',
};

export const TOOL_RELATED_ROUTES: Record<string, string[]> = {
  '/json-formatter': ['/base64', '/hash'],
  '/base64': ['/json-formatter', '/hash'],
  '/hash': ['/base64', '/uuid'],
  '/uuid': ['/hash', '/json-formatter'],
  '/regex': ['/json-formatter', '/timestamp'],
  '/timestamp': ['/json-formatter', '/regex'],
};

export function getGuideForToolRoute(route: string) {
  const slug = TOOL_GUIDE_SLUGS[route];
  if (!slug) {
    return undefined;
  }
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return undefined;
  }
  return { slug, title: post.title, excerpt: post.excerpt };
}

export function getRelatedToolsForRoute(route: string) {
  const routes = TOOL_RELATED_ROUTES[route] ?? [];
  return routes
    .map((toolRoute) => BLOG_TOOLS[toolRoute])
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
}

export const HOMEPAGE_GUIDE_SLUGS = [
  'iso-8601-dates-json-api-formatting',
  'find-and-fix-invalid-json-examples',
  'base64url-jwt-api-encoding-rules',
  'verify-file-integrity-sha-256-checksum',
] as const;
