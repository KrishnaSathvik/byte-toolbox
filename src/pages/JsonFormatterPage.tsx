import { ToolLayout } from '@/components/ToolLayout';
import { JsonFormatter } from '@/components/tools/JsonFormatter';
import { Code2, CheckCircle, Zap, Shield, Download, Copy } from 'lucide-react';

/**
 * JSON Formatter page with SEO optimization
 * 
 * This page provides comprehensive information about the JSON Formatter tool
 * and includes the actual tool component for immediate use.
 */
export const JsonFormatterPage = () => {
  const examples = [
    {
      name: 'Simple Object',
      input: '{"name": "John", "age": 30, "city": "New York"}'
    },
    {
      name: 'Nested Array',
      input: '{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}'
    },
    {
      name: 'Complex Data',
      input: '{"config": {"api": {"url": "https://api.example.com", "timeout": 5000}, "features": ["auth", "caching"]}}'
    }
  ];

  const handleFillExample = (input: string) => {
    // This will be handled by the JsonFormatter component
    console.log('Example filled:', input);
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON data with syntax highlighting. Free online JSON formatter with real-time validation and error detection."
      examples={examples}
      onFillExample={handleFillExample}
    >
      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our JSON Formatter?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Validation</h3>
                    <p className="text-sm text-muted-foreground">Instant error detection with detailed error messages and line numbers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">Process large JSON files instantly with our optimized formatter</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">All processing happens locally - your data never leaves your device</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Pretty Print:</strong> Format JSON with proper indentation</li>
                <li>• <strong>Minify:</strong> Compress JSON to smallest possible size</li>
                <li>• <strong>Validate:</strong> Check JSON syntax and structure</li>
                <li>• <strong>Syntax Highlighting:</strong> Color-coded JSON for easy reading</li>
                <li>• <strong>Error Detection:</strong> Pinpoint exact location of JSON errors</li>
                <li>• <strong>Copy & Download:</strong> Easy export of formatted JSON</li>
                <li>• <strong>Large File Support:</strong> Handle files up to 10MB</li>
                <li>• <strong>Mobile Friendly:</strong> Works perfectly on all devices</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">How to Use the JSON Formatter</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Paste Your JSON</h4>
                <p className="text-sm text-muted-foreground">Copy and paste your JSON data into the editor</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Choose Format</h4>
                <p className="text-sm text-muted-foreground">Select format (pretty print) or minify your JSON</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Copy Result</h4>
                <p className="text-sm text-muted-foreground">Copy the formatted JSON or download as file</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="p-6">
        <JsonFormatter />
      </div>

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common JSON Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>API Development:</strong> Format API responses and requests</li>
                <li>• <strong>Configuration Files:</strong> Validate and format config.json files</li>
                <li>• <strong>Data Exchange:</strong> Prepare JSON for data transfer</li>
                <li>• <strong>Debugging:</strong> Format JSON logs for easier debugging</li>
                <li>• <strong>Documentation:</strong> Create readable JSON examples</li>
                <li>• <strong>Testing:</strong> Validate JSON test data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">JSON Best Practices</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Always validate JSON before using in production</li>
                <li>• Use consistent indentation (2 or 4 spaces)</li>
                <li>• Include proper error handling for invalid JSON</li>
                <li>• Use meaningful property names</li>
                <li>• Avoid deeply nested structures when possible</li>
                <li>• Consider using JSON Schema for validation</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-info mb-2">💡 Pro Tip</h3>
            <p className="text-info/80">
              Use our JSON formatter to quickly identify syntax errors in your JSON data. 
              The real-time validation will highlight exactly where the problem is, making 
              debugging much faster and easier.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatterPage;