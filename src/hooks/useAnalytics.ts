import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView, isGAAvailable } from '@/lib/analytics';

// Custom hook for Google Analytics
export const useAnalytics = () => {
  const location = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    if (isGAAvailable()) {
      initGA();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (isGAAvailable()) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return {
    isGAAvailable: isGAAvailable(),
  };
};
