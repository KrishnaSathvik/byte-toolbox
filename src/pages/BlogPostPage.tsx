import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts, getBlogPostBySlug, type BlogPost } from '@/data/blogPosts';
import { getBlogTool } from '@/lib/blogTools';
import { getPostDisplayBadge } from '@/lib/blogDisplay';
import { BlogMarkdown } from '@/components/blog/BlogMarkdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ogImageForPath, SITE_URL } from '@/lib/seoConstants';
import { breadcrumbListSchema } from '@/lib/structuredData';

interface BlogPostPageProps {
  slug?: string;
}

function buildArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ByteToolBox',
      url: SITE_URL,
    },
    keywords: post.tags.join(', '),
    inLanguage: 'en-US',
  };
}

function buildFaqSchema(post: BlogPost) {
  if (!post.faqs?.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function resolveRelatedPosts(slugs: string[] | undefined) {
  if (!slugs?.length) {
    return [];
  }

  return slugs
    .map((relatedSlug) => blogPosts.find((entry) => entry.slug === relatedSlug))
    .filter((entry): entry is BlogPost => Boolean(entry));
}

export const BlogPostPage = ({ slug: slugProp }: BlogPostPageProps) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp ?? slugParam ?? '';
  const post = getBlogPostBySlug(slug);
  const primaryTool = post?.relatedToolRoute ? getBlogTool(post.relatedToolRoute) : undefined;
  const relatedPosts = resolveRelatedPosts(post?.relatedPosts);
  const relatedTools = (post?.relatedTools ?? [])
    .map((tool) => getBlogTool(tool.route))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  const seoTitle = post
    ? post.metaTitle ?? `${post.title} | ByteToolBox Blog`
    : 'Blog Post Not Found | ByteToolBox';
  const seoDescription = post?.metaDescription ?? post?.excerpt ?? 'Blog post not found.';

  const structuredData = useMemo(
    () =>
      post
        ? [
            buildArticleSchema(post),
            breadcrumbListSchema([
              { name: 'Home', path: '/' },
              { name: 'Guides', path: '/blog' },
              { name: post.title },
            ]),
            buildFaqSchema(post),
          ].filter((schema): schema is Record<string, unknown> => schema !== null)
        : undefined,
    [post]
  );

  useSEO({
    title: seoTitle,
    description: seoDescription,
    keywords: post?.tags.join(', '),
    canonical: `${SITE_URL}/blog/${slug}`,
    ogImage: ogImageForPath(post?.relatedToolRoute),
    structuredData,
  });

  if (!post) {
    return (
      <ToolLayout title="Post Not Found" description="This blog post could not be found.">
        <div className="p-6 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">The blog post you requested does not exist.</p>
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </div>
      </ToolLayout>
    );
  }

  const displayDate = post.updated ?? post.date;
  const displayBadge = getPostDisplayBadge(post);

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/blog' },
        { label: post.title },
      ]}
    >
      <article className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all guides
        </Link>

        <header className="mb-8 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="dev-badge text-primary border-primary/20 bg-primary/10">
              {displayBadge}
            </span>
            <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </header>

        {post.quickAnswer && (
          <section className="mb-8 rounded-lg border border-primary/25 bg-primary/5 p-5 sm:p-6">
            <h2 className="text-sm font-mono uppercase tracking-wide text-primary mb-2">Quick answer</h2>
            <p className="text-foreground leading-relaxed">{post.quickAnswer}</p>
          </section>
        )}

        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <section className="mb-8 rounded-lg border border-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-3">
              Key takeaways
            </h2>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary font-mono shrink-0">›</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {primaryTool && (
          <div className="mb-8 rounded-lg border border-primary/30 bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Apply this guide with the{' '}
              <span className="font-medium text-foreground">{primaryTool.label}</span>
            </p>
            <Link
              to={primaryTool.route}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
            >
              Open {primaryTool.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <BlogMarkdown content={post.content} />

        {relatedTools.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Related tools</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.route}
                  to={tool.route}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:border-primary/40 hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground">{tool.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="dev-card-hover block p-4"
                >
                  <span className="dev-badge mb-2">{getPostDisplayBadge(related)}</span>
                  <h3 className="font-medium text-foreground text-sm mb-1 leading-snug">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {post.faqs && post.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-4">
              {post.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <footer className="pt-6 border-t border-border text-sm text-muted-foreground">
          Last updated {new Date(displayDate).toLocaleDateString()}
        </footer>
      </article>
    </ToolLayout>
  );
};

export default BlogPostPage;
