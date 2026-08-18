import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-aviation.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Airport professionals walking in terminal" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-85" />
      </div>

      <div className="container relative mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Build Your Career in the{" "}
            <span className="text-secondary">Aviation Industry</span>
          </h1>

          <div className="flex items-center gap-3 text-lg sm:text-xl text-secondary font-medium mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span>Guidance</span>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>Training</span>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>Placement Support</span>
          </div>

          <p className="text-lg sm:text-xl text-primary-foreground/75 mb-6 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Airport Career Services (ACS) helps students and job seekers choose the right aviation & airport career path and supports them till successful placement in the industry.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-2 mb-8 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary-foreground/90">Expert Career Counselling Available</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a href="#contact">
              <Button variant="hero" size="lg" className="text-base gap-2 px-8">
                Apply Now <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="hero-outline" size="lg" className="text-base gap-2 px-8">
                <Phone className="h-5 w-5" /> Book Counselling Session
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
