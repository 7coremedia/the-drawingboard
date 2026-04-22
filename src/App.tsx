import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Navbar from "./components/redesign/Navbar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Services from "./pages/Services";
import Onboarding from "./pages/Onboarding";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import Auth from "./pages/Auth";
import BrandDetails from "./pages/BrandDetails";
import Dashboard from "./pages/Dashboard";
import BrandingChat from "./pages/BrandingChat";
import BrandProfileDetails from "./pages/BrandProfileDetails";
import Volumes from "./pages/Volumes";
import VolumeDetail from "./pages/VolumeDetail";
import BrandAudit from "./pages/BrandAudit";
import BrandAssessment from "./pages/BrandAssessment";
import BrandROICalculator from "./pages/BrandROICalculator";
import Solutions from "./pages/Solutions";
import PersonalBrandLauncher from "./pages/PersonalBrandLauncher";
import AdvancedBrandLauncher from "./pages/AdvancedBrandLauncher";
import StrategicBrandSystems from "./pages/StrategicBrandSystems";
import Superstars from "./pages/Superstars";
import Portal from "./pages/Portal";
// Dashboard imports
import ProtectedLayout from "./components/layout/ProtectedLayout";
import ManagementDashboard from "./pages/management/Index";
import DashboardPortfolio from "./pages/management/Portfolio";
import CreatePortfolio from "./pages/management/CreatePortfolio";
import EditPortfolio from "./pages/management/EditPortfolio";
import RoleManagement from "./pages/management/RoleManagement";
import ManagementVolumes from "./pages/management/Volumes";
import VolumeCreatePage from "./pages/management/VolumeCreatePage";
import VolumeEditPage from "./pages/management/VolumeEditPage";

import { AuthProvider } from "@/hooks/useAuth";
import { PortfolioAuthProvider } from "@/hooks/usePortfolioAuth";
import CursorRing from "@/components/ui/CursorRing";
import Jobs from "./pages/Jobs";
import Contracts from "./pages/Contracts";
import { cn } from "@/lib/utils";
import AnnouncementBanner from "./components/redesign/AnnouncementBanner";
import CinematicNavbarBlur from "./components/redesign/CinematicNavbarBlur";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ExitIntentOverlay from "./components/redesign/ExitIntentOverlay";
import StickyCTA from "./components/redesign/StickyCTA";

const queryClient = new QueryClient();

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isChatPage = location.pathname === "/branding-chat";
  const isVolumeRoute = location.pathname.startsWith("/volumes");
  const isPortfolio = location.pathname === "/portfolio" || location.pathname.startsWith("/portfolio/");
  const isSuperstars = location.pathname === "/superstars";
  const isManagement = location.pathname.startsWith("/management");
  const isPortal = location.pathname.startsWith("/portal");
  const isCaseStudy = location.pathname.startsWith("/portfolio/") && location.pathname !== "/portfolio";
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
      </Helmet>
      <CursorRing enabled={false} size={56} />
      <ExitIntentOverlay />
      <StickyCTA />
      {isHome && <AnnouncementBanner />}
      {isSuperstars && (
        <AnnouncementBanner
          pill="New"
          message="Brand ROI Calculator"
          messageSecondary="— see what weak branding costs you"
          linkLabel="Try it"
          linkTo="/brand-roi-calculator"
          bgColor="#FFB16B"
        />
      )}
      {!isChatPage && !location.pathname.startsWith("/management") && !isPortal && <CinematicNavbarBlur />}
      {!isChatPage && !location.pathname.startsWith("/management") && !isPortal && <Navbar />}
      <main
        className={cn(
          !isHome && !isChatPage && !isSuperstars && !isManagement && !isVolumeRoute && !isPortal && !isCaseStudy && "pt-28 md:pt-32",
        )}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/brand-audit" element={<BrandAudit />} />
          <Route path="/brand-audit-quiz" element={<BrandAssessment />} />
          <Route path="/brand-roi-calculator" element={<BrandROICalculator />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/personal-brand-launcher" element={<PersonalBrandLauncher />} />
          <Route path="/advanced-brand-launcher" element={<AdvancedBrandLauncher />} />
          <Route path="/strategic-brand-systems" element={<StrategicBrandSystems />} />
          <Route path="/superstars" element={<Superstars />} />
          <Route path="/volumes" element={<Volumes />} />
          <Route path="/volumes/:id" element={<VolumeDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/:id" element={<Portal />} />
          {/* Protected Management Routes */}
          <Route path="/management" element={<ProtectedLayout />}>
            <Route index element={<ManagementDashboard />} />
            <Route path="portfolio" element={<DashboardPortfolio />} />
            <Route path="portfolio/new" element={<CreatePortfolio />} />
            <Route path="portfolio/:id" element={<EditPortfolio />} />
            <Route path="volumes" element={<ManagementVolumes />} />
            <Route path="volumes/new" element={<VolumeCreatePage />} />
            <Route path="volumes/:id/edit" element={<VolumeEditPage />} />
            <Route path="roles" element={<RoleManagement />} />
          </Route>
          <Route path="/brand/:id" element={<BrandDetails />} />
          <Route path="/brand-profile/:id" element={<BrandProfileDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/branding-chat"
            element={
              <BrandingChat />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isChatPage && !isHome && !isPortal && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <PortfolioAuthProvider>
            <CurrencyProvider>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
            </CurrencyProvider>
          </PortfolioAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
