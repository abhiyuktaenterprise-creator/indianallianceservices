import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SiteConfigProvider } from "./context/SiteConfigContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import WhatsAppWidget from "./components/common/WhatsAppWidget";

// Page Components
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";
import RecruitmentVerification from "./pages/RecruitmentVerification";
import InterviewTips from "./pages/InterviewTips";
import Notifications from "./pages/Notifications";
import CareerGuides from "./pages/CareerGuides";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import ThankYou from "./pages/ThankYou";
import PPCLanding from "./pages/PPCLanding";
import NotFound from "./pages/NotFound";

// Admin Components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isPpcRoute = [
    "/apply",
    "/apply-online",
    "/aviation-careers",
    "/airport-jobs",
    "/candidate-registration",
    "/airport-ground-staff",
    "/cabin-crew-recruitment",
    "/aviation-jobs",
    "/walk-in-2026",
    "/walkin-drive",
    "/recruitment-2026",
    "/landing",
    "/ppc",
  ].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      {!isAdminRoute && !isPpcRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Dedicated High-Converting PPC Landing Page Routes */}
          <Route path="/apply" element={<PPCLanding />} />
          <Route path="/apply-online" element={<PPCLanding />} />
          <Route path="/aviation-careers" element={<PPCLanding />} />
          <Route path="/airport-jobs" element={<PPCLanding />} />
          <Route path="/candidate-registration" element={<PPCLanding />} />
          <Route path="/airport-ground-staff" element={<PPCLanding />} />
          <Route path="/cabin-crew-recruitment" element={<PPCLanding />} />
          <Route path="/aviation-jobs" element={<PPCLanding />} />
          <Route path="/walk-in-2026" element={<PPCLanding />} />
          <Route path="/walkin-drive" element={<PPCLanding />} />
          <Route path="/recruitment-2026" element={<PPCLanding />} />
          <Route path="/landing" element={<PPCLanding />} />
          <Route path="/ppc" element={<PPCLanding />} />

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/opportunities" element={<Careers />} />
          <Route path="/guides" element={<Navigate to="/careers" replace />} />
          <Route path="/blog" element={<Navigate to="/careers" replace />} />
          <Route path="/career-guides" element={<Navigate to="/careers" replace />} />
          <Route path="/interview-tips" element={<InterviewTips />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/recruitment-verification" element={<RecruitmentVerification />} />
          <Route path="/verify" element={<RecruitmentVerification />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/thanks" element={<ThankYou />} />

          {/* Admin Routes & Dashboard Aliases */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/backend" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin-panel" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && !isPpcRoute && <Footer />}
      {!isAdminRoute && !isPpcRoute && <WhatsAppWidget />}
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteConfigProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </SiteConfigProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
