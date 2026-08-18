import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function PrivacyPolicy() {
  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Indian Alliance Services",
    description: "Official Privacy Policy of Indian Alliance Services explaining how candidate data is collected, processed, and safeguarded.",
    url: "https://indianallianceservices.com/privacy-policy",
  };

  return (
    <>
      <SEO
        title="Privacy Policy | Indian Alliance Services"
        description="Learn how Indian Alliance Services collects, uses, and safeguards student and job seeker personal information in accordance with Indian IT laws."
        canonical="https://indianallianceservices.com/privacy-policy"
        schema={privacySchema}
      />

      {/* Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <Lock className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">Data Protection & Privacy Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Privacy <span className="gold-gradient-text">Policy</span>
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
              <ShieldCheck className="h-5 w-5 text-secondary" /> 1. Overview & Commitment
            </h2>
            <p>
              Indian Alliance Services ("IAS", "we", "our", or "us") is dedicated to protecting the privacy and personal information of candidates, students, and visitors who use our website (<strong>indianallianceservices.com</strong>) and our aviation career counselling services.
            </p>
            <p>
              This Privacy Policy explains what data we collect, why we collect it, how it is processed, and your rights regarding your personal information under the Information Technology Act, 2000 and applicable Indian data protection standards.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" /> 2. Information We Collect
            </h2>
            <p>We only collect information necessary to provide accurate aviation career counselling and eligibility evaluation:</p>
            <ul className="space-y-2 pt-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-1" />
                <span><strong>Candidate Contact Details:</strong> Full name, mobile number, email address, and current city.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-1" />
                <span><strong>Educational & Career Background:</strong> Highest qualification, marks percentage, year of passing, English fluency level, and interested aviation department.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-1" />
                <span><strong>Physical Parameter Data (Voluntary for Cabin Crew/AGS):</strong> Height, age, and basic vision criteria to verify eligibility for airline physical benchmarks.</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Eye className="h-5 w-5 text-secondary" /> 3. How We Use Your Data
            </h2>
            <p>Your data is used solely for genuine career guidance and recruitment coordination purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-foreground/90">
              <li>To evaluate eligibility against airline and airport ground handling criteria.</li>
              <li>To contact you for scheduled telephonic counselling or mock interview sessions.</li>
              <li>To send verified notification alerts regarding upcoming walk-in recruitment drives.</li>
              <li>To verify candidate identity on our official verification registry.</li>
            </ul>
            <p className="pt-2 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              We NEVER sell, rent, trade, or distribute candidate personal information to unauthorized third-party marketing agencies.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-secondary" /> 4. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption, SSL protocols, access-controlled databases, and authenticated administrative panels to prevent unauthorized access, alteration, or disclosure of your information.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-secondary" /> 5. Contacting the Grievance Officer
            </h2>
            <p>If you have any questions or wish to request data correction or deletion, please contact our Privacy Desk:</p>
            <div className="pt-2 space-y-2 text-xs sm:text-sm text-foreground">
              <p><strong>Email:</strong> support@indianallianceservices.com</p>
              <p><strong>Official Helpline:</strong> +91 7851836860</p>
              <p><strong>Office Address:</strong> Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
