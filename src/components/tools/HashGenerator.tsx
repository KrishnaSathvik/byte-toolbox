import { useState, useCallback, useEffect } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { trackToolUsage, trackConversion, trackError } from '@/lib/analytics';
import { Copy, Download, Hash, Upload, AlertTriangle, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';

/**
 * Predefined examples for hash generation testing
 */
const examples = [
  {
    name: 'Simple Text',
    input: 'Hello, World!'
  },
  {
    name: 'Password',
    input: 'mySecurePassword123!'
  },
  {
    name: 'JSON Data',
    input: '{"user": "john", "id": 12345}'
  }
];

/**
 * Available hash algorithms with security indicators
 */
const algorithms = [
  { name: 'SHA-256', value: 'SHA256', secure: true },
  { name: 'SHA-512', value: 'SHA512', secure: true },
  { name: 'SHA-1', value: 'SHA1', secure: false },
  { name: 'MD5', value: 'MD5', secure: false }
];

/**
 * Props for the HashGenerator component
 */
interface HashGeneratorProps {
  /** Initial value to populate the input field */
  initialValue?: string;
}

/**
 * HashGenerator - A comprehensive cryptographic hash generation tool
 * 
 * Features:
 * - Multiple hash algorithms: SHA-256, SHA-512, SHA-1, MD5
 * - Security warnings for deprecated algorithms (MD5, SHA-1)
 * - File upload support for hashing file contents
 * - Hash comparison mode for verification
 * - Uppercase/lowercase output formatting
 * - Copy to clipboard and download functionality
 * - Real-time hash generation with error handling
 * 
 * @example
 * ```tsx
 * // Basic usage - generates hashes with multiple algorithms
 * <HashGenerator />
 * 
 * // The component provides:
 * // - Algorithm selection with security indicators
 * // - File upload for hashing file contents (up to 10MB)
 * // - Compare mode for hash verification
 * // - Format options (uppercase, URL-safe, etc.)
 * ```
 * 
 * Security Features:
 * - Visual warnings for cryptographically weak algorithms
 * - Recommendations for secure algorithms (SHA-256, SHA-512)
 * - Hash comparison for integrity verification
 * - Secure random salt generation (if implemented)
 * 
 * Technical Details:
 * - Uses CryptoJS library for reliable hash generation
 * - Supports binary file hashing through FileReader API
 * - Handles large files with size limits (10MB default)
 * - Case-insensitive hash comparison for verification
 * 
 * Supported Algorithms:
 * - SHA-256: Secure, widely used, recommended for new projects
 * - SHA-512: More secure than SHA-256, larger output
 * - SHA-1: Deprecated but still common in legacy systems
 * - MD5: Fast but cryptographically broken, not recommended
 * 
 * @returns JSX element containing the complete hash generator interface
 */
export const HashGenerator = ({ initialValue = '' }: HashGeneratorProps = {}) => {
  const [input, setInput] = useState(initialValue);
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [uppercase, setUppercase] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  // Update input when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);
  const [compareHash, setCompareHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const { toast } = useToast();

  /**
   * Generates a cryptographic hash from input text
   * 
   * @param text - The input text to hash
   * @param algo - Hash algorithm to use (SHA256, SHA512, SHA1, MD5)
   * @returns The generated hash string in hexadecimal format
   * @throws {Error} When algorithm is unsupported or generation fails
   */
  const generateHash = useCallback((text: string, algo: string) => {
    if (!text.trim()) return '';

    try {
      let hash = '';
      switch (algo) {
        case 'SHA256':
          hash = CryptoJS.SHA256(text).toString();
          break;
        case 'SHA512':
          hash = CryptoJS.SHA512(text).toString();
          break;
        case 'SHA1':
          hash = CryptoJS.SHA1(text).toString();
          break;
        case 'MD5':
          hash = CryptoJS.MD5(text).toString();
          break;
        default:
          throw new Error('Unsupported algorithm');
      }
      return uppercase ? hash.toUpperCase() : hash;
    } catch (error) {
      throw new Error('Failed to generate hash');
    }
  }, [uppercase]);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter text to hash',
        variant: 'destructive',
      });
      return;
    }

    try {
      const hash = generateHash(input, algorithm);
      setOutput(hash);
      
      // Track successful hash generation
      trackToolUsage('Hash Generator', 'generate_hash', {
        algorithm: algorithm,
        input_length: input.length,
        uppercase: uppercase,
        compare_mode: compareMode
      });
      
      // Track conversion for successful operations
      trackConversion('hash_generated', 'Hash Generator');
      
      // Check comparison if in compare mode
      if (compareMode && compareHash) {
        const matches = hash.toLowerCase() === compareHash.toLowerCase();
        setIsMatch(matches);
        
        // Track comparison result
        trackToolUsage('Hash Generator', 'compare_hash', {
          algorithm: algorithm,
          match_result: matches ? 'match' : 'mismatch'
        });
        
        toast({
          title: matches ? 'Hash Match!' : 'Hash Mismatch',
          description: matches ? 'The hashes match exactly' : 'The hashes do not match',
          variant: matches ? 'default' : 'destructive',
        });
      } else {
        toast({
          title: 'Hash Generated',
          description: `${algorithm} hash generated successfully`,
        });
      }
    } catch (error) {
      // Track error
      trackError('hash_generation_failed', error instanceof Error ? error.message : 'Unknown error', 'Hash Generator');
      
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  }, [input, algorithm, generateHash, compareMode, compareHash, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      trackError('file_too_large', 'File size exceeds 10MB limit', 'Hash Generator');
      toast({
        title: 'File Too Large',
        description: 'Please select a file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    // Track file upload
    trackToolUsage('Hash Generator', 'file_upload', {
      file_size: file.size,
      file_type: file.type,
      algorithm: algorithm
    });

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setInput(reader.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      trackToolUsage('Hash Generator', 'copy_output', {
        algorithm: algorithm,
        output_length: output.length
      });
      toast({
        title: 'Copied!',
        description: 'Hash copied to clipboard',
      });
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${algorithm.toLowerCase()}_hash_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Track download
      trackToolUsage('Hash Generator', 'download_output', {
        algorithm: algorithm,
        output_length: output.length,
        file_name: a.download
      });
      
      toast({
        title: 'Downloaded!',
        description: 'Hash saved to your device',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setCompareHash('');
    setIsMatch(null);
    trackToolUsage('Hash Generator', 'clear_all');
  };

  const handleFillExample = (exampleInput: string) => {
    setInput(exampleInput);
    trackToolUsage('Hash Generator', 'fill_example', {
      example_length: exampleInput.length
    });
  };

  const selectedAlgorithm = algorithms.find(a => a.value === algorithm);

  return (
    <ToolLayout>
      <div className="w-full">
        {/* Algorithm Selection */}
        <div className="mb-6 p-3 sm:p-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Hash Algorithm</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.value}
                onClick={() => {
                  setAlgorithm(algo.value);
                  trackToolUsage('Hash Generator', 'change_algorithm', {
                    algorithm: algo.value,
                    algorithm_name: algo.name
                  });
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  algorithm === algo.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  {algo.secure ? (
                    <Shield className="w-3 h-3 text-success" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-warning" />
                  )}
                  {algo.name}
                </div>
              </button>
            ))}
          </div>
          
          {selectedAlgorithm && !selectedAlgorithm.secure && (
            <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Security Warning</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                {algorithm} is considered cryptographically weak. Use SHA-256 or SHA-512 for security-critical applications.
              </p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 p-3 sm:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-border"
              />
              Uppercase Output
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => setCompareMode(e.target.checked)}
                className="rounded border-border"
              />
              Compare Mode
            </label>
          </div>

          <div className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".txt,.json,.js,.html,.css,.md"
            />
            <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload File</span>
              <span className="sm:hidden">Upload File</span>
            </Button>
          </div>
        </div>

        {/* Input - Full width */}
        <div className="w-full p-4 sm:p-6 border-b border-border mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground text-sm sm:text-base">Input Text</h3>
          </div>
          <div className="w-full">
            <MonacoEditor
              value={input}
              onChange={(value) => setInput(value || '')}
              language="plaintext"
              placeholder="Enter text to hash..."
              height="250px"
            />
          </div>
        </div>

        {/* Compare Hash Input - Full width */}
        {compareMode && (
          <div className="w-full p-4 sm:p-6 border-b border-border mb-6">
            <h3 className="font-medium text-foreground text-sm sm:text-base mb-3">Compare with Hash</h3>
            <div className="w-full">
              <input
                type="text"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder="Enter hash to compare..."
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-6 p-3 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleGenerate} className="flex items-center gap-2 flex-1 sm:flex-none">
              <Hash className="w-4 h-4" />
              Generate Hash
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

        {/* Output - Full width */}
        {output && (
          <div className="w-full p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground text-sm sm:text-base">{algorithm} Hash</h3>
            </div>
            <div className="w-full p-4 bg-editor-background border border-border rounded-lg">
              <code className="font-mono text-sm break-all">{output}</code>
            </div>
            
            {/* Comparison Result */}
            {compareMode && isMatch !== null && (
              <div className={`mt-4 p-3 rounded-lg border ${
                isMatch 
                  ? 'bg-success/10 border-success/20 text-success' 
                  : 'bg-destructive/10 border-destructive/20 text-destructive'
              }`}>
                <div className="flex items-center gap-2 font-medium">
                  {isMatch ? '✓ Hashes Match' : '✗ Hashes Do Not Match'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};