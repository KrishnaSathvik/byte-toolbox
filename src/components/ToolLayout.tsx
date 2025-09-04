import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface Example {
  name: string;
  input: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  examples?: Example[];
  onFillExample?: (input: string) => void;
}

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