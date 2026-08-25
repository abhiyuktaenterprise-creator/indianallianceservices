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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";
import JobApplicationModal from "@/components/common/JobApplicationModal";
import { useSiteConfig, JobPost } from "@/context/SiteConfigContext";

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
  const [selectedCategory, setSelectedCategory] = useState<"all" | "aviation" | "non-aviation">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const activeJobs = jobPosts.filter((j) => j.status === "active");

  const filteredJobs = activeJobs.filter((job) => {
    // Filter by Category
    const isNonAviation =
      job.department.toLowerCase().includes("retail") ||
      job.department.toLowerCase().includes("cargo") ||
      job.department.toLowerCase().includes("lounge") ||
      job.department.toLowerCase().includes("talent") ||
      job.department.toLowerCase().includes("hr");

    let matchesCategory = true;
    if (selectedCategory === "aviation") matchesCategory = !isNonAviation;
    if (selectedCategory === "non-aviation") matchesCategory = isNonAviation;

    // Filter by Search Query
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
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
          UNIFIED VERIFIED JOB VACANCIES SECTION
          ================================================== */}
      <section id="openings" className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Verified Hiring"
            title="Explore Active"
            highlight="Airport & Airline Vacancies"
            description="Detailed breakdowns of salary scales, responsibilities, qualifications, and direct application channels for verified airport positions."
          />

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: `All Vacancies (${activeJobs.length})` },
                { id: "aviation", label: "✈️ Aviation & Airline Track" },
                { id: "non-aviation", label: "🏢 Non-Aviation & Airport Ops" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                    selectedCategory === tab.id
                      ? "bg-primary text-primary-foreground border border-gold/40 shadow-md scale-105"
                      : "bg-card hover:bg-muted text-foreground border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vacancies or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm"
              />
            </div>
          </div>

          {/* Single Deduplicated Job List */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 max-w-2xl mx-auto bg-card rounded-3xl border border-border p-8 text-muted-foreground text-sm space-y-3">
              <p>No job vacancies match your current filter.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8 max-w-5xl mx-auto">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  id={job.id}
                  className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-gold/40 transition-all space-y-6"
                >
                  {/* Job Header */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border-b border-border pb-5">
                    <div className="flex items-start gap-4">
                      {/* Job Thumbnail */}
                      <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-border shadow-sm hidden sm:block">
                        <img
                          src={job.imageUrl || "/hero-aviation.jpg"}
                          alt={job.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/hero-aviation.jpg";
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-mono text-xs font-extrabold text-[#b38e44] dark:text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-gold/40 uppercase tracking-wider">
                            {job.companyName || "AIRLINE"}
                          </span>
                          <span className="font-mono text-xs font-bold text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
                            {job.jobCode}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            {job.salaryRange}
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                            {job.openings} Seats Available
                          </span>
                          {job.badge && (
                            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                              {job.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-heading font-black text-foreground">
                          {job.postName || job.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                          {job.department} • <span className="text-secondary font-semibold">{job.type}</span> • <span className="font-semibold text-foreground uppercase">{job.jobLocation || job.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
                      <Button
                        variant="hero"
                        size="lg"
                        onClick={() => handleOpenApplyJob(job.postName || job.title)}
                        className="flex-1 lg:flex-none font-bold gap-2 px-7 py-5 rounded-2xl shadow-md text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:brightness-105"
                      >
                        <Send className="h-4 w-4" /> Apply for This Role
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleOpenCounselling(job.postName || job.title)}
                        className="font-semibold text-xs border-border hover:bg-muted rounded-2xl py-5"
                      >
                        Counselling
                      </Button>
                    </div>
                  </div>

                  {/* Summary & Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/30 p-4 rounded-2xl border border-border/60 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Eligibility</span>
                      <strong className="text-foreground font-bold">{job.qualification}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Experience</span>
                      <strong className="text-foreground font-bold">{job.experience}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Age Criteria</span>
                      <strong className="text-foreground font-bold">{job.ageLimit}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Base Location</span>
                      <strong className="text-foreground font-bold truncate block">{job.location}</strong>
                    </div>
                  </div>

                  {/* Overview */}
                  {job.overview && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {job.overview}
                    </p>
                  )}

                  {/* Responsibilities & Requirements Grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="bg-muted/40 rounded-2xl p-5 border border-border/50">
                        <h4 className="font-heading font-bold text-xs uppercase tracking-wider mb-3 text-secondary flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" /> Key Job Responsibilities:
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                              <span className="leading-snug">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="bg-muted/40 rounded-2xl p-5 border border-border/50">
                        <h4 className="font-heading font-bold text-xs uppercase tracking-wider mb-3 text-secondary flex items-center gap-1.5">
                          <ShieldCheck className="h-4 w-4" /> Candidate Requirements:
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                              <span className="leading-snug">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <strong className="text-foreground font-semibold">Dedicated Opportunity Support: </strong>
                      <span className="text-muted-foreground">
                        Mock interview coaching, GD rounds, phonetic alphabet, and document verification assistance.
                      </span>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleOpenApplyJob(job.title)}
                      className="text-secondary p-0 h-auto font-bold shrink-0 hover:underline"
                    >
                      Apply Now →
                    </Button>
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
          UPCOMING OPPORTUNITIES & HIRING ECOSYSTEM
          ================================================== */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Hiring Drives & Opportunities"
            title="Current & Upcoming"
            highlight="Airport Opportunities"
            description="Our counselling aligns with upcoming recruitment drives, regional airport inaugurations, and airline terminal expansion across India."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
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

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
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

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
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
        title="Start Preparing for Your"
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
