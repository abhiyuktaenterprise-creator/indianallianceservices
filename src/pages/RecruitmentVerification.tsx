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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import ContactForm from "@/components/common/ContactForm";

const verificationSteps = [
  {
    step: "01",
    title: "Check the Sender Channel & Domain",
    desc: "Verify that all email correspondence arrives strictly from our verified domain or official helpdesk (infor.airportcareerservices@gmail.com) and that website links point exclusively to airportcareersarvices.com.",
  },
  {
    step: "02",
    title: "Verify the Recruiter Name with Our Team",
    desc: "Our telecallers and HR executives (such as Alia Mirza, Ankita Singh, Diksha Pawar, and team members listed on our About Us page) conduct official screening. You can cross-check any caller's identity via our helpline.",
  },
  {
    step: "03",
    title: "Review the Nature of Information Requested",
    desc: "Legitimate ACS screening only asks for standard career evaluation details (highest qualification, age, height, spoken language, and preferred airport location).",
  },
  {
    step: "04",
    title: "Protect Sensitive Financial Data",
    desc: "Airport Career Services never asks for OTPs, NetBanking passwords, UPI PINs, or confidential personal banking credentials over the phone or SMS.",
  },
];

const verificationFaqs = [
  {
    q: "How do I know if an SMS, WhatsApp message, or email from ACS is genuine?",
    a: "Check if the communication directs you to our official portal (airportcareersarvices.com) or official email (infor.airportcareerservices@gmail.com). You can also send a screenshot or reference number of your message to our official email for direct confirmation.",
  },
  {
    q: "What documents does Airport Career Services legitimately ask candidates to submit?",
    a: "During profile assessment, our team may ask for copies of your educational certificates (10th/12th/degree marksheets), resume/CV, government ID proof (Aadhaar/Passport for age and identity verification), and passport-size photographs.",
  },
  {
    q: "What should I do if I suspect an unverified caller claiming to be from ACS?",
    a: "Do not share any OTPs, financial details, or sensitive personal documents. Note down the caller's phone number and email our verified helpdesk at infor.airportcareerservices@gmail.com with the details for immediate verification.",
  },
];

export default function RecruitmentVerification() {
  const verificationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://airportcareersarvices.com/recruitment-verification/#page",
        url: "https://airportcareersarvices.com/recruitment-verification",
        name: "Recruitment Verification & Candidate Trust | Airport Career Services",
        description: "Official guide for candidates to verify recruitment messages, interview invitations, telecaller credentials, and official contact channels of Airport Career Services.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://airportcareersarvices.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recruitment Verification",
            item: "https://airportcareersarvices.com/recruitment-verification",
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
        title="Recruitment Verification & Candidate Trust | Airport Career Services"
        description="Received a recruitment message or interview call from Airport Career Services? Use our official verification guidelines, verified phone numbers, and official emails to verify genuine communications."
        canonical="https://airportcareersarvices.com/recruitment-verification"
        schema={verificationSchema}
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-14 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Recruitment Verification" }]}
            className="text-primary-foreground/70 mb-4"
          />
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-3.5 py-1">
                <Award className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-bold text-amber-200">
                  IATA & NHDC Certified Quality Standards
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-3.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-semibold text-secondary">
                  Official Candidate Advisory & Trust
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-primary-foreground leading-tight">
              Recruitment Verification Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
              Received a recruitment message, WhatsApp alert, or interview call from Airport Career Services? Here is how to verify official communication and protect your personal credentials.
            </p>
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
            highlight="Airport Career Services?"
            description="Follow our four-step authenticity checklist before sharing documents or confirming interview schedules."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {verificationSteps.map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-2xl border border-border p-7 shadow-sm hover:border-secondary/50 transition-all flex flex-col justify-between"
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
          <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-secondary/40 p-6 sm:p-8 shadow-md">
            <h3 className="text-xl font-heading font-bold text-foreground border-b border-border pb-3 mb-6">
              Official & Verified ACS Channels
            </h3>

            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Website
                </div>
                <div className="font-bold text-foreground">
                  airportcareersarvices.com
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
                  href="mailto:infor.airportcareerservices@gmail.com"
                  className="font-bold text-secondary hover:underline break-all block"
                >
                  infor.airportcareerservices@gmail.com
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
          WHAT INFORMATION ACS REQUESTS VS NEVER REQUESTS
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
            {/* What ACS May Request */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-7">
              <div className="flex items-center gap-2.5 text-secondary font-bold text-lg mb-4">
                <FileCheck className="h-6 w-6" />
                <span>What ACS May Legitimately Request:</span>
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
            <div className="bg-destructive/15 border border-destructive/30 rounded-2xl p-7">
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
          AEO FAQ ON VERIFICATION
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Verification FAQ"
            title="Frequently Asked Questions on"
            highlight="ACS Recruitment Verification"
            description="Clear, authoritative answers for candidates verifying message authenticity."
          />

          <div className="space-y-4 text-sm">
            {verificationFaqs.map((faq, i) => (
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

          <div className="mt-12 bg-muted/50 rounded-2xl border border-border p-6 text-center space-y-3">
            <h4 className="font-heading font-bold text-foreground text-base">
              Still Unsure About a Message You Received?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Forward your message or caller details directly to our official verification email:
            </p>
            <div>
              <a
                href="mailto:infor.airportcareerservices@gmail.com?subject=Recruitment%20Verification%20Query"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail className="h-4 w-4" /> Email infor.airportcareerservices@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
