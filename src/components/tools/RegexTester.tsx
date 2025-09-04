import { useState, useCallback, useMemo } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/ToolLayout';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, TestTube, AlertCircle, CheckCircle } from 'lucide-react';

const examples = [
  {
    name: 'Email Validation',
    input: '/^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$/gm'
  },
  {
    name: 'Phone Number',
    input: '/\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}/gm'
  },
  {
    name: 'URL Validation',
    input: '/https?:\\/\\/(www\\.)?[\\w\\.-]+\\.[a-zA-Z]{2,}([\\w\\.-]*)*\\/?\\??([\\w&=%.-]*)*#?([\\w-]*)/gm'
  }
];

const commonPatterns = [
  { name: 'Email', pattern: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$', flags: 'gm' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[\\w\\.-]+\\.[a-zA-Z]{2,}([\\w\\.-]*)*\\/?\\??([\\w&=%.-]*)*#?([\\w-]*)', flags: 'gm' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}', flags: 'gm' },
  { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: 'gm' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'gm' },
  { name: 'Time (HH:MM)', pattern: '\\d{2}:\\d{2}', flags: 'gm' },
  { name: 'Credit Card', pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}', flags: 'gm' },
  { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})', flags: 'gm' }
];

interface MatchResult {
  match: string;
  index: number;
  groups: string[];
}

export const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gm');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const testRegex = useCallback(() => {
    if (!pattern.trim()) {
      toast({
        title: 'Pattern Required',
        description: 'Please enter a regex pattern',
        variant: 'destructive',
      });
      return;
    }

    if (!testText.trim()) {
      toast({
        title: 'Test Text Required',
        description: 'Please enter text to test against',
        variant: 'destructive',
      });
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          
          // Prevent infinite loops
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(results);
      setError('');
      setIsValid(true);
      
      toast({
        title: 'Regex Tested',
        description: `Found ${results.length} match${results.length !== 1 ? 'es' : ''}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setMatches([]);
      setIsValid(false);
      
      toast({
        title: 'Invalid Pattern',
        description: 'Please check your regex syntax',
        variant: 'destructive',
      });
    }
  }, [pattern, flags, testText, toast]);

  const highlightedText = useMemo(() => {
    if (!testText || matches.length === 0) return testText;

    let highlighted = testText;
    let offset = 0;

    // Sort matches by index to apply highlights correctly
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach((match) => {
      const start = match.index + offset;
      const end = start + match.match.length;
      const before = highlighted.slice(0, start);
      const matchText = highlighted.slice(start, end);
      const after = highlighted.slice(end);
      
      highlighted = before + `<mark class="bg-primary/20 text-primary font-medium">${matchText}</mark>` + after;
      offset += '<mark class="bg-primary/20 text-primary font-medium"></mark>'.length;
    });

    return highlighted;
  }, [testText, matches]);

  const handlePatternSelect = (commonPattern: typeof commonPatterns[0]) => {
    setPattern(commonPattern.pattern);
    setFlags(commonPattern.flags);
  };

  const handleCopyPattern = async () => {
    if (pattern) {
      await navigator.clipboard.writeText(`/${pattern}/${flags}`);
      toast({
        title: 'Copied!',
        description: 'Regex pattern copied to clipboard',
      });
    }
  };

  const handleDownloadResults = () => {
    if (matches.length === 0) return;

    const results = matches.map((match, index) => 
      `Match ${index + 1}: "${match.match}" at position ${match.index}${
        match.groups.length > 0 ? `\n  Groups: [${match.groups.join(', ')}]` : ''
      }`
    ).join('\n\n');

    const content = `Regex Pattern: /${pattern}/${flags}\n\nResults (${matches.length} matches):\n\n${results}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regex_results_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Results saved to your device',
    });
  };

  const handleClear = () => {
    setPattern('');
    setTestText('');
    setMatches([]);
    setError('');
    setIsValid(null);
  };

  const handleFillExample = (exampleInput: string) => {
    const match = exampleInput.match(/^\/(.+)\/([gimuy]*)$/);
    if (match) {
      setPattern(match[1]);
      setFlags(match[2] || 'gm');
    } else {
      setPattern(exampleInput);
    }
  };

  return (
    <ToolLayout
      title="Regular Expression Tester"
      description="Test regular expressions with real-time matching and validation. Debug regex patterns, extract groups, and validate against test strings with professional tools."
      examples={examples}
      onFillExample={handleFillExample}
    >
      <div className="p-6">
        {/* Common Patterns */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Patterns</h3>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((pattern) => (
              <button
                key={pattern.name}
                onClick={() => handlePatternSelect(pattern)}
                className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Input */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3 space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Regular Expression Pattern
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="w-full px-4 py-2 bg-input border border-border rounded-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gimuy"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Flag Descriptions */}
        <div className="mb-6 p-3 bg-muted/20 rounded-lg">
          <div className="text-xs text-muted-foreground space-y-1">
            <div><code>g</code> - Global match (find all matches)</div>
            <div><code>i</code> - Case insensitive</div>
            <div><code>m</code> - Multi-line mode</div>
            <div><code>u</code> - Unicode support</div>
            <div><code>y</code> - Sticky matching</div>
          </div>
        </div>

        {/* Test Text */}
        <div className="space-y-3 mb-6">
          <label className="block text-sm font-medium text-foreground">
            Test Text
          </label>
          <MonacoEditor
            value={testText}
            onChange={(value) => setTestText(value || '')}
            language="plaintext"
            placeholder="Enter text to test your regex against..."
            height="200px"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button onClick={testRegex} className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Test Regex
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {pattern && (
              <Button onClick={handleCopyPattern} variant="outline" size="sm" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Pattern
              </Button>
            )}
            {matches.length > 0 && (
              <Button onClick={handleDownloadResults} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Results
              </Button>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-3">
            {isValid === true && (
              <>
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-success font-medium">Valid Pattern</span>
                <span className="text-muted-foreground">
                  • Found {matches.length} match{matches.length !== 1 ? 'es' : ''}
                </span>
              </>
            )}
            {isValid === false && (
              <>
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-medium">Invalid Pattern</span>
                <span className="text-muted-foreground">• {error}</span>
              </>
            )}
            {isValid === null && (
              <>
                <TestTube className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Enter pattern and test text to begin</span>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        {matches.length > 0 && (
          <div className="space-y-4">
            {/* Highlighted Text */}
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Highlighted Matches</h3>
              <div 
                className="p-4 bg-editor-background border border-border rounded-lg font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>

            {/* Match Details */}
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Match Details</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-card border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Match {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Position: {match.index}
                      </span>
                    </div>
                    <div className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded mb-2">
                      "{match.match}"
                    </div>
                    {match.groups.length > 0 && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Groups: </span>
                        <span className="font-mono">[{match.groups.join(', ')}]</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};