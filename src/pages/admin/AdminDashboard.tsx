import React, { useState } from "react";
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

  // 1. Settings State Form
  const [formData, setFormData] = useState({
    helplinePhone: settings.helplinePhone || "+91 7851836860",
    whatsappPhone: settings.whatsappPhone || "+91 7851836860",
    supportEmail: settings.supportEmail || "support@indianallianceservices.com",
    displayAddress: settings.displayAddress || "",
    officeHours: settings.officeHours || "Mon – Sat: 9:30 AM – 6:30 PM (IST)",
    bannerNotice: settings.bannerNotice || "",
    enableNoticeBanner: settings.enableNoticeBanner ?? false,
    googleSheetsNoticeUrl: settings.googleSheetsNoticeUrl || "",
  });

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
    type: "Full-Time",
    location: "Pan-India Airports",
    salaryRange: "₹25,000 – ₹45,000 / month",
    experience: "0 – 2 Years",
    qualification: "12th Pass / Graduate",
    ageLimit: "18 – 30 Years",
    openings: 5,
    badge: "Active Hiring",
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

  // Google Sheet Sync State
  const [googleSheetInputUrl, setGoogleSheetInputUrl] = useState(settings.googleSheetsNoticeUrl || "");
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);

  // Branch Modal State
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchFormData, setBranchFormData] = useState({
    city: "",
    officeName: "",
    address: "",
    phone: settings.helplinePhone || "+91 7851836860",
    email: settings.supportEmail || "support@indianallianceservices.com",
    notice: "Visits strictly by prior appointment only.",
  });

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
      title: "",
      department: "Airport Operations",
      jobCode: "IAS-" + Math.floor(1000 + Math.random() * 9000),
      type: "Full-Time (Shift Based)",
      location: "Pan-India Airports",
      salaryRange: "₹25,000 – ₹45,000 / month",
      experience: "Freshers / 0 – 2 Years",
      qualification: "12th Pass or Graduate",
      ageLimit: "18 – 30 Years",
      openings: 5,
      badge: "Immediate Opening",
      status: "active",
      overview: "",
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

    const headers = ["ID", "Submitted Date", "Name", "Phone", "Email", "Qualification", "Target Role", "City", "Status", "Notes"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.submittedAt}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.qualification || ""}"`,
      `"${l.targetRole || ""}"`,
      `"${l.city || ""}"`,
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

  // Filtered queries
  const filteredJobs = jobPosts.filter(
    (j) =>
      j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.location.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.jobCode.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
      n.description.toLowerCase().includes(noticeSearch.toLowerCase()) ||
      n.badge.toLowerCase().includes(noticeSearch.toLowerCase())
  );

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (l.email && l.email.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (l.targetRole && l.targetRole.toLowerCase().includes(leadSearch.toLowerCase()));
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
              <img
                src="/logo.png"
                alt="Indian Alliance Services (IAS)"
                className="h-10 sm:h-12 w-auto max-w-[200px] object-contain"
              />
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
                { id: "careers", label: `Job Posts (${jobPosts.length})`, icon: Briefcase },
                { id: "notifications", label: `Notices (${notices.length})`, icon: Bell },
                { id: "branches", label: `Offices (${branches.length})`, icon: Building2 },
                { id: "settings", label: "Phone & Site Settings", icon: Settings },
                { id: "leads", label: `Leads CRM (${leads.length})`, icon: Users },
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
                    {jobPosts.filter((j) => j.status === "active").length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Out of {jobPosts.length} total vacancies configured
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
                    {leads.length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {leads.filter((l) => l.status === "new").length} new awaiting contact
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
                    {notices.filter(isNoticeActive).length}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {notices.length} total ({notices.filter((n) => !isNoticeActive(n)).length} auto-expired)
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
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700 font-mono">
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
                        <h3 className="text-lg font-heading font-bold text-white leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {job.department}
                        </p>
                      </div>

                      {/* Toggle Active Button */}
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        title={job.status === "active" ? "Click to Deactivate" : "Click to Activate"}
                        className="text-slate-400 hover:text-amber-400"
                      >
                        {job.status === "active" ? (
                          <ToggleRight className="h-8 w-8 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-slate-600" />
                        )}
                      </button>
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
                        <span className="text-slate-500 block text-[10px]">Location</span>
                        <strong className="text-slate-200 truncate block">{job.location}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {job.overview}
                    </p>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-[11px] text-slate-500">
                        Posted: {job.postedDate}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEditJob(job)}
                          className="h-8 px-3 text-xs border-slate-700 bg-slate-800/60 text-slate-200 hover:text-amber-400 hover:bg-slate-800 rounded-xl"
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
                          className="h-8 px-3 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl"
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

                <div className="flex items-center gap-2.5">
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
                          <th className="py-3.5 px-5 font-semibold">Candidate Name</th>
                          <th className="py-3.5 px-5 font-semibold">Phone Number</th>
                          <th className="py-3.5 px-5 font-semibold">Email</th>
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
                              {lead.name}
                            </td>
                            <td className="py-4 px-5 text-amber-400 font-mono font-semibold">
                              <a href={`tel:${lead.phone}`} className="hover:underline">
                                {lead.phone}
                              </a>
                            </td>
                            <td className="py-4 px-5 text-slate-400">
                              {lead.email || "—"}
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
              ================================================== */}
          {activeTab === "database" && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Cloud Database & Supabase Integration
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Connect a free Supabase cloud database to synchronize all website changes across multiple devices.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Supabase Cloud Storage (Free Tier)
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
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-5 px-6 rounded-2xl text-xs shadow-md"
                  >
                    Test Connection & Sync
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
