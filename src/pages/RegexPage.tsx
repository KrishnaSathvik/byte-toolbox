import { ToolLayout } from '@/components/ToolLayout';
import { RegexTester } from '@/components/tools/RegexTester';
import { Search, CheckCircle, Zap, Shield, Code2, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Regex Tester page with SEO optimization
 * 
 * This page provides comprehensive information about the Regex Tester tool
 * and includes the actual tool component for immediate use.
 */
export const RegexPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Regex Tester - Free Online Regular Expression Tester | ByteToolBox',
    description: 'Test and debug regular expressions instantly. Free online regex tester with real-time matching, syntax highlighting, and comprehensive pattern testing. Perfect for developers and data validation.',
    keywords: 'regex tester, regular expression tester, regex debugger, pattern matching, regex validation, online regex tool, regex cheatsheet, regex examples',
    canonical: 'https://www.bytetoolbox.com/regex',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Regex Tester - ByteToolBox',
      'description': 'Test and debug regular expressions with real-time matching and validation.',
      'url': 'https://www.bytetoolbox.com/regex',
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
        'Real-time Regex Testing',
        'Pattern Matching Validation',
        'Syntax Highlighting',
        'Match Groups Extraction',
        'Global and Case-insensitive Flags',
        'Common Regex Examples'
      ],
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '1.0.0',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const examples = [
    {
      name: 'Email Validation',
      input: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    },
    {
      name: 'Phone Number',
      input: '\\(\\d{3}\\)\\s\\d{3}-\\d{4}'
    },
    {
      name: 'URL Pattern',
      input: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?'
    }
  ];

  const handleFillExample = (input: string) => {
    setSelectedExample(input);
  };

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Regex Tester' }
      ]}
    >
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              Regex Tester & Validator
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Test regular expressions with real-time highlighting and validation. Free online regex tester with common patterns, flags, and match details.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our Regex Tester?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Testing</h3>
                    <p className="text-sm text-muted-foreground">See matches and highlights as you type your regex pattern</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">All JavaScript Flags</h3>
                    <p className="text-sm text-muted-foreground">Support for g, i, m, s, u, and y flags with explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Pattern Library</h3>
                    <p className="text-sm text-muted-foreground">Common regex patterns for email, phone, URL, and more</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Real-time Highlighting:</strong> See matches highlighted as you type</li>
                <li><strong>Match Details:</strong> View groups, positions, and match information</li>
                <li><strong>All Flags:</strong> Support for g, i, m, s, u, y JavaScript flags</li>
                <li><strong>Pattern Library:</strong> Common regex patterns ready to use</li>
                <li><strong>Error Detection:</strong> Highlight syntax errors in regex patterns</li>
                <li><strong>Copy Results:</strong> Easy copying of matched text and patterns</li>
                <li><strong>Multi-line Support:</strong> Test regex on multi-line text</li>
                <li><strong>Unicode Support:</strong> Full Unicode character support</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6">How to Use the Regex Tester</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Pattern</h4>
                <p className="text-sm text-muted-foreground">Type your regex pattern in the pattern field</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Add Test Text</h4>
                <p className="text-sm text-muted-foreground">Enter text to test your regex pattern against</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">View Results</h4>
                <p className="text-sm text-muted-foreground">See matches, groups, and detailed information</p>
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
      <RegexTester initialValue={selectedExample} />

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Regex Use Cases</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Form Validation:</strong> Validate email, phone, and other input formats</li>
                <li><strong>Text Processing:</strong> Find and replace text patterns in documents</li>
                <li><strong>Data Extraction:</strong> Extract specific data from text or logs</li>
                <li><strong>Search & Replace:</strong> Find and replace text in code editors</li>
                <li><strong>URL Routing:</strong> Match URL patterns in web frameworks</li>
                <li><strong>Log Analysis:</strong> Parse and analyze log files</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">JavaScript Regex Flags</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>g (global):</strong> Find all matches, not just the first</li>
                <li><strong>i (ignore case):</strong> Case-insensitive matching</li>
                <li><strong>m (multiline):</strong> ^ and $ match line breaks</li>
                <li><strong>s (dotall):</strong> . matches newline characters</li>
                <li><strong>u (unicode):</strong> Full Unicode support</li>
                <li><strong>y (sticky):</strong> Match only at the last index</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Use the pattern library to get started with common regex patterns. You can modify 
              these patterns to fit your specific needs, and the real-time highlighting will 
              help you understand how each part of the regex works.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexPage;