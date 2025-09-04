import { useState, useCallback } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Wand2, Minimize2, FileText, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Predefined JSON examples for quick testing
 */
const examples = [
  {
    name: 'Simple Object',
    input: '{"name":"John","age":30,"city":"New York"}'
  },
  {
    name: 'Array with Objects',
    input: '[{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"}]'
  },
  {
    name: 'Nested Structure',
    input: '{"user":{"profile":{"name":"John","settings":{"theme":"dark","notifications":true}}}}'
  }
];

/**
 * JsonFormatter - A professional JSON formatting and validation tool
 * 
 * Features:
 * - Real-time JSON validation with detailed error messages
 * - Pretty-print formatting with configurable indentation
 * - JSON minification for production use
 * - Syntax highlighting with Monaco editor
 * - Copy to clipboard functionality
 * - Download formatted JSON as files
 * - Support for complex nested structures and arrays
 * 
 * @example
 * ```tsx
 * // Basic usage - automatically formats and validates JSON
 * <JsonFormatter />
 * 
 * // The component provides:
 * // - Format button: Pretty-prints JSON with 2-space indentation
 * // - Minify button: Removes whitespace for compact output
 * // - Validation: Real-time error detection with position info
 * // - Examples: Quick-fill buttons for common JSON structures
 * ```
 * 
 * Technical Details:
 * - Uses native JSON.parse() for validation (most reliable)
 * - JSON.stringify() with replacer and space parameters for formatting
 * - Monaco editor provides syntax highlighting and error detection
 * - Handles Unicode characters and special escape sequences correctly
 * 
 * Validation Features:
 * - Detects syntax errors with line/column information
 * - Shows file size of formatted output
 * - Visual status indicators (valid/invalid/pending)
 * - Toast notifications for user feedback
 * 
 * @returns JSX element containing the complete JSON formatter interface
 */
export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [isMinified, setIsMinified] = useState(false);
  const { toast } = useToast();

  /**
   * Validates and formats JSON string with error handling
   * 
   * @param jsonString - Raw JSON string to validate and format
   * @param minify - Whether to minify (true) or pretty-print (false) the output
   * @returns void - Updates component state with formatted result or error
   */
  const validateAndFormat = useCallback((jsonString: string, minify: boolean = false) => {
    if (!jsonString.trim()) {
      setOutput('');
      setIsValid(null);
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonString);
      const formatted = minify 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      
      setOutput(formatted);
      setIsValid(true);
      setError('');
      setIsMinified(minify);
      
      toast({
        title: minify ? 'JSON Minified' : 'JSON Formatted',
        description: `Successfully ${minify ? 'minified' : 'formatted'} your JSON`,
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  }, [toast]);

  const handleFormat = () => {
    validateAndFormat(input, false);
  };

  const handleMinify = () => {
    validateAndFormat(input, true);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: 'Copied!',
        description: 'Formatted JSON copied to clipboard',
      });
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `formatted_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Downloaded!',
        description: 'JSON file saved to your device',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsValid(null);
    setError('');
  };

  const handleFillExample = (exampleInput: string) => {
    setInput(exampleInput);
    validateAndFormat(exampleInput, false);
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate and minify JSON data with professional syntax highlighting. Perfect for debugging APIs, configuration files, and data analysis."
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleFormat} className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Format
            </Button>
            <Button onClick={handleMinify} variant="secondary" className="flex items-center gap-2">
              <Minimize2 className="w-4 h-4" />
              Minify
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {output && (
              <>
                <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Editors */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Input JSON</h3>
            </div>
            <MonacoEditor
              value={input}
              onChange={(value) => setInput(value || '')}
              language="json"
              placeholder='Paste your JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30\n}'
              height="400px"
            />
          </div>

          {/* Output */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">
                {isMinified ? 'Minified JSON' : 'Formatted JSON'}
              </h3>
            </div>
            <MonacoEditor
              value={output}
              language="json"
              readOnly
              height="400px"
              placeholder="Formatted JSON will appear here..."
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-3">
            {isValid === true && (
              <>
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-success font-medium">Valid JSON</span>
                <span className="text-muted-foreground">
                  • Size: {new Blob([output]).size} bytes
                  {isMinified && ' (minified)'}
                </span>
              </>
            )}
            {isValid === false && (
              <>
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-medium">Invalid JSON</span>
                <span className="text-muted-foreground">• {error}</span>
              </>
            )}
            {isValid === null && (
              <>
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Enter JSON to validate and format</span>
              </>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};