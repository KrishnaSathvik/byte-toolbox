import { ToolLayout } from '@/components/ToolLayout';
import { JsonFormatter } from '@/components/tools/JsonFormatter';
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

export const JsonFormatterPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'JSON Formatter & Validator - Free Online Tool | ByteToolBox',
    description: 'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting, error detection, and minification. Perfect for developers and API testing.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON minifier, JSON prettifier, JSON syntax checker, API testing, developer tools',
    canonical: 'https://www.bytetoolbox.com/json-formatter',
    ogImage: '/og/json-formatter.png',
    structuredData: toolPageStructuredData({
      name: 'JSON Formatter & Validator',
      description: 'Format, validate, and beautify JSON data instantly with our free online tool.',
      path: '/json-formatter',
      featureList: [
        'JSON Formatting and Beautification',
        'JSON Validation and Error Detection',
        'JSON Minification',
        'Syntax Highlighting',
        'Copy to Clipboard',
        'Download as File',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'JSON Formatter' },
      ],
      faqs: getToolFaqs('/json-formatter'),
    })
  });

  const examples = [
    { name: 'Simple Object', input: '{"name": "John", "age": 30, "city": "New York"}' },
    { name: 'Nested Array', input: '{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}' },
    { name: 'Complex Data', input: '{"config": {"api": {"url": "https://api.example.com", "timeout": 5000}, "features": ["auth", "caching"]}}' },
  ];

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'JSON Formatter' },
      ]}
    >
      <ToolPageHeader
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON with syntax highlighting and real-time error messages."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <JsonFormatter initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/json-formatter" />
      <ToolRelatedTools toolRoute="/json-formatter" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the JSON Formatter"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Paste Your JSON',
                description: 'Copy and paste your JSON data into the editor',
              },
              {
                title: 'Choose Format',
                description: 'Select format (pretty print) or minify your JSON',
              },
              {
                title: 'Copy Result',
                description: 'Copy the formatted JSON or download as file',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why Use Our JSON Formatter?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Real-time Validation</h3>
                <p className="text-sm">Instant error detection with detailed error messages and line numbers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                <p className="text-sm">Process large JSON files instantly with our optimized formatter</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Privacy First</h3>
                <p className="text-sm">All processing happens locally — your data never leaves your device</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
          <ul className="bullet-list">
            <li><strong>Pretty Print:</strong> Format JSON with proper indentation</li>
            <li><strong>Minify:</strong> Compress JSON to smallest possible size</li>
            <li><strong>Validate:</strong> Check JSON syntax and structure</li>
            <li><strong>Syntax Highlighting:</strong> Color-coded JSON for easy reading</li>
            <li><strong>Error Detection:</strong> Pinpoint exact location of JSON errors</li>
            <li><strong>Copy & Download:</strong> Easy export of formatted JSON</li>
            <li><strong>Large File Support:</strong> Handle files up to 10MB</li>
            <li><strong>Mobile Friendly:</strong> Works perfectly on all devices</li>
          </ul>
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & best practices"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common JSON use cases</h3>
              <ul className="bullet-list">
                <li><strong>API Development:</strong> Format API responses and requests</li>
                <li><strong>Configuration Files:</strong> Validate and format config.json files</li>
                <li><strong>Data Exchange:</strong> Prepare JSON for data transfer</li>
                <li><strong>Debugging:</strong> Format JSON logs for easier debugging</li>
                <li><strong>Documentation:</strong> Create readable JSON examples</li>
                <li><strong>Testing:</strong> Validate JSON test data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">JSON best practices</h3>
              <ul className="bullet-list">
                <li>Always validate JSON before using in production</li>
                <li>Use consistent indentation (2 or 4 spaces)</li>
                <li>Include proper error handling for invalid JSON</li>
                <li>Use meaningful property names</li>
                <li>Avoid deeply nested structures when possible</li>
                <li>Consider using JSON Schema for validation</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Pro tip</h3>
            <p className="text-sm">
              Use our JSON formatter to quickly identify syntax errors in your JSON data.
              The real-time validation will highlight exactly where the problem is, making
              debugging much faster and easier.
            </p>
          </div>
        </ToolSeoPanel>
        <ToolFaqPanel faqs={getToolFaqs('/json-formatter')} />
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default JsonFormatterPage;
