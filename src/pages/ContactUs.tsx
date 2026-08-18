import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import ContactForm from "@/components/common/ContactForm";

// 5 Primary Office Locations (Mumbai/Navi Mumbai, Delhi NCR, Madhya Pradesh, Andhra Pradesh, Gujarat)
const officeLocations = [
  {
    city: "Mumbai / Navi Mumbai",
    officeName: "Mumbai / Navi Mumbai Office",
    address: "Office No. 402, Sai Arcade Complex, Old Mumbai-Pune Highway, Panvel, Navi Mumbai, Maharashtra – 410206",
    notice: "Visits strictly by prior appointment only.",
    email: "support@indianallianceservices.com",
  },
  {
    city: "Delhi NCR",
    officeName: "Delhi NCR Office",
    address: "Unit 315, Galaxy Diamond Plaza, Sector 4, Greater Noida West, Uttar Pradesh – 201308",
    notice: "Visits strictly by prior appointment only.",
    email: "support@indianallianceservices.com",
  },
  {
    city: "Madhya Pradesh",
    officeName: "Madhya Pradesh Office",
    address: "Office No. 208, Silver Estate Business Park, A.B. Road Bypass, Indore, Madhya Pradesh – 452010",
    notice: "Visits strictly by prior appointment only.",
    email: "support@indianallianceservices.com",
  },
  {
    city: "Andhra Pradesh",
    officeName: "Andhra Pradesh Office",
    address: "Survey No. 42/3, Ranipet-Kurnool Highway, Orvakal, Kurnool District, Andhra Pradesh – 518010",
    notice: "Visits strictly by prior appointment only.",
    email: "support@indianallianceservices.com",
  },
  {
    city: "Gujarat",
    officeName: "Gujarat Office",
    address: "Office No. 204, GIDC Business Hub, Sanand-Viramgam Highway, Sanand, Gujarat – 382110",
    notice: "Visits strictly by prior appointment only.",
    email: "support@indianallianceservices.com",
  },
];

const contactFaqs = [
  {
    q: "How can I contact Indian Alliance Services for counselling?",
    a: "You can submit an online enquiry form on our website, call our official helpdesk at +91 7851836860, or email our support desk at support@indianallianceservices.com. Our student advisors connect back within 24 business hours.",
  },
  {
    q: "Do I need an appointment for in-person or telephonic counselling?",
    a: "Yes. All office visits are strictly by prior appointment only. Please submit your registration online first so our senior counsellors can reserve a designated time slot.",
  },
  {
    q: "Can candidates from tier-2 and tier-3 towns receive counselling remotely?",
    a: "Absolutely. Over 60% of our students receive telephonic career evaluation, online mock interview training, and remote document verification before traveling for in-person airport interview drives.",
  },
];

import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ContactUs() {
  const { settings, branches } = useSiteConfig();
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://indianallianceservices.com/contact/#contact",
        url: "https://indianallianceservices.com/contact",
        name: "Contact Indian Alliance Services | Career Counselling & Enquiries",
        description:
          "Official contact details for Indian Alliance Services: Offices in Mumbai, Delhi NCR, Madhya Pradesh, Andhra Pradesh, and Gujarat, phone, email, and online enquiry form.",
        publisher: {
          "@type": "Organization",
          name: "Indian Alliance Services",
          url: "https://indianallianceservices.com",
        },
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
            name: "Contact Us",
            item: "https://indianallianceservices.com/contact",
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="Contact Indian Alliance Services (IAS) | Official Helpdesk & Offices"
        description={`Contact Indian Alliance Services (IAS) for expert aviation career guidance. Call ${settings.helplinePhone}, email ${settings.supportEmail}, or connect with our offices in Mumbai, Delhi NCR, Madhya Pradesh, Andhra Pradesh, and Gujarat.`}
        canonical="https://indianallianceservices.com/contact"
        schema={contactSchema}
      />

      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Contact Us" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                Official Helpdesk & Enquiries
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Contact Indian Alliance <span className="gold-gradient-text">Services (IAS)</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Have questions about aviation eligibility, airport ground staff roles, or interview preparation? Our senior counsellors are here to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN CONTACT & ENQUIRY SECTION
          ================================================== */}
      <section id="enquiry" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Direct Student Registration
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1 mb-2">
                  Request Career Counselling
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fill out this form and a dedicated career advisor from Indian Alliance Services (IAS) will call you within 24 hours.
                </p>
              </div>

              <ContactForm
                showTitle={false}
                submitButtonText="Get Career Counselling"
                className="bg-card shadow-sm border-border"
              />
            </div>

            {/* Right: Verified Contact Details & Office HQ */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Contact Card */}
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-heading font-bold text-foreground border-b border-border pb-3">
                  Verified Contact Channels
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/15 p-3 text-secondary shrink-0 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Official Helpline
                      </div>
                      <a
                        href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
                        className="text-lg font-heading font-bold text-foreground hover:text-secondary transition-colors mt-0.5 block"
                      >
                        {settings.helplinePhone}
                      </a>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {settings.officeHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/15 p-3 text-secondary shrink-0 mt-0.5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Official Email
                      </div>
                      <a
                        href={`mailto:${settings.supportEmail}`}
                        className="text-sm font-semibold text-secondary hover:underline break-all block mt-0.5"
                      >
                        {settings.supportEmail}
                      </a>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        For student enquiries & recruitment verification
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/15 p-3 text-secondary shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Office Locations
                      </div>
                      <div className="text-sm font-medium text-foreground mt-0.5 leading-snug">
                        Mumbai / Navi Mumbai • Delhi NCR • Madhya Pradesh • Andhra Pradesh • Gujarat
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/15 p-3 text-secondary shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Operating Hours
                      </div>
                      <div className="text-sm font-medium text-foreground mt-0.5">
                        Monday – Saturday: 9:30 AM – 6:30 PM
                      </div>
                      <div className="text-xs text-muted-foreground">Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruitment Verification Trust Callout */}
              <div className="bg-secondary/10 border border-secondary/25 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Received an HR Message or Call?</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Before sharing sensitive government documents, verify that the recruiter or telecaller is reaching out from our official team.
                </p>
                <div className="pt-1">
                  <a
                    href="/recruitment-verification"
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                  >
                    <span>Read Full Verification Guide</span> →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          OFFICE LOCATIONS (5 REGIONAL OFFICES)
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Our Office Locations"
            title="Visit or Connect with Our"
            highlight="Offices Across India"
            description="Connect with our dedicated career counselling and candidate guidance teams across Mumbai / Navi Mumbai, Delhi NCR, Madhya Pradesh, Andhra Pradesh, and Gujarat."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {branches.map((loc) => (
              <div
                key={loc.id}
                className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                      {loc.city}
                    </span>
                    <h3 className="font-heading font-bold text-foreground text-base">
                      {loc.officeName}
                    </h3>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed mb-3">
                    <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  {loc.notice && (
                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md mb-4 inline-block">
                      {loc.notice}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Prior Booking Required</span>
                  <a
                    href="#enquiry"
                    className="text-secondary font-bold hover:underline"
                  >
                    Book Appointment Slot →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTACT FAQ / AEO
          ================================================== */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Contact FAQ"
            title="Frequently Asked Questions About"
            highlight="Connecting with IAS"
          />

          <div className="space-y-4 text-sm">
            {contactFaqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-heading font-bold text-foreground text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
