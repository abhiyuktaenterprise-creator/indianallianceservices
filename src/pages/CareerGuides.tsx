import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  Share2,
  Check,
} from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface GuideArticle {
  slug: string;
  title: string;
  questionHeadline: string;
  directAnswer: string;
  category: "Ground Staff" | "Cabin Crew" | "Interview & Grooming" | "Anti-Fraud & Advisory";
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  summary: string;
  contentSections: {
    heading: string;
    body: string[];
    bulletPoints?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const ARTICLES_DATA: GuideArticle[] = [
  {
    slug: "how-to-become-airport-ground-staff-india-2026",
    title: "How to Become an Airport Ground Staff in India (2026 Step-by-Step Guide)",
    questionHeadline: "How Can a 12th Pass or Graduate Candidate Join Airport Ground Staff in India?",
    directAnswer:
      "To join airport ground staff in India, candidates need a minimum 12th standard education (any stream) or a graduate degree, age between 18 to 28 years, clear communication skills in English and Hindi, and a clean police verification record. Selection involves profile assessment, group discussions, grooming evaluation, and personal interview rounds.",
    category: "Ground Staff",
    author: "Ankita Singh",
    authorRole: "Talent Acquisition Lead",
    date: "2026-08-19",
    readTime: "8 min read",
    summary:
      "A complete roadmap for freshers and graduates looking to kickstart a rewarding career as Airport Ground Staff, Customer Service Agents, or Ramp Coordinators across Indian international and domestic airports.",
    contentSections: [
      {
        heading: "1. What Does an Airport Ground Staff Executive Actually Do?",
        body: [
          "Airport ground staff are the operational backbone of every commercial airline and airport terminal. Their duties range from passenger check-in counter operations, boarding gate announcements, handling baggage claims, guiding transit passengers, to coordinating wheelchair assistance.",
          "Ground staff roles offer stable career progression into Senior CSA, Duty Manager, and Airport Operations Supervisor positions within 2 to 4 years of dedicated performance.",
        ],
        bulletPoints: [
          "Check-in Counter Operations & Boarding Pass Issuance",
          "Passenger Verification & Security Gate Scanning Assistance",
          "Baggage Reconciliation & Lost & Found Coordination",
          "Special Passenger Assistance (VIPs, Unaccompanied Minors, Wheelchair support)",
        ],
      },
      {
        heading: "2. What Are the Real Eligibility Criteria for Ground Staff in 2026?",
        body: [
          "Airlines and airport ground handling agencies (such as AISATS, Bird Group, Celebi, and BWFS) maintain standardized criteria across metro airports in Delhi, Mumbai, Bengaluru, Hyderabad, and Kolkata.",
        ],
        bulletPoints: [
          "Education: Minimum 10+2 (12th Pass) from any recognized Indian education board. Graduates in any discipline are given priority for customer service roles.",
          "Age Range: 18 to 28 years at the time of application.",
          "Language Fluency: Confident spoken Hindi and functional conversational English.",
          "Physical Fitness: Pleasing personality, well-groomed appearance, and medical fitness for rotating shift duties.",
        ],
      },
      {
        heading: "3. Step-by-Step Roadmap: From Registration to Airport Placement",
        body: [
          "Step 1 — Profile Assessment: Evaluate your communication, physical parameters, and documentation eligibility.",
          "Step 2 — Aviation Foundations: Learn phonetic alphabet (ICAO), airport codes (DEL, BOM, BLR), passenger ticketing terminologies, and aviation security basics.",
          "Step 3 — Mock Interview Drills: Practice HR introduction, group discussions on aviation scenarios, and customer handling conflict simulations.",
          "Step 4 — Document Verification: Prepare police clearance certificate (PCC), Aadhaar card, 10th/12th marksheet, and airport entry pass prerequisites.",
          "Step 5 — Direct Walk-In Drives: Attend scheduled screening slots with partner airlines and authorized handling agencies.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is IATA certificate compulsory to get an airport ground staff job?",
        answer:
          "No. A prior IATA certificate is not legally mandatory for entry-level airport ground roles (12th pass / freshers). However, IATA-compliant training and ticketing knowledge significantly boost your chances during airline interview rounds.",
      },
      {
        question: "What is the average starting salary for airport ground staff in India?",
        answer:
          "Entry-level ground staff salaries in Indian airports typically range between ₹20,000 to ₹35,000 per month, plus shift allowances, provident fund, medical insurance, and discounted airline family tickets.",
      },
    ],
  },
  {
    slug: "cabin-crew-flight-attendant-eligibility-height-salary-guide",
    title: "Airport Cabin Crew Eligibility, Height, Age & Salary Guide in India",
    questionHeadline: "What Are the Exact Physical & Educational Requirements for Cabin Crew in India?",
    directAnswer:
      "Cabin crew eligibility in India requires 10+2 (12th pass) qualification, age between 18 to 27 years, minimum height of 155 cm for females and 170 cm for males with proportionate BMI, clear skin without visible tattoos in uniform, and uncorrected or corrected 6/6 vision. Starting salaries range from ₹45,000 to ₹85,000 per month.",
    category: "Cabin Crew",
    author: "Aditya Gujral",
    authorRole: "Assistant Manager",
    date: "2026-08-18",
    readTime: "9 min read",
    summary:
      "Everything you need to know regarding airline cabin crew standards, arm reach tests, grooming benchmarks, medical fitness requirements, and international carrier hiring rounds.",
    contentSections: [
      {
        heading: "1. Height, Weight, and Physical Standards for Flight Attendants",
        body: [
          "Physical measurements are strict in cabin crew recruitment due to inflight overhead bin safety regulations and emergency evacuation slide operations.",
        ],
        bulletPoints: [
          "Female Minimum Height: 155 cm (5 feet 1 inch) to 157 cm depending on carrier.",
          "Male Minimum Height: 170 cm (5 feet 7 inches).",
          "Arm Reach: Ability to reach 212 cm on tiptoes with bare feet.",
          "Body Mass Index (BMI): Generally 18 to 22 for females and 18 to 25 for males.",
          "Tattoos & Scars: No visible tattoos or severe body art while wearing standard cabin crew uniform (short sleeves/skirts).",
        ],
      },
      {
        heading: "2. The 4-Stage Cabin Crew Selection Process",
        body: [
          "Major Indian carriers (IndiGo, Air India, Akasa Air, SpiceJet) conduct rigorous walk-in drives with 4 distinct evaluation stages:",
        ],
        bulletPoints: [
          "Stage 1: Physical Parameters & Height/BMI Check",
          "Stage 2: Voice, Diction & Spoken Fluency Assessment",
          "Stage 3: Group Discussion (GD) on Situational Customer Care",
          "Stage 4: Personal 1-on-1 Interview with Base Captains & Senior Cabin In-Charge",
        ],
      },
    ],
    faqs: [
      {
        question: "Can male candidates apply for cabin crew jobs in India?",
        answer:
          "Yes! Domestic and international airlines actively recruit male cabin crew members. Male candidates must meet the minimum 170 cm height benchmark and pass airline physical and grooming evaluations.",
      },
      {
        question: "Do freshers need flying experience to apply?",
        answer:
          "No. Most domestic airlines hire freshers as Trainee Cabin Crew and provide complete 3-month DGCA-approved flight safety and emergency procedures (SEP) training upon selection.",
      },
    ],
  },
  {
    slug: "aviation-grooming-interview-gd-rounds-hr-secrets",
    title: "Aviation Grooming & Interview GD Rounds: What Airline HR Looks For",
    questionHeadline: "How to Clear Airline Group Discussions and Personal Interviews on First Attempt?",
    directAnswer:
      "To clear airline GD and personal interviews, maintain immaculate formal grooming (hair neatly tied/styled, formal business attire, neutral makeup), display proactive listening skills without interrupting in GD rounds, demonstrate polite conflict resolution language, and memorize standard ICAO aviation phonetic alphabets.",
    category: "Interview & Grooming",
    author: "Divya Sharma",
    authorRole: "Senior HR Manager",
    date: "2026-08-16",
    readTime: "7 min read",
    summary:
      "Insider guidance from senior talent acquisition specialists on mastering airline group discussions, etiquette, situational emergency prompts, and confidence building.",
    contentSections: [
      {
        heading: "1. The 5 Golden Rules of Aviation Interview Grooming",
        body: [
          "In the aviation industry, your visual presentation conveys discipline, hygiene, and adherence to safety guidelines.",
        ],
        bulletPoints: [
          "Attire: Formal two-piece suit or tailored formal shirt with formal trousers/skirt in navy, charcoal, or black.",
          "Hair Grooming: Neatly tied donut bun with hairnet for females; clean crew cut or neatly combed parted hair for males with clean-shaven face.",
          "Footwear: Polished black closed-toe leather shoes or formal heels (1.5 to 2.5 inches max).",
          "Accessories: Minimalist single-dial watch, simple stud earrings; avoid flashy rings or heavy jewelry.",
        ],
      },
      {
        heading: "2. Cracking the Group Discussion (GD) Round",
        body: [
          "Airline recruiters do not look for loud voices; they look for candidates who can remain calm under stress and collaborate as a team.",
        ],
        bulletPoints: [
          "Initiate or Conclude: If you have a clear point, initiate politely with 'Good morning everyone, in my view...'",
          "Encourage Silent Peers: Gaining leadership points by asking a quiet peer 'Let us also hear your view on this passenger scenario.'",
          "Never Argue: Always acknowledge other candidates before providing your perspective: 'I understand your point, however from an airport safety angle...'",
        ],
      },
    ],
    faqs: [
      {
        question: "What questions are most commonly asked in airport ground staff HR rounds?",
        answer:
          "Top questions include: 'Why do you want to work in aviation rather than corporate offices?', 'How would you handle an angry passenger whose flight is delayed?', 'Can you work rotating night shifts?', and 'Explain your understanding of airport customer service.'",
      },
    ],
  },
  {
    slug: "how-to-identify-fake-airline-job-offers-anti-fraud-guide",
    title: "How to Identify Fake Airline Job Offers & Protect Yourself from Recruitment Fraud",
    questionHeadline: "How Can You Differentiate an Authentic Aviation Opportunity from a Fraudulent Offer?",
    directAnswer:
      "Authentic aviation opportunities never demand direct payments for government airport entry gate passes, never issue offer letters without in-person or verified video interviews, and only communicate via official organizational emails and verified employee ID codes. Always verify recruiters using our online Candidate ID Lookup portal.",
    category: "Anti-Fraud & Advisory",
    author: "P.K. Chadda",
    authorRole: "Senior Assistant Manager - Screening",
    date: "2026-08-15",
    readTime: "6 min read",
    summary:
      "A vital consumer awareness guide protecting students and parents from scam telecallers, counterfeit airport passes, and unauthorized recruitment agents.",
    contentSections: [
      {
        heading: "1. Red Flags That Signal an Aviation Recruitment Scam",
        body: [
          "Unscrupulous third-party agents often prey on freshers looking for quick airport employment. Be vigilant about these major red flags:",
        ],
        bulletPoints: [
          "Demanding Cash for Airport Entry Gate Passes: Airport passes (AEP) are issued solely by BCAS (Bureau of Civil Aviation Security) after police verification and background check; they can NEVER be purchased for cash.",
          "Immediate Offer Letters Without Assessment: No genuine airline gives a direct appointment letter without conducting face-to-face or structured mock interviews.",
          "Personal WhatsApp or Gmail Accounts: Authentic Indian Alliance Services coordinators communicate via official channels and registered telephone lines (+91 7851836860).",
        ],
      },
      {
        heading: "2. How to Officially Verify Your Recruiter",
        body: [
          "Indian Alliance Services provides a public 24/7 Verification Registry. Simply enter your Recruiter ID or Candidate Reference Number at indianallianceservices.com/recruitment-verification to ensure complete authenticity.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should I do if someone asks for money promising a guaranteed airport job?",
        answer:
          "Immediately decline and do not transfer any funds. Report the phone number and transaction details to our official grievance cell at support@indianallianceservices.com or call our helpline +91 7851836860.",
      },
    ],
  },
];

export default function CareerGuides() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = ["All", "Ground Staff", "Cabin Crew", "Interview & Grooming", "Anti-Fraud & Advisory"];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      searchQuery === "All" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/guides#${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const guidesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://indianallianceservices.com/guides/#page",
        url: "https://indianallianceservices.com/guides",
        name: "Aviation Career Guides & Airport Preparation Articles | Indian Alliance Services",
        description:
          "Authoritative, expert-written career guides on airport ground staff eligibility, cabin crew requirements, grooming benchmarks, and interview preparation in India.",
      },
      ...ARTICLES_DATA.map((art) => ({
        "@type": "Article",
        headline: art.title,
        description: art.summary,
        author: {
          "@type": "Person",
          name: art.author,
          jobTitle: art.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: "Indian Alliance Services",
          url: "https://indianallianceservices.com",
        },
        datePublished: art.date,
        dateModified: "2026-08-19",
        mainEntityOfPage: `https://indianallianceservices.com/guides#${art.slug}`,
      })),
    ],
  };

  return (
    <>
      <SEO
        title="Aviation Career Guides & Airport Job Preparation 2026 | Indian Alliance Services"
        description="Comprehensive, verified aviation career guides: Airport Ground Staff roadmap, Cabin Crew eligibility & height guidelines, interview GD preparation, and anti-fraud advisories."
        canonical="https://indianallianceservices.com/guides"
        schema={guidesSchema}
      />

      {/* Hero Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-18 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Career Guides & Articles" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <BookOpen className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">Official IAS Aviation Knowledge Base</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Aviation Career <span className="gold-gradient-text">Guides & Insights</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Authored by senior aviation talent acquisition specialists and management advisors. Direct, fact-checked
              answers to help you prepare and succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full text-xs font-semibold shrink-0"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Direct Counselling CTA */}
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="gap-1.5 text-xs font-bold shadow-sm shrink-0 w-full sm:w-auto"
            >
              <Sparkles className="h-3.5 w-3.5" /> Book 1-on-1 Profile Counselling
            </Button>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  id={article.slug}
                  className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                      <Badge variant="secondary" className="font-semibold text-[11px] px-2.5 py-0.5">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-secondary transition-colors mb-3">
                      {article.title}
                    </h2>

                    {/* Question-based Heading & Direct Answer Callout for AEO */}
                    <div className="bg-secondary/10 border border-secondary/25 rounded-2xl p-4 mb-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <HelpCircle className="h-4 w-4 text-secondary shrink-0" />
                        <span>Quick Question: {article.questionHeadline}</span>
                      </div>
                      <p className="text-xs text-foreground/90 font-medium leading-relaxed bg-background/80 p-3 rounded-xl border border-border/50">
                        <strong className="text-secondary block mb-1">Direct Answer:</strong>
                        {article.directAnswer}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {article.summary}
                    </p>
                  </div>

                  {/* Author Byline & Read Action */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs border border-secondary/30">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground flex items-center gap-1">
                          <span>{article.author}</span>
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">{article.authorRole}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleShare(article.slug)}
                        title="Copy article link"
                      >
                        {copiedSlug === article.slug ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setActiveArticle(article)}
                        className="gap-1 text-xs font-bold rounded-xl"
                      >
                        Read Full Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6 relative my-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {activeArticle.category}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" /> By {activeArticle.author} ({activeArticle.authorRole})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Published: {activeArticle.date}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveArticle(null)}
                className="rounded-full shrink-0"
              >
                ✕ Close
              </Button>
            </div>

            {/* Direct Answer Callout */}
            <div className="bg-secondary/15 border border-secondary/30 rounded-2xl p-5 space-y-2">
              <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-secondary" /> Executive Summary & Snippet Answer
              </div>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                {activeArticle.directAnswer}
              </p>
            </div>

            {/* Article Sections */}
            <div className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {activeArticle.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                    {sec.heading}
                  </h3>
                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sec.bulletPoints && (
                    <ul className="space-y-2 pt-1">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2 text-foreground/90 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Article FAQs */}
            {activeArticle.faqs && activeArticle.faqs.length > 0 && (
              <div className="border-t border-border pt-6 space-y-4">
                <h4 className="text-lg font-heading font-bold text-foreground">
                  Frequently Asked Questions (FAQ)
                </h4>
                <div className="space-y-3">
                  {activeArticle.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-muted/40 p-4 rounded-2xl border border-border/60">
                      <h5 className="text-sm font-bold text-foreground mb-1">{faq.question}</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Contextual Link CTAs */}
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20 p-5 rounded-2xl">
              <div>
                <h5 className="text-sm font-bold text-foreground">Ready to start your airport journey?</h5>
                <p className="text-xs text-muted-foreground">Check active openings or verify your recruitment advisor.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/careers">
                  <Button variant="outline" size="sm" className="text-xs font-semibold">
                    View Jobs
                  </Button>
                </Link>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => {
                    setActiveArticle(null);
                    setIsModalOpen(true);
                  }}
                  className="text-xs font-bold"
                >
                  Book Counselling
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Navigation Links Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            badge="Explore Connected Resources"
            title="Aviation Career"
            highlight="Ecosystem Links"
            description="Access related portals, verification tools, and preparation resources."
          />

          <div className="grid sm:grid-cols-3 gap-6">
            <Link
              to="/careers"
              className="p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Job Openings
              </div>
              <h3 className="font-heading font-bold text-foreground text-base group-hover:text-secondary transition-colors mb-2">
                Verified Airport Openings 2026 →
              </h3>
              <p className="text-xs text-muted-foreground">
                Apply for Ground Staff, CSA, Cabin Crew, and Cargo Operations.
              </p>
            </Link>

            <Link
              to="/interview-tips"
              className="p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Interview Drills
              </div>
              <h3 className="font-heading font-bold text-foreground text-base group-hover:text-secondary transition-colors mb-2">
                Mock Drills & Phonetics →
              </h3>
              <p className="text-xs text-muted-foreground">
                Practice ICAO phonetic alphabet, dress codes, and group discussion tactics.
              </p>
            </Link>

            <Link
              to="/recruitment-verification"
              className="p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Anti-Fraud Safety
              </div>
              <h3 className="font-heading font-bold text-foreground text-base group-hover:text-secondary transition-colors mb-2">
                Candidate ID Lookup →
              </h3>
              <p className="text-xs text-muted-foreground">
                Verify employee credentials and report unauthorized solicitations.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Prepare for Your"
        highlight="Aviation Career?"
        description="Book your 1-on-1 career counselling session today. Let our experts evaluate your profile and guide you step-by-step."
        primaryCtaText="Get Free Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Open Opportunities"
        secondaryCtaLink="/careers"
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRole="Career Guide Consultation"
      />
    </>
  );
}
