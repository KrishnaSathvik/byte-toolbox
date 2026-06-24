import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Shield, Clock, ArrowRight, BookOpen, Copy } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { getBlogPostBySlug } from '@/data/blogPosts';
import { getBlogTool } from '@/lib/blogTools';
import { HOMEPAGE_GUIDE_SLUGS, TOOL_GUIDE_SLUGS } from '@/lib/toolPageGuides';

const tools = [
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    description:
      'Paste broken JSON, find errors, format API payloads, and copy clean output.',
    badge: 'Validate / Format',
    keywords: ['json', 'format', 'validate', 'prettify', 'minify'],
  },
  {
    name: 'Base64 Encoder',
    path: '/base64',
    description:
      'Encode, decode, and inspect Base64 strings, Unicode text, and URL-safe data.',
    badge: 'Encode / Decode',
    keywords: ['base64', 'encode', 'decode', 'unicode', 'file'],
  },
  {
    name: 'Hash Generator',
    path: '/hash',
    description:
      'Generate SHA-256 and SHA-512 checksums for text, files, releases, and debugging.',
    badge: 'SHA-256',
    keywords: ['hash', 'sha256', 'md5', 'checksum', 'security'],
  },
  {
    name: 'UUID Generator',
    path: '/uuid',
    description:
      'Create UUID v4 values for APIs, test data, request IDs, and database keys.',
    badge: 'UUID v4',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generate'],
  },
  {
    name: 'Regex Tester',
    path: '/regex',
    description:
      'Test patterns, flags, and sample text with match feedback while you iterate.',
    badge: 'Match Test',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'test'],
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp',
    description:
      'Convert Unix timestamps, ISO dates, UTC values, and log times without guessing.',
    badge: 'UTC / Epoch',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert'],
  },
] as const;

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Always Available',
    description: 'Works offline once loaded',
  },
  {
    icon: <Copy className="w-5 h-5" />,
    title: 'Copy-Ready Output',
    description: 'Paste in, validate or convert, copy results back to your editor',
  },
];

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'ByteToolBox - Free Online Developer Tools | JSON, Base64, Hash, UUID',
    description:
      'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
    keywords:
      'developer tools, JSON formatter, Base64 encoder, hash generator, UUID generator, regex tester, timestamp converter, online tools, free tools, web development, programming utilities, privacy-focused',
    canonical: 'https://www.bytetoolbox.com/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ByteToolBox - Professional Developer Tools',
      description:
        'Free online developer tools for JSON formatting, Base64 encoding, hash generation, UUID creation, regex testing, and timestamp conversion. Fast, secure, and privacy-focused tools that run locally in your browser.',
      url: 'https://www.bytetoolbox.com',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        name: 'ByteToolBox',
        url: 'https://www.bytetoolbox.com',
      },
      featureList: [
        'JSON Formatter and Validator',
        'Base64 Encoder and Decoder',
        'Hash Generator (MD5, SHA-1, SHA-256, SHA-512)',
        'UUID Generator (v4)',
        'Regular Expression Tester',
        'Timestamp Converter',
      ],
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      softwareVersion: '1.0.0',
      datePublished: '2025-01-04',
      dateModified: '2025-01-04',
    },
  });

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((keyword) => keyword.includes(searchQuery.toLowerCase()))
  );

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <section className="w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-5 leading-tight text-foreground">
            ByteToolBox
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium mb-3 max-w-2xl mx-auto leading-relaxed">
            Fast browser tools for JSON, Base64, hashes, UUIDs, regex, and timestamps.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste data, validate it, convert it, copy it back — all locally in your browser.
          </p>

          <div className="max-w-md mx-auto mb-2">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tools..."
                aria-label="Search tools on homepage"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No tools found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Try searching for something else or{' '}
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline"
                >
                  clear your search
                </button>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="w-full px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
            Popular developer guides
          </h2>
          <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
            Practical references for debugging APIs, encoding data, checksums, and time formats.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HOMEPAGE_GUIDE_SLUGS.map((slug) => {
              const post = getBlogPostBySlug(slug);
              if (!post) {
                return null;
              }
              const tool = post.relatedToolRoute ? getBlogTool(post.relatedToolRoute) : undefined;
              return (
                <article key={slug} className="dev-card-hover p-4 flex flex-col h-full">
                  {tool && <span className="dev-badge w-fit mb-2">{tool.label}</span>}
                  <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 leading-snug">
                    <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                    <Link
                      to={`/blog/${slug}`}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Read guide
                    </Link>
                    {tool && (
                      <Link
                        to={tool.route}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground ml-auto"
                      >
                        Try tool
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-card/20 border-y border-border">
        <div className="px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center mb-6 sm:mb-8 lg:mb-12 text-foreground">
              Why ByteToolBox?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-lg text-primary mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ToolCard = ({ tool }: { tool: (typeof tools)[number] }) => {
  const guideSlug = TOOL_GUIDE_SLUGS[tool.path];
  const guide = guideSlug ? getBlogPostBySlug(guideSlug) : undefined;

  return (
    <article className="dev-card-hover group h-full flex flex-col p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          <Link to={tool.path}>{tool.name}</Link>
        </h3>
        <span className="dev-badge shrink-0">{tool.badge}</span>
      </div>

      <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed flex-1">
        {tool.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/60">
        <Link
          to={tool.path}
          className="inline-flex items-center gap-1 text-primary text-xs sm:text-sm font-medium hover:underline"
        >
          Try it now
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {guide && (
          <Link
            to={`/blog/${guideSlug}`}
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground"
          >
            Guide
          </Link>
        )}
      </div>
    </article>
  );
};
