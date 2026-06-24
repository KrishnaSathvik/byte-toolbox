import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieNotice } from '@/components/CookieNotice';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Home } from './pages/Home';
import NotFound from './pages/NotFound';

const JsonFormatterPage = lazy(() => import('./pages/JsonFormatterPage'));
const Base64Page = lazy(() => import('./pages/Base64Page'));
const HashPage = lazy(() => import('./pages/HashPage'));
const UuidPage = lazy(() => import('./pages/UuidPage'));
const RegexPage = lazy(() => import('./pages/RegexPage'));
const TimestampPage = lazy(() => import('./pages/TimestampPage'));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then((m) => ({ default: m.TermsOfService })));
const FAQ = lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const Comparisons = lazy(() => import('./pages/Comparisons').then((m) => ({ default: m.Comparisons })));

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center py-24 text-muted-foreground text-sm">
    Loading…
  </div>
);

const AppContent = () => {
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
      >
        Skip to content
      </a>
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-formatter" element={<JsonFormatterPage />} />
          <Route path="/base64" element={<Base64Page />} />
          <Route path="/hash" element={<HashPage />} />
          <Route path="/uuid" element={<UuidPage />} />
          <Route path="/regex" element={<RegexPage />} />
          <Route path="/timestamp" element={<TimestampPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/comparisons" element={<Comparisons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <CookieNotice />
    </div>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="bytetoolbox-ui-theme">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
