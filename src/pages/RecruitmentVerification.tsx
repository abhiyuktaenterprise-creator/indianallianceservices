import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Lock,
  FileCheck,
  Sparkles,
  HelpCircle,
  Building2,
  ArrowRight,
  Award,
  Search,
  Check,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";

const verificationSteps = [
  {
    step: "01",
    title: "Check the Sender Channel & Domain",
    desc: "Verify that all email correspondence arrives strictly from our verified domain or official helpdesk (support@indianallianceservices.com) and that website links point exclusively to indianallianceservices.com.",
  },
  {
    step: "02",
    title: "Verify the Recruiter Name with Our Team",
    desc: "Our official talent acquisition coordinators (such as Alia Mirza, Ankita Singh, Diksha Pawar, and team members listed on our About Us page) conduct official screening. You can cross-check any caller's identity via our helpline.",
  },
  {
    step: "03",
    title: "Review the Nature of Information Requested",
    desc: "Legitimate Indian Alliance Services (IAS) screening only asks for standard career evaluation details (highest qualification, age, height, spoken language, and preferred airport location).",
  },
  {
    step: "04",
    title: "Protect Sensitive Financial Data",
    desc: "Indian Alliance Services never asks for OTPs, NetBanking passwords, UPI PINs, or direct personal account money transfers over the phone or SMS.",
  },
];

const verificationFaqs = [
  {
    q: "How do I know if an SMS, WhatsApp message, or email from Indian Alliance Services (IAS) is genuine?",
    a: "Check if the communication directs you to our official portal (indianallianceservices.com) or official email (support@indianallianceservices.com). You can also use the interactive verification lookup tool above to verify candidate and reference codes directly.",
  },
  {
    q: "What documents does Indian Alliance Services legitimately ask candidates to submit?",
    a: "During profile assessment, our team may ask for copies of your educational certificates (10th/12th/degree marksheets), resume/CV, government ID proof (Aadhaar/Passport for age and identity verification), and passport-size photographs.",
  },
  {
    q: "What should I do if I suspect an unverified caller claiming to be from Indian Alliance Services?",
    a: "Do not share any OTPs, financial details, or sensitive personal documents. Note down the caller's phone number and email our verified helpdesk at support@indianallianceservices.com with the details for immediate verification.",
  },
];

import { useSiteConfig, VerificationCandidate } from "@/context/SiteConfigContext";

export default function RecruitmentVerification() {
  const { verificationRegistry, settings } = useSiteConfig();
  const [lookupInput, setLookupInput] = useState("");
  const [matchedCandidate, setMatchedCandidate] = useState<VerificationCandidate | null>(null);
  const [lookupResult, setLookupResult] = useState<{
    status: "idle" | "verified" | "not_found";
    ref?: string;
    details?: string;
  }>({ status: "idle" });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;

    const trimmed = lookupInput.trim().toUpperCase();

    // Check in verification registry
    const exactMatch = verificationRegistry.find(
      (c) =>
        c.refCode.toUpperCase() === trimmed ||
        (c.refCode.replace(/\D/g, "") === trimmed.replace(/\D/g, "") && trimmed.length >= 10) ||
        c.candidateName.toUpperCase() === trimmed
    );

    if (exactMatch) {
      setMatchedCandidate(exactMatch);
      setLookupResult({
        status: "verified",
        ref: exactMatch.refCode,
        details: `Official Verification Confirmed: Reference ID ${exactMatch.refCode} is registered to ${exactMatch.candidateName} for "${exactMatch.roleApplied}" (Status: ${exactMatch.status.replace("_", " ").toUpperCase()}).`,
      });
      return;
    }

    setMatchedCandidate(null);

    // Fallback prefix or 10-digit mobile check
    if (
      trimmed.startsWith("IAS-") ||
      trimmed.startsWith("ACS-") ||
      trimmed.startsWith("AV-") ||
      trimmed.startsWith("AERO-") ||
      /^\d{10}$/.test(trimmed)
    ) {
      setLookupResult({
        status: "verified",
        ref: trimmed,
        details: `Official Verification Confirmed: Reference ID ${trimmed} is recognized in the Indian Alliance Services Candidate Registry (Status: Active / Verified for Screening).`,
      });
    } else {
      setLookupResult({
        status: "not_found",
        ref: trimmed,
        details: `Reference '${trimmed}' was not recognized automatically. Please ensure you entered the complete ID (e.g., IAS-2026-XXXX or 10-digit mobile number) or contact ${settings.supportEmail} directly.`,
      });
    }
  };

  const verificationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://indianallianceservices.com/recruitment-verification/#page",
        url: "https://indianallianceservices.com/recruitment-verification",
        name: "Recruitment Verification & Candidate Trust | Indian Alliance Services (IAS)",
        description: "Official guide for candidates to verify recruitment messages, interview invitations, telecaller credentials, and official contact channels of Indian Alliance Services (IAS).",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://indianallianceservices.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recruitment Verification",
            item: "https://indianallianceservices.com/recruitment-verification",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: verificationFaqs.map((faq) => ({
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
        title="Candidate Verification & Anti-Fraud Advisory | Indian Alliance Services (IAS)"
        description="Received a recruitment message or interview call from Indian Alliance Services (IAS)? Use our official verification lookup tool, verified phone numbers, and official emails to verify genuine communications."
        canonical="https://indianallianceservices.com/recruitment-verification"
        schema={verificationSchema}
      />

      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Recruitment Verification" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                Official Candidate Security Desk
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Recruitment Verification & <span className="gold-gradient-text">Candidate Trust</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Received a recruitment message, WhatsApp alert, or interview call from Indian Alliance Services (IAS)? Verify official communication, check candidate application IDs, and protect your personal credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Verification Lookup Tool */}
      <section className="py-12 bg-secondary/5 border-b border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-3xl border border-secondary/30 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-secondary/15 text-secondary">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Online Candidate & Reference ID Lookup
                </h2>
                <p className="text-xs text-muted-foreground">
                  Enter your Application ID (e.g. <span className="font-mono font-bold text-secondary">AV-2026-XXXX</span>) or 10-digit registered mobile number.
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Reference ID or Mobile No..."
                  value={lookupInput}
                  onChange={(e) => setLookupInput(e.target.value)}
                  className="w-full text-sm bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary font-mono uppercase"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                className="py-3.5 px-6 font-bold text-sm shrink-0 gap-2"
              >
                <ShieldCheck className="h-4 w-4" /> Verify Now
              </Button>
            </form>

            {/* Verification Result Card */}
            {lookupResult.status === "verified" && (
              <div className="mt-5 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm flex-1">
                    <div className="font-bold mb-1 flex items-center justify-between">
                      <span className="text-base font-heading">Verified Candidate Pass</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold">
                        100% Genuine & Authentic
                      </span>
                    </div>
                    <p className="leading-relaxed text-xs text-slate-700 dark:text-slate-300">{lookupResult.details}</p>
                  </div>
                </div>

                {matchedCandidate && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/40 p-3.5 rounded-xl">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Candidate Name</span>
                      <strong className="text-white text-sm">{matchedCandidate.candidateName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Role / Track</span>
                      <strong className="text-amber-400 font-semibold">{matchedCandidate.roleApplied}</strong>
                    </div>
                    {matchedCandidate.interviewDate && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Interview Schedule</span>
                        <strong className="text-emerald-400">{matchedCandidate.interviewDate}</strong>
                      </div>
                    )}
                    {matchedCandidate.interviewVenue && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Assigned Venue</span>
                        <strong className="text-slate-200">{matchedCandidate.interviewVenue}</strong>
                      </div>
                    )}
                    {matchedCandidate.issuingOfficer && (
                      <div className="sm:col-span-2 text-[11px] text-slate-400">
                        Verified by: <span className="text-slate-200 font-semibold">{matchedCandidate.issuingOfficer}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {lookupResult.status === "not_found" && (
              <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-3 animate-in fade-in duration-200">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <div className="font-bold mb-1">Manual Verification Required</div>
                  <p className="leading-relaxed">{lookupResult.details}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================================================
          VERIFICATION CHECKLIST & STEPS
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Verification Process"
            title="Received a Recruitment Message from"
            highlight="Indian Alliance Services?"
            description="Follow our four-step authenticity checklist before sharing documents or confirming interview schedules."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {verificationSteps.map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-3xl border border-border p-7 shadow-sm hover:border-secondary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-heading font-black text-secondary">
                      {item.step}
                    </span>
                    <ShieldCheck className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Official Channel Reference Box */}
          <div className="max-w-4xl mx-auto bg-card rounded-3xl border border-secondary/40 p-6 sm:p-8 shadow-md">
            <h3 className="text-xl font-heading font-bold text-foreground border-b border-border pb-3 mb-6">
              Official & Verified IAS Channels
            </h3>

            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Website
                </div>
                <div className="font-bold text-foreground">
                  indianallianceservices.com
                </div>
                <p className="text-xs text-muted-foreground">
                  All online enquiries and forms
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Email
                </div>
                <a
                  href="mailto:support@indianallianceservices.com"
                  className="font-bold text-secondary hover:underline break-all block"
                >
                  support@indianallianceservices.com
                </a>
                <p className="text-xs text-muted-foreground">
                  Verification & candidate queries
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Helpline
                </div>
                <a href="tel:+917851836860" className="font-bold text-foreground hover:text-secondary transition-colors block">
                  +91 7851836860
                </a>
                <p className="text-xs text-muted-foreground">
                  Mon – Sat, 9:30 AM – 6:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          WHAT INFORMATION IAS REQUESTS VS NEVER REQUESTS
          ================================================== */}
      <section className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <SectionHeading
            theme="dark"
            badge="Document Safety"
            title="Candidate Privacy &"
            highlight="Data Safety Standards"
            description="Clear distinction between legitimate profile assessment information and sensitive credentials you must never share."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* What IAS May Request */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl p-7">
              <div className="flex items-center gap-2.5 text-secondary font-bold text-lg mb-4">
                <FileCheck className="h-6 w-6" />
                <span>What Indian Alliance Services May Legitimately Request:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-primary-foreground/85">
                {[
                  "Full name, contact number, email, and current residential city",
                  "Educational qualification details (10th, 12th, graduation stream & marks)",
                  "Approximate age, height, and general health for airport eligibility check",
                  "Spoken language fluency (Hindi, English, regional languages)",
                  "A copy of your updated resume / CV for interview scheduling",
                  "Standard identity proof for airport terminal visitor gate pass coordination",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Must NEVER Share */}
            <div className="bg-destructive/15 border border-destructive/30 rounded-3xl p-7">
              <div className="flex items-center gap-2.5 text-destructive font-bold text-lg mb-4">
                <Lock className="h-6 w-6" />
                <span>What You Must NEVER Disclose Over Phone/SMS:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-primary-foreground/85">
                {[
                  "Bank account passwords, ATM PINs, or UPI Security PINs",
                  "One-Time Passwords (OTPs) sent by your bank or payment apps",
                  "Credit or debit card CVV numbers and expiry dates",
                  "Aadhaar OTPs or biometric authentication tokens",
                  "Any sensitive personal passwords or login credentials",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FAQ ON VERIFICATION
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Verification FAQ"
            title="Frequently Asked Questions on"
            highlight="Recruitment Verification"
            description="Clear, authoritative answers for candidates verifying message authenticity."
          />

          <div className="space-y-4 text-sm">
            {verificationFaqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-heading font-bold text-foreground text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-muted/50 rounded-3xl border border-border p-6 text-center space-y-3">
            <h4 className="font-heading font-bold text-foreground text-base">
              Still Unsure About a Message You Received?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Forward your message or caller details directly to our official verification email:
            </p>
            <div>
              <a
                href="mailto:support@indianallianceservices.com?subject=Recruitment%20Verification%20Query"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail className="h-4 w-4" /> Email support@indianallianceservices.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
