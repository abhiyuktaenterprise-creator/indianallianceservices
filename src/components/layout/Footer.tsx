import { Link } from "react-router-dom";
import {
  Plane,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-navy text-primary-foreground border-t border-primary-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Trust & Verification Banner */}
        <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 sm:p-8 mb-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-secondary/20 p-3 text-secondary shrink-0">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-lg font-heading font-bold text-primary-foreground">
                    Received a Recruitment Message from Airport Career Services?
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/25 text-amber-300 px-2 py-0.5 font-bold text-[11px] border border-amber-500/30">
                    <Award className="h-3 w-3" /> NHDC Certified Standards
                  </span>
                </div>
                <p className="text-sm text-primary-foreground/75 mt-1 max-w-2xl">
                  Protect yourself against impersonators. Verify interview calls, official emails, and candidate requirements directly through our verified portal.
                </p>
              </div>
            </div>

            <Link
              to="/recruitment-verification"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground px-5 py-3 text-sm font-semibold shadow-md transition-all shrink-0"
            >
              <ShieldCheck className="h-4 w-4" /> Verify Recruitment Message
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="rounded-lg bg-secondary p-2 text-white">
                <Plane className="h-5 w-5" />
              </div>
              <span className="text-xl font-heading font-bold text-primary-foreground">
                Airport Career Services
              </span>
            </Link>

            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm">
              India's dedicated aviation career counselling, training guidance, and placement consultancy. Guiding aspiring candidates step-by-step toward rewarding airport and airline careers.
            </p>

            <div className="space-y-2 pt-2 text-xs text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>Ethical & Transparent Career Counselling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>Structured Profile & Eligibility Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>End-to-End Interview Preparation</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-primary-foreground text-base tracking-wide border-b border-primary-foreground/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  About Us & Leadership
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Aviation Careers & Jobs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/recruitment-verification" className="text-secondary font-medium hover:underline transition-colors flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Recruitment Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Aviation Career Paths */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-primary-foreground text-base tracking-wide border-b border-primary-foreground/10 pb-2">
              Aviation Careers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/careers#ground-staff" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Airport Ground Staff
                </Link>
              </li>
              <li>
                <Link to="/careers#customer-service" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Customer Service Executive
                </Link>
              </li>
              <li>
                <Link to="/careers#cabin-crew" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Cabin Crew Guidance
                </Link>
              </li>
              <li>
                <Link to="/careers#operations" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Airport Operations
                </Link>
              </li>
              <li>
                <Link to="/careers#cargo" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Cargo & Baggage Handling
                </Link>
              </li>
              <li>
                <Link to="/careers#support-staff" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Airline Support Staff
                </Link>
              </li>
              <li>
                <Link to="/careers#telecalling-job" className="text-primary-foreground/70 hover:text-secondary transition-colors font-medium">
                  HR & Telecalling Executive (Open)
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-primary-foreground text-base tracking-wide border-b border-primary-foreground/10 pb-2">
              Verified Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-primary-foreground/80">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href="tel:+917851836860" className="font-semibold text-primary-foreground hover:text-secondary transition-colors">
                  +91 7851836860
                </a>
              </div>

              <a
                href="mailto:infor.airportcareerservices@gmail.com"
                className="flex items-start gap-2.5 text-primary-foreground/80 hover:text-secondary transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-secondary shrink-0 mt-1" />
                <span>infor.airportcareerservices@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-primary-foreground/75">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-1" />
                <span className="leading-snug">
                  Mumbai / Navi Mumbai • Delhi NCR • Madhya Pradesh • Andhra Pradesh • Gujarat
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-primary-foreground/75 text-xs pt-1">
                <Clock className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span>Mon – Sat: 9:30 AM – 6:30 PM (By Appt Only)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Locations Footer Banner */}
        <div className="border-t border-primary-foreground/10 py-6 text-xs text-primary-foreground/65">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-primary-foreground/90 font-semibold">Our Office Locations:</strong>{" "}
              Mumbai / Navi Mumbai • Delhi NCR • Madhya Pradesh • Andhra Pradesh • Gujarat
            </div>
            <Link
              to="/contact"
              className="text-secondary hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>View Verified Office Addresses</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50 text-center md:text-left">
          <p>
            © 2026 Airport Career Services (ACS). All rights reserved. Aviation Career Counselling & Guidance Consultancy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/about" className="hover:text-secondary transition-colors">
              About
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-secondary transition-colors">
              Services
            </Link>
            <span>•</span>
            <Link to="/careers" className="hover:text-secondary transition-colors">
              Careers
            </Link>
            <span>•</span>
            <Link to="/recruitment-verification" className="hover:text-secondary transition-colors">
              Recruitment Verification
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
