import { ToolLayout } from '@/components/ToolLayout';
import { HashGenerator } from '@/components/tools/HashGenerator';
import { Shield, CheckCircle, Zap, FileText, AlertTriangle } from 'lucide-react';

/**
 * Hash Generator page with SEO optimization
 * 
 * This page provides comprehensive information about the Hash Generator tool
 * and includes the actual tool component for immediate use.
 */
export const HashPage = () => {
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
    // This will be handled by the HashGenerator component
    console.log('Example filled:', input);
  };

  return (
    <ToolLayout
      title="Hash Generator & Verifier"
      description="Generate cryptographic hashes (SHA-256, SHA-512, MD5, SHA-1) with file support. Free online hash generator with security warnings and comparison features."
      examples={examples}
      onFillExample={handleFillExample}
    >
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
                    <p className="text-sm text-muted-foreground">Visual warnings for deprecated algorithms like MD5 and SHA-1</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>SHA-256:</strong> Secure, widely used, recommended for new projects</li>
                <li>• <strong>SHA-512:</strong> More secure than SHA-256, larger output</li>
                <li>• <strong>MD5:</strong> Fast but cryptographically broken (deprecated)</li>
                <li>• <strong>SHA-1:</strong> Deprecated but still common in legacy systems</li>
                <li>• <strong>File Hashing:</strong> Hash entire files or just text input</li>
                <li>• <strong>Hash Comparison:</strong> Compare hashes for verification</li>
                <li>• <strong>Copy & Download:</strong> Easy export of hash results</li>
                <li>• <strong>Security Alerts:</strong> Warnings for weak algorithms</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">How to Use the Hash Generator</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Data</h4>
                <p className="text-sm text-muted-foreground">Type text or upload a file to hash</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Algorithm</h4>
                <p className="text-sm text-muted-foreground">Select hash algorithm (SHA-256 recommended)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Get Hash</h4>
                <p className="text-sm text-muted-foreground">Copy the hash or compare with another</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="p-6">
        <HashGenerator />
      </div>

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Hash Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Password Storage:</strong> Hash passwords before storing in databases</li>
                <li>• <strong>File Integrity:</strong> Verify files haven't been corrupted</li>
                <li>• <strong>Digital Signatures:</strong> Create and verify digital signatures</li>
                <li>• <strong>Data Deduplication:</strong> Identify duplicate files by hash</li>
                <li>• <strong>Blockchain:</strong> Hash blocks in blockchain applications</li>
                <li>• <strong>API Security:</strong> Create HMAC signatures for API requests</li>
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

          <div className="mt-8 bg-warning/10 border border-warning/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-warning mb-2">⚠️ Security Warning</h3>
            <p className="text-warning/80">
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