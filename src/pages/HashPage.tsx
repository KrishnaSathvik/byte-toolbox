import { ToolLayout } from '@/components/ToolLayout';
import { HashGenerator } from '@/components/tools/HashGenerator';
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
import { Shield, CheckCircle, Zap, AlertTriangle, FileText, Target } from 'lucide-react';
import { useState } from 'react';

export const HashPage = () => {
  const [selectedExample, setSelectedExample] = useState<string>('');

  useSEO({
    title: 'Hash Generator - Free Online MD5, SHA-1, SHA-256, SHA-512 Tool | ByteToolBox',
    description:
      'Generate cryptographic checksums instantly. Free online hash tool for MD5, SHA-1, SHA-256, and SHA-512 — file integrity, release manifests, and debugging. Not for password storage.',
    keywords:
      'hash generator, MD5, SHA-1, SHA-256, SHA-512, cryptographic hash, checksum, file integrity, data integrity, security testing, online hash tool',
    canonical: 'https://www.bytetoolbox.com/hash',
    structuredData: toolPageStructuredData({
      name: 'Hash Generator - ByteToolBox',
      description:
        'Generate MD5, SHA-1, SHA-256, and SHA-512 checksums for file integrity and development workflows.',
      path: '/hash',
      featureList: [
        'MD5 Hash Generation',
        'SHA-1 Hash Generation',
        'SHA-256 Hash Generation',
        'SHA-512 Hash Generation',
        'Text and File Input Support',
        'Real-time Hash Generation',
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Hash Generator' },
      ],
      faqs: getToolFaqs('/hash'),
    }),
  });

  const examples = [
    { name: 'Simple Text', input: 'Hello, World!' },
    { name: 'Release manifest', input: 'app-v2.1.0-build-4821' },
    { name: 'JSON Data', input: '{"user": "john", "id": 123}' },
  ];

  return (
    <ToolLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Hash Generator' },
      ]}
    >
      <ToolPageHeader
        title="Hash Generator & Checksum Tool"
        description="Generate MD5, SHA-1, SHA-256, and SHA-512 checksums for text and files. Ideal for integrity checks, release verification, and debugging."
      />
      <ToolQuickExamples examples={examples} onSelect={setSelectedExample} />
      <HashGenerator initialValue={selectedExample} />
      <ToolGuideCta toolRoute="/hash" />
      <ToolRelatedTools toolRoute="/hash" />

      <ToolSeoSection>
        <ToolSeoPanel
          value="how"
          title="How to use the hash generator"
          icon={<FileText className="w-4 h-4" />}
        >
          <ToolHowToSteps
            steps={[
              {
                title: 'Enter Data',
                description: 'Type text or upload a file to hash',
              },
              {
                title: 'Choose Algorithm',
                description: 'Select SHA-256 for most checksum use cases',
              },
              {
                title: 'Compare',
                description: 'Copy the digest or compare against a known checksum',
              },
            ]}
          />
        </ToolSeoPanel>

        <ToolSeoPanel
          value="why"
          title="Why use this hash tool?"
          icon={<Target className="w-4 h-4" />}
        >
          <div className="mb-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 text-sm text-amber-800 dark:text-amber-200">
            <strong>Not for passwords:</strong> For passwords, use dedicated password hashing algorithms such as
            bcrypt, scrypt, or Argon2. Plain hashes are not enough for password storage.
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Multiple algorithms</h3>
                <p className="text-sm">SHA-256, SHA-512, MD5, and SHA-1 for checksums and legacy compatibility</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">File support</h3>
                <p className="text-sm">Upload and hash files up to 10MB with drag-and-drop</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-info mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Security warnings</h3>
                <p className="text-sm">Visual warnings when using deprecated algorithms</p>
              </div>
            </div>
          </div>
        </ToolSeoPanel>

        <ToolSeoPanel value="features" title="Key features" icon={<Zap className="w-4 h-4" />}>
          <ul className="bullet-list">
            <li><strong>SHA-256:</strong> Recommended for new checksum workflows</li>
            <li><strong>SHA-512:</strong> Larger digest, stronger collision resistance</li>
            <li><strong>MD5:</strong> Legacy checksums only — not secure for integrity guarantees</li>
            <li><strong>SHA-1:</strong> Deprecated; common in older systems</li>
            <li><strong>File hashing:</strong> Hash entire files or text input</li>
            <li><strong>Hash comparison:</strong> Verify downloads and build artifacts</li>
          </ul>
        </ToolSeoPanel>

        <ToolSeoPanel
          value="use-cases"
          title="Use cases & security"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Common hash use cases</h3>
              <ul className="bullet-list">
                <li><strong>File integrity:</strong> Verify downloads and release artifacts</li>
                <li><strong>Build pipelines:</strong> Compare artifact checksums across environments</li>
                <li><strong>Debugging:</strong> Quick digests of config payloads and API bodies</li>
                <li><strong>Data deduplication:</strong> Identify duplicate content by hash</li>
                <li><strong>Cache keys:</strong> Derive stable keys from content</li>
                <li><strong>HMAC inputs:</strong> Prepare material for keyed hashing in your app</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Algorithm security</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground"><strong>SHA-256:</strong> Secure for checksums</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground"><strong>SHA-512:</strong> Very secure, larger output</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm text-foreground"><strong>SHA-1:</strong> Deprecated — avoid for new projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm text-foreground"><strong>MD5:</strong> Broken — legacy compatibility only</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Security warning</h3>
            <p className="text-sm">
              MD5 and SHA-1 are cryptographically broken and should not be used for security-sensitive integrity
              checks. Prefer SHA-256 or SHA-512. If you must use MD5 or SHA-1, treat them as legacy compatibility
              helpers — not as proof of authenticity.
            </p>
          </div>
        </ToolSeoPanel>
        <ToolFaqPanel faqs={getToolFaqs('/hash')} />
      </ToolSeoSection>
    </ToolLayout>
  );
};

export default HashPage;
