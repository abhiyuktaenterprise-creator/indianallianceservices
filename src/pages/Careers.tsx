import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Headphones,
  Plane,
  Settings,
  Package,
  UserCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Building2,
  Calendar,
  MapPin,
  Clock,
  Globe2,
  Info,
  ShieldCheck,
  TrendingUp,
  Award,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";
import JobApplicationModal from "@/components/common/JobApplicationModal";

// A. 6 Target Airport Placement Career Paths (AGS, CSA, Cabin Crew, GSA, PSA, Airhostess)
const aviationCareerPaths = [
  {
    id: "ags",
    code: "AGS",
    icon: Users,
    title: "Airport Ground Staff (AGS)",
    overview:
      "Airport Ground Staff (AGS) are the backbone of passenger operations at departure and arrival gates, ensuring smooth boarding, check-in, and passenger coordination across domestic and international airport terminals.",
    responsibilities: [
      "Boarding gate announcements and passenger queue management",
      "Verifying passenger identity, boarding passes, and travel documents",
      "Assisting special-needs passengers, unaccompanied minors, and elderly travelers",
      "Coordinating with ramp staff and cabin crew during aircraft boarding",
      "Handling transit passenger connections and terminal announcements",
    ],
    eligibility: "12th Pass or Any Graduate (Male & Female)",
    skills: ["Pleasing personality", "Clear verbal communication", "Calm attitude under pressure", "Basic computer literacy"],
    growth: "AGS Executive → Senior Customer Associate → Team Lead → Duty Supervisor → Airport Terminal Manager",
    acsSupport: "Mock boarding gate drills, phonetic alphabet training, document check procedures, and airline interview preparation.",
  },
  {
    id: "csa",
    code: "CSA",
    icon: Headphones,
    title: "Customer Service Assistant (CSA)",
    overview:
      "Customer Service Assistants (CSA) manage airline ticketing, check-in counters, passenger inquiries, baggage weighing/tagging, and airport lounge customer assistance.",
    responsibilities: [
      "Operating passenger check-in desks and baggage weighing systems",
      "Issuing boarding passes and handling seat assignments",
      "Managing passenger inquiries regarding flight timings and delays",
      "Providing assistance in premium airline lounges and information desks",
      "Assisting passengers with lost baggage claims and report filing",
    ],
    eligibility: "12th Pass or Any Graduate",
    skills: ["Good spoken English & Hindi/regional language", "Empathetic listening", "Customer service orientation", "Typing & computer skills"],
    growth: "CSA → Senior CSA → Shift Coordinator → Customer Service Team Manager",
    acsSupport: "Check-in simulation questions, passenger conflict handling techniques, grooming standards coaching, and telephonic interview practice.",
  },
  {
    id: "cabin-crew",
    code: "Cabin Crew",
    icon: Plane,
    title: "Cabin Crew",
    overview:
      "Cabin Crew members are responsible for in-flight passenger safety, comfort, emergency evacuation readiness, and premium inflight hospitality onboard domestic and international flights.",
    responsibilities: [
      "Conducting pre-flight safety equipment checks and briefings",
      "Welcoming passengers and guiding them to allocated seating",
      "Demonstrating safety protocols and emergency equipment usage",
      "Serving in-flight meals, beverages, and catering items",
      "Handling medical emergencies and passenger requests during flight",
    ],
    eligibility: "12th Pass / Graduate (Height criteria: Minimum ~155cm female, ~170cm male; good eyesight and clear skin)",
    skills: ["Confident posture", "Polite and hospitable demeanor", "Fluent English & Hindi", "Quick decision making"],
    growth: "Junior Cabin Crew → Senior Flight Attendant → In-Flight Lead (Purser) → Cabin Services Director",
    acsSupport: "Body language and posture grooming, skin & personality guidance, emergency scenario interview questions, and panel interview drills.",
  },
  {
    id: "gsa",
    code: "GSA",
    icon: Settings,
    title: "Ground Service Assistant (GSA)",
    overview:
      "Ground Service Assistants (GSA) oversee airside aircraft turnaround, ramp coordination, fueling safety, marshaling support, baggage conveyor handling, and airport equipment operations.",
    responsibilities: [
      "Monitoring aircraft turnaround schedule to ensure on-time departures",
      "Coordinating ramp equipment (pushback tractors, baggage tugs, GPU)",
      "Liaising between Air Traffic Control (ATC), airline flight dispatch, and ground crews",
      "Ensuring airside safety protocols and FOD (Foreign Object Debris) prevention",
      "Compiling flight load sheets and departure reports",
    ],
    eligibility: "10th Pass / 12th Pass / Graduate / Diploma Preferred",
    skills: ["Strong situational awareness", "Attention to detail", "Time management", "Basic technical aptitude"],
    growth: "GSA Trainee → GSA Senior Agent → Ramp Operations Executive → Ramp Duty Manager",
    acsSupport: "Aviation terminology, turnaround process flow understanding, airside safety guidelines, and operations interview coaching.",
  },
  {
    id: "psa",
    code: "PSA",
    icon: UserCheck,
    title: "Passenger Service Assistant (PSA)",
    overview:
      "Passenger Service Assistants (PSA) provide dedicated airport floor assistance, wheelchair passenger escorting, unaccompanied minor care, immigration line facilitation, and VIP reception.",
    responsibilities: [
      "Assisting PRM (Passengers with Reduced Mobility) and medical travellers",
      "Escorting unaccompanied minors safely from check-in to aircraft seat",
      "Managing immigration and security queue flow during peak flight hours",
      "Providing airport direction and transit assistance for connecting flights",
      "Coordinating with airline duty managers for special service requests (SSR)",
    ],
    eligibility: "12th Pass / Any Graduate",
    skills: ["Polite communication", "Helpful and patient attitude", "Active on feet", "Problem-solving skills"],
    growth: "PSA Executive → Senior PSA → Floor Supervisor → Terminal Duty Lead",
    acsSupport: "Special service codes training, PRM handling protocol overview, customer etiquette, and airline interview preparation.",
  },
  {
    id: "airhostess",
    code: "Airhostess",
    icon: Sparkles,
    title: "Airhostess",
    overview:
      "Airhostesses represent the airline's premium hospitality and safety standards onboard flights, welcoming passengers, managing inflight dining, safety demonstrations, and first-aid support.",
    responsibilities: [
      "Welcoming guests onboard and maintaining cabin atmosphere",
      "Conducting safety demonstrations and verifying seatbelt compliance",
      "Serving inflight meals, duty-free items, and beverages",
      "Handling in-flight customer requests with warmth and professionalism",
      "Executing standard emergency and first-aid protocols when required",
    ],
    eligibility: "12th Pass / Graduate (Minimum height ~155cm; clear complexion; fluent English & Hindi)",
    skills: ["Pleasing demeanor", "Grooming & elegance", "Calm hospitality", "Team coordination"],
    growth: "Airhostess Trainee → Senior Airhostess → In-flight Supervisor → Base In-Flight Manager",
    acsSupport: "Complete personality grooming, voice modulation, cabin hospitality simulation, and panel interview coaching.",
  },
];

// D. Aviation Industry Updates & New Airline Routes (Neutral Terminology - NOT claimed as ACS partners)
const industryUpdates = [
  {
    airline: "Air India",
    type: "Fleet Expansion & New Domestic/International Routes",
    details: "Ongoing major fleet expansion with widebody & narrowbody deliveries creating ground, technical, and customer service requirements across metro hubs.",
  },
  {
    airline: "British Airways",
    type: "International Route Frequency",
    details: "Expanding long-haul connectivity between UK and major Indian metro airports including London to Delhi, Mumbai, and Bangalore.",
  },
  {
    airline: "Lufthansa",
    type: "European Gateway Operations",
    details: "High-frequency operations linking Frankfurt & Munich with major Indian airports with demanding ground and customer handling standards.",
  },
  {
    airline: "SWISS International Air Lines",
    type: "Premium Service Standards",
    details: "International operations connecting Zurich with Mumbai and Delhi, known for high hospitality and passenger service benchmarks.",
  },
  {
    airline: "EVA Air & China Southern Airlines",
    type: "Asia-Pacific Cargo & Passenger Transit",
    details: "Important regional connectivity and cargo freight corridors linking India with East Asian hubs.",
  },
  {
    airline: "Flyadeal & Gulf Regional Carriers",
    type: "Middle East & Haj Pilgrimage Connectivity",
    details: "Increasing low-cost connectivity between Indian tier-2 airports and Saudi Arabia / GCC destinations.",
  },
  {
    airline: "Shankh Air",
    type: "Upcoming Indian Regional Scheduled Carrier",
    details: "New upcoming domestic scheduled airline targeting regional connectivity across Uttar Pradesh and Northern India.",
  },
  {
    airline: "Jetstar & SAS (Scandinavian Airlines)",
    type: "International Long-Haul Alliances",
    details: "Codeshare and point-to-point operations serving global passenger connectivity across Europe and Australia.",
  },
];

export default function Careers() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleOpenCounselling = (roleName: string) => {
    setSelectedRole(roleName);
    setIsEnquiryModalOpen(true);
  };

  // JobPosting Schema for HR & Telecalling Executive
  const careersSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://airportcareersarvices.com/careers/#page",
        url: "https://airportcareersarvices.com/careers",
        name: "Aviation Careers & Airport Jobs | Airport Career Services",
        description: "Explore rewarding aviation careers: Ground staff, customer service executive, cabin crew guidance, operations, and apply for open HR & Telecalling Executive jobs.",
      },
      {
        "@type": "JobPosting",
        title: "HR & Telecalling Executive",
        description:
          "Responsible for identifying potential candidates, contacting applicants, conducting initial telephonic screening, explaining aviation career opportunities, and coordinating interviews.",
        identifier: {
          "@type": "PropertyValue",
          name: "Airport Career Services",
          value: "ACS-HR-TELE-2026",
        },
        datePosted: "2026-08-01",
        validThrough: "2026-12-31",
        employmentType: "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Airport Career Services",
          sameAs: "https://airportcareersarvices.com",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ranipet Highway, Orvakal",
            addressLocality: "Pudicherla",
            addressRegion: "Andhra Pradesh",
            postalCode: "518010",
            addressCountry: "IN",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            value: "Best in industry + incentives",
            unitText: "MONTH",
          },
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Aviation Careers & Airport Jobs | Airport Career Services"
        description="Explore airport career pathways (Ground Staff, Customer Service Executive, Cabin Crew, Operations, Cargo) and apply for HR & Telecalling Executive openings at Airport Career Services."
        canonical="https://airportcareersarvices.com/careers"
        schema={careersSchema}
      />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-14 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Careers" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-3.5 py-1 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span className="text-xs font-semibold text-secondary">
                Aviation Career Pathways & Opportunities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-primary-foreground leading-tight">
              Aviation Careers & Airport Job Guidance
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
              Explore in-demand job roles across Indian airports, understand real eligibility criteria, and apply for active internal openings at Airport Career Services.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          A. AVIATION CAREER PATHS (6 Roles)
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Career Pathways"
            title="Explore In-Demand"
            highlight="Airport & Airline Roles"
            description="Detailed breakdowns of responsibilities, basic qualifications, useful skills, and career growth for major airport positions."
          />

          <div className="space-y-12 max-w-5xl mx-auto">
            {aviationCareerPaths.map((career) => (
              <div
                key={career.id}
                id={career.id}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="rounded-xl bg-secondary/15 p-3 text-secondary shrink-0">
                      <career.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-heading font-bold text-foreground">
                          {career.title}
                        </h3>
                        <span className="font-mono text-xs font-bold text-secondary bg-secondary/15 px-2.5 py-0.5 rounded-md border border-secondary/25">
                          {career.code}
                        </span>
                      </div>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                        Eligibility: {career.eligibility}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => handleOpenCounselling(career.title)}
                    className="shrink-0 text-xs font-semibold gap-1.5 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Get Guidance for This Role
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {career.overview}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Responsibilities */}
                  <div className="bg-muted/40 rounded-xl p-5 border border-border/50">
                    <h4 className="font-heading font-bold text-foreground text-xs uppercase tracking-wider mb-3 text-secondary">
                      Typical Responsibilities:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      {career.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills & Growth */}
                  <div className="space-y-4">
                    <div className="bg-muted/40 rounded-xl p-5 border border-border/50">
                      <h4 className="font-heading font-bold text-foreground text-xs uppercase tracking-wider mb-2 text-secondary">
                        Useful Skills:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-card border border-border text-foreground px-2.5 py-1 rounded-md text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/40 rounded-xl p-5 border border-border/50">
                      <h4 className="font-heading font-bold text-foreground text-xs uppercase tracking-wider mb-1 text-secondary flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" /> Career Growth Path:
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {career.growth}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-foreground font-semibold">How ACS Supports You: </strong>
                    <span className="text-muted-foreground">{career.acsSupport}</span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleOpenCounselling(career.title)}
                    className="text-secondary p-0 h-auto font-bold shrink-0 hover:underline"
                  >
                    Start Preparation →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate & Eligibility Clarification (IATA & NHDC Standards) */}
          <div className="max-w-5xl mx-auto mt-10 bg-card rounded-2xl border border-secondary/30 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-foreground font-heading font-bold text-lg">
              <Award className="h-5 w-5 text-amber-500" />
              <h3>Candidate Certification & Experience Advisory (IATA & NHDC Standards)</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> Is IATA Certificate Mandatory?
                </div>
                <p>
                  <strong>No.</strong> Prior IATA certificate is <strong>not mandatory</strong> for entry-level airport ground roles (12th pass / graduates). However, candidates holding IATA or ticketing certifications receive high preference during international airline screening.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> Is NHDC / Prior Experience Certificate Required?
                </div>
                <p>
                  <strong>No.</strong> Freshers can directly apply without prior experience. Our NHDC-aligned training modules and mock interview coaching provide complete preparation to help freshers clear airline selection rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          C. HR & TELECALLING EXECUTIVE (JOB OPENING)
          ================================================== */}
      <section id="telecalling-job" className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5 mb-4">
              <Briefcase className="h-4 w-4 text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Internal Career Opening at ACS
              </span>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm space-y-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-primary-foreground/10 pb-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary-foreground">
                    HR & Telecalling Executive
                  </h2>
                  <p className="text-sm font-semibold text-secondary mt-1">
                    Alternative: HR Executive – Tele Recruitment • Department: Human Resources / Talent Acquisition
                  </p>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsJobModalOpen(true)}
                  className="gap-2 font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-secondary/25 shrink-0"
                >
                  <Send className="h-4 w-4" /> Apply Now for This Role
                </Button>
              </div>

              {/* Job Summary */}
              <div>
                <h3 className="font-heading font-bold text-lg text-primary-foreground mb-2">
                  Job Summary
                </h3>
                <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
                  Responsible for identifying potential candidates, contacting prospective applicants, conducting initial telephonic screening, explaining airport job opportunities with clarity, and coordinating counselling and interview schedules with the senior recruitment team.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Responsibilities */}
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-secondary mb-4">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-primary-foreground/85">
                    {[
                      "Source candidates through job portals, social media, and incoming enquiries",
                      "Contact prospective candidates via phone calls and WhatsApp",
                      "Explain aviation job roles, eligibility criteria, and guidance process",
                      "Conduct initial telephone screening and assess spoken communication",
                      "Schedule candidates for senior counsellor evaluations and interviews",
                      "Maintain candidate follow-ups and address applicant doubts politely",
                      "Maintain accurate candidate records in MS Excel / CRM",
                      "Coordinate daily candidate pipelines with the HR & management team",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-secondary mb-4">
                      Candidate Requirements
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-primary-foreground/85">
                      {[
                        "Good Hindi and local regional language communication skills",
                        "Basic English communication (conversational)",
                        "Basic computer knowledge and proficiency in MS Excel",
                        "Professional, polite, and confident telephone etiquette",
                        "Positive attitude, patience, and student empathy",
                        "Previous recruitment, BPO, or telecalling experience preferred (freshers with good communication are also welcome)",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-primary-foreground/10">
                    <Button
                      variant="hero"
                      className="w-full gap-2 font-bold py-5"
                      onClick={() => setIsJobModalOpen(true)}
                    >
                      <Send className="h-4 w-4" /> Apply as HR Executive
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          B. CURRENT / UPCOMING OPPORTUNITIES (Flexible Section)
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Hiring Ecosystem"
            title="Current & Upcoming"
            highlight="Airport Opportunities"
            description="Our counselling aligns with upcoming recruitment drives, regional airport inaugurations, and airline terminal expansion across India."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                    Metro & Regional Airports
                  </span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                  Ground Staff & Passenger Handling Drives
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Regular interview scheduling for customer service and ground operations across Mumbai, Delhi NCR, Chennai, Kolkata, and Bangalore.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status: <strong className="text-foreground">Active Screening</strong></span>
                <Button variant="link" size="sm" onClick={() => handleOpenCounselling("Ground Staff")} className="text-secondary p-0 font-bold">
                  Enquire →
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                    Logistics & Cargo Hubs
                  </span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                  Air Cargo & Freight Handling
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cargo handling positions open for 10th/12th pass freshers interested in air cargo logistics, documentation, and warehouse operations.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status: <strong className="text-foreground">Ongoing Guidance</strong></span>
                <Button variant="link" size="sm" onClick={() => handleOpenCounselling("Cargo & Baggage")} className="text-secondary p-0 font-bold">
                  Enquire →
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                    Domestic Fleet Expansion
                  </span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                  Cabin Crew Preparation Batches
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mock interview drills and grooming guidance batches tailored for aspiring cabin crew preparing for domestic airline walk-in drives.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status: <strong className="text-foreground">Open for Enrollment</strong></span>
                <Button variant="link" size="sm" onClick={() => handleOpenCounselling("Cabin Crew")} className="text-secondary p-0 font-bold">
                  Enquire →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          D. AVIATION INDUSTRY INFORMATION & ROUTES (Neutral Terminology)
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Industry Intelligence"
            title="Aviation Industry Updates &"
            highlight="New Airline Routes"
            description="Tracking aviation market growth, international airline frequencies, and domestic route additions driving airport hiring demand across India."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
            {industryUpdates.map((item) => (
              <div
                key={item.airline}
                className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe2 className="h-4 w-4 text-secondary shrink-0" />
                    <h3 className="font-heading font-bold text-foreground text-sm">
                      {item.airline}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-secondary block mb-2">
                    {item.type}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-5 text-xs text-muted-foreground flex items-start gap-3 shadow-sm">
            <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Industry Information Notice:</strong> Airline names, trademarks, and route updates are cited for educational and candidate awareness purposes regarding aviation sector opportunities. Airport Career Services operates as an independent guidance consultancy.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Start Preparing for Your"
        highlight="Aviation Career"
        description="Book your profile assessment today with Airport Career Services and get trained for standard airport recruitment drives."
        primaryCtaText="Get Free Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Apply for HR Job Opening"
        secondaryCtaLink="#telecalling-job"
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onOpenChange={setIsEnquiryModalOpen}
        defaultRole={selectedRole}
      />

      <JobApplicationModal
        isOpen={isJobModalOpen}
        onOpenChange={setIsJobModalOpen}
      />
    </>
  );
}
