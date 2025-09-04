import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Badge } from '@/components/ui/badge';

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
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="px-3 py-1">Professional Tool</Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {/* Quick Examples */}
          {examples && examples.length > 0 && onFillExample && (
            <details className="mt-8 max-w-2xl mx-auto group">
              <summary className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary/70 rounded-xl cursor-pointer transition-colors text-sm font-medium">
                <span>✨</span>
                <span>Try Quick Examples</span>
                <span className="text-xs text-muted-foreground ml-2">Click any to auto-fill</span>
              </summary>
              <div className="mt-4 p-4 bg-card/50 rounded-xl border border-border/50">
                <div className="flex flex-wrap justify-center gap-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => onFillExample(example.input)}
                      className="px-3 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                    >
                      {example.name}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}
        </div>
        
        {/* Tool Content */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {children}
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground font-medium">
              All processing happens locally - your data stays private
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};