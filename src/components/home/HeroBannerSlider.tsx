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

import slider1AirhostessImg from "@/assets/slider-1-airhostess.jpg";
import slider2CrewTalkingImg from "@/assets/slider-2-crew-talking.jpg";
import slider3FlyPlaneImg from "@/assets/slider-3-fly-plane.jpg";

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
  pills: { text: string; highlight?: boolean }[];
  primaryCtaText: string;
  primaryCtaRole: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    badge: "Premier Aviation Career & Airport Training Gateway",
    titlePrefix: "Become An Airport ",
    titleHighlight: "Air Hostess & Ground Executive",
    subtitle:
      "Start your journey at premier international airport terminals. 1-on-1 profile evaluation, IATA-compliant grooming standards, airline mock interviews, and direct walk-in drive scheduling across India.",
    image: slider1AirhostessImg,
    imageAlt: "Air hostess in professional airline uniform standing at airport terminal",
    pills: [
      { text: "Est. 2015 (10+ Years Excellence)", highlight: true },
      { text: "10th / 12th Pass Eligible" },
      { text: "Airline GD & Grooming" },
      { text: "Direct Walk-in Drives" },
    ],
    primaryCtaText: "Get Career Counselling",
    primaryCtaRole: "Air Hostess Guidance",
    secondaryCtaText: "Explore Job Openings",
    secondaryCtaLink: "/careers",
  },
  {
    id: 2,
    badge: "Join Vibrant Airline Teams & Airport Staff",
    titlePrefix: "Work With Leading ",
    titleHighlight: "Airline Crew & Airport Staff",
    subtitle:
      "Be part of an energetic, welcoming aviation team. Master Departure Control Systems (DCS), boarding gate announcements, passenger check-in desks, and world-class customer hospitality.",
    image: slider2CrewTalkingImg,
    imageAlt: "Airline crew members smiling and talking together in uniform",
    pills: [
      { text: "12th Pass & Graduates Eligible", highlight: true },
      { text: "Salary ₹24,000 – ₹48,000/mo" },
      { text: "Positive Work Culture" },
      { text: "Pan-India Metro Airports" },
    ],
    primaryCtaText: "Apply for Ground Staff",
    primaryCtaRole: "Airport Ground Staff (AGS)",
    secondaryCtaText: "Explore Staff Openings",
    secondaryCtaLink: "/careers",
  },
  {
    id: 3,
    badge: "Commercial Aviation Fleet & Flight Operations",
    titlePrefix: "Fly High Across ",
    titleHighlight: "Domestic & Global Skies",
    subtitle:
      "Soar to new heights with India's fastest-growing airline fleets. Comprehensive in-flight hospitality grooming, aircraft safety drills, and direct walk-in interview preparation for premier carriers.",
    image: slider3FlyPlaneImg,
    imageAlt: "Commercial passenger aircraft flying high in blue sky above clouds",
    pills: [
      { text: "Fly Domestic & International", highlight: true },
      { text: "Salary ₹45,000 – ₹95,000/mo" },
      { text: "World-Class Training" },
      { text: "100% Free Registration" },
    ],
    primaryCtaText: "Apply for Cabin Crew",
    primaryCtaRole: "Cabin Crew",
    secondaryCtaText: "View Interview & GD Tips",
    secondaryCtaLink: "/interview-tips",
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
      className="relative w-full h-[620px] sm:h-[660px] lg:h-[720px] flex items-center justify-center overflow-hidden bg-navy-midnight text-primary-foreground select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Bleed Background Slider Images (100% Full Screen) */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Balanced Luxury Cinematic Gradient Overlays (Preserving Photo Vibrancy & Text Clarity) */}
      <div className="absolute inset-0 bg-slate-950/45 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50 z-0" />

      {/* Left & Right Edge Floating Navigation Chevrons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-navy-midnight/80 hover:bg-gold border border-gold/40 text-gold hover:text-slate-950 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 z-30 cursor-pointer pointer-events-auto hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-navy-midnight/80 hover:bg-gold border border-gold/40 text-gold hover:text-slate-950 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 z-30 cursor-pointer pointer-events-auto hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 stroke-[2.5]" />
      </button>

      {/* Main Centered Hero Content (First Fold) */}
      <div className="container relative mx-auto px-4 sm:px-12 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Top Slide Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-midnight/90 border border-gold/40 px-4 py-1.5 backdrop-blur-md shadow-lg mx-auto">
            <Sparkles className="h-4 w-4 text-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wide text-gold uppercase">
              {current.badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-white leading-tight tracking-tight min-h-[75px] sm:min-h-[90px] transition-all duration-300">
            {current.titlePrefix}
            <span className="gold-gradient-text">{current.titleHighlight}</span>
            {current.titleSuffix || ""}
          </h1>

          {/* Value Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold">
            {current.pills.map((pill, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border backdrop-blur-md ${
                  pill.highlight
                    ? "bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm"
                    : "bg-navy-midnight/70 text-gold border-gold/30"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                {pill.text}
              </span>
            ))}
          </div>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm">
            {current.subtitle}
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Button
              variant="hero"
              size="lg"
              onClick={() => onOpenEnquiry(current.primaryCtaRole)}
              className="text-sm sm:text-base font-extrabold gap-2 px-7 sm:px-9 py-5 sm:py-6 rounded-2xl shadow-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              {current.primaryCtaText}
            </Button>

            <Link to={current.secondaryCtaLink}>
              <Button
                variant="hero-outline"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-bold gap-2 px-7 sm:px-8 py-5 sm:py-6 rounded-2xl border-gold/40 text-gold hover:bg-gold/15 hover:border-gold cursor-pointer backdrop-blur-sm"
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                {current.secondaryCtaText}
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
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
      </div>

      {/* Sleek Minimalist Progress Indicator (With High Click Hit Area) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className="p-2.5 focus:outline-none cursor-pointer group"
          >
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentSlide
                  ? "w-9 bg-gradient-to-r from-amber-400 to-yellow-400 shadow-lg shadow-amber-500/60"
                  : "w-2.5 bg-white/40 group-hover:bg-white/75"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
