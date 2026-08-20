import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  Plane,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroAviationImg from "@/assets/hero-aviation.jpg";
import heroAirportImg from "@/assets/hero-airport.jpg";
import cabinCrewImg from "@/assets/cabin-crew-training.jpg";
import groundServicesImg from "@/assets/ground-services.jpg";

interface HeroBannerSliderProps {
  onOpenEnquiry: (role?: string) => void;
  statHubs?: string;
  statStudents?: string;
  statPlacementRate?: string;
}

export interface BannerSlide {
  id: number;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  pills: { icon?: any; text: string; highlight?: boolean }[];
  stats: { label: string; value: string; color?: string }[];
  primaryCtaText: string;
  primaryCtaRole: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  secondaryCtaIsAnchor?: boolean;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    badge: "AI-Powered Aviation Career Gateway",
    titlePrefix: "Launch Your Dream Career in ",
    titleHighlight: "Aviation & Airlines",
    subtitle:
      "India's next-generation career advisory and airport opportunity portal. Verified eligibility matching, IATA-compliant grooming, and direct walk-in interview scheduling.",
    image: heroAviationImg,
    imageAlt: "Airport terminal operations and airline crew",
    pills: [
      { text: "Est. 2015 (10+ Years Excellence)", highlight: true },
      { text: "Direct Eligibility Match" },
      { text: "Airline GD & Grooming" },
      { text: "Direct Walk-in Drives" },
    ],
    stats: [
      { label: "Airport Hubs", value: "45+" },
      { label: "Students Guided", value: "12,500+", color: "text-emerald-400" },
      { label: "Opportunity Rate", value: "98.4%" },
    ],
    primaryCtaText: "Get Career Counselling",
    primaryCtaRole: "General Aviation Career",
    secondaryCtaText: "Run AI Eligibility Matcher",
    secondaryCtaLink: "#ai-matcher",
    secondaryCtaIsAnchor: true,
  },
  {
    id: 2,
    badge: "Terminal & Passenger Operations",
    titlePrefix: "Become an Airport ",
    titleHighlight: "Ground Staff & CSA",
    titleSuffix: " Executive",
    subtitle:
      "High-demand 10+2 & Graduate airport careers across metro terminals. Master Departure Control Systems (DCS), boarding gate announcements, check-in, and passenger hospitality.",
    image: heroAirportImg,
    imageAlt: "Aviation professionals and ground crew in airport terminal",
    pills: [
      { text: "12th Pass & Graduates Eligible", highlight: true },
      { text: "Salary ₹24,000 – ₹42,000/mo" },
      { text: "Boarding & Check-in Desk" },
      { text: "Metro & Regional Hubs" },
    ],
    stats: [
      { label: "Active Openings", value: "80+" },
      { label: "Avg Salary", value: "₹3.5–5.2 LPA", color: "text-emerald-400" },
      { label: "Freshers Band", value: "18–28 Yrs" },
    ],
    primaryCtaText: "Apply for Ground Staff",
    primaryCtaRole: "Airport Ground Staff (AGS)",
    secondaryCtaText: "Explore Ground Staff Guide",
    secondaryCtaLink: "/careers",
  },
  {
    id: 3,
    badge: "In-Flight Hospitality & Safety",
    titlePrefix: "Fly High as Certified ",
    titleHighlight: "Cabin Crew & Air Hostess",
    subtitle:
      "Comprehensive in-flight grooming, emergency evacuation simulation, passenger hospitality etiquette, and airline interview GD drills for premier domestic and international fleets.",
    image: cabinCrewImg,
    imageAlt: "Cabin crew training and in-flight hospitality team",
    pills: [
      { text: "DGCA Airline Standards", highlight: true },
      { text: "Salary ₹45,000 – ₹95,000/mo" },
      { text: "Mock Evacuation Drills" },
      { text: "International Flight Routes" },
    ],
    stats: [
      { label: "Min Height", value: "155cm F / 170cm M" },
      { label: "Top Salary", value: "₹95,000+", color: "text-emerald-400" },
      { label: "Walk-In Drives", value: "Pan-India" },
    ],
    primaryCtaText: "Apply for Cabin Crew",
    primaryCtaRole: "Cabin Crew",
    secondaryCtaText: "View Interview & GD Tips",
    secondaryCtaLink: "/interview-tips",
  },
  {
    id: 4,
    badge: "Air Cargo & Ramp Logistics",
    titlePrefix: "Fast-Track Career in ",
    titleHighlight: "Air Cargo & Ramp Operations",
    subtitle:
      "Rapidly growing airfreight corridors across India. Specialized training on Dangerous Goods (DGR), Airway Bills (AWB), baggage reconciliation systems, and airside tarmac safety.",
    image: groundServicesImg,
    imageAlt: "Airport tarmac ground services and air cargo handlers",
    pills: [
      { text: "10th / 12th Pass Welcome", highlight: true },
      { text: "Salary ₹20,000 – ₹35,000/mo" },
      { text: "Ramp Safety & Marshalling" },
      { text: "100% Anti-Fraud Policy" },
    ],
    stats: [
      { label: "Cargo Hubs", value: "35+ Active" },
      { label: "Immediate Hiring", value: "50+ Openings", color: "text-emerald-400" },
      { label: "Zero Donation", value: "100% Guaranteed" },
    ],
    primaryCtaText: "Apply for Cargo Operations",
    primaryCtaRole: "Air Cargo Handling",
    secondaryCtaText: "View Recruitment Notices",
    secondaryCtaLink: "/notifications",
  },
];

export default function HeroBannerSlider({
  onOpenEnquiry,
  statHubs = "45+",
  statStudents = "12,500+",
  statPlacementRate = "98.4%",
}: HeroBannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<any>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, nextSlide, currentSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const current = slides[currentSlide] || slides[0];

  return (
    <section
      id="home"
      aria-label="Aviation Career Highlights & Banner Slider"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-midnight text-primary-foreground select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images for All Slides (Preloaded & Faded) */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-35 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Global Luxury Radial Overlays & Darkness */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/90 to-navy-dark/95 z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Slide Content Container */}
      <div className="container relative mx-auto px-4 py-16 sm:py-20 lg:py-24 z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Slide Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Slide Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark/90 border border-gold/40 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <Sparkles className="h-4 w-4 text-gold animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-wide text-gold uppercase">
                {current.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-white leading-tight tracking-tight min-h-[90px] sm:min-h-[120px] transition-all duration-300">
              {current.titlePrefix}
              <span className="gold-gradient-text">{current.titleHighlight}</span>
              {current.titleSuffix || ""}
            </h1>

            {/* Value Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold">
              {current.pills.map((pill, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                    pill.highlight
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-gold/10 text-gold border-gold/30"
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {pill.text}
                </span>
              ))}
            </div>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              {current.subtitle}
            </p>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-1 pb-1">
              {current.stats.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1220]/80 border border-gold/30 rounded-2xl p-3 text-center backdrop-blur-md shadow-md"
                >
                  <div className={`text-xl sm:text-2xl font-mono font-black ${st.color || "text-gold"}`}>
                    {st.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300 font-semibold uppercase mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hero Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                variant="hero"
                size="lg"
                onClick={() => onOpenEnquiry(current.primaryCtaRole)}
                className="text-sm sm:text-base font-extrabold gap-2 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl shadow-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 transition-all hover:scale-105 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                {current.primaryCtaText}
              </Button>

              {current.secondaryCtaIsAnchor ? (
                <a href={current.secondaryCtaLink}>
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base font-bold gap-2 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border-gold/40 text-gold hover:bg-gold/10 hover:border-gold cursor-pointer"
                  >
                    <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                    {current.secondaryCtaText}
                  </Button>
                </a>
              ) : (
                <Link to={current.secondaryCtaLink}>
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base font-bold gap-2 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border-gold/40 text-gold hover:bg-gold/10 hover:border-gold cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                    {current.secondaryCtaText}
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-gold font-bold">
                <Award className="h-4 w-4 text-gold" />
                <span>IATA & NSDC Standards</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Anti-Fraud Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                <span>Direct Walk-in Verification</span>
              </div>
            </div>
          </div>

          {/* Right Column: Slide Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold/40 shadow-2xl bg-[#080d1a] p-3 group">
              <div className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden">
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  className="rounded-2xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-3 py-1 text-xs font-black w-fit mb-2 shadow-md">
                    <Award className="h-3.5 w-3.5" /> Verified Opportunity Desk
                  </div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                    Direct Connections to 45+ Airport Terminals
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Delhi • Mumbai • Bangalore • Hyderabad • Kolkata • Jaipur • Ahmedabad
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Slide Counter Badge */}
            <div className="absolute -top-3 -right-2 bg-navy-dark border border-gold/50 rounded-full px-3 py-1 text-xs font-mono font-black text-gold shadow-lg">
              0{currentSlide + 1} / 0{slides.length}
            </div>
          </div>
        </div>

        {/* Slide Controls & Carousel Indicators Bar */}
        <div className="mt-10 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slide Tab Buttons (4 Slide Selectors) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                  idx === currentSlide
                    ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-gold text-gold shadow-md"
                    : "bg-[#0b1220]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${idx === currentSlide ? "bg-gold animate-pulse" : "bg-slate-600"}`} />
                <span className="truncate">
                  0{idx + 1}. {idx === 0 ? "Aviation Overview" : idx === 1 ? "Ground Staff" : idx === 2 ? "Cabin Crew" : "Air Cargo"}
                </span>
              </button>
            ))}
          </div>

          {/* Left / Right Arrow Buttons & Pause/Play Indicator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
              className="p-2 rounded-xl bg-navy-dark border border-slate-700 text-slate-400 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-2.5 rounded-xl bg-navy-dark border border-gold/30 text-gold hover:bg-gold hover:text-slate-950 hover:border-gold transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-2.5 rounded-xl bg-navy-dark border border-gold/30 text-gold hover:bg-gold hover:text-slate-950 hover:border-gold transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
