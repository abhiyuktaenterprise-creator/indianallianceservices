import React, { useState } from "react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import EnquiryModal from "@/components/common/EnquiryModal";
import {
  CheckCircle2,
  Sparkles,
  BookOpen,
  UserCheck,
  Plane,
  HelpCircle,
  Award,
  Video,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const interviewCategories = [
  {
    id: "grooming",
    title: "Grooming & Professional Attire Standards",
    icon: UserCheck,
    description: "Aviation recruiters judge professional grooming within the first 10 seconds of meeting you.",
    tips: [
      {
        heading: "For Female Candidates (Cabin Crew & CSA)",
        points: [
          "Formal western business attire (skirt suit or well-fitted trouser suit in Navy Blue/Black/Charcoal).",
          "Hair tied back neatly in a French twist or sleek low donut bun with net.",
          "Natural day makeup with defined eyeliner, mascara, and standard neutral/red lipstick matching skin tone.",
          "Clean, well-manicured nails with clear or neutral polish (no chipped paint).",
          "Formal closed-toe pump shoes with 1.5 to 2.5 inch heels.",
        ],
      },
      {
        heading: "For Male Candidates (Ground Staff & Operations)",
        points: [
          "Crisp pressed white/light-blue shirt with tailored trousers and dark blazer.",
          "Conservative necktie properly knotted, matching the suit colour.",
          "Clean-shaven appearance or neatly trimmed beard according to airline guidelines.",
          "Polished formal black Oxford/Derby leather shoes with dark socks.",
          "Professional groomed haircut and subtle, fresh fragrance.",
        ],
      },
    ],
  },
  {
    id: "questions",
    title: "Top Ground Staff & Cabin Crew Questions",
    icon: HelpCircle,
    description: "Model answers and reasoning frameworks commonly asked by IndiGo, Air India, SpiceJet & Akasa Air panels.",
    tips: [
      {
        heading: "1. 'Why do you want to join the aviation industry?'",
        points: [
          "Focus on customer passion, dynamic work environment, and fast-paced learning opportunities.",
          "Avoid saying 'I love traveling' as your only answer — recruiters want customer service dedication and crisis resilience.",
        ],
      },
      {
        heading: "2. 'How would you handle an irate passenger with delayed baggage?'",
        points: [
          "Use the **LAST** method: **L**isten actively without interrupting, **A**pologize sincerely for the inconvenience, **S**olve with PIR (Property Irregularity Report) filing, and **T**hank them for their patience.",
          "Demonstrate empathy while strictly adhering to airline security protocols.",
        ],
      },
      {
        heading: "3. 'How do you handle irregular shifts and emergency weather diversions?'",
        points: [
          "Emphasize mental adaptability, stamina, punctuality, and team coordination.",
          "Give examples of handling high-stress situations or multitasking under strict timelines.",
        ],
      },
    ],
  },
  {
    id: "assessment",
    title: "Group Discussion & Aptitude Rounds",
    icon: BookOpen,
    description: "Proven techniques to stand out during airline Group Discussions (GD) and Voice & Accent tests.",
    tips: [
      {
        heading: "Aviation Group Discussion Rules",
        points: [
          "Never shout, interrupt aggressively, or dominate the conversation.",
          "Acknowledge fellow candidates: 'I agree with your point, and I would like to add...'",
          "Maintain strong eye contact, erect posture, and pleasant facial expression throughout.",
          "Initiating or summarizing the discussion earns top recruiter scoring marks.",
        ],
      },
      {
        heading: "Voice, Accent & Communication Screening",
        points: [
          "Speak with clear enunciation and measured pace (avoid speaking too rapidly).",
          "Practice standard English numbers, phonetic alphabet (Alpha, Bravo, Charlie) and airline city codes.",
          "Avoid mother-tongue influence (MTI) on common sounds like 'S/SH', 'P/F', and 'V/W'.",
        ],
      },
    ],
  },
];

const importantDocs = [
  "Updated Aviation-Format Resume / CV (2 Printed Copies)",
  "Original 10th & 12th Marksheets + Passing Certificates",
  "Graduation Degree / Final Semester Marksheet (if applicable)",
  "Valid Indian Passport (Original + 2 photocopies)",
  "Aadhaar Card & PAN Card for verification",
  "8 Passport-size and 2 Full-length photographs in white background",
];

export default function InterviewTips() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grooming");

  return (
    <>
      <SEO
        title="Aviation Interview Tips & Grooming Guide | Indian Alliance Services"
        description="Comprehensive airline interview preparation masterclass by Indian Alliance Services. Cabin crew grooming rules, top ground staff interview Q&As, and mock screening guidelines."
        keywords="aviation interview questions, ground staff interview tips, cabin crew grooming, airport job interview, mock interview guidance, Indian Alliance Services interview prep"
        canonical="https://indianallianceservices.com/interview-tips"
      />

      {/* Hero Section */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Interview Tips" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md text-gold text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Indian Alliance Services Career Academy
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
              Master Your Airline & Airport <span className="gold-gradient-text">Job Interviews</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed mb-6 font-normal">
              Expert grooming guidelines, real situational interview questions, Group Discussion frameworks, and personal coaching from seasoned airline instructors.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="gap-2 font-extrabold shadow-lg rounded-2xl px-6 py-5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950"
              >
                <Award className="h-4 w-4" /> Book Mock Interview Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 bg-card rounded-3xl border border-border p-5 shadow-sm space-y-3">
                <h3 className="font-heading font-extrabold text-base text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gold" /> Modules & Guides
                </h3>
                {interviewCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`w-full flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground border border-gold/40 shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${isActive ? "text-gold" : "text-muted-foreground"}`} />
                      <div>
                        <div className={`text-xs font-extrabold ${isActive ? "text-white" : "text-foreground"}`}>
                          {cat.title}
                        </div>
                        <div className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                          {cat.description}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Important Documents Box */}
                <div className="mt-6 pt-5 border-t border-border/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 mb-3">
                    <FileText className="h-4 w-4 text-amber-500" /> Mandatory Walk-in Checklist
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {importantDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Tab Content */}
            <div className="lg:w-2/3">
              {interviewCategories
                .filter((cat) => cat.id === activeTab)
                .map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className="space-y-6 animate-in fade-in duration-200">
                      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h2 className="text-xl md:text-2xl font-heading font-extrabold text-foreground">
                              {cat.title}
                            </h2>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {cat.description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6 mt-6">
                          {cat.tips.map((section, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl bg-muted/40 p-5 border border-border/60 space-y-3"
                            >
                              <h3 className="text-sm md:text-base font-heading font-bold text-foreground flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-secondary" />
                                {section.heading}
                              </h3>
                              <ul className="space-y-2">
                                {section.points.map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mock Interview CTA */}
                      <div className="rounded-2xl bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 p-6 border border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h4 className="font-heading font-bold text-base text-foreground">
                            Want 1-on-1 Practice with Airline Experts?
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Book a simulated video interview round with personalized feedback on grooming and voice tone.
                          </p>
                        </div>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => setIsModalOpen(true)}
                          className="shrink-0 gap-2 font-semibold shadow-md"
                        >
                          <Video className="h-4 w-4" /> Book Mock Round
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultRole="mock-interview"
      />
    </>
  );
}
