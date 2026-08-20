import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SiteConfigProvider } from "./context/SiteConfigContext";

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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/opportunities" element={<Careers />} />
          <Route path="/guides" element={<CareerGuides />} />
          <Route path="/blog" element={<CareerGuides />} />
          <Route path="/career-guides" element={<CareerGuides />} />
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

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
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
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppWidget />}
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Indian Alliance Services UI Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080d1a] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto text-xl font-black">
              ✈️
            </div>
            <h2 className="text-xl font-heading font-black text-white">Indian Alliance Services</h2>
            <p className="text-xs text-slate-300">
              We detected a display refresh issue. Click below to reload the latest version of the portal.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("acs_job_posts");
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-md hover:brightness-110 cursor-pointer"
            >
              Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
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
