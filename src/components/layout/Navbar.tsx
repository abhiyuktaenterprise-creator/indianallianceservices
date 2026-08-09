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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EnquiryModal from "@/components/common/EnquiryModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
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
      {/* Top Notification / Trust Bar */}
      <div className="bg-primary/95 text-primary-foreground/90 text-xs py-2 px-4 border-b border-primary-foreground/10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/25 text-amber-300 px-2 py-0.5 font-bold text-[11px] border border-amber-500/30">
              <Award className="h-3 w-3" /> NHDC Certified
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-secondary/20 text-secondary px-2 py-0.5 font-semibold text-[11px]">
              <Sparkles className="h-3 w-3" /> Free Guidance
            </span>
            <span className="truncate hidden md:inline">
              Aviation Career Counselling & Placement Guidance for Indian Airports
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            <a
              href="tel:+917851836860"
              className="inline-flex items-center gap-1.5 text-primary-foreground/90 hover:text-secondary font-semibold transition-colors"
            >
              <Phone className="h-3 w-3 text-secondary" />
              <span>+91 7851836860</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/40">|</span>
            <Link
              to="/recruitment-verification"
              className="hidden sm:inline-flex items-center gap-1 text-secondary hover:underline transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verify Message</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border"
            : "bg-card/90 backdrop-blur-sm border-b border-border/60"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3.5 px-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="rounded-xl bg-gradient-to-br from-secondary to-primary p-2 text-white shadow-sm group-hover:scale-105 transition-transform">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-extrabold text-foreground leading-tight tracking-tight">
                Airport Career Services
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary leading-none">
                Aviation Guidance & Placement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-secondary font-semibold bg-secondary/10"
                      : "text-foreground/80 hover:text-secondary hover:bg-muted/60"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="hero"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 font-semibold shadow-md rounded-lg px-4"
            >
              <Sparkles className="h-4 w-4" />
              Get Free Career Counselling
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="text-xs px-2.5 h-8 font-medium text-secondary border-secondary/30"
            >
              Enquire
            </Button>
            <button
              className="p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-card border-b border-border shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-secondary/15 text-secondary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <ArrowRight className="h-4 w-4 text-secondary" />}
                  </Link>
                );
              })}

              <Link
                to="/recruitment-verification"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-secondary bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 mt-2"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Recruitment Message</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="pt-3">
                <Button
                  variant="hero"
                  className="w-full gap-2 py-5 font-semibold text-sm shadow-md"
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Get Free Career Counselling
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
