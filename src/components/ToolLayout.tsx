import { ReactNode } from 'react';
import { Navigation } from './Navigation';

/**
 * Represents a quick example that can be used to populate tool inputs
 */
interface Example {
  /** Display name for the example button */
  name: string;
  /** The example input data that will be filled when clicked */
  input: string;
}

/**
 * Props for the ToolLayout component
 */
interface ToolLayoutProps {
  /** The main title displayed at the top of the tool page */
  title: string;
  /** Brief description explaining what the tool does and its key features */
  description: string;
  /** The main content/UI of the tool - typically the tool's input/output interface */
  children: ReactNode;
  /** Optional array of example inputs for quick testing and demonstration */
  examples?: Example[];
  /** Callback function called when user clicks an example button */
  onFillExample?: (input: string) => void;
}

/**
 * ToolLayout - A reusable wrapper component for developer tools
 * 
 * Provides a consistent layout structure for all tools in the ByteToolbox application.
 * Includes navigation, hero section with title/description, optional quick examples,
 * main content area, and a privacy notice footer.
 * 
 * @example
 * ```tsx
 * <ToolLayout
 *   title="JSON Formatter"
 *   description="Format and validate JSON data with syntax highlighting"
 *   examples={[
 *     { name: 'Simple Object', input: '{"name": "John", "age": 30}' },
 *     { name: 'Array Data', input: '[1, 2, 3, 4, 5]' }
 *   ]}
 *   onFillExample={(input) => setJsonInput(input)}
 * >
 *   <YourToolContent />
 * </ToolLayout>
 * ```
 * 
 * @param props - The component props
 * @returns JSX element containing the complete tool page layout
 */
export const ToolLayout = ({ 
  title, 
  description, 
  children, 
  examples, 
  onFillExample 
}: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
          
          {/* Quick Examples */}
          {examples && examples.length > 0 && onFillExample && (
            <details className="mt-6 max-w-xl mx-auto">
              <summary className="text-primary cursor-pointer hover:text-primary/80 text-sm font-medium">
                Quick Examples
              </summary>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => onFillExample(example.input)}
                    className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </details>
          )}
        </div>
        
        {/* Tool Content */}
        <div className="bg-card border border-border rounded-lg">
          {children}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Processing happens locally - your data stays private</span>
          </div>
        </div>
      </main>
    </div>
  );
};