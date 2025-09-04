import { Editor } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

/**
 * Props for the MonacoEditor component
 */
interface MonacoEditorProps {
  /** The current value/content of the editor */
  value: string;
  /** Callback function called when editor content changes */
  onChange?: (value: string | undefined) => void;
  /** Programming language for syntax highlighting (json, javascript, plaintext, etc.) */
  language?: string;
  /** Whether the editor should be read-only */
  readOnly?: boolean;
  /** Height of the editor (CSS string like '400px' or '50vh') */
  height?: string;
  /** Placeholder text shown when editor is empty */
  placeholder?: string;
  /** Whether to show the minimap (code overview) */
  minimap?: boolean;
  /** Whether to show line numbers */
  lineNumbers?: boolean;
  /** Whether to enable word wrapping */
  wordWrap?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * MonacoEditor - A powerful code editor component based on Microsoft's Monaco Editor
 * 
 * This is the same editor used in VS Code, providing professional-grade editing capabilities
 * including syntax highlighting, IntelliSense, error detection, and more.
 * 
 * Features:
 * - Syntax highlighting for 60+ languages
 * - Dark theme matching the app's design system
 * - Optimized performance (disabled heavy features for better performance)
 * - Professional developer fonts (Cascadia Code, Source Code Pro)
 * - Customizable height, language, and behavior
 * - Placeholder text support
 * - Read-only mode for output displays
 * 
 * @example
 * ```tsx
 * // Basic JSON editor
 * <MonacoEditor
 *   value={jsonData}
 *   onChange={setJsonData}
 *   language="json"
 *   height="300px"
 * />
 * 
 * // Read-only output display
 * <MonacoEditor
 *   value={result}
 *   language="plaintext"
 *   readOnly
 *   minimap={false}
 *   placeholder="Results will appear here..."
 * />
 * 
 * // Large editor with minimap
 * <MonacoEditor
 *   value={code}
 *   onChange={setCode}
 *   language="javascript"
 *   height="600px"
 *   minimap={true}
 * />
 * ```
 * 
 * Performance Notes:
 * - Heavy features like suggestions, format-on-type, and smooth animations are disabled
 * - This improves cursor responsiveness and reduces UI lag
 * - Perfect for developer tools where performance > advanced IDE features
 * 
 * @param props - The editor configuration props
 * @returns JSX element containing the Monaco editor
 */
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
          fontFamily: 'Cascadia Code, Source Code Pro, SF Mono, Monaco, Consolas, monospace',
          fontLigatures: true,
          lineNumbers: lineNumbers ? 'on' : 'off',
          automaticLayout: true,
          wordWrap: wordWrap ? 'on' : 'off',
          scrollBeyondLastLine: false,
          renderLineHighlight: 'gutter',
          selectOnLineNumbers: true,
          smoothScrolling: false, // Disable smooth scrolling to reduce lag
          contextmenu: true,
          formatOnPaste: false, // Disable auto-formatting to reduce processing
          formatOnType: false, // Disable format-on-type to reduce lag
          tabSize: 2,
          insertSpaces: true,
          folding: true,
          foldingHighlight: false, // Disable folding highlight to reduce DOM updates
          showFoldingControls: 'always', // Change from 'mouseover' to reduce cursor lag
          cursorBlinking: 'blink', // Change from 'smooth' to reduce animations
          cursorSmoothCaretAnimation: 'off', // Disable smooth cursor animation
          renderWhitespace: 'none', // Reduce rendering overhead
          bracketPairColorization: { enabled: false }, // Disable to reduce processing
          guides: {
            bracketPairs: false, // Disable to reduce DOM updates
            indentation: false, // Disable to reduce rendering
          },
          suggest: {
            showKeywords: false, // Disable suggestions to reduce processing
            showSnippets: false,
          },
          quickSuggestions: false, // Disable quick suggestions completely
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