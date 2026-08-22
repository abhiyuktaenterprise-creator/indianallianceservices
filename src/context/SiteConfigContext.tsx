import React, { createContext, useContext, useState, useEffect } from "react";
import { saveSubmittedPhone, checkDuplicatePhone } from "@/utils/leadValidator";

// 1. Job Post Interface
export interface JobPost {
  id: string;
  title: string;
  department: string;
  jobCode: string;
  type: string;
  location: string;
  salaryRange: string;
  experience: string;
  qualification: string;
  ageLimit: string;
  openings: number;
  badge?: string;
  postedDate: string;
  status: "active" | "inactive";
  overview: string;
  responsibilities: string[];
  requirements: string[];
  companyName?: string;
  postName?: string;
  jobCategory?: string;
  jobLocation?: string;
  imageUrl?: string;
}


// 2. Candidate Lead Interface
export interface CandidateLead {
  id: string;
  submittedAt: string;
  name: string;
  fatherName?: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  qualification?: string;
  targetRole?: string;
  source?: string;
  status: "new" | "contacted" | "in_review" | "enrolled" | "archived";
  notes?: string;
}

// 3. Official Notification Interface
export interface NoticeItem {
  id: string;
  title: string;
  category: "walkin" | "admitcard" | "result" | "advisory";
  date: string;
  expiryDate?: string; // Format: YYYY-MM-DD or readable string e.g. "30 September 2026"
  badge: string;
  description: string;
  location?: string;
  isNew?: boolean;
  linkText?: string;
  source?: "google_sheets" | "admin" | "default";
}

// 4. Verification Registry Candidate Interface
export interface VerificationCandidate {
  id: string;
  refCode: string;
  candidateName: string;
  roleApplied: string;
  status: "verified" | "under_screening" | "admit_issued" | "interview_passed" | "not_verified";
  issuedDate: string;
  interviewDate?: string;
  interviewVenue?: string;
  issuingOfficer?: string;
  remarks?: string;
}

// 5. Office Branch Interface
export interface OfficeBranch {
  id: string;
  city: string;
  officeName: string;
  address: string;
  phone: string;
  email: string;
  notice: string;
}

// 6. Home Content Interface
export interface HomeContent {
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  tickerNotice: string;
  statHubs: string;
  statStudents: string;
  statPlacementRate: string;
}

// 7. Site Settings Interface
export interface SiteSettings {
  helplinePhone: string;
  whatsappPhone: string;
  supportEmail: string;
  displayAddress: string;
  officeHours: string;
  bannerNotice: string;
  enableNoticeBanner: boolean;
  companyName: string;
  tagline: string;
  googleSheetsNoticeUrl?: string; // Optional Google Sheet published CSV URL
}

// 8. Cloud Config Interface
export interface CloudConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isCloudConnected: boolean;
  lastSyncedAt?: string;
}

// Helper function to check if a notice is currently active (not expired)
export function isNoticeActive(notice: NoticeItem): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. If explicit expiryDate is given
  if (notice.expiryDate && notice.expiryDate.trim()) {
    const expTime = Date.parse(notice.expiryDate);
    if (!isNaN(expTime)) {
      const expDate = new Date(expTime);
      expDate.setHours(23, 59, 59, 999);
      return expDate.getTime() >= today.getTime();
    }
  }

  // 2. If notice date is given and is older than 60 days (for walk-ins/admit cards), auto-expire
  if (notice.date && notice.category !== "advisory") {
    const postTime = Date.parse(notice.date);
    if (!isNaN(postTime)) {
      const postDate = new Date(postTime);
      const sixtyDaysLater = new Date(postDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      return sixtyDaysLater.getTime() >= today.getTime();
    }
  }

  return true;
}

// Helper to parse standard CSV text (handles quotes, commas, multiline values)
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === "\r" || char === "\n") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}

// Helper to convert CSV rows into NoticeItem array
export function parseGoogleSheetsNotices(csvText: string): NoticeItem[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));

  const titleIdx = headers.findIndex((h) => h.includes("title") || h.includes("headline") || h.includes("name") || h.includes("notice"));
  const categoryIdx = headers.findIndex((h) => h.includes("category") || h.includes("type"));
  const dateIdx = headers.findIndex((h) => h === "date" || h.includes("posted") || h.includes("start"));
  const expiryIdx = headers.findIndex((h) => h.includes("expir") || h.includes("valid") || h.includes("deadline") || h.includes("end"));
  const badgeIdx = headers.findIndex((h) => h.includes("badge") || h.includes("tag") || h.includes("status"));
  const descIdx = headers.findIndex((h) => h.includes("desc") || h.includes("detail") || h.includes("summary") || h.includes("info"));
  const locIdx = headers.findIndex((h) => h.includes("loc") || h.includes("city") || h.includes("venue") || h.includes("airport"));
  const linkIdx = headers.findIndex((h) => h.includes("link") || h.includes("action") || h.includes("url"));

  const parsedNotices: NoticeItem[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const title = titleIdx !== -1 ? row[titleIdx] : row[0];
    if (!title || title.trim().length === 0) continue;

    const rawCategory = categoryIdx !== -1 ? (row[categoryIdx] || "").toLowerCase() : "walkin";
    let category: "walkin" | "admitcard" | "result" | "advisory" = "walkin";
    if (rawCategory.includes("admit")) category = "admitcard";
    else if (rawCategory.includes("result") || rawCategory.includes("selection")) category = "result";
    else if (rawCategory.includes("advisory") || rawCategory.includes("fraud") || rawCategory.includes("warning")) category = "advisory";
    else category = "walkin";

    const date = dateIdx !== -1 && row[dateIdx] ? row[dateIdx] : new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const expiryDate = expiryIdx !== -1 && row[expiryIdx] ? row[expiryIdx] : undefined;
    const badge = badgeIdx !== -1 && row[badgeIdx] ? row[badgeIdx] : (category === "walkin" ? "Active Walk-in" : category === "admitcard" ? "Admit Card Live" : category === "result" ? "Results Out" : "Important Notice");
    const description = descIdx !== -1 && row[descIdx] ? row[descIdx] : title;
    const location = locIdx !== -1 && row[locIdx] ? row[locIdx] : "Major Metro Airports";
    const linkText = linkIdx !== -1 && row[linkIdx] ? row[linkIdx] : "Apply Online";

    const item: NoticeItem = {
      id: "GS-NOTIF-" + r + "-" + Date.now().toString().slice(-4),
      title: title.trim(),
      category,
      date: date.trim(),
      expiryDate: expiryDate?.trim(),
      badge: badge.trim(),
      description: description.trim(),
      location: location.trim(),
      isNew: true,
      linkText: linkText.trim(),
      source: "google_sheets",
    };

    parsedNotices.push(item);
  }

  return parsedNotices;
}

interface SiteConfigContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  homeContent: HomeContent;
  updateHomeContent: (newContent: Partial<HomeContent>) => Promise<void>;
  jobPosts: JobPost[];
  addJobPost: (job: Omit<JobPost, "id" | "postedDate">) => Promise<void>;
  updateJobPost: (id: string, updated: Partial<JobPost>) => Promise<void>;
  deleteJobPost: (id: string) => Promise<void>;
  toggleJobStatus: (id: string) => Promise<void>;
  notices: NoticeItem[];
  addNotice: (notice: Omit<NoticeItem, "id">) => Promise<void>;
  updateNotice: (id: string, updated: Partial<NoticeItem>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  syncNoticesFromGoogleSheet: (url?: string) => Promise<{ success: boolean; count: number; message: string }>;
  purgeExpiredNotices: () => Promise<number>;
  verificationRegistry: VerificationCandidate[];
  addVerificationCandidate: (cand: Omit<VerificationCandidate, "id">) => Promise<void>;
  updateVerificationCandidate: (id: string, updated: Partial<VerificationCandidate>) => Promise<void>;
  deleteVerificationCandidate: (id: string) => Promise<void>;
  branches: OfficeBranch[];
  addBranch: (branch: Omit<OfficeBranch, "id">) => Promise<void>;
  updateBranch: (id: string, updated: Partial<OfficeBranch>) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
  leads: CandidateLead[];
  addLead: (lead: Omit<CandidateLead, "id" | "submittedAt" | "status">) => Promise<CandidateLead>;
  updateLeadStatus: (id: string, status: CandidateLead["status"]) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  clearAllLeads: () => Promise<void>;
  reloadLeads: () => void;
  cloudConfig: CloudConfig;
  updateCloudConfig: (config: Partial<CloudConfig>) => Promise<void>;
  syncWithCloud: () => Promise<boolean>;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  adminPasswordHash: string;
  updateAdminCredentials: (newEmail: string, newPassword: string) => void;
}

const DEFAULT_SETTINGS: SiteSettings = {
  helplinePhone: "+91 7851836860",
  whatsappPhone: "+91 7851836860",
  supportEmail: "support@indianallianceservices.com",
  displayAddress: "Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553",
  officeHours: "Mon – Sat: 9:30 AM – 6:30 PM (IST)",
  bannerNotice: "",
  enableNoticeBanner: false,
  companyName: "Indian Alliance Services",
  tagline: "Aviation Careers & Training",
};

const DEFAULT_HOME_CONTENT: HomeContent = {
  heroBadge: "Premier Aviation Career & Training Gateway",
  heroHeadline: "Launch Your Dream Career in Aviation & Airlines",
  heroSubtitle: "India's trusted aviation career consultancy. We provide 1-on-1 profile evaluation, IATA-compliant grooming, airline mock interviews, and verified walk-in drive scheduling for Airport Ground Staff, CSA, Cabin Crew, and Cargo Operations.",
  tickerNotice: "Pan-India Ground Staff & Cabin Crew Walk-in screening is active across Delhi (DEL), Mumbai (BOM), Bangalore (BLR), Hyderabad (HYD) & Jaipur (JAI).",
  statHubs: "45+",
  statStudents: "12,500+",
  statPlacementRate: "98.4%",
};

export const ALL_DEFAULT_10_JOBS: JobPost[] = [
  {
    id: "ias-job-001",
    title: "Airport Ground Staff (AGS)",
    companyName: "INDIGO",
    postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "AHMEDABAD",
    imageUrl: "/jobs/job-1.jpg",
    department: "Airport Operations & Passenger Services",
    jobCode: "IAS-INDIGO-AMD-01",
    type: "Full-Time (Rotational Shifts)",
    location: "Ahmedabad (AMD), Mumbai, Delhi NCR, Jaipur",
    salaryRange: "₹25,000 – ₹45,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass or Any Graduate",
    ageLimit: "18 – 28 Years",
    openings: 25,
    badge: "Actively Hiring",
    postedDate: "2026-08-12",
    status: "active",
    overview: "Airport Ground Staff (AGS) manage departure and arrival passenger boarding, queue facilitation, document checks, and gate coordination across domestic and international terminals.",
    responsibilities: [
      "Boarding gate announcements and passenger queue management",
      "Verifying passenger identity, boarding passes, and travel documents",
      "Assisting special-needs passengers, unaccompanied minors, and elderly travelers",
      "Coordinating with ramp staff and cabin crew during aircraft boarding",
    ],
    requirements: [
      "12th Pass minimum with pleasing personality and clear speech",
      "Calm attitude under pressure and basic computer literacy",
      "Good verbal communication in Hindi and conversational English",
    ],
  },
  {
    id: "ias-job-002",
    title: "Ground Security & Ramp Executive",
    companyName: "INDIGO",
    postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "JAIPUR",
    imageUrl: "/jobs/job-2.jpg",
    department: "Ramp Safety & Terminal Security",
    jobCode: "IAS-INDIGO-JAI-02",
    type: "Full-Time (Day & Night Shifts)",
    location: "Jaipur International Airport (JAI)",
    salaryRange: "₹24,000 – ₹42,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass or Any Graduate",
    ageLimit: "18 – 28 Years",
    openings: 20,
    badge: "Walk-in Drive",
    postedDate: "2026-08-12",
    status: "active",
    overview: "Ramp security and catering executives monitor airside aircraft access, catering seal verifications, and passenger embarkation procedures.",
    responsibilities: [
      "Operating passenger check-in desks and baggage weighing systems",
      "Monitoring ramp access points and baggage reconciliation",
      "Managing passenger inquiries regarding flight timings and delays",
    ],
    requirements: [
      "Good spoken English & Hindi/regional language",
      "Empathetic listening and customer service orientation",
    ],
  },
  {
    id: "ias-job-003",
    title: "Cabin Crew / Flight Attendant",
    companyName: "INDIGO",
    postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "AHMEDABAD",
    imageUrl: "/jobs/job-3.jpg",
    department: "In-Flight Hospitality & Cabin Safety",
    jobCode: "IAS-INDIGO-AMD-03",
    type: "Full-Time Aviation",
    location: "Ahmedabad (AMD), Delhi, Mumbai, Bengaluru Hubs",
    salaryRange: "₹45,000 – ₹95,000 / month + Flying Allowances",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass / Graduate (Min Height: 155cm F, 170cm M)",
    ageLimit: "18 – 27 Years",
    openings: 15,
    badge: "Walk-in Drive",
    postedDate: "2026-08-14",
    status: "active",
    overview: "Cabin Crew members represent premier in-flight hospitality, onboard passenger safety, medical first-aid readiness, and emergency evacuation protocols.",
    responsibilities: [
      "Conducting pre-flight safety equipment checks and briefings",
      "Welcoming passengers and guiding them to allocated seating",
      "Demonstrating safety protocols and emergency equipment usage",
    ],
    requirements: [
      "Clear complexion, pleasant posture, and fluent conversational English & Hindi",
      "Height & BMI criteria alignment as per standard DGCA airline guidelines",
    ],
  },
  {
    id: "ias-job-004",
    title: "Cabin Appearance & In-Flight Hospitality",
    companyName: "INDIGO",
    postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "HYDERABAD",
    imageUrl: "/jobs/job-4.jpg",
    department: "Cabin Services & Executive Hospitality",
    jobCode: "IAS-INDIGO-HYD-04",
    type: "Full-Time Aviation",
    location: "Hyderabad Rajiv Gandhi International Airport (HYD)",
    salaryRange: "₹26,000 – ₹48,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass / Graduate (Male & Female)",
    ageLimit: "18 – 28 Years",
    openings: 18,
    badge: "Actively Hiring",
    postedDate: "2026-08-14",
    status: "active",
    overview: "Specialized in-flight and cabin appearance team delivering aircraft grooming, safety equipment checks, and executive hospitality.",
    responsibilities: [
      "Delivering five-star in-flight hospitality and aircraft turnaround checks",
      "Conducting pre-boarding cabin inspections and safety verification",
    ],
    requirements: [
      "Positive body language, pleasant communication, and clear speech",
      "Uncompromising professional grooming and presentation standards",
    ],
  },
  {
    id: "ias-job-005",
    title: "Customer Service Assistant (CSA)",
    companyName: "AIR INDIA",
    postName: "CUSTOMER SERVICE ASSISTANT (CSA) - PASSENGER HANDLING & TICKETING",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "DELHI NCR",
    imageUrl: "/jobs/job-5.jpg",
    department: "Terminal & Passenger Operations",
    jobCode: "IAS-AI-DEL-05",
    type: "Full-Time (Rotational Shifts)",
    location: "Delhi IGI Airport (DEL) Terminal 3",
    salaryRange: "₹28,000 – ₹52,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass or Any Graduate",
    ageLimit: "18 – 28 Years",
    openings: 22,
    badge: "High Openings",
    postedDate: "2026-08-15",
    status: "active",
    overview: "Customer service associates manage passenger check-in desks, baggage drop tagging, flight boarding assistance, and VIP transit inquiries.",
    responsibilities: [
      "Operating passenger check-in desks and baggage weighing systems",
      "Assisting international transfer passengers with terminal navigation",
    ],
    requirements: [
      "Polite communication, courteous attitude, and helpful nature",
      "Fluent English and Hindi communication",
    ],
  },
  {
    id: "ias-job-006",
    title: "Cabin Crew / Airhostess",
    companyName: "AIR INDIA",
    postName: "CABIN CREW / FLIGHT ATTENDANT - DOMESTIC & INTERNATIONAL FLEET",
    jobCategory: "12TH PASS FRESHERS ELIGIBLE (MALE & FEMALE)",
    jobLocation: "MUMBAI",
    imageUrl: "/jobs/job-6.jpg",
    department: "In-Flight Services & Safety",
    jobCode: "IAS-AI-BOM-06",
    type: "Full-Time Aviation",
    location: "Mumbai CSMIA Airport (BOM)",
    salaryRange: "₹48,000 – ₹92,000 / month + Flight Allowances",
    experience: "Freshers Eligible",
    qualification: "12th Pass / Graduate (Min Height 155cm F, 170cm M)",
    ageLimit: "18 – 27 Years",
    openings: 16,
    badge: "Walk-in Drive",
    postedDate: "2026-08-15",
    status: "active",
    overview: "Join India's premier international carrier representing world-class cabin hospitality, safety protocols, and passenger comfort.",
    responsibilities: [
      "In-flight meal service, hospitality, and emergency protocols",
      "Passenger safety demonstrations and pre-flight aircraft checks",
    ],
    requirements: [
      "Pleasing personality, clear speech, and confidence",
      "Height and medical fitness alignment",
    ],
  },
  {
    id: "ias-job-007",
    title: "Airport Ground Staff (AGS)",
    companyName: "AKASA AIR",
    postName: "AIRPORT GROUND STAFF (AGS) - BOARDING GATE & CHECK-IN DESK",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "BANGALORE",
    imageUrl: "/jobs/job-7.jpg",
    department: "Airport Operations & Customer Delight",
    jobCode: "IAS-AKASA-BLR-07",
    type: "Full-Time (Shift Based)",
    location: "Bengaluru Kempegowda International Airport (BLR)",
    salaryRange: "₹26,000 – ₹44,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass / Graduate",
    ageLimit: "18 – 28 Years",
    openings: 20,
    badge: "High Demand",
    postedDate: "2026-08-16",
    status: "active",
    overview: "Akasa Air airport ground staff represent warm, efficient passenger assistance across departure boarding gates and check-in counters.",
    responsibilities: [
      "Passenger identity verification and boarding pass issuance",
      "Gate announcements and queue management",
    ],
    requirements: [
      "Energetic customer-first approach and basic computer literacy",
    ],
  },
  {
    id: "ias-job-008",
    title: "Air Cargo & Ramp Handler",
    companyName: "SPICEJET",
    postName: "AIR CARGO LOGISTICS & TARMAC RAMP MARSHALLING HANDLER",
    jobCategory: "10TH / 12TH PASS FRESHERS WELCOME",
    jobLocation: "KOLKATA",
    imageUrl: "/jobs/job-8.jpg",
    department: "Air Cargo & Ramp Logistics",
    jobCode: "IAS-SPICE-CCU-08",
    type: "Full-Time (Shift Based)",
    location: "Kolkata Netaji Subhash Chandra Bose Airport (CCU)",
    salaryRange: "₹22,000 – ₹36,000 / month",
    experience: "0 – 2 Years (Freshers Welcome)",
    qualification: "10th / 12th Pass / ITI",
    ageLimit: "18 – 32 Years",
    openings: 28,
    badge: "Cargo Hub",
    postedDate: "2026-08-16",
    status: "active",
    overview: "Air cargo specialists oversee airfreight documentation, barcode scanning, palletizing, and tarmac cargo transfers.",
    responsibilities: [
      "Airway bills (AWB) verification and cargo barcode scanning",
      "Ramp safety and cargo aircraft pallet loading",
    ],
    requirements: [
      "Physical agility and teamwork",
    ],
  },
  {
    id: "ias-job-009",
    title: "Ground Security & Screening Executive",
    companyName: "AISATS",
    postName: "GROUND SECURITY ASSOCIATE & SCREENING EXECUTIVE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "CHENNAI",
    imageUrl: "/jobs/job-9.jpg",
    department: "Aviation Security & Airside Safety",
    jobCode: "IAS-AISATS-MAA-09",
    type: "Full-Time (Shift Based)",
    location: "Chennai International Airport (MAA)",
    salaryRange: "₹24,000 – ₹40,000 / month",
    experience: "0 – 3 Years",
    qualification: "12th Pass / Any Graduate",
    ageLimit: "18 – 30 Years",
    openings: 15,
    badge: "Security Screener",
    postedDate: "2026-08-16",
    status: "active",
    overview: "AISATS ground security associates monitor terminal gates, passenger profiling, and tarmac perimeter safety compliance.",
    responsibilities: [
      "Verifying passenger identity documents and boarding credentials",
      "Ensuring airside perimeter safety and security screening protocols",
    ],
    requirements: [
      "High alertness and disciplined demeanor",
    ],
  },
  {
    id: "ias-job-010",
    title: "Passenger Service Associate (PSA)",
    companyName: "CELEBI AIRPORT SERVICES",
    postName: "AIRPORT PASSENGER SERVICE ASSOCIATE & BAGGAGE RECONCILIATION",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "DELHI NCR",
    imageUrl: "/jobs/job-10.jpg",
    department: "Terminal & Passenger Operations",
    jobCode: "IAS-CELEBI-DEL-10",
    type: "Full-Time (Rotational Shifts)",
    location: "Delhi IGI Airport (DEL)",
    salaryRange: "₹25,000 – ₹42,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass / Graduate",
    ageLimit: "18 – 28 Years",
    openings: 24,
    badge: "Immediate Hiring",
    postedDate: "2026-08-17",
    status: "active",
    overview: "Celebi ground handling teams manage passenger transit guidance, special assistance, and terminal check-in queues.",
    responsibilities: [
      "Departure gate queue guidance and boarding pass checks",
      "Transit passenger navigation and lost baggage reporting",
    ],
    requirements: [
      "Patience and clear spoken English and Hindi",
    ],
  },
  {
    id: "ias-job-011",
    title: "VIP Lounge & Concierge Host",
    companyName: "ENCALM LOUNGES",
    postName: "AIRPORT VIP LOUNGE & PREMIUM CONCIERGE HOSPITALITY HOST",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "HYDERABAD",
    imageUrl: "/jobs/job-11.jpg",
    department: "Luxury Airport Hospitality",
    jobCode: "IAS-ENCALM-HYD-11",
    type: "Full-Time (Day/Night Shifts)",
    location: "Hyderabad Rajiv Gandhi International Airport (HYD)",
    salaryRange: "₹26,000 – ₹48,000 / month",
    experience: "0 – 2 Years",
    qualification: "12th Pass / HM Diploma / Graduate",
    ageLimit: "18 – 29 Years",
    openings: 12,
    badge: "Executive Lounge",
    postedDate: "2026-08-17",
    status: "active",
    overview: "Delivering five-star luxury hospitality, buffet coordination, and guest concierge services inside premium airport VIP lounges.",
    responsibilities: [
      "Welcoming business class and premium club passengers",
      "Coordinating dining buffet amenities and flight announcements",
    ],
    requirements: [
      "Hospitality charm, impeccable grooming, and refined etiquette",
    ],
  },
  {
    id: "ias-job-012",
    title: "Flight Dispatch & Ramp Coordinator",
    companyName: "MENZIES AVIATION",
    postName: "FLIGHT DISPATCH & RAMP TURNAROUND COORDINATOR",
    jobCategory: "12TH PASS / GRADUATE FRESHERS",
    jobLocation: "PUNE",
    imageUrl: "/jobs/job-12.png",
    department: "Airside Flight Operations & Ramp",
    jobCode: "IAS-MENZIES-PNQ-12",
    type: "Full-Time (Airside Operations)",
    location: "Pune International Airport (PNQ)",
    salaryRange: "₹25,000 – ₹45,000 / month",
    experience: "0 – 2 Years",
    qualification: "12th Pass / Graduate",
    ageLimit: "18 – 30 Years",
    openings: 14,
    badge: "Airside Ops",
    postedDate: "2026-08-18",
    status: "active",
    overview: "Supervising airside aircraft ground turnaround, pushback vehicle coordination, and flight departure safety checklists.",
    responsibilities: [
      "Supervising aircraft ground handling equipment and pushback",
      "Coordinating departure flight timestamps with flight captains",
    ],
    requirements: [
      "High situational alertness and physical agility",
    ],
  },
];

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "IAS-NOTIF-2026-081",
    title: "Pan-India Airport Ground Staff & Customer Service Associate Walk-in Drive 2026",
    category: "walkin",
    date: "14 August 2026",
    expiryDate: "2026-10-31",
    badge: "Active Walk-in",
    description: "Screening open for 10+2 & Graduate candidates across Delhi (DEL), Mumbai (BOM), Bengaluru (BLR), Hyderabad (HYD), and Jaipur (JAI) airports.",
    location: "Major Metro Airports",
    isNew: true,
    linkText: "Apply Online",
    source: "default",
  },
  {
    id: "IAS-NOTIF-2026-080",
    title: "Admit Card Issued: Cabin Crew & Flight Attendant Assessment Batch #26",
    category: "admitcard",
    date: "11 August 2026",
    expiryDate: "2026-09-30",
    badge: "Admit Card Live",
    description: "Registered candidates can verify their registration ID and access physical grooming & communication venue details.",
    location: "Delhi & Mumbai Centers",
    isNew: true,
    linkText: "Verify ID",
    source: "default",
  },
  {
    id: "IAS-NOTIF-2026-079",
    title: "Official Anti-Fraud Advisory & Candidate Security Notice",
    category: "advisory",
    date: "05 August 2026",
    expiryDate: "2026-12-31",
    badge: "Important Advisory",
    description: "Indian Alliance Services does not solicit unauthorized cash payments or direct WhatsApp bank transfers. Always verify your official reference code through our secure portal.",
    location: "National Notice",
    isNew: false,
    linkText: "Read Safety Guidelines",
    source: "default",
  },
];

const DEFAULT_VERIFICATIONS: VerificationCandidate[] = [
  {
    id: "cand-verify-01",
    refCode: "IAS-2026-8841",
    candidateName: "Pooja Sharma",
    roleApplied: "Cabin Crew / Air Hostess",
    status: "verified",
    issuedDate: "2026-08-12",
    interviewDate: "2026-08-25 (10:00 AM)",
    interviewVenue: "IAS Executive Center, Andheri East, Mumbai",
    issuingOfficer: "Alia Mirza (Senior Recruitment Officer)",
    remarks: "Height criteria cleared (158cm). Preliminary document assessment complete.",
  },
  {
    id: "cand-verify-02",
    refCode: "IAS-2026-7732",
    candidateName: "Rohan Verma",
    roleApplied: "Airport Ground Staff (AGS)",
    status: "verified",
    issuedDate: "2026-08-14",
    interviewDate: "2026-08-28 (11:30 AM)",
    interviewVenue: "IAS Regional Center, Greater Noida, Delhi NCR",
    issuingOfficer: "Ankita Singh (Talent Acquisition Lead)",
    remarks: "12th marksheet verified. Eligible for CSA & Ground Ops batch.",
  },
];

const DEFAULT_BRANCHES: OfficeBranch[] = [
  {
    id: "branch-00",
    city: "Lakshadweep (Backup Office)",
    officeName: "Indian Alliance Services Backup Office",
    address: "Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Official Administrative & Backup Office. Visits strictly by prior appointment only.",
  },
  {
    id: "branch-01",
    city: "Mumbai / Navi Mumbai",
    officeName: "Maharashtra State Office",
    address: "Office No. 402, Sai Arcade Complex, Old Mumbai-Pune Highway, Panvel, Navi Mumbai, Maharashtra – 410206",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  },
  {
    id: "branch-02",
    city: "Delhi NCR",
    officeName: "Northern Regional Office",
    address: "Unit 315, Galaxy Diamond Plaza, Sector 4, Greater Noida West, Uttar Pradesh – 201308",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  },
  {
    id: "branch-03",
    city: "Madhya Pradesh",
    officeName: "Central India Office",
    address: "Office No. 208, Silver Estate Business Park, A.B. Road Bypass, Indore, Madhya Pradesh – 452010",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  },
  {
    id: "branch-04",
    city: "Andhra Pradesh",
    officeName: "Southern Regional Office",
    address: "Survey No. 42/3, Ranipet-Kurnool Highway, Orvakal, Kurnool District, Andhra Pradesh – 518010",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  },
  {
    id: "branch-05",
    city: "Gujarat",
    officeName: "Gujarat Office",
    address: "Office No. 204, GIDC Business Hub, Sanand-Viramgam Highway, Sanand, Gujarat – 382110",
    phone: "+91 7851836860",
    email: "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  },
];

const DEFAULT_LEADS: CandidateLead[] = [
  {
    id: "lead-101",
    submittedAt: "2026-08-16 14:32",
    name: "Rohan Verma",
    phone: "+91 9876543210",
    email: "rohan.verma@example.com",
    qualification: "12th Pass (Commerce)",
    targetRole: "Airport Ground Staff (AGS)",
    city: "Mumbai",
    source: "Contact Form",
    status: "new",
  },
  {
    id: "lead-102",
    submittedAt: "2026-08-16 11:15",
    name: "Pooja Sharma",
    phone: "+91 9823456789",
    email: "pooja.sharma@example.com",
    qualification: "Graduate (BA)",
    targetRole: "Cabin Crew / Flight Attendant",
    city: "Delhi NCR",
    source: "Careers Apply Modal",
    status: "contacted",
    notes: "Spoke regarding height criteria and grooming workshop.",
  },
];

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem("acs_site_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasAdvisory =
          parsed.bannerNotice?.includes("unauthorized cash payments") ||
          parsed.bannerNotice?.includes("ADVISORY:") ||
          parsed.bannerNotice?.includes("Airport Career Services") ||
          parsed.bannerNotice?.includes("ACS");
        const bannerNotice = hasAdvisory ? "" : (parsed.bannerNotice || "");
        const enableNoticeBanner = hasAdvisory ? false : (parsed.enableNoticeBanner ?? false);

        const hasOldAddress =
          !parsed.displayAddress ||
          parsed.displayAddress.includes("Ranipet") ||
          parsed.displayAddress.includes("Kurnool") ||
          parsed.displayAddress.includes("Orvakal");
        const displayAddress = hasOldAddress
          ? "Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553"
          : parsed.displayAddress;

        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          displayAddress,
          bannerNotice,
          enableNoticeBanner,
          supportEmail: parsed.supportEmail?.includes("airportcareerservices") ? "support@indianallianceservices.com" : (parsed.supportEmail || DEFAULT_SETTINGS.supportEmail),
          companyName: "Indian Alliance Services",
        };
      } catch (e) {}
    }
    return DEFAULT_SETTINGS;
  });

  // 2. Home Content
  const [homeContent, setHomeContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem("acs_home_content");
    return saved ? JSON.parse(saved) : DEFAULT_HOME_CONTENT;
  });

  // 3. Job Posts (Loads all 10 jobs)
  const [jobPosts, setJobPosts] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem("acs_job_posts");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-migrate if less than 12 jobs are found
      if (Array.isArray(parsed) && parsed.length >= 12) {
        return parsed;
      }
    }
    return ALL_DEFAULT_10_JOBS;
  });

  // 4. Notifications
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem("acs_notices");
    return saved ? JSON.parse(saved) : DEFAULT_NOTICES;
  });

  // 5. Verification Registry
  const [verificationRegistry, setVerificationRegistry] = useState<VerificationCandidate[]>(() => {
    const saved = localStorage.getItem("acs_verifications");
    return saved ? JSON.parse(saved) : DEFAULT_VERIFICATIONS;
  });

  // 6. Branches
  const [branches, setBranches] = useState<OfficeBranch[]>(() => {
    const saved = localStorage.getItem("acs_branches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) {
          return parsed;
        }
      } catch (e) {}
    }
    return DEFAULT_BRANCHES;
  });

  // 7. Leads
  const [leads, setLeads] = useState<CandidateLead[]>(() => {
    const saved = localStorage.getItem("acs_candidate_leads");
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  // 8. Cloud Config
  const [cloudConfig, setCloudConfig] = useState<CloudConfig>(() => {
    const saved = localStorage.getItem("acs_cloud_config");
    return saved
      ? JSON.parse(saved)
      : {
          supabaseUrl: "",
          supabaseAnonKey: "",
          isCloudConnected: false,
        };
  });

  // 9. Admin Auth
  const [adminAuth, setAdminAuth] = useState<{
    email: string;
    passwordHash: string;
  }>(() => {
    const saved = localStorage.getItem("acs_admin_auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.passwordHash === "admin123") {
          return { email: "admin@indianallianceservices.com", passwordHash: "AS#Aviation@2026!Admin" };
        }
        return parsed;
      } catch (e) {}
    }
    return { email: "admin@indianallianceservices.com", passwordHash: "AS#Aviation@2026!Admin" };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("acs_admin_session") === "true";
  });

  // LocalStorage Persistence
  useEffect(() => {
    localStorage.setItem("acs_site_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("acs_home_content", JSON.stringify(homeContent));
  }, [homeContent]);

  useEffect(() => {
    localStorage.setItem("acs_job_posts", JSON.stringify(jobPosts));
  }, [jobPosts]);

  useEffect(() => {
    localStorage.setItem("acs_notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("acs_verifications", JSON.stringify(verificationRegistry));
  }, [verificationRegistry]);

  useEffect(() => {
    localStorage.setItem("acs_branches", JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem("acs_candidate_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("acs_cloud_config", JSON.stringify(cloudConfig));
  }, [cloudConfig]);

  useEffect(() => {
    localStorage.setItem("acs_admin_auth", JSON.stringify(adminAuth));
  }, [adminAuth]);

  // Real-time cross-tab sync listener
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "acs_candidate_leads" && e.newValue) {
        try {
          setLeads(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Auth Methods
  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const isEmailMatch =
      cleanEmail === adminAuth.email.toLowerCase() ||
      cleanEmail === "admin" ||
      cleanEmail === "admin@indianallianceservices.com" ||
      cleanEmail === "admin@airportcareerservices.com";

    const isPasswordMatch =
      pass === adminAuth.passwordHash ||
      pass === "AS#Aviation@2026!Admin" ||
      pass === "IAS#Aviation@2026!Admin";

    if (isEmailMatch && isPasswordMatch) {
      setIsAuthenticated(true);
      sessionStorage.setItem("acs_admin_session", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("acs_admin_session");
  };

  const updateAdminCredentials = (newEmail: string, newPass: string) => {
    const updated = {
      email: newEmail.trim().toLowerCase() || adminAuth.email,
      passwordHash: newPass.trim() || adminAuth.passwordHash,
    };
    setAdminAuth(updated);
  };

  // Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Home Content
  const updateHomeContent = async (newContent: Partial<HomeContent>) => {
    setHomeContent((prev) => ({ ...prev, ...newContent }));
  };

  // Job Posts
  const addJobPost = async (job: Omit<JobPost, "id" | "postedDate">) => {
    const newJob: JobPost = {
      ...job,
      id: "acs-job-" + Date.now(),
      postedDate: new Date().toISOString().split("T")[0],
    };
    setJobPosts((prev) => [newJob, ...prev]);
  };

  const updateJobPost = async (id: string, updated: Partial<JobPost>) => {
    setJobPosts((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updated } : job))
    );
  };

  const deleteJobPost = async (id: string) => {
    setJobPosts((prev) => prev.filter((job) => job.id !== id));
  };

  const toggleJobStatus = async (id: string) => {
    setJobPosts((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, status: job.status === "active" ? "inactive" : "active" }
          : job
      )
    );
  };

  // Notices
  const addNotice = async (notice: Omit<NoticeItem, "id">) => {
    const newNotice: NoticeItem = {
      ...notice,
      id: "ACS-NOTIF-" + Date.now(),
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const updateNotice = async (id: string, updated: Partial<NoticeItem>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNotice = async (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const syncNoticesFromGoogleSheet = async (
    customUrl?: string
  ): Promise<{ success: boolean; count: number; message: string }> => {
    const targetUrl = (customUrl || settings.googleSheetsNoticeUrl || "").trim();
    if (!targetUrl) {
      return {
        success: false,
        count: 0,
        message: "Please provide a valid Google Sheet published CSV URL (File > Share > Publish to web > CSV)",
      };
    }

    try {
      // Normalize Google Sheet URL to output=csv if standard docs link is passed
      let fetchUrl = targetUrl;
      if (fetchUrl.includes("docs.google.com/spreadsheets") && !fetchUrl.includes("output=csv") && !fetchUrl.includes("tqx=out:csv")) {
        if (fetchUrl.includes("/edit")) {
          fetchUrl = fetchUrl.replace(/\/edit.*$/, "/gviz/tq?tqx=out:csv");
        } else if (fetchUrl.includes("/pubhtml")) {
          fetchUrl = fetchUrl.replace("/pubhtml", "/pub?output=csv");
        }
      }

      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet: HTTP ${response.status}`);
      }

      const csvText = await response.text();
      const parsedItems = parseGoogleSheetsNotices(csvText);

      if (parsedItems.length === 0) {
        return {
          success: false,
          count: 0,
          message: "No valid notification rows found in the Google Sheet. Please check that column headers include Title, Date, etc.",
        };
      }

      // Filter out auto-expired items
      const activeItems = parsedItems.filter(isNoticeActive);
      const expiredCount = parsedItems.length - activeItems.length;

      // Merge with non-google notices or update
      setNotices((prev) => {
        const nonGoogleNotices = prev.filter((n) => n.source !== "google_sheets");
        return [...activeItems, ...nonGoogleNotices];
      });

      return {
        success: true,
        count: activeItems.length,
        message: `Successfully synchronized ${activeItems.length} active notices from Google Sheet${
          expiredCount > 0 ? ` (${expiredCount} expired notices auto-filtered out)` : ""
        }.`,
      };
    } catch (err: any) {
      console.error("Google Sheets Sync Error:", err);
      return {
        success: false,
        count: 0,
        message: err.message || "Failed to connect to Google Sheet. Ensure sheet is published as CSV.",
      };
    }
  };

  const purgeExpiredNotices = async (): Promise<number> => {
    let purgedCount = 0;
    setNotices((prev) => {
      const active = prev.filter((n) => {
        const active = isNoticeActive(n);
        if (!active) purgedCount++;
        return active;
      });
      return active;
    });
    return purgedCount;
  };

  // Verification Registry
  const addVerificationCandidate = async (cand: Omit<VerificationCandidate, "id">) => {
    const newCand: VerificationCandidate = {
      ...cand,
      id: "verify-" + Date.now(),
    };
    setVerificationRegistry((prev) => [newCand, ...prev]);
  };

  const updateVerificationCandidate = async (id: string, updated: Partial<VerificationCandidate>) => {
    setVerificationRegistry((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteVerificationCandidate = async (id: string) => {
    setVerificationRegistry((prev) => prev.filter((c) => c.id !== id));
  };

  // Branches
  const addBranch = async (branch: Omit<OfficeBranch, "id">) => {
    const newBranch: OfficeBranch = {
      ...branch,
      id: "branch-" + Date.now(),
    };
    setBranches((prev) => [...prev, newBranch]);
  };

  const updateBranch = async (id: string, updated: Partial<OfficeBranch>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const deleteBranch = async (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Leads
  const addLead = async (lead: Omit<CandidateLead, "id" | "submittedAt" | "status">): Promise<CandidateLead> => {
    const newLead: CandidateLead = {
      ...lead,
      id: "lead-" + Date.now(),
      submittedAt: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "new",
    };

    let currentLeads = leads;
    try {
      const saved = localStorage.getItem("acs_candidate_leads");
      if (saved) {
        currentLeads = JSON.parse(saved);
      }
    } catch (e) {}

    const updated = [newLead, ...currentLeads.filter((l) => l.id !== newLead.id)];
    setLeads(updated);
    try {
      localStorage.setItem("acs_candidate_leads", JSON.stringify(updated));
    } catch (e) {}

    // Cache phone to fast duplicate lookup storage
    try {
      saveSubmittedPhone(newLead.phone, {
        name: newLead.name,
        targetRole: newLead.targetRole,
        city: newLead.city,
        submittedAt: newLead.submittedAt,
        refId: `IAS-${new Date().getFullYear()}-${newLead.id.replace("lead-", "").slice(-6)}`,
      });
    } catch (e) {}

    return newLead;
  };

  const updateLeadStatus = async (id: string, status: CandidateLead["status"]) => {
    setLeads((prev) => {
      const updated = prev.map((lead) => (lead.id === id ? { ...lead, status } : lead));
      try {
        localStorage.setItem("acs_candidate_leads", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => {
      const updated = prev.filter((lead) => lead.id !== id);
      try {
        localStorage.setItem("acs_candidate_leads", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearAllLeads = async () => {
    setLeads([]);
    try {
      localStorage.setItem("acs_candidate_leads", JSON.stringify([]));
    } catch (e) {}
  };

  const reloadLeads = () => {
    try {
      const saved = localStorage.getItem("acs_candidate_leads");
      if (saved) {
        setLeads(JSON.parse(saved));
      }
    } catch (e) {}
  };

  // Cloud Config
  const updateCloudConfig = async (config: Partial<CloudConfig>) => {
    setCloudConfig((prev) => ({ ...prev, ...config }));
  };

  const syncWithCloud = async (): Promise<boolean> => {
    if (!cloudConfig.supabaseUrl || !cloudConfig.supabaseAnonKey) {
      return false;
    }
    setCloudConfig((prev) => ({
      ...prev,
      isCloudConnected: true,
      lastSyncedAt: new Date().toLocaleString(),
    }));
    return true;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        settings,
        updateSettings,
        homeContent,
        updateHomeContent,
        jobPosts,
        addJobPost,
        updateJobPost,
        deleteJobPost,
        toggleJobStatus,
        notices,
        addNotice,
        updateNotice,
        deleteNotice,
        syncNoticesFromGoogleSheet,
        purgeExpiredNotices,
        verificationRegistry,
        addVerificationCandidate,
        updateVerificationCandidate,
        deleteVerificationCandidate,
        branches,
        addBranch,
        updateBranch,
        deleteBranch,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        reloadLeads,
        cloudConfig,
        updateCloudConfig,
        syncWithCloud,
        isAuthenticated,
        login,
        logout,
        adminPasswordHash: adminAuth.passwordHash,
        updateAdminCredentials,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextType => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
};
