import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  Route,
  Users,
  Target,
  Eye,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Phone,
  PhoneCall,
  UserCheck,
  Building2,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import EnquiryModal from "@/components/common/EnquiryModal";

// Real portraits for Leadership & Senior HR (100% Real Photos - Zero Cartoons - Zero Duplicates)
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
import dikshaImg from "@/assets/team/diksha_pawar.jpg";
import komalImg from "@/assets/team/komal_sharma.jpg";
import avniImg from "@/assets/team/avni_sharma.jpg";
import priyaImg from "@/assets/team/priya_sharma.jpg";
import aditiImg from "@/assets/team/aditi_thakur.jpg";
import arpitaImg from "@/assets/team/arpita_shinde.jpg";
import preetiImg from "@/assets/team/preeti_sharma.jpg";
import prachiImg from "@/assets/team/prachi_sharma.jpg";
import akankshaImg from "@/assets/team/akanksha_sharma.jpg";
import monikaImg from "@/assets/team/monika_sharma.jpg";
import vanshikaImg from "@/assets/team/vanshika_tiwari.jpg";
import kavyaImg from "@/assets/team/kavya_mittal.jpg";
import anikaImg from "@/assets/team/anika_dhanraj.jpg";
import hsShinghaniyaImg from "@/assets/team/hs_shinghaniya.jpg";

// 1. Executive Leadership & Management (Strictly 3 members in 3 columns)
const leadershipMembers = [
  {
    name: "Anthony Ghospade",
    role: "Founder & CEO",
    image: anthonyImg,
    badge: "Executive Leadership",
    description:
      "Anthony Ghospade is the Founder and CEO of Indian Alliance Services. With strong industry understanding and a student-first approach, he guides aspiring aviation professionals toward the right career path with clarity, honesty, and long-term vision.",
  },
  {
    name: "Aditya Gujral",
    role: "Assistant Manager",
    image: adityaImg,
    badge: "Operations & Guidance",
    description:
      "Aditya Gujral supports students throughout their counselling and career opportunity journey. He ensures smooth coordination, accurate guidance, and timely assistance, helping students move confidently from counselling to final airport opportunity.",
  },
  {
    name: "P.K. Chadda",
    role: "Senior Assistant Manager",
    image: prashantImg,
    badge: "Recruitment & Screening",
    description:
      "P.K. Chadda oversees operational screening, student eligibility evaluation, and interview scheduling pipelines, ensuring ethical matching between candidate profiles and airport requirements.",
  },
];

// 2. Senior & Lead HR Posts (6 Key Leaders with Official Designations & Real Photos)
const seniorHRMembers = [
  {
    name: "Ankita Singh",
    role: "HR Director",
    code: "IAS-HR-01",
    image: ankitaImg,
    description:
      "Directs nationwide talent acquisition operations, candidate documentation standards, and overall human resources recruitment strategy.",
  },
  {
    name: "Anamika Shinde",
    role: "Assistant HR Manager",
    code: "IAS-HR-13",
    image: anamikaImg,
    phone: "+91 8787253845",
    description:
      "Leads regional telecalling operations, candidate communication verification, and applicant guidance across airport zones.",
  },
  {
    name: "Divya Sharma",
    role: "Senior HR Manager",
    code: "IAS-HR-05",
    image: divyaImg,
    description:
      "Manages senior profile evaluations, airline interview preparation workshops, and candidate grooming pipelines with industry passion.",
  },
  {
    name: "Mrs. Padmavati",
    role: "Senior HR Manager",
    code: "IAS-HR-20",
    image: padmavatiImg,
    description:
      "Provides senior advisory on career transitions, eligibility validation, and long-term opportunity roadmaps for prospective airport personnel.",
  },
  {
    name: "Teena Roy",
    role: "HR Manager",
    code: "IAS-HR-09",
    image: teenaImg,
    description:
      "Oversees candidate screening workflows, telephonic eligibility assessments, and structured mock interview schedules.",
  },
  {
    name: "Alia Mirza",
    role: "Senior HR Executive",
    code: "IAS-HR-00",
    image: aliaImg,
    description:
      "Leads passenger service and ground staff candidate evaluations, telephonic coaching, and interview scheduling.",
  },
];

// 3. Mid-Level HR Team (12 HR Executives)
const hrExecutiveMembers = [
  {
    name: "Diksha Pawar",
    code: "IAS-HR-02",
    designation: "HR Executive",
    initials: "DP",
    image: dikshaImg,
    color: "bg-indigo-600/15 text-indigo-700 dark:text-indigo-400",
    description: "Conducts telephonic screening, eligibility validation, and interview scheduling for ground staff aspirants.",
  },
  {
    name: "Komal Sharma",
    code: "IAS-HR-03",
    designation: "HR Executive",
    initials: "KS",
    image: komalImg,
    color: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
    description: "Manages candidate evaluations, customer service orientation checks, and opportunity drive schedules.",
  },
  {
    name: "Avni Sharma",
    code: "IAS-HR-04",
    designation: "HR Executive",
    initials: "AS",
    image: avniImg,
    color: "bg-sky-600/15 text-sky-700 dark:text-sky-400",
    description: "Assists freshers with basic eligibility criteria, document verification, and initial interview rounds.",
  },
  {
    name: "Priya Sharma",
    code: "IAS-HR-06",
    designation: "HR Executive",
    initials: "PS",
    image: priyaImg,
    color: "bg-violet-600/15 text-violet-700 dark:text-violet-400",
    description: "Specializes in airport ground operations candidate screening and structured communication coaching.",
  },
  {
    name: "Aditi Thakur",
    code: "IAS-HR-07",
    designation: "HR Executive",
    initials: "AT",
    image: aditiImg,
    color: "bg-teal-600/15 text-teal-700 dark:text-teal-400",
    description: "Evaluates prospective candidates for customer service, retail, and passenger handling career tracks.",
  },
  {
    name: "Arpita Shinde",
    code: "IAS-HR-08",
    designation: "HR Executive",
    initials: "AS",
    image: arpitaImg,
    color: "bg-rose-600/15 text-rose-700 dark:text-rose-400",
    description: "Coordinates regional telecalling drives, mock question drills, and verified applicant onboarding.",
  },
  {
    name: "Preeti Sharma",
    code: "IAS-HR-10",
    designation: "HR Executive",
    initials: "PS",
    image: preetiImg,
    color: "bg-blue-600/15 text-blue-700 dark:text-blue-400",
    description: "Oversees telephonic screening sessions, eligibility guidance, and scheduling with senior recruiters.",
  },
  {
    name: "Prachi Sharma",
    code: "IAS-HR-11",
    designation: "HR Executive",
    initials: "PS",
    image: prachiImg,
    color: "bg-indigo-600/15 text-indigo-700 dark:text-indigo-400",
    description: "Guides applicants through initial registration, screening standards, and airline interview protocols.",
  },
  {
    name: "Akanksha Sharma",
    code: "IAS-HR-12",
    designation: "HR Executive",
    initials: "AS",
    image: akankshaImg,
    color: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
    description: "Handles telephonic qualification evaluations and guides applicants on aviation career opportunities.",
  },
  {
    name: "Monika Sharma",
    code: "IAS-HR-14",
    designation: "HR Executive",
    initials: "MS",
    image: monikaImg,
    color: "bg-cyan-600/15 text-cyan-700 dark:text-cyan-400",
    description: "Conducts preliminary profile screening, student documentation checks, and interview follow-ups.",
  },
  {
    name: "Vanshika Tiwari",
    code: "IAS-HR-15",
    designation: "HR Executive",
    initials: "VT",
    image: vanshikaImg,
    color: "bg-violet-600/15 text-violet-700 dark:text-violet-400",
    description: "Provides telephonic advisory on airport job eligibility, height/age criteria, and preparation.",
  },
  {
    name: "Kavya Mittal",
    code: "IAS-HR-16",
    designation: "HR Executive",
    initials: "KM",
    image: kavyaImg,
    color: "bg-teal-600/15 text-teal-700 dark:text-teal-400",
    description: "Coordinates candidate screening pipelines, applicant inquiries, and official recruitment updates.",
  },
];

// 4. Junior / Associate Level (3 HR Associates)
const hrAssociateMembers = [
  {
    name: "Anika Dhanraj",
    code: "IAS-HR-17",
    designation: "HR Associate",
    initials: "AD",
    image: anikaImg,
    color: "bg-rose-600/15 text-rose-700 dark:text-rose-400",
    description: "Supports candidate outreach, telephonic verification calls, and application status logs.",
  },
  {
    name: "H.S. Shinghaniya",
    code: "IAS-HR-19",
    designation: "HR Associate",
    initials: "HS",
    image: hsShinghaniyaImg,
    color: "bg-indigo-600/15 text-indigo-700 dark:text-indigo-400",
    description: "Coordinates initial telephone queries, applicant onboarding assistance, and record management.",
  },
  {
    name: "Mrs. Any Dussoja",
    code: "IAS-HR-21",
    designation: "HR Associate",
    initials: "AD",
    image: anyDussojaImg,
    color: "bg-purple-600/15 text-purple-700 dark:text-purple-400",
    description: "Provides candidate assistance on documentation verification, interview schedules, and applicant support.",
  },
];

const coreValues = [
  {
    icon: Compass,
    title: "Clear Career Guidance",
    desc: "Providing straightforward, realistic roadmaps for every candidate based on verified educational eligibility and personal strengths.",
  },
  {
    icon: Heart,
    title: "Honest Counselling",
    desc: "Maintaining transparency with students and parents with no hidden clauses or unverified promises.",
  },
  {
    icon: Route,
    title: "Structured Career Path",
    desc: "Guiding candidates step-by-step from initial evaluation to training, interview preparation, and opportunity onboarding.",
  },
  {
    icon: Users,
    title: "Dedicated Opportunity Assistance",
    desc: "Continuous coordination with hiring channels, timely interview alerts, and post-screening follow-up.",
  },
];

const differentiators = [
  {
    title: "Realistic Profile Matching",
    desc: "We don't fit every candidate into the same mold. We evaluate your spoken communication, height, age, and education to suggest the right aviation vertical.",
  },
  {
    title: "Ethical & Verified Screening",
    desc: "All candidate communication and interview invitations follow strict professional protocols with full transparency.",
  },
  {
    title: "Intensive Telephonic Coaching",
    desc: "Most airline screening begins over the phone. We train candidates in professional telephone etiquette and standard airport interview questions.",
  },
  {
    title: "Pan-India Reach",
    desc: "Supporting candidates from metropolitan hubs as well as tier-2 and tier-3 towns aspiring for airport careers across India.",
  },
];

export default function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://indianallianceservices.com/about/#about",
        url: "https://indianallianceservices.com/about",
        name: "About Indian Alliance Services",
        description: "Learn about Indian Alliance Services, our leadership, our mission, vision, values, and our dedicated HR team.",
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
            name: "About Us",
            item: "https://indianallianceservices.com/about",
          },
        ],
      },
      {
        "@type": "Person",
        name: "Anthony Ghospade",
        jobTitle: "Founder & CEO",
        image: "https://indianallianceservices.com/assets/team/anthony_ghospade.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "Aditya Gujral",
        jobTitle: "Assistant Manager",
        image: "https://indianallianceservices.com/assets/team/aditya_gujral.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "P.K. Chadda",
        jobTitle: "Senior Assistant Manager",
        image: "https://indianallianceservices.com/assets/team/prashant_chadda.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "Ankita Singh",
        jobTitle: "HR Director / Head of HR",
        image: "https://indianallianceservices.com/assets/team/ankita_singh.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "Mrs. Padmavati",
        jobTitle: "Senior HR Manager",
        image: "https://indianallianceservices.com/assets/team/padmavati.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "Anamika Shinde",
        jobTitle: "Assistant HR Manager",
        telephone: "+91 8787253845",
        image: "https://indianallianceservices.com/assets/team/anamika_shinde.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
      {
        "@type": "Person",
        name: "Alia Mirza",
        jobTitle: "Senior HR Executive",
        image: "https://indianallianceservices.com/assets/team/alia_mirza.jpg",
        worksFor: {
          "@type": "Organization",
          name: "Indian Alliance Services",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="About Indian Alliance Services | Aviation Career Guidance & Leadership"
        description="Discover Indian Alliance Services: Our mission, vision, values, leadership team (Founder & CEO Anthony Ghospade, Aditya Gujral, P.K. Chadda), Senior HR leaders (HR Director Ankita Singh, Senior HR Manager Divya Sharma, Senior HR Manager Mrs. Padmavati, HR Manager Teena Roy, Assistant HR Manager Anamika Shinde, Alia Mirza) and verified recruitment team."
        canonical="https://indianallianceservices.com/about"
        schema={aboutSchema}
      />

      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "About Us" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                Who We Are & What Drives Us
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              About Indian Alliance <span className="gold-gradient-text">Services</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              A dedicated aviation career guidance and opportunity portal helping aspiring candidates bridge the gap between education and airport employment.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          1. WHO WE ARE
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1">
                <Building2 className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-tight">
                Your Trusted Compass in the Aviation Ecosystem
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Indian Alliance Services is a dedicated aviation career guidance and opportunity consultancy. We guide students step-by-step — from career selection to training, grooming, interview coaching, and final airport job opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The aviation sector in India is expanding rapidly with new greenfield airports and domestic fleet expansions. However, many students from across India lack access to authentic information about job roles, eligibility criteria, and hiring procedures. We exist to provide transparent, student-first guidance to help freshers build sustainable careers.
              </p>

              <div className="pt-2">
                <Button
                  variant="hero"
                  onClick={() => setIsModalOpen(true)}
                  className="gap-2 font-semibold shadow-md"
                >
                  <Sparkles className="h-4 w-4" /> Get Career Counselling
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-card rounded-2xl border border-border p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-heading font-bold text-foreground border-b border-border pb-3">
                Our Foundational Commitments
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-secondary/15 p-2 text-secondary shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      Honest Eligibility Assessment
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      We evaluate candidates strictly based on real industry criteria before recommending any role.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-secondary/15 p-2 text-secondary shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      End-to-End Interview Readiness
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Rigorous mock interview sessions and telephone screening guidance to build confidence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500 shrink-0 mt-0.5 border border-amber-500/30">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm flex items-center gap-1.5">
                      <span>IATA & NSDC Certified Standards</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded">Certified</span>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Our training curriculum, student eligibility criteria, and interview coaching frameworks follow recognized IATA international benchmarks and NSDC quality standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-secondary/15 p-2 text-secondary shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      Student-Centric Opportunity Support
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Continuous assistance until successful onboarding into airport operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. MISSION, VISION & VALUES
          ================================================== */}
      <section className="py-20 gradient-sky border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Guiding Principles"
            title="Our Mission, Vision &"
            highlight="Core Values"
            description="Clear principles that shape every counselling interaction, screening call, and student recommendation."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Mission Card */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="rounded-xl bg-primary/10 p-3.5 text-primary w-fit mb-4">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize aviation career opportunities by providing transparent, affordable, and actionable career guidance, training support, and interview coaching to students and job seekers across India.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="rounded-xl bg-secondary/15 p-3.5 text-secondary w-fit mb-4">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted aviation career consultancy, recognized for ethical practices, honest counselling, and high-impact opportunity support for airport and airline roles.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Values */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-heading font-bold text-foreground text-center mb-8">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val) => (
                <div
                  key={val.title}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all text-center"
                >
                  <div className="rounded-xl bg-secondary/10 p-3 w-fit mx-auto mb-4 text-secondary">
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-base mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. WHAT MAKES US DIFFERENT
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="The ACS Difference"
            title="What Sets Us Apart from"
            highlight="Traditional Agencies"
            description="Our student-first approach ensures candidates receive authentic guidance tailored to their true strengths."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {differentiators.map((diff, i) => (
              <div
                key={diff.title}
                className="bg-card rounded-2xl border border-border p-7 shadow-sm hover:border-secondary/50 transition-all flex items-start gap-4"
              >
                <div className="rounded-xl bg-primary/10 text-primary font-heading font-extrabold text-lg h-12 w-12 flex items-center justify-center shrink-0">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1.5">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. LEADERSHIP & MANAGEMENT (Strictly 3 Members in 3-Column Stack)
          ================================================== */}
      <section className="py-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <SectionHeading
            theme="dark"
            badge="Executive Leadership"
            title="Leadership &"
            highlight="Management"
            description="Experienced leadership guiding our consultancy with integrity, student empathy, and operational excellence."
          />

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {leadershipMembers.map((member) => (
              <div
                key={member.name}
                className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-3xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 flex flex-col justify-between text-center shadow-xl group"
              >
                <div>
                  {/* Clean Isolated Circular Portrait */}
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden mx-auto mb-5 border-4 border-secondary/40 shadow-2xl group-hover:scale-105 transition-transform duration-300 bg-background/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  {/* Stack: Headings */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-lg font-heading font-extrabold text-primary-foreground leading-snug pt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-secondary/90">
                      {member.role}
                    </p>
                  </div>

                  {/* Stack: Paragraph */}
                  <p className="text-xs text-primary-foreground/75 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. SENIOR & LEAD HR POSTS (Dedicated Section with Photo Cards)
          ================================================== */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Senior Talent Acquisition"
            title="Senior & Lead"
            highlight="HR Management Team"
            description="Our senior human resources leadership and experienced talent specialists oversee candidate screening, coaching, and airline opportunity coordination across India."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {seniorHRMembers.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-3xl border border-secondary/35 p-6 shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 flex flex-col justify-between text-center group h-full"
              >
                <div>
                  {/* Clean Circular Portrait (Zero Duplication) */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-lg group-hover:scale-105 transition-transform duration-300 bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  {/* Header Info */}
                  <div className="space-y-1 mb-2.5">
                    <h3 className="text-base font-heading font-extrabold text-foreground leading-snug pt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-secondary truncate">
                      {member.role}
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block text-[10px] font-mono font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2 py-0.5 rounded-md">
                        Emp ID: {member.code}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {member.description}
                  </p>
                </div>

                {/* Card Footer: Code / Helpline & Verification */}
                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                  {member.phone ? (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1 font-bold text-secondary hover:underline"
                      title="Direct Calling Line"
                    >
                      <Phone className="h-3 w-3 text-secondary" />
                      <span>{member.phone}</span>
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-[10px] font-medium">
                      Official Team
                    </span>
                  )}
                  <Link
                    to="/recruitment-verification"
                    className="font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-secondary" />
                    <span>Verified</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. HUMAN RESOURCES SCREENING DIRECTORY
          ================================================== */}
      <section className="py-20 gradient-sky">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Candidate Screening Team"
            title="Official"
            highlight="HR Screening & Verification Directory"
            description="Our official HR Executives and HR Associates conduct primary candidate screening, document checks, and interview coordination."
          />

          <div className="max-w-6xl mx-auto bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-10">
            {/* Header with Verify Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Verified HR Screening Roster (15 Team Members)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verify the identity, designation, and official employee ID of HR members reaching out to you.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/recruitment-verification">
                  <Button variant="outline" size="sm" className="text-xs gap-1.5 font-semibold text-secondary border-secondary/30">
                    <ShieldCheck className="h-4 w-4" /> Verify Caller ID
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mid-Level HR Executives (12 Members) */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3.5 py-1 rounded-full border border-secondary/25">
                  Mid-Level HR Team (12 HR Executives)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hrExecutiveMembers.map((member) => (
                  <div
                    key={member.code}
                    className="bg-card rounded-3xl border border-secondary/35 p-6 shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 flex flex-col justify-between text-center group h-full"
                  >
                    <div>
                      {/* Circular Portrait */}
                      {member.image ? (
                        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-lg group-hover:scale-105 transition-transform duration-300 bg-muted">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className={`w-28 h-28 rounded-full flex items-center justify-center font-heading font-extrabold text-2xl mx-auto mb-4 border-4 border-secondary/40 shadow-lg group-hover:scale-105 transition-transform duration-300 ${member.color}`}>
                          {member.initials}
                        </div>
                      )}

                      {/* Header Info */}
                      <div className="space-y-1 mb-2.5">
                        <h4 className="text-base font-heading font-extrabold text-foreground leading-snug pt-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-bold text-secondary truncate">
                          {member.designation}
                        </p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[10px] font-mono font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2 py-0.5 rounded-md">
                            Emp ID: {member.code}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {member.description}
                      </p>
                    </div>

                    {/* Card Footer: Verification */}
                    <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground text-[10px] font-medium">
                        Official Team
                      </span>
                      <Link
                        to="/recruitment-verification"
                        className="font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                      >
                        <BadgeCheck className="h-3.5 w-3.5 text-secondary" />
                        <span>Verified</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Junior / Associate Level (3 Members) */}
            <div className="pt-6 border-t border-border/60">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
                  Junior / Associate Level (3 HR Associates)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hrAssociateMembers.map((member) => (
                  <div
                    key={member.code}
                    className="bg-card rounded-3xl border border-secondary/35 p-6 shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 flex flex-col justify-between text-center group h-full"
                  >
                    <div>
                      {/* Circular Portrait */}
                      {member.image ? (
                        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-secondary/40 shadow-lg group-hover:scale-105 transition-transform duration-300 bg-muted">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className={`w-28 h-28 rounded-full flex items-center justify-center font-heading font-extrabold text-2xl mx-auto mb-4 border-4 border-secondary/40 shadow-lg group-hover:scale-105 transition-transform duration-300 ${member.color}`}>
                          {member.initials}
                        </div>
                      )}

                      {/* Header Info */}
                      <div className="space-y-1 mb-2.5">
                        <h4 className="text-base font-heading font-extrabold text-foreground leading-snug pt-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-bold text-secondary truncate">
                          {member.designation}
                        </p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[10px] font-mono font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2 py-0.5 rounded-md">
                            Emp ID: {member.code}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {member.description}
                      </p>
                    </div>

                    {/* Card Footer: Verification */}
                    <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground text-[10px] font-medium">
                        Official Team
                      </span>
                      <Link
                        to="/recruitment-verification"
                        className="font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                      >
                        <BadgeCheck className="h-3.5 w-3.5 text-secondary" />
                        <span>Verified</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Trust Note */}
            <div className="mt-8 p-5 rounded-2xl bg-secondary/10 border border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-foreground font-medium">
                <ShieldCheck className="h-6 w-6 text-secondary shrink-0" />
                <span>
                  All official candidate communication is routed through verified HR coordinators listed in this directory.
                </span>
              </div>
              <Link
                to="/recruitment-verification"
                className="text-secondary font-bold hover:underline shrink-0"
              >
                Learn How to Verify HR Calls →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. AEO KNOWLEDGE BASE / FAQ
          ================================================== */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Fast Facts & Knowledge Base"
            title="Frequently Answered Questions About"
            highlight="Indian Alliance Services"
          />

          <div className="space-y-4 text-sm">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold text-foreground text-base mb-2">
                What is Indian Alliance Services?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Indian Alliance Services is an Indian aviation career guidance, training advisory, and opportunity portal with nationwide counselling support across India.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold text-foreground text-base mb-2">
                What does Indian Alliance Services do?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Indian Alliance Services provides profile eligibility assessment, career counselling, training guidance, mock interview preparation, and opportunity coordination for airport ground staff, customer service executives, cargo handlers, and airline support roles.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold text-foreground text-base mb-2">
                Who leads Indian Alliance Services?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Indian Alliance Services was founded by Anthony Ghospade (Founder & CEO), supported by Assistant Manager Aditya Gujral, Senior Assistant Manager P.K. Chadda, and Senior HR Leaders including Alia Mirza, Ankita Singh, Divya Sharma, Teena Roy, and Anamika Shinde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Connect with Our"
        highlight="Career Advisors?"
        description="Get personalized career advice tailored to your eligibility and start your aviation journey today."
        primaryCtaText="Get Career Counselling"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Aviation Career Paths"
        secondaryCtaLink="/careers"
      />

      <EnquiryModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
