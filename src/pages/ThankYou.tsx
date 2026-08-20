import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  ShieldCheck,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Copy,
  Check,
  Compass,
  BookOpen,
  MessageCircle,
  FileCheck,
  ChevronRight,
  Plane,
  Home as HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface ThankYouState {
  name?: string;
  phone?: string;
  email?: string;
  qualification?: string;
  targetRole?: string;
  city?: string;
  source?: string;
  refId?: string;
}

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteConfig();
  const state = (location.state as ThankYouState) || {};

  const [copied, setCopied] = useState(false);

  // Generate a consistent reference code if not provided
  const [refCode] = useState(() => {
    if (state.refId) return state.refId;
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `IAS-${new Date().getFullYear()}-${randomNum}`;
  });

  const [submissionTime] = useState(() => {
    return new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const candidateName = state.name?.trim() || "Candidate";
  const candidatePhone = state.phone?.trim() || "Registered Mobile";
  const candidateEmail = state.email?.trim() || "Not provided";
  const targetRole = state.targetRole?.trim() || "Airport Career Guidance";
  const candidateQualification = state.qualification?.trim() || "General Eligibility";
  const candidateCity = state.city?.trim() || "Pan India";

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const thankYouSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Thank You for Registering | Indian Alliance Services",
    description:
      "Confirmation page for Indian Alliance Services candidate registration and career counselling enquiries.",
    url: "https://indianallianceservices.com/thank-you",
  };

  return (
    <>
      <SEO
        title="Thank You for Registering | Indian Alliance Services"
        description="Your aviation career counselling request has been successfully submitted. Our senior student advisor will contact you within 24 business hours."
        canonical="https://indianallianceservices.com/thank-you"
        schema={thankYouSchema}
      />

      {/* Hero / Header Section */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.22),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: "Registration Confirmation" }]}
            className="text-primary-foreground/70 mb-4"
          />

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-wide text-emerald-300 uppercase">
                Enquiry Successfully Logged
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight">
              Thank You, <span className="gold-gradient-text">{candidateName}</span>!
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
              Your career guidance request has been registered in our central counselling system. A dedicated senior advisor will reach out to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          
          {/* 1. Reference Code & Status Card */}
          <div className="bg-card rounded-3xl border-2 border-gold/40 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#080d1a] via-[#0f172a] to-[#080d1a] p-6 sm:p-8 text-white border-b border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="rounded-2xl bg-emerald-500/20 text-emerald-400 p-3.5 border border-emerald-500/30 shrink-0">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Application Reference Identifier
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wider flex items-center gap-3 mt-0.5">
                    <span>{refCode}</span>
                    <button
                      onClick={handleCopyRef}
                      title="Copy Reference Code"
                      className="text-xs font-sans font-bold bg-gold/20 hover:bg-gold/30 text-gold px-2.5 py-1 rounded-lg border border-gold/30 inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="h-3.5 w-3.5" /> Screening Queue: Active
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Logged at: {submissionTime}</p>
              </div>
            </div>

            {/* Submission Details Grid */}
            <div className="p-6 sm:p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-card text-foreground">
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Candidate Name
                </span>
                <p className="text-base font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  {candidateName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contact Mobile
                </span>
                <p className="text-base font-bold text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />
                  {candidatePhone}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Interested Career Path
                </span>
                <p className="text-base font-bold text-secondary flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-secondary shrink-0" />
                  {targetRole}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Highest Qualification
                </span>
                <p className="text-base font-semibold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gold shrink-0" />
                  {candidateQualification}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Preferred Airport / City
                </span>
                <p className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />
                  {candidateCity}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email Address
                </span>
                <p className="text-base font-semibold text-foreground truncate flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  {candidateEmail}
                </p>
              </div>
            </div>
          </div>

          {/* 2. What Happens Next - 4 Step Interactive Timeline */}
          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Transparent Process
                </span>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  What Happens Next?
                </h2>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                Step-by-step guidance workflow
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="rounded-2xl bg-muted/40 border border-border/80 p-5 space-y-2 relative group hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-gold bg-navy-midnight px-2 py-0.5 rounded border border-gold/30">
                    STEP 01
                  </span>
                  <Clock className="h-4 w-4 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm pt-1">
                  Profile & Eligibility Review
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our academic counselling team evaluates your 10th/12th marksheets, age band, and height criteria against airline standards.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-muted/40 border border-border/80 p-5 space-y-2 relative group hover:border-secondary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-secondary bg-secondary/15 px-2 py-0.5 rounded border border-secondary/30">
                    STEP 02
                  </span>
                  <Phone className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm pt-1">
                  Telephonic Screening Call
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A senior student advisor calls you on <strong className="text-foreground">{candidatePhone}</strong> within 24 business hours to discuss airport career options.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-muted/40 border border-border/80 p-5 space-y-2 relative group hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-gold bg-navy-midnight px-2 py-0.5 rounded border border-gold/30">
                    STEP 03
                  </span>
                  <BookOpen className="h-4 w-4 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm pt-1">
                  Interview Coaching & GD Prep
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Receive personalized guidance on airline grooming rules, body language, top 15 HR questions, and airport terminology.
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl bg-muted/40 border border-border/80 p-5 space-y-2 relative group hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-emerald-500 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                    STEP 04
                  </span>
                  <Plane className="h-4 w-4 text-emerald-500" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm pt-1">
                  Walk-In Drive Scheduling
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get allocated to verified walk-in drives across 45+ domestic and international airport hubs with complete reporting guidance.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Anti-Fraud & Verification Trust Notice */}
          <div className="bg-gradient-to-r from-amber-500/10 via-background to-amber-500/10 rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-500/20 p-3 text-amber-700 dark:text-amber-300 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                    Candidate Security & Official Contact Verification
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Protect yourself against unverified callers claiming to represent Indian Alliance Services.
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
                  Official calls originate strictly from our verified talent coordinators (Alia Mirza, Ankita Singh, Anamika Shinde, Diksha Pawar, etc.).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  We strictly <strong>never ask for OTPs, UPI PINs, or informal cash deposits</strong> over WhatsApp or personal SMS.
                </span>
              </div>
            </div>
          </div>

          {/* 4. Quick Actions / Next Explorations */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-foreground text-lg text-center">
              While You Wait for Our Call, Explore Helpful Resources:
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/interview-tips"
                className="group bg-card rounded-2xl border border-border p-5 hover:border-gold/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl bg-gold/15 p-2.5 text-gold w-fit mb-3 group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-sm mb-1 group-hover:text-gold transition-colors">
                    Aviation Interview Tips
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Master the Top 15 Airline HR questions, GD leadership rules, and grooming guidelines.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border/50 text-xs font-bold text-secondary group-hover:text-gold inline-flex items-center gap-1">
                  <span>Read Interview Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>

              <Link
                to="/notifications"
                className="group bg-card rounded-2xl border border-border p-5 hover:border-secondary/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl bg-secondary/15 p-2.5 text-secondary w-fit mb-3 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Plane className="h-5 w-5" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-sm mb-1 group-hover:text-secondary transition-colors">
                    Latest Walk-In Notices
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Check active airport drive schedules, admit card updates, and pan-India notices.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border/50 text-xs font-bold text-secondary inline-flex items-center gap-1">
                  <span>View All Notices</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>

              <Link
                to="/careers"
                className="group bg-card rounded-2xl border border-border p-5 hover:border-gold/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl bg-gold/15 p-2.5 text-gold w-fit mb-3 group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-sm mb-1 group-hover:text-gold transition-colors">
                    Airport Job Roles Guide
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Compare salary scales, shift timings, and growth paths for Ground Staff, CSA, and Cabin Crew.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border/50 text-xs font-bold text-secondary group-hover:text-gold inline-flex items-center gap-1">
                  <span>Browse Vacancies</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* 5. Direct Helpline & Home Navigation Bar */}
          <div className="bg-navy-midnight text-white rounded-3xl p-6 sm:p-8 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-lg text-white">
                Need Immediate Career Guidance?
              </h4>
              <p className="text-xs text-slate-300">
                You can directly connect with our central admissions desk during office hours (9:30 AM – 6:30 PM).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold gap-2 text-xs shadow-md"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call {settings.helplinePhone}</span>
                </Button>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hi%20Indian%20Alliance%20Services,%20I%20have%20submitted%20an%20enquiry%20(Ref:%20${refCode})%20and%20need%20career%20guidance.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 font-bold gap-2 text-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Helpdesk</span>
                </Button>
              </a>

              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white text-xs gap-1.5"
                >
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span>Return to Home</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
