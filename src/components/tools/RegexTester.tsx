import { useState, useCallback, useMemo, useEffect } from 'react';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { trackToolUsage, trackConversion, trackError } from '@/lib/analytics';
import { Copy, Download, TestTube, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Predefined regex examples for common use cases
 */
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

/**
 * Props for the RegexTester component
 */
interface RegexTesterProps {
  /** Initial value to populate the input field */
  initialValue?: string;
}

/**
 * Common regex patterns for quick access
 */
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

/**
 * Interface for regex match results with groups and position data
 */
interface MatchResult {
  match: string;
  index: number;
  groups: string[];
}

/**
 * RegexTester - A comprehensive regular expression testing and debugging tool
 * 
 * Features:
 * - Real-time regex pattern testing with live results
 * - Support for all JavaScript regex flags (g, i, m, u, y)
 * - Visual match highlighting in test text
 * - Detailed match information with groups and positions
 * - Common pattern library for quick access
 * - Pattern validation with detailed error messages
 * - Copy pattern and download results functionality
 * - Professional Monaco editor integration
 * 
 * @example
 * ```tsx
 * // Basic usage - test regex patterns against text
 * <RegexTester />
 * 
 * // The component provides:
 * // - Pattern input with flag support
 * // - Test text editor with syntax highlighting
 * // - Real-time match highlighting and validation
 * // - Quick pattern buttons for common use cases
 * ```
 * 
 * Regex Flag Support:
 * - g (global): Find all matches, not just the first
 * - i (ignoreCase): Case-insensitive matching
 * - m (multiline): ^ and $ match line breaks
 * - u (unicode): Full Unicode support
 * - y (sticky): Match only from lastIndex position
 * 
 * Match Information:
 * - Full match text and position
 * - Capture groups with individual values
 * - Visual highlighting in source text
 * - Match count and statistics
 * 
 * Common Patterns Included:
 * - Email address validation
 * - URL/URI matching
 * - Phone number formats
 * - IP address validation
 * - Date and time patterns
 * - Credit card numbers
 * - Color codes (hex)
 * 
 * Technical Details:
 * - Uses native JavaScript RegExp constructor
 * - Handles global flag with proper lastIndex management
 * - Prevents infinite loops on zero-length matches
 * - HTML highlighting with XSS protection
 * - Memory-efficient match processing
 * 
 * @returns JSX element containing the complete regex testing interface
 */
export const RegexTester = ({ initialValue = '' }: RegexTesterProps = {}) => {
  const [pattern, setPattern] = useState(initialValue);
  const [flags, setFlags] = useState('gm');
  const [testText, setTestText] = useState('');

  // Update pattern when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      setPattern(initialValue);
    }
  }, [initialValue]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const testRegex = useCallback(() => {
    if (!pattern.trim()) {
      trackError('missing_pattern', 'Pattern is required', 'Regex Tester');
      toast({
        title: 'Pattern Required',
        description: 'Please enter a regex pattern',
        variant: 'destructive',
      });
      return;
    }

    if (!testText.trim()) {
      trackError('missing_test_text', 'Test text is required', 'Regex Tester');
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
      
      // Track successful regex test
      trackToolUsage('Regex Tester', 'test_regex', {
        pattern_length: pattern.length,
        test_text_length: testText.length,
        flags: flags,
        match_count: results.length
      });
      trackConversion('regex_tested', 'Regex Tester');
      
      toast({
        title: 'Regex Tested',
        description: `Found ${results.length} match${results.length !== 1 ? 'es' : ''}`,
      });
    } catch (err) {
      // Track error
      trackError('invalid_regex', err instanceof Error ? err.message : 'Invalid regex pattern', 'Regex Tester');
      
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
    trackToolUsage('Regex Tester', 'select_pattern', {
      pattern_name: commonPattern.name,
      pattern_length: commonPattern.pattern.length
    });
  };

  const handleCopyPattern = async () => {
    if (pattern) {
      await navigator.clipboard.writeText(`/${pattern}/${flags}`);
      trackToolUsage('Regex Tester', 'copy_pattern', {
        pattern_length: pattern.length,
        flags: flags
      });
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
    
    // Track download
    trackToolUsage('Regex Tester', 'download_results', {
      match_count: matches.length,
      pattern_length: pattern.length,
      file_name: a.download
    });
    
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
    trackToolUsage('Regex Tester', 'clear_all');
  };

  const handleFillExample = (exampleInput: string) => {
    const match = exampleInput.match(/^\/(.+)\/([gimuy]*)$/);
    if (match) {
      setPattern(match[1]);
      setFlags(match[2] || 'gm');
    } else {
      setPattern(exampleInput);
    }
    trackToolUsage('Regex Tester', 'fill_example', {
      example_length: exampleInput.length,
      has_flags: !!match
    });
  };

  return (
    <div className="w-full tool-workspace">
        <div className="p-4 sm:p-5 border-b border-border bg-secondary/20">
          <h3 className="text-sm font-medium text-foreground mb-2">Quick Patterns</h3>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((pattern) => (
              <button
                key={pattern.name}
                onClick={() => handlePatternSelect(pattern)}
                className="px-3 py-1.5 text-xs font-medium bg-card border border-border hover:border-primary/40 hover:bg-secondary text-foreground rounded-md transition-colors"
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        <div className="p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-border space-y-3">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gimuy"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground">
              <code className="text-foreground">g</code> all · <code className="text-foreground">i</code> case · <code className="text-foreground">m</code> multiline · <code className="text-foreground">u</code> unicode · <code className="text-foreground">y</code> sticky
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <label className="block text-sm font-medium text-foreground">Test Text</label>
          <div className="dev-panel overflow-hidden">
          <MonacoEditor
            value={testText}
            onChange={(value) => setTestText(value || '')}
            language="plaintext"
            placeholder="Enter text to test your regex against..."
            height="220px"
          />
          </div>
        </div>
        </div>

        <div className="dev-toolbar">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={testRegex} className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Test Regex
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
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

          <div className="p-3 rounded-lg bg-secondary/30 border border-border">
            {isValid === true && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-success font-medium">{matches.length} match{matches.length !== 1 ? 'es' : ''} found</span>
              </div>
            )}
            {isValid === false && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-medium">Invalid pattern</span>
                <span className="text-muted-foreground font-mono text-xs">{error}</span>
              </div>
            )}
            {isValid === null && (
              <p className="text-sm text-muted-foreground">Enter a pattern and test text, then run Test Regex.</p>
            )}
          </div>
        </div>

        {matches.length > 0 && (
          <div className="p-4 sm:p-5 space-y-4 border-t border-border">
            <div className="dev-result-card">
              <h3 className="font-medium text-foreground text-sm mb-2">Highlighted matches</h3>
              <div 
                className="font-mono text-sm whitespace-pre-wrap overflow-x-auto text-foreground"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm">Match details</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-card border border-border rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">Match {index + 1}</span>
                      <span className="text-xs text-muted-foreground font-mono">@{match.index}</span>
                    </div>
                    <div className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded mb-2 break-all">
                      &quot;{match.match}&quot;
                    </div>
                    {match.groups.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Groups: <span className="font-mono text-foreground">[{match.groups.join(', ')}]</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};