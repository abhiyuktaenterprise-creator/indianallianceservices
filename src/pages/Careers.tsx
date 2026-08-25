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
  Search,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";
import JobApplicationModal from "@/components/common/JobApplicationModal";
import { useSiteConfig, JobPost, ALL_DEFAULT_10_JOBS } from "@/context/SiteConfigContext";

// Industry Updates & New Airline Routes (Neutral Information)
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
  const { jobPosts } = useSiteConfig();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [jobCategory, setJobCategory] = useState<"all" | "ground" | "crew" | "cargo">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const activeJobs = (jobPosts && jobPosts.length > 0 ? jobPosts : ALL_DEFAULT_10_JOBS).filter(
    (j) => j.status === "active"
  );

  const filteredJobs = activeJobs
    .filter((job) => {
      if (jobCategory === "ground") {
        return (
          (job.department || "").toLowerCase().includes("ground") ||
          (job.department || "").toLowerCase().includes("terminal") ||
          (job.department || "").toLowerCase().includes("ticketing") ||
          (job.department || "").toLowerCase().includes("passenger") ||
          (job.title || "").toLowerCase().includes("ground") ||
          (job.title || "").toLowerCase().includes("customer")
        );
      }
      if (jobCategory === "crew") {
        return (
          (job.department || "").toLowerCase().includes("cabin") ||
          (job.department || "").toLowerCase().includes("in-flight") ||
          (job.department || "").toLowerCase().includes("hospitality") ||
          (job.department || "").toLowerCase().includes("lounge") ||
          (job.title || "").toLowerCase().includes("crew") ||
          (job.title || "").toLowerCase().includes("airhostess") ||
          (job.title || "").toLowerCase().includes("lounge")
        );
      }
      if (jobCategory === "cargo") {
        return (
          (job.department || "").toLowerCase().includes("cargo") ||
          (job.department || "").toLowerCase().includes("ramp") ||
          (job.department || "").toLowerCase().includes("security") ||
          (job.department || "").toLowerCase().includes("retail") ||
          (job.title || "").toLowerCase().includes("cargo") ||
          (job.title || "").toLowerCase().includes("security") ||
          (job.title || "").toLowerCase().includes("ramp") ||
          (job.title || "").toLowerCase().includes("retail")
        );
      }
      return true;
    })
    .filter((job) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (job.title || "").toLowerCase().includes(q) ||
        (job.companyName || "").toLowerCase().includes(q) ||
        (job.postName || "").toLowerCase().includes(q) ||
        (job.jobLocation || "").toLowerCase().includes(q) ||
        (job.location || "").toLowerCase().includes(q) ||
        (job.department || "").toLowerCase().includes(q) ||
        (job.jobCode || "").toLowerCase().includes(q)
      );
    });

  const handleOpenCounselling = (roleName: string) => {
    setSelectedRole(roleName);
    setIsEnquiryModalOpen(true);
  };

  const handleOpenApplyJob = (jobTitle: string) => {
    setSelectedRole(jobTitle);
    setIsJobModalOpen(true);
  };

  // Structured Data Schema
  const careersSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://indianallianceservices.com/careers/#page",
        url: "https://indianallianceservices.com/careers",
        name: "Aviation Careers & Airport Jobs | Indian Alliance Services",
        description: "Explore rewarding aviation careers: Ground staff, customer service executive, cabin crew guidance, operations, and apply for open airport job vacancies.",
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
            name: "Careers",
            item: "https://indianallianceservices.com/careers",
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="Aviation Careers & Airport Job Vacancies 2026 | Indian Alliance Services"
        description="Verified airport job openings for Ground Staff, CSA, Cabin Crew, Air Cargo, and Airport Hospitality across Indian metro airports. Apply online with 100% opportunity guidance."
        keywords="airport ground staff jobs, cabin crew vacancies 2026, aviation career guide, airport customer service associate, airline walk-in drive"
        canonical="https://indianallianceservices.com/careers"
        schema={careersSchema}
      />

      {/* Hero Banner */}
      <section className="bg-navy-midnight text-white py-14 lg:py-18 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[{ label: "Aviation Careers & Jobs" }]}
            className="text-primary-foreground/70 mb-4"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                Official Career Portal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Aviation & Airport <span className="gold-gradient-text">Career Openings</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Explore in-demand job roles across Indian airports, understand real eligibility criteria, and submit your application for verified opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. LATEST JOBS OF AVIATION & AIRPORT HIRING OPENINGS (Exact Same UI as Homepage)
          ================================================== */}
      <section id="openings" className="py-20 lg:py-24 gradient-sky border-y border-border relative">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Active Openings 2026"
            title="Latest Jobs of Aviation &"
            highlight="Airport Hiring Openings"
            description="Active vacancies across Indian airports with verified pay scales, eligibility criteria, and immediate interview scheduling."
          />

          {/* Category Filter Navigation Bar & Search - Styled in Royal Aviation Theme */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto mb-10">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                onClick={() => setJobCategory("all")}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  jobCategory === "all"
                    ? "bg-navy-midnight text-gold shadow-md border border-gold/40 scale-105"
                    : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-muted"
                }`}
              >
                All Aviation Roles ({activeJobs.length})
              </button>
              <button
                onClick={() => setJobCategory("ground")}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  jobCategory === "ground"
                    ? "bg-navy-midnight text-gold shadow-md border border-gold/40 scale-105"
                    : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-muted"
                }`}
              >
                ✈️ Ground Staff & Ticketing
              </button>
              <button
                onClick={() => setJobCategory("crew")}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  jobCategory === "crew"
                    ? "bg-navy-midnight text-gold shadow-md border border-gold/40 scale-105"
                    : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-muted"
                }`}
              >
                🛫 Cabin Crew & Lounge
              </button>
              <button
                onClick={() => setJobCategory("cargo")}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  jobCategory === "cargo"
                    ? "bg-navy-midnight text-gold shadow-md border border-gold/40 scale-105"
                    : "bg-card text-foreground/80 hover:text-foreground border border-border hover:bg-muted"
                }`}
              >
                📦 Cargo, Ramp & Security
              </button>
            </div>

            {/* Quick Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vacancies, airline, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-2xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm"
              />
            </div>
          </div>

          {/* Dynamic Jobs Grid - Exact Same UI as Homepage */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 max-w-2xl mx-auto bg-card rounded-3xl border border-border p-8 text-muted-foreground text-sm space-y-3">
              <p>No job vacancies match your current filter.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setJobCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleOpenApplyJob(job.postName || job.title)}
                  className="group bg-card rounded-xl border border-border/80 hover:border-gold/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Top Image Container */}
                  <div className="h-52 w-full overflow-hidden relative bg-slate-900">
                    <img
                      src={job.imageUrl || "/hero-aviation.jpg"}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/hero-aviation.jpg";
                      }}
                    />

                    {/* Floating Gold/Brown Action Arrow Button */}
                    <div className="absolute -bottom-3.5 right-4 w-9 h-9 rounded-md bg-[#9f7833] hover:bg-gold text-white hover:text-slate-950 flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110 z-10">
                      <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Card Content Matching Exact Key-Value Structure */}
                  <div className="p-5 pt-6 bg-card flex flex-col justify-between flex-1 text-left space-y-2">
                    <div className="space-y-1.5 text-left text-[12.5px] leading-snug">
                      <p>
                        <span className="font-extrabold text-foreground tracking-wide">COMPANY NAME:</span>{" "}
                        <span className="font-bold text-[#b38e44] dark:text-amber-400 uppercase">
                          {job.companyName || "INDIGO"}
                        </span>
                      </p>

                      <p>
                        <span className="font-extrabold text-foreground tracking-wide">POST NAME:</span>{" "}
                        <span className="font-bold text-[#b38e44] dark:text-amber-400 uppercase">
                          {job.postName || job.title}
                        </span>
                      </p>

                      <p>
                        <span className="font-extrabold text-foreground tracking-wide">JOB CATEGORY:</span>{" "}
                        <span className="font-bold text-[#b38e44] dark:text-amber-400 uppercase">
                          {job.jobCategory || "FRESHER AND EXPERIANCE CANDIDATES BOTH"}
                        </span>
                      </p>

                      <p>
                        <span className="font-extrabold text-foreground tracking-wide">JOB LOCATION:</span>{" "}
                        <span className="font-bold text-[#b38e44] dark:text-amber-400 uppercase">
                          {job.jobLocation || job.location}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificate & Eligibility Clarification (IATA & NSDC Standards) */}
          <div className="max-w-5xl mx-auto mt-12 bg-card rounded-3xl border border-secondary/30 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-foreground font-heading font-bold text-lg">
              <Award className="h-5 w-5 text-amber-500" />
              <h3>Candidate Certification & Experience Advisory (IATA & NSDC Standards)</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> Is IATA Certificate Mandatory?
                </div>
                <p>
                  <strong>No.</strong> Prior IATA certificate is <strong>not mandatory</strong> for entry-level airport ground roles (12th pass / graduates). However, candidates holding IATA or ticketing certifications receive high preference during international airline screening.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> Is NSDC / Prior Experience Certificate Required?
                </div>
                <p>
                  <strong>No.</strong> Freshers can directly apply without prior experience. Our NSDC-aligned training modules and mock interview coaching provide complete preparation to help freshers clear airline selection rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          AVIATION INDUSTRY INFORMATION & ROUTES
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
                className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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

          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-5 text-xs text-muted-foreground flex items-start gap-3 shadow-sm">
            <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Industry Information Notice:</strong> Airline names, trademarks, and route updates are cited for educational and candidate awareness purposes regarding aviation sector opportunities. Indian Alliance Services operates as an independent guidance portal.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Start Your"
        highlight="Aviation Career"
        description="Book your profile assessment today with Indian Alliance Services and get trained for standard airport recruitment drives."
        primaryCtaText="Get Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Apply for Open Vacancies"
        secondaryCtaLink="#openings"
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
