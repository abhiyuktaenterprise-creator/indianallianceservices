import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Plane,
  CheckCircle2,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Footer() {
  const { settings } = useSiteConfig();

  return (
    <footer className="bg-[#FAF7F2] text-slate-800 border-t border-gold/40 relative z-10">
      {/* Golden Aviation Top Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

      {/* Safety Alert Header Banner */}
      <div className="bg-[#f0e8dc] border-b border-gold/30 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-600/15 p-2 text-amber-800 shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading font-black text-amber-900 text-sm block">
                Official Candidate Advisory & Anti-Fraud Notice
              </span>
              <p className="text-xs text-slate-700 leading-snug">
                Indian Alliance Services does not solicit cash payments, personal WhatsApp transfers, or processing fees. Always verify official notifications.
              </p>
            </div>
          </div>
          <Link
            to="/recruitment-verification"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm shrink-0"
          >
            <ShieldCheck className="h-4 w-4" /> Verify Reference ID
          </Link>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="container mx-auto px-4 py-14 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/logo.png?v=ias2026"
                alt="Indian Alliance Services"
                className="h-20 sm:h-26 lg:h-32 w-auto max-w-[380px] sm:max-w-[480px] object-contain"
              />
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm font-normal">
              India's premier AI-powered aviation career advisory, training coaching, and airport opportunity gateway. Guiding 10th, 12th pass, and graduate candidates toward rewarding airline careers.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-gold/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                </div>
                <span>Ethical & Transparent Career Advisory</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-gold/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                </div>
                <span>Pan-India Airport & Airline Opportunities</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-gold/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                </div>
                <span>Personalized Interview Preparation & Mock GD Screening</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-black text-[#0a1128] text-base tracking-wider uppercase border-b-2 border-gold/40 pb-2.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" /> Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>About Us & Leadership</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Our 6 Core Services</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Latest Aviation Jobs</span>
                </Link>
              </li>
              <li>
                <Link to="/interview-tips" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Interview & GD Tips</span>
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Recruitment Notices</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Contact Our Team</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs & Roles */}
          <div className="space-y-4">
            <h4 className="font-heading font-black text-[#0a1128] text-base tracking-wider uppercase border-b-2 border-gold/40 pb-2.5 flex items-center gap-2">
              <Plane className="h-4 w-4 text-amber-600" /> Career Paths
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/careers#ags" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Airport Ground Staff</span>
                </Link>
              </li>
              <li>
                <Link to="/careers#csa" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Customer Service (CSA)</span>
                </Link>
              </li>
              <li>
                <Link to="/careers#cabin-crew" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Cabin Crew Guidance</span>
                </Link>
              </li>
              <li>
                <Link to="/careers#airhostess" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Airhostess Training</span>
                </Link>
              </li>
              <li>
                <Link to="/careers#gsa" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Ground Service (Ramp)</span>
                </Link>
              </li>
              <li>
                <Link to="/careers#cargo-logistics" className="text-slate-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-1.5 group">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  <span>Air Cargo Logistics</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-black text-[#0a1128] text-base tracking-wider uppercase border-b-2 border-gold/40 pb-2.5 flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-600" /> Helpdesk & Bureau
            </h4>
            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-2xl bg-white border border-gold/40 shadow-sm">
                <div className="text-[11px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                  Candidate Advisory Line
                </div>
                <a
                  href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
                  className="font-mono font-black text-[#0a1128] hover:text-amber-700 transition-colors text-lg flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-amber-600 shrink-0" /> {settings.helplinePhone}
                </a>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <Mail className="h-4 w-4 text-amber-600 shrink-0 mt-1" />
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="text-slate-700 hover:text-amber-700 transition-colors break-all text-xs font-semibold"
                >
                  {settings.supportEmail}
                </a>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-1" />
                <span className="leading-snug text-xs text-slate-600">
                  {settings.displayAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-amber-800 font-semibold pt-1">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer & Copyright Bar */}
      <div className="bg-[#f3eee6] border-t border-gold/30 py-5 px-4">
        <div className="container mx-auto text-xs text-slate-600 text-center">
          <p className="font-normal">
            © 2026 Indian Alliance Services. All rights reserved. Aviation Careers & Training — India's Premier Aviation Career Advisory & Opportunity Portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
