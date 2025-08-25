import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import ScrollToTop from "./components/common/ScrollToTop";
import PromoBanner from "./components/common/PromoBanner";
import Index from "./pages/Index";
import CommercialCleaning from "./pages/CommercialCleaning";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <PromoBanner />
      {/* Only add spacer on home page */}
      {location.pathname === '/' && <div aria-hidden className="h-8 sm:h-9 md:h-10" />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/commercial-cleaning" element={<CommercialCleaning />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
