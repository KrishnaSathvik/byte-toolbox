// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Measurement ID - Replace with your actual GA4 Measurement ID
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-GMWFFMS19F';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string, action: string, additionalData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Tool Usage',
      event_label: toolName,
      tool_name: toolName,
      ...additionalData,
    });
  }
};

// Track conversion events (e.g., successful tool operations)
export const trackConversion = (conversionType: string, toolName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'Conversion',
      event_label: conversionType,
      tool_name: toolName,
      value: value,
    });
  }
};

// Track user engagement
export const trackEngagement = (engagementType: string, details?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'engagement', {
      event_category: 'User Engagement',
      event_label: engagementType,
      ...details,
    });
  }
};

// Track errors
export const trackError = (errorType: string, errorMessage: string, toolName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_type: errorType,
      tool_name: toolName,
    });
  }
};

// Track search queries (for future search functionality)
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }
};

// Track download events (for future file download features)
export const trackDownload = (fileName: string, fileType: string, toolName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_type: fileType,
      tool_name: toolName,
    });
  }
};

// Track timing events (for performance monitoring)
export const trackTiming = (name: string, value: number, category: string = 'Performance') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: name,
      value: value,
      event_category: category,
    });
  }
};

// Check if Google Analytics is available
export const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};
