import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import PropertyDetail from "./pages/PropertyDetail";
import LandlordProfile from "./pages/LandlordProfile";
import DisputeTools from "./pages/DisputeTools";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import ReviewSubmission from "./pages/ReviewSubmission";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import MoveInHelper from "./pages/tenant/MoveInHelper";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import ClaimProperty from "./pages/landlord/ClaimProperty";
import ListProperty from "./pages/landlord/ListProperty";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/landlord/:id" element={<LandlordProfile />} />
          <Route path="/dispute-tools" element={<DisputeTools />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/review" element={<ReviewSubmission />} />
          {/* Tenant routes */}
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/move-in" element={<MoveInHelper />} />
          {/* Landlord routes */}
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/claim" element={<ClaimProperty />} />
          <Route path="/landlord/list-property" element={<ListProperty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
