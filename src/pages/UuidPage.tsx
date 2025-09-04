import { ToolLayout } from '@/components/ToolLayout';
import { UuidGenerator } from '@/components/tools/UuidGenerator';
import { Key, CheckCircle, Zap, Shield, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

/**
 * UUID Generator page with SEO optimization
 * 
 * This page provides comprehensive information about the UUID Generator tool
 * and includes the actual tool component for immediate use.
 */
export const UuidPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'UUID Generator - Free Online UUID v1, v4, v7 Generator | ByteToolBox',
    description: 'Generate unique identifiers (UUIDs) instantly. Free online UUID generator supporting v1, v4, and v7 versions. Perfect for database keys, API tokens, and unique identifiers.',
    keywords: 'UUID generator, GUID generator, unique identifier, UUID v1, UUID v4, UUID v7, database keys, API tokens, unique ID generator, online UUID tool',
    canonical: 'https://www.bytetoolbox.com/uuid',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'UUID Generator - ByteToolBox',
      'description': 'Generate unique identifiers (UUIDs) with v1, v4, and v7 versions.',
      'url': 'https://www.bytetoolbox.com/uuid',
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
        'UUID v1 Generation (Time-based)',
        'UUID v4 Generation (Random)',
        'UUID v7 Generation (Time-ordered)',
        'Bulk UUID Generation',
        'Copy to Clipboard',
        'Download as Text File'
      ],
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '1.0.0',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const examples = [
    {
      name: 'Single UUID',
      input: '1'
    },
    {
      name: '10 UUIDs',
      input: '10'
    },
    {
      name: '100 UUIDs',
      input: '100'
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
              UUID Generator
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate UUIDs in bulk with formatting options. Free online UUID generator for v4 UUIDs with copy, download, and customization features.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our UUID Generator?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Bulk Generation</h3>
                    <p className="text-sm text-muted-foreground">Generate up to 1000 UUIDs at once for testing and development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Formatting Options</h3>
                    <p className="text-sm text-muted-foreground">Customize UUID format with uppercase and hyphen removal options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Cryptographically Secure</h3>
                    <p className="text-sm text-muted-foreground">Uses crypto.getRandomValues() for secure random generation</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Bulk Generation:</strong> Create 1-1000 UUIDs at once</li>
                <li><strong>UUID v4:</strong> Random UUIDs using secure random numbers</li>
                <li><strong>Format Options:</strong> Uppercase, remove hyphens, or both</li>
                <li><strong>Copy Individual:</strong> Click any UUID to copy it</li>
                <li><strong>Copy All:</strong> Copy all generated UUIDs at once</li>
                <li><strong>Download:</strong> Save UUIDs as a text file</li>
                <li><strong>Real-time Preview:</strong> See format before generating</li>
                <li><strong>Memory Efficient:</strong> Handle large lists without performance issues</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6">How to Use the UUID Generator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Set Quantity</h4>
                <p className="text-sm text-muted-foreground">Choose how many UUIDs to generate (1-1000)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Format</h4>
                <p className="text-sm text-muted-foreground">Select uppercase, remove hyphens, or both</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Generate & Copy</h4>
                <p className="text-sm text-muted-foreground">Generate UUIDs and copy individual or all at once</p>
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
      <UuidGenerator initialValue={selectedExample} />

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common UUID Use Cases</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Database Keys:</strong> Primary keys and foreign keys in databases</li>
                <li><strong>API Identifiers:</strong> Unique IDs for API requests and responses</li>
                <li><strong>Session IDs:</strong> Unique session identifiers for web applications</li>
                <li><strong>File Naming:</strong> Generate unique filenames for uploaded files</li>
                <li><strong>Distributed Systems:</strong> Unique node identifiers in distributed systems</li>
                <li><strong>Testing:</strong> Generate test data with unique identifiers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">UUID v4 Specifications</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Format:</strong> xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</li>
                <li><strong>Version:</strong> 4 (indicated by '4' in third group)</li>
                <li><strong>Variant:</strong> y = 8, 9, A, or B (fourth group)</li>
                <li><strong>Length:</strong> 128 bits (32 hexadecimal characters)</li>
                <li><strong>Collision Probability:</strong> ~5.3×10⁻³⁷ (extremely low)</li>
                <li><strong>Randomness:</strong> Uses cryptographically secure random numbers</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Use UUIDs for database primary keys instead of auto-incrementing integers. 
              UUIDs are globally unique, making them perfect for distributed systems and 
              preventing ID conflicts when merging databases.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UuidPage;