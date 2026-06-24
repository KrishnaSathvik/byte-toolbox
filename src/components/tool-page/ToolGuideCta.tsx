import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { getGuideForToolRoute } from '@/lib/toolPageGuides';

interface ToolGuideCtaProps {
  toolRoute: string;
}

export const ToolGuideCta = ({ toolRoute }: ToolGuideCtaProps) => {
  const guide = getGuideForToolRoute(toolRoute);
  if (!guide) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-6 my-4 rounded-lg border border-border bg-card/50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <span>
          Need examples?{' '}
          <Link to={`/blog/${guide.slug}`} className="text-primary hover:underline font-medium">
            {guide.title}
          </Link>
        </span>
      </div>
    </div>
  );
};
