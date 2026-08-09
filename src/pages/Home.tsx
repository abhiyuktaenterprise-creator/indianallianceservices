import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle2,
  Users,
  Headphones,
  Plane,
  Settings,
  Package,
  UserCheck,
  Compass,
  Heart,
  Route,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Star,
  Quote,
  ChevronRight,
  Building2,
  HelpCircle,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/hero-airport.jpg";
import anthonyImg from "@/assets/team/anthony_ghospade.jpg";
import adityaImg from "@/assets/team/aditya_gujral.jpg";
import prashantImg from "@/assets/team/prashant_chadda.jpg";
import aliaImg from "@/assets/team/alia_mirza.jpg";
import ankitaImg from "@/assets/team/ankita_singh.jpg";
import divyaImg from "@/assets/team/divya_sharma.jpg";
import teenaImg from "@/assets/team/teena_roy.jpg";
import anamikaImg from "@/assets/team/anamika_shinde.jpg";
import padmavatiImg from "@/assets/team/padmavati.jpg";
import anyDussojaImg from "@/assets/team/any_dussoja.jpg";
import SEO from "@/components/common/SEO";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import ContactForm from "@/components/common/ContactForm";
import EnquiryModal from "@/components/common/EnquiryModal";

// 6 Core Pillars
const whyACSFeatures = [
  {
    icon: Compass,
    title: "Career Counselling",
    desc: "1-on-1 personalized counselling to match your educational background, communication skills, and personality with viable aviation paths.",
  },
  {
    icon: Route,
    title: "Aviation Career Guidance",
    desc: "Comprehensive roadmap for airport ground staff, customer service, airline operations, cargo, and flight services.",
  },
  {
    icon: GraduationCap,
    title: "Training Guidance",
    desc: "Practical guidance on airport terminology, ticketing software familiarity, grooming standards, and aviation safety protocols.",
  },
  {
    icon: UserCheck,
    title: "Interview Preparation",
    desc: "Rigorous mock interview sessions, HR telephonic screening practice, group discussion coaching, and resume formatting.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance",
    desc: "End-to-end placement support, regular job notifications, interview scheduling, and coordination till successful onboarding.",
  },
  {
    icon: Heart,
    title: "Candidate Support",
    desc: "Continuous mentor support, pre-joining documentation guidance, and ongoing career advice for long-term growth in aviation.",
  },
];

// 6 Aviation Roles
const careerRoles = [
  {
    icon: Users,
    title: "Airport Ground Staff",
    desc: "Boarding gate coordination, passenger assistance, and terminal floor management at domestic and international airports.",
    eligibility: "12th Pass / Graduate",
    link: "/careers#ground-staff",
  },
  {
    icon: Headphones,
    title: "Customer Service Executive",
    desc: "Check-in counter operations, reservation handling, passenger query resolution, and premium lounge service.",
    eligibility: "12th Pass / Any Graduate",
    link: "/careers#customer-service",
  },
  {
    icon: Plane,
    title: "Cabin Crew (Guidance)",
    desc: "In-flight passenger safety, hospitality standards, personality grooming, and airline crew selection preparation.",
    eligibility: "12th Pass / Minimum Height Criteria",
    link: "/careers#cabin-crew",
  },
  {
    icon: Settings,
    title: "Airport Operations",
    desc: "Airside coordination, ramp supervision, flight turnaround monitoring, and airport security protocol compliance.",
    eligibility: "Graduate / Diploma Preferred",
    link: "/careers#operations",
  },
  {
    icon: Package,
    title: "Cargo & Baggage Handling",
    desc: "Air cargo documentation, dangerous goods handling protocols, baggage sorting, and logistics management.",
    eligibility: "10th / 12th Pass / Graduate",
    link: "/careers#cargo",
  },
  {
    icon: UserCheck,
    title: "Airline Support Staff",
    desc: "Back-office airline support, crew scheduling coordination, lost & found assistance, and telephonic guest support.",
    eligibility: "12th Pass / Any Graduate",
    link: "/careers#support-staff",
  },
];

// 6-step How We Help Process
const howWeHelpSteps = [
  {
    step: "01",
    title: "Career Counselling",
    desc: "Detailed discussion with senior career counselors to understand your aspirations, strengths, and geographical preference.",
  },
  {
    step: "02",
    title: "Profile & Eligibility Assessment",
    desc: "Thorough review of educational qualifications, age eligibility, height criteria, language proficiency, and background.",
  },
  {
    step: "03",
    title: "Career Selection",
    desc: "Selecting the most suitable airport role (Ground Staff, Customer Service, Cargo, Operations, Cabin Crew guidance).",
  },
  {
    step: "04",
    title: "Training & Preparation",
    desc: "Targeted skill grooming, personality development, industry etiquette, airport terminology, and resume restructuring.",
  },
  {
    step: "05",
    title: "Interview Preparation",
    desc: "Intensive mock interviews, HR telephonic simulation, grooming checks, and confidence building for airline screening rounds.",
  },
  {
    step: "06",
    title: "Placement Assistance",
    desc: "Coordinated interview drives, timely application follow-ups, and complete documentation guidance until selection.",
  },
];

// Core Why Choose Us Pillars
const whyChoosePillars = [
  {
    title: "Student-First Philosophy",
    desc: "We focus on real candidate capabilities and realistic aviation career matching rather than unrealistic promises.",
  },
  {
    title: "Transparent & Ethical Process",
    desc: "Complete clarity on eligibility criteria, realistic timelines, and actual role requirements with zero ambiguity.",
  },
  {
    title: "Comprehensive Mock Drills",
    desc: "Rigorous preparation covering airline-specific telephonic interviews, grooming standards, and customer service drills.",
  },
  {
    title: "Multi-City Guidance Presence",
    desc: "Guiding students from Mumbai, Kolkata, Chennai, Visakhapatnam, Pune, Nagpur, Delhi NCR, and across India.",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Ground Staff, Delhi Airport",
    text: "Airport Career Services guided me from zero knowledge to landing my dream job at Delhi Airport. The training and interview prep were outstanding!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Cargo Operations, Mumbai Airport",
    text: "I was confused about career options after 12th. Their counselling helped me discover airport cargo operations — and now I'm working at Mumbai Airport!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Customer Service, Bangalore Airport",
    text: "The entire process was transparent and supportive. Within 3 months of joining, I was placed as a Customer Service Executive.",
    rating: 5,
  },
  {
    name: "Mohammed Irfan",
    role: "Cabin Crew, IndiGo",
    text: "Professional grooming and mock interviews gave me the confidence I needed. Today I fly with IndiGo — thanks to Airport Career Services!",
    rating: 5,
  },
];

// FAQ preview
const homeFaqs = [
  {
    q: "What is Airport Career Services (ACS)?",
    a: "Airport Career Services is a dedicated aviation career guidance and placement consultancy in India. We help students, freshers, and job seekers choose the right aviation career path through professional counselling, eligibility assessment, grooming, interview preparation, and placement assistance.",
  },
  {
    q: "What airport jobs are available for 10th and 12th pass freshers?",
    a: "Candidates with 12th pass qualification can apply for Airport Ground Staff, Customer Service Executive (CSE), Cabin Crew (subject to age and height criteria), Cargo Handling, and Airline Support roles. Select entry-level cargo and baggage handling roles are also open to 10th pass candidates.",
  },
  {
    q: "Does Airport Career Services provide free career counselling?",
    a: "Yes. We offer free initial career counselling to evaluate your eligibility, communication skills, and personal interests, guiding you to the most appropriate airport role before you begin preparation.",
  },
  {
    q: "How can I verify a recruitment message or interview call from ACS?",
    a: "You can verify any official communication by visiting our official website (airportcareersarvices.com), emailing our official helpdesk at infor.airportcareerservices@gmail.com, or visiting our dedicated Recruitment Verification portal.",
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Schema.org Structured Data
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://airportcareersarvices.com/#organization",
        name: "Airport Career Services",
        url: "https://airportcareersarvices.com",
        logo: "https://airportcareersarvices.com/hero-airport.jpg",
        description: "Aviation Career Guidance, Training Guidance & Placement Assistance Consultancy in India.",
        email: "infor.airportcareerservices@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ranipet Highway, Orvakal",
          addressLocality: "Pudicherla",
          addressRegion: "Andhra Pradesh",
          postalCode: "518010",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://airportcareersarvices.com/#website",
        url: "https://airportcareersarvices.com",
        name: "Airport Career Services",
        publisher: {
          "@id": "https://airportcareersarvices.com/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://airportcareersarvices.com/#faq",
        mainEntity: homeFaqs.map((faq) => ({
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
        title="Airport Career Services | Aviation Careers & Career Guidance India"
        description="Airport Career Services offers professional aviation career guidance, eligibility assessment, interview coaching, and placement assistance for airport ground staff, customer service, cabin crew, and airport operations jobs."
        canonical="https://airportcareersarvices.com"
        schema={homeSchema}
      />

      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-primary text-primary-foreground">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Airport professionals and ground staff walking in modern terminal"
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
            loading="eager"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-secondary-foreground/95">
                  India's Dedicated Aviation Career Consultancy
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight tracking-tight">
                Launch Your Aviation Career with{" "}
                <span className="text-secondary">Expert Guidance & Placement Support</span>
              </h1>

              {/* 3 Core Value Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base font-semibold text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Career Counselling
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-secondary/60 hidden sm:inline-block" />
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Interview Preparation
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-secondary/60 hidden sm:inline-block" />
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Placement Assistance
                </span>
              </div>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed max-w-2xl">
                Airport Career Services helps 10th pass, 12th pass, and graduates discover high-growth airport career pathways, master telephonic & airline interviews, and achieve successful placements across India's booming aviation ecosystem.
              </p>

              {/* Hero Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="text-base font-bold gap-2 px-8 py-6 rounded-xl shadow-xl hover:shadow-secondary/25"
                >
                  <Sparkles className="h-5 w-5" /> Get Free Career Counselling
                </Button>

                <Link to="/careers">
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full sm:w-auto text-base font-semibold gap-2 px-8 py-6 rounded-xl border-primary-foreground/30 hover:bg-primary-foreground/10"
                  >
                    Explore Career Opportunities <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-secondary" />
                  <span>100% Transparent Counselling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span>Personal 1-on-1 Advisor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-secondary" />
                  <span>Pan-India Airport Guidance</span>
                </div>
              </div>
            </div>

            {/* Hero Right Quick Form */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary/40 rounded-3xl blur-lg opacity-40" />
                <ContactForm
                  showTitle={true}
                  submitButtonText="Get Free Career Counselling"
                  className="relative bg-card/98 backdrop-blur-md shadow-2xl border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          RECRUITMENT VERIFICATION ALERT BANNER
          ================================================== */}
      <section className="bg-secondary/10 border-y border-secondary/20 py-3.5 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-foreground font-medium">
            <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
            <span>
              <strong>Candidate Alert:</strong> Received an SMS, WhatsApp, or interview call from Airport Career Services?
            </span>
          </div>
          <Link
            to="/recruitment-verification"
            className="inline-flex items-center gap-1.5 font-bold text-secondary hover:underline shrink-0"
          >
            <span>Verify Official Message Here</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          2. WHY AIRPORT CAREER SERVICES (6 Pillars)
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Why Airport Career Services"
            title="Complete End-to-End Support for Your"
            highlight="Aviation Career"
            description="From the moment you express interest to your first day at the airport terminal, our experienced advisors provide structured guidance at every milestone."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyACSFeatures.map((item) => (
              <div
                key={item.title}
                className="group bg-card rounded-2xl border border-border p-7 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl bg-secondary/10 p-3.5 w-fit mb-5 group-hover:bg-secondary/20 transition-colors text-secondary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:gap-2 transition-all"
                  >
                    <span>Learn More About This Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2 font-semibold">
                Explore All Services & Candidate Benefits <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. EXPLORE AVIATION CAREERS (6 Roles)
          ================================================== */}
      <section className="py-20 gradient-sky border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Aviation Career Paths"
            title="Explore Lucrative Careers in"
            highlight="Airport & Airline Operations"
            description="India's aviation sector is expanding rapidly with new airports and international routes. Discover the high-demand job roles we guide candidates for."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {careerRoles.map((role) => (
              <div
                key={role.title}
                className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-secondary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <role.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                      {role.eligibility}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {role.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    to={role.link}
                    className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Role Details & Eligibility</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-semibold hover:bg-secondary/10 hover:text-secondary"
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-3">
            <p className="text-xs text-muted-foreground italic">
              * Eligibility, criteria, and available openings depend on candidate profile, age, and airport location.
            </p>
            <div>
              <Link to="/careers">
                <Button variant="default" size="lg" className="gap-2 font-bold px-8 shadow-md">
                  View All Career Paths & Open Opportunities <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. HOW WE HELP (6 Steps)
          ================================================== */}
      <section className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <SectionHeading
            theme="dark"
            badge="Structured Roadmap"
            title="How We Help You Get"
            highlight="Airport-Ready"
            description="Our proven 6-stage counselling and placement framework takes you from initial enquiry to confident airport placement."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howWeHelpSteps.map((step) => (
              <div
                key={step.step}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-heading font-black text-secondary/60 group-hover:text-secondary transition-colors">
                    {step.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-foreground/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 bg-secondary/15 border border-secondary/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-secondary font-bold text-base">
              <ShieldCheck className="h-5 w-5" />
              <span>Ethical Guidance Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
              We maintain absolute transparency with students and parents. We provide complete placement assistance based on real merit and performance without false promises.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. WHY CHOOSE US
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  The ACS Difference
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground leading-tight">
                Why Students & Parents Trust{" "}
                <span className="text-secondary">Airport Career Services</span>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Choosing the right career guidance partner is critical. We combine industry knowledge, honest feedback, and intensive interview preparation to ensure candidates present their strongest self.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Realistic eligibility evaluation based on industry standards</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Dedicated telephonic screening coaching & mock rounds</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="rounded-full bg-secondary/20 p-1 text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>Multi-city candidate support across major Indian aviation hubs</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="gap-2 font-bold px-8 shadow-md"
                >
                  <Sparkles className="h-4 w-4" /> Speak with a Senior Advisor
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {whyChoosePillars.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all"
                >
                  <div className="rounded-xl bg-primary/10 text-primary p-3 w-fit mb-4">
                    <span className="font-heading font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. OUR TEAM PREVIEW (Founder & HR)
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Our Leadership & HR Team"
            title="Guided by Aviation"
            highlight="Professionals & Mentors"
            description="Our leadership and dedicated talent acquisition team are committed to transparent, student-centered career guidance."
          />

          {/* Leadership Cards (3 Core Executive Members in Vertical Stack) */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={anthonyImg} alt="Anthony Ghospade - Founder & CEO" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Anthony Ghospade
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Founder & CEO
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Guides aspiring aviation candidates with clarity, honesty, and strategic industry vision.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={adityaImg} alt="Aditya Gujral - Assistant Manager" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Aditya Gujral
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Assistant Manager
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Coordinates counselling and candidate support to ensure a seamless placement journey.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all text-center group flex flex-col justify-between">
              <div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-muted">
                  <img src={prashantImg} alt="P.K. Chadda - Senior Assistant Manager" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  P.K. Chadda
                </h3>
                <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                  Senior Assistant Manager
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Oversees operational screening pipelines and interview scheduling with standard procedures.
                </p>
              </div>
            </div>
          </div>

          {/* Senior & Lead HR Posts (Photo Cards Preview - 3 Columns) */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="text-center mb-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 mb-2">
                Senior Talent Acquisition Leads
              </span>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Senior & Lead HR Management
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ankita Singh", role: "HR Director", code: "ACS-HR-01", img: ankitaImg },
                { name: "Anamika Shinde", role: "Assistant HR Manager", code: "ACS-HR-13", img: anamikaImg, phone: "+91 8787253845" },
                { name: "Divya Sharma", role: "Senior HR Manager", code: "ACS-HR-05", img: divyaImg },
                { name: "Mrs. Padmavati", role: "Senior HR Manager", code: "ACS-HR-20", img: padmavatiImg },
                { name: "Teena Roy", role: "HR Manager", code: "ACS-HR-09", img: teenaImg },
                { name: "Alia Mirza", role: "Senior HR Executive", code: "ACS-HR-00", img: aliaImg },
              ].map((m) => (
                <div
                  key={m.name}
                  className="bg-card rounded-3xl border border-secondary/30 p-5 text-center hover:border-secondary transition-all shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-secondary/40 shadow-sm bg-muted">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                    <h4 className="font-heading font-bold text-foreground text-base truncate">{m.name}</h4>
                    <p className="text-xs font-semibold text-secondary truncate">{m.role}</p>
                    <div className="pt-1">
                      <span className="inline-block text-[10px] font-mono font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2 py-0.5 rounded-md">
                        Emp ID: {m.code}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-border/50 flex items-center justify-center text-xs">
                    {m.phone ? (
                      <a
                        href={`tel:${m.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                        title="Direct Calling Line"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{m.phone}</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <BadgeCheck className="h-3.5 w-3.5 text-secondary" /> Verified HR
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HR Team Preview */}
          <div className="max-w-5xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  HR Screening & Telecalling Directory
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Our verified telecalling coordinators conduct official candidate screening across India.
                </p>
              </div>

              <Link
                to="/about"
                className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>View Full Team Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { name: "Diksha Pawar", code: "ACS-HR-02", role: "HR Executive", initials: "DP" },
                { name: "Komal Sharma", code: "ACS-HR-03", role: "HR Executive", initials: "KS" },
                { name: "Avni Sharma", code: "ACS-HR-04", role: "HR Executive", initials: "AS" },
                { name: "Priya Sharma", code: "ACS-HR-06", role: "HR Executive", initials: "PS" },
                { name: "Aditi Thakur", code: "ACS-HR-07", role: "HR Executive", initials: "AT" },
                { name: "Arpita Shinde", code: "ACS-HR-08", role: "HR Executive", initials: "AS" },
                { name: "Preeti Sharma", code: "ACS-HR-10", role: "HR Executive", initials: "PS" },
                { name: "Prachi Sharma", code: "ACS-HR-11", role: "HR Executive", initials: "PS" },
              ].map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="bg-muted/50 rounded-xl p-3 border border-border/50 hover:bg-muted transition-colors flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center font-heading font-bold text-xs shrink-0">
                    {member.initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-foreground truncate">{member.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 pt-4 border-t border-border/50">
              <Link to="/about">
                <Button variant="outline" size="sm" className="text-xs gap-1.5 font-semibold">
                  Read Full About Us & Leadership Profile <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. TESTIMONIALS
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Candidate Success Stories"
            title="What Our Students Say About"
            highlight="Their Experience"
            description="Read verified feedback from students who transformed their aviation aspirations into full-time airport careers."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-between hover:shadow-lg hover:border-secondary/50 transition-all duration-300"
              >
                <div>
                  <Quote className="h-8 w-8 text-secondary/30 mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="font-heading font-bold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-secondary font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FAQ & AEO PREVIEW
          ================================================== */}
      <section className="py-20 gradient-sky border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Common Questions About"
            highlight="Aviation Careers & ACS"
            description="Clear, factual answers to help students and parents make informed career decisions."
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {homeFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-xl border border-border px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-heading font-bold text-foreground text-sm sm:text-base hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FINAL CTA SECTION
          ================================================== */}
      <CTASection
        title="Ready to Start Your"
        highlight="Aviation Career?"
        description="Book your free 1-on-1 career counselling session today. Let our experts evaluate your profile and guide you step-by-step to airport placement."
        primaryCtaText="Get Free Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Open Opportunities"
        secondaryCtaLink="/careers"
      />

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
