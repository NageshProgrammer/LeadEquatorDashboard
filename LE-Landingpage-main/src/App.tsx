import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import DashboardOverview from "./pages/DashboardOverview";
import MonitorStream from "./pages/MonitorStream";
import LeadsPipeline from "./pages/LeadsPipeline";
import AutomationsBuilder from "./pages/AutomationsBuilder";
import CompetitorWatch from "./pages/CompetitorWatch";
import CommentTimeline from "./pages/CommentTimeline";
import Reports from "./pages/Reports";
import SettingsIntegrations from "./pages/SettingsIntegrations";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/product" element={<PublicLayout><Product /></PublicLayout>} />
          <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/monitor-stream" element={<MonitorStream />} />
            <Route path="/comment-timeline" element={<CommentTimeline />} />
            <Route path="/leads-pipeline" element={<LeadsPipeline />} />
            <Route path="/automations-builder" element={<AutomationsBuilder />} />
            <Route path="/competitor-watch" element={<CompetitorWatch />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsIntegrations />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
