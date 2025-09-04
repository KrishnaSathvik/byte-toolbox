import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import JsonFormatterPage from "./pages/JsonFormatterPage";
import Base64Page from "./pages/Base64Page";
import HashPage from "./pages/HashPage";
import UuidPage from "./pages/UuidPage";
import RegexPage from "./pages/RegexPage";
import TimestampPage from "./pages/TimestampPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-formatter" element={<JsonFormatterPage />} />
          <Route path="/base64" element={<Base64Page />} />
          <Route path="/hash" element={<HashPage />} />
          <Route path="/uuid" element={<UuidPage />} />
          <Route path="/regex" element={<RegexPage />} />
          <Route path="/timestamp" element={<TimestampPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
