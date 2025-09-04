import { ToolLayout } from '@/components/ToolLayout';
import { RegexTester } from '@/components/tools/RegexTester';
import { Search, CheckCircle, Zap, Shield, Code2, Lightbulb } from 'lucide-react';

/**
 * Regex Tester page with SEO optimization
 * 
 * This page provides comprehensive information about the Regex Tester tool
 * and includes the actual tool component for immediate use.
 */
export const RegexPage = () => {
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

  const handleFillExample = (input: string) => {
    // This will be handled by the RegexTester component
    console.log('Example filled:', input);
  };

  return (
    <ToolLayout
      title="Regex Tester & Validator"
      description="Test regular expressions with real-time highlighting and validation. Free online regex tester with common patterns, flags, and match details."
      examples={examples}
      onFillExample={handleFillExample}
    >
      {/* SEO Content Section */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Our Regex Tester?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Testing</h3>
                    <p className="text-sm text-muted-foreground">See matches and highlights as you type your regex pattern</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">All JavaScript Flags</h3>
                    <p className="text-sm text-muted-foreground">Support for g, i, m, s, u, and y flags with explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-info mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Pattern Library</h3>
                    <p className="text-sm text-muted-foreground">Common regex patterns for email, phone, URL, and more</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Real-time Highlighting:</strong> See matches highlighted as you type</li>
                <li>• <strong>Match Details:</strong> View groups, positions, and match information</li>
                <li>• <strong>All Flags:</strong> Support for g, i, m, s, u, y JavaScript flags</li>
                <li>• <strong>Pattern Library:</strong> Common regex patterns ready to use</li>
                <li>• <strong>Error Detection:</strong> Highlight syntax errors in regex patterns</li>
                <li>• <strong>Copy Results:</strong> Easy copying of matched text and patterns</li>
                <li>• <strong>Multi-line Support:</strong> Test regex on multi-line text</li>
                <li>• <strong>Unicode Support:</strong> Full Unicode character support</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">How to Use the Regex Tester</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enter Pattern</h4>
                <p className="text-sm text-muted-foreground">Type your regex pattern in the pattern field</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Add Test Text</h4>
                <p className="text-sm text-muted-foreground">Enter text to test your regex pattern against</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">View Results</h4>
                <p className="text-sm text-muted-foreground">See matches, groups, and detailed information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="p-6">
        <RegexTester />
      </div>

      {/* Additional SEO Content */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Regex Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Form Validation:</strong> Validate email, phone, and other input formats</li>
                <li>• <strong>Text Processing:</strong> Find and replace text patterns in documents</li>
                <li>• <strong>Data Extraction:</strong> Extract specific data from text or logs</li>
                <li>• <strong>Search & Replace:</strong> Find and replace text in code editors</li>
                <li>• <strong>URL Routing:</strong> Match URL patterns in web frameworks</li>
                <li>• <strong>Log Analysis:</strong> Parse and analyze log files</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">JavaScript Regex Flags</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>g (global):</strong> Find all matches, not just the first</li>
                <li>• <strong>i (ignore case):</strong> Case-insensitive matching</li>
                <li>• <strong>m (multiline):</strong> ^ and $ match line breaks</li>
                <li>• <strong>s (dotall):</strong> . matches newline characters</li>
                <li>• <strong>u (unicode):</strong> Full Unicode support</li>
                <li>• <strong>y (sticky):</strong> Match only at the last index</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-info mb-2">💡 Pro Tip</h3>
            <p className="text-info/80">
              Use the pattern library to get started with common regex patterns. You can modify 
              these patterns to fit your specific needs, and the real-time highlighting will 
              help you understand how each part of the regex works.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexPage;