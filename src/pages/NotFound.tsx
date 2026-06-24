import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { SITE_URL } from '@/lib/seoConstants';

const NotFound = () => {
  useSEO({
    title: 'Page Not Found | ByteToolBox',
    description: 'The page you requested could not be found on ByteToolBox.',
    canonical: `${SITE_URL}/404`,
    noindex: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </Link>
          <Link
            to="/json-formatter"
            className="block w-full bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Try JSON Formatter
          </Link>
          <Link
            to="/blog"
            className="block w-full border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/50 transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
