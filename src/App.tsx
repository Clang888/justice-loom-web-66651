import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import About from "./pages/About";
import Services from "./pages/Services";
import AITools from "./pages/AITools";
import Books from "./pages/Books";
import Speaking from "./pages/Speaking";
import Testimonials from "./pages/Testimonials";
import Community from "./pages/Community";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/books" element={<Books />} />
              <Route path="/speaking" element={<Speaking />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
