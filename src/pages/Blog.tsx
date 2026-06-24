import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Wrench } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts, getBlogPostBySlug, type BlogPost } from '@/data/blogPosts';
import { getBlogTool } from '@/lib/blogTools';
import { SITE_URL } from '@/lib/seoConstants';
import {
  BLOG_CATEGORY_FILTERS,
  BLOG_START_HERE_SLUGS,
  filterPostsByDisplayCategory,
  filterPostsBySearch,
  getPostDisplayBadge,
} from '@/lib/blogDisplay';

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'Developer Blog - ByteToolBox | Tips, Tutorials & Development Guides',
    description:
      'Discover developer tips, tutorials, and guides for using ByteToolBox tools effectively. Learn about JSON formatting, Base64 encoding, hash generation, and more.',
    keywords:
      'developer blog, programming tips, development tutorials, JSON guide, Base64 tutorial, hash generation, developer tools',
    canonical: `${SITE_URL}/blog`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'ByteToolBox Developer Blog',
      description: 'Developer tips, tutorials, and guides for using ByteToolBox tools effectively.',
      url: `${SITE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'ByteToolBox',
        url: SITE_URL,
      },
      inLanguage: 'en-US',
    },
  });

  const startHerePosts = BLOG_START_HERE_SLUGS.map((slug) => getBlogPostBySlug(slug)).filter(
    (post): post is BlogPost => Boolean(post)
  );

  const filteredPosts = useMemo(() => {
    const byCategory = filterPostsByDisplayCategory(blogPosts, selectedCategory);
    return filterPostsBySearch(byCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <ToolLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-6xl mx-auto text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Developer Guides
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practical references for JSON, encoding, checksums, UUIDs, regex, timestamps, and API
            debugging.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-12 max-w-6xl mx-auto space-y-10">
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1">Start here</h2>
          <p className="text-sm text-muted-foreground mb-4">
            High-intent guides for common developer workflows.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {startHerePosts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                Browse guides
              </h2>
              <p className="text-sm text-muted-foreground">Filter by topic or search.</p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides..."
                aria-label="Search blog posts"
                className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by category">
            {BLOG_CATEGORY_FILTERS.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10 text-sm">
              No guides match your search. Try a different term or category.
            </p>
          )}
        </section>
      </div>
    </ToolLayout>
  );
};

type PostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const badge = getPostDisplayBadge(post);
  const tool = post.relatedToolRoute ? getBlogTool(post.relatedToolRoute) : undefined;

  return (
    <article
      className={`dev-card-hover flex flex-col h-full overflow-hidden ${
        featured ? 'border-primary/20 bg-primary/[0.03]' : ''
      }`}
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="dev-badge text-primary border-primary/20 bg-primary/10">{badge}</span>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h3
          className={`font-semibold text-foreground mb-2 leading-snug ${
            featured ? 'text-base sm:text-lg' : 'text-base'
          }`}
        >
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-3">
            {tool && (
              <Link
                to={tool.route}
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                Try tool
              </Link>
            )}
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
            >
              Read more
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
