import { ToolLayout } from '@/components/ToolLayout';
import { Base64Encoder } from '@/components/tools/Base64Encoder';
import { Code2, CheckCircle, Zap, Shield, Upload, Download } from 'lucide-react';

/**
 * Base64 Encoder page with SEO optimization
 * 
 * This page provides comprehensive information about the Base64 Encoder tool
 * and includes the actual tool component for immediate use.
 */
export const Base64Page = () => {
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

  const handleFillExample = (input: string) => {
    // This will be handled by the Base64Encoder component
    console.log('Example filled:', input);
  };

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode and decode Base64 data with file support. Free online Base64 encoder/decoder with Unicode support and URL-safe encoding options."
      examples={examples}
      onFillExample={handleFillExample}
    >
      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our Base64 Encoder?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Unicode Support</h3>
                    <p className="text-sm text-muted-foreground">Properly handle Unicode characters and emojis in Base64 encoding</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">File Support</h3>
                    <p className="text-sm text-muted-foreground">Upload and encode files up to 10MB with drag-and-drop support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">All encoding/decoding happens locally - your data never leaves your device</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Bidirectional:</strong> Encode text to Base64 and decode Base64 to text</li>
                <li>• <strong>File Upload:</strong> Upload and encode files directly</li>
                <li>• <strong>URL-Safe:</strong> Support for URL-safe Base64 encoding</li>
                <li>• <strong>Unicode:</strong> Proper handling of international characters</li>
                <li>• <strong>Binary Support:</strong> Encode binary files and images</li>
                <li>• <strong>Copy & Download:</strong> Easy export of encoded/decoded data</li>
                <li>• <strong>Large Files:</strong> Handle files up to 10MB</li>
                <li>• <strong>Real-time:</strong> Instant encoding/decoding as you type</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">How to Use the Base64 Encoder</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Data</h4>
                <p className="text-sm text-muted-foreground">Type text or upload a file to encode/decode</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Mode</h4>
                <p className="text-sm text-muted-foreground">Select encode or decode mode and options</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Get Result</h4>
                <p className="text-sm text-muted-foreground">Copy the result or download as file</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="p-6">
        <Base64Encoder />
      </div>

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Base64 Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Email Attachments:</strong> Encode files for email transmission</li>
                <li>• <strong>Data URLs:</strong> Embed images in HTML/CSS</li>
                <li>• <strong>API Development:</strong> Encode binary data for JSON APIs</li>
                <li>• <strong>Configuration:</strong> Store binary data in text-based configs</li>
                <li>• <strong>Web Development:</strong> Encode images for inline display</li>
                <li>• <strong>Data Storage:</strong> Store binary data in text databases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Base64 Encoding Standards</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>RFC 4648:</strong> Standard Base64 encoding</li>
                <li>• <strong>URL-Safe:</strong> Uses - and _ instead of + and /</li>
                <li>• <strong>Padding:</strong> Uses = for padding when needed</li>
                <li>• <strong>Character Set:</strong> A-Z, a-z, 0-9, +, /, =</li>
                <li>• <strong>Line Length:</strong> Typically 76 characters per line</li>
                <li>• <strong>Size Increase:</strong> ~33% larger than original data</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-info mb-2">💡 Pro Tip</h3>
            <p className="text-info/80">
              Use URL-safe Base64 encoding when including Base64 data in URLs or form data. 
              This prevents issues with special characters that might be interpreted by web servers.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Base64Page;