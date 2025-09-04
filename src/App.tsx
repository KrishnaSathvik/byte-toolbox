import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Home } from "./pages/Home";
import JsonFormatterPage from "./pages/JsonFormatterPage";
import Base64Page from "./pages/Base64Page";
import HashPage from "./pages/HashPage";
import UuidPage from "./pages/UuidPage";
import RegexPage from "./pages/RegexPage";
import TimestampPage from "./pages/TimestampPage";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Comparisons } from "./pages/Comparisons";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useAnalytics(); // Initialize Google Analytics

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
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
              <Route path="/comparisons" element={<Comparisons />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="bytetoolbox-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
