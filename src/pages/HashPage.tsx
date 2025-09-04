import { ToolLayout } from '@/components/ToolLayout';
import { HashGenerator } from '@/components/tools/HashGenerator';
import { Shield, CheckCircle, Zap, FileText, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Hash Generator page with SEO optimization
 * 
 * This page provides comprehensive information about the Hash Generator tool
 * and includes the actual tool component for immediate use.
 */
export const HashPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Hash Generator - Free Online MD5, SHA-1, SHA-256, SHA-512 Tool | ByteToolBox',
    description: 'Generate secure cryptographic hashes instantly. Free online hash generator supporting MD5, SHA-1, SHA-256, and SHA-512 algorithms. Perfect for password hashing, data integrity, and security testing.',
    keywords: 'hash generator, MD5, SHA-1, SHA-256, SHA-512, cryptographic hash, password hashing, data integrity, checksum, security testing, online hash tool',
    canonical: 'https://www.bytetoolbox.com/hash',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Hash Generator - ByteToolBox',
      'description': 'Generate secure cryptographic hashes with MD5, SHA-1, SHA-256, and SHA-512 algorithms.',
      'url': 'https://www.bytetoolbox.com/hash',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'creator': {
        '@type': 'Organization',
        'name': 'ByteToolBox',
        'url': 'https://www.bytetoolbox.com'
      },
      'featureList': [
        'MD5 Hash Generation',
        'SHA-1 Hash Generation',
        'SHA-256 Hash Generation',
        'SHA-512 Hash Generation',
        'Text and File Input Support',
        'Real-time Hash Generation'
      ],
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '1.0.0',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const examples = [
    {
      name: 'Simple Text',
      input: 'Hello, World!'
    },
    {
      name: 'Password',
      input: 'mySecurePassword123'
    },
    {
      name: 'JSON Data',
      input: '{"user": "john", "id": 123}'
    }
  ];

  const handleFillExample = (input: string) => {
    setSelectedExample(input);
  };

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              Hash Generator & Verifier
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate cryptographic hashes (SHA-256, SHA-512, MD5, SHA-1) with file support. Free online hash generator with security warnings and comparison features.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our Hash Generator?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Multiple Algorithms</h3>
                    <p className="text-sm text-muted-foreground">Support for SHA-256, SHA-512, MD5, and SHA-1 hash algorithms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">File Support</h3>
                    <p className="text-sm text-muted-foreground">Upload and hash files up to 10MB with drag-and-drop support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Security Warnings</h3>
                    <p className="text-sm text-muted-foreground">Visual warnings for deprecated algorithms</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>SHA-256:</strong> Secure, widely used, recommended for new projects</li>
                <li><strong>SHA-512:</strong> More secure than SHA-256, larger output</li>
                <li><strong>MD5:</strong> Fast but cryptographically broken (deprecated)</li>
                <li><strong>SHA-1:</strong> Deprecated but still common in legacy systems</li>
                <li><strong>File Hashing:</strong> Hash entire files or just text input</li>
                <li><strong>Hash Comparison:</strong> Compare hashes for verification</li>
                <li><strong>Copy & Download:</strong> Easy export of hash results</li>
                <li><strong>Security Alerts:</strong> Warnings for weak algorithms</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6">How to Use the Hash Generator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Data</h4>
                <p className="text-sm text-muted-foreground">Type text or upload a file to hash</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Algorithm</h4>
                <p className="text-sm text-muted-foreground">Select hash algorithm (SHA-256 recommended)</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Get Hash</h4>
                <p className="text-sm text-muted-foreground">Copy the hash or compare with another</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Examples</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleFillExample(example.input)}
                  className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors min-h-[40px] flex items-center"
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <HashGenerator initialValue={selectedExample} />

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Hash Use Cases</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Password Storage:</strong> Hash passwords before storing in databases</li>
                <li><strong>File Integrity:</strong> Verify files haven't been corrupted</li>
                <li><strong>Digital Signatures:</strong> Create and verify digital signatures</li>
                <li><strong>Data Deduplication:</strong> Identify duplicate files by hash</li>
                <li><strong>Blockchain:</strong> Hash blocks in blockchain applications</li>
                <li><strong>API Security:</strong> Create HMAC signatures for API requests</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Hash Algorithm Security</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground"><strong>SHA-256:</strong> Secure, recommended</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground"><strong>SHA-512:</strong> Very secure, larger output</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm text-foreground"><strong>SHA-1:</strong> Deprecated, avoid for new projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  <span className="text-sm text-foreground"><strong>MD5:</strong> Cryptographically broken, not secure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">⚠️ Security Warning</h3>
            <p className="text-orange-600 dark:text-orange-400">
              MD5 and SHA-1 are cryptographically broken and should not be used for security purposes. 
              Always use SHA-256 or SHA-512 for new projects. If you must use MD5 or SHA-1, 
              consider it only for non-security purposes like file deduplication.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashPage;