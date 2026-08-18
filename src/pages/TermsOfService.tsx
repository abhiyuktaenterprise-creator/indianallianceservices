import React from "react";
import { Link } from "react-router-dom";
import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Mail } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TermsOfService() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Terms of Service & Candidate Agreement | Indian Alliance Services",
        description: "Official terms and conditions governing the use of Indian Alliance Services aviation counselling, training advisory, and opportunity assistance.",
        url: "https://indianallianceservices.com/terms",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Terms of Service & Candidate Advisory Agreement | Indian Alliance Services"
        description="Review the terms and conditions governing candidate counselling, eligibility assessments, mock interview preparation, and opportunity assistance with Indian Alliance Services."
        canonical="https://indianallianceservices.com/terms"
        schema={termsSchema}
      />

      {/* Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <Scale className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">Legal Advisory & User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Terms of <span className="gold-gradient-text">Service</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Last Updated: August 19, 2026. Effective since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl space-y-10 text-muted-foreground leading-relaxed text-sm sm:text-base">
          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" /> 1. Nature of Services
            </h2>
            <p>
              Indian Alliance Services is an independent aviation career counselling, training advisory, and opportunity assistance organization. We provide profile evaluation, interview coaching, and walk-in scheduling guidance.
            </p>
            <p>
              Indian Alliance Services is not a government body or direct airline employer. We act as a professional career consultancy connecting qualified candidates with active aviation recruitment channels.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> 2. Ethical Policy & No False Guarantees
            </h2>
            <p>
              We maintain absolute transparency with candidates and parents. Selection in airline and airport positions is strictly dependent on the candidate's personal interview performance, medical fitness, background clearance, and meeting the hiring carrier's criteria.
            </p>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              We never guarantee unconditional employment or government airport passes without merit-based screening.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" /> 3. Candidate Responsibilities
            </h2>
            <p>Candidates submitting information to Indian Alliance Services agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-foreground/90">
              <li>Provide 100% genuine, verifiable educational certificates, age proof, and identification.</li>
              <li>Maintain professional conduct during telephonic counselling and in-person mock drills.</li>
              <li>Verify all official communications through our online <Link to="/recruitment-verification" className="text-secondary font-bold hover:underline">Verification Registry</Link>.</li>
            </ul>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-secondary" /> 4. Intellectual Property & Brand Usage
            </h2>
            <p>
              All website content, training modules, logos, branding, and assessment frameworks are the intellectual property of Indian Alliance Services. Unauthorized reproduction, copying, or misuse is strictly prohibited under Indian copyright laws.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-secondary" /> 5. Legal Contact & Jurisdiction
            </h2>
            <p>
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
            <p className="text-xs text-muted-foreground pt-1">
              For legal inquiries: <strong>support@indianallianceservices.com</strong> | Helpline: <strong>+91 7851836860</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
