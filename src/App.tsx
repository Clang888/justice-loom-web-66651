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
import Books from "./pages/Books";
import Speaking from "./pages/Speaking";
import SpeakingEnquiry from "./pages/SpeakingEnquiry";
import Testimonials from "./pages/Testimonials";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Briefcase from "./pages/Briefcase";
import Forms from "./pages/Forms";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AITools from "./pages/AITools";
import Assistant from "./pages/Assistant";

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
              <Route path="/books" element={<Books />} />
              <Route path="/speaking" element={<Speaking />} />
              <Route path="/speaking-enquiry" element={<SpeakingEnquiry />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/briefcase" element={<Briefcase />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
