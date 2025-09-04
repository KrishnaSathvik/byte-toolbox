import { Editor } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

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
    <div className={`rounded-lg border border-border overflow-hidden bg-editor-background ${className}`}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        loading={
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Loading editor...</span>
            </div>
          </div>
        }
        options={{
          readOnly,
          minimap: { enabled: minimap },
          fontSize: 14,
          fontFamily: 'Fira Code, SF Mono, Monaco, Consolas, monospace',
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
          showFoldingControls: 'mouseover',
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
  );
};