interface ToolPageHeaderProps {
  title: string;
  description: string;
}

export const ToolPageHeader = ({ title, description }: ToolPageHeaderProps) => (
  <header className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border text-center sm:text-left">
    <h1 className="text-xl sm:text-2xl font-bold gradient-text mb-1.5">{title}</h1>
    <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
    <p className="text-xs text-muted-foreground mt-2">
      Runs locally in your browser — your input is not uploaded.
    </p>
  </header>
);
