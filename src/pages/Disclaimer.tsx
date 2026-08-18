import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ShieldAlert, Award, FileCheck2, ArrowRight } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";

export default function Disclaimer() {
  const disclaimerSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Official Disclaimer & Candidate Advisory | Indian Alliance Services",
        description: "Official legal disclaimer regarding independent aviation career counselling, recruitment channels, and candidate eligibility advisory.",
        url: "https://indianallianceservices.com/disclaimer",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Official Legal Disclaimer & Candidate Advisory | Indian Alliance Services"
        description="Important advisory: Indian Alliance Services is an independent aviation career guidance and opportunity advisory organization."
        canonical="https://indianallianceservices.com/disclaimer"
        schema={disclaimerSchema}
      />

      {/* Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Disclaimer" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <AlertCircle className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">Official Advisory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Legal <span className="gold-gradient-text">Disclaimer</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Clear commitments and legal notices for candidates, parents, and visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl space-y-10 text-muted-foreground leading-relaxed text-sm sm:text-base">
          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" /> 1. Independent Advisory Status
            </h2>
            <p>
              Indian Alliance Services is an independent career advisory and student training portal. We do not represent the Ministry of Civil Aviation, DGCA, AAI (Airports Authority of India), or any airline in an official governmental capacity.
            </p>
            <p>
              All airline logos, brand names, and airport codes (e.g. DEL, BOM, BLR) referenced on this platform are used purely for nominative informational, educational, and descriptive career pathway purposes.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" /> 2. Anti-Fraud Advisory & Official Channels
            </h2>
            <p>
              Indian Alliance Services never solicits cash deposits, informal WhatsApp transfers, or unauthorized payments for government airport entry gate passes.
            </p>
            <p>
              Candidates are strongly encouraged to verify all recruiter identities and communication letters via our 24/7 online Verification Registry:
            </p>
            <div className="pt-2">
              <Link to="/recruitment-verification">
                <Button variant="hero" size="sm" className="gap-1.5 text-xs font-bold">
                  Open Verification Registry <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-secondary" /> 3. Information Accuracy
            </h2>
            <p>
              While we make every effort to ensure that all job criteria, salary ranges, and notification timelines published on this website are accurate and up-to-date, airline recruitment policies are subject to change at the sole discretion of the respective airline operators.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
