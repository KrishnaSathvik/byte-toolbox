import { ToolLayout } from '@/components/ToolLayout';
import { TimestampConverter } from '@/components/tools/TimestampConverter';
import { ToolPageHeader } from '@/components/tool-page/ToolPageHeader';
import { ToolQuickExamples } from '@/components/tool-page/ToolQuickExamples';
import { ToolGuideCta } from '@/components/tool-page/ToolGuideCta';
import { ToolRelatedTools } from '@/components/tool-page/ToolRelatedTools';
import { ToolHowToSteps } from '@/components/tool-page/ToolHowToSteps';
import { ToolSeoPanel, ToolSeoSection } from '@/components/tool-page/ToolSeoSection';
import { ToolFaqPanel } from '@/components/tool-page/ToolFaqPanel';
import { useSEO } from '@/hooks/useSEO';
import { toolPageStructuredData } from '@/lib/structuredData';
import { getToolFaqs } from '@/lib/toolFaqs';
import { CheckCircle, Zap, Shield, FileText, Target } from 'lucide-react';
import { useState } from 'react';

export const TimestampPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Timestamp Converter - Free Online Unix Timestamp Converter | ByteToolBox',
    description: 'Convert Unix timestamps to human-readable dates and vice versa instantly. Free online timestamp converter with timezone support, multiple formats, and batch conversion. Perfect for developers and data analysis.',
    keywords: 'timestamp converter, unix timestamp, date converter, time converter, epoch time, timestamp to date, date to timestamp, timezone converter, online timestamp tool',
    canonical: 'https://www.bytetoolbox.com/timestamp',
    ogImage: '/og/timestamp.png',
    structuredData: toolPageStructuredData({
      name: 'Timestamp Converter - ByteToolBox',
      description: 'Convert Unix timestamps to human-readable dates and vice versa with timezone support.',
      path: '/timestamp',
      featureList: [
        'Unix Timestamp to Date Conversion',
        'Date to Unix Timestamp Conversion',
        'Timezone Support',
        'Multiple Date Formats',
        'Batch Conversion',
        'Current Time Display',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Timestamp Converter' },
      ],
      faqs: getToolFaqs('/timestamp'),
    })
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

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Timestamp Converter' }
      ]}
    >
      <ToolPageHeader
        title="Timestamp Converter"
        description="Convert between timestamps and human-readable dates. Free online timestamp converter with timezone support, multiple formats, and batch conversion."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <TimestampConverter initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/timestamp" />
      <ToolRelatedTools toolRoute="/timestamp" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the Timestamp Converter"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Enter Timestamp',
                description: 'Type timestamp, date string, or use current time',
              },
              {
                title: 'Choose Format',
                description: 'Select input and output formats, timezone',
              },
              {
                title: 'Get Result',
                description: 'Copy the converted timestamp or download results',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why use our Timestamp Converter?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">Support for Unix timestamps, ISO 8601, and custom date formats</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Timezone Support</h3>
                <p className="text-sm text-muted-foreground">Convert between different timezones with automatic detection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Batch Conversion</h3>
                <p className="text-sm text-muted-foreground">Convert multiple timestamps at once with different formats</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
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
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & formats"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common timestamp use cases</h3>
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
              <h3 className="text-base font-semibold text-foreground mb-3">Timestamp formats</h3>
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
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Pro tip</h3>
            <p className="text-sm">
              Use Unix timestamps for API responses and database storage as they're timezone-independent.
              Convert to human-readable format only when displaying to users, and always consider
              the user's timezone for accurate time display.
            </p>
          </div>
        </ToolSeoPanel>
        <ToolFaqPanel faqs={getToolFaqs('/timestamp')} />
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default TimestampPage;
