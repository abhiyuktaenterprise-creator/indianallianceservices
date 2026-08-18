import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle2,
  Users,
  Headphones,
  Plane,
  Settings,
  Package,
  UserCheck,
  Compass,
  Heart,
  Route,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Star,
  Quote,
  ChevronRight,
  Building2,
  HelpCircle,
  BadgeCheck,
  Award,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/hero-aviation.jpg";
import groundServicesImg from "@/assets/ground-services.jpg";
import anthonyImg from "@/assets/team/anthony_ghospade.jpg";
import adityaImg from "@/assets/team/aditya_gujral.jpg";
import prashantImg from "@/assets/team/prashant_chadda.jpg";
import aliaImg from "@/assets/team/alia_mirza.jpg";
import ankitaImg from "@/assets/team/ankita_singh.jpg";
import divyaImg from "@/assets/team/divya_sharma.jpg";
import teenaImg from "@/assets/team/teena_roy.jpg";
import anamikaImg from "@/assets/team/anamika_shinde.jpg";
import padmavatiImg from "@/assets/team/padmavati.jpg";
import anyDussojaImg from "@/assets/team/any_dussoja.jpg";
import dikshaImg from "@/assets/team/diksha_pawar.jpg";
import komalImg from "@/assets/team/komal_sharma.jpg";
import avniImg from "@/assets/team/avni_sharma.jpg";
import priyaImg from "@/assets/team/priya_sharma.jpg";
import aditiImg from "@/assets/team/aditi_thakur.jpg";
import arpitaImg from "@/assets/team/arpita_shinde.jpg";
import preetiImg from "@/assets/team/preeti_sharma.jpg";
import prachiImg from "@/assets/team/prachi_sharma.jpg";

import candPriyaImg from "@/assets/candidates/priya_sharma.jpg";
import candRahulImg from "@/assets/candidates/rahul_verma.jpg";
import candAnanyaImg from "@/assets/candidates/ananya_patel.jpg";
import candIrfanImg from "@/assets/candidates/mohammed_irfan.jpg";
import SEO from "@/components/common/SEO";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import ContactForm from "@/components/common/ContactForm";
import EnquiryModal from "@/components/common/EnquiryModal";
import AIEvaluationMatcher from "@/components/common/AIEvaluationMatcher";
import AIResumeScanner from "@/components/common/AIResumeScanner";

// ==========================================
// 1. WHAT WE ARE OFFERING (6 Core Offerings)
// ==========================================
const whatWeAreOffering = [
  {
    icon: Compass,
    badge: "Offering 01",
    title: "Profile & Eligibility Assessment",
    desc: "Personalized evaluation of educational criteria (10th/12th/Graduate), age, height standards, spoken English fluency, and airport role compatibility.",
    benefits: ["Profile Screening", "Real Eligibility Check", "Personalized Roadmap"],
    link: "/contact",
  },
  {
    icon: Sparkles,
    badge: "Offering 02",
    title: "Aviation Grooming & Personality Mastery",
    desc: "Comprehensive coaching on international airline grooming benchmarks, body language, executive etiquette, and customer delight standards.",
    benefits: ["Uniform & Styling Guidelines", "Verbal Communication Drills", "Confidence Building"],
    link: "/interview-tips",
  },
  {
    icon: UserCheck,
    badge: "Offering 03",
    title: "Aviation GD & Airline Mock Interview Drills",
    desc: "Real-world simulation of airline HR rounds, technical ground handling Q&A, and Group Discussion (GD) leadership rules.",
    benefits: ["Live Simulated Panel Drills", "Top 15 Airline HR Answers", "Instant Trainer Feedback"],
    link: "/interview-tips",
  },
  {
    icon: GraduationCap,
    badge: "Offering 04",
    title: "ATS-Optimized Aviation Resume Crafting",
    desc: "Transform your CV into an IATA-aligned aviation resume with industry-specific keywords that pass automated airline recruitment screening.",
    benefits: ["Aviation Keyword Optimization", "Gate Pass Compliance", "Professional Formatting"],
    link: "/careers",
  },
  {
    icon: Briefcase,
    badge: "Offering 05",
    title: "Direct Placement & Walk-In Drive Coordination",
    desc: "Active scheduling and alerts for confirmed recruitment drives across 45+ domestic and international airport hubs throughout India.",
    benefits: ["Pan-India Airport Coverage", "Interview Admit Pass Support", "Regular Walk-In Alerts"],
    link: "/notifications",
  },
  {
    icon: ShieldCheck,
    badge: "Offering 06",
    title: "Anti-Fraud Verification & Candidate Trust",
    desc: "Protecting students through instant recruiter ID lookup, verified official correspondence, and a strict 100% zero-donation hiring policy.",
    benefits: ["Live Candidate ID Check", "Zero Hidden Charges", "Safe Recruitment Advisory"],
    link: "/recruitment-verification",
  },
];

// ==========================================
// 2. LATEST JOBS OF AVIATION (Active Openings)
// ==========================================
const latestAviationJobs = [
  {
    id: "ags",
    code: "AGS-2026",
    badge: "Actively Hiring",
    title: "Airport Ground Staff (AGS)",
    department: "Terminal & Ramp Operations",
    salary: "₹24,000 – ₹38,000 / mo",
    locations: ["Delhi (DEL)", "Mumbai (BOM)", "Bangalore (BLR)", "Jaipur (JAI)"],
    eligibility: "12th Pass / Graduate (Freshers Eligible)",
    openings: "45+ Openings",
    desc: "Boarding gate operations, baggage reconciliation, tarmac assistance, and passenger embarkation management.",
    roleName: "Airport Ground Staff",
  },
  {
    id: "csa",
    code: "CSA-2026",
    badge: "High Demand",
    title: "Customer Service Associate (CSA)",
    department: "Passenger Services & Ticketing",
    salary: "₹26,000 – ₹42,000 / mo",
    locations: ["Pan-India Metro & Regional Airports"],
    eligibility: "12th Pass / Any Graduate",
    openings: "38+ Openings",
    desc: "Check-in counter operations, flight boarding announcements, query resolution, and executive airport lounge hosting.",
    roleName: "Customer Service Associate",
  },
  {
    id: "cabin-crew",
    code: "CC-2026",
    badge: "Walk-In Drive",
    title: "Cabin Crew / Air Hostess",
    department: "In-Flight Services & Hospitality",
    salary: "₹48,000 – ₹85,000 / mo",
    locations: ["Delhi (DEL)", "Mumbai (BOM)", "Hyderabad (HYD)", "Kolkata (CCU)"],
    eligibility: "12th Pass (Min 155cm Female / 170cm Male)",
    openings: "25+ Openings",
    desc: "In-flight passenger safety, world-class hospitality, emergency readiness, and safety equipment operations.",
    roleName: "Cabin Crew",
  },
  {
    id: "cargo",
    code: "CARGO-2026",
    badge: "Freshers Welcome",
    title: "Air Cargo & Freight Handler",
    department: "Air Cargo Logistics & Airside Warehouse",
    salary: "₹20,000 – ₹32,000 / mo",
    locations: ["Major Domestic & International Cargo Hubs"],
    eligibility: "10th / 12th Pass",
    openings: "50+ Openings",
    desc: "Air cargo documentation, dangerous goods handling assistance, parcel tagging, and airside cargo logistics.",
    roleName: "Air Cargo Handling",
  },
  {
    id: "security",
    code: "SEC-2026",
    badge: "Immediate Requirement",
    title: "Airport Security & Tarmac Marshall",
    department: "Aviation Security & Airside Safety",
    salary: "₹23,000 – ₹36,000 / mo",
    locations: ["Tier 1 & Tier 2 Regional Airports"],
    eligibility: "12th Pass / Basic Physical Fitness",
    openings: "30+ Openings",
    desc: "Passenger screening support, terminal access control, ramp marshaling, and safety protocol enforcement.",
    roleName: "Airport Security",
  },
  {
    id: "hr-tele",
    code: "IAS-HR-2026",
    badge: "Internal Hiring",
    title: "HR & Telecalling Executive",
    department: "Talent Acquisition & Student Guidance",
    salary: "Best in Industry + Performance Incentives",
    locations: ["Pudicherla Office / Hybrid Available"],
    eligibility: "Any Graduate / Strong Spoken Communication",
    openings: "12 Openings",
    desc: "Telephonic candidate screening, aviation counselling coordination, student follow-ups, and interview scheduling.",
    roleName: "HR & Telecalling Executive",
  },
];

// 6-step How We Help Process
const howWeHelpSteps = [
  {
    step: "01",
    title: "Career Counselling",
    desc: "Detailed discussion with senior career counselors to understand your aspirations, strengths, and geographical preference.",
  },
  {
    step: "02",
    title: "Profile & Eligibility Assessment",
    desc: "Thorough review of educational qualifications, age eligibility, height criteria, language proficiency, and background.",
  },
  {
    step: "03",
    title: "Career Selection",
    desc: "Selecting the most suitable airport role (Ground Staff, Customer Service, Cargo, Operations, Cabin Crew guidance).",
  },
  {
    step: "04",
    title: "Training & Preparation",
    desc: "Targeted skill grooming, personality development, industry etiquette, airport terminology, and resume restructuring.",
  },
  {
    step: "05",
    title: "Interview Preparation",
    desc: "Intensive mock interviews, HR telephonic simulation, grooming checks, and confidence building for airline screening rounds.",
  },
  {
    step: "06",
    title: "Placement Assistance",
    desc: "Coordinated interview drives, timely application follow-ups, and complete documentation guidance until selection.",
  },
];

// Core Why Choose Us Pillars
const whyChoosePillars = [
  {
    title: "IATA & NHDC Certified Quality Standards",
    desc: "Our career counselling, curriculum guidance, and interview coaching frameworks align with IATA international benchmarks and NHDC quality standards.",
  },
  {
    title: "Student-First Philosophy",
    desc: "We focus on real candidate capabilities and realistic aviation career matching rather than unrealistic promises.",
  },
  {
    title: "Transparent & Ethical Process",
    desc: "Complete clarity on eligibility criteria, realistic timelines, and actual role requirements with zero ambiguity.",
  },
  {
    title: "Comprehensive Mock Drills",
    desc: "Rigorous preparation covering airline-specific telephonic interviews, grooming standards, and customer service drills.",
  },
  {
    title: "Multi-City Guidance Presence",
    desc: "Guiding students from Mumbai, Kolkata, Chennai, Visakhapatnam, Pune, Nagpur, Delhi NCR, and across India.",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Ground Staff, Delhi Airport",
    image: candPriyaImg,
    text: "Indian Alliance Services guided me from zero knowledge to landing my dream job at Delhi Airport. The training and interview prep were outstanding!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Cargo Operations, Mumbai Airport",
    image: candRahulImg,
    text: "I was confused about career options after 12th. Their counselling helped me discover airport cargo operations — and now I'm working at Mumbai Airport!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Customer Service, Bangalore Airport",
    image: candAnanyaImg,
    text: "The entire process was transparent and supportive. Within 3 months of joining, I was placed as a Customer Service Executive.",
    rating: 5,
  },
  {
    name: "Mohammed Irfan",
    role: "Cabin Crew, IndiGo",
    image: candIrfanImg,
    text: "Professional grooming and mock interviews gave me the confidence I needed. Today I fly with IndiGo — thanks to Indian Alliance Services!",
    rating: 5,
  },
];

// FAQ preview
const homeFaqs = [
  {
    q: "What is Indian Alliance Services?",
    a: "Indian Alliance Services is India's premier aviation career guidance, training support, and airport placement network. We help freshers, 10+2, and graduates secure high-demand airline and airport roles through structured counselling, grooming, mock interviews, and verified hiring connections.",
  },
  {
    q: "What airport jobs are available for 10th and 12th pass freshers?",
    a: "Candidates with 12th pass qualification can apply for Airport Ground Staff, Customer Service Executive (CSE), Cabin Crew (subject to age and height criteria), Cargo Handling, and Airline Support roles. Select entry-level cargo and baggage handling roles are also open to 10th pass candidates.",
  },
  {
    q: "What career guidance and counselling does Indian Alliance Services provide?",
    a: "We offer comprehensive career counselling to evaluate your eligibility, communication skills, and personal interests, guiding you to the most appropriate airport role before you begin preparation.",
  },
  {
    q: "How can I verify a recruitment message or interview call from Indian Alliance Services?",
    a: "You can verify any official communication by visiting our official website (indianallianceservices.com), emailing our official helpdesk at support@indianallianceservices.com, or using our dedicated Recruitment Verification portal.",
  },
];

import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Home() {
  const { homeContent, settings } = useSiteConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleOpenRoleModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  // Schema.org Structured Data
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://indianallianceservices.com/#organization",
        name: "Indian Alliance Services",
        alternateName: "Indian Alliance Services - Aviation Careers & Training",
        url: "https://indianallianceservices.com",
        logo: "https://indianallianceservices.com/logo.png",
        description: "Aviation Career Guidance, Training Guidance & Placement Assistance Consultancy in India.",
        email: settings.supportEmail,
        address: {
          "@type": "PostalAddress",
          streetAddress: "152, Agatti",
          addressLocality: "Agatti",
          addressRegion: "Lakshadweep",
          postalCode: "682553",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://indianallianceservices.com/#website",
        url: "https://indianallianceservices.com",
        name: "Indian Alliance Services",
        publisher: {
          "@id": "https://indianallianceservices.com/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://indianallianceservices.com/#faq",
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title="Indian Alliance Services | Aviation Careers, Training & Airport Jobs"
        description="India's leading aviation career consultancy. Professional eligibility matching, IATA-aligned grooming, and direct walk-in interview drives for Airport Ground Staff, Cabin Crew, and Cargo Operations."
        canonical="https://indianallianceservices.com/"
        schema={homeSchema}
      />

      {/* Real-Time Flight Radar Walk-in Drive Ticker */}
      <div className="bg-[#0b1220] border-b border-gold/30 py-2 px-4 text-primary-foreground text-xs overflow-hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-ping" /> LIVE FLIGHT RADAR
            </span>
            <span className="font-bold text-gold hidden sm:inline text-xs">
              Recruitment Drive:
            </span>
          </div>
          <div className="truncate text-xs text-primary-foreground/90 font-medium">
            {homeContent.tickerNotice}
          </div>
          <Link
            to="/notifications"
            className="shrink-0 text-gold hover:text-amber-300 hover:underline font-bold text-xs flex items-center gap-1"
          >
            <span>View All Notices</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ==================================================
          1. ROYAL AVIATION LUXURY HERO SECTION
          ================================================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-midnight text-primary-foreground">
        {/* Background Image & Luxury Radial Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Airport professionals and ground staff walking in modern terminal"
            className="w-full h-full object-cover object-center scale-105 animate-fade-in opacity-35"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/90 to-navy-dark/95" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge & IATA / NHDC Certificate */}
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark/90 border border-gold/40 px-4 py-1.5 backdrop-blur-md shadow-lg">
                <Sparkles className="h-4 w-4 text-gold animate-pulse" />
                <span className="text-xs sm:text-sm font-mono font-bold tracking-wide text-gold uppercase">
                  {homeContent.heroBadge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tight">
                {homeContent.heroHeadline}
              </h1>

              {/* 3 Core Value Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-gold">
                <span className="inline-flex items-center gap-1.5 bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> Direct Eligibility Match
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> Airline GD & Grooming
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Direct Walk-in Drives
                </span>
              </div>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                {homeContent.heroSubtitle}
              </p>

              {/* Live Airport Telemetry Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-lg pt-1 pb-1">
                <div className="bg-[#0b1220]/80 border border-gold/30 rounded-2xl p-3.5 text-center backdrop-blur-md shadow-md">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-gold">{homeContent.statHubs}</div>
                  <div className="text-[11px] text-slate-300 font-semibold uppercase mt-0.5">Airport Hubs</div>
                </div>
                <div className="bg-[#0b1220]/80 border border-gold/30 rounded-2xl p-3.5 text-center backdrop-blur-md shadow-md">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">{homeContent.statStudents}</div>
                  <div className="text-[11px] text-slate-300 font-semibold uppercase mt-0.5">Students Guided</div>
                </div>
                <div className="bg-[#0b1220]/80 border border-gold/30 rounded-2xl p-3.5 text-center backdrop-blur-md shadow-md">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-gold">{homeContent.statPlacementRate}</div>
                  <div className="text-[11px] text-slate-300 font-semibold uppercase mt-0.5">Placement Rate</div>
                </div>
              </div>

              {/* Hero Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="text-base font-extrabold gap-2 px-8 py-6 rounded-2xl shadow-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 transition-all hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" /> Get Career Counselling
                </Button>

                <a href="#ai-matcher">
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full sm:w-auto text-base font-bold gap-2 px-8 py-6 rounded-2xl border-gold/40 text-gold hover:bg-gold/10 hover:border-gold"
                  >
                    <Plane className="h-5 w-5 text-gold" /> Run AI Eligibility Matcher
                  </Button>
                </a>
              </div>

              {/* Quick Trust Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-gold font-bold">
                  <Award className="h-4 w-4 text-gold" />
                  <span>IATA & NHDC Standards</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>100% Anti-Fraud Guarantee</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  <span>Direct Application Desk</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card with Airport Hub Visuals & Telemetry */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-gold/40 shadow-2xl bg-[#080d1a] p-3 group">
                <img
                  src={groundServicesImg}
                  alt="Indian Alliance Services Airport Operations"
                  className="rounded-2xl object-cover w-full h-[380px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-transparent to-transparent rounded-2xl flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-3.5 py-1 text-xs font-black w-fit mb-2 shadow-md">
                    <Award className="h-3.5 w-3.5" /> Verified Placement Desk
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    Direct Connections to 45+ Airport Terminals
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Delhi • Mumbai • Bangalore • Hyderabad • Kolkata • Jaipur • Ahmedabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          RECRUITMENT VERIFICATION ALERT BANNER
          ================================================== */}
      <section className="bg-secondary/10 border-y border-secondary/20 py-3.5 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-foreground font-medium">
            <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
            <span>
              <strong>Candidate Alert:</strong> Received an SMS, WhatsApp, or interview call from Indian Alliance Services?
            </span>
          </div>
          <Link
            to="/recruitment-verification"
            className="inline-flex items-center gap-1.5 font-bold text-secondary hover:underline shrink-0"
          >
            <span>Verify Official Message Here</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          AI GAN ELIGIBILITY MATCHER MODULE
          ================================================== */}
      <section id="ai-matcher" className="py-20 lg:py-24 bg-[#040711] text-white border-b border-gold/25 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            theme="dark"
            badge="AI Aviation Engine"
            title="Instant AI Candidate Matcher &"
            highlight="ATS Eligibility Evaluation"
            description="Discover your highest-compatibility airport role based on age, height reach, qualification marksheets, and English communication level."
          />

          <AIEvaluationMatcher onSelectRole={(role) => {
            setSelectedRole(role);
            setIsModalOpen(true);
          }} />
        </div>
      </section>

      {/* ==================================================
          2. WHAT WE'RE OFFERING (Specialized Aviation Guidance)
          ================================================== */}
      <section id="offerings" className="py-20 lg:py-24 bg-muted/20 border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Indian Alliance Services Ecosystem"
            title="What We're Offering —"
            highlight="Complete Aviation Career Gateway"
            description="Tailored for 10th pass, 12th pass, and graduate candidates aspiring for high-paying airline and airport roles across India."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeAreOffering.map((offering) => (
              <div
                key={offering.title}
                className="group bg-card rounded-3xl border border-border p-7 sm:p-8 hover:border-gold/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Gold Hairline Glow on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="rounded-2xl bg-gold/15 p-3.5 text-gold group-hover:bg-gold group-hover:text-slate-950 transition-colors shadow-sm">
                      <offering.icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-extrabold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/25 uppercase tracking-wider">
                      {offering.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-foreground mb-3 leading-snug group-hover:text-gold transition-colors">
                    {offering.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                    {offering.desc}
                  </p>

                  {/* Key Deliverables / Benefits */}
                  <div className="space-y-2 mb-6">
                    {offering.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-border flex items-center justify-between">
                  <Link
                    to={offering.link}
                    className="text-xs font-bold text-secondary hover:text-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenRoleModal(offering.title)}
                    className="text-xs font-bold rounded-xl border-gold/30 hover:bg-gold hover:text-slate-950 hover:border-gold transition-all"
                  >
                    Enquire Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Note */}
          <div className="max-w-4xl mx-auto mt-12 p-6 rounded-3xl bg-navy-midnight border border-gold/30 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-gold/20 text-gold shrink-0">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-gold">
                  Official Profile Assessment & Placement Guidance
                </h4>
                <p className="text-xs text-primary-foreground/80">
                  Indian Alliance Services provides complete profile eligibility review and placement preparation support.
                </p>
              </div>
            </div>

            <Button
              variant="hero"
              onClick={() => handleOpenRoleModal("General Aviation Guidance")}
              className="shrink-0 text-xs font-bold px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950"
            >
              Book Profile Review
            </Button>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. LATEST JOBS OF AVIATION (Active Hiring Drives)
          ================================================== */}
      <section id="latest-jobs" className="py-20 lg:py-24 gradient-sky border-y border-border relative">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Active Openings 2026"
            title="Latest Jobs of Aviation &"
            highlight="Airport Hiring Openings"
            description="Active vacancies across Indian airports with verified pay scales, eligibility criteria, and immediate interview scheduling."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {latestAviationJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-3xl border border-border hover:border-gold/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header (Boarding Pass Style) */}
                <div className="p-6 pb-4 border-b border-border/70 bg-gradient-to-b from-muted/40 to-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-gold bg-navy-midnight px-2.5 py-1 rounded-md border border-gold/30">
                      {job.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {job.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-foreground mb-1 group-hover:text-gold transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-secondary font-semibold">
                    {job.department}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1">
                  {/* Salary & Openings */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border/60">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Salary Scale</div>
                      <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{job.salary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Vacancies</div>
                      <div className="text-xs font-bold text-foreground font-mono">{job.openings}</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {job.desc}
                  </p>

                  {/* Eligibility & Locations */}
                  <div className="space-y-2 pt-2 border-t border-border/50 text-xs">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">Eligibility:</strong> {job.eligibility}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">Airports:</strong> {job.locations.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link to="/careers" className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-bold rounded-xl border-border hover:bg-muted"
                    >
                      View Role Guide
                    </Button>
                  </Link>
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => handleOpenRoleModal(job.roleName)}
                    className="flex-1 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-md gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/careers">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 font-bold px-8 py-5 rounded-2xl border-gold/40 text-foreground hover:bg-gold/10 hover:border-gold shadow-sm"
              >
                View All 9+ Aviation & Airport Job Openings <ArrowRight className="h-4 w-4 text-gold" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. HOW WE HELP (6 Steps Structured Roadmap)
          ================================================== */}
      <section className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <SectionHeading
            theme="dark"
            badge="Structured Roadmap"
            title="How We Help You Get"
            highlight="Airport-Ready"
            description="Our proven 6-stage counselling and placement framework takes you from initial enquiry to confident airport placement."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howWeHelpSteps.map((step) => (
              <div
                key={step.step}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-heading font-black text-secondary/60 group-hover:text-secondary transition-colors">
                    {step.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-foreground/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 bg-secondary/15 border border-secondary/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-secondary font-bold text-base">
              <ShieldCheck className="h-5 w-5" />
              <span>Ethical Guidance Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
              We maintain absolute transparency with students and parents. We provide complete placement assistance based on real merit and performance without false promises.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. WHY CHOOSE US
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  The Indian Alliance Services Advantage
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground leading-tight">
                Why Students & Parents Trust{" "}
                <span className="text-secondary">Indian Alliance Services</span>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Choosing the right career guidance partner is critical. We combine industry knowledge, honest feedback, and intensive interview preparation to ensure candidates present their strongest self.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Realistic eligibility evaluation based on industry standards</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Dedicated telephonic screening coaching & mock rounds</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Multi-city candidate support across major Indian aviation hubs</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="gap-2 font-bold px-8 shadow-md"
                >
                  <Sparkles className="h-4 w-4" /> Speak with a Senior Advisor
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {whyChoosePillars.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all"
                >
                  <div className="rounded-xl bg-primary/10 text-primary p-3 w-fit mb-4">
                    <span className="font-heading font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. OUR TEAM PREVIEW (Founder & HR)
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Our Leadership & HR Team"
            title="Guided by Aviation"
            highlight="Professionals & Mentors"
            description="Our leadership and dedicated talent acquisition team are committed to transparent, student-centered career guidance."
          />

          {/* Leadership Cards (3 Core Executive Members in Vertical Stack) */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={anthonyImg} alt="Anthony Ghospade - Founder & CEO" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Anthony Ghospade
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Founder & CEO
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Guides aspiring aviation candidates with clarity, honesty, and strategic industry vision.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={adityaImg} alt="Aditya Gujral - Assistant Manager" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Aditya Gujral
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Assistant Manager
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Coordinates counselling and candidate support to ensure a seamless placement journey.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={prashantImg} alt="P.K. Chadda - Senior Assistant Manager" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  P.K. Chadda
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Senior Assistant Manager
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Oversees operational screening pipelines and interview scheduling with standard procedures.
                </p>
              </div>
            </div>
          </div>

          {/* Senior & Lead HR Posts (Photo Cards Preview - 3 Columns) */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="text-center mb-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 mb-2">
                Senior Talent Acquisition Leads
              </span>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Senior & Lead HR Management
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ankita Singh", role: "HR Director", code: "IAS-HR-01", img: ankitaImg },
                { name: "Anamika Shinde", role: "Assistant HR Manager", code: "IAS-HR-13", img: anamikaImg, phone: "+91 8787253845" },
                { name: "Divya Sharma", role: "Senior HR Manager", code: "IAS-HR-05", img: divyaImg },
                { name: "Mrs. Padmavati", role: "Senior HR Manager", code: "IAS-HR-20", img: padmavatiImg },
                { name: "Teena Roy", role: "HR Manager", code: "IAS-HR-09", img: teenaImg },
                { name: "Alia Mirza", role: "Senior HR Executive", code: "IAS-HR-00", img: aliaImg },
              ].map((m) => (
                <div
                  key={m.name}
                  className="bg-card rounded-3xl border border-secondary/30 p-5 text-center hover:border-secondary transition-all shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-secondary/40 shadow-sm bg-muted">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                    <h4 className="font-heading font-bold text-foreground text-base truncate">{m.name}</h4>
                    <p className="text-xs font-semibold text-secondary truncate">{m.role}</p>
                    <div className="pt-1">
                      <span className="inline-block text-[10px] font-mono font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2 py-0.5 rounded-md">
                        Emp ID: {m.code}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-border/50 flex items-center justify-center text-xs">
                    {m.phone ? (
                      <a
                        href={`tel:${m.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                        title="Direct Calling Line"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{m.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <BadgeCheck className="h-3.5 w-3.5 text-secondary" /> Verified HR
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HR Team Preview */}
          <div className="max-w-5xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  HR Screening & Telecalling Directory
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Our verified telecalling coordinators conduct official candidate screening across India.
                </p>
              </div>

              <Link
                to="/about"
                className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>View Full Team Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { name: "Diksha Pawar", code: "IAS-HR-02", role: "HR Executive", image: dikshaImg },
                { name: "Komal Sharma", code: "IAS-HR-03", role: "HR Executive", image: komalImg },
                { name: "Avni Sharma", code: "IAS-HR-04", role: "HR Executive", image: avniImg },
                { name: "Priya Sharma", code: "IAS-HR-06", role: "HR Executive", image: priyaImg },
                { name: "Aditi Thakur", code: "IAS-HR-07", role: "HR Executive", image: aditiImg },
                { name: "Arpita Shinde", code: "IAS-HR-08", role: "HR Executive", image: arpitaImg },
                { name: "Preeti Sharma", code: "IAS-HR-10", role: "HR Executive", image: preetiImg },
                { name: "Prachi Sharma", code: "IAS-HR-11", role: "HR Executive", image: prachiImg },
              ].map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="bg-muted/50 rounded-xl p-3 border border-border/50 hover:bg-muted transition-colors flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-secondary/30 bg-muted shadow-sm">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-foreground truncate">{member.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 pt-4 border-t border-border/50">
              <Link to="/about">
                <Button variant="outline" size="sm" className="text-xs gap-1.5 font-semibold">
                  Read Full About Us & Leadership Profile <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. TESTIMONIALS
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Candidate Success Stories"
            title="What Our Students Say About"
            highlight="Their Experience"
            description="Read verified feedback from students who transformed their aviation aspirations into full-time airport careers."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-between hover:shadow-lg hover:border-secondary/50 transition-all duration-300"
              >
                <div>
                  <Quote className="h-8 w-8 text-secondary/30 mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-secondary/40 shadow-sm bg-muted">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                      ))}
                    </div>
                    <div className="font-heading font-bold text-foreground text-sm truncate">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-secondary font-medium truncate">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FAQ & AEO PREVIEW
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Common Questions About"
            highlight="Aviation Careers & Indian Alliance Services"
            description="Clear, factual answers to help students and parents make informed career decisions."
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {homeFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-xl border border-border px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-heading font-bold text-foreground text-sm sm:text-base hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FINAL CTA SECTION
          ================================================== */}
      <CTASection
        title="Ready to Start Your"
        highlight="Aviation Career?"
        description="Book your 1-on-1 career counselling session today. Let our experts evaluate your profile and guide you step-by-step to airport placement."
        primaryCtaText="Get Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Open Opportunities"
        secondaryCtaLink="/careers"
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultRole={selectedRole}
      />
    </>
  );
}
