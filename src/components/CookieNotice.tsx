import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'bytetoolbox-cookie-notice';

export const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== 'accepted') {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/90 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 safe-area-pb"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
          We use essential cookies for preferences and analytics to understand aggregate usage.
          Tool input stays local.{' '}
          <Link to="/privacy" className="text-primary hover:underline whitespace-nowrap">
            Privacy Policy
          </Link>
        </p>
        <Button
          size="sm"
          className="shrink-0 h-8 px-3 text-xs sm:text-sm"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, 'accepted');
            setVisible(false);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
};
