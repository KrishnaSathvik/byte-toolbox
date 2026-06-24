interface Example {
  name: string;
  input: string;
}

interface ToolQuickExamplesProps {
  examples: Example[];
  onSelect: (input: string) => void;
}

export const ToolQuickExamples = ({ examples, onSelect }: ToolQuickExamplesProps) => (
  <div className="px-4 sm:px-6 py-3 border-b border-border flex flex-wrap items-center gap-2">
    <span className="text-xs font-medium text-muted-foreground">Try an example:</span>
    {examples.map((example) => (
      <button
        key={example.name}
        type="button"
        onClick={() => onSelect(example.input)}
        className="px-3 py-1.5 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors"
      >
        {example.name}
      </button>
    ))}
  </div>
);
