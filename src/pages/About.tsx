import { ToolLayout } from '@/components/ToolLayout';
import { Code2, Shield, Zap, Users, Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * About page for ByteToolBox
 * 
 * This page tells the story of ByteToolBox and builds trust with users.
 * Important for SEO and user engagement.
 */
export const About = () => {
  useSEO({
    title: 'About ByteToolBox - Privacy-Focused Developer Tools | Free Online Utilities',
    description: 'Learn about ByteToolBox - the privacy-focused developer tools platform built for modern developers. Fast, secure, completely free, and runs entirely in your browser.',
    keywords: 'about bytetoolbox, developer tools, privacy-focused, free tools, online utilities, browser-based tools, open source, developer community',
    canonical: 'https://www.bytetoolbox.com/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About ByteToolBox',
      'description': 'Learn about ByteToolBox - the privacy-focused developer tools platform built for modern developers.',
      'url': 'https://www.bytetoolbox.com/about',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'ByteToolBox',
        'description': 'Privacy-focused developer tools platform providing free online utilities that run entirely in your browser.',
        'url': 'https://www.bytetoolbox.com',
        'foundingDate': '2025-01-04',
        'slogan': 'Fast, secure, and always available developer tools'
      }
    }
  });

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              About ByteToolBox
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn about ByteToolBox - the privacy-focused developer tools platform built for modern developers. Fast, secure, and completely free.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
              <Code2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">ByteToolBox</h1>
              <p className="text-xl text-muted-foreground">
                Privacy-focused developer tools built for the modern web
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ByteToolBox was born from a simple idea: developers deserve fast, reliable, and 
              privacy-focused tools that work seamlessly in their browser. We believe that 
              your data should stay on your device, and your tools should be lightning-fast.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser. Your data never leaves your device.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Zap className="w-8 h-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Vite and React for maximum performance and instant results.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Heart className="w-8 h-8 text-danger mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Developer Love</h3>
                <p className="text-sm text-muted-foreground">
                  Built by developers, for developers. We understand your workflow.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                ByteToolBox started as a personal project to solve common development problems. 
                As developers, we were frustrated with slow, clunky online tools that required 
                uploading sensitive data to unknown servers.
              </p>
              <p>
                We wanted something different: tools that were fast, secure, and worked entirely 
                in the browser. Tools that respected privacy and didn't require account creation 
                or data uploads. Tools that just worked.
              </p>
              <p>
                So we built ByteToolBox - a collection of essential developer tools that process 
                everything locally in your browser. No data leaves your device, no accounts required, 
                and no compromises on speed or functionality.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">🔒 Privacy by Design</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unlike other online tools, ByteToolBox processes all data locally in your browser. 
                  Your JSON data, Base64 content, and other sensitive information never leaves your device.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>No data uploads to servers</li>
                  <li>No account creation required</li>
                  <li>No tracking of your data</li>
                  <li>Works offline after first load</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">⚡ Performance Focused</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Built with modern web technologies for maximum speed and responsiveness. 
                  Every tool is optimized for performance and user experience.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Instant results and real-time processing</li>
                  <li>Optimized for large data sets</li>
                  <li>Responsive design for all devices</li>
                  <li>Minimal resource usage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Tools</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ByteToolBox includes six essential developer tools, each designed to solve 
              common development problems quickly and securely:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'JSON Formatter', desc: 'Format, validate, and minify JSON with syntax highlighting' },
                { name: 'Base64 Encoder', desc: 'Encode and decode Base64 with file support' },
                { name: 'Hash Generator', desc: 'Generate cryptographic hashes (SHA-256, SHA-512, MD5, SHA-1)' },
                { name: 'UUID Generator', desc: 'Generate UUIDs in bulk with formatting options' },
                { name: 'Regex Tester', desc: 'Test regular expressions with real-time highlighting' },
                { name: 'Timestamp Converter', desc: 'Convert between timestamps and human-readable dates' }
              ].map((tool, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Built With Modern Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ByteToolBox is built using the latest web technologies to ensure the best 
              performance, security, and user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>React 18</strong> - Modern UI library</li>
                  <li><strong>TypeScript</strong> - Type-safe development</li>
                  <li><strong>Vite</strong> - Lightning-fast build tool</li>
                  <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li><strong>shadcn/ui</strong> - Beautiful component library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Tools & Testing</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>Vitest</strong> - Fast unit testing</li>
                  <li><strong>ESLint</strong> - Code quality</li>
                  <li><strong>TypeDoc</strong> - Documentation generation</li>
                  <li><strong>Monaco Editor</strong> - VS Code editor</li>
                  <li><strong>Lucide Icons</strong> - Beautiful icon set</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Commercial Product */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Professional Product</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Code2 className="w-8 h-8 text-foreground mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Commercial Software</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ByteToolBox is a professional, commercial product designed for developers 
                    who need reliable, fast, and secure tools for their daily work.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    For licensing inquiries, contact us at bytetoolbox@gmail.com<br />
                    Visit us at <a href="https://www.bytetoolbox.com" className="text-primary hover:underline">www.bytetoolbox.com</a>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We'd love to hear from you! Whether you have feedback, suggestions, or just want to say hello, 
              we're always happy to connect with fellow developers.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">📧 Email Us</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Send us an email directly
                </p>
                <a 
                  href="mailto:bytetoolbox@gmail.com" 
                  className="text-primary hover:underline text-sm"
                >
                  bytetoolbox@gmail.com
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">💼 Licensing</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Interested in commercial licensing or custom development?
                </p>
                <a 
                  href="mailto:bytetoolbox@gmail.com" 
                  className="text-primary hover:underline text-sm"
                >
                  Contact us for licensing
                </a>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Try ByteToolBox today and experience the difference that privacy-focused, 
                high-performance developer tools can make.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Start Using Tools
              </a>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
};
