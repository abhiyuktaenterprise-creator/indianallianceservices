import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showBadges?: boolean;
}

export default function CTASection({
  title = "Ready to Start Your Aviation Career?",
  highlight = "Get Started Today",
  description = "Join hundreds of students who achieved their dream airport and airline careers with structured guidance, interview coaching, and transparent opportunity assistance.",
  primaryCtaText = "Apply for Career Counselling",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Explore Career Opportunities",
  secondaryCtaLink = "/careers",
  showBadges = true,
}: CTASectionProps) {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-navy-midnight text-white border-t border-gold/20">
      {/* Background radial gold glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1.5 mb-6 shadow-md">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-gold">
              Premier Aviation Career Guidance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight mb-6">
            {title} <span className="gold-gradient-text">{highlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link to={primaryCtaLink} className="w-full sm:w-auto">
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto text-base gap-2 px-8 py-6 rounded-2xl shadow-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold"
              >
                {primaryCtaText} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <Link to={secondaryCtaLink} className="w-full sm:w-auto">
              <Button
                variant="hero-outline"
                size="lg"
                className="w-full sm:w-auto text-base font-bold gap-2 px-8 py-6 rounded-2xl border-gold/40 text-gold hover:bg-gold/10 hover:border-gold"
              >
                <PhoneCall className="h-4 w-4" /> {secondaryCtaText}
              </Button>
            </Link>
          </div>

          {showBadges && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-primary-foreground/10 text-xs sm:text-sm text-primary-foreground/80">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Eligibility & Profile Assessment</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span>Ethical & Transparent Process</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Mock Interview & Resume Coaching</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
