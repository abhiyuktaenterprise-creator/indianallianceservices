import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Plane,
  ShieldCheck,
  Phone,
  Sparkles,
  ArrowRight,
  Award,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EnquiryModal from "@/components/common/EnquiryModal";
import { useSiteConfig } from "@/context/SiteConfigContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Job Openings", href: "/careers" },
  { label: "Career Guides", href: "/guides" },
  { label: "Interview Tips", href: "/interview-tips" },
  { label: "Notifications", href: "/notifications" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const { settings } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Dynamic Security Advisory Banner */}
      {settings.enableNoticeBanner && settings.bannerNotice && (
        <div className="bg-amber-500 text-slate-950 text-[11px] sm:text-xs py-1.5 px-4 font-bold text-center border-b border-amber-600/30 flex items-center justify-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate max-w-4xl">{settings.bannerNotice}</span>
        </div>
      )}

      {/* Top Royal Aviation Trust & Contact Bar */}
      <div className="bg-navy-midnight text-primary-foreground/90 text-xs py-2 px-4 border-b border-gold/20 shadow-inner">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 text-gold px-2.5 py-0.5 font-bold text-[11px] border border-gold/30">
              <Award className="h-3 w-3 text-gold" /> IATA & NSDC Standards
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 text-secondary px-2.5 py-0.5 font-semibold text-[11px] border border-secondary/30">
              <Sparkles className="h-3 w-3" /> 100% Verified Opportunities
            </span>
            <span className="truncate hidden md:inline text-primary-foreground/75 text-[11px]">
              Premier Aviation & Airport Career Portal of India
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            <a
              href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-primary-foreground/95 hover:text-gold font-semibold transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>{settings.helplinePhone}</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/30">|</span>
            <Link
              to="/recruitment-verification"
              className="hidden sm:inline-flex items-center gap-1 text-gold hover:text-amber-300 font-semibold transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span>Candidate ID Lookup</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Glassmorphic Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 dark:bg-card/95 backdrop-blur-xl shadow-lg border-b border-gold/25"
            : "bg-card/90 dark:bg-card/90 backdrop-blur-md border-b border-border"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3.5 px-4">
          {/* Royal Brand Emblem & Logo */}
          <Link to="/" className="flex items-center gap-3 py-1">
            <img
              src="/logo.png?v=ias2026"
              alt="Indian Alliance Services"
              className="h-[60px] sm:h-[75px] md:h-[80px] w-auto max-w-[280px] sm:max-w-[380px] md:max-w-[500px] object-contain transition-transform hover:scale-[1.02]"
              style={{ height: "80px", maxHeight: "80px" }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-muted/40 p-1.5 rounded-2xl border border-border/80">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "text-primary-foreground bg-primary shadow-sm"
                      : "text-foreground/80 hover:text-foreground hover:bg-card/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/recruitment-verification">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold border-gold/40 text-foreground hover:bg-gold/10 hover:border-gold rounded-xl"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-gold mr-1.5" />
                Verify ID
              </Button>
            </Link>
            <Button
              variant="hero"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 font-bold shadow-lg rounded-xl text-xs px-4 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 transition-all scale-100 hover:scale-[1.02]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Career Counselling
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="text-xs px-2.5 h-8 font-bold text-foreground border-gold/40 rounded-lg"
            >
              Apply
            </Button>
            <button
              className="p-2 rounded-xl text-foreground hover:text-gold transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-card/95 border-b border-border shadow-xl backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              ))}

              <Link
                to="/recruitment-verification"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-dark text-white border border-gold/40 shadow-sm mt-2"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  <span className="text-xs font-bold text-gold">Verify Candidate Reference ID</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gold" />
              </Link>

              <div className="pt-3 flex flex-col gap-2">
                <Button
                  variant="hero"
                  className="w-full gap-2 py-4 font-bold text-sm shadow-md bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 rounded-xl"
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Get Career Counselling
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
