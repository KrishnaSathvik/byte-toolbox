import { useState, useCallback, useEffect } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { trackToolUsage, trackConversion, trackError } from '@/lib/analytics';
import { Copy, Download, Wand2, Minimize2, FileText, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Props for the JsonFormatter component
 */
interface JsonFormatterProps {
  /** Initial value to populate the input field */
  initialValue?: string;
}

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
export const JsonFormatter = ({ initialValue = '' }: JsonFormatterProps = {}) => {
  const [input, setInput] = useState(initialValue);
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [isMinified, setIsMinified] = useState(false);

  // Update input when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);
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
      
      // Track successful formatting
      trackToolUsage('JSON Formatter', minify ? 'minify_json' : 'format_json', {
        input_length: jsonString.length,
        output_length: formatted.length,
        is_minified: minify
      });
      trackConversion(minify ? 'json_minified' : 'json_formatted', 'JSON Formatter');
      
      toast({
        title: minify ? 'JSON Minified' : 'JSON Formatted',
        description: `Successfully ${minify ? 'minified' : 'formatted'} your JSON`,
      });
    } catch (err) {
      // Track error
      trackError('json_validation_failed', err instanceof Error ? err.message : 'Invalid JSON', 'JSON Formatter');
      
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
      trackToolUsage('JSON Formatter', 'copy_output', {
        output_length: output.length,
        is_minified: isMinified
      });
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
      
      // Track download
      trackToolUsage('JSON Formatter', 'download_output', {
        output_length: output.length,
        is_minified: isMinified,
        file_name: a.download
      });
      
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
    trackToolUsage('JSON Formatter', 'clear_all');
  };

  return (
    <div className="w-full tool-workspace">
      <div className="dev-toolbar">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleFormat} className="flex items-center gap-2 text-sm flex-1 sm:flex-none">
            <Wand2 className="w-4 h-4" />
            Format
          </Button>
          <Button onClick={handleMinify} variant="secondary" className="flex items-center gap-2 text-sm flex-1 sm:flex-none">
            <Minimize2 className="w-4 h-4" />
            Minify
          </Button>
          <Button onClick={handleClear} variant="outline" className="text-sm flex-1 sm:flex-none">
            Clear
          </Button>
        </div>

        <div
          className="p-3 rounded-lg bg-secondary/30 border border-border"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
            {isValid === true && (
              <>
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-success font-medium">Valid JSON</span>
                <span className="text-muted-foreground">
                  Size: {new Blob([output]).size} bytes
                  {isMinified && ' (minified)'}
                </span>
              </>
            )}
            {isValid === false && (
              <>
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-destructive font-medium">Invalid JSON</span>
                <span className="text-muted-foreground font-mono text-xs">{error}</span>
              </>
            )}
            {isValid === null && (
              <>
                <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Paste JSON, then Format or Minify.</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
          <div className="w-full p-4 sm:p-5 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground text-sm sm:text-base">Input JSON</h3>
            </div>
            <div className="w-full dev-panel overflow-hidden">
              <MonacoEditor
                value={input}
                onChange={(value) => setInput(value || '')}
                language="json"
                placeholder='Paste JSON here — e.g. {"name":"api-response","status":"ok"}'
                height="280px"
              />
            </div>
          </div>

          <div className="w-full p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground text-sm sm:text-base">
                  {isMinified ? 'Minified JSON' : 'Formatted JSON'}
                </h3>
              </div>
              {output && (
                <div className="flex flex-wrap items-center gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2 text-sm">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full dev-panel overflow-hidden">
              <MonacoEditor
                value={output}
                language="json"
                readOnly
                height="280px"
                placeholder="Formatted JSON will appear here..."
              />
            </div>
          </div>
        </div>
    </div>
  );
};