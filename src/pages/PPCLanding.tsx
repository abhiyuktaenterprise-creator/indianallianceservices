import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Send,
  CheckCircle2,
  Phone,
  Sparkles,
  AlertTriangle,
  MessageCircle,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
  Plane,
  ChevronDown,
  Building2,
  FileCheck,
  Check,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/context/SiteConfigContext";
import SEO from "@/components/common/SEO";
import { checkDuplicatePhone, normalizePhoneNumber, SubmittedLeadRecord } from "@/utils/leadValidator";

import logoImg from "@/assets/logo.png";
import heroBgImg from "@/assets/hero-airport.jpg";
import cabinCrewImg from "@/assets/cabin-crew-training.jpg";
import groundServicesImg from "@/assets/ground-services.jpg";

import candPriyaImg from "@/assets/candidates/priya_sharma.jpg";
import candRahulImg from "@/assets/candidates/rahul_verma.jpg";
import candAnanyaImg from "@/assets/candidates/ananya_patel.jpg";
import candIrfanImg from "@/assets/candidates/mohammed_irfan.jpg";

export default function PPCLanding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addLead, settings } = useSiteConfig();
  const formRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    isDuplicate: boolean;
    leadRecord?: SubmittedLeadRecord;
  }>({ isDuplicate: false });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "12th Pass",
    role: "Airport Ground Staff (AGS)",
    city: "Delhi NCR",
    message: "",
  });

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    const check = checkDuplicatePhone(val);
    setDuplicateInfo(check);
  };

  const scrollToForm = (prefillRole?: string) => {
    if (prefillRole) {
      setFormData((prev) => ({ ...prev, role: prefillRole }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please provide your Full Name and Mobile Number.",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone.trim().length < 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    // Approach 1: Check duplicate phone in cache / localStorage
    const duplicateCheck = checkDuplicatePhone(formData.phone);
    if (duplicateCheck.isDuplicate) {
      setDuplicateInfo(duplicateCheck);
      toast({
        title: "Application Already Registered!",
        description: `An active enquiry for +91 ${normalizePhoneNumber(formData.phone)} already exists. Our senior counsellor will call you shortly.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const leadResult = await addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      qualification: formData.qualification || undefined,
      targetRole: formData.role || "Airport Ground Staff (AGS)",
      city: formData.city || undefined,
      source: "PPC Landing Page (Google/Meta Ads)",
      notes: formData.message.trim() || undefined,
    });

    setIsSubmitting(false);

    toast({
      title: "Application Submitted Successfully!",
      description: "Our aviation counsellor will call you within 24 business hours.",
    });

    navigate("/thank-you", {
      state: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        qualification: formData.qualification || undefined,
        targetRole: formData.role || "Airport Ground Staff (AGS)",
        city: formData.city || undefined,
        source: "PPC Landing Page",
        refId: leadResult?.id ? `IAS-${new Date().getFullYear()}-${leadResult.id.replace("lead-", "").slice(-6)}` : undefined,
      },
    });
  };

  const jobRoles = [
    {
      title: "Airport Ground Staff (AGS)",
      code: "IAS-AGS-2026",
      salary: "₹25,000 – ₹45,000 / mo",
      eligibility: "12th Pass or Any Graduate",
      age: "18 – 28 Yrs",
      openings: "35+ Openings",
      badge: "High Demand",
      desc: "Boarding gate management, ticket check, queue facilitation, and passenger documentation across major terminals.",
    },
    {
      title: "Customer Service Assistant (CSA)",
      code: "IAS-CSA-2026",
      salary: "₹28,000 – ₹50,000 / mo",
      eligibility: "12th Pass / Graduate",
      age: "18 – 28 Yrs",
      openings: "28+ Openings",
      badge: "Immediate Joining",
      desc: "Check-in counter operations, boarding passes issuance, passenger baggage assistance, and terminal helpdesk.",
    },
    {
      title: "Cabin Crew / Flight Attendant",
      code: "IAS-CREW-2026",
      salary: "₹45,000 – ₹95,000 / mo + Flying Allowances",
      eligibility: "12th Pass (Min 155cm F, 170cm M)",
      age: "18 – 27 Yrs",
      openings: "20+ Openings",
      badge: "Premier Fleet Track",
      desc: "In-flight passenger safety, hospitality meal service, VIP passenger care, and aircraft safety protocol management.",
    },
    {
      title: "Air Cargo & Ramp Logistics",
      code: "IAS-CARGO-2026",
      salary: "₹20,000 – ₹36,000 / mo",
      eligibility: "10th / 12th Pass / ITI",
      age: "18 – 32 Yrs",
      openings: "40+ Openings",
      badge: "Logistics Hub",
      desc: "Airway bills (AWB) verification, warehouse cargo scanning, flight palletizing, and tarmac turnaround logistics.",
    },
    {
      title: "Ground Security & Screener",
      code: "IAS-GSA-2026",
      salary: "₹24,000 – ₹40,000 / mo",
      eligibility: "12th Pass / Graduate",
      age: "18 – 30 Yrs",
      openings: "25+ Openings",
      badge: "Aviation Security",
      desc: "Passenger profiling, boarding gate pass inspection, baggage scanning supervision, and tarmac perimeter safety.",
    },
    {
      title: "VIP Lounge & Hospitality Host",
      code: "IAS-LOUNGE-2026",
      salary: "₹26,000 – ₹48,000 / mo",
      eligibility: "12th / Hotel Mgmt Diploma",
      age: "18 – 29 Yrs",
      openings: "15+ Openings",
      badge: "Luxury Hospitality",
      desc: "Five-star passenger greeting, business lounge access concierge, flight status updates, and premium amenities coordination.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Customer Service Assistant (CSA)",
      airport: "Mumbai International (BOM)",
      salary: "₹34,000/month",
      img: candPriyaImg,
      text: "Coming from a non-aviation background, IAS gave me the exact grooming, spoken English confidence, and mock interview practice required. Selected in my first walk-in attempt!",
    },
    {
      name: "Rahul Verma",
      role: "Airport Ground Staff (AGS)",
      airport: "Delhi IGI Airport (DEL)",
      salary: "₹31,500/month",
      img: candRahulImg,
      text: "I registered online after seeing their ad. The counsellor explained the 12th pass eligibility transparently and scheduled me for the walk-in screening. Genuine & reliable guidance!",
    },
    {
      name: "Ananya Patel",
      role: "Cabin Crew Trainee",
      airport: "Bangalore International (BLR)",
      salary: "₹58,000/month",
      img: candAnanyaImg,
      text: "The height measurement checks and in-flight emergency mock questions were spot-on. The official reference code system ensured complete safety against fraudulent agents.",
    },
    {
      name: "Mohammed Irfan",
      role: "Air Cargo & Ramp Associate",
      airport: "Hyderabad Airport (HYD)",
      salary: "₹28,000/month",
      img: candIrfanImg,
      text: "10th pass qualification was sufficient for air cargo logistics. IAS verified my documents and helped me prepare for the technical screening. Very satisfied with their process.",
    },
  ];

  const ppcSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Aviation Careers & Airport Ground Staff Walk-in Registration 2026 | Indian Alliance Services",
    description:
      "Direct candidate registration portal for Airport Ground Staff, Customer Service Assistant, Cabin Crew, and Cargo Logistics opportunities across 45+ Indian airports.",
    url: "https://indianallianceservices.com/apply",
  };

  return (
    <>
      <SEO
        title="Direct Aviation Walk-In Registration 2026 | Ground Staff, CSA & Cabin Crew"
        description="Apply online for Airport Ground Staff (AGS), Customer Service Assistant (CSA), Cabin Crew, and Air Cargo opportunities. 10th/12th Pass & Freshers Eligible. Pan-India 45+ Airport Hubs."
        canonical="https://indianallianceservices.com/apply"
        schema={ppcSchema}
      />

      {/* Top Royal Aviation Trust & Contact Bar - Exactly like Homepage */}
      <div className="bg-navy-midnight text-primary-foreground/90 text-xs py-2 px-4 border-b border-gold/20 shadow-inner">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 text-gold px-2.5 py-0.5 font-bold text-[11px] border border-gold/30">
              <Award className="h-3 w-3 text-gold" /> IATA & NSDC Standards
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-300 px-2.5 py-0.5 font-bold text-[11px] border border-amber-500/35">
              <span>🌟 Est. 2015</span>
              <span className="hidden sm:inline">| 10+ Years of Excellence</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 text-secondary px-2.5 py-0.5 font-semibold text-[11px] border border-secondary/30">
              <Sparkles className="h-3 w-3" /> 100% Verified Opportunities
            </span>
            <span className="truncate hidden lg:inline text-primary-foreground/75 text-[11px]">
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

      {/* Main Navbar Header - Exact Homepage BG & High-Res Logo */}
      <header className="sticky top-0 z-50 bg-card/95 dark:bg-card/95 backdrop-blur-xl shadow-lg border-b border-gold/25 transition-all">
        <div className="container mx-auto flex items-center justify-between py-2 sm:py-3 px-4">
          {/* Royal Brand Logo - Exact Homepage Component & Size */}
          <Link to="/" className="flex items-center gap-3 py-1">
            <img
              src="/logo.png?v=ias2026"
              alt="Indian Alliance Services"
              className="h-[60px] sm:h-[75px] md:h-[80px] w-auto max-w-[260px] sm:max-w-[360px] md:max-w-[480px] object-contain transition-transform hover:scale-[1.02]"
              style={{ height: "75px", maxHeight: "80px" }}
            />
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/recruitment-verification" className="hidden lg:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold border-gold/40 text-foreground hover:bg-gold/10 hover:border-gold rounded-xl h-9"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-gold mr-1.5" />
                Verify Recruiter ID
              </Button>
            </Link>

            <a
              href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-muted/80 hover:bg-muted px-3.5 py-2 rounded-xl border border-border transition-colors h-9"
            >
              <Phone className="h-3.5 w-3.5 text-secondary" />
              <span>{settings.helplinePhone}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hi%20Indian%20Alliance%20Services,%20I%20want%20to%20apply%20for%20Aviation%20Airport%20opportunities.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2 rounded-xl border border-emerald-500/30 transition-colors h-9"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              <span className="hidden sm:inline">WhatsApp Advisor</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <Button
              onClick={() => scrollToForm()}
              size="sm"
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105 h-9"
            >
              <Zap className="h-3.5 w-3.5 mr-1" />
              <span>Apply Online</span>
            </Button>
          </div>
        </div>
      </header>


      {/* Hero Section with PPC Lead Capture Form */}
      <section className="relative bg-navy-midnight text-white py-12 lg:py-16 overflow-hidden border-b border-gold/25">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-luminosity"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-midnight/90 via-navy-midnight/95 to-navy-midnight pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: High-Impact PPC Pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <Sparkles className="h-4 w-4 text-gold animate-pulse" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gold">
                  Direct Walk-In Screening • 2026 Batch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight tracking-tight">
                Launch Your Career in <br className="hidden sm:block" />
                <span className="gold-gradient-text">Aviation & Airport Operations</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Direct candidate registration and opportunity advisory for <strong className="text-white font-semibold">Airport Ground Staff (AGS), Customer Service Assistant (CSA), Cabin Crew, and Cargo Logistics</strong> across 45+ premier airport hubs in India.
              </p>

              {/* Key Benefit Checkpoints */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-2.5 bg-slate-900/60 border border-gold/20 p-3 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Eligibility:</strong> 10th / 12th Pass & Graduates (Freshers Welcome)
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-900/60 border border-gold/20 p-3 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Age Criteria:</strong> 18 to 28 Years (Male & Female Candidates)
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-900/60 border border-gold/20 p-3 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Salary Scales:</strong> ₹25,000 to ₹95,000 / month + Flight Allowances
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-900/60 border border-gold/20 p-3 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>45+ Airports:</strong> Delhi, Mumbai, BLR, HYD, Kolkata, Jaipur, etc.
                  </span>
                </div>
              </div>

              {/* Trust Metric Counters */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gold/20 text-center">
                <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-gold/20">
                  <div className="text-2xl sm:text-3xl font-heading font-black text-gold">12,500+</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Aspirants Guided</div>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-gold/20">
                  <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-400">98.4%</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Shortlist Rate</div>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-gold/20">
                  <div className="text-2xl sm:text-3xl font-heading font-black text-secondary">45+</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Airport Hubs</div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Registration Form Card (Sticky / Focal Point) */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-[#0b1222] rounded-3xl border-2 border-gold/50 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                {/* Accent Top Ribbon */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
                
                <div className="mb-5 pb-4 border-b border-gold/25">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gold uppercase tracking-wider mb-1">
                    <Zap className="h-3.5 w-3.5" /> Instant Candidate Registration
                  </div>
                  <h2 className="text-2xl font-heading font-black text-white">
                    Apply for 2026 Walk-in Drive
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Takes 30 seconds • Get direct eligibility screening & counselling call.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ppc-name" className="text-xs font-semibold text-slate-200">
                      Candidate Full Name <span className="text-amber-400">*</span>
                    </Label>
                    <Input
                      id="ppc-name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                      required
                      className="h-11 bg-[#101a2e] border-slate-700 text-white placeholder:text-slate-500 focus:border-gold"
                    />
                  </div>

                  {/* Phone with duplicate detection */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ppc-phone" className="text-xs font-semibold text-slate-200">
                        10-Digit Mobile Number <span className="text-amber-400">*</span>
                      </Label>
                      {duplicateInfo.isDuplicate && (
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Already Registered
                        </span>
                      )}
                    </div>
                    <Input
                      id="ppc-phone"
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={15}
                      required
                      className={`h-11 bg-[#101a2e] text-white placeholder:text-slate-500 ${
                        duplicateInfo.isDuplicate
                          ? "border-amber-500 focus-visible:ring-amber-500 bg-amber-500/10"
                          : "border-slate-700 focus:border-gold"
                      }`}
                    />
                  </div>

                  {/* Duplicate Phone Warning Box */}
                  {duplicateInfo.isDuplicate && (
                    <div className="rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 p-4 text-left space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-heading font-bold text-white text-xs sm:text-sm">
                            You have already submitted an enquiry!
                          </h4>
                          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                            An application for <strong className="text-gold">+91 {normalizePhoneNumber(formData.phone)}</strong> was registered on <span className="text-white font-medium">{duplicateInfo.leadRecord?.submittedAt || "recently"}</span>{duplicateInfo.leadRecord?.targetRole ? ` for "${duplicateInfo.leadRecord.targetRole}"` : ""}.
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-2.5 text-[11px] text-slate-200 border border-amber-500/30 space-y-1">
                        <p className="font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          <span>Profile Active in Senior Counselling Queue</span>
                        </p>
                        <p className="text-[10px] text-slate-400 pl-4">
                          Our advisor will call you directly. No need to re-submit.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-gold px-2.5 py-1 rounded-lg"
                        >
                          <Phone className="h-3 w-3" /> Call: {settings.helplinePhone}
                        </a>
                        <a
                          href={`https://wa.me/${settings.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hi%20IAS,%20I%20have%20already%20applied%20from%20%2B91${normalizePhoneNumber(formData.phone)}%20and%20need%20an%20update.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/40"
                        >
                          <MessageCircle className="h-3 w-3 text-emerald-400" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Qualification & Role Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="ppc-qual" className="text-xs font-semibold text-slate-200">
                        Highest Qualification
                      </Label>
                      <Select
                        value={formData.qualification}
                        onValueChange={(val) => setFormData({ ...formData, qualification: val })}
                      >
                        <SelectTrigger id="ppc-qual" className="h-11 bg-[#101a2e] border-slate-700 text-white focus:border-gold">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0b1222] border-gold/40 text-white">
                          <SelectItem value="10th Pass">10th Pass</SelectItem>
                          <SelectItem value="12th Pass">12th Pass (Higher Sec.)</SelectItem>
                          <SelectItem value="Undergraduate">Undergraduate / College</SelectItem>
                          <SelectItem value="Graduate">Graduate (Any Stream)</SelectItem>
                          <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                          <SelectItem value="Diploma">Diploma Holder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="ppc-role" className="text-xs font-semibold text-slate-200">
                        Interested Role
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(val) => setFormData({ ...formData, role: val })}
                      >
                        <SelectTrigger id="ppc-role" className="h-11 bg-[#101a2e] border-slate-700 text-white focus:border-gold">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0b1222] border-gold/40 text-white">
                          <SelectItem value="Airport Ground Staff (AGS)">Airport Ground Staff (AGS)</SelectItem>
                          <SelectItem value="Customer Service Assistant (CSA)">CSA — Customer Service</SelectItem>
                          <SelectItem value="Cabin Crew / Flight Attendant">Cabin Crew / Airhostess</SelectItem>
                          <SelectItem value="Air Cargo Logistics Handler">Air Cargo & Ramp Logistics</SelectItem>
                          <SelectItem value="Ground Security Associate (GSA)">Ground Security Screener</SelectItem>
                          <SelectItem value="VIP Lounge Hospitality Host">VIP Airport Lounge</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Preferred City */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ppc-city" className="text-xs font-semibold text-slate-200">
                      Preferred Airport / City
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={(val) => setFormData({ ...formData, city: val })}
                    >
                      <SelectTrigger id="ppc-city" className="h-11 bg-[#101a2e] border-slate-700 text-white focus:border-gold">
                        <SelectValue placeholder="Select preferred city" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b1222] border-gold/40 text-white">
                        <SelectItem value="Delhi NCR">Delhi NCR (IGI Airport)</SelectItem>
                        <SelectItem value="Mumbai">Mumbai (CSMIA Airport)</SelectItem>
                        <SelectItem value="Bangalore">Bangalore (KIA Airport)</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad (RGIA Airport)</SelectItem>
                        <SelectItem value="Kolkata">Kolkata (NSCB Airport)</SelectItem>
                        <SelectItem value="Chennai">Chennai International</SelectItem>
                        <SelectItem value="Jaipur">Jaipur International</SelectItem>
                        <SelectItem value="Pune">Pune Airport</SelectItem>
                        <SelectItem value="Ahmedabad">Ahmedabad (SVPI Airport)</SelectItem>
                        <SelectItem value="Pan-India Open">Pan-India (Any Airport)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting || duplicateInfo.isDuplicate}
                      className={`w-full h-12 text-base font-black rounded-2xl shadow-xl transition-all ${
                        duplicateInfo.isDuplicate
                          ? "bg-amber-600/90 hover:bg-amber-600 text-white cursor-not-allowed opacity-90"
                          : "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 hover:scale-[1.02]"
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : duplicateInfo.isDuplicate ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" /> Already Registered — In Review
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" /> Register for Walk-In Drive Now
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center space-y-1 pt-1">
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Official verification reference ID issued on submission</span>
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Strict privacy assurance. No spam calls or unauthorized fees.
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* High-Demand Job Roles Section with 1-Click Apply */}
      <section className="py-14 sm:py-18 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              Active Vacancies & Opportunity Profiles
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-foreground">
              Explore Open Aviation Job Roles
            </h2>
            <p className="text-sm text-muted-foreground">
              Compare salary brackets, eligibility criteria, and shift models. Click "Quick Apply" to pre-fill the registration form.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {jobRoles.map((job, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border/80 hover:border-gold/50 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold bg-navy-midnight text-gold px-2.5 py-1 rounded border border-gold/30">
                      {job.code}
                    </span>
                    <span className="text-[11px] font-bold text-secondary bg-secondary/15 px-2.5 py-1 rounded-full border border-secondary/30">
                      {job.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-foreground text-lg group-hover:text-gold transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-extrabold text-secondary mt-1">
                      {job.salary}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {job.desc}
                  </p>

                  <div className="bg-muted/60 rounded-xl p-3 text-xs space-y-1 border border-border/60">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Eligibility:</span>
                      <strong className="text-foreground">{job.eligibility}</strong>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Age Limit:</span>
                      <strong className="text-foreground">{job.age}</strong>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Live Slots:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{job.openings}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-border/60">
                  <Button
                    onClick={() => scrollToForm(job.title)}
                    variant="outline"
                    className="w-full text-xs font-bold border-gold/40 hover:bg-gold hover:text-slate-950 gap-1.5 transition-colors"
                  >
                    <span>Quick Apply for {job.title.split(" ")[0]}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Simple Admission Process Workflow */}
      <section className="py-14 sm:py-18 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Simple 4-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-foreground">
              How the Walk-In Selection Works
            </h2>
            <p className="text-sm text-muted-foreground">
              Transparent, professional guidance from initial registration to interview day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 relative group hover:border-gold/50 shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-gold bg-navy-midnight px-2 py-0.5 rounded border border-gold/30">
                  STEP 01
                </span>
                <Sparkles className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">
                1. Online Registration
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit your name, qualification, and mobile number. Receive your unique applicant reference ID.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 relative group hover:border-secondary/50 shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-secondary bg-secondary/15 px-2 py-0.5 rounded border border-secondary/30">
                  STEP 02
                </span>
                <Phone className="h-4 w-4 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">
                2. Telephonic Screening
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A senior student advisor calls you within 24 hours to verify height criteria, age band, and preferred airport.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 relative group hover:border-gold/50 shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-gold bg-navy-midnight px-2 py-0.5 rounded border border-gold/30">
                  STEP 03
                </span>
                <Award className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">
                3. Interview Coaching & GD Prep
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Get groomed on airline body language, spoken English modulation, top 15 HR questions, and IATA airport codes.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 relative group hover:border-emerald-500/50 shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-emerald-500 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  STEP 04
                </span>
                <Plane className="h-4 w-4 text-emerald-500" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">
                4. Walk-In Drive Scheduling
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Attend scheduled walk-in drives across 45+ domestic & international airport hubs with complete reporting assistance.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              onClick={() => scrollToForm()}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 rounded-2xl shadow-lg"
            >
              <Send className="h-4 w-4 mr-2" /> Start Step 01: Register Free Today
            </Button>
          </div>
        </div>
      </section>

      {/* Candidate Success Stories & Placements */}
      <section className="py-14 sm:py-18 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Real Candidate Outcomes
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-foreground">
              Selected Candidate Testimonials
            </h2>
            <p className="text-sm text-muted-foreground">
              Hear from students across India who successfully launched their aviation careers with IAS guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((cand, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.img}
                      alt={cand.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-gold/40 shrink-0"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-foreground text-sm">
                        {cand.name}
                      </h4>
                      <p className="text-[11px] text-secondary font-semibold">
                        {cand.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{cand.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span>Base Airport:</span>
                    <strong className="text-foreground">{cand.airport.split(" ")[0]}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Starting Package:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">{cand.salary}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Security & Anti-Fraud Advisory Card */}
      <section className="py-8 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-amber-500/10 via-background to-amber-500/10 rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-500/20 p-3 text-amber-700 dark:text-amber-300 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                    Candidate Security & Official Advisory Notice
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Indian Alliance Services operates with strict anti-fraud transparency protocols.
                  </p>
                </div>
              </div>

              <Link to="/recruitment-verification" className="shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold border-amber-500/40 hover:bg-amber-500/10 text-foreground gap-1.5"
                >
                  <FileCheck className="h-3.5 w-3.5 text-amber-600" />
                  <span>Verify Recruiter ID</span>
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground pt-1 border-t border-border/60">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Official calls strictly originate from verified coordinators (Alia Mirza, Ankita Singh, Anamika Shinde, Diksha Pawar).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  We <strong>never ask for UPI PINs, informal cash deposits</strong>, or personal bank transfers via WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PPC FAQ Section */}
      <section className="py-14 sm:py-18 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-services" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                What complete services does Indian Alliance Services provide?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                <p>
                  Indian Alliance Services offers a complete 360-degree aviation preparatory ecosystem:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Free Profile Eligibility Assessment:</strong> Evaluating educational criteria (10th/12th/Graduate), age, height standards, and communication readiness.</li>
                  <li><strong>IATA Grooming & Personality Mastery:</strong> Professional airline attire rules, posture, corporate etiquette, and customer service delight.</li>
                  <li><strong>Airline GD & Mock Interview Drills:</strong> Simulated panel interviews, Top 15 airline HR answers, and confidence coaching.</li>
                  <li><strong>Airport Terminology & Ticketing Concepts:</strong> 3-letter IATA city codes, Departure Control System (DCS) workflows, and baggage reconciliation (BRS).</li>
                  <li><strong>Direct Walk-In Drive Scheduling:</strong> Allocating candidates to verified hiring drives across 45+ domestic & international airport hubs.</li>
                  <li><strong>Candidate Onboarding & AEP Pass Support:</strong> Guidance through police verification, medical fitness checkups, and airport entry pass documentation.</li>
                  <li><strong>Recruiter ID Anti-Fraud Verification:</strong> Centralized portal to verify official reference IDs and prevent fraud.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                Are freshers with zero aviation experience eligible to apply?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                Yes! Over 80% of candidates placed in Airport Ground Staff (AGS) and Customer Service Assistant (CSA) roles are freshers. We provide complete interview grooming, GD prep, and airport terminology coaching to help you clear airline walk-in screenings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                What is the minimum qualification and age requirement?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                For Air Cargo Logistics & Ramp Operations, 10th Pass is accepted. For Ground Staff, CSA, and Cabin Crew, minimum 12th Pass (Higher Secondary in any stream: Arts, Commerce, or Science) or any Graduation degree is required. Age band is 18 to 28 years (up to 32 for cargo operations).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-diff" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                What is the difference between Ground Staff (AGS), CSA, and Cabin Crew?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                <p><strong>• Airport Ground Staff (AGS):</strong> Manages passenger boarding gates, queue facilitation, boarding pass check, and tarmac coordination (₹25,000 – ₹45,000 / month).</p>
                <p><strong>• Customer Service Assistant (CSA):</strong> Operates check-in counters, baggage weighing, passenger queries, and VIP terminal desks (₹28,000 – ₹50,000 / month).</p>
                <p><strong>• Cabin Crew / Flight Attendant:</strong> Handles in-flight passenger safety, executive hospitality, and emergency protocols (₹45,000 – ₹95,000 / month + flight allowances).</p>
                <p><strong>• Air Cargo & Ramp Logistics:</strong> Manages freight manifests, AWB documentation, and palletizing (₹20,000 – ₹36,000 / month).</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-fees" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                Are there any online registration or counselling fees?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                Initial candidate registration, profile eligibility review, and telephonic counselling guidance on our official website are completely free. Indian Alliance Services strictly maintains anti-fraud transparency and never solicits cash deposits or personal WhatsApp UPI transfers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                Is fluent English communication mandatory?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                Basic conversational English and Hindi are sufficient for domestic airport ground staff and ticketing roles. For Cabin Crew, fluent spoken English is preferred. We train candidates in voice modulation and airport conversational phrases during prep sessions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                How soon will I receive a counselling screening call after applying?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                Our Senior Academic & Talent Counselling team calls all registered candidates within 24 business hours (Monday to Saturday, 9:30 AM to 6:30 PM IST). You will receive your official reference code right upon submitting the form.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-verify" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                How does Candidate ID & Recruiter Verification work?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                Upon registration, a unique reference identifier (e.g. IAS-2026-XXXXXX) is generated. You can verify your application status, interview batches, and issuing recruitment officers anytime using our official Recruitment Verification lookup portal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
                Which airports across India are covered for interview scheduling?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                We schedule and guide candidates for 45+ domestic and international airport hubs including Delhi (DEL), Mumbai (BOM), Bengaluru (BLR), Hyderabad (HYD), Kolkata (CCU), Chennai (MAA), Ahmedabad (AMD), Pune (PNQ), Jaipur (JAI), Goa (GOI), Lucknow (LKO), and Tier-2 regional airport bases.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Dedicated Policy-Compliant PPC Footer */}
      <footer className="bg-[#080d1a] text-slate-300 border-t border-gold/30 py-12 pb-24 lg:pb-12 text-xs">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          
          {/* Top Footer Row */}
          <div className="grid md:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-8">
            <div className="md:col-span-6 space-y-3">
              <Link to="/" className="inline-block">
                <img
                  src="/logo.png?v=ias2026"
                  alt="Indian Alliance Services"
                  className="h-14 sm:h-16 w-auto object-contain bg-white/95 p-1.5 rounded-xl border border-gold/40"
                />
              </Link>
              <p className="text-slate-400 max-w-md leading-relaxed text-xs">
                Premier Aviation Career Guidance, Training & Opportunity Portal of India. Guiding 10th/12th & Graduate aspirants for verified Airport Ground Staff, CSA, Cabin Crew, and Cargo Operations since 2015.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1 bg-gold/15 text-gold px-2.5 py-0.5 rounded text-[11px] font-bold border border-gold/30">
                  <Award className="h-3 w-3" /> IATA & NSDC Standards
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded text-[11px] font-bold border border-emerald-500/30">
                  <ShieldCheck className="h-3 w-3" /> 100% Anti-Fraud Transparency
                </span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-3 md:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                Official Admissions Desk & Support
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p>
                  <strong className="text-white">Helpline (Mon – Sat, 9:30 AM – 6:30 PM):</strong>{" "}
                  <a href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`} className="text-gold font-bold hover:underline">
                    {settings.helplinePhone}
                  </a>
                </p>
                <p>
                  <strong className="text-white">Official Email:</strong>{" "}
                  <a href={`mailto:${settings.supportEmail}`} className="text-slate-300 hover:text-gold">
                    {settings.supportEmail}
                  </a>
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Administrative Office:</strong> {settings.displayAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Legal Compliance Navigation Links for Google & Meta Ads */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 font-semibold border-b border-slate-800/80 pb-6 text-xs">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer & Anti-Fraud Advisory
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/recruitment-verification" className="hover:text-gold text-gold font-bold transition-colors inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verify Candidate / Recruiter ID
            </Link>
          </div>

          {/* Ad Policy Disclaimer Notice */}
          <div className="text-[11px] text-slate-500 text-center leading-relaxed max-w-4xl mx-auto space-y-2">
            <p>
              <strong>Official Advisory:</strong> Indian Alliance Services operates as a private preparatory and career advisory guidance network across domestic and international airports. We are not directly affiliated with any single government airline. All shortlisted applicants are issued a legitimate tracking identifier for interview schedule access. We strictly never solicit cash payments, OTPs, or personal WhatsApp transfers.
            </p>
            <p>
              © 2015 – 2026 Indian Alliance Services (IAS). All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Bottom Sticky Bar for Mobile PPC Visitors */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-navy-midnight/95 backdrop-blur-md border-t border-gold/30 p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          <a
            href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl border border-gold/30 text-xs"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            <span>Call Helpline</span>
          </a>

          <a
            href={`https://wa.me/${settings.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hi%20Indian%20Alliance%20Services,%20I%20want%20to%20apply%20for%20Airport%20opportunities.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold py-3 rounded-xl border border-emerald-500/40 text-xs"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <Button
            onClick={() => scrollToForm()}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black py-3 rounded-xl shadow-md text-xs"
          >
            Apply Now
          </Button>
        </div>
      </div>

    </>
  );
}
