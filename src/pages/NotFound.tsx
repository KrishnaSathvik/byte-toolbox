import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
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
        </div>
      </div>
    </div>
  );
};

export default NotFound;
