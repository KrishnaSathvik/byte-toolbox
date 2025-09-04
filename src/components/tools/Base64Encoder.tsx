import { useState, useCallback, useEffect } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { trackToolUsage, trackConversion, trackError } from '@/lib/analytics';
import { Copy, Download, ArrowUpDown, Upload, Type, FileText } from 'lucide-react';

/**
 * Predefined examples for quick testing of Base64 encoding functionality
 */
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

/**
 * Props for the Base64Encoder component
 */
interface Base64EncoderProps {
  /** Initial value to populate the input field */
  initialValue?: string;
}

/**
 * Base64Encoder - A comprehensive Base64 encoding and decoding tool
 * 
 * Features:
 * - Unicode-safe encoding/decoding using TextEncoder/TextDecoder
 * - URL-safe Base64 variant support (RFC 4648 Section 5)
 * - File upload support (up to 10MB)
 * - Binary file encoding support
 * - Copy to clipboard functionality
 * - Download results as text files
 * - Real-time conversion with error handling
 * - Professional Monaco editor integration
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Base64Encoder />
 * 
 * // The component handles all state internally and provides:
 * // - Encode/decode mode switching
 * // - URL-safe Base64 option
 * // - File upload for both text and binary files
 * // - Copy/download functionality
 * ```
 * 
 * Technical Details:
 * - Uses TextEncoder/TextDecoder for proper Unicode handling
 * - Supports both standard and URL-safe Base64 encoding
 * - File size limit of 10MB for performance
 * - Handles binary files through ArrayBuffer
 * 
 * @returns JSX element containing the complete Base64 encoder/decoder interface
 */
export const Base64Encoder = ({ initialValue = '' }: Base64EncoderProps = {}) => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState(initialValue);
  const [output, setOutput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState('');

  // Update input when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);
  const { toast } = useToast();

  /**
   * Encodes text to Base64 with Unicode support
   * 
   * @param text - The text to encode
   * @param urlSafe - Whether to use URL-safe Base64 encoding (replaces +/= with -/_)
   * @returns Base64 encoded string
   * @throws {Error} When encoding fails
   */
  const encodeBase64 = useCallback((text: string, urlSafe: boolean = false) => {
    try {
      // Unicode-safe encoding
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      bytes.forEach(byte => binary += String.fromCharCode(byte));
      let result = btoa(binary);
      
      if (urlSafe) {
        result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }
      
      return result;
    } catch (err) {
      throw new Error('Failed to encode text');
    }
  }, []);

  /**
   * Decodes Base64 string to text with Unicode support
   * 
   * @param encoded - The Base64 string to decode
   * @param urlSafe - Whether the input uses URL-safe Base64 encoding
   * @returns Decoded text string
   * @throws {Error} When decoding fails or input is invalid
   */
  const decodeBase64 = useCallback((encoded: string, urlSafe: boolean = false) => {
    try {
      let input = encoded;
      
      if (urlSafe) {
        // Convert URL-safe back to standard Base64
        input = input.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if needed
        while (input.length % 4) {
          input += '=';
        }
      }
      
      const binary = atob(input);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      
      return new TextDecoder().decode(bytes);
    } catch (err) {
      throw new Error('Invalid Base64 string');
    }
  }, []);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (mode === 'encode') {
        const result = encodeBase64(input, urlSafe);
        setOutput(result);
        setError('');
        
        // Track successful encoding
        trackToolUsage('Base64 Encoder', 'encode_text', {
          input_length: input.length,
          url_safe: urlSafe,
          output_length: result.length
        });
        trackConversion('base64_encoded', 'Base64 Encoder');
        
        toast({
          title: 'Encoded Successfully',
          description: `Text encoded to Base64${urlSafe ? ' (URL-safe)' : ''}`,
        });
      } else {
        const result = decodeBase64(input, urlSafe);
        setOutput(result);
        setError('');
        
        // Track successful decoding
        trackToolUsage('Base64 Encoder', 'decode_text', {
          input_length: input.length,
          url_safe: urlSafe,
          output_length: result.length
        });
        trackConversion('base64_decoded', 'Base64 Encoder');
        
        toast({
          title: 'Decoded Successfully',
          description: 'Base64 decoded to text',
        });
      }
    } catch (err) {
      // Track error
      trackError('base64_conversion_failed', err instanceof Error ? err.message : 'Conversion failed', 'Base64 Encoder');
      
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setOutput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File Too Large',
        description: 'Please select a file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    
    if (mode === 'encode') {
      reader.onload = () => {
        if (reader.result) {
          try {
            const arrayBuffer = reader.result as ArrayBuffer;
            const bytes = new Uint8Array(arrayBuffer);
            let binary = '';
            bytes.forEach(byte => binary += String.fromCharCode(byte));
            let result = btoa(binary);
            
            if (urlSafe) {
              result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
            }
            
            setOutput(result);
            toast({
              title: 'File Encoded',
              description: `${file.name} encoded to Base64`,
            });
          } catch (err) {
            setError('Failed to encode file');
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = () => {
        if (reader.result) {
          setInput(reader.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: 'Copied!',
        description: 'Result copied to clipboard',
      });
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mode}d_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Downloaded!',
        description: 'Result saved to your device',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleFillExample = (exampleInput: string) => {
    setInput(exampleInput);
    setMode('encode');
  };

  return (
    <ToolLayout>
      <div className="w-full">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-3 sm:p-6 border-b border-border">
          {/* Top Row - Mode Toggle and Options */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center bg-secondary rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setMode('encode')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === 'encode' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === 'decode' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Decode
              </button>
            </div>

            {/* Options */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={urlSafe}
                  onChange={(e) => setUrlSafe(e.target.checked)}
                  className="rounded border-border"
                />
                URL Safe
              </label>

              {/* File Upload */}
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept={mode === 'encode' ? '*/*' : '.txt,.json'}
                />
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload File</span>
                  <span className="sm:hidden">Upload</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom Row - Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={handleConvert} className="flex items-center gap-2 flex-1 sm:flex-none">
                <ArrowUpDown className="w-4 h-4" />
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </Button>
              <Button onClick={handleClear} variant="outline" className="flex-1 sm:flex-none">
                Clear
              </Button>
            </div>
            
            {output && (
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2 flex-1 sm:flex-none">
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                  <span className="sm:hidden">Copy</span>
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-2 flex-1 sm:flex-none">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Editors - Full width layout */}
        <div className="w-full">
          {/* Input */}
          <div className="w-full p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground text-sm sm:text-base">
                {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
              </h3>
            </div>
            <div className="w-full">
              <MonacoEditor
                value={input}
                onChange={(value) => setInput(value || '')}
                language={mode === 'encode' ? 'plaintext' : 'plaintext'}
                placeholder={mode === 'encode' 
                  ? 'Enter text to encode to Base64...\n\nExample:\nHello, World!'
                  : 'Enter Base64 string to decode...\n\nExample:\nSGVsbG8sIFdvcmxkIQ=='
                }
                height="300px"
              />
            </div>
          </div>

          {/* Output */}
          <div className="w-full p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground text-sm sm:text-base">
                {mode === 'encode' ? 'Base64 Output' : 'Text Output'}
              </h3>
            </div>
            <div className="w-full">
              <MonacoEditor
                value={output}
                language="plaintext"
                readOnly
                height="300px"
                placeholder={`${mode === 'encode' ? 'Base64 encoded' : 'Decoded text'} result will appear here...`}
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 p-4 sm:p-6 bg-secondary/30 rounded-lg mx-4 sm:mx-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {error ? (
              <>
                <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                <span className="text-destructive font-medium">Error: {error}</span>
              </>
            ) : output ? (
              <>
                <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                <span className="text-success font-medium">
                  {mode === 'encode' ? 'Encoded' : 'Decoded'} successfully
                </span>
                <span className="text-muted-foreground text-sm">
                  • Size: {new Blob([output]).size} bytes
                  {urlSafe && ' (URL-safe)'}
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm">
                  Enter {mode === 'encode' ? 'text' : 'Base64'} to {mode}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};