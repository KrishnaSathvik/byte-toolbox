import { ToolLayout } from '@/components/ToolLayout';
import { Code2, Shield, Zap, Users, Heart, Github, Twitter, Linkedin } from 'lucide-react';

/**
 * About page for ByteToolbox
 * 
 * This page tells the story of ByteToolbox and builds trust with users.
 * Important for SEO and user engagement.
 */
export const About = () => {
  return (
    <ToolLayout
      title="About ByteToolbox"
      description="Learn about ByteToolbox - the privacy-focused developer tools platform built for modern developers. Fast, secure, and completely free."
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
              <Code2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">ByteToolbox</h1>
              <p className="text-xl text-muted-foreground">
                Privacy-focused developer tools built for the modern web
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ByteToolbox was born from a simple idea: developers deserve fast, reliable, and 
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
                ByteToolbox started as a personal project to solve common development problems. 
                As developers, we were frustrated with slow, clunky online tools that required 
                uploading sensitive data to unknown servers.
              </p>
              <p>
                We wanted something different: tools that were fast, secure, and worked entirely 
                in the browser. Tools that respected privacy and didn't require account creation 
                or data uploads. Tools that just worked.
              </p>
              <p>
                So we built ByteToolbox - a collection of essential developer tools that process 
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
                  Unlike other online tools, ByteToolbox processes all data locally in your browser. 
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
              ByteToolbox includes six essential developer tools, each designed to solve 
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
              ByteToolbox is built using the latest web technologies to ensure the best 
              performance, security, and user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>React 18</strong> - Modern UI library</li>
                  <li>• <strong>TypeScript</strong> - Type-safe development</li>
                  <li>• <strong>Vite</strong> - Lightning-fast build tool</li>
                  <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li>• <strong>shadcn/ui</strong> - Beautiful component library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Tools & Testing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Vitest</strong> - Fast unit testing</li>
                  <li>• <strong>ESLint</strong> - Code quality</li>
                  <li>• <strong>TypeDoc</strong> - Documentation generation</li>
                  <li>• <strong>Monaco Editor</strong> - VS Code editor</li>
                  <li>• <strong>Lucide Icons</strong> - Beautiful icon set</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Open Source & Community</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Github className="w-8 h-8 text-foreground mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">100% Open Source</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ByteToolbox is completely open source and available under the MIT License. 
                    You can view, modify, and contribute to the codebase on GitHub.
                  </p>
                  <a 
                    href="https://github.com/KrishnaSathvik/byte-toolbox" 
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Meet the Team</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Krishna Sathvik</h3>
                  <p className="text-muted-foreground">Founder & Lead Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Passionate about building tools that make developers' lives easier. 
                Full-stack developer with a focus on performance, security, and user experience.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://github.com/KrishnaSathvik" className="text-muted-foreground hover:text-foreground">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/yourhandle" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/yourprofile" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="w-5 h-5" />
                </a>
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
                <h3 className="font-semibold text-foreground mb-2">💬 Feedback & Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Have a suggestion or found a bug? Let us know!
                </p>
                <a 
                  href="https://github.com/KrishnaSathvik/byte-toolbox/issues" 
                  className="text-primary hover:underline text-sm"
                >
                  Open an issue on GitHub
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">🤝 Contribute</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Want to help improve ByteToolbox? We welcome contributions!
                </p>
                <a 
                  href="https://github.com/KrishnaSathvik/byte-toolbox" 
                  className="text-primary hover:underline text-sm"
                >
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Try ByteToolbox today and experience the difference that privacy-focused, 
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
