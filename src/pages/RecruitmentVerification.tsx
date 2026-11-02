import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  FileCheck,
  Search,
  XCircle,
  GraduationCap,
  Printer,
  RotateCcw,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import logoImage from "@/assets/logo.png";
import { studentService, PublicVerificationResult } from "@/services/studentService";
import { useSiteConfig } from "@/context/SiteConfigContext";

const verificationSteps = [
  {
    step: "01",
    title: "Check the Sender Channel & Domain",
    desc: "Verify that all email correspondence arrives strictly from our verified domain or official helpdesk (support@indianallianceservices.com) and that website links point exclusively to indianallianceservices.com.",
  },
  {
    step: "02",
    title: "Verify the Recruiter Name with Our Team",
    desc: "Our official talent acquisition coordinators conduct official screening. You can cross-check any caller's identity via our helpline.",
  },
  {
    step: "03",
    title: "Review the Nature of Information Requested",
    desc: "Legitimate Indian Alliance Services screening only asks for standard career evaluation details (highest qualification, age, height, spoken language, and preferred airport location).",
  },
  {
    step: "04",
    title: "Protect Sensitive Financial Data",
    desc: "Indian Alliance Services never asks for OTPs, NetBanking passwords, UPI PINs, or direct personal account money transfers over the phone or SMS.",
  },
];

const verificationFaqs = [
  {
    q: "How do I know if an SMS, WhatsApp message, or email from Indian Alliance Services is genuine?",
    a: "Check if the communication directs you to our official portal (indianallianceservices.com) or official email (support@indianallianceservices.com). You can also use the interactive verification lookup tool above to verify student registration numbers directly.",
  },
  {
    q: "What documents does Indian Alliance Services legitimately ask candidates to submit?",
    a: "During profile assessment, our team may ask for copies of your educational certificates (10th/12th/degree marksheets), resume/CV, government ID proof (Aadhaar/Passport for age and identity verification), and passport-size photographs.",
  },
  {
    q: "What should I do if I suspect an unverified caller claiming to be from Indian Alliance Services?",
    a: "Do not share any OTPs, financial details, or sensitive personal documents. Note down the caller's phone number and email our verified helpdesk at support@indianallianceservices.com with the details for immediate verification.",
  },
  {
    q: "Does Indian Alliance Services charge any security deposits via WhatsApp or personal UPI?",
    a: "No. Indian Alliance Services does not solicit personal WhatsApp transfers, cash deposits, or informal UPI payments. All official communication is routed through our registered corporate channels.",
  },
];

export default function RecruitmentVerification() {
  const { settings } = useSiteConfig();
  const [searchParams] = useSearchParams();

  // Candidate Verification State
  const [studentRegInput, setStudentRegInput] = useState("");
  const [isVerifyingStudent, setIsVerifyingStudent] = useState(false);
  const [hasSearchedStudent, setHasSearchedStudent] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState<PublicVerificationResult | null>(null);
  const [studentErrorMessage, setStudentErrorMessage] = useState<string | null>(null);

  // Candidate Verification Handler
  const executeStudentVerification = async (appNo: string) => {
    const trimmed = appNo.trim();
    if (!trimmed) {
      setStudentErrorMessage("Please enter a valid Application Number.");
      return;
    }

    setStudentErrorMessage(null);
    setIsVerifyingStudent(true);
    setHasSearchedStudent(true);

    try {
      const res = await studentService.verifyStudent(trimmed);
      if (res.error) {
        setStudentErrorMessage(res.error);
        setVerifiedStudent(null);
      } else if (res.verified && res.data) {
        setVerifiedStudent(res.data);
        setStudentErrorMessage(null);
      } else {
        setVerifiedStudent(null);
        setStudentErrorMessage(null);
      }
    } catch {
      setStudentErrorMessage("Verification service error. Please try again.");
      setVerifiedStudent(null);
    } finally {
      setIsVerifyingStudent(false);
    }
  };

  const handleVerifyStudent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeStudentVerification(studentRegInput);
  };

  const handleResetStudent = () => {
    setStudentRegInput("");
    setHasSearchedStudent(false);
    setVerifiedStudent(null);
    setStudentErrorMessage(null);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // URL Parameter Detection
  useEffect(() => {
    const appParam =
      searchParams.get("app") ||
      searchParams.get("application") ||
      searchParams.get("application_number") ||
      searchParams.get("reg") ||
      searchParams.get("registration") ||
      searchParams.get("code") ||
      searchParams.get("ref") ||
      searchParams.get("id");

    if (appParam && appParam.trim()) {
      const trimmed = appParam.trim();
      setStudentRegInput(trimmed);
      executeStudentVerification(trimmed);
    }
  }, [searchParams]);

  const verificationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://indianallianceservices.com/verify/#page",
        url: "https://indianallianceservices.com/verify",
        name: "Student Verification | Indian Alliance Services",
        description: "Official portal to verify enrolled student records, training credentials, and course completion certificates.",
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
            name: "Student Verification",
            item: "https://indianallianceservices.com/verify",
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
        title="Student Verification | Indian Alliance Services"
        description="Verify the authenticity of Indian Alliance Services enrolled student records, credentials, and course completion certificates using the official registration number."
        canonical="https://indianallianceservices.com/verify"
        schema={verificationSchema}
      />

      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Student Verification" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 mb-4 shadow-md">
              <GraduationCap className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                Official Student Verification Portal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Student <span className="gold-gradient-text">Verification</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Verify enrolled candidate status, training credentials, and course completion certificates using the official Indian Alliance Services registration number.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Student Verification Lookup Tool */}
      <section className="py-12 bg-secondary/5 border-b border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-3xl border border-secondary/30 p-6 sm:p-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Candidate Credentials & Status Verification
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Verify the authenticity of an Indian Alliance Services candidate application and training status using the official application number.
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyStudent} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Application Number * (e.g. IAS-APP-2026/8425 or 8420)"
                      value={studentRegInput}
                      onChange={(e) => setStudentRegInput(e.target.value)}
                      required
                      className="w-full text-sm bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary font-mono uppercase"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isVerifyingStudent}
                    variant="hero"
                    className="py-3.5 px-6 font-bold text-sm shrink-0 gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950"
                  >
                    {isVerifyingStudent ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>Verify Application</span>
                      </>
                    )}
                  </Button>
                  {hasSearchedStudent && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetStudent}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      <RotateCcw className="h-4 w-4 mr-1.5" />
                      Reset
                    </Button>
                  )}
                </div>
              </form>

              {studentErrorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{studentErrorMessage}</span>
                </div>
              )}

              {/* VERIFIED CANDIDATE RESULT CARD */}
              {hasSearchedStudent && !isVerifyingStudent && verifiedStudent && (
                <div id="print-student-area" className="mt-6 animate-in fade-in-50 duration-500">
                  <div className={`border-2 ${
                    verifiedStudent.status === "Failed" ? "border-rose-500" : "border-emerald-500"
                  } rounded-3xl shadow-xl bg-card overflow-hidden`}>
                    {/* Official Verified Banner */}
                    <div className={`${
                      verifiedStudent.status === "Failed" ? "bg-rose-600" : "bg-emerald-600"
                    } px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
                      <div className="flex items-center space-x-2.5">
                        {verifiedStudent.status === "Failed" ? (
                          <AlertCircle className="w-6 h-6 text-white shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                        )}
                        <div>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight">
                            {verifiedStudent.status === "Failed"
                              ? "Candidate Assessment Record Found"
                              : "Candidate Record Verified Active"}
                          </h3>
                          <p className="text-xs text-white/90">
                            {verifiedStudent.status === "Failed"
                              ? "Official record in Indian Alliance Services database: Assessment Not Cleared"
                              : "Official record confirmed in Indian Alliance Services database"}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white text-slate-900 font-bold uppercase tracking-wider text-xs shrink-0 self-start sm:self-auto shadow-sm">
                        {verifiedStudent.status === "Failed" ? "Status: Failed" : "Authentic Record"}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Logo header */}
                      <div className="flex items-center justify-between border-b border-border/80 pb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={logoImage}
                            alt="Indian Alliance Services"
                            className="h-12 w-auto object-contain"
                          />
                          <div>
                            <p className="font-bold text-foreground text-sm sm:text-base">
                              Indian Alliance Services
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Aviation Careers & Training Academy
                            </p>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-muted-foreground block uppercase font-semibold">
                            Verification Timestamp
                          </span>
                          <span className="text-xs font-mono font-medium text-foreground">
                            {new Date().toLocaleDateString("en-GB")}
                          </span>
                        </div>
                      </div>

                      {/* Photo & Details row */}
                      <div className="flex flex-col sm:flex-row gap-6 bg-muted/40 p-5 sm:p-6 rounded-2xl border border-border items-start">
                        {/* Passport Photo */}
                        <div className="shrink-0 flex flex-col items-center mx-auto sm:mx-0">
                          <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 shadow-md bg-background p-1 flex items-center justify-center">
                            {verifiedStudent.photo_url ? (
                              <img
                                src={verifiedStudent.photo_url}
                                alt={verifiedStudent.student_name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <User className="w-12 h-12 text-muted-foreground/60" />
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">
                            Candidate Photo
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm flex-1 w-full">
                          <div>
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Candidate Name
                            </span>
                            <span className="text-foreground font-bold text-base sm:text-lg mt-0.5 block">
                              {verifiedStudent.student_name}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Father's Name (S/O, D/O)
                            </span>
                            <span className="text-foreground font-semibold text-sm sm:text-base mt-0.5 block">
                              {verifiedStudent.father_name}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-border/60">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Application Number
                            </span>
                            <span className="text-amber-500 dark:text-amber-400 font-mono font-bold text-base mt-0.5 block">
                              {verifiedStudent.application_number}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-border/60">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Training Status
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${
                                verifiedStudent.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                  : verifiedStudent.status === "Joining"
                                  ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
                                  : verifiedStudent.status === "Rejoining"
                                  ? "bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30"
                                  : verifiedStudent.status === "Failed"
                                  ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                                  : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                              }`}
                            >
                              {verifiedStudent.status === "Completed"
                                ? "Completed"
                                : verifiedStudent.status === "Joining"
                                ? "Joining"
                                : verifiedStudent.status === "Rejoining"
                                ? "Rejoining"
                                : verifiedStudent.status === "Failed"
                                ? "Training Assessment Failed"
                                : "Verified Active Trainee"}
                            </span>
                          </div>

                          {verifiedStudent.interview_date && (
                            <div className="pt-2 border-t border-border/60">
                              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                Interview Date
                              </span>
                              <span className="text-foreground font-mono font-semibold text-sm mt-0.5 block">
                                {verifiedStudent.interview_date}
                              </span>
                            </div>
                          )}

                          {verifiedStudent.date_of_birth && (
                            <div className="pt-2 border-t border-border/60">
                              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                Date of Birth
                              </span>
                              <span className="text-foreground font-semibold text-sm mt-0.5 block">
                                {verifiedStudent.date_of_birth}
                              </span>
                            </div>
                          )}

                          <div className="sm:col-span-2 pt-2 border-t border-border/60">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Course / Program Enrolled
                            </span>
                            <span className="text-foreground font-bold text-sm sm:text-base mt-0.5 block">
                              {verifiedStudent.course_name}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-border/60">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Batch Code
                            </span>
                            <span className="text-foreground font-mono font-bold text-xs sm:text-sm mt-0.5 block text-primary">
                              {verifiedStudent.batch_code || `IAS-TRG-${verifiedStudent.application_number.replace(/\D/g, "")}`}
                            </span>
                          </div>

                          {(verifiedStudent.placement_date || verifiedStudent.course_start_date) && (
                            <div className="pt-2 border-t border-border/60">
                              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                Date of Placement
                              </span>
                              <span className="text-foreground font-mono text-xs sm:text-sm mt-0.5 block">
                                {verifiedStudent.placement_date || verifiedStudent.course_start_date}
                              </span>
                            </div>
                          )}

                          {(verifiedStudent.visiting_date || verifiedStudent.course_end_date) && (
                            <div className="pt-2 border-t border-border/60">
                              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                Visiting Date
                              </span>
                              <span className="text-foreground font-mono text-xs sm:text-sm mt-0.5 block">
                                {verifiedStudent.visiting_date || verifiedStudent.course_end_date}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Failure / Assessment Explanation Note */}
                      {verifiedStudent.failure_reason && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 space-y-2.5">
                          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>Official Assessment Note & Reason for Status</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground leading-relaxed bg-background/80 p-3.5 rounded-xl border border-rose-500/20 font-medium">
                            {verifiedStudent.failure_reason}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            For re-evaluation or counseling guidance, please contact our verified helpline at{" "}
                            <a href={`tel:${settings.helplinePhone}`} className="text-amber-500 underline font-semibold">
                              {settings.helplinePhone}
                            </a>{" "}
                            or email{" "}
                            <a href={`mailto:${settings.supportEmail}`} className="text-amber-500 underline font-semibold">
                              {settings.supportEmail}
                            </a>.
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-3 border-t border-border print:hidden">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrintSlip}
                          className="w-full sm:w-auto border-border text-foreground hover:bg-muted"
                        >
                          <Printer className="w-4 h-4 mr-2" />
                          Print Verification Slip
                        </Button>
                        <Button
                          type="button"
                          onClick={handleResetStudent}
                          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Verify Another Candidate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NOT FOUND ALERT */}
              {hasSearchedStudent && !isVerifyingStudent && !verifiedStudent && !studentErrorMessage && (
                <div className="mt-6 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base text-rose-800 dark:text-rose-300">
                        Candidate Record Not Found
                      </h4>
                      <p className="text-xs text-rose-700 dark:text-rose-300/90 mt-1 leading-relaxed">
                        No active candidate record was found matching Application Number{" "}
                        <span className="font-mono font-bold">"{studentRegInput}"</span>. Please double-check the application number on your document and try again.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Need assistance? Contact our verified helpdesk at{" "}
                        <a href={`tel:${settings.helplinePhone}`} className="text-amber-500 underline font-semibold">
                          {settings.helplinePhone}
                        </a>{" "}
                        or email{" "}
                        <a href={`mailto:${settings.supportEmail}`} className="text-amber-500 underline font-semibold">
                          {settings.supportEmail}
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
            highlight="Indian Alliance Services?"
            description="Follow our four-step authenticity checklist before sharing documents or confirming interview schedules."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {verificationSteps.map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-3xl border border-border p-7 shadow-sm hover:border-secondary/50 transition-all flex flex-col justify-between"
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
          <div className="max-w-4xl mx-auto bg-card rounded-3xl border border-secondary/40 p-6 sm:p-8 shadow-md">
            <h3 className="text-xl font-heading font-bold text-foreground border-b border-border pb-3 mb-6">
              Official & Verified Indian Alliance Services Channels
            </h3>

            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Website
                </div>
                <div className="font-bold text-foreground">
                  indianallianceservices.com
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
                  href="mailto:support@indianallianceservices.com"
                  className="font-bold text-secondary hover:underline break-all block"
                >
                  support@indianallianceservices.com
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
          WHAT INFORMATION IAS REQUESTS VS NEVER REQUESTS
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
            {/* What IAS May Request */}
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl p-7">
              <div className="flex items-center gap-2.5 text-secondary font-bold text-lg mb-4">
                <FileCheck className="h-6 w-6" />
                <span>What Indian Alliance Services May Legitimately Request:</span>
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
            <div className="bg-destructive/15 border border-destructive/30 rounded-3xl p-7">
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
          FAQ ON VERIFICATION
          ================================================== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading
            badge="Verification FAQ"
            title="Frequently Asked Questions on"
            highlight="Recruitment Verification"
            description="Clear, authoritative answers for candidates verifying message authenticity."
          />

          <div className="space-y-4 text-sm">
            {verificationFaqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-heading font-bold text-foreground text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-muted/50 rounded-3xl border border-border p-6 text-center space-y-3">
            <h4 className="font-heading font-bold text-foreground text-base">
              Still Unsure About a Message You Received?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Forward your message or caller details directly to our official verification email:
            </p>
            <div>
              <a
                href="mailto:support@indianallianceservices.com?subject=Recruitment%20Verification%20Query"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail className="h-4 w-4" /> Email support@indianallianceservices.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
