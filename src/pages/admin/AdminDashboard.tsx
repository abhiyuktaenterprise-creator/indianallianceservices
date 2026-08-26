import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Users,
  Database,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogOut,
  ExternalLink,
  Search,
  Download,
  Save,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  KeyRound,
  FileSpreadsheet,
  X,
  Bell,
  Building2,
  RefreshCw,
  Calendar,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Send,
  Table,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useSiteConfig,
  JobPost,
  CandidateLead,
  NoticeItem,
  OfficeBranch,
  isNoticeActive,
} from "@/context/SiteConfigContext";
import SEO from "@/components/common/SEO";
import { toast } from "sonner";

export default function AdminDashboard() {
  const {
    settings,
    updateSettings,
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
    branches,
    addBranch,
    updateBranch,
    deleteBranch,
    leads,
    updateLeadStatus,
    deleteLead,
    clearAllLeads,
    reloadLeads,
    syncLeadsFromCloud,
    testLeadWebhook,
    cloudConfig,
    updateCloudConfig,
    syncWithCloud,
    logout,
    updateAdminCredentials,
  } = useSiteConfig();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "careers" | "notifications" | "branches" | "settings" | "leads" | "database"
  >("overview");

  React.useEffect(() => {
    if (activeTab === "leads") {
      reloadLeads();
    }
  }, [activeTab]);

  // Password change state
  const [adminEmail, setAdminEmail] = useState("admin@indianallianceservices.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Job Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "",
    jobCode: "",
    companyName: "INDIGO",
    postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
    jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
    jobLocation: "AHMEDABAD",
    imageUrl: "/hero-aviation.jpg",
    type: "Full-Time",
    location: "Ahmedabad, Mumbai, Delhi NCR",
    salaryRange: "₹25,000 – ₹45,000 / month",
    experience: "Freshers & Experienced Both",
    qualification: "12th Pass / Graduate",
    ageLimit: "18 – 30 Years",
    openings: 15,
    badge: "Actively Hiring",
    status: "active" as "active" | "inactive",
    overview: "",
    responsibilities: "",
    requirements: "",
  });

  // Notice Modal State
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: "",
    category: "walkin" as "walkin" | "admitcard" | "result" | "advisory",
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    expiryDate: "",
    badge: "Active Walk-in",
    description: "",
    location: "Major Metro Airports",
    linkText: "Apply Online",
  });

  // Verification Registry Modal State
  const [isVerifModalOpen, setIsVerifModalOpen] = useState(false);
  const [editingVerifId, setEditingVerifId] = useState<string | null>(null);
  const [verifFormData, setVerifFormData] = useState({
    refCode: "IAS-2026-" + Math.floor(100000 + Math.random() * 900000),
    candidateName: "",
    roleApplied: "Airport Ground Staff (AGS)",
    status: "verified" as "verified" | "under_screening" | "admit_issued" | "interview_passed" | "not_verified",
    issuedDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    interviewDate: "",
    interviewVenue: "",
    issuingOfficer: "Aviation Desk Officer #04",
    remarks: "Profile verified & eligible for upcoming screening drive.",
  });

  // Google Sheet Notice Sync State
  const [googleSheetInputUrl, setGoogleSheetInputUrl] = useState(settings.googleSheetsNoticeUrl || "");
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);

  // Google Sheet / Cloud Leads Sync State
  const [leadWebhookInput, setLeadWebhookInput] = useState(settings.leadWebhookUrl || "");
  const [leadCsvInput, setLeadCsvInput] = useState(settings.leadSheetCsvUrl || "");
  const [isLeadSyncing, setIsLeadSyncing] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [isScriptCopied, setIsScriptCopied] = useState(false);

  // Branch Modal State
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchFormData, setBranchFormData] = useState({
    city: "",
    officeName: "",
    address: "",
    phone: "+91 99042 16568",
    email: "support@indianallianceservices.com",
    notice: "",
  });

  // Site Settings Form Data
  const [formData, setFormData] = useState<SiteSettings>({
    helplinePhone: "",
    whatsappPhone: "",
    supportEmail: "",
    displayAddress: "",
    officeHours: "",
    bannerNotice: "",
    enableNoticeBanner: true,
    companyName: "Indian Alliance Services",
    tagline: "India's Leading Aviation Career Guidance & Training Gateway",
    googleSheetsNoticeUrl: "",
    studentAccessPassword: "IAS#Student@2026",
    leadWebhookUrl: "",
    leadSheetCsvUrl: "",
  });

  // Sync settings into local form state
  useEffect(() => {
    if (settings) {
      setFormData(settings);
      if (settings.googleSheetsNoticeUrl) {
        setGoogleSheetInputUrl(settings.googleSheetsNoticeUrl);
      }
      if (settings.leadWebhookUrl) {
        setLeadWebhookInput(settings.leadWebhookUrl);
      }
      if (settings.leadSheetCsvUrl) {
        setLeadCsvInput(settings.leadSheetCsvUrl);
      }
    }
  }, [settings]);

  // Search & Filters
  const [jobSearch, setJobSearch] = useState("");
  const [noticeSearch, setNoticeSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    toast.success("Site settings, Phone numbers & Email updated successfully!");
  };

  // Save Credentials
  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    updateAdminCredentials(adminEmail, newPassword);
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Admin login credentials updated successfully!");
  };

  // ==========================================
  // JOB HANDLERS
  // ==========================================
  const handleOpenCreateJob = () => {
    setEditingJobId(null);
    setJobFormData({
      title: "Airport Ground Staff (AGS)",
      department: "Airport Operations & Passenger Services",
      jobCode: "IAS-INDIGO-" + Math.floor(1000 + Math.random() * 9000),
      companyName: "INDIGO",
      postName: "OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE",
      jobCategory: "FRESHER AND EXPERIANCE CANDIDATES BOTH",
      jobLocation: "AHMEDABAD",
      imageUrl: "/hero-aviation.jpg",
      type: "Full-Time (Shift Based)",
      location: "Ahmedabad (AMD), Mumbai, Delhi NCR, Jaipur",
      salaryRange: "₹25,000 – ₹45,000 / month",
      experience: "Freshers & Experienced Both",
      qualification: "12th Pass or Any Graduate",
      ageLimit: "18 – 28 Years",
      openings: 15,
      badge: "Actively Hiring",
      status: "active",
      overview: "Airport Ground Staff and executive operations managing passenger check-in, ramp safety, and flight turnaround.",
      responsibilities: "Handle boarding passes and passenger verification\nAssist special-needs travellers\nCoordinate with airline ramp staff",
      requirements: "12th Pass minimum\nPleasing personality and clear communication\nBasic computer knowledge",
    });
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job: JobPost) => {
    setEditingJobId(job.id);
    setJobFormData({
      title: job.title || "",
      department: job.department || "",
      jobCode: job.jobCode || "",
      companyName: job.companyName || "INDIGO",
      postName: job.postName || job.title || "",
      jobCategory: job.jobCategory || job.experience || "FRESHER AND EXPERIANCE CANDIDATES BOTH",
      jobLocation: job.jobLocation || job.location || "AHMEDABAD",
      imageUrl: job.imageUrl || "/hero-aviation.jpg",
      type: job.type || "Full-Time",
      location: job.location || "",
      salaryRange: job.salaryRange || "",
      experience: job.experience || "",
      qualification: job.qualification || "",
      ageLimit: job.ageLimit || "",
      openings: job.openings || 1,
      badge: job.badge || "",
      status: job.status || "active",
      overview: job.overview || "",
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join("\n") : (job.responsibilities || ""),
      requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : (job.requirements || ""),
    });
    setIsJobModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setJobFormData((prev) => ({ ...prev, imageUrl: result }));
        toast.success("Image loaded and ready for vacancy card!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      toast.error("Job title is required");
      return;
    }

    const respArray = jobFormData.responsibilities
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const reqArray = jobFormData.requirements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingJobId) {
      await updateJobPost(editingJobId, {
        ...jobFormData,
        responsibilities: respArray,
        requirements: reqArray,
      });
      toast.success("Job posting updated successfully!");
    } else {
      await addJobPost({
        ...jobFormData,
        responsibilities: respArray,
        requirements: reqArray,
      });
      toast.success("New job posting added successfully!");
    }

    setIsJobModalOpen(false);
  };

  // ==========================================
  // NOTIFICATION HANDLERS
  // ==========================================
  const handleOpenCreateNotice = () => {
    setEditingNoticeId(null);
    setNoticeFormData({
      title: "",
      category: "walkin",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      expiryDate: "",
      badge: "Active Walk-in",
      description: "",
      location: "Major Metro Airports",
      linkText: "Apply Online",
    });
    setIsNoticeModalOpen(true);
  };

  const handleOpenEditNotice = (notice: NoticeItem) => {
    setEditingNoticeId(notice.id);
    setNoticeFormData({
      title: notice.title || "",
      category: notice.category || "walkin",
      date: notice.date || "",
      expiryDate: notice.expiryDate || "",
      badge: notice.badge || "",
      description: notice.description || "",
      location: notice.location || "Major Metro Airports",
      linkText: notice.linkText || "Apply Online",
    });
    setIsNoticeModalOpen(true);
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeFormData.title.trim()) {
      toast.error("Notice title is required");
      return;
    }

    const payload = {
      ...noticeFormData,
      expiryDate: noticeFormData.expiryDate.trim() || undefined,
    };

    if (editingNoticeId) {
      await updateNotice(editingNoticeId, payload);
      toast.success("Notification updated successfully!");
    } else {
      await addNotice(payload);
      toast.success("New notification published successfully!");
    }
    setIsNoticeModalOpen(false);
  };

  const handleSyncGoogleSheet = async () => {
    if (!googleSheetInputUrl.trim()) {
      toast.error("Please enter a Google Sheet Published CSV URL");
      return;
    }

    setIsGoogleSyncing(true);
    await updateSettings({ googleSheetsNoticeUrl: googleSheetInputUrl.trim() });
    const result = await syncNoticesFromGoogleSheet(googleSheetInputUrl.trim());
    setIsGoogleSyncing(false);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handlePurgeExpired = async () => {
    const count = await purgeExpiredNotices();
    if (count > 0) {
      toast.success(`Purged ${count} expired notices from database.`);
    } else {
      toast.info("No expired notices found. All current notices are active.");
    }
  };

  // ==========================================
  // BRANCH HANDLERS
  // ==========================================
  const handleOpenCreateBranch = () => {
    setEditingBranchId(null);
    setBranchFormData({
      city: "",
      officeName: "",
      address: "",
      phone: settings.helplinePhone || "+91 7851836860",
      email: settings.supportEmail || "support@indianallianceservices.com",
      notice: "Visits strictly by prior appointment only.",
    });
    setIsBranchModalOpen(true);
  };

  const handleOpenEditBranch = (branch: OfficeBranch) => {
    setEditingBranchId(branch.id);
    setBranchFormData({
      city: branch.city || "",
      officeName: branch.officeName || "",
      address: branch.address || "",
      phone: branch.phone || settings.helplinePhone,
      email: branch.email || settings.supportEmail,
      notice: branch.notice || "Visits strictly by prior appointment only.",
    });
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchFormData.city.trim() || !branchFormData.address.trim()) {
      toast.error("City and Address are required");
      return;
    }

    if (editingBranchId) {
      await updateBranch(editingBranchId, branchFormData);
      toast.success("Office location updated successfully!");
    } else {
      await addBranch(branchFormData);
      toast.success("New office location added successfully!");
    }
    setIsBranchModalOpen(false);
  };

  // ==========================================
  // EXPORT LEADS TO CSV
  // ==========================================
  const handleExportLeads = () => {
    if (leads.length === 0) {
      toast.error("No candidate leads available to export.");
      return;
    }

    const headers = ["ID", "Submitted Date", "Name", "Father Name", "Phone", "Email", "State", "City", "Qualification", "Target Role", "Status", "Notes"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.submittedAt}"`,
      `"${l.name}"`,
      `"${l.fatherName || ""}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.state || ""}"`,
      `"${l.city || ""}"`,
      `"${l.qualification || ""}"`,
      `"${l.targetRole || ""}"`,
      `"${l.status}"`,
      `"${l.notes || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IAS_Candidate_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported to CSV successfully!");
  };

  // Sync Leads from Google Sheet / Cloud
  const handleSyncLeads = async () => {
    setIsLeadSyncing(true);
    if (leadCsvInput.trim() && leadCsvInput.trim() !== settings.leadSheetCsvUrl) {
      await updateSettings({ leadSheetCsvUrl: leadCsvInput.trim() });
    }
    const result = await syncLeadsFromCloud(leadCsvInput.trim() || undefined);
    setIsLeadSyncing(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Test Webhook Dispatch
  const handleTestLeadWebhook = async () => {
    if (!leadWebhookInput.trim()) {
      toast.error("Please enter a Google Apps Script Webhook URL first.");
      return;
    }
    setIsTestingWebhook(true);
    if (leadWebhookInput.trim() !== settings.leadWebhookUrl) {
      await updateSettings({ leadWebhookUrl: leadWebhookInput.trim() });
    }
    const result = await testLeadWebhook(leadWebhookInput.trim());
    setIsTestingWebhook(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Copy Google Apps Script Template
  const handleCopyAppsScript = () => {
    const script = `// ================================================================
// INDIAN ALLIANCE SERVICES — GOOGLE APPS SCRIPT LEAD WEBHOOK
// ================================================================
// How to use:
// 1. Open your Google Sheet -> Click "Extensions" -> "Apps Script"
// 2. Delete existing code and paste this entire script
// 3. Click "Deploy" -> "New deployment" (or "Manage deployments" -> Edit ✏️)
// 4. Set "Execute as": "Me", Set "Who has access": "Anyone"  (⚠️ MUST BE "Anyone")
// 5. Click "Deploy", Authorize permissions, and Copy the "Web app URL"
// 6. Paste that URL into Indian Alliance Services Admin Control Center!

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create standard column headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Candidate Name",
        "Father Name",
        "Phone Number",
        "Email Address",
        "State",
        "City",
        "Qualification",
        "Target Role",
        "Source",
        "Status",
        "Notes"
      ]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#f3f4f6");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.id || "IAS-" + Date.now(),
      data.name || "",
      data.fatherName || "",
      "'" + (data.phone || ""),
      data.email || "",
      data.state || "",
      data.city || "",
      data.qualification || "",
      data.targetRole || "",
      data.source || "Website Form",
      data.status || "new",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    if (rows.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", count: 0, leads: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = rows[0].map(function(h) { return h.toString().toLowerCase().replace(/[^a-z0-9]/g, ""); });
    var idIdx = headers.findIndex(function(h) { return h === "id" || h.indexOf("leadid") !== -1 || h.indexOf("ref") !== -1; });
    var dateIdx = headers.findIndex(function(h) { return h.indexOf("time") !== -1 || h.indexOf("date") !== -1 || h.indexOf("timestamp") !== -1; });
    var nameIdx = headers.findIndex(function(h) { return h.indexOf("name") !== -1 && h.indexOf("father") === -1; });
    var fatherIdx = headers.findIndex(function(h) { return h.indexOf("father") !== -1 || h.indexOf("parent") !== -1; });
    var phoneIdx = headers.findIndex(function(h) { return h.indexOf("phone") !== -1 || h.indexOf("mobile") !== -1 || h.indexOf("contact") !== -1; });
    var emailIdx = headers.findIndex(function(h) { return h.indexOf("email") !== -1 || h.indexOf("mail") !== -1; });
    var stateIdx = headers.findIndex(function(h) { return h.indexOf("state") !== -1; });
    var cityIdx = headers.findIndex(function(h) { return h.indexOf("city") !== -1; });
    var qualIdx = headers.findIndex(function(h) { return h.indexOf("qual") !== -1 || h.indexOf("edu") !== -1; });
    var roleIdx = headers.findIndex(function(h) { return h.indexOf("role") !== -1 || h.indexOf("job") !== -1 || h.indexOf("post") !== -1; });
    var sourceIdx = headers.findIndex(function(h) { return h.indexOf("source") !== -1; });
    var statusIdx = headers.findIndex(function(h) { return h.indexOf("status") !== -1; });
    var notesIdx = headers.findIndex(function(h) { return h.indexOf("note") !== -1; });
    
    var leads = [];
    for (var r = 1; r < rows.length; r++) {
      var row = rows[r];
      var name = nameIdx !== -1 ? row[nameIdx] : row[2] || "";
      var phone = phoneIdx !== -1 ? row[phoneIdx] : row[4] || "";
      if (!name && !phone) continue;
      
      leads.push({
        id: (idIdx !== -1 && row[idIdx]) ? row[idIdx].toString() : "lead-sheet-" + r,
        submittedAt: (dateIdx !== -1 && row[dateIdx]) ? row[dateIdx].toString() : "",
        name: name.toString(),
        fatherName: (fatherIdx !== -1 && row[fatherIdx]) ? row[fatherIdx].toString() : "",
        phone: phone.toString().replace(/^'+/, ""),
        email: (emailIdx !== -1 && row[emailIdx]) ? row[emailIdx].toString() : "",
        state: (stateIdx !== -1 && row[stateIdx]) ? row[stateIdx].toString() : "",
        city: (cityIdx !== -1 && row[cityIdx]) ? row[cityIdx].toString() : "",
        qualification: (qualIdx !== -1 && row[qualIdx]) ? row[qualIdx].toString() : "",
        targetRole: (roleIdx !== -1 && row[roleIdx]) ? row[roleIdx].toString() : "Airport Ground Staff (AGS)",
        source: (sourceIdx !== -1 && row[sourceIdx]) ? row[sourceIdx].toString() : "Google Sheet Sync",
        status: (statusIdx !== -1 && row[statusIdx]) ? row[statusIdx].toString().toLowerCase() : "new",
        notes: (notesIdx !== -1 && row[notesIdx]) ? row[notesIdx].toString() : ""
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: leads.length, leads: leads }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

    navigator.clipboard.writeText(script);
    setIsScriptCopied(true);
    toast.success("Google Apps Script code copied to clipboard!");
    setTimeout(() => setIsScriptCopied(false), 3000);
  };

  // Safe collections
  const safeJobPosts = Array.isArray(jobPosts) ? jobPosts : [];
  const safeNotices = Array.isArray(notices) ? notices : [];
  const safeBranches = Array.isArray(branches) ? branches : [];
  const safeLeads = (Array.isArray(leads) ? [...leads] : []).sort((a, b) => {
    // 1. Try comparing numeric timestamp from ID if present (e.g. lead-1724... or lead-sheet-...)
    const aTimeMatch = (a?.id || "").match(/\d{10,14}/);
    const bTimeMatch = (b?.id || "").match(/\d{10,14}/);
    const aTimeFromId = aTimeMatch ? parseInt(aTimeMatch[0], 10) : 0;
    const bTimeFromId = bTimeMatch ? parseInt(bTimeMatch[0], 10) : 0;

    // 2. Try parsing submittedAt date string
    const aDateParsed = a?.submittedAt ? Date.parse(a.submittedAt) : 0;
    const bDateParsed = b?.submittedAt ? Date.parse(b.submittedAt) : 0;

    const aScore = Math.max(aTimeFromId, isNaN(aDateParsed) ? 0 : aDateParsed);
    const bScore = Math.max(bTimeFromId, isNaN(bDateParsed) ? 0 : bDateParsed);

    if (bScore !== aScore) {
      return bScore - aScore; // Descending (newest on top)
    }

    return 0;
  });

  // Filtered queries with null-safe string handling
  const filteredJobs = safeJobPosts.filter(
    (j) =>
      (j?.title || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
      (j?.department || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
      (j?.location || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
      (j?.jobCode || "").toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredNotices = safeNotices.filter(
    (n) =>
      (n?.title || "").toLowerCase().includes(noticeSearch.toLowerCase()) ||
      (n?.description || "").toLowerCase().includes(noticeSearch.toLowerCase()) ||
      (n?.badge || "").toLowerCase().includes(noticeSearch.toLowerCase())
  );

  const filteredLeads = safeLeads.filter((l) => {
    if (!l) return false;
    const matchesSearch =
      (l.name || "").toLowerCase().includes(leadSearch.toLowerCase()) ||
      (l.phone || "").toLowerCase().includes(leadSearch.toLowerCase()) ||
      ((l.email || "").toLowerCase().includes(leadSearch.toLowerCase())) ||
      ((l.targetRole || "").toLowerCase().includes(leadSearch.toLowerCase()));
    const matchesStatus = leadStatusFilter === "all" || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <SEO
        title="Admin Control Center | Indian Alliance Services"
        description="Administrative management console for Indian Alliance Services (IAS)."
        noIndex={true}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {/* Top Executive Header */}
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="bg-white px-3 py-1 rounded-xl shadow-sm border border-slate-700/40 flex items-center">
                <img
                  src="/logo.png?v=ias2026"
                  alt="Indian Alliance Services"
                  className="h-10 sm:h-12 w-auto max-w-[240px] object-contain"
                />
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-800" />
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <ShieldCheck className="h-3.5 w-3.5" /> Admin Portal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 px-3 py-2 rounded-xl transition-colors border border-slate-700/50"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden md:inline">View Live Website</span>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="text-xs font-bold border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
              </Button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="border-t border-slate-800/80 bg-slate-900/50">
            <div className="container mx-auto px-4 flex overflow-x-auto no-scrollbar gap-1.5 py-2">
              {[
                { id: "overview", label: "Dashboard", icon: LayoutDashboard },
                { id: "careers", label: `Job Posts (${safeJobPosts.length})`, icon: Briefcase },
                { id: "notifications", label: `Notices (${safeNotices.length})`, icon: Bell },
                { id: "branches", label: `Offices (${safeBranches.length})`, icon: Building2 },
                { id: "settings", label: "Phone & Site Settings", icon: Settings },
                { id: "leads", label: `Leads CRM (${safeLeads.length})`, icon: Users },
                { id: "database", label: "Cloud Sync", icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      active
                        ? "bg-amber-500 text-slate-950 shadow-md scale-100"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {/* ==================================================
              1. OVERVIEW TAB
              ================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Active Job Vacancies
                    </span>
                    <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-black text-white">
                    {safeJobPosts.filter((j) => j?.status === "active").length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Out of {safeJobPosts.length} total vacancies configured
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Total Student Leads
                    </span>
                    <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-black text-white">
                    {safeLeads.length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {safeLeads.filter((l) => l?.status === "new").length} new awaiting contact
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Active Notices
                    </span>
                    <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-black text-white">
                    {safeNotices.filter(isNoticeActive).length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {safeNotices.length} total ({safeNotices.filter((n) => !isNoticeActive(n)).length} auto-expired)
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Live Helpline
                    </span>
                    <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400">
                      <Phone className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-base font-heading font-bold text-white truncate">
                    {settings.helplinePhone}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    Email: {settings.supportEmail}
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
                  <h3 className="font-heading font-bold text-lg text-white">
                    Quick Management Shortcuts
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={handleOpenCreateJob}
                      className="w-full justify-start gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-5 rounded-2xl text-xs"
                    >
                      <Plus className="h-4 w-4" /> Add New Job Vacancy
                    </Button>
                    <Button
                      onClick={handleOpenCreateNotice}
                      variant="outline"
                      className="w-full justify-start gap-2.5 border-slate-700 bg-slate-950/60 hover:bg-slate-800 text-white font-semibold py-5 rounded-2xl text-xs"
                    >
                      <Bell className="h-4 w-4 text-amber-400" /> Post New Recruitment Alert
                    </Button>
                    <Button
                      onClick={handleOpenCreateBranch}
                      variant="outline"
                      className="w-full justify-start gap-2.5 border-slate-700 bg-slate-950/60 hover:bg-slate-800 text-white font-semibold py-5 rounded-2xl text-xs"
                    >
                      <Building2 className="h-4 w-4 text-blue-400" /> Add Office Location
                    </Button>
                    <Button
                      onClick={() => setActiveTab("settings")}
                      variant="outline"
                      className="w-full justify-start gap-2.5 border-slate-700 bg-slate-950/60 hover:bg-slate-800 text-white font-semibold py-5 rounded-2xl text-xs"
                    >
                      <Settings className="h-4 w-4 text-amber-400" /> Change Phone Number / Email
                    </Button>
                    <Button
                      onClick={handleExportLeads}
                      variant="outline"
                      className="w-full justify-start gap-2.5 border-slate-700 bg-slate-950/60 hover:bg-slate-800 text-white font-semibold py-5 rounded-2xl text-xs"
                    >
                      <FileSpreadsheet className="h-4 w-4 text-emerald-400" /> Export Student Leads (.CSV)
                    </Button>
                  </div>
                </div>

                {/* Right: Recent Leads Table */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      Latest Candidate Enquiries
                    </h3>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => setActiveTab("leads")}
                      className="text-amber-400 text-xs p-0 font-bold"
                    >
                      View All ({leads.length}) →
                    </Button>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-xs">
                      No candidate enquiries submitted yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="pb-3 font-semibold">Candidate</th>
                            <th className="pb-3 font-semibold">Phone</th>
                            <th className="pb-3 font-semibold">Target Role</th>
                            <th className="pb-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {leads.slice(0, 5).map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-800/30">
                              <td className="py-3 font-bold text-white">
                                {lead.name}
                                <div className="text-[10px] text-slate-500 font-normal">
                                  {lead.submittedAt}
                                </div>
                              </td>
                              <td className="py-3 text-slate-300 font-mono">
                                <a href={`tel:${lead.phone}`} className="hover:text-amber-400">
                                  {lead.phone}
                                </a>
                              </td>
                              <td className="py-3 text-slate-300">{lead.targetRole || "General"}</td>
                              <td className="py-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    lead.status === "new"
                                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                      : lead.status === "contacted"
                                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  }`}
                                >
                                  {lead.status.toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              2. CAREERS & JOB POSTS TAB
              ================================================== */}
          {activeTab === "careers" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    Careers & Job Postings Manager ({jobPosts.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add, edit, or toggle active status of airport & corporate job vacancies displayed on /careers
                  </p>
                </div>

                <Button
                  onClick={handleOpenCreateJob}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 px-5 py-5 rounded-2xl text-xs shrink-0 shadow-md"
                >
                  <Plus className="h-4 w-4" /> Add New Job Post
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search jobs by title, department, or code..."
                  className="w-full h-11 pl-10 pr-4 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                />
              </div>

              {/* Jobs List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-slate-900 border rounded-3xl p-6 shadow-sm transition-all space-y-4 ${
                      job.status === "active" ? "border-slate-800 hover:border-amber-500/40" : "border-red-500/20 opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {/* Job Thumbnail */}
                        <div className="h-16 w-16 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
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
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider font-mono">
                              {job.companyName || "AIRLINE"}
                            </span>
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                              {job.jobCode}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                job.status === "active"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : "bg-red-500/15 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {job.status === "active" ? "ACTIVE / OPEN" : "INACTIVE / CLOSED"}
                            </span>
                          </div>
                          <h3 className="text-base font-heading font-extrabold text-white leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">
                            {job.department}
                          </p>
                        </div>
                      </div>

                      {/* Toggle Active Button */}
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        title={job.status === "active" ? "Click to Deactivate" : "Click to Activate"}
                        className="text-slate-400 hover:text-amber-400 shrink-0"
                      >
                        {job.status === "active" ? (
                          <ToggleRight className="h-8 w-8 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-slate-600" />
                        )}
                      </button>
                    </div>

                    {/* Homepage Card Key-Values Preview Box */}
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-amber-500/20 space-y-1 text-xs">
                      <div className="text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">COMPANY:</span>{" "}
                        <strong className="text-amber-400 uppercase">{job.companyName || "INDIGO"}</strong>
                      </div>
                      <div className="text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">POST NAME:</span>{" "}
                        <strong className="text-slate-200 uppercase">{job.postName || job.title}</strong>
                      </div>
                      <div className="text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">CATEGORY:</span>{" "}
                        <strong className="text-slate-300 uppercase">{job.jobCategory || "FRESHER AND EXPERIANCE CANDIDATES BOTH"}</strong>
                      </div>
                      <div className="text-[11px] font-mono">
                        <span className="text-slate-400 font-semibold">LOCATION:</span>{" "}
                        <strong className="text-amber-400 uppercase">{job.jobLocation || job.location}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Salary Range</span>
                        <strong className="text-slate-200">{job.salaryRange}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Openings</span>
                        <strong className="text-slate-200">{job.openings} Seats</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Qualification</span>
                        <strong className="text-slate-200">{job.qualification}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Base Location</span>
                        <strong className="text-slate-200 truncate block">{job.location}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {job.overview}
                    </p>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Posted: {job.postedDate}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEditJob(job)}
                          className="h-8 px-3 text-xs border-slate-700 bg-slate-800/60 text-slate-200 hover:text-amber-400 hover:bg-slate-800 rounded-xl font-bold"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm(`Delete vacancy "${job.title}"?`)) {
                              deleteJobPost(job.id);
                              toast.success("Job deleted successfully");
                            }
                          }}
                          className="h-8 px-3 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl font-bold"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              3. NOTIFICATIONS & GOOGLE SHEET SYNC TAB
              ================================================== */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    Notifications & Recruitment Alerts ({notices.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage walk-in drives, admit card circulars, and advisories with automated expiration pruning.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    onClick={handlePurgeExpired}
                    variant="outline"
                    className="border-slate-700 bg-slate-900 text-slate-300 hover:text-white rounded-2xl text-xs h-11"
                  >
                    🧹 Purge Expired
                  </Button>
                  <Button
                    onClick={handleOpenCreateNotice}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 px-5 py-5 rounded-2xl text-xs shadow-md"
                  >
                    <Plus className="h-4 w-4" /> Post New Alert
                  </Button>
                </div>
              </div>

              {/* Google Sheet Live Source Integration Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                    <FileSpreadsheet className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Google Sheets Live Feed Integration
                    </h3>
                    <p className="text-xs text-slate-400">
                      Publish a Google Sheet as CSV to automatically sync recruitment circulars. Expired dates will auto-hide from public view.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={googleSheetInputUrl}
                    onChange={(e) => setGoogleSheetInputUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                    className="flex-1 h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-mono font-medium"
                  />
                  <Button
                    onClick={handleSyncGoogleSheet}
                    disabled={isGoogleSyncing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-6 rounded-xl text-xs gap-2 shrink-0 shadow-md"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isGoogleSyncing ? "animate-spin" : ""}`} />
                    <span>{isGoogleSyncing ? "Syncing..." : "Sync from Google Sheet"}</span>
                  </Button>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  <strong>Expected Google Sheet Columns:</strong> <code className="text-amber-400 font-mono">Title, Category, Date, ExpiryDate, Badge, Description, Location, LinkText</code>
                  <br />
                  <span className="text-slate-500">How to get CSV URL: In Google Sheets, click <em>File → Share → Publish to web → Select Sheet → Choose CSV → Click Publish</em>.</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  placeholder="Search notices by title, badge, or description..."
                  className="w-full h-11 pl-10 pr-4 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                />
              </div>

              {/* Notices List */}
              <div className="space-y-4">
                {filteredNotices.map((notice) => {
                  const active = isNoticeActive(notice);
                  return (
                    <div
                      key={notice.id}
                      className={`bg-slate-900 border rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                        active ? "border-slate-800" : "border-red-500/30 opacity-70 bg-red-950/10"
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            {notice.badge}
                          </span>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              active
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : "bg-red-500/15 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {active ? "🟢 ACTIVE (Live on Site)" : "🔴 EXPIRED (Auto-Hidden)"}
                          </span>

                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {notice.date}
                          </span>

                          {notice.expiryDate && (
                            <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                              <Clock className="h-3 w-3" /> Valid Till: {notice.expiryDate}
                            </span>
                          )}

                          <span className="text-[10px] font-mono text-slate-500">
                            {notice.id}
                          </span>

                          {notice.source === "google_sheets" && (
                            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              Google Sheet
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading font-bold text-base text-white">
                          {notice.title}
                        </h3>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {notice.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEditNotice(notice)}
                          className="h-8 px-3 text-xs border-slate-700 bg-slate-800/60 text-slate-200 hover:text-amber-400 rounded-xl"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm("Delete this notification?")) {
                              deleteNotice(notice.id);
                              toast.success("Notification deleted");
                            }
                          }}
                          className="h-8 px-3 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================================================
              4. OFFICE BRANCHES TAB
              ================================================== */}
          {activeTab === "branches" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    Office Locations & Regional Centers ({branches.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage company office addresses shown across Contact Us and Footer
                  </p>
                </div>

                <Button
                  onClick={handleOpenCreateBranch}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 px-5 py-5 rounded-2xl text-xs shrink-0 shadow-md"
                >
                  <Plus className="h-4 w-4" /> Add New Branch
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-slate-800 px-2.5 py-0.5 rounded-full font-mono">
                          {branch.city}
                        </span>
                        <h3 className="font-heading font-bold text-base text-white mt-1.5">
                          {branch.officeName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenEditBranch(branch)}
                          className="h-7 w-7 p-0 text-slate-300 hover:text-amber-400"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Delete office ${branch.officeName}?`)) {
                              deleteBranch(branch.id);
                              toast.success("Office deleted");
                            }
                          }}
                          className="h-7 w-7 p-0 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>{branch.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              5. SITE SETTINGS & CONTACT TAB
              ================================================== */}
          {activeTab === "settings" && (
            <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Site & Contact Details Manager
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update customer helpline number, WhatsApp, official support email, Google Sheets feed, and header advisory notices in 1-click.
                </p>
              </div>

              {/* Main Settings Form */}
              <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-amber-400" />
                  <span>Verified Contact Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Official Helpline Number
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={formData.helplinePhone}
                        onChange={(e) => setFormData({ ...formData, helplinePhone: e.target.value })}
                        placeholder="+91 7851836860"
                        required
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Displayed on Navbar, Footer, and Contact sections
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      WhatsApp Concierge Number
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        type="text"
                        value={formData.whatsappPhone}
                        onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                        placeholder="+91 7851836860"
                        required
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Connected to the bottom-right WhatsApp quick chat widget
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Official Support Email
                    </label>
                    <div className="relative">
                      <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        value={formData.supportEmail}
                        onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                        placeholder="support@indianallianceservices.com"
                        required
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Office Working Hours
                    </label>
                    <div className="relative">
                      <Clock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={formData.officeHours}
                        onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                        placeholder="Mon – Sat: 9:30 AM – 6:30 PM (IST)"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Google Sheet Lead Webhook URL (POST)
                    </label>
                    <div className="relative">
                      <Send className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                      <input
                        type="url"
                        value={formData.leadWebhookUrl || ""}
                        onChange={(e) => setFormData({ ...formData, leadWebhookUrl: e.target.value })}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Dispatches visitor candidate leads instantly to your Google Sheet
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Google Sheet Published CSV for Leads (GET)
                    </label>
                    <div className="relative">
                      <Table className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                      <input
                        type="url"
                        value={formData.leadSheetCsvUrl || ""}
                        onChange={(e) => setFormData({ ...formData, leadSheetCsvUrl: e.target.value })}
                        placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Syncs leads back into Admin Dashboard table from Google Sheet
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Google Sheets Published CSV URL for Notifications
                  </label>
                  <div className="relative">
                    <FileSpreadsheet className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="url"
                      value={formData.googleSheetsNoticeUrl}
                      onChange={(e) => setFormData({ ...formData, googleSheetsNoticeUrl: e.target.value })}
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Auto-syncs live notifications feed directly from Google Sheets
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Primary Display Address (Head Office)
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={formData.displayAddress}
                      onChange={(e) => setFormData({ ...formData, displayAddress: e.target.value })}
                      placeholder="Enter corporate office address..."
                      className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-slate-800 pt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Top Header Advisory / Fraud Warning Notice
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.enableNoticeBanner}
                        onChange={(e) => setFormData({ ...formData, enableNoticeBanner: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500"
                      />
                      <span>Show Banner on Website</span>
                    </label>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.bannerNotice}
                    onChange={(e) => setFormData({ ...formData, bannerNotice: e.target.value })}
                    placeholder="Enter security advisory or important announcement..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5 border-t border-slate-800 pt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 block flex items-center gap-1.5">
                      <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                      <span>Student Interview Tips Portal Access Password</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.studentAccessPassword || ""}
                    onChange={(e) => setFormData({ ...formData, studentAccessPassword: e.target.value })}
                    placeholder="IAS#Student@2026"
                    className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-amber-300 placeholder:text-slate-500 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    Students visiting <code className="text-amber-400 font-mono">/interview-tips</code> must enter this password to unlock interview question banks, GD tips, and mock interview answers.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto font-bold py-5 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 gap-2 text-xs shadow-lg"
                >
                  <Save className="h-4 w-4" /> Save Contact & Site Settings
                </Button>
              </form>

              {/* Password Change Box */}
              <form onSubmit={handleSaveCredentials} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-amber-400" />
                  <span>Update Admin Login Password</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Admin Email</label>
                    <input
                      type="text"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-xl text-xs font-bold"
                >
                  Update Credentials
                </Button>
              </form>
            </div>
          )}

          {/* ==================================================
              6. CANDIDATE LEADS TAB
              ================================================== */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    Candidate Leads & Enquiries ({leads.length})
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    View incoming student registrations, phone numbers, and interview counselling requests
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="outline"
                    onClick={handleSyncLeads}
                    disabled={isLeadSyncing}
                    className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-950/40 font-bold gap-2 px-3.5 py-5 rounded-2xl text-xs shadow-sm"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLeadSyncing ? "animate-spin" : ""}`} />
                    {isLeadSyncing ? "Syncing..." : "Sync Google Sheet"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      reloadLeads();
                      toast.success("Leads refreshed successfully");
                    }}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 font-bold gap-2 px-3.5 py-5 rounded-2xl text-xs"
                  >
                    <RefreshCw className="h-4 w-4" /> Local Reload
                  </Button>
                  <Button
                    onClick={handleExportLeads}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 px-4 py-5 rounded-2xl text-xs shadow-md"
                  >
                    <Download className="h-4 w-4" /> Export CSV / Excel
                  </Button>
                  {leads.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (confirm("Are you sure you want to clear all leads?")) {
                          clearAllLeads();
                          toast.success("All leads cleared");
                        }
                      }}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-2xl text-xs h-10"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              {/* Webhook Connection Alert Banner */}
              {settings.leadWebhookUrl ? (
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong className="text-emerald-300">Live Google Sheet Webhook Active:</strong> Leads submitted by website visitors & Meta Ad campaigns are being automatically sent to your Google Sheet.
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab("database")}
                    className="text-emerald-400 hover:underline font-bold text-[11px] shrink-0"
                  >
                    Database Settings →
                  </button>
                </div>
              ) : (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start sm:items-center gap-2.5 text-amber-200">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5 sm:mt-0" />
                    <div>
                      <strong className="text-amber-400">Google Sheet Webhook Not Connected:</strong> Leads submitted by visitors on their mobile devices are not automatically arriving on this dashboard. Connect your Google Sheet now to collect all website leads in real-time.
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("database")}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs px-3.5 py-2 shrink-0 shadow whitespace-nowrap"
                  >
                    Connect Google Sheet (2 min) →
                  </Button>
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search by candidate name, phone number, email, or role..."
                    className="w-full h-11 pl-10 pr-4 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 rounded-2xl text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
                  {["all", "new", "contacted", "enrolled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                        leadStatusFilter === st
                          ? "bg-amber-500 text-slate-950"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 text-slate-500 text-xs">
                    No candidate leads match your search criteria.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                          <th className="py-3.5 px-5 font-semibold">Date</th>
                          <th className="py-3.5 px-5 font-semibold">Candidate & Father</th>
                          <th className="py-3.5 px-5 font-semibold">Phone Number</th>
                          <th className="py-3.5 px-5 font-semibold">Location</th>
                          <th className="py-3.5 px-5 font-semibold">Role Applied</th>
                          <th className="py-3.5 px-5 font-semibold">Qualification</th>
                          <th className="py-3.5 px-5 font-semibold">Status</th>
                          <th className="py-3.5 px-5 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-5 text-slate-400 whitespace-nowrap">
                              {lead.submittedAt}
                            </td>
                            <td className="py-4 px-5 font-bold text-white">
                              <div>{lead.name}</div>
                              {lead.fatherName && (
                                <div className="text-[11px] text-slate-400 font-normal">
                                  S/D/W of: <span className="text-slate-300 font-medium">{lead.fatherName}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-5 text-amber-400 font-mono font-semibold">
                              <a href={`tel:${lead.phone}`} className="hover:underline">
                                {lead.phone}
                              </a>
                              {lead.email && (
                                <div className="text-[10px] text-slate-500 font-normal font-sans truncate max-w-[140px]">
                                  {lead.email}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-5 text-slate-300">
                              {lead.city || lead.state ? (
                                <div>
                                  <span className="font-medium text-white">{lead.city || "—"}</span>
                                  {lead.state && (
                                    <div className="text-[10px] text-slate-400">{lead.state}</div>
                                  )}
                                </div>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-4 px-5 text-slate-300 font-medium">
                              {lead.targetRole || "General Aviation"}
                            </td>
                            <td className="py-4 px-5 text-slate-400">
                              {lead.qualification || "—"}
                            </td>
                            <td className="py-4 px-5">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`text-[11px] font-bold rounded-xl px-2.5 py-1 bg-slate-950 border ${
                                  lead.status === "new"
                                    ? "border-amber-500/50 text-amber-400"
                                    : lead.status === "contacted"
                                    ? "border-blue-500/50 text-blue-400"
                                    : "border-emerald-500/50 text-emerald-400"
                                }`}
                              >
                                <option value="new">New Lead</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_review">In Review</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  if (confirm(`Remove lead for ${lead.name}?`)) {
                                    deleteLead(lead.id);
                                    toast.success("Lead removed");
                                  }
                                }}
                                className="h-7 w-7 p-0 text-slate-500 hover:text-red-400"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================
              7. CLOUD DATABASE & SUPABASE TAB
          {/* ==================================================
              7. CLOUD DATABASE & GOOGLE SHEETS WEBHOOK TAB
              ================================================== */}
          {activeTab === "database" && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Cloud Database & Google Sheets Lead Automation
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Capture all website & Meta Ad candidate leads instantly into your Google Sheet and synchronize across devices.
                </p>
              </div>

              {/* Card 1: Google Sheets Real-Time Lead Webhook */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                      <FileSpreadsheet className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Google Sheets Real-Time Lead Webhook
                      </h3>
                      <p className="text-xs text-slate-400">
                        Status: {settings.leadWebhookUrl ? "🟢 Active & Receiving Visitor Leads" : "⚠️ Not Connected (Leads stored locally only)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">
                      1. Google Apps Script Webhook URL (POST - For Saving Incoming Leads)
                    </label>
                    <div className="relative">
                      <Send className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                      <input
                        type="url"
                        value={leadWebhookInput}
                        onChange={(e) => setLeadWebhookInput(e.target.value)}
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Every time a candidate clicks "Submit" on mobile or PC, their full application is dispatched to this URL.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">
                      2. Google Sheet Published CSV URL (GET - For Syncing Leads Back to Dashboard)
                    </label>
                    <div className="relative">
                      <Table className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                      <input
                        type="url"
                        value={leadCsvInput}
                        onChange={(e) => setLeadCsvInput(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"
                        className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-mono font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Publish your Google Sheet to web as CSV (<code className="text-amber-300">File → Share → Publish to web → CSV</code>) and paste the link here.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      onClick={async () => {
                        await updateSettings({
                          leadWebhookUrl: leadWebhookInput.trim(),
                          leadSheetCsvUrl: leadCsvInput.trim(),
                        });
                        toast.success("Google Sheet Webhook settings saved successfully!");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 px-6 rounded-2xl text-xs shadow-md"
                    >
                      <Save className="h-4 w-4" /> Save Webhook Settings
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleTestLeadWebhook}
                      disabled={isTestingWebhook}
                      className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-bold py-5 px-5 rounded-2xl text-xs"
                    >
                      <Send className={`h-4 w-4 ${isTestingWebhook ? "animate-spin" : ""}`} />
                      {isTestingWebhook ? "Sending Test..." : "Send Test Lead Payload"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleSyncLeads}
                      disabled={isLeadSyncing}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 font-bold py-5 px-5 rounded-2xl text-xs"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLeadSyncing ? "animate-spin" : ""}`} />
                      {isLeadSyncing ? "Syncing Leads..." : "Sync Leads from Google Sheet"}
                    </Button>
                  </div>
                </div>

                {/* Setup Guide & 1-Click Code Copy */}
                <div className="border-t border-slate-800 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>How to create your Google Apps Script in 2 minutes:</span>
                    </h4>
                    <Button
                      onClick={handleCopyAppsScript}
                      variant="outline"
                      className="border-amber-500/40 text-amber-400 hover:bg-amber-500/15 text-xs font-bold gap-1.5 h-9 rounded-xl"
                    >
                      {isScriptCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      {isScriptCopied ? "Copied Code!" : "Copy Apps Script Code"}
                    </Button>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <li>Create a new blank spreadsheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-amber-400 underline font-semibold">sheets.new</a>.</li>
                    <li>In the top menu, click <strong>Extensions</strong> → <strong>Apps Script</strong>.</li>
                    <li>Delete any existing code in the editor, click <strong>Copy Apps Script Code</strong> above, and paste it.</li>
                    <li>Click <strong>Deploy</strong> (blue button at top right) → <strong>New deployment</strong>.</li>
                    <li>Click the gear icon ⚙️ → Select <strong>Web app</strong>.</li>
                    <li>Set <em>Execute as:</em> <strong>Me</strong> and set <em>Who has access:</em> <strong>Anyone</strong>.</li>
                    <li>Click <strong>Deploy</strong>, authorize Google permissions, copy the <strong>Web app URL</strong>, and paste it into field #1 above!</li>
                  </ol>
                </div>
              </div>

              {/* Card 2: Supabase Cloud Database */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-400">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Supabase PostgreSQL Cloud Storage (Alternative)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Status: {cloudConfig.isCloudConnected ? "✅ Connected & Synchronized" : "⚡ Local Storage Mode (Ready for Cloud Sync)"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Supabase Project URL
                    </label>
                    <input
                      type="text"
                      value={cloudConfig.supabaseUrl}
                      onChange={(e) => updateCloudConfig({ supabaseUrl: e.target.value })}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Supabase Anon Public API Key
                    </label>
                    <input
                      type="password"
                      value={cloudConfig.supabaseAnonKey}
                      onChange={(e) => updateCloudConfig({ supabaseAnonKey: e.target.value })}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <Button
                    onClick={async () => {
                      const ok = await syncWithCloud();
                      if (ok) {
                        toast.success("Connected to Supabase cloud successfully!");
                      } else {
                        toast.error("Please provide both Supabase URL and Anon Key");
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-6 rounded-2xl text-xs shadow-md"
                  >
                    Test Connection & Sync Supabase
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ==================================================
            JOB CREATE / EDIT MODAL
            ================================================== */}
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  {editingJobId ? "Edit Job Vacancy" : "Post New Job Vacancy"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-200 block">Job Title *</label>
                    <input
                      type="text"
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                      placeholder="e.g., Airport Ground Staff Executive"
                      required
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-400 block">Company Name (e.g. INDIGO) *</label>
                    <input
                      type="text"
                      value={jobFormData.companyName}
                      onChange={(e) => setJobFormData({ ...jobFormData, companyName: e.target.value })}
                      placeholder="e.g., INDIGO, AIR INDIA, SPICEJET"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-white placeholder:text-slate-500 rounded-xl text-sm font-bold uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-400 block">Job Location (e.g. AHMEDABAD) *</label>
                    <input
                      type="text"
                      value={jobFormData.jobLocation}
                      onChange={(e) => setJobFormData({ ...jobFormData, jobLocation: e.target.value })}
                      placeholder="e.g., AHMEDABAD, JAIPUR, DELHI NCR"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-white placeholder:text-slate-500 rounded-xl text-sm font-bold uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-amber-400 block">Post Name (Full Heading on Card) *</label>
                    <input
                      type="text"
                      value={jobFormData.postName}
                      onChange={(e) => setJobFormData({ ...jobFormData, postName: e.target.value })}
                      placeholder="e.g., OFFICER / EXECUTIVE - RAMP SECURITY , CATERING AND CABIN APPEARANCE"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-white placeholder:text-slate-500 rounded-xl text-sm font-bold uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-amber-400 block">Job Category (Card Tag) *</label>
                    <input
                      type="text"
                      value={jobFormData.jobCategory}
                      onChange={(e) => setJobFormData({ ...jobFormData, jobCategory: e.target.value })}
                      placeholder="e.g., FRESHER AND EXPERIANCE CANDIDATES BOTH"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-white placeholder:text-slate-500 rounded-xl text-sm font-bold uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Card Image Selector & File Upload Manager */}
                  <div className="space-y-3 sm:col-span-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <ImageIcon className="h-4 w-4 text-amber-400" />
                        <span>Card Image (Upload from Computer or Choose Preset)</span>
                      </label>
                      {jobFormData.imageUrl && (
                        <span className="text-[10px] text-emerald-400 font-mono">Image Selected</span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Live Image Preview */}
                      <div className="h-20 w-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 relative group">
                        <img
                          src={jobFormData.imageUrl || "/hero-aviation.jpg"}
                          alt="Job Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/hero-aviation.jpg";
                          }}
                        />
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        {/* Direct File Upload Button */}
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all">
                            <Upload className="h-3.5 w-3.5" />
                            <span>Upload Image from Device</span>
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[11px] text-slate-500">Supports PNG, JPG, WebP</span>
                        </div>

                        {/* Or Manual URL input */}
                        <input
                          type="text"
                          value={jobFormData.imageUrl}
                          onChange={(e) => setJobFormData({ ...jobFormData, imageUrl: e.target.value })}
                          placeholder="or enter image path (e.g. /jobs/job-1.jpg or https://...)"
                          className="w-full h-9 px-3 bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Quick 1-Click Stock Presets */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Quick 1-Click Aviation Photos:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "IndiGo Ground", path: "/jobs/job-1.jpg" },
                          { name: "Ramp Security", path: "/jobs/job-2.jpg" },
                          { name: "Cabin Crew", path: "/jobs/job-3.jpg" },
                          { name: "Air India CSA", path: "/jobs/job-5.jpg" },
                          { name: "Air India Crew", path: "/jobs/job-6.jpg" },
                          { name: "Akasa Air", path: "/jobs/job-7.jpg" },
                          { name: "SpiceJet Cargo", path: "/jobs/job-8.jpg" },
                          { name: "VIP Lounge", path: "/jobs/job-11.jpg" },
                          { name: "Airport Hero", path: "/hero-aviation.jpg" },
                        ].map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => setJobFormData({ ...jobFormData, imageUrl: preset.path })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                              jobFormData.imageUrl === preset.path
                                ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                                : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Department</label>
                    <input
                      type="text"
                      value={jobFormData.department}
                      onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                      placeholder="e.g., Passenger Services"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Internal Job Code</label>
                    <input
                      type="text"
                      value={jobFormData.jobCode}
                      onChange={(e) => setJobFormData({ ...jobFormData, jobCode: e.target.value })}
                      placeholder="e.g., IAS-AGS-2026"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Job Type</label>
                    <input
                      type="text"
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                      placeholder="e.g., Full-Time (Shift Based)"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Salary Range</label>
                    <input
                      type="text"
                      value={jobFormData.salaryRange}
                      onChange={(e) => setJobFormData({ ...jobFormData, salaryRange: e.target.value })}
                      placeholder="e.g., ₹25,000 – ₹45,000 / month"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Location</label>
                    <input
                      type="text"
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                      placeholder="e.g., Mumbai, Delhi NCR, Bangalore Airports"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Qualification</label>
                    <input
                      type="text"
                      value={jobFormData.qualification}
                      onChange={(e) => setJobFormData({ ...jobFormData, qualification: e.target.value })}
                      placeholder="e.g., 12th Pass or Any Graduate"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Experience Required</label>
                    <input
                      type="text"
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                      placeholder="e.g., Freshers Welcome / 0–2 Years"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Total Openings</label>
                    <input
                      type="number"
                      min={1}
                      value={jobFormData.openings}
                      onChange={(e) => setJobFormData({ ...jobFormData, openings: parseInt(e.target.value) || 1 })}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Badge Text</label>
                    <input
                      type="text"
                      value={jobFormData.badge}
                      onChange={(e) => setJobFormData({ ...jobFormData, badge: e.target.value })}
                      placeholder="e.g., Active Walk-in / High Demand"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Hiring Status</label>
                    <select
                      value={jobFormData.status}
                      onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value as any })}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="active" className="bg-slate-900 text-white">Active / Open for Applications</option>
                      <option value="inactive" className="bg-slate-900 text-white">Inactive / Closed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Job Overview Summary</label>
                  <textarea
                    rows={2}
                    value={jobFormData.overview}
                    onChange={(e) => setJobFormData({ ...jobFormData, overview: e.target.value })}
                    placeholder="Brief 2-3 sentence overview of this role..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">
                    Key Responsibilities (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={jobFormData.responsibilities}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                    placeholder="Line 1: Passenger verification&#10;Line 2: Boarding gate assistance&#10;Line 3: Baggage tagging"
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">
                    Candidate Requirements (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={jobFormData.requirements}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                    placeholder="Line 1: 12th pass minimum&#10;Line 2: Fluent spoken Hindi&#10;Line 3: Basic computer literacy"
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsJobModalOpen(false)}
                    className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-5 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-5 rounded-xl text-xs shadow-md"
                  >
                    {editingJobId ? "Save Job Changes" : "Publish Job Post"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================
            NOTIFICATION CREATE / EDIT MODAL
            ================================================== */}
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-heading font-extrabold text-white">
                  {editingNoticeId ? "Edit Notification Alert" : "Publish New Recruitment Alert"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNotice} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Notice Title *</label>
                  <input
                    type="text"
                    value={noticeFormData.title}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                    placeholder="e.g., Airport Ground Staff Walk-in Drive 2026"
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Category</label>
                    <select
                      value={noticeFormData.category}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, category: e.target.value as any })}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                    >
                      <option value="walkin" className="bg-slate-900 text-white">Walk-in Drive</option>
                      <option value="admitcard" className="bg-slate-900 text-white">Admit Card</option>
                      <option value="result" className="bg-slate-900 text-white">Selection Result</option>
                      <option value="advisory" className="bg-slate-900 text-white">Advisory Notice</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Badge Text</label>
                    <input
                      type="text"
                      value={noticeFormData.badge}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, badge: e.target.value })}
                      placeholder="e.g., Active Walk-in"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Posted Date</label>
                    <input
                      type="text"
                      value={noticeFormData.date}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, date: e.target.value })}
                      placeholder="e.g., 18 August 2026"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">
                      Expiry Date <span className="text-amber-400 text-[10px] font-normal">(Auto-removes when expired)</span>
                    </label>
                    <input
                      type="date"
                      value={noticeFormData.expiryDate}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, expiryDate: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Description Summary</label>
                  <textarea
                    rows={3}
                    value={noticeFormData.description}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, description: e.target.value })}
                    placeholder="Brief description of the drive or announcement..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNoticeModalOpen(false)}
                    className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-5 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-5 rounded-xl text-xs shadow-md"
                  >
                    {editingNoticeId ? "Save Changes" : "Publish Notice"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================
            BRANCH CREATE / EDIT MODAL
            ================================================== */}
        {isBranchModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-heading font-extrabold text-white">
                  {editingBranchId ? "Edit Office Center" : "Add New Office Location"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBranch} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">City / State *</label>
                    <input
                      type="text"
                      value={branchFormData.city}
                      onChange={(e) => setBranchFormData({ ...branchFormData, city: e.target.value })}
                      placeholder="e.g. Bangalore"
                      required
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">Office Title</label>
                    <input
                      type="text"
                      value={branchFormData.officeName}
                      onChange={(e) => setBranchFormData({ ...branchFormData, officeName: e.target.value })}
                      placeholder="e.g. Karnataka Regional Hub"
                      className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Full Physical Address *</label>
                  <textarea
                    rows={2}
                    value={branchFormData.address}
                    onChange={(e) => setBranchFormData({ ...branchFormData, address: e.target.value })}
                    placeholder="Enter complete office address..."
                    required
                    className="w-full p-3 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsBranchModalOpen(false)}
                    className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-5 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-5 rounded-xl text-xs shadow-md"
                  >
                    {editingBranchId ? "Save Office" : "Add Office"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
