import { ToolLayout } from '@/components/ToolLayout';
import { useState } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Code2, Shield, Zap, Database, Search, Key } from 'lucide-react';

/**
 * Blog page with developer tips and tutorials
 * 
 * This page provides valuable content for developers and helps with SEO.
 * Includes articles about using ByteToolbox tools and general development tips.
 */
export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: Code2 },
    { id: 'tools', name: 'Tool Tips', icon: Code2 },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'data', name: 'Data Processing', icon: Database },
    { id: 'regex', name: 'Regex', icon: Search },
    { id: 'uuid', name: 'UUIDs', icon: Key }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential JSON Best Practices for API Development',
      excerpt: 'Learn the most important JSON practices that will make your APIs more reliable, secure, and maintainable.',
      content: 'JSON is the backbone of modern API development. In this comprehensive guide, we\'ll cover the essential best practices that every developer should know when working with JSON in APIs...',
      category: 'tools',
      author: 'ByteToolbox Team',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['JSON', 'API', 'Best Practices', 'Development'],
      featured: true
    },
    {
      id: 2,
      title: 'Why MD5 and SHA-1 Are No Longer Secure for Password Hashing',
      excerpt: 'Understanding the security implications of using deprecated hash algorithms and what to use instead.',
      content: 'Hash algorithms are fundamental to web security, but not all hashes are created equal. MD5 and SHA-1, once industry standards, are now considered cryptographically broken...',
      category: 'security',
      author: 'ByteToolbox Team',
      date: '2024-01-12',
      readTime: '7 min read',
      tags: ['Security', 'Hashing', 'MD5', 'SHA-1', 'Passwords'],
      featured: true
    },
    {
      id: 3,
      title: 'Mastering Regular Expressions: A Developer\'s Guide',
      excerpt: 'From basic patterns to advanced techniques, learn how to write efficient and maintainable regular expressions.',
      content: 'Regular expressions are powerful tools for text processing, but they can be intimidating. This guide will take you from regex novice to expert, covering everything from basic patterns to advanced techniques...',
      category: 'regex',
      author: 'ByteToolbox Team',
      date: '2024-01-10',
      readTime: '12 min read',
      tags: ['Regex', 'Text Processing', 'Patterns', 'JavaScript'],
      featured: false
    },
    {
      id: 4,
      title: 'UUID vs Auto-increment: Choosing the Right Primary Key',
      excerpt: 'When to use UUIDs versus auto-incrementing integers for database primary keys in different scenarios.',
      content: 'Choosing the right primary key strategy is crucial for database design. This article explores the pros and cons of UUIDs versus auto-incrementing integers...',
      category: 'uuid',
      author: 'ByteToolbox Team',
      date: '2024-01-08',
      readTime: '6 min read',
      tags: ['UUID', 'Database', 'Primary Keys', 'Performance'],
      featured: false
    },
    {
      id: 5,
      title: 'Base64 Encoding: When and Why to Use It',
      excerpt: 'Understanding Base64 encoding, its use cases, and best practices for web development.',
      content: 'Base64 encoding is a fundamental technique in web development, but many developers don\'t fully understand when and why to use it. This guide covers everything you need to know...',
      category: 'data',
      author: 'ByteToolbox Team',
      date: '2024-01-05',
      readTime: '4 min read',
      tags: ['Base64', 'Encoding', 'Web Development', 'Data Transfer'],
      featured: false
    },
    {
      id: 6,
      title: 'Optimizing JSON Performance in Large Applications',
      excerpt: 'Tips and techniques for handling large JSON datasets efficiently in web applications.',
      content: 'As applications grow, JSON performance becomes critical. This article covers techniques for optimizing JSON parsing, serialization, and handling large datasets...',
      category: 'performance',
      author: 'ByteToolbox Team',
      date: '2024-01-03',
      readTime: '8 min read',
      tags: ['JSON', 'Performance', 'Optimization', 'Large Data'],
      featured: false
    },
    {
      id: 7,
      title: 'Timestamp Management in Distributed Systems',
      excerpt: 'Best practices for handling timestamps across different timezones and distributed systems.',
      content: 'Managing timestamps in distributed systems is more complex than it seems. This guide covers timezone handling, clock synchronization, and timestamp formats...',
      category: 'data',
      author: 'ByteToolbox Team',
      date: '2024-01-01',
      readTime: '9 min read',
      tags: ['Timestamps', 'Distributed Systems', 'Timezones', 'Synchronization'],
      featured: false
    },
    {
      id: 8,
      title: 'Building Privacy-First Developer Tools',
      excerpt: 'How we built ByteToolbox with privacy as a core principle and why it matters for developers.',
      content: 'Privacy should be a fundamental consideration when building developer tools. This article explains our approach to privacy-first development and why it matters...',
      category: 'security',
      author: 'ByteToolbox Team',
      date: '2023-12-28',
      readTime: '6 min read',
      tags: ['Privacy', 'Developer Tools', 'Security', 'Ethics'],
      featured: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <ToolLayout
      title="Developer Blog & Tips"
      description="Learn from our collection of developer tips, tutorials, and best practices. Covering JSON, security, performance, and more to help you become a better developer."
    >
      <div className="p-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Developer Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tips, tutorials, and best practices to help you become a better developer. 
            Learn from our experience building ByteToolbox and working with modern web technologies.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 flex items-center gap-1">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-secondary'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 flex items-center gap-1">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest developer tips, tool updates, and best practices delivered to your inbox. 
            No spam, just valuable content for developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
};
