import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Route,
  GraduationCap,
  UserCheck,
  Briefcase,
  Heart,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  HelpCircle,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";

const detailedServices = [
  {
    id: "career-counselling",
    icon: Compass,
    title: "1. Career Counselling",
    overview:
      "Personalized one-on-one counselling sessions to evaluate candidate eligibility, strengths, educational background, and realistic opportunities in aviation.",
    includes: [
      "In-depth candidate profile & eligibility analysis",
      "Assessment of communication skills and spoken English",
      "Educational criteria matching (10th, 12th, or Graduation)",
      "Addressing student and parent queries transparently",
      "Personalized roadmap based on city and career preference",
    ],
    benefit:
      "Prevents wasted time and money by guiding you towards airport roles where you realistically meet airline requirements.",
    ctaText: "Book Counselling Session",
  },
  {
    id: "aviation-guidance",
    icon: Route,
    title: "2. Aviation Career Guidance",
    overview:
      "Specialized role-matching and industry insights covering airport ground operations, customer handling, ramp supervision, cargo logistics, and cabin crew requirements.",
    includes: [
      "Detailed briefing on Ground Staff vs. Customer Service vs. Cargo roles",
      "Growth path progression (from Executive to Team Leader and Duty Manager)",
      "Industry working hours, airport shifts, and operational environments",
      "Aviation sector hiring patterns and upcoming airport expansions",
      "Salary structures, allowances, and airline job benefits breakdown",
    ],
    benefit:
      "Gives you total clarity on daily airport job duties before you commit to a specific career path.",
    ctaText: "Explore Career Pathways",
  },
  {
    id: "training-guidance",
    icon: GraduationCap,
    title: "3. Training Guidance",
    overview:
      "Curriculum recommendations and skill-building guidance to prepare candidates for standard airline operational requirements and airport standards.",
    includes: [
      "Airport terminology, IATA 3-letter codes, and phonetic alphabet",
      "Basic understanding of check-in, boarding, and baggage software concepts",
      "Professional grooming standards, body language, and uniform etiquette",
      "Customer handling techniques, conflict resolution, and soft skills",
      "Resume restructuring tailored to aviation recruitment standards",
    ],
    benefit:
      "Transforms raw academic qualifications into polished, airport-ready professional communication and demeanor.",
    ctaText: "Get Training Advice",
  },
  {
    id: "interview-prep",
    icon: UserCheck,
    title: "4. Interview Preparation",
    overview:
      "Intensive mock interviews, telephonic screening simulations, and confidence-building sessions designed to clear airline and ground handler hiring rounds.",
    includes: [
      "Simulated telephonic interview rounds with real-time feedback",
      "Group discussion (GD) tactics and standard situational questions",
      "Personal interview (PI) coaching on self-introduction and strengths",
      "Common aviation scenario responses (handling delayed flights, angry passengers)",
      "Overcoming hesitation and public speaking anxiety",
    ],
    benefit:
      "Dramatically boosts your confidence and reduces nervousness during high-stakes airline interview drives.",
    ctaText: "Start Interview Prep",
  },
  {
    id: "placement-assistance",
    icon: Briefcase,
    title: "5. Placement Assistance",
    overview:
      "Active coordination, recruitment drive notifications, interview scheduling, and document verification support for airport job openings.",
    includes: [
      "Timely alerts on upcoming airline and airport hiring opportunities",
      "Direct scheduling assistance for verified interview slots",
      "Pre-interview briefing and checklist of required documents",
      "Follow-up with hiring coordinators post-interview",
      "Guidance through airport entry pass documentation and verification",
    ],
    benefit:
      "Structured access to authentic recruitment drives across major Indian airports with continuous advisor backing.",
    ctaText: "Enquire About Placement",
  },
  {
    id: "candidate-support",
    icon: Heart,
    title: "6. Candidate Support",
    overview:
      "Dedicated advisor support from your initial registration through your initial weeks of airport onboarding, ensuring long-term success.",
    includes: [
      "Dedicated telecaller/advisor for queries and regular status updates",
      "Assistance with joining formalities, medical checks, and police verification",
      "Transition support for candidates relocating to new airport cities",
      "Mentorship and guidance during probationary training periods",
      "Continuous career development advice for future role promotions",
    ],
    benefit:
      "Ensures you never feel alone or confused at any step of your aviation onboarding journey.",
    ctaText: "Speak to Candidate Support",
  },
];

const serviceFaqs = [
  {
    q: "Does Indian Alliance Services guarantee 100% placement?",
    a: "We provide comprehensive 100% placement assistance, meaning we provide interview opportunities, extensive preparation, and complete coordination. However, the final hiring selection always rests on the candidate's interview performance and the hiring airline's criteria. We maintain a strictly ethical, transparent policy without deceptive false guarantees.",
  },
  {
    q: "How soon can I expect an interview after joining Indian Alliance Services guidance?",
    a: "Timelines depend on your current preparation level, communication fluency, and active hiring drives across airports. Most prepared candidates undergo screening within 4 to 12 weeks of completing mock drills.",
  },
  {
    q: "Can candidates from non-English medium backgrounds succeed in aviation?",
    a: "Yes! While basic conversational English is required for airport ground staff and customer service, our training guidance helps candidates improve functional communication, spoken English, and confidence tailored for standard interview interactions.",
  },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleOpenModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://indianallianceservices.com/services/#page",
        url: "https://indianallianceservices.com/services",
        name: "Aviation Career Services | Career Guidance, Training & Placement Assistance",
        description: "Explore 6 core aviation career services by Indian Alliance Services (IAS): Counselling, Guidance, Training Support, Mock Interviews, Placement Assistance, and Ongoing Candidate Support.",
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
            name: "Services",
            item: "https://indianallianceservices.com/services",
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="Aviation Career Services | Indian Alliance Services (IAS) Guidance & Placement"
        description="Comprehensive aviation career services: Professional career counselling, profile eligibility assessment, interview preparation, grooming guidance, and transparent placement assistance for airport jobs."
        canonical="https://indianallianceservices.com/services"
        schema={servicesSchema}
      />

      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Services" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 shadow-md">
                <Award className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-bold text-gold">
                  IATA & NHDC Certified Quality Standards
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Our Aviation <span className="gold-gradient-text">Career Services</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Structured, transparent, and candidate-centric services designed to guide you from eligibility evaluation to successful airport placement.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          DETAILED 6 SERVICES
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="What We Provide"
            title="Comprehensive Services for"
            highlight="Aspiring Aviation Professionals"
            description="Explore our six structured service verticals tailored to give you a definitive edge in airline recruitment."
          />

          <div className="space-y-12 max-w-5xl mx-auto">
            {detailedServices.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all ${
                    isEven ? "bg-card" : "bg-card"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Icon & Title */}
                    <div className="lg:w-1/3 space-y-4">
                      <div className="rounded-2xl bg-secondary/15 p-4 text-secondary w-fit">
                        <service.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.overview}
                      </p>

                      <div className="pt-2">
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => handleOpenModal(service.title)}
                          className="gap-2 font-semibold shadow-sm text-xs"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {service.ctaText}
                        </Button>
                      </div>
                    </div>

                    {/* What's Included & Candidate Benefit */}
                    <div className="lg:w-2/3 space-y-5 lg:border-l lg:border-border lg:pl-8">
                      <div>
                        <h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider text-secondary mb-3">
                          What This Service Includes:
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          {service.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl bg-muted/60 p-4 border border-border/50 text-xs sm:text-sm">
                        <span className="font-bold text-foreground">Candidate Benefit: </span>
                        <span className="text-muted-foreground">{service.benefit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          TRANSPARENT PROCESS & ETHICS COMMITMENT
          ================================================== */}
      <section className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Our Ethical Code
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary-foreground">
              Ethical Guidance & Transparent Commitments
            </h2>

            <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
              We believe in honest career advisory. We never make unsupported promises or claim guaranteed employment without evaluation. Placement assistance is provided through merit, thorough preparation, and active airport interview opportunities.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-6 text-left">
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5">
                <h3 className="font-heading font-bold text-primary-foreground text-sm mb-1.5">
                  No False Claims
                </h3>
                <p className="text-xs text-primary-foreground/75 leading-relaxed">
                  We clearly specify which roles are available for freshers and the exact qualification criteria required.
                </p>
              </div>

              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5">
                <h3 className="font-heading font-bold text-primary-foreground text-sm mb-1.5">
                  Direct Interview Training
                </h3>
                <p className="text-xs text-primary-foreground/75 leading-relaxed">
                  We invest time in mock rounds and telephonic coaching so candidates clear real airline interviews.
                </p>
              </div>

              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5">
                <h3 className="font-heading font-bold text-primary-foreground text-sm mb-1.5">
                  Verified Recruitment
                </h3>
                <p className="text-xs text-primary-foreground/75 leading-relaxed">
                  All candidate communication is handled through verified coordinators and official communication protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SERVICES AEO / FAQ
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Questions About Our"
            highlight="Aviation Services"
            description="Clear answers about our counselling, interview drills, and placement coordination."
          />

          <div className="space-y-4 text-sm">
            {serviceFaqs.map((faq, i) => (
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

      {/* CTA Section */}
      <CTASection
        title="Ready to Access Our"
        highlight="Career Services?"
        description="Book your personalized session today and get guided by dedicated aviation career specialists."
        primaryCtaText="Get Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="View Career Job Paths"
        secondaryCtaLink="/careers"
      />

      <EnquiryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultRole={selectedRole}
      />
    </>
  );
}
