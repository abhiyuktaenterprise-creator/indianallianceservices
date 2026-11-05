import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Plus,
  Search,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Eye,
  Pencil,
  Trash2,
  Archive,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  BookOpen,
  Camera,
  X,
  Sparkles,
  FileText,
  RefreshCw,
  FileSpreadsheet,
  Link2,
  Check,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  studentService,
  Student,
  NewStudentInput,
} from "@/services/studentService";
import { toast } from "sonner";
import StudentLetterModal from "./StudentLetterModal";

export const POPULAR_COURSES = [
  "Airport Ground Staff & Passenger Services",
  "Customer Service Assistant (CSA)",
  "Customer Service Assistant",
  "Cabin Crew & In-Flight Operations",
  "Cabin Crew",
  "Air Hostess & Hospitality Services",
  "Air Hostess",
  "Customs Officer & Airport Cargo",
  "Customs Officer",
  "Ramp Security & Aircraft Servicing",
  "Aviation Customer Service & Ticketing",
  "Airport Cargo & Logistics Operations",
  "Aviation Security & Safety Management",
  "Airline Operations & Load Planning",
];

// Helper to compress uploaded student photo to compact lightweight Base64 JPEG (~25KB)
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxSize = 400; // Optimal passport photo dimension

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

interface StudentsManagerProps {
  onTotalChange?: (count: number) => void;
}

export default function StudentsManager({ onTotalChange }: StudentsManagerProps) {
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [letterStudent, setLetterStudent] = useState<Student | null>(null);
  const [selectedLetterType, setSelectedLetterType] = useState<"welcome" | "confirmation" | "agreement">("welcome");
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);
  const [isPushingWebhook, setIsPushingWebhook] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [sheetUrlInput, setSheetUrlInput] = useState(() => studentService.getCandidateSheetUrl());

  // Targets
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  // File Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputAddRef = useRef<HTMLInputElement>(null);
  const photoInputEditRef = useRef<HTMLInputElement>(null);

  // Form State
  const initialFormState: NewStudentInput = {
    student_name: "",
    father_name: "",
    date_of_birth: "",
    mobile_number: "",
    email: "",
    application_number: "",
    registration_number: "",
    batch_code: "",
    course_name: "Airport Ground Staff & Passenger Services",
    admission_date: new Date().toISOString().split("T")[0],
    placement_date: "",
    visiting_date: "",
    course_start_date: "",
    course_end_date: "",
    interview_date: "",
    status: "Active",
    failure_reason: "",
    photo_url: null,
  };
  const [formData, setFormData] = useState<NewStudentInput>(initialFormState);

  // Fetch Students
  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudents(searchQuery, showArchived);
      if (res.data) {
        setStudents(res.data);
        if (onTotalChange) {
          onTotalChange(res.data.length);
        }
      }
    } catch {
      toast.error("Failed to load candidate records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [searchQuery, showArchived]);

  // Auto-sync candidate records from Google Sheet on initial mount if online
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.onLine) {
      const sheetUrl = studentService.getCandidateSheetUrl();
      if (sheetUrl) {
        studentService.syncFromGoogleSheet(sheetUrl).then((res) => {
          if (res.success) {
            loadStudents();
          }
        }).catch(() => {});
      }
    }
  }, []);

  // Real-time synchronization event listener (updates table across tabs and when cloud sync finishes)
  useEffect(() => {
    const handleSyncEvent = () => {
      loadStudents();
    };
    window.addEventListener("ias_candidates_synced", handleSyncEvent);
    window.addEventListener("storage", handleSyncEvent);
    return () => {
      window.removeEventListener("ias_candidates_synced", handleSyncEvent);
      window.removeEventListener("storage", handleSyncEvent);
    };
  }, [searchQuery, showArchived]);

  // Google Sheet Synchronize Action
  const handleSyncGoogleSheet = async () => {
    const currentUrl = (sheetUrlInput || studentService.getCandidateSheetUrl()).trim();
    if (!currentUrl) {
      setIsSheetModalOpen(true);
      return;
    }

    setIsSyncingSheet(true);
    try {
      const res = await studentService.syncFromGoogleSheet(currentUrl);
      if (res.success) {
        toast.success(`Successfully synchronized ${res.count} candidates from Google Sheet!`);
        await loadStudents();
      } else {
        toast.error(res.error || "Failed to sync candidates from Google Sheet.");
        setIsSheetModalOpen(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sync from Google Sheet.");
      setIsSheetModalOpen(true);
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // Save Sheet URL & Sync
  const handleSaveSheetUrlAndSync = async () => {
    const cleanUrl = sheetUrlInput.trim();
    if (!cleanUrl) {
      toast.error("Please enter a valid Google Sheet URL or published CSV link.");
      return;
    }
    studentService.setCandidateSheetUrl(cleanUrl);
    setIsSyncingSheet(true);
    try {
      const res = await studentService.syncFromGoogleSheet(cleanUrl);
      if (res.success) {
        toast.success(`Connected & synchronized ${res.count} candidates successfully!`);
        setIsSheetModalOpen(false);
        await loadStudents();
      } else {
        toast.error(res.error || "Failed to sync candidates.");
      }
    } catch (err: any) {
      toast.error(err.message || "Connection failed.");
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    try {
      studentService.downloadCSV(students);
      toast.success(`Exported ${students.length} candidates to CSV for Google Sheets!`);
    } catch {
      toast.error("Failed to export candidates CSV.");
    }
  };

  // Push All Local Candidates to Google Sheet Webhook
  const handlePushAllToWebhook = async () => {
    setIsPushingWebhook(true);
    try {
      const res = await studentService.pushAllToWebhook();
      if (res.success) {
        toast.success(`Successfully pushed ${res.count} candidates to Google Sheet Webhook!`);
      } else {
        toast.error(res.error || "Failed to push candidates to Webhook.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to push to Webhook.");
    } finally {
      setIsPushingWebhook(false);
    }
  };

  // Handle Photo File Upload
  const handlePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG).");
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file);
      setFormData((prev) => ({
        ...prev,
        photo_url: compressedDataUrl,
      }));
      toast.success("Passport photo processed and attached.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process photo.");
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedAppNo = `IAS-APP-2026/${randomNum}`;
    const generatedBatchCode = `IAS-TRG-2026/B${Math.floor(1 + Math.random() * 5)}`;
    setFormData({
      ...initialFormState,
      application_number: generatedAppNo,
      registration_number: generatedAppNo,
      batch_code: generatedBatchCode,
      interview_date: "",
      placement_date: "",
      visiting_date: "",
      failure_reason: "",
    });
    setEditingStudentId(null);
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (student: Student) => {
    setEditingStudentId(student.id);
    setFormData({
      student_name: student.student_name,
      father_name: student.father_name,
      date_of_birth: student.date_of_birth,
      mobile_number: student.mobile_number,
      email: student.email || "",
      application_number: student.application_number,
      registration_number: student.registration_number || student.application_number,
      batch_code:
        student.batch_code ||
        `IAS-TRG-${student.application_number ? student.application_number.replace(/\D/g, "") : "2026"}`,
      course_name: student.course_name,
      admission_date: student.admission_date || "",
      placement_date: student.placement_date || student.course_start_date || "",
      visiting_date: student.visiting_date || student.course_end_date || "",
      course_start_date: student.placement_date || student.course_start_date || "",
      course_end_date: student.visiting_date || student.course_end_date || "",
      interview_date: student.interview_date || "",
      status: student.status,
      failure_reason: student.failure_reason || "",
      photo_url: student.photo_url || null,
      is_archived: student.is_archived,
    });
    setIsEditOpen(true);
  };

  // Open View Modal
  const handleOpenView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  // Save Student (Add / Edit)
  const handleSaveStudent = async (e: React.FormEvent, openLetterAfterSave: boolean = false) => {
    e.preventDefault();

    if (!formData.student_name.trim()) {
      toast.error("Please enter candidate name.");
      return;
    }
    if (!formData.father_name.trim()) {
      toast.error("Please enter father's name.");
      return;
    }
    if (!formData.application_number.trim()) {
      toast.error("Please enter application number.");
      return;
    }
    if (!formData.batch_code?.trim()) {
      toast.error("Please enter batch code.");
      return;
    }
    if (!formData.mobile_number.trim()) {
      toast.error("Please enter mobile number.");
      return;
    }
    if (!formData.date_of_birth) {
      toast.error("Please select date of birth.");
      return;
    }

    const placementVal = formData.placement_date?.trim() || formData.course_start_date?.trim() || null;
    const visitingVal = formData.visiting_date?.trim() || formData.course_end_date?.trim() || null;

    const payload = {
      ...formData,
      batch_code: formData.batch_code.trim().toUpperCase(),
      registration_number: formData.registration_number || formData.application_number,
      admission_date: formData.admission_date || new Date().toISOString().split("T")[0],
      placement_date: placementVal,
      visiting_date: visitingVal,
      course_start_date: placementVal,
      course_end_date: visitingVal,
    };

    try {
      let savedStudent: Student | null = null;
      if (editingStudentId) {
        // Edit existing
        const res = await studentService.updateStudent(editingStudentId, payload);
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success(`Candidate "${formData.student_name}" updated successfully.`);
        setIsEditOpen(false);
        savedStudent = res.data;
      } else {
        // Add new
        const res = await studentService.addStudent(payload);
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success(`Candidate "${formData.student_name}" added successfully.`);
        setIsAddOpen(false);
        savedStudent = res.data;
      }
      loadStudents();

      if (openLetterAfterSave && savedStudent) {
        setLetterStudent(savedStudent);
        setSelectedLetterType("welcome");
        setIsLetterModalOpen(true);
      }
    } catch {
      toast.error("An unexpected error occurred while saving candidate record.");
    }
  };

  // Toggle Archive
  const handleToggleArchive = async (student: Student) => {
    const newArchived = !student.is_archived;
    const res = await studentService.setArchived(student.id, newArchived);
    if (res.success) {
      toast.success(
        newArchived
          ? `Archived "${student.student_name}". Record hidden from public verification.`
          : `Restored "${student.student_name}" to active registry.`
      );
      loadStudents();
    } else {
      toast.error(res.error || "Failed to update archive status.");
    }
  };

  // Delete Student
  const handleDeleteStudent = async () => {
    if (!deletingStudentId) return;
    const res = await studentService.deleteStudent(deletingStudentId);
    if (res.success) {
      toast.success("Candidate permanently removed from registry.");
      setIsDeleteOpen(false);
      setDeletingStudentId(null);
      loadStudents();
    } else {
      toast.error(res.error || "Failed to delete candidate record.");
    }
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const jsonStr = studentService.exportStudents();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ias_candidates_registry_backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Candidate registry exported successfully.");
  };

  // Import JSON Backup
  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const res = await studentService.importStudents(parsed);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(`Successfully imported ${res.count} candidate records!`);
          loadStudents();
        }
      } catch {
        toast.error("Failed to parse JSON file. Please check file format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Reset to Official Registry
  const handleResetRegistry = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset the registry to default official academy records? This will restore sample official candidates."
      )
    ) {
      await studentService.resetToRegistry();
      toast.success("Registry restored to official defaults.");
      loadStudents();
    }
  };

  const activeCount = students.filter((s) => s.status === "Active" && !s.is_archived).length;
  const completedCount = students.filter((s) => s.status === "Completed" && !s.is_archived).length;
  const archivedCount = students.filter((s) => s.is_archived).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-amber-400" />
            <span>Candidate & Trainee Registry ({students.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage enrolled candidates, training records, passport photos, and public verification status at /verify
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleOpenAdd}
            variant="hero"
            className="gap-2 font-bold text-xs py-2 px-4 shadow-md bg-amber-500 hover:bg-amber-600 text-slate-950"
          >
            <Plus className="h-4 w-4" /> Add Candidate
          </Button>

          <Button
            onClick={handleSyncGoogleSheet}
            disabled={isSyncingSheet}
            variant="outline"
            className="gap-1.5 text-xs border-emerald-600/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:text-white"
            title="Sync with Google Sheet (Live across all mobile phones & laptops)"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-emerald-400 ${isSyncingSheet ? "animate-spin" : ""}`} />
            <span>{isSyncingSheet ? "Syncing..." : "Sync Google Sheet"}</span>
          </Button>

          <Button
            onClick={() => setIsSheetModalOpen(true)}
            variant="outline"
            className="gap-1.5 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            title="Google Sheet Link Settings"
          >
            <Link2 className="h-3.5 w-3.5 text-amber-400" /> Sheet Link
          </Button>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="gap-1.5 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            title="Download CSV formatted for Google Sheets (Upload to your sheet)"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" /> Export CSV
          </Button>

          <Button
            onClick={handleExportJSON}
            variant="outline"
            className="gap-1.5 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            title="Download JSON backup"
          >
            <Download className="h-3.5 w-3.5" /> Export JSON
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="gap-1.5 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            title="Import from JSON backup"
          >
            <Upload className="h-3.5 w-3.5" /> Import JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJSON}
            className="hidden"
          />
          <Button
            onClick={handleResetRegistry}
            variant="outline"
            className="gap-1.5 text-xs border-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-800"
            title="Restore default official records"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Mini Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Enrolled
          </span>
          <span className="text-2xl font-heading font-black text-white mt-1 block">
            {students.length}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Active Trainees
          </span>
          <span className="text-2xl font-heading font-black text-blue-400 mt-1 block">
            {activeCount}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Course Completed
          </span>
          <span className="text-2xl font-heading font-black text-emerald-400 mt-1 block">
            {completedCount}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Archived Records
          </span>
          <span className="text-2xl font-heading font-black text-slate-400 mt-1 block">
            {archivedCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, registration no, application no, father name, or mobile..."
            className="w-full h-10 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 h-4 w-4"
            />
            <span>Show Archived ({archivedCount})</span>
          </label>
          <Link
            to="/verify"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            <span>Public /verify Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Application No</th>
                <th className="py-3.5 px-4">Course Enrolled</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Interview / Adm</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <span className="inline-block w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-2 align-middle" />
                    Loading candidate records...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No candidate records found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const isArchived = student.is_archived;
                  return (
                    <tr
                      key={student.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isArchived ? "opacity-60 bg-slate-950/40" : ""
                      }`}
                    >
                      {/* Photo & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                            {student.photo_url ? (
                              <img
                                src={student.photo_url}
                                alt={student.student_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{student.student_name}</span>
                              {isArchived && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-500/20 text-red-400 font-normal">
                                  Archived
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              S/O, D/O: {student.father_name}
                            </div>
                            {student.date_of_birth && (
                              <div className="text-[10px] text-slate-500">
                                DOB: {student.date_of_birth}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* App No & Batch */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div className="font-bold text-amber-400">
                          {student.application_number}
                        </div>
                        {student.batch_code && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Batch: <span className="text-amber-300 font-semibold">{student.batch_code}</span>
                          </div>
                        )}
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200 line-clamp-1 max-w-[220px]">
                          {student.course_name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {(student.placement_date || student.course_start_date) ? (
                            <>
                              <span>Placement: {student.placement_date || student.course_start_date}</span>
                              {(student.visiting_date || student.course_end_date) ? (
                                <span className="ml-1.5 text-slate-400">
                                  | Visit: {student.visiting_date || student.course_end_date}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            student.batch_code ? `Batch: ${student.batch_code}` : ""
                          )}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <Phone className="h-3 w-3 text-slate-500" />
                          <span>{student.mobile_number}</span>
                        </div>
                        {student.email && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate max-w-[150px]">
                            <Mail className="h-2.5 w-2.5" />
                            <span>{student.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Interview / Admission Date */}
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {student.interview_date ? (
                          <div>
                            <span className="text-[10px] text-amber-400 block font-semibold">Interview:</span>
                            <span>{student.interview_date}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] text-slate-500 block">Adm:</span>
                            <span>{student.admission_date}</span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            student.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : student.status === "Joining"
                              ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                              : student.status === "Rejoining"
                              ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                              : student.status === "Failed"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : student.status === "Active"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                          }`}
                        >
                          {student.status}
                        </span>
                        {student.failure_reason && (
                          <div className="text-[10px] text-rose-400 truncate max-w-[140px] mt-0.5" title={student.failure_reason}>
                            {student.failure_reason}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setLetterStudent(student);
                              setSelectedLetterType("welcome");
                              setIsLetterModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shadow-sm shrink-0"
                            title="Generate Official Training Letters (Welcome, Confirmation, Agreement)"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Letters</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenView(student)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="View Candidate Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(student)}
                            className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                            title="Edit Candidate"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleArchive(student)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isArchived
                                ? "text-emerald-400 hover:bg-emerald-500/10"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                            }`}
                            title={isArchived ? "Unarchive Record" : "Archive Record (Hide from /verify)"}
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeletingStudentId(student.id);
                              setIsDeleteOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            title="Delete Candidate Record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================
          ADD / EDIT STUDENT MODAL
          ================================================== */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-400" />
                <span>{editingStudentId ? "Edit Candidate Record" : "Add New Candidate Record"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setIsEditOpen(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              {/* Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl border border-dashed border-slate-700 bg-slate-900 overflow-hidden shrink-0 flex flex-col items-center justify-center relative">
                  {formData.photo_url ? (
                    <>
                      <img
                        src={formData.photo_url}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photo_url: null })}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                        title="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-2">
                      <Camera className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                      <span className="text-[9px] text-slate-500 block leading-tight">
                        Passport Photo
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold text-slate-200 block">
                    Student Passport Photo
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Auto-compressed in browser into lightweight image. Displayed on public verification card at /verify.
                  </p>
                  <div className="pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        editingStudentId
                          ? photoInputEditRef.current?.click()
                          : photoInputAddRef.current?.click()
                      }
                      className="border-slate-700 text-slate-300 text-xs py-1 h-8 hover:text-white hover:bg-slate-800"
                    >
                      <Camera className="h-3.5 w-3.5 mr-1.5" />
                      {formData.photo_url ? "Change Photo" : "Upload Photo"}
                    </Button>
                    <input
                      ref={editingStudentId ? photoInputEditRef : photoInputAddRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, !!editingStudentId)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Candidate Name *</label>
                  <input
                    type="text"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="e.g. Abhishek Navnath Arkas"
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Father's Full Name *</label>
                  <input
                    type="text"
                    value={formData.father_name}
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    placeholder="e.g. Navnath Namdev Arkas"
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.mobile_number}
                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                    placeholder="e.g. 8858453069"
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. abhishek@example.com"
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Application Number (Primary Identifier) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-400 block">Application Number *</label>
                  <input
                    type="text"
                    value={formData.application_number}
                    onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                    placeholder="e.g. IAS-APP-2026/8425"
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-amber-300 font-mono font-bold placeholder:text-slate-500 rounded-xl text-sm uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Course Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    Course / Training Enrolled *
                  </label>
                  <select
                    value={formData.course_name}
                    onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 mb-2"
                  >
                    {POPULAR_COURSES.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                    <option value="custom">Other / Custom Course Title...</option>
                  </select>
                  {(!POPULAR_COURSES.includes(formData.course_name) || formData.course_name === "custom") && (
                    <input
                      type="text"
                      placeholder="Type custom course title..."
                      value={formData.course_name === "custom" ? "" : formData.course_name}
                      onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-950 border border-amber-500/40 text-white rounded-xl text-sm"
                    />
                  )}
                </div>

                {/* Batch, Dates & Placement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Batch Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. IAS-TRG-2026/B1"
                    value={formData.batch_code || ""}
                    onChange={(e) => setFormData({ ...formData, batch_code: e.target.value.toUpperCase() })}
                    required
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500 font-mono uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Interview Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.interview_date || ""}
                    onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Date of Placement</label>
                  <input
                    type="date"
                    value={formData.placement_date || formData.course_start_date || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        placement_date: e.target.value,
                        course_start_date: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">Visiting Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.visiting_date || formData.course_end_date || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visiting_date: e.target.value,
                        course_end_date: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-950 border border-slate-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-200 block">Training Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className={`w-full h-11 px-3.5 bg-slate-950 border ${
                      formData.status === "Failed" ? "border-rose-500 text-rose-300" : "border-slate-700 text-white"
                    } rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500`}
                  >
                    <option value="Active">Active (Ongoing Training)</option>
                    <option value="Completed">Completed</option>
                    <option value="Joining">Joining</option>
                    <option value="Rejoining">Rejoining</option>
                    <option value="Failed">Failed (Not Qualified)</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>

                {/* Failure Note / Remarks for Candidate */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    {formData.status === "Failed" ? (
                      <span className="text-rose-400">Note: Why Candidate Failed (Visible to Candidate on /verify) *</span>
                    ) : (
                      <span>Remarks / Candidate Note (Optional)</span>
                    )}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.failure_reason || ""}
                    onChange={(e) => setFormData({ ...formData, failure_reason: e.target.value })}
                    placeholder={
                      formData.status === "Failed"
                        ? "Enter reason why candidate failed (e.g. English communication benchmarks or grooming standards not met)..."
                        : "Optional note or remark for candidate..."
                    }
                    className={`w-full p-3 bg-slate-950 border ${
                      formData.status === "Failed" ? "border-rose-500/60 text-rose-200" : "border-slate-700 text-white"
                    } placeholder:text-slate-500 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500`}
                  />
                  {formData.status === "Failed" && (
                    <p className="text-[11px] text-rose-400">
                      * This explanation note will be displayed directly to the candidate when they check their Application Number on the verification page.
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  💡 <span className="text-slate-300 font-medium">Tip:</span> Save candidate to immediately print Welcome Letter, Confirmation, or Agreement.
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddOpen(false);
                      setIsEditOpen(false);
                    }}
                    className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-5 px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={(e) => handleSaveStudent(e, true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-5 rounded-xl text-xs shadow-md gap-1.5"
                  >
                    <FileText className="h-4 w-4" /> Save & Generate Letters
                  </Button>
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-5 rounded-xl text-xs shadow-md"
                  >
                    {editingStudentId ? "Update Record" : "Save Record"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          VIEW STUDENT DETAILS MODAL
          ================================================== */}
      {isViewOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-amber-400" />
                <span>Candidate Profile Summary</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsViewOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="w-24 h-28 rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                {selectedStudent.photo_url ? (
                  <img
                    src={selectedStudent.photo_url}
                    alt={selectedStudent.student_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-slate-600" />
                )}
              </div>
              <div className="space-y-1 flex-1 text-center sm:text-left">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1 ${
                    selectedStudent.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : selectedStudent.status === "Joining"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : selectedStudent.status === "Rejoining"
                      ? "bg-teal-500/20 text-teal-400"
                      : selectedStudent.status === "Failed"
                      ? "bg-rose-500/20 text-rose-400"
                      : selectedStudent.status === "Active"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {selectedStudent.status}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {selectedStudent.student_name}
                </h4>
                <p className="text-xs text-slate-400">
                  Father's Name: <strong className="text-slate-200">{selectedStudent.father_name}</strong>
                </p>
                <p className="text-xs text-amber-400 font-mono">
                  App No: {selectedStudent.application_number}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Application No</span>
                <strong className="text-slate-300 font-mono">{selectedStudent.application_number}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Interview Date</span>
                <strong className="text-amber-400 font-mono">{selectedStudent.interview_date || "Not Scheduled"}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Date of Birth</span>
                <strong className="text-slate-300">{selectedStudent.date_of_birth}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Mobile Number</span>
                <strong className="text-emerald-400 font-mono">{selectedStudent.mobile_number}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Email Address</span>
                <strong className="text-slate-300">{selectedStudent.email || "N/A"}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Batch Code</span>
                <strong className="text-amber-300 font-mono">
                  {selectedStudent.batch_code || `IAS-TRG-${selectedStudent.application_number.replace(/\D/g, "")}`}
                </strong>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Course Enrolled</span>
                <strong className="text-amber-300 text-sm block">{selectedStudent.course_name}</strong>
              </div>
              {(selectedStudent.placement_date || selectedStudent.course_start_date) && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Date of Placement</span>
                  <strong className="text-slate-300">
                    {selectedStudent.placement_date || selectedStudent.course_start_date}
                  </strong>
                </div>
              )}
              {(selectedStudent.visiting_date || selectedStudent.course_end_date) && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Visiting Date</span>
                  <strong className="text-slate-300">
                    {selectedStudent.visiting_date || selectedStudent.course_end_date}
                  </strong>
                </div>
              )}
              {selectedStudent.failure_reason && (
                <div className="col-span-2 pt-2 border-t border-rose-500/30 p-2.5 rounded-lg bg-rose-500/10">
                  <span className="text-[10px] text-rose-400 font-bold uppercase block">
                    Assessment / Failure Note (Visible to Candidate):
                  </span>
                  <p className="text-rose-200 text-xs mt-1 leading-relaxed">
                    {selectedStudent.failure_reason}
                  </p>
                </div>
              )}
            </div>

            {/* 3 Quick Letter Action Buttons */}
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="h-4 w-4" /> Download / Print Official Candidate Letters
                </span>
                <span className="text-[10px] text-slate-400 font-medium bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                  Vocational Training Compliant
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setLetterStudent(selectedStudent);
                    setSelectedLetterType("welcome");
                    setIsLetterModalOpen(true);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] h-9 rounded-xl font-semibold border border-slate-700 shadow-sm"
                >
                  🎓 Welcome Letter
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setLetterStudent(selectedStudent);
                    setSelectedLetterType("confirmation");
                    setIsLetterModalOpen(true);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] h-9 rounded-xl font-semibold border border-slate-700 shadow-sm"
                >
                  📋 Confirmation Advice
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setLetterStudent(selectedStudent);
                    setSelectedLetterType("agreement");
                    setIsLetterModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] h-9 rounded-xl font-semibold shadow-md"
                >
                  📜 Training Agreement
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <Link
                to={`/verify?app=${encodeURIComponent(selectedStudent.application_number)}`}
                target="_blank"
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Verify on Public Portal</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Button
                type="button"
                onClick={() => setIsViewOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-5 py-2 rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          DELETE CONFIRMATION DIALOG
          ================================================== */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-500/20 text-red-400 rounded-2xl shrink-0">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Candidate Record?</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete this candidate record from the database? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeletingStudentId(null);
                }}
                className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-2 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteStudent}
                className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs py-2 px-4 shadow-md"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          TRAINING LETTER / AGREEMENT GENERATOR MODAL
          ================================================== */}
      {isLetterModalOpen && letterStudent && (
        <StudentLetterModal
          student={letterStudent}
          isOpen={isLetterModalOpen}
          initialLetterType={selectedLetterType}
          onClose={() => {
            setIsLetterModalOpen(false);
            setLetterStudent(null);
          }}
        />
      )}

      {/* ==================================================
          GOOGLE SHEET SYNC / CONNECTION MODAL
          ================================================== */}
      {isSheetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl shrink-0">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Google Sheet Real-Time Sync</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sync candidates live across all client laptops, phones & /verify portal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">
                  Google Sheet URL / Published CSV Link
                </label>
                <div className="relative">
                  <Link2 className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="url"
                    value={sheetUrlInput}
                    onChange={(e) => setSheetUrlInput(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv or edit link"
                    className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Paste your standard Google Sheet link (<code className="text-amber-300">Share &gt; Anyone with link can view</code>) or published CSV link (<code className="text-amber-300">File &gt; Share &gt; Publish to web &gt; Entire Document &gt; CSV</code>).
                </p>
              </div>

              {/* Instructions box */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2 text-[11px] text-slate-300">
                <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>How Cross-Device Sync Works:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li>Any candidate row added in the Google Sheet syncs into this laptop and mobile phones.</li>
                  <li>When a candidate verifies on mobile at <code className="text-amber-300 font-mono">/verify</code>, it fetches live from this sheet.</li>
                  <li>Click <b>Export CSV</b> to download all current candidate records and copy them into your Google Sheet.</li>
                </ul>
              </div>

              {/* Action buttons inside modal */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePushAllToWebhook}
                  disabled={isPushingWebhook}
                  className="gap-1.5 text-xs border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                  title="Push all local candidates directly to Google Sheet Webhook"
                >
                  <Send className={`h-3.5 w-3.5 text-amber-400 ${isPushingWebhook ? "animate-spin" : ""}`} />
                  {isPushingWebhook ? "Pushing to Sheet..." : `Push All ${students.length} to Google Sheet`}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportCSV}
                  className="gap-1.5 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetModalOpen(false)}
                className="border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs py-2 px-4"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={handleSaveSheetUrlAndSync}
                disabled={isSyncingSheet}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs py-2 px-5 shadow-md flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isSyncingSheet ? "animate-spin" : ""}`} />
                {isSyncingSheet ? "Syncing Candidates..." : "Save & Sync Now"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
