import { ToolLayout } from '@/components/ToolLayout';
import { RegexTester } from '@/components/tools/RegexTester';
import { ToolPageHeader } from '@/components/tool-page/ToolPageHeader';
import { ToolQuickExamples } from '@/components/tool-page/ToolQuickExamples';
import { ToolGuideCta } from '@/components/tool-page/ToolGuideCta';
import { ToolRelatedTools } from '@/components/tool-page/ToolRelatedTools';
import { ToolHowToSteps } from '@/components/tool-page/ToolHowToSteps';
import { ToolSeoPanel, ToolSeoSection } from '@/components/tool-page/ToolSeoSection';
import { useSEO } from '@/hooks/useSEO';
import { CheckCircle, Zap, Shield, FileText, Target } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Regex Tester' }
      ]}
    >
      <ToolPageHeader
        title="Regex Tester & Validator"
        description="Test regular expressions with real-time highlighting and validation. Free online regex tester with common patterns, flags, and match details."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <RegexTester initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/regex" />
      <ToolRelatedTools toolRoute="/regex" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the Regex Tester"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Enter Pattern',
                description: 'Type your regex pattern in the pattern field',
              },
              {
                title: 'Add Test Text',
                description: 'Enter text to test your regex pattern against',
              },
              {
                title: 'View Results',
                description: 'See matches, groups, and detailed information',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why use our Regex Tester?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Real-time Testing</h3>
                <p className="text-sm text-muted-foreground">See matches and highlights as you type your regex pattern</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">All JavaScript Flags</h3>
                <p className="text-sm text-muted-foreground">Support for g, i, m, s, u, and y flags with explanations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Pattern Library</h3>
                <p className="text-sm text-muted-foreground">Common regex patterns for email, phone, URL, and more</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
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
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & flags"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common regex use cases</h3>
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
              <h3 className="text-base font-semibold text-foreground mb-3">JavaScript regex flags</h3>
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
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Pro tip</h3>
            <p className="text-sm">
              Use the pattern library to get started with common regex patterns. You can modify
              these patterns to fit your specific needs, and the real-time highlighting will
              help you understand how each part of the regex works.
            </p>
          </div>
        </ToolSeoPanel>
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default RegexPage;
