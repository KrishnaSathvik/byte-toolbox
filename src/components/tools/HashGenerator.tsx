import { useState, useCallback } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Hash, Upload, AlertTriangle, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';

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

const algorithms = [
  { name: 'SHA-256', value: 'SHA256', secure: true },
  { name: 'SHA-512', value: 'SHA512', secure: true },
  { name: 'SHA-1', value: 'SHA1', secure: false },
  { name: 'MD5', value: 'MD5', secure: false }
];

export const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [uppercase, setUppercase] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareHash, setCompareHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const { toast } = useToast();

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
      
      // Check comparison if in compare mode
      if (compareMode && compareHash) {
        const matches = hash.toLowerCase() === compareHash.toLowerCase();
        setIsMatch(matches);
        
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
      toast({
        title: 'File Too Large',
        description: 'Please select a file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

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
  };

  const handleFillExample = (exampleInput: string) => {
    setInput(exampleInput);
  };

  const selectedAlgorithm = algorithms.find(a => a.value === algorithm);

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-256, SHA-512, MD5 and SHA-1 hashes securely. Compare hashes and validate data integrity with professional cryptographic tools."
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="p-6">
        {/* Algorithm Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Hash Algorithm</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.value}
                onClick={() => setAlgorithm(algo.value)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  algorithm === algo.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2">
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
            <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Security Warning</span>
              </div>
              <p className="text-sm text-warning/80 mt-1">
                {algorithm} is considered cryptographically weak. Use SHA-256 or SHA-512 for security-critical applications.
              </p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
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

          <div className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".txt,.json,.js,.html,.css,.md"
            />
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Input Text</h3>
          </div>
          <MonacoEditor
            value={input}
            onChange={(value) => setInput(value || '')}
            language="plaintext"
            placeholder="Enter text to hash..."
            height="200px"
          />
        </div>

        {/* Compare Hash Input */}
        {compareMode && (
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-foreground">Compare with Hash</h3>
            <input
              type="text"
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              placeholder="Enter hash to compare..."
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button onClick={handleGenerate} className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Generate Hash
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
          
          {output && (
            <div className="flex items-center gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">{algorithm} Hash</h3>
            </div>
            <div className="p-4 bg-editor-background border border-border rounded-lg">
              <code className="font-mono text-sm break-all">{output}</code>
            </div>
            
            {/* Comparison Result */}
            {compareMode && isMatch !== null && (
              <div className={`p-3 rounded-lg border ${
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