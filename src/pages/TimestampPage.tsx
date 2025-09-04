import { ToolLayout } from '@/components/ToolLayout';
import { TimestampConverter } from '@/components/tools/TimestampConverter';
import { Clock, CheckCircle, Zap, Shield, Calendar, Globe } from 'lucide-react';
import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Timestamp Converter page with SEO optimization
 * 
 * This page provides comprehensive information about the Timestamp Converter tool
 * and includes the actual tool component for immediate use.
 */
export const TimestampPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Timestamp Converter - Free Online Unix Timestamp Converter | ByteToolBox',
    description: 'Convert Unix timestamps to human-readable dates and vice versa instantly. Free online timestamp converter with timezone support, multiple formats, and batch conversion. Perfect for developers and data analysis.',
    keywords: 'timestamp converter, unix timestamp, date converter, time converter, epoch time, timestamp to date, date to timestamp, timezone converter, online timestamp tool',
    canonical: 'https://www.bytetoolbox.com/timestamp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Timestamp Converter - ByteToolBox',
      'description': 'Convert Unix timestamps to human-readable dates and vice versa with timezone support.',
      'url': 'https://www.bytetoolbox.com/timestamp',
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
        'Unix Timestamp to Date Conversion',
        'Date to Unix Timestamp Conversion',
        'Timezone Support',
        'Multiple Date Formats',
        'Batch Conversion',
        'Current Time Display'
      ],
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '1.0.0',
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const examples = [
    {
      name: 'Current Time',
      input: Date.now().toString()
    },
    {
      name: 'Unix Timestamp',
      input: '1634567890'
    },
    {
      name: 'Date String',
      input: '2023-10-18T12:34:56Z'
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
              Timestamp Converter
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Convert between timestamps and human-readable dates. Free online timestamp converter with timezone support, multiple formats, and batch conversion.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our Timestamp Converter?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Multiple Formats</h3>
                    <p className="text-sm text-muted-foreground">Support for Unix timestamps, ISO 8601, and custom date formats</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Timezone Support</h3>
                    <p className="text-sm text-muted-foreground">Convert between different timezones with automatic detection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Batch Conversion</h3>
                    <p className="text-sm text-muted-foreground">Convert multiple timestamps at once with different formats</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Unix Timestamps:</strong> Convert to/from Unix timestamps (seconds since 1970)</li>
                <li><strong>ISO 8601:</strong> Support for standard ISO date format</li>
                <li><strong>Custom Formats:</strong> Parse and format custom date strings</li>
                <li><strong>Timezone Conversion:</strong> Convert between different timezones</li>
                <li><strong>Batch Processing:</strong> Convert multiple timestamps at once</li>
                <li><strong>Copy & Download:</strong> Easy export of converted timestamps</li>
                <li><strong>Real-time Updates:</strong> See conversions as you type</li>
                <li><strong>Error Handling:</strong> Clear error messages for invalid inputs</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6">How to Use the Timestamp Converter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Timestamp</h4>
                <p className="text-sm text-muted-foreground">Type timestamp, date string, or use current time</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Format</h4>
                <p className="text-sm text-muted-foreground">Select input and output formats, timezone</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Get Result</h4>
                <p className="text-sm text-muted-foreground">Copy the converted timestamp or download results</p>
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
      <TimestampConverter initialValue={selectedExample} />

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Timestamp Use Cases</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>API Development:</strong> Convert timestamps in API responses</li>
                <li><strong>Database Queries:</strong> Convert between different timestamp formats</li>
                <li><strong>Log Analysis:</strong> Convert log timestamps to readable dates</li>
                <li><strong>Frontend Development:</strong> Display timestamps in user-friendly format</li>
                <li><strong>Data Migration:</strong> Convert timestamps between systems</li>
                <li><strong>Debugging:</strong> Understand timestamp values in code</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Timestamp Formats</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Unix Timestamp:</strong> Seconds since January 1, 1970 UTC</li>
                <li><strong>ISO 8601:</strong> YYYY-MM-DDTHH:mm:ss.sssZ format</li>
                <li><strong>RFC 2822:</strong> Wed, 18 Oct 2023 12:34:56 GMT</li>
                <li><strong>Custom Formats:</strong> Any valid date/time string</li>
                <li><strong>Milliseconds:</strong> Unix timestamp in milliseconds</li>
                <li><strong>Timezone Support:</strong> Convert between timezones</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Use Unix timestamps for API responses and database storage as they're timezone-independent. 
              Convert to human-readable format only when displaying to users, and always consider 
              the user's timezone for accurate time display.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimestampPage;