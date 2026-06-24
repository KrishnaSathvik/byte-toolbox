import { Link } from 'react-router-dom';
import { getRelatedToolsForRoute } from '@/lib/toolPageGuides';

interface ToolRelatedToolsProps {
  toolRoute: string;
}

export const ToolRelatedTools = ({ toolRoute }: ToolRelatedToolsProps) => {
  const related = getRelatedToolsForRoute(toolRoute);
  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-6 mb-4 flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground">Related tools:</span>
      {related.map((tool) => (
        <Link
          key={tool.route}
          to={tool.route}
          className="rounded-md border border-border bg-card px-3 py-1 text-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          {tool.label}
        </Link>
      ))}
    </div>
  );
};
