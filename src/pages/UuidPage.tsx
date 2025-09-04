import { ToolLayout } from '@/components/ToolLayout';
import { UuidGenerator } from '@/components/tools/UuidGenerator';
import { Key, CheckCircle, Zap, Shield, Copy, Download } from 'lucide-react';

/**
 * UUID Generator page with SEO optimization
 * 
 * This page provides comprehensive information about the UUID Generator tool
 * and includes the actual tool component for immediate use.
 */
export const UuidPage = () => {
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

  const handleFillExample = (input: string) => {
    // This will be handled by the UuidGenerator component
    console.log('Example filled:', input);
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate UUIDs in bulk with formatting options. Free online UUID generator for v4 UUIDs with copy, download, and customization features."
      examples={examples}
      onFillExample={handleFillExample}
    >
      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our UUID Generator?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Bulk Generation</h3>
                    <p className="text-sm text-muted-foreground">Generate up to 1000 UUIDs at once for testing and development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Formatting Options</h3>
                    <p className="text-sm text-muted-foreground">Customize UUID format with uppercase and hyphen removal options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Cryptographically Secure</h3>
                    <p className="text-sm text-muted-foreground">Uses crypto.getRandomValues() for secure random generation</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Bulk Generation:</strong> Create 1-1000 UUIDs at once</li>
                <li>• <strong>UUID v4:</strong> Random UUIDs using secure random numbers</li>
                <li>• <strong>Format Options:</strong> Uppercase, remove hyphens, or both</li>
                <li>• <strong>Copy Individual:</strong> Click any UUID to copy it</li>
                <li>• <strong>Copy All:</strong> Copy all generated UUIDs at once</li>
                <li>• <strong>Download:</strong> Save UUIDs as a text file</li>
                <li>• <strong>Real-time Preview:</strong> See format before generating</li>
                <li>• <strong>Memory Efficient:</strong> Handle large lists without performance issues</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">How to Use the UUID Generator</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Set Quantity</h4>
                <p className="text-sm text-muted-foreground">Choose how many UUIDs to generate (1-1000)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Format</h4>
                <p className="text-sm text-muted-foreground">Select uppercase, remove hyphens, or both</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Generate & Copy</h4>
                <p className="text-sm text-muted-foreground">Generate UUIDs and copy individual or all at once</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="p-6">
        <UuidGenerator />
      </div>

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common UUID Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Database Keys:</strong> Primary keys and foreign keys in databases</li>
                <li>• <strong>API Identifiers:</strong> Unique IDs for API requests and responses</li>
                <li>• <strong>Session IDs:</strong> Unique session identifiers for web applications</li>
                <li>• <strong>File Naming:</strong> Generate unique filenames for uploaded files</li>
                <li>• <strong>Distributed Systems:</strong> Unique node identifiers in distributed systems</li>
                <li>• <strong>Testing:</strong> Generate test data with unique identifiers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">UUID v4 Specifications</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Format:</strong> xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</li>
                <li>• <strong>Version:</strong> 4 (indicated by '4' in third group)</li>
                <li>• <strong>Variant:</strong> y = 8, 9, A, or B (fourth group)</li>
                <li>• <strong>Length:</strong> 128 bits (32 hexadecimal characters)</li>
                <li>• <strong>Collision Probability:</strong> ~5.3×10⁻³⁷ (extremely low)</li>
                <li>• <strong>Randomness:</strong> Uses cryptographically secure random numbers</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-info mb-2">💡 Pro Tip</h3>
            <p className="text-info/80">
              Use UUIDs for database primary keys instead of auto-incrementing integers. 
              UUIDs are globally unique, making them perfect for distributed systems and 
              preventing ID conflicts when merging databases.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UuidPage;