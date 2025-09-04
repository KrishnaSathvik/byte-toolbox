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
    <div className="min-h-screen bg-app-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
          
          {/* Quick Examples */}
          {examples && examples.length > 0 && onFillExample && (
            <details className="mt-6 max-w-2xl mx-auto">
              <summary className="text-primary cursor-pointer hover:text-primary/80 font-medium">
                📝 Quick Examples - Click to try
              </summary>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => onFillExample(example.input)}
                    className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </details>
          )}
        </div>
        
        {/* Tool Content */}
        <div className="bg-card border border-border rounded-xl shadow-lg card-shadow">
          {children}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              All processing happens locally in your browser - no data is sent to servers
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};