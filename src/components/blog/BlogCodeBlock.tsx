import { useState, useCallback, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogCodeBlockProps {
  children: ReactNode;
  language?: string;
}

function extractText(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return String(children ?? '');
}

export const BlogCodeBlock = ({ children, language }: BlogCodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const code = extractText(children).replace(/\n$/, '');

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="blog-code-block group relative my-8">
      <div className="flex items-center justify-between gap-2 border border-border border-b-0 bg-secondary/50 px-4 py-2.5 rounded-t-lg">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          {language || 'code'}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs gap-1.5"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
