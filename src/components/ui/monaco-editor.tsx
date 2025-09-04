import { Editor } from '@monaco-editor/react';
import { Loader2, Code } from 'lucide-react';

interface MonacoEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
  placeholder?: string;
  minimap?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  className?: string;
}

export const MonacoEditor = ({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  height = '400px',
  placeholder,
  minimap = false,
  lineNumbers = true,
  wordWrap = true,
  className = ''
}: MonacoEditorProps) => {
  const handleEditorDidMount = (editor: any) => {
    // Enhanced editor setup
    if (placeholder && !value) {
      editor.setValue(placeholder);
      editor.setSelection({ 
        startLineNumber: 1, 
        startColumn: 1, 
        endLineNumber: 1, 
        endColumn: placeholder.length + 1 
      });
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl border border-border/50 bg-editor-background ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {language} Editor
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-destructive/40"></div>
          <div className="w-3 h-3 rounded-full bg-warning/40"></div>
          <div className="w-3 h-3 rounded-full bg-success/40"></div>
        </div>
      </div>
      
      {/* Editor */}
      <div className="relative">
        <Editor
          height={height}
          language={language}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          loading={
            <div className="flex items-center justify-center h-full min-h-[200px] bg-editor-background">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading editor...</p>
              </div>
            </div>
          }
          options={{
            readOnly,
            minimap: { enabled: minimap },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
            fontLigatures: true,
            lineNumbers: lineNumbers ? 'on' : 'off',
            automaticLayout: true,
            wordWrap: wordWrap ? 'on' : 'off',
            scrollBeyondLastLine: false,
            renderLineHighlight: 'gutter',
            selectOnLineNumbers: true,
            smoothScrolling: true,
            contextmenu: true,
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'always',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            }
          }}
        />
      </div>
    </div>
  );
};