import { ToolLayout } from '@/components/ToolLayout';
import { Base64Encoder } from '@/components/tools/Base64Encoder';
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

export const Base64Page = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Base64 Encoder & Decoder - Free Online Tool | ByteToolBox',
    description: 'Encode and decode Base64 strings instantly. Free online Base64 encoder/decoder with file upload support. Perfect for data transmission, email attachments, and API development.',
    keywords: 'Base64 encoder, Base64 decoder, Base64 converter, Base64 online, data encoding, file encoding, API development, data transmission',
    canonical: 'https://www.bytetoolbox.com/base64',
    structuredData: toolPageStructuredData({
      name: 'Base64 Encoder & Decoder',
      description: 'Encode and decode Base64 strings instantly with our free online tool.',
      path: '/base64',
      featureList: [
        'Base64 Encoding and Decoding',
        'File Upload Support',
        'Copy to Clipboard',
        'Download as File',
        'Real-time Conversion',
        'Error Detection',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Base64 Encoder' },
      ],
      faqs: getToolFaqs('/base64'),
    })
  });

  const examples = [
    {
      name: 'Simple Text',
      input: 'Hello, World!'
    },
    {
      name: 'Unicode Text',
      input: 'Hello 世界 🌍 Émoji'
    },
    {
      name: 'JSON Data',
      input: '{"message": "This is a test", "timestamp": 1634567890}'
    }
  ];

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Base64 Encoder' }
      ]}
    >
      <ToolPageHeader
        title="Base64 Encoder & Decoder"
        description="Encode and decode Base64 data with file support. Free online Base64 encoder/decoder with Unicode support and URL-safe encoding options."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <Base64Encoder initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/base64" />
      <ToolRelatedTools toolRoute="/base64" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the Base64 Encoder"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Enter Data',
                description: 'Type text or upload a file to encode/decode',
              },
              {
                title: 'Choose Mode',
                description: 'Select encode or decode mode and options',
              },
              {
                title: 'Get Result',
                description: 'Copy the result or download as file',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why use our Base64 Encoder?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Unicode Support</h3>
                <p className="text-sm text-muted-foreground">Properly handle Unicode characters and emojis in Base64 encoding</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">File Support</h3>
                <p className="text-sm text-muted-foreground">Upload and encode files up to 10MB with drag-and-drop support</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Privacy First</h3>
                <p className="text-sm text-muted-foreground">All encoding/decoding happens locally - your data never leaves your device</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
          <ul className="bullet-list text-muted-foreground">
            <li><strong>Bidirectional:</strong> Encode text to Base64 and decode Base64 to text</li>
            <li><strong>File Upload:</strong> Upload and encode files directly</li>
            <li><strong>URL-Safe:</strong> Support for URL-safe Base64 encoding</li>
            <li><strong>Unicode:</strong> Proper handling of international characters</li>
            <li><strong>Binary Support:</strong> Encode binary files and images</li>
            <li><strong>Copy & Download:</strong> Easy export of encoded/decoded data</li>
            <li><strong>Large Files:</strong> Handle files up to 10MB</li>
            <li><strong>Real-time:</strong> Instant encoding/decoding as you type</li>
          </ul>
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & standards"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common Base64 use cases</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>Email Attachments:</strong> Encode files for email transmission</li>
                <li><strong>Data URLs:</strong> Embed images in HTML/CSS</li>
                <li><strong>API Development:</strong> Encode binary data for JSON APIs</li>
                <li><strong>Configuration:</strong> Store binary data in text-based configs</li>
                <li><strong>Web Development:</strong> Encode images for inline display</li>
                <li><strong>Data Storage:</strong> Store binary data in text databases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Base64 encoding standards</h3>
              <ul className="bullet-list text-muted-foreground">
                <li><strong>RFC 4648:</strong> Standard Base64 encoding</li>
                <li><strong>URL-Safe:</strong> Uses - and _ instead of + and /</li>
                <li><strong>Padding:</strong> Uses = for padding when needed</li>
                <li><strong>Character Set:</strong> A-Z, a-z, 0-9, +, /, =</li>
                <li><strong>Line Length:</strong> Typically 76 characters per line</li>
                <li><strong>Size Increase:</strong> ~33% larger than original data</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Pro tip</h3>
            <p className="text-sm">
              Use URL-safe Base64 encoding when including Base64 data in URLs or form data.
              This prevents issues with special characters that might be interpreted by web servers.
            </p>
          </div>
        </ToolSeoPanel>
        <ToolFaqPanel faqs={getToolFaqs('/base64')} />
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default Base64Page;
