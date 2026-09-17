import { ToolLayout } from '@/components/ToolLayout';
import { UuidGenerator } from '@/components/tools/UuidGenerator';
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

export const UuidPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'UUID Generator (v4) - Bulk UUID Creator | ByteToolBox',
    description:
      'Generate UUID v4 identifiers in bulk with formatting options. Free online UUID generator that runs locally in your browser.',
    keywords:
      'UUID generator, GUID generator, unique identifier, UUID v4, database keys, API tokens, unique ID generator, online UUID tool',
    canonical: 'https://www.bytetoolbox.com/uuid',
    ogImage: '/og/uuid.png',
    structuredData: toolPageStructuredData({
      name: 'UUID Generator (v4) - ByteToolBox',
      description: 'Generate UUID v4 identifiers in bulk with formatting options.',
      path: '/uuid',
      featureList: [
        'UUID v4 Generation (Random)',
        'Bulk UUID Generation (1-1000)',
        'Uppercase and Hyphen Formatting',
        'Copy to Clipboard',
        'Download as Text File',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'UUID Generator' },
      ],
      faqs: getToolFaqs('/uuid'),
    }),
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

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'UUID Generator' }
      ]}
    >
      <ToolPageHeader
        title="UUID Generator"
        description="Generate UUIDs in bulk with formatting options. Free online UUID generator for v4 UUIDs with copy, download, and customization features."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <UuidGenerator initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/uuid" />
      <ToolRelatedTools toolRoute="/uuid" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the UUID Generator"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Set Quantity',
                description: 'Choose how many UUIDs to generate (1-1000)',
              },
              {
                title: 'Choose Format',
                description: 'Select uppercase, remove hyphens, or both',
              },
              {
                title: 'Generate & Copy',
                description: 'Generate UUIDs and copy individual or all at once',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why use our UUID Generator?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Bulk Generation</h3>
                <p className="text-sm text-muted-foreground">Generate up to 1000 UUIDs at once for testing and development</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Formatting Options</h3>
                <p className="text-sm text-muted-foreground">Customize UUID format with uppercase and hyphen removal options</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Cryptographically Secure</h3>
                <p className="text-sm text-muted-foreground">Uses crypto.getRandomValues() for secure random generation</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
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
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & specifications"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common UUID use cases</h3>
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
              <h3 className="text-base font-semibold text-foreground mb-3">UUID v4 specifications</h3>
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
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Pro tip</h3>
            <p className="text-sm">
              Use UUIDs for database primary keys instead of auto-incrementing integers.
              UUIDs are globally unique, making them perfect for distributed systems and
              preventing ID conflicts when merging databases.
            </p>
          </div>
        </ToolSeoPanel>
        <ToolFaqPanel faqs={getToolFaqs('/uuid')} />
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default UuidPage;
