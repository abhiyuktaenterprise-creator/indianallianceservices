/**
 * studentService.ts - Indian Alliance Services
 * Offline-first Student / Candidate Management & Public Verification Service
 */

export interface Student {
  id: string;
  application_number: string;
  registration_number?: string;
  batch_code?: string; // e.g. IAS-TRG-2026/B1
  student_name: string;
  father_name: string;
  date_of_birth: string; // YYYY-MM-DD
  mobile_number: string;
  email?: string | null;
  course_name: string;
  admission_date?: string;
  placement_date?: string | null; // Date of Placement
  visiting_date?: string | null; // Visiting Date
  course_start_date?: string | null;
  course_end_date?: string | null;
  interview_date?: string | null; // e.g. YYYY-MM-DD
  status: 'Active' | 'Completed' | 'Joining' | 'Rejoining' | 'Failed' | 'Discontinued';
  failure_reason?: string | null; // Note explaining failure if candidate failed
  is_archived: boolean;
  photo_url?: string | null; // Base64 data URL or external URL
  created_at?: string;
  updated_at?: string;
}

export type NewStudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at' | 'is_archived'> & {
  is_archived?: boolean;
};

export interface PublicVerificationResult {
  student_name: string;
  father_name: string;
  registration_number?: string;
  application_number: string;
  batch_code?: string;
  date_of_birth?: string;
  course_name: string;
  admission_date?: string;
  placement_date?: string | null;
  visiting_date?: string | null;
  course_start_date?: string | null;
  course_end_date?: string | null;
  interview_date?: string | null;
  status: string;
  failure_reason?: string | null;
  photo_url?: string | null;
}

const LOCAL_STORAGE_KEY = 'ias_students_registry';

// Initial official registered candidates / students for Indian Alliance Services
export const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'ias-std-134803',
    application_number: 'IAS-APP-2026/134803',
    registration_number: 'IAS26Y2NAG2026/134803',
    batch_code: 'IAS-TRG-2026/134803',
    student_name: 'Khushbu Ashok Mahto',
    father_name: 'Ashok Mahto',
    date_of_birth: '2002-04-12',
    mobile_number: '9870761713',
    email: 'khushbu.mahto@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2026-11-26',
    placement_date: '2026-11-29',
    visiting_date: '2027-02-28',
    course_start_date: '2026-11-29',
    course_end_date: '2027-02-28',
    interview_date: '2026-11-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-11-26').toISOString(),
    updated_at: new Date('2026-11-26').toISOString(),
  },
  {
    id: 'ias-std-134557',
    application_number: 'IAS-APP-2026/134557',
    registration_number: 'IAS26Y2BBI2026/134557',
    batch_code: 'IAS-TRG-2026/134557',
    student_name: 'Alraza Khan',
    father_name: 'Samsuddin Khan',
    date_of_birth: '2001-09-18',
    mobile_number: '9651212713',
    email: 'alraza.khan@indianallianceservices.com',
    course_name: 'Aviation Customer Service & Airline Operations',
    admission_date: '2026-10-26',
    placement_date: '2026-11-27',
    visiting_date: '2027-02-27',
    course_start_date: '2026-11-27',
    course_end_date: '2027-02-27',
    interview_date: '2026-10-22',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-10-26').toISOString(),
    updated_at: new Date('2026-10-26').toISOString(),
  },
  {
    id: 'ias-std-139960',
    application_number: 'IAS-APP-2026/139960',
    registration_number: 'IAS26Y2PUN2026/139960',
    batch_code: 'IAS-TRG-2026/139960',
    student_name: 'Kiran Ishwar Kurhe',
    father_name: 'Ishwar Kurhe',
    date_of_birth: '2000-11-05',
    mobile_number: '8707617134',
    email: 'kiran.kurhe@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2026-10-26',
    placement_date: '2026-11-29',
    visiting_date: '2027-02-28',
    course_start_date: '2026-11-29',
    course_end_date: '2027-02-28',
    interview_date: '2026-10-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-10-26').toISOString(),
    updated_at: new Date('2026-10-26').toISOString(),
  },
  {
    id: 'ias-std-8425',
    application_number: 'IAS-APP-2026/8425',
    registration_number: 'IAS27Y2GV2026/8425',
    batch_code: 'IAS-TRG-2024/8425',
    student_name: 'Abhishek Navnath Arkas',
    father_name: 'Navnath Namdev Arkas',
    date_of_birth: '2001-08-15',
    mobile_number: '8858453069',
    email: 'abhishek.arkas@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-01-15',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-30',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    interview_date: '2024-02-10',
    status: 'Completed',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ias-std-8420',
    application_number: 'IAS-APP-2026/8420',
    registration_number: 'IAS27Y2GV2026/8420',
    batch_code: 'IAS-TRG-2024/8420',
    student_name: 'Rohit Kumar',
    father_name: 'Chandilal',
    date_of_birth: '2002-06-20',
    mobile_number: '8858453069',
    email: 'rohit.kumar@indianallianceservices.com',
    course_name: 'Aviation Customer Service & Airline Operations',
    admission_date: '2024-01-15',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-30',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    interview_date: '2024-02-12',
    status: 'Failed',
    failure_reason: 'Did not meet the mandatory spoken English communication benchmarks and minimum physical grooming criteria required for airline airport passenger services.',
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ias-std-100',
    application_number: 'IAS-APP-2026-100',
    registration_number: 'IAS-2026-100',
    batch_code: 'IAS-TRG-2024/100',
    student_name: 'Aarav Sharma',
    father_name: 'Ramesh Sharma',
    date_of_birth: '2002-05-15',
    mobile_number: '9876543210',
    email: 'aarav.sharma@example.com',
    course_name: 'Cabin Crew & In-Flight Safety Training',
    admission_date: '2024-02-10',
    placement_date: '2024-03-01',
    visiting_date: '2024-12-15',
    course_start_date: '2024-03-01',
    course_end_date: '2024-12-15',
    interview_date: '2024-03-05',
    status: 'Completed',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-02-10').toISOString(),
    updated_at: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'ias-std-101',
    application_number: 'IAS-APP-2026-101',
    registration_number: 'IAS-2026-101',
    batch_code: 'IAS-TRG-2024/101',
    student_name: 'Pooja Verma',
    father_name: 'Suresh Verma',
    date_of_birth: '2003-09-12',
    mobile_number: '9876543211',
    email: 'pooja.verma@example.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-03-01',
    placement_date: '2024-03-15',
    visiting_date: '2024-12-30',
    course_start_date: '2024-03-15',
    course_end_date: '2024-12-30',
    interview_date: '2024-03-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-03-01').toISOString(),
    updated_at: new Date('2024-03-01').toISOString(),
  },
  {
    id: 'ias-std-8899',
    application_number: 'IAS-APP-2026/8899',
    registration_number: 'IAS-APP-2026/8899',
    batch_code: 'IAS-TRG-2024/8899',
    student_name: 'Aakash Verma',
    father_name: 'Dharmendra Verma',
    date_of_birth: '2001-05-18',
    mobile_number: '9876501234',
    email: 'aakash.verma@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-01-20',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-15',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-15',
    interview_date: '2024-03-15',
    status: 'Failed',
    failure_reason: 'Candidate did not clear the mandatory aviation English communication fluency assessment during the panel round.',
    is_archived: false,
    created_at: new Date('2024-01-20').toISOString(),
    updated_at: new Date('2024-01-20').toISOString(),
  },
];

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

// Normalize dates from various sheet formats (YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY, etc.) to YYYY-MM-DD
export function normalizeDate(raw: string | undefined | null): string | null {
  if (!raw || !raw.trim()) return null;
  const s = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const dmyMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, "0");
    const month = dmyMatch[2].padStart(2, "0");
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }
  const ymdMatch = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, "0");
    const day = ymdMatch[3].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const parsed = Date.parse(s);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return s;
}

// Normalize status values to allowed union
export function normalizeStatus(raw: string | undefined | null): Student["status"] {
  if (!raw) return "Active";
  const s = raw.trim().toLowerCase();
  if (s.includes("rejoin")) return "Rejoining";
  if (s.includes("join")) return "Joining";
  if (s.includes("comp") || s.includes("pass") || s.includes("cert")) return "Completed";
  if (s.includes("fail")) return "Failed";
  if (s.includes("disc") || s.includes("drop")) return "Discontinued";
  return "Active";
}

// Normalize any Google Sheet URL (pubhtml, standard /edit share link, or CSV link) to live CSV
export function normalizeGoogleSheetCsvUrl(rawUrl: string): string {
  let url = (rawUrl || "").trim();
  if (!url) return "";

  if (url.includes("/pub?") && url.includes("output=csv")) {
    return url;
  }
  if (url.includes("/pubhtml")) {
    return url.replace("/pubhtml", "/pub?output=csv");
  }
  if (url.includes("docs.google.com/spreadsheets/d/")) {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      const sheetId = match[1];
      const gidMatch = url.match(/[?&#]gid=([0-9]+)/);
      const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : "";
      return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
    }
  }
  return url;
}

export const CANDIDATE_SHEET_URL_KEY = "ias_candidate_sheet_url";

export function getCandidateSheetUrl(): string {
  if (typeof window === "undefined") return "";
  const direct = localStorage.getItem(CANDIDATE_SHEET_URL_KEY);
  if (direct && direct.trim()) return direct.trim();

  try {
    const rawSettings = localStorage.getItem("acs_site_settings");
    if (rawSettings) {
      const parsed = JSON.parse(rawSettings);
      if (parsed && parsed.candidateSheetCsvUrl && parsed.candidateSheetCsvUrl.trim()) {
        return parsed.candidateSheetCsvUrl.trim();
      }
    }
  } catch {}

  return "";
}

export function setCandidateSheetUrl(url: string): void {
  if (typeof window === "undefined") return;
  const clean = url.trim();
  localStorage.setItem(CANDIDATE_SHEET_URL_KEY, clean);

  try {
    const rawSettings = localStorage.getItem("acs_site_settings");
    const parsed = rawSettings ? JSON.parse(rawSettings) : {};
    parsed.candidateSheetCsvUrl = clean;
    localStorage.setItem("acs_site_settings", JSON.stringify(parsed));
  } catch {}
}

// Convert CSV rows into Student array from Google Sheet
export function parseGoogleSheetsCandidates(csvText: string): Student[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));

  const appIdx = headers.findIndex((h) => h.includes("app") || h.includes("roll"));
  const regIdx = headers.findIndex((h) => h.includes("reg") && !h.includes("app"));
  const batchIdx = headers.findIndex((h) => h.includes("batch"));
  const nameIdx = headers.findIndex(
    (h) => (h.includes("name") || h.includes("candidate") || h.includes("student")) &&
      !h.includes("father") &&
      !h.includes("course")
  );
  const fatherIdx = headers.findIndex((h) => h.includes("father") || h.includes("parent"));
  const dobIdx = headers.findIndex((h) => h.includes("dob") || h.includes("birth"));
  const mobileIdx = headers.findIndex(
    (h) => h.includes("mobile") || h.includes("phone") || h.includes("contact") || h.includes("whatsapp")
  );
  const emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("mail"));
  const courseIdx = headers.findIndex(
    (h) => h.includes("course") || h.includes("trade") || h.includes("program") || h.includes("training")
  );
  const admIdx = headers.findIndex((h) => h.includes("admission") || h.includes("enrol"));
  const placeIdx = headers.findIndex((h) => h.includes("placement") || (h.includes("start") && !h.includes("batch")));
  const visitIdx = headers.findIndex((h) => h.includes("visit") || h.includes("completion") || h.includes("end"));
  const interviewIdx = headers.findIndex((h) => h.includes("interview"));
  const statusIdx = headers.findIndex((h) => h.includes("status"));
  const reasonIdx = headers.findIndex((h) => h.includes("reason") || h.includes("failure") || h.includes("remark") || h.includes("note"));
  const photoIdx = headers.findIndex((h) => h.includes("photo") || h.includes("image") || h.includes("pic") || h.includes("avatar"));

  const parsedStudents: Student[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const studentName = nameIdx !== -1 && row[nameIdx] ? row[nameIdx].trim() : (row[0] || "").trim();
    let appNo = appIdx !== -1 && row[appIdx] ? row[appIdx].trim() : "";

    if (!studentName && !appNo) continue;

    if (!appNo) {
      appNo = `IAS-APP-2026/${130000 + r}`;
    }

    const regNo = regIdx !== -1 && row[regIdx] ? row[regIdx].trim() : appNo;
    const batchCode = batchIdx !== -1 && row[batchIdx] ? row[batchIdx].trim() : `IAS-TRG-2026/${appNo.replace(/\D/g, "").slice(-6) || r}`;
    const fatherName = fatherIdx !== -1 && row[fatherIdx] ? row[fatherIdx].trim() : "Not Provided";
    const dob = dobIdx !== -1 && row[dobIdx] ? normalizeDate(row[dobIdx]) || "2000-01-01" : "2000-01-01";
    const mobile = mobileIdx !== -1 && row[mobileIdx] ? row[mobileIdx].trim().replace(/^'+/, "") : "";
    const email = emailIdx !== -1 && row[emailIdx] ? row[emailIdx].trim() : null;
    const courseName = courseIdx !== -1 && row[courseIdx] ? row[courseIdx].trim() : "Airport Ground Staff & Passenger Services";
    
    const admissionDate = admIdx !== -1 && row[admIdx] ? normalizeDate(row[admIdx]) || new Date().toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    const placementDate = placeIdx !== -1 && row[placeIdx] ? normalizeDate(row[placeIdx]) : admissionDate;
    const visitingDate = visitIdx !== -1 && row[visitIdx] ? normalizeDate(row[visitIdx]) : null;
    const interviewDate = interviewIdx !== -1 && row[interviewIdx] ? normalizeDate(row[interviewIdx]) : null;
    const status = normalizeStatus(statusIdx !== -1 ? row[statusIdx] : "Active");
    const failureReason = reasonIdx !== -1 && row[reasonIdx] ? row[reasonIdx].trim() : null;
    const photoUrl = photoIdx !== -1 && row[photoIdx] ? row[photoIdx].trim() : null;

    parsedStudents.push({
      id: `ias-std-${appNo.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`,
      application_number: appNo,
      registration_number: regNo,
      batch_code: batchCode,
      student_name: studentName,
      father_name: fatherName,
      date_of_birth: dob,
      mobile_number: mobile,
      email: email || undefined,
      course_name: courseName,
      admission_date: admissionDate,
      placement_date: placementDate,
      visiting_date: visitingDate,
      course_start_date: placementDate,
      course_end_date: visitingDate,
      interview_date: interviewDate,
      status,
      failure_reason: failureReason,
      is_archived: false,
      photo_url: photoUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return parsedStudents;
}

// Helper to export candidates to CSV formatted for Google Sheets
export function exportCandidatesToCSV(customList?: Student[]): string {
  const students = customList || getLocalStudents();
  const headers = [
    "Application Number",
    "Registration Number",
    "Batch Code",
    "Candidate Name",
    "Father Name",
    "Date of Birth",
    "Mobile Number",
    "Email",
    "Course Name",
    "Date of Placement",
    "Visiting Date",
    "Interview Date",
    "Status",
    "Failure Reason",
    "Photo URL"
  ];

  const escapeCSV = (val: string | null | undefined): string => {
    if (val === null || val === undefined) return "";
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = students.map((s) => [
    escapeCSV(s.application_number),
    escapeCSV(s.registration_number || s.application_number),
    escapeCSV(s.batch_code || `IAS-TRG-${s.application_number.replace(/\D/g, "")}`),
    escapeCSV(s.student_name),
    escapeCSV(s.father_name),
    escapeCSV(s.date_of_birth),
    escapeCSV(s.mobile_number),
    escapeCSV(s.email || ""),
    escapeCSV(s.course_name),
    escapeCSV(s.placement_date || s.course_start_date || ""),
    escapeCSV(s.visiting_date || s.course_end_date || ""),
    escapeCSV(s.interview_date || ""),
    escapeCSV(s.status),
    escapeCSV(s.failure_reason || ""),
    escapeCSV(s.photo_url || "")
  ].join(","));

  return [headers.join(","), ...rows].join("\r\n");
}

// Trigger browser download of CSV file with UTF-8 BOM
export function downloadCandidatesCSV(customList?: Student[]): void {
  if (typeof window === "undefined") return;
  const csvContent = exportCandidatesToCSV(customList);
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `IAS_Candidates_Registry_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Candidate matcher helper
function findCandidateMatch(list: Student[], queryTrimmed: string, dobTrimmed?: string): Student | undefined {
  const cleanQuery = queryTrimmed.toUpperCase();
  return list.find((s) => {
    const appClean = s.application_number.trim().toUpperCase();
    const regClean = s.registration_number ? s.registration_number.trim().toUpperCase() : "";

    const appMatches =
      appClean === cleanQuery ||
      appClean.endsWith(`/${cleanQuery}`) ||
      appClean.endsWith(`-${cleanQuery}`) ||
      cleanQuery.endsWith(appClean);

    const regMatches =
      regClean === cleanQuery ||
      regClean.endsWith(`/${cleanQuery}`) ||
      regClean.endsWith(`-${cleanQuery}`) ||
      cleanQuery.endsWith(regClean);

    if ((!appMatches && !regMatches) || s.is_archived) return false;
    if (dobTrimmed) return s.date_of_birth === dobTrimmed;
    return true;
  });
}

// Helper to get local students
const getLocalStudents = (): Student[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let list: Student[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      } catch {
        list = [];
      }
    }

    if (list.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }

    // Auto-merge any default official students that may be missing from existing local storage
    let modified = false;
    for (const def of DEFAULT_STUDENTS) {
      const idx = list.findIndex(
        (s) =>
          s.id === def.id ||
          s.application_number.toLowerCase() === def.application_number.toLowerCase() ||
          s.student_name.toLowerCase() === def.student_name.toLowerCase()
      );
      if (idx === -1) {
        list.push(def);
        modified = true;
      } else {
        if (!list[idx].batch_code && def.batch_code) {
          list[idx].batch_code = def.batch_code;
          modified = true;
        }
        if (!list[idx].placement_date && def.placement_date) {
          list[idx].placement_date = def.placement_date;
          modified = true;
        }
        if (!list[idx].visiting_date && def.visiting_date) {
          list[idx].visiting_date = def.visiting_date;
          modified = true;
        }
      }
    }

    // Ensure all stored students have batch_code and placement_date populated
    for (const s of list) {
      if (!s.batch_code) {
        s.batch_code = `IAS-TRG-${s.application_number.replace(/\D/g, "") || "2026"}`;
        modified = true;
      }
      if (!s.placement_date && s.course_start_date) {
        s.placement_date = s.course_start_date;
        modified = true;
      }
      if (!s.visiting_date && s.course_end_date) {
        s.visiting_date = s.course_end_date;
        modified = true;
      }
    }

    if (modified) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  } catch (err) {
    console.error('Error reading students registry from localStorage:', err);
    return DEFAULT_STUDENTS;
  }
};

// Helper to save local students
const saveLocalStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Error saving students registry to localStorage:', err);
  }
};

export const studentService = {
  /**
   * Fetch all students with optional search query & archive filter
   */
  async getStudents(
    query?: string,
    includeArchived: boolean = false
  ): Promise<{ data: Student[]; error: string | null }> {
    try {
      let list = getLocalStudents();

      if (!includeArchived) {
        list = list.filter((s) => !s.is_archived);
      }

      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter((s) => {
          return (
            s.student_name.toLowerCase().includes(q) ||
            s.father_name.toLowerCase().includes(q) ||
            s.application_number.toLowerCase().includes(q) ||
            (s.registration_number && s.registration_number.toLowerCase().includes(q)) ||
            s.mobile_number.toLowerCase().includes(q) ||
            (s.email && s.email.toLowerCase().includes(q)) ||
            s.course_name.toLowerCase().includes(q)
          );
        });
      }

      return { data: list, error: null };
    } catch {
      return { data: [], error: 'Failed to fetch student registry.' };
    }
  },

  /**
   * Get single student by ID
   */
  async getStudentById(id: string): Promise<{ data: Student | null; error: string | null }> {
    const list = getLocalStudents();
    const found = list.find((s) => s.id === id);
    if (!found) {
      return { data: null, error: 'Student record not found.' };
    }
    return { data: found, error: null };
  },

  /**
   * Add a new student record
   */
  async addStudent(
    student: NewStudentInput
  ): Promise<{ data: Student | null; error: string | null }> {
    const appNo = student.application_number.trim();
    const regNo = (student.registration_number?.trim() || appNo);
    const batchCode = (student.batch_code?.trim() || `IAS-TRG-${appNo.replace(/\D/g, "") || "2026"}`).toUpperCase();
    const placementDate = student.placement_date?.trim() || student.course_start_date?.trim() || null;
    const visitingDate = student.visiting_date?.trim() || student.course_end_date?.trim() || null;

    const payload = {
      ...student,
      application_number: appNo,
      registration_number: regNo,
      batch_code: batchCode,
      student_name: student.student_name.trim(),
      father_name: student.father_name.trim(),
      mobile_number: student.mobile_number.trim(),
      email: student.email?.trim() || null,
      course_name: student.course_name.trim(),
      admission_date: student.admission_date || new Date().toISOString().split("T")[0],
      placement_date: placementDate,
      visiting_date: visitingDate,
      course_start_date: placementDate,
      course_end_date: visitingDate,
      interview_date: student.interview_date?.trim() || null,
      failure_reason: student.failure_reason?.trim() || null,
      is_archived: student.is_archived ?? false,
      photo_url: student.photo_url || null,
    };

    const list = getLocalStudents();

    if (
      list.some(
        (s) => s.application_number.toLowerCase() === payload.application_number.toLowerCase()
      )
    ) {
      return {
        data: null,
        error: `Application Number "${payload.application_number}" already exists.`,
      };
    }

    const newStudent: Student = {
      ...payload,
      id: `ias-std-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    list.unshift(newStudent);
    saveLocalStudents(list);

    // Background dispatch to Candidate Webhook if configured
    try {
      const rawSettings = localStorage.getItem('acs_site_settings');
      if (rawSettings) {
        const parsed = JSON.parse(rawSettings);
        if (parsed.candidateWebhookUrl && parsed.candidateWebhookUrl.trim()) {
          fetch(parsed.candidateWebhookUrl.trim(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
            mode: 'no-cors',
          }).catch((e) => console.warn('Candidate webhook dispatch notice:', e));
        }
      }
    } catch {}

    return { data: newStudent, error: null };
  },

  /**
   * Update an existing student record
   */
  async updateStudent(
    id: string,
    updates: Partial<Student>
  ): Promise<{ data: Student | null; error: string | null }> {
    const cleanUpdates = { ...updates };
    delete (cleanUpdates as any).id;
    delete (cleanUpdates as any).created_at;
    delete (cleanUpdates as any).updated_at;

    const list = getLocalStudents();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) {
      return { data: null, error: 'Candidate record not found.' };
    }

    if (cleanUpdates.application_number) {
      const appDup = list.some(
        (s) =>
          s.id !== id &&
          s.application_number.toLowerCase() === cleanUpdates.application_number!.toLowerCase()
      );
      if (appDup) {
        return {
          data: null,
          error: `Application Number "${cleanUpdates.application_number}" already exists on another candidate.`,
        };
      }
    }

    if (cleanUpdates.batch_code) {
      cleanUpdates.batch_code = cleanUpdates.batch_code.trim().toUpperCase();
    }
    if (cleanUpdates.placement_date !== undefined) {
      cleanUpdates.course_start_date = cleanUpdates.placement_date;
    } else if (cleanUpdates.course_start_date !== undefined) {
      cleanUpdates.placement_date = cleanUpdates.course_start_date;
    }
    if (cleanUpdates.visiting_date !== undefined) {
      cleanUpdates.course_end_date = cleanUpdates.visiting_date;
    } else if (cleanUpdates.course_end_date !== undefined) {
      cleanUpdates.visiting_date = cleanUpdates.course_end_date;
    }

    const updated: Student = {
      ...list[idx],
      ...cleanUpdates,
      updated_at: new Date().toISOString(),
    };

    list[idx] = updated;
    saveLocalStudents(list);

    return { data: updated, error: null };
  },

  /**
   * Soft archive / unarchive student
   */
  async setArchived(
    id: string,
    is_archived: boolean
  ): Promise<{ success: boolean; error: string | null }> {
    const list = getLocalStudents();
    const student = list.find((s) => s.id === id);
    if (student) {
      student.is_archived = is_archived;
      student.updated_at = new Date().toISOString();
      saveLocalStudents(list);
      return { success: true, error: null };
    }
    return { success: false, error: 'Candidate record not found.' };
  },

  /**
   * Permanently delete a student record
   */
  async deleteStudent(id: string): Promise<{ success: boolean; error: string | null }> {
    const list = getLocalStudents();
    const filtered = list.filter((s) => s.id !== id);
    if (filtered.length === list.length) {
      return { success: false, error: 'Candidate record not found.' };
    }
    saveLocalStudents(filtered);
    return { success: true, error: null };
  },

  /**
   * Public Verification Lookup
   * Checks by Application Number (or fallback Registration Number)
   * If candidate is not cached locally, automatically queries the configured Google Sheet
   */
  async verifyStudent(
    queryNumber: string,
    dateOfBirth?: string
  ): Promise<{ data: PublicVerificationResult | null; verified: boolean; error: string | null }> {
    const queryTrimmed = queryNumber.trim();
    const dobTrimmed = dateOfBirth?.trim();

    if (!queryTrimmed) {
      return { data: null, verified: false, error: 'Application Number is required.' };
    }

    let list = getLocalStudents();
    let match = findCandidateMatch(list, queryTrimmed, dobTrimmed);

    // If candidate is not found locally, and we are online and have a Google Sheet URL, fetch live data
    if (!match && typeof window !== 'undefined' && navigator.onLine) {
      const sheetUrl = getCandidateSheetUrl();
      if (sheetUrl) {
        try {
          const syncRes = await studentService.syncFromGoogleSheet(sheetUrl);
          if (syncRes.success && syncRes.data.length > 0) {
            list = syncRes.data;
            match = findCandidateMatch(list, queryTrimmed, dobTrimmed);
          }
        } catch (err) {
          console.warn('Real-time Google Sheet candidate sync on verification lookup notice:', err);
        }
      }
    }

    if (match) {
      const publicResult: PublicVerificationResult = {
        student_name: match.student_name,
        father_name: match.father_name,
        registration_number: match.registration_number || match.application_number,
        application_number: match.application_number,
        batch_code: match.batch_code || `IAS-TRG-${match.application_number.replace(/\D/g, "")}`,
        date_of_birth: match.date_of_birth,
        course_name: match.course_name,
        admission_date: match.admission_date,
        placement_date: match.placement_date || match.course_start_date,
        visiting_date: match.visiting_date || match.course_end_date,
        course_start_date: match.placement_date || match.course_start_date,
        course_end_date: match.visiting_date || match.course_end_date,
        interview_date: match.interview_date,
        status: match.status,
        failure_reason: match.failure_reason,
        photo_url: match.photo_url || null,
      };
      return { data: publicResult, verified: true, error: null };
    }

    return { data: null, verified: false, error: null };
  },

  /**
   * Sync candidates from Google Sheet CSV
   * Merges incoming Google Sheet entries with local storage registry
   */
  async syncFromGoogleSheet(
    customUrl?: string
  ): Promise<{ success: boolean; count: number; error: string | null; data: Student[] }> {
    const targetRaw = (customUrl || getCandidateSheetUrl()).trim();
    if (!targetRaw) {
      return {
        success: false,
        count: 0,
        error: 'No Google Sheet URL configured. Please enter a published CSV link or Google Sheet URL.',
        data: getLocalStudents(),
      };
    }

    const fetchUrl = normalizeGoogleSheetCsvUrl(targetRaw);

    try {
      const res = await fetch(fetchUrl, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to fetch sheet (HTTP ${res.status}). Ensure the sheet is public or published to web.`);
      }

      const csvText = await res.text();
      const incoming = parseGoogleSheetsCandidates(csvText);

      if (incoming.length === 0) {
        return {
          success: false,
          count: 0,
          error: 'No candidate records found in the sheet. Please ensure column headers include Application Number and Candidate Name.',
          data: getLocalStudents(),
        };
      }

      // Merge incoming candidates with local registry
      const currentList = getLocalStudents();
      const merged: Student[] = [...currentList];

      for (const inc of incoming) {
        const idx = merged.findIndex(
          (s) =>
            s.application_number.trim().toUpperCase() === inc.application_number.trim().toUpperCase() ||
            (s.registration_number && inc.registration_number && s.registration_number.trim().toUpperCase() === inc.registration_number.trim().toUpperCase()) ||
            s.id === inc.id
        );

        if (idx !== -1) {
          // Update existing candidate, preserving local photo if incoming has none
          merged[idx] = {
            ...merged[idx],
            ...inc,
            photo_url: inc.photo_url || merged[idx].photo_url,
            is_archived: merged[idx].is_archived,
            updated_at: new Date().toISOString(),
          };
        } else {
          // Add candidate from sheet
          merged.push(inc);
        }
      }

      saveLocalStudents(merged);

      // Save working URL
      setCandidateSheetUrl(targetRaw);

      // Dispatch sync events across all open tabs/components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ias_candidates_synced', { detail: { count: incoming.length } }));
        window.dispatchEvent(new Event('storage'));
      }

      return {
        success: true,
        count: incoming.length,
        error: null,
        data: merged,
      };
    } catch (err: any) {
      console.error('Error syncing candidates from Google Sheet:', err);
      return {
        success: false,
        count: 0,
        error: err.message || 'Failed to sync with Google Sheet. Please check the URL and internet connection.',
        data: getLocalStudents(),
      };
    }
  },

  /**
   * Helper to get configured candidate Google Sheet URL
   */
  getCandidateSheetUrl,

  /**
   * Helper to set configured candidate Google Sheet URL
   */
  setCandidateSheetUrl,

  /**
   * Export all candidate records as CSV formatted for Google Sheets
   */
  exportCSV(customList?: Student[]): string {
    return exportCandidatesToCSV(customList);
  },

  /**
   * Trigger browser file download of CSV
   */
  downloadCSV(customList?: Student[]): void {
    downloadCandidatesCSV(customList);
  },

  /**
   * Reset local storage to default registry
   */
  async resetToRegistry(): Promise<Student[]> {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  },

  /**
   * Import students list (e.g. from JSON backup)
   */
  async importStudents(
    importedStudents: Student[]
  ): Promise<{ count: number; error: string | null }> {
    try {
      if (!Array.isArray(importedStudents) || importedStudents.length === 0) {
        return { count: 0, error: 'Invalid or empty backup data.' };
      }
      const valid = importedStudents.filter(
        (s) => s.student_name && s.application_number
      );
      saveLocalStudents(valid);
      return { count: valid.length, error: null };
    } catch {
      return { count: 0, error: 'Failed to import records.' };
    }
  },
};
