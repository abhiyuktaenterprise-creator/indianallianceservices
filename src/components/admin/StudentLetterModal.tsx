import React, { useState } from "react";
import { X, Printer, FileText, CheckCircle2, ShieldCheck, ChevronRight, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/services/studentService";

export type LetterType = "welcome" | "final_letter" | "agreement" | "confirmation";

interface StudentLetterModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  initialLetterType?: LetterType;
}

const LETTER_PREVIEW_CSS = `
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .letter-page-scope {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background-color: transparent;
    font-size: 8.8pt;
    line-height: 1.36;
  }
  .letter-page-scope .page {
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    margin: 0 auto 24px auto;
    background: #ffffff;
    position: relative;
    padding: 10mm 15mm 8mm 15mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
    border-radius: 4px;
    color: #1e293b;
  }
  @media print {
    body {
      background: #ffffff !important;
    }
    .letter-page-scope .page {
      margin: 0 auto !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      page-break-after: always !important;
      break-after: page !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      height: 297mm !important;
    }
  }
  .letter-page-scope .watermark {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px !important;
    max-width: 440px !important;
    height: auto !important;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }
  .letter-page-scope .header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 7px;
    border-bottom: 2px solid #0f2d59;
  }
  .letter-page-scope .header-gold-line {
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37);
    margin-top: 2px;
    margin-bottom: 9px;
  }
  .letter-page-scope .logo-container img {
    height: 50px !important;
    max-height: 50px !important;
    width: auto !important;
    object-fit: contain;
    display: block;
  }
  .letter-page-scope .org-details {
    text-align: right;
    font-size: 8pt;
    color: #334155;
    line-height: 1.32;
  }
  .letter-page-scope .org-details strong {
    color: #0f2d59;
    font-size: 9pt;
    letter-spacing: 0.3px;
  }
  .letter-page-scope .ref-date-bar {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    font-size: 8.5pt;
    color: #334155;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 3px;
    border-bottom: 1px solid #e2e8f0;
  }
  .letter-page-scope .doc-title-container {
    text-align: center;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }
  .letter-page-scope .doc-title {
    font-size: 13pt;
    font-weight: 800;
    color: #0f2d59;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: inline-block;
    border-bottom: 2px solid #d4af37;
    padding-bottom: 2px;
  }
  .letter-page-scope .doc-subtitle {
    font-size: 8.5pt;
    color: #64748b;
    font-weight: 600;
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .letter-page-scope .content-body {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 8.8pt;
    color: #1e293b;
  }
  .letter-page-scope .candidate-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #0f2d59;
    border-radius: 4px;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    font-size: 8.8pt;
  }
  .letter-page-scope .candidate-col p {
    margin: 1.5px 0;
  }
  .letter-page-scope .candidate-col strong {
    color: #0f2d59;
  }
  .letter-page-scope .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
    margin: 3px 0 6px 0;
  }
  .letter-page-scope .data-table th, .letter-page-scope .data-table td {
    border: 1px solid #cbd5e1;
    padding: 5px 9px;
    text-align: left;
  }
  .letter-page-scope .data-table th {
    background-color: #0f2d59;
    color: #ffffff;
    font-weight: 600;
    font-size: 8.5pt;
  }
  .letter-page-scope .data-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  .letter-page-scope .signatures-section {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 6px;
    padding-top: 4px;
  }
  .letter-page-scope .sig-block {
    width: 48%;
    font-size: 8.5pt;
    color: #334155;
  }
  .letter-page-scope .sig-line {
    border-top: 1px solid #64748b;
    margin-top: 20px;
    padding-top: 3px;
    line-height: 1.35;
  }
  .letter-page-scope .stamp-sig-container {
    position: relative;
    height: 60px;
    margin-top: 2px;
  }
  .letter-page-scope .stamp-img {
    position: absolute;
    bottom: -6px;
    right: 80px;
    width: 76px !important;
    opacity: 0.95;
  }
  .letter-page-scope .sig-img {
    position: absolute;
    bottom: 2px;
    right: 15px;
    width: 100px !important;
    opacity: 0.98;
  }
  .letter-page-scope .footer {
    position: relative;
    z-index: 1;
    padding-top: 5px;
    margin-top: 4px;
    border-top: 2px solid #d4af37;
    text-align: center;
  }
  .letter-page-scope .footer-services {
    font-size: 7.2pt;
    font-weight: 700;
    color: #0f2d59;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  .letter-page-scope .footer-tagline {
    font-size: 7.5pt;
    font-weight: 800;
    color: #d4af37;
    letter-spacing: 0.8px;
  }
  .letter-page-scope .list-styled {
    padding-left: 16px;
    font-size: 8.5pt;
    line-height: 1.36;
  }
  .letter-page-scope .list-styled li {
    margin-bottom: 2px;
  }
  .letter-page-scope .clause-title {
    font-weight: 700;
    color: #0f2d59;
    font-size: 8.9pt;
    margin-top: 4px;
    margin-bottom: 2px;
  }
  .letter-page-scope .clause-p {
    font-size: 8.5pt;
    color: #334155;
    text-align: justify;
    line-height: 1.36;
    margin-bottom: 4px;
  }
  .letter-page-scope .page-number-text {
    font-size: 7.5pt;
    color: #94a3b8;
    text-align: right;
    margin-top: 2px;
  }
  @media screen and (max-width: 768px) {
    .letter-fit-screen .page {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      min-height: auto !important;
      max-height: none !important;
      margin: 0 0 16px 0 !important;
      padding: 14px 12px 14px 12px !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
      font-size: 8pt !important;
    }
    .letter-fit-screen .watermark {
      width: 180px !important;
      max-width: 180px !important;
    }
    .letter-fit-screen .logo-container img {
      height: 36px !important;
      max-height: 36px !important;
    }
    .letter-fit-screen .org-details {
      font-size: 6.8pt !important;
      line-height: 1.25 !important;
    }
    .letter-fit-screen .doc-title {
      font-size: 10pt !important;
    }
    .letter-fit-screen .doc-subtitle {
      font-size: 7.2pt !important;
    }
    .letter-fit-screen .candidate-box {
      flex-direction: column !important;
      gap: 6px !important;
      padding: 8px 10px !important;
      font-size: 8pt !important;
    }
    .letter-fit-screen .data-table {
      font-size: 7.5pt !important;
    }
    .letter-fit-screen .data-table th, .letter-fit-screen .data-table td {
      padding: 3.5px 6px !important;
    }
    .letter-fit-screen .signatures-section {
      flex-direction: column !important;
      gap: 12px !important;
      align-items: flex-start !important;
    }
    .letter-fit-screen .sig-block {
      width: 100% !important;
    }
    .letter-fit-screen .stamp-sig-container {
      height: 50px !important;
    }
    .letter-fit-screen .stamp-img {
      width: 60px !important;
      right: 90px !important;
    }
    .letter-fit-screen .sig-img {
      width: 80px !important;
      right: 15px !important;
    }
  }
`;

export default function StudentLetterModal({
  student,
  isOpen,
  onClose,
  initialLetterType = "welcome",
}: StudentLetterModalProps) {
  const [letterType, setLetterType] = useState<LetterType>(initialLetterType);
  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);
  const [isFitWidth, setIsFitWidth] = useState(true);

  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const appDigits = student.application_number ? student.application_number.replace(/\D/g, "") : "134557";

  const [refNo, setRefNo] = useState(`REF: 2026/2027/DELHI/MUM/2234/${appDigits}`);
  const [letterDate, setLetterDate] = useState(todayFormatted);
  const [centerLocation, setCenterLocation] = useState(
    "Jagadguru Sant Tukaram Maharaj Pune International Airport, Lohegaon, Pune, Maharashtra 411032"
  );
  const [reportingDate, setReportingDate] = useState(
    student.placement_date || student.course_start_date || "29-Nov-2026"
  );
  const [reportingTime, setReportingTime] = useState("10:30 AM – 5:00 PM");
  const [batchCode, setBatchCode] = useState(
    student.batch_code || appDigits || "134803"
  );
  const [designation, setDesignation] = useState(
    student.course_name ? student.course_name.toUpperCase() : "CUSTOMER SERVICE ASSISTANT"
  );
  const [fundPolicyAmount, setFundPolicyAmount] = useState("14,235");
  const [securityDeposit, setSecurityDeposit] = useState("6,845");

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById("printable-letter-container");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print/download the letter.");
      return;
    }

    const docTitles: Record<LetterType, string> = {
      welcome: "Official Welcome Letter (1 Page)",
      final_letter: "Final Joining & Fund Policy Letter (5 Pages)",
      agreement: "Master Agreement & Annexures (12 Pages)",
      confirmation: "Training & Admission Confirmation",
    };

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${student.student_name} - ${docTitles[letterType]}</title>
          <style>${LETTER_PREVIEW_CSS}</style>
        </head>
        <body style="background: #ffffff; margin: 0; padding: 0;">
          <div class="letter-page-scope">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <style>{LETTER_PREVIEW_CSS}</style>

      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full p-3 sm:p-6 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="h-4 sm:h-5 w-4 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-heading font-extrabold text-white truncate">
                  Letter Preview: <span className="text-amber-400">{student.student_name}</span>
                </h3>
                <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                  Indian Alliance Services & Jetstar Airways Official Letterhead & Documentation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs gap-1.5 shadow-md"
              >
                <Printer className="h-4 w-4" /> Print / Save as PDF
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Print Button Bar */}
          <div className="sm:hidden mt-2.5">
            <Button
              type="button"
              onClick={handlePrint}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs gap-1.5 shadow-md justify-center"
            >
              <Printer className="h-4 w-4" /> Print / Save Letter (PDF)
            </Button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="bg-slate-950 p-2.5 sm:p-3.5 rounded-2xl border border-slate-800 my-2.5 sm:my-3 text-xs shrink-0 space-y-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Select Official Document Template
              </label>
              <select
                value={letterType}
                onChange={(e) => setLetterType(e.target.value as LetterType)}
                className="w-full bg-slate-900 border border-amber-500/50 text-amber-300 font-semibold rounded-lg p-2 text-xs focus:outline-none"
              >
                <option value="welcome">🎓 Official Welcome Letter (1 Page - Jetstar Format)</option>
                <option value="final_letter">📋 Final Joining & Fund Policy Letter (5 Pages - Complete Package)</option>
                <option value="agreement">📜 Complete Master Agreement & Annexures (12 Pages - Full Contract)</option>
                <option value="confirmation">📑 Training & Admission Confirmation Advice (1 Page)</option>
              </select>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => setShowAdvancedConfig(!showAdvancedConfig)}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>{showAdvancedConfig ? "Hide Fields" : "Edit Details & Amounts"}</span>
              </button>

              {/* View Zoom Toggle */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFitWidth(true)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                    isFitWidth ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                  title="Fit document width to screen"
                >
                  Fit Screen
                </button>
                <button
                  type="button"
                  onClick={() => setIsFitWidth(false)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                    !isFitWidth ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                  title="View at 100% full paper size"
                >
                  100% Full
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Details */}
          <div className={`${showAdvancedConfig ? "grid" : "hidden sm:grid"} grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80`}>
            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Visiting Airport / Center Location
              </label>
              <input
                type="text"
                value={centerLocation}
                onChange={(e) => setCenterLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Reporting / Joining Date
              </label>
              <input
                type="text"
                value={reportingDate}
                onChange={(e) => setReportingDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Reference Number
              </label>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs font-mono focus:outline-none"
              />
            </div>

            {showAdvancedConfig && (
              <>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Fund Policy Amount (Rs.)
                  </label>
                  <input
                    type="text"
                    value={fundPolicyAmount}
                    onChange={(e) => setFundPolicyAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Security Deposit Amount (Rs.)
                  </label>
                  <input
                    type="text"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto bg-slate-950/80 p-2 sm:p-6 rounded-2xl border border-slate-800/80 touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch]">
          <div
            id="printable-letter-container"
            className={`letter-page-scope w-full flex flex-col items-center ${
              isFitWidth ? "letter-fit-screen" : "letter-full-paper"
            }`}
          >
            {renderLetterContent(
              letterType,
              student,
              refNo,
              letterDate,
              centerLocation,
              reportingDate,
              reportingTime,
              batchCode,
              designation,
              fundPolicyAmount,
              securityDeposit
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Master Header Component
function renderHeader() {
  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Indian Alliance Services"
            style={{ height: "50px", maxHeight: "50px", width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
        <div className="org-details">
          <strong>INDIAN ALLIANCE SERVICES</strong><br />
          Main Office: D.No. 45-8-28/1, 2nd Floor, Dwaraka Nagar,<br />
          Visakhapatnam-530016, Andhra Pradesh, India<br />
          <span>+91 8707617134 / +91 9651212713</span><br />
          <span>careers@indianallianceservices.com | www.indianallianceservices.com</span>
        </div>
      </div>
      <div className="header-gold-line"></div>
    </div>
  );
}

// Master Footer Component
function renderFooter() {
  return (
    <div className="footer">
      <div className="footer-services">
        CABIN CREW | GROUND STAFF | CUSTOMER SERVICES | AIRPORT OPERATIONS | TRAINING & DEVELOPMENT
      </div>
      <div className="footer-tagline">
        INDIAN ALLIANCE SERVICES - BUILDING CAREERS CONNECTING OPPORTUNITIES
      </div>
    </div>
  );
}

// Master Watermark
function renderWatermark() {
  return (
    <img
      className="watermark"
      src="/logo.png"
      alt="watermark"
      style={{
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "440px",
        maxWidth: "440px",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// Render selected letter content
function renderLetterContent(
  letterType: LetterType,
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  reportingTime: string,
  batchCode: string,
  designation: string,
  fundPolicyAmount: string,
  securityDeposit: string
) {
  if (letterType === "welcome") {
    return renderWelcomeLetter(
      student,
      refNo,
      letterDate,
      centerLocation,
      reportingDate,
      batchCode
    );
  }

  if (letterType === "final_letter") {
    return renderFinalLetter(
      student,
      refNo,
      letterDate,
      centerLocation,
      reportingDate,
      reportingTime,
      designation
    );
  }

  if (letterType === "agreement") {
    return renderMasterAgreement(
      student,
      refNo,
      letterDate,
      centerLocation,
      reportingDate,
      designation,
      fundPolicyAmount,
      securityDeposit
    );
  }

  return renderConfirmationLetter(
    student,
    refNo,
    letterDate,
    centerLocation,
    reportingDate,
    reportingTime,
    batchCode
  );
}

// =========================================================================
// 1. WELCOME LETTER (1 Page) - Exactly matches Khushbu Ashok Mahto PDF
// =========================================================================
function renderWelcomeLetter(
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  batchCode: string
) {
  return (
    <div className="page">
      {renderWatermark()}
      <div>
        {renderHeader()}
        <div className="ref-date-bar">
          <div><strong>Ref No:</strong> {refNo}</div>
          <div><strong>Date:</strong> {letterDate}</div>
        </div>

        <div className="doc-title-container">
          <div className="doc-title">WELCOME LETTER</div>
        </div>

        <div className="content-body">
          <div className="candidate-box">
            <div className="candidate-col">
              <p><strong>Dear:</strong> ={student.student_name}</p>
              <p><strong>Father's Name:</strong> ={student.father_name}</p>
            </div>
            <div className="candidate-col" style={{ textAlign: "right" }}>
              <p><strong>Batch Code:</strong> {batchCode}</p>
              <p><strong>App Number:</strong> {student.application_number || "IAS-APP-" + batchCode}</p>
            </div>
          </div>

          <p style={{ fontSize: "8.9pt", lineHeight: 1.45, marginTop: "4px" }}>
            We are pleased to inform you that you have been selected for the Training Program with Jetstar Airways.<br />
            We welcome you to be a part of our dynamic team and are confident that your skills and dedication will be a valuable addition to our organization.
          </p>

          <p style={{ fontSize: "8.8pt", fontWeight: 600, color: "#0f2d59" }}>
            You are required to undergo the mandatory training program as per the details given below:
          </p>

          <table className="data-table">
            <tbody>
              <tr>
                <th style={{ width: "32%" }}>DATE OF VISITING</th>
                <td><strong>: {reportingDate}</strong></td>
              </tr>
              <tr>
                <th>TRAINING LOCATION</th>
                <td><strong>: {centerLocation}</strong></td>
              </tr>
              <tr>
                <th>PROGRAM</th>
                <td><strong>: {student.course_name || "Induction & Aviation Operations Training"}</strong></td>
              </tr>
              <tr>
                <th>DURATION</th>
                <td>: As per training schedule (Details will be shared separately)</td>
              </tr>
              <tr>
                <th>BATCH CODE</th>
                <td><strong>: {batchCode}</strong></td>
              </tr>
            </tbody>
          </table>

          <div>
            <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "8.8pt", marginBottom: "4px" }}>
              DOCUMENTS REQUIRED
            </div>
            <p style={{ fontSize: "8.5pt", color: "#334155", marginBottom: "4px" }}>
              Please carry self-attested copies of the following documents:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", fontSize: "8.5pt" }}>
              <div>1. Education Documents</div>
              <div>4. Address Proof</div>
              <div>2. Character Certificate</div>
              <div>5. Medical Certificate</div>
              <div>3. Aadhar Card</div>
              <div>6. IATA Airline Ticketing & Reservation – CSA Certification</div>
            </div>
            <p style={{ fontSize: "8.5pt", marginTop: "4px" }}>
              7. An IATA software internship or experience letter is required.
            </p>
          </div>

          <p style={{ fontSize: "8.5pt", color: "#334155", lineHeight: 1.4, marginTop: "2px" }}>
            Please ensure that you report on time on the training date with all the above documents. Failure to do so may result in delay or cancellation of your training. We look forward to a successful training experience and a long association with Jetstar Airways. For any queries, feel free to contact our HR team.
          </p>
        </div>
      </div>

      <div>
        <div className="signatures-section">
          <div className="sig-block">
            <p><strong>Warm Regards,</strong></p>
            <p style={{ marginTop: "3px", fontWeight: 700, color: "#0f2d59" }}>Jaala Sahil</p>
            <p style={{ fontSize: "8pt", color: "#64748b" }}>HR Department</p>
            <p style={{ fontSize: "8.5pt", fontWeight: 700, color: "#0f2d59" }}>JET STAR AIRWAYS</p>
          </div>
          <div className="sig-block" style={{ textAlign: "right" }}>
            <p><strong>For Indian Alliance Services</strong></p>
            <p style={{ fontSize: "8pt", color: "#64748b" }}>Authorized Academic Signatory</p>
            <div className="stamp-sig-container">
              <img
                className="stamp-img"
                src="/stamp.png"
                alt="seal"
                style={{ position: "absolute", bottom: "-6px", right: "80px", width: "76px", height: "auto" }}
              />
              <img
                className="sig-img"
                src="/signature.png"
                alt="signature"
                style={{ position: "absolute", bottom: "2px", right: "15px", width: "100px", height: "auto" }}
              />
            </div>
          </div>
        </div>
        {renderFooter()}
      </div>
    </div>
  );
}

// =========================================================================
// 2. FINAL LETTER & FUND POLICY (5 Pages) - Exactly matches Alraza Khan PDF
// =========================================================================
function renderFinalLetter(
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  reportingTime: string,
  designation: string
) {
  return (
    <>
      {/* PAGE 1: Letter of Agreement */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">LETTER OF AGREEMENT</div>
          </div>

          <div className="content-body">
            <div style={{ fontSize: "9pt", lineHeight: 1.45 }}>
              <p><strong>To,</strong></p>
              <p><strong>Mr./Ms:</strong> {student.student_name}</p>
              <p><strong>Father's Name:</strong> {student.father_name}</p>
            </div>

            <p className="clause-p" style={{ marginTop: "6px" }}>
              Whereas Indian Alliance Services (hereinafter referred to as the company) has stated that it provides aviation and airport services and requires personnel for ground-handling related activities.
            </p>

            <p className="clause-p" style={{ fontSize: "9.2pt", fontWeight: 700, color: "#0f2d59", margin: "8px 0" }}>
              We are pleased to offer you an engagement as a {designation} for a period of 20 years.
            </p>

            <div style={{ background: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: "5px", padding: "10px 14px", margin: "6px 0" }}>
              <p style={{ fontSize: "8.8pt", color: "#0f2d59", fontWeight: 700 }}>
                Visiting Address:
              </p>
              <p style={{ fontSize: "8.8pt", color: "#334155", marginTop: "3px" }}>
                IN {centerLocation} ({reportingDate})
              </p>
            </div>

            <div className="clause-title" style={{ marginTop: "10px" }}>1. JURISDICTION</div>
            <p className="clause-p">
              This Agreement shall be governed by the laws of India and the Courts of Mumbai, India shall have exclusive jurisdiction to try all disputes between parties pursuant to this Agreement.
            </p>

            <div style={{ marginTop: "16px" }}>
              <p style={{ fontSize: "8.5pt", color: "#334155" }}>
                Yours Faithfully,<br />
                <strong>For Indian Alliance Services</strong><br />
                Authorized Signatory
              </p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: "8px", marginTop: "10px", fontSize: "8.5pt" }}>
            <p style={{ fontSize: "8.2pt", color: "#475569", marginBottom: "12px" }}>
              I have read and understood the aforesaid terms and conditions of engagement and the implications thereof and agree to accept and abide by the same.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Date: {letterDate}
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="stamp-sig-container" style={{ display: "inline-block", width: "160px" }}>
                  <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "70px", right: "70px", bottom: "0" }} />
                  <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "10px", bottom: "5px" }} />
                </div>
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 1 of 5</div>
        </div>
      </div>

      {/* PAGE 2: Service & Career Overview */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>CANDIDATE:</strong> {student.student_name}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">CORPORATE ENGAGEMENT OVERVIEW</div>
            <div className="doc-subtitle">Jetstar Airways & Airport Operations Alliance</div>
          </div>

          <div className="content-body">
            <p className="clause-p" style={{ fontSize: "9pt", lineHeight: 1.45 }}>
              Indian Alliance Services in strategic association with Jetstar Airways and leading airport ground service handlers across India delivers world-class aviation operational standards. Our personnel are deployed in comprehensive airport operational roles, terminal customer assistance, ramp operations, and check-in support.
            </p>

            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "5px", padding: "10px 14px", margin: "8px 0" }}>
              <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "9pt", marginBottom: "6px" }}>
                CORE OPERATIONAL DOMAINS
              </div>
              <ul className="list-styled" style={{ gap: "5px" }}>
                <li><strong>Airport Terminal Operations:</strong> Passenger check-in assistance, boarding gate protocols, baggage tag tracking, and terminal crowd navigation.</li>
                <li><strong>Aviation Customer Service:</strong> Executive passenger hospitality, special assistance for PRM (Passengers with Reduced Mobility), VIP escort services.</li>
                <li><strong>Operations Safety Compliance:</strong> Compliance with BCAS (Bureau of Civil Aviation Security) mandates, DGCA standard operating guidelines, and airline partner SOPs.</li>
                <li><strong>Career Progression Framework:</strong> Defined advancement from Grade G1 (Junior Associate) up to Grade G4 (Operations Lead / Station Manager) based on annual operational appraisal.</li>
              </ul>
            </div>

            <div style={{ border: "1.5px solid #0f2d59", borderRadius: "5px", padding: "10px 14px", marginTop: "10px" }}>
              <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "9pt", marginBottom: "4px" }}>
                ENGAGEMENT ASSURANCE & OPERATIONAL CONTINUITY
              </div>
              <p className="clause-p" style={{ margin: 0 }}>
                This engagement confirms candidate onboarding into active aviation ground operations. The candidate shall undergo structured on-the-job orientation followed by station deployment. All administrative documentation, Airport Entry Permit (AEP) coordination, and statutory employee benefits are facilitated by Indian Alliance Services.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Signature: ____________________</span>
            <span>Authorized Signatory: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 2 of 5</div>
        </div>
      </div>

      {/* PAGE 3: Annexure - A Emoluments Details */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">ANNEXURE - A</div>
            <div className="doc-subtitle">Emoluments Details & Monthly Salary Break-up</div>
          </div>

          <div className="content-body">
            <div style={{ fontSize: "9pt", fontWeight: 700, color: "#0f2d59", marginBottom: "4px" }}>
              Salary Break-up per Month: Rs. p.m. (Grade G1)
            </div>

            <table className="data-table" style={{ marginTop: "4px" }}>
              <thead>
                <tr>
                  <th style={{ width: "70%" }}>Particulars</th>
                  <th style={{ textAlign: "right" }}>Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1) Basic</td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>28,456</td>
                </tr>
                <tr>
                  <td>2) Attendance Bonus</td>
                  <td style={{ textAlign: "right" }}>3,500</td>
                </tr>
                <tr>
                  <td>3) Special Allowance</td>
                  <td style={{ textAlign: "right" }}>3,500</td>
                </tr>
                <tr style={{ background: "#f1f5f9", fontWeight: 800 }}>
                  <td style={{ color: "#0f2d59" }}>Gross Salary</td>
                  <td style={{ textAlign: "right", color: "#0f2d59" }}>35,456</td>
                </tr>
                <tr>
                  <td>Employees Contribution to P.F.</td>
                  <td style={{ textAlign: "right" }}>2,350</td>
                </tr>
                <tr>
                  <td>Professional Tax</td>
                  <td style={{ textAlign: "right" }}>1,394</td>
                </tr>
                <tr>
                  <td>ESIC</td>
                  <td style={{ textAlign: "right" }}>800</td>
                </tr>
                <tr>
                  <td>Income Tax</td>
                  <td style={{ textAlign: "right" }}>40,000</td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: "8pt", color: "#64748b", fontStyle: "italic", marginTop: "4px" }}>
              Note: The salary figures above are reproduced from the standard employment terms for Grade G1 and are subject to statutory revisions under applicable laws.
            </p>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <p><strong>Candidate Acceptance:</strong></p>
              <div className="sig-line">
                SIGNATURE: _______________________<br />
                NAME: {student.student_name}<br />
                DESIGNATION: {designation}<br />
                DATE: {letterDate}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <p style={{ fontSize: "8pt", color: "#64748b" }}>Authorized HR Signatory</p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "74px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 3 of 5</div>
        </div>
      </div>

      {/* PAGE 4: Joining & Reporting Details + Fund Policy */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">JOINING & REPORTING DETAILS</div>
            <div className="doc-subtitle">JETSTAR AIRLINE – {designation}</div>
          </div>

          <div className="content-body">
            <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "9pt", marginBottom: "3px" }}>
              JOINING & GROOMING REQUIREMENTS
            </div>
            <ul className="list-styled" style={{ gap: "3px" }}>
              <li><strong>Reporting:</strong> {reportingTime}</li>
              <li><strong>Documents:</strong> Originals + 2 sets of photocopies + nominee details, if applicable.</li>
              <li><strong>IATA:</strong> IATA Software internship Proof / Experience Letter is required.</li>
              <li><strong>Dress Code:</strong> Formal attire with polished black formal shoes.</li>
              <li><strong>Male Grooming:</strong> Clean-shaven / neatly trimmed beard & well-groomed hair.</li>
              <li><strong>Female Grooming:</strong> Neat hairstyle, formal attire & minimal accessories.</li>
              <li><strong>Joining:</strong> Report on the allotted date and within the specified time.</li>
              <li><strong>Company Process:</strong> Your fund policy amount will be refunded as per the company's refund policy after your airport visit. The refund details and receipt will be provided in your final letter. The UTR number / receipt of the payment you make will also be mentioned in the letter for your reference.</li>
            </ul>

            <div style={{ fontWeight: 800, color: "#0f2d59", fontSize: "9.2pt", margin: "6px 0 2px 0", textTransform: "uppercase" }}>
              JET STAR PAN REGION AS CHECKER, FOR GROUND STAFF
            </div>

            <div style={{ background: "#f8fafc", border: "1.5px solid #0f2d59", borderRadius: "5px", padding: "10px 12px", marginTop: "4px" }}>
              <div style={{ fontWeight: 800, color: "#0f2d59", fontSize: "9.5pt", marginBottom: "4px" }}>
                FUND POLICY
              </div>
              <p className="clause-p" style={{ marginBottom: "5px" }}>
                As part of the engagement terms stated in this document, a Fund Policy is required to be submitted on the same day on which this letter is received, subject to applicable company procedures and independent verification.
              </p>
              <p className="clause-p" style={{ marginBottom: "5px" }}>
                The stated purpose of the Fund Policy is to provide a long-term employee benefit arrangement, noting that retirement benefits or pension, if any, shall be governed strictly by the applicable employment terms and company policy.
              </p>
              <p className="clause-p" style={{ margin: 0, fontWeight: 600, color: "#0f2d59" }}>
                Under the proposed contribution structure, 70% is to be contributed by the Company and 30% is to be contributed by the Candidate. All contributions, eligibility conditions, refundability, and settlement terms shall be subject to the applicable written policy and official verification.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Acknowledged: ____________________</span>
            <span>Authorized Signatory: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 4 of 5</div>
        </div>
      </div>

      {/* PAGE 5: Company Policies, Confidentiality & Signatures */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="content-body">
            <div className="clause-title" style={{ fontSize: "9.5pt" }}>2.(A) COMPANY POLICIES</div>
            <p className="clause-p">
              You will be, at all times, governed by the rules and regulations framed by the Company, as applicable and amended from time to time, provided however that in case there is any conflict between such rules and regulations and the provisions of this letter of appointment, the provisions herein alone shall apply and prevail.
            </p>
            <p className="clause-p">
              You shall only be entitled to the benefits and emoluments as offered hereinabove and accepted by you irrespective of your place of posting during your engagement period. This letter of Engagement, if not extended or terminated earlier, will automatically expire at the end of the period as mentioned above without the company having to do any other action.
            </p>

            <div className="clause-title" style={{ fontSize: "9.5pt", marginTop: "6px" }}>(B) CONFIDENTIALITY & NON-DISCLOSURE</div>
            <p className="clause-p">
              The confidentiality clauses shall come into effect from the date of signing this letter and the provision of this clause shall survive the termination of this Contract. If there is any breach of the terms with regard to confidentiality, the Company shall have the right to terminate your engagement at any time in writing without notice and shall be entitled to damages.
            </p>
            <p className="clause-p">
              In addition to the provisions of this clause, your confidentiality obligations towards the Company shall be governed by the terms and conditions of an Individual Non-Disclosure Agreement, attached hereto as Annexure B, which shall be considered as an integral part of this Letter of Engagement.
            </p>

            <div className="clause-title" style={{ fontSize: "9.5pt", marginTop: "6px" }}>(C) CONDUCT & DISCIPLINARY COMPLIANCE</div>
            <p className="clause-p">
              In the event of your involvement in any kind of acts which is detrimental to the interest of the Company or in the event of your arrest by the Police/Customs/any other government authority for involvement in any criminal offence, your engagement may be terminated immediately. In the event of misconduct under applicable rules and regulations, the company may take appropriate action.
            </p>
          </div>
        </div>

        <div>
          <div className="signatures-section" style={{ marginTop: "12px" }}>
            <div className="sig-block">
              <p><strong>Candidate Acceptance:</strong></p>
              <div className="sig-line">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Place: {centerLocation.split(" ")[0]}<br />
                Date: {letterDate}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <p style={{ fontSize: "8pt", color: "#64748b" }}>Authorized Signatory</p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "74px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
              <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59", marginTop: "2px" }}>
                Authorized HR Designation
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 5 of 5</div>
        </div>
      </div>
    </>
  );
}

// =========================================================================
// 3. MASTER AGREEMENT & ANNEXURES (12 Pages) - Matches Kiran Ishwar Kurhe PDF
// =========================================================================
function renderMasterAgreement(
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  designation: string,
  fundPolicyAmount: string,
  securityDeposit: string
) {
  return (
    <>
      {/* PAGE 1: Agreement & Probation */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div style={{ fontSize: "8.8pt", lineHeight: 1.4, marginBottom: "6px" }}>
            <p><strong>To,</strong></p>
            <p><strong>Mr./MS=</strong>{student.student_name}</p>
            <p><strong>S/O.MR=</strong>{student.father_name}</p>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">LETTER OF AGREEMENT</div>
          </div>

          <div className="content-body">
            <p className="clause-p">
              Whereas Indian Alliance Services (herein after referred to as "the company"), has secured ground handling contracts at Airports in India and in order to fulfills this contractual obligation, the company desires to engage personnel.
            </p>
            <p className="clause-p" style={{ fontWeight: 600, color: "#0f2d59" }}>
              The terms and conditions are as follows:
            </p>

            <div className="clause-title">1. Agreement</div>
            <p className="clause-p">
              We are pleased to offer you an engagement as a <strong>{designation}</strong> for a period of 20 years. Your date of joining = <strong>{reportingDate}</strong>.
            </p>
            <p className="clause-p">
              Your engagement is subject to the verification of your antecedents and character testimonials. The information provided by you to the company would be subject to verification by the company and in case of any discrepancy or facility which comes to the knowledge of the company, your services shall be terminated without notice or you may also be subjected to further penal action as warranted. Your engagement for service in the company will be subject to your being found medically fit to carry out the job for which your services are engaged.
            </p>
            <p className="clause-p">
              During the validity and pendency of engagement, if you are unable to perform your obligation/duties due to medical unfitness either temporary (lasting for more than 45 days) or permanent medical unfitness as determined by company's appointed Medical Officer, or for any other reasons (lasting more than 45 days) the engagement will come to an end automatically and the management will be absolved of any obligation/liability, whatsoever, either to extend or enter into any fresh engagement with you. In such an event, the engagement for service will be terminated without any compensation and you will not be entitled to any payment for the period of absence.
            </p>
            <p className="clause-p">
              Your employment and remuneration start only upon issuance of the AEP by the authorities, and your commencement of work at your allotted station/department. Furthermore, if any time for any reason, your AEP is revoked, the company may terminate your services without notice. In case your place of work is in the operational area for which an AEP is requirement to perform your duties, your employment and remuneration will commence after you have attained an AEP and restored for work in your allotted department. In other cases, your employment and remuneration will commence from the date you have joined duties.
            </p>

            <div className="clause-title">2. Probation Confirmation</div>
            <p className="clause-p">
              You will be placed on probation on your joining the company. The Probation period will be as per the grade, which is as follows: <strong>G1 to G2 - 3 Months</strong>. The probation period may be extended if so deemed necessary by the company for such further period as it deems fit. After Completion of Probation period, either initial or extended as the case may be, the company may at its sole discretion confirm your engagement with the company for a period of 30 years inclusive of probation. If the probationary period is not extended or confirmed in writing, your service will stand terminated by the company.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 1 of 12</div>
        </div>
      </div>

      {/* PAGE 2: Training, Compensation, Benefits, Location */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">3. Training</div>
            <p className="clause-p">
              You shall, if required at any time undergo any training or refresher course as may be determined by the company. As an employee of the company, you are liable to serve or undergo training anywhere in or outside India, as may be required.
            </p>
            <p className="clause-p">
              In the event, if you abscond soon after training, the company will view this as an act of gross misconduct and take disciplinary action, including legal to cover the investments that have been made on you.
            </p>
            <p className="clause-p">
              You shall be required to deposit with the company an amount of Rs. 8865 towards the cost of training incurred on you by the company and experience gained in the company in the course of employment. This amount will be refunded only after completion of 2 or more years of service in the company at the time of separation. (Grade G1: Rs. 8865.00).
            </p>

            <div className="clause-title">4. Compensation</div>
            <p className="clause-p">
              Your Monthly Gross Salary will be Rs. 28,456/- to Rs. 35,456/- subject to statutory deductions. The details are as indicated in the Annexure-A. You will not be entitled to any other monetary compensation.
            </p>

            <div className="clause-title">5. Statutory Benefits & Deductions</div>
            <p className="clause-p">
              You will be eligible for provident fund as per the Provident Fund and Miscellaneous Provisions Act, 1952 or any amendments thereto after deducting the appropriate sums from your gross salary. The Maximum employer contribution will be up to a Basic Salary of Rs. 40,000/- per month. The amount payable to you shall be subject to income tax deduction at source.
            </p>

            <div className="clause-title">6. Gratuity</div>
            <p className="clause-p">
              You will be eligible for gratuity as per the Payment of Gratuity Act 1972.
            </p>

            <div className="clause-title">7. Medical Benefits & Fitness</div>
            <p className="clause-p">
              Your continuation in the company will be strictly subject to your continued medical fitness. You will be required to comply with the medical standards prescribed by the company including weight as per company standards, grooming and appearance, failing which your services are liable to be terminated.
            </p>
            <p className="clause-p">
              You will be entitled for medical benefits as per the Employees' State Insurance Act 1948 ("ESIC Act") for those employees who come under the purview of the Act. For Employees who are outside the Purview of the Act, the company insured them for an amount of Rs. 100,000/- towards hospitalization.
            </p>

            <div className="clause-title">8. Location</div>
            <p className="clause-p">
              You will be initially posted at Delhi or the designated station but you can be transferred to any other group company/affiliate/sister concern/subsidiary of the company anywhere in India. Your base location will be at the absolute discretion of the company. Refusal to carry out such instructions shall constitute "Misconduct", for which your services shall be liable to be terminated. Deployment of services will be at the sole discretion of the Management and subject to the exigencies of the company.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 2 of 12</div>
        </div>
      </div>

      {/* PAGE 3: Personal Particulars, AEP, Uniforms, Accommodation */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">9. Personal Particulars</div>
            <p className="clause-p">
              You shall keep the company informed in writing of any change of your marital status and residential address. In the event of you not informing the company about the change in your Residence Address, any communication sent to you at the address available with the company shall be deemed to have been served on you.
            </p>

            <div className="clause-title">10. Identity card & AEP</div>
            <p className="clause-p">
              For identification and security, you will be issued an identity Card. If you are required to work in the Airport premises, you will also be issued an Airport Entry Pass (AEP) at the time of being engaged, which is to be displayed at all times in the company and Airport Premises.
            </p>
            <p className="clause-p">
              If your place of work is within the Airport wherein the Entry inside the airport is restricted, i.e. controlled/regulated by BCAS, the issuance of an airport Entry Pass (AEP) is clarified that your engagement with this company shall be subject to AEP being issued and renewed by the competent authorities.
            </p>
            <p className="clause-p">
              Loss of Identity Card must be reported to the HRD immediately; duplicate will be issued with a charge of Rs. 150/-. In case of loss of AEP, you will be required to follow the rules laid by BCAS. If at any time, for any reason whatsoever, your AEP is revoked, your services with the company lapses and will stand terminated.
            </p>

            <div className="clause-title">11. Uniforms</div>
            <p className="clause-p">
              You shall carry out your official obligations in the uniform provided by the Company and shall be responsible for the safe custody of all sets of uniforms supplied to you.
            </p>
            <p className="clause-p">
              On Induction into the company, you will be required to pay uniform Deposit of Rs. 4215/-. In case of loss/damage of uniform, you will be required to pay the cost of the additional uniform. In case of separation from the Company prior to completion of mandatory tenure, this Uniform deposit will be forfeited.
            </p>
            <p className="clause-p">
              In case you are transferred to a position where you are not required to wear a uniform, the uniform deposit will be refunded and the uniforms will be required to be surrendered to the company. Your Uniform deposit will be refunded only at the time of separation in the full and final settlement after having surrendered the uniforms. (Grade G1 Uniform deposit: Rs. 4215.00).
            </p>

            <div className="clause-title">12. Accommodation</div>
            <p className="clause-p">
              You will be provided Food and accommodation by the Company during the training period. After that, company only provides quarters not any kind of food and personal accommodation.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 3 of 12</div>
        </div>
      </div>

      {/* PAGE 4: Transportation, Working Hours, Attendance, Leave, Termination */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">13. Transportation</div>
            <p className="clause-p">
              Transportation if considered by the Company at any time or reason whatever shall be at the discretion of the Management.
            </p>

            <div className="clause-title">14. Working hours</div>
            <p className="clause-p">
              Your working hours will be 48 hours per week (whether on shifts or otherwise excluding break periods), and shall also be subject to change without notice. You may be required to work for additional hours in case of any exigency, for which you will be compensated as per Company policy.
            </p>

            <div className="clause-title">15. Attendance</div>
            <p className="clause-p">
              You shall be at work at the establishment at the times fixed and notified. If you attend late or after recording attendance are found absent from your place of work during working hours without permission or without sufficient reason, you shall be liable for disciplinary action as deemed fit. Salary or wages will be paid as per the time recorded in the system such as biometric system.
            </p>

            <div className="clause-title">16. Leave</div>
            <p className="clause-p">
              You will not be eligible for any type of leave for the first 3 months of your probation period. No type of leave can be availed of as a matter of right. The Management reserves its discretion either to grant or refuse leave applied depending upon exigencies of service.
            </p>
            <p className="clause-p">
              A leave year is from 1st April to 31st March (Financial Year). There will be no accumulation of leaves and unutilized leaves lap at year end:
            </p>
            <ul className="list-styled">
              <li><strong>a. Declared Public Holidays:</strong> Eligible for 10 days declared holidays in a Calendar year.</li>
              <li><strong>b. Casual Leave (CL):</strong> Eligible for Casual Leave to the extent of 7 days in a Financial Year.</li>
              <li><strong>c. Sick Leave (SL):</strong> Eligible for Sick Leave to the extent of 7 days on full pay. Sick leave of more than 2 days must be supported by a registered medical practitioner's certificate.</li>
              <li><strong>d. Privilege Leave (PL):</strong> Eligible for 21 days Privilege Leave in a Financial Year on pro-rata basis. Privilege Leave needs to be applied 15 days in advance.</li>
            </ul>

            <div className="clause-title">17. Termination of Service (Part A)</div>
            <p className="clause-p">
              In the event of your absence from work for a continuous period of 8 days without obtaining prior approval of the Company or over-staying sanctioned leave beyond 8 days, your engagement shall be liable to be terminated without notice. During engagement, if conduct is unsatisfactory, engagement will be terminated immediately. On expiry of engagement period, you will not claim any monetary benefits other than applicable dues.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 4 of 12</div>
        </div>
      </div>

      {/* PAGE 5: Termination Part B, Notice Period, Separation, Company Policies */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">17. Termination of Service (Part B)</div>
            <p className="clause-p">
              In the event of your involvement in any kind of acts detrimental to the interest of the Company or in the event of arrest by Police/Customs/government authority for involvement in criminal offence, your engagement will be terminated immediately. In the event of misconduct, the company shall be entitled to terminate your engagement forthwith.
            </p>
            <p className="clause-p">
              In the event contracts with Customer Airlines are terminated at any time for any reason whatsoever, your engagement comes to an end automatically without compensation. In case performance is assessed as unsatisfactory or attitudinal deficiencies arise, engagement is liable to be terminated.
            </p>

            <div className="clause-title">18. Notice Period</div>
            <p className="clause-p">
              An employee on probation may leave or be discharged with a notice of 7 days or 7 days' gross salary. After confirmation, the Company reserves the right to terminate engagement at any time by giving One month's notice in writing or One month's Gross salary in lieu thereof.
            </p>
            <p className="clause-p">
              Likewise, in case you wish to leave your contractual engagement, you shall be required to give one month's notice in writing or one month's Gross Salary in lieu thereof (Grade G1 to G2: 1 month). Breach of conditions renders liability to termination without notice; outstanding dues shall be forfeited.
            </p>

            <div className="clause-title">19. Separation</div>
            <p className="clause-p">
              Should you leave the organization without giving the requisite notice period, no dues will be payable and no full & final settlement shall be processed.
            </p>
            <p className="clause-p">
              On termination/resignation, you will immediately return all company assets (ID card, AEP, Uniforms, Laptop, Cell Phone, documents, etc.) in your custody and obtain clearance certificates. Dues will be settled within 45 working days only after obtaining all clearances. If full and final settlement is not claimed within 90 days of leaving, no dues shall be payable.
            </p>

            <div className="clause-title">20. Company Policies</div>
            <p className="clause-p">
              You will be, at all times, governed by the rules and regulations framed by the Company, as applicable and amended from time to time. In case of any conflict between such rules and this letter of appointment, the provisions herein alone shall apply and prevail. You shall only be entitled to the benefits and emoluments offered herein and accepted by you. This engagement, if not extended or terminated earlier, will automatically expire at the end of the period.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 5 of 12</div>
        </div>
      </div>

      {/* PAGE 6: Confidentiality & Code of Conduct */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">21. Confidentiality</div>
            <p className="clause-p">
              You shall undertake to maintain the strictest secrecy concerning the activities of the Company. You shall not publish or cause to be published any article, book, photograph, letter or give any interview or broadcast or deliver any lecture on any matter which concerns your duties or business of the Company without prior written permission.
            </p>
            <p className="clause-p">
              (i) You acknowledge that during your employment, you may have access to and become familiar with trade secrets and confidential business information of the Company, operations, processes, finances, and affairs. Therefore, you shall not during or after the term of engagement disclose to any third party such trade secrets, directly or indirectly, or use them in any way for your own purposes.
            </p>
            <p className="clause-p">
              (ii) You shall not copy, extract, translate, remove or delete documents or papers containing such trade secrets except as authorized by your duties. Confidentiality clauses 21(i) and 21(ii) survive termination of this Contract. Breaches entitle the Company to terminate engagement and claim damages. Confidentiality obligations are further governed by the Individual Non-Disclosure Agreement (Annexure B).
            </p>

            <div className="clause-title">22. Code of Conduct</div>
            <p className="clause-p">
              During the tenure of this engagement, you shall discharge your duties honestly, diligently, and conscientiously in all respects, at all times in the best interest of the Company. You shall not sign any other contract or render assistance to any other organization or person.
            </p>
            <p className="clause-p">
              If investigated and found to have exhibited unsatisfactory conduct including insubordination, dishonesty, theft, intimidation, ethical infractions, or committing acts detrimental to the reputation and business interests of the Company, the engagement will be terminated forthwith.
            </p>
            <p className="clause-p">
              You shall be liable to make good any loss caused to the company due to your negligence, default, or breach of instructions. In addition to this clause, you shall abide by the Code of Conduct attached hereto as Annexure C.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Signature: ____________________</span>
            <span>Authorized Signatory: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 6 of 12</div>
        </div>
      </div>

      {/* PAGE 7: Jurisdiction, Airport Allocation, Submissions & Signatures */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">23. Jurisdiction</div>
            <p className="clause-p">
              This Agreement shall be governed by the laws of India and the Courts of Mumbai, India shall have exclusive jurisdiction to try all disputes between parties pursuant to this Agreement.
            </p>

            <div className="clause-title">24. Statutory Deductions</div>
            <p className="clause-p">
              The income tax and other statutory deductions will be made as per the prevailing laws.
            </p>

            <div className="clause-title">25. Airport Station Allocation</div>
            <p className="clause-p" style={{ fontWeight: 600, color: "#0f2d59" }}>
              You are requested to visit ({designation}) IN {centerLocation} ({reportingDate}).
            </p>

            <div className="clause-title">26. Fund Policy</div>
            <p className="clause-p">
              Must be need fund policy amount Rs. {fundPolicyAmount}/- as per company policy schedule.
            </p>

            <div className="clause-title">27. Required Documents & Submission Checklist</div>
            <div style={{ fontSize: "8.2pt", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 14px", margin: "2px 0 4px 0" }}>
              <div>a. Education qualification certificates & SLC</div>
              <div>f. Permanent Account Number (PAN Card)</div>
              <div>b. Experience Certificate (if applicable)</div>
              <div>g. IATA Software certificate & medical cert</div>
              <div>c. Birth Certificate / Residence Proof</div>
              <div>h. Rs. {securityDeposit}/- refundable security policy</div>
              <div>d. 2 Photo ID proofs (Aadhaar, Passport, etc.)</div>
              <div>i. IATA software internship or exp letter</div>
              <div>e. 10 Passport size Photographs</div>
              <div>• Refundable security after 90 days completion</div>
            </div>
            <p className="clause-p" style={{ fontSize: "8pt", color: "#64748b", margin: "2px 0" }}>
              NOTE – Complete submission of your security amount ensures uninterrupted joining process and document issuance.
            </p>
          </div>
        </div>

        <div>
          <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: "6px", marginTop: "4px", fontSize: "8.5pt" }}>
            <p style={{ fontSize: "8pt", color: "#475569", marginBottom: "8px" }}>
              I have read and understood the aforesaid terms and conditions of engagement and the implications thereof and agree to accept and abide by the same.
            </p>
            <div className="signatures-section" style={{ marginTop: 0 }}>
              <div className="sig-block">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Place: {centerLocation.split(" ")[0]}<br />
                Date: {letterDate}
              </div>
              <div className="sig-block" style={{ textAlign: "right" }}>
                <p><strong>Yours Faithfully,</strong></p>
                <p><strong>For Indian Alliance Services</strong></p>
                <div className="stamp-sig-container">
                  <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "70px", right: "70px" }} />
                  <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "10px" }} />
                </div>
                <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59" }}>
                  Authorized Signatory Designation
                </div>
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 7 of 12</div>
        </div>
      </div>

      {/* PAGE 8: Section Two Divider */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="doc-title-container" style={{ marginTop: "30px" }}>
            <div className="doc-title">SECTION TWO: ANNEXURES</div>
            <div className="doc-subtitle">Operational Directives & Mandatory Covenants</div>
          </div>

          <div className="content-body" style={{ marginTop: "20px" }}>
            <div style={{ background: "#f8fafc", border: "1.5px solid #0f2d59", borderRadius: "8px", padding: "18px 20px" }}>
              <div style={{ fontWeight: 800, color: "#0f2d59", fontSize: "10pt", marginBottom: "12px", textAlign: "center" }}>
                TABLE OF CONTRACTUAL ANNEXURES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "9pt" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                  <strong>ANNEXURE - A:</strong>
                  <span>Emoluments Details & Monthly Salary Break-up (Grade G1)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                  <strong>ANNEXURE - B:</strong>
                  <span>Airport Proprietary Information & Non-Disclosure Agreement (NDA)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                  <strong>ANNEXURE - C:</strong>
                  <span>Code of Conduct & Employee Ethical Obligations</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                  <strong>ANNEXURE - D:</strong>
                  <span>Job Purpose & Ground Staff Specific Responsibilities (SOPs)</span>
                </div>
              </div>
            </div>

            <p className="clause-p" style={{ textAlign: "center", marginTop: "24px", color: "#64748b", fontStyle: "italic" }}>
              All following annexures are executed as integral components of this Master Employment Agreement and carry equal legal validity and binding enforceability.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Candidate Signature: ____________________</span>
            <span>Authorized Signatory: [IAS Verified]</span>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 8 of 12</div>
        </div>
      </div>

      {/* PAGE 9: Annexure A Emoluments Details */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>Date:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">ANNEXURE - A</div>
            <div className="doc-subtitle">Emoluments Details & Monthly Salary Break-up</div>
          </div>

          <div className="content-body">
            <div style={{ fontSize: "9pt", fontWeight: 700, color: "#0f2d59", marginBottom: "4px" }}>
              Salary Break-up per Month: Rs. p.m. (Grade G1)
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: "70%" }}>Particulars</th>
                  <th style={{ textAlign: "right" }}>Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1) Basic</td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>28,456</td>
                </tr>
                <tr>
                  <td>2) Attendance Bonus</td>
                  <td style={{ textAlign: "right" }}>3,500</td>
                </tr>
                <tr>
                  <td>3) Special Allowance</td>
                  <td style={{ textAlign: "right" }}>3,500</td>
                </tr>
                <tr style={{ background: "#f1f5f9", fontWeight: 800 }}>
                  <td style={{ color: "#0f2d59" }}>Gross Salary</td>
                  <td style={{ textAlign: "right", color: "#0f2d59" }}>35,456</td>
                </tr>
                <tr>
                  <td>Employees Contribution to P.F.</td>
                  <td style={{ textAlign: "right" }}>2,350</td>
                </tr>
                <tr>
                  <td>Professional Tax</td>
                  <td style={{ textAlign: "right" }}>1,394</td>
                </tr>
                <tr>
                  <td>ESIC</td>
                  <td style={{ textAlign: "right" }}>800</td>
                </tr>
                <tr>
                  <td>Income Tax</td>
                  <td style={{ textAlign: "right" }}>40,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <div className="sig-line">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Place: {centerLocation.split(" ")[0]}<br />
                Date: {letterDate}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "72px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 9 of 12</div>
        </div>
      </div>

      {/* PAGE 10: Annexure B NDA */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">ANNEXURE - B</div>
            <div className="doc-subtitle">Airport Proprietary Information & Non-Disclosure Agreement</div>
          </div>

          <div className="content-body">
            <p className="clause-p">
              At all times during my employment with Airport and thereafter, I will hold in strictest confidence and will not disclose, use, lecture upon or publish any of the Airport JVC Proprietary Information, except as such disclosure, use or publication may be required in connection with my work for Airport JVC, or unless an officer expressly authorizes in writing.
            </p>

            <div className="clause-title">Proprietary Information</div>
            <p className="clause-p">
              The term "Proprietary Information" shall mean any and all confidential and/or proprietary knowledge, data or information of Airport JVC. By way of illustration but not limitation, Proprietary Information includes:
            </p>
            <ul className="list-styled" style={{ gap: "2px" }}>
              <li>(a) Information regarding plans for operations, passenger volumes, security methods, budgets, licenses, prices and costs;</li>
              <li>(b) Information regarding skills and compensation of other personnel;</li>
              <li>(c) Trade secrets, inventions, ground handling processes, technical software, and airline algorithms.</li>
            </ul>

            <div className="clause-title">Third Party Information</div>
            <p className="clause-p">
              I understand that Airport JVC has received and will receive from third parties confidential or proprietary information subject to a duty to maintain confidentiality and use it only for certain limited purposes. During employment and thereafter, I will hold Third Party Information in strictest confidence.
            </p>

            <div className="clause-title">No Improper Use of Information of Prior Employers</div>
            <p className="clause-p">
              During my employment, I will not improperly use or disclose confidential information or trade secrets of any former employer, and will use only information generally known and legally in the public domain.
            </p>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <div className="sig-line">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Designation: {designation}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "72px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 10 of 12</div>
        </div>
      </div>

      {/* PAGE 11: Annexure C Code of Conduct */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">ANNEXURE - C</div>
            <div className="doc-subtitle">Code of Conduct & Employee Obligations</div>
          </div>

          <div className="content-body">
            <ol className="list-styled" style={{ gap: "6px" }}>
              <li>
                <strong>1. Absolute Integrity:</strong> Every employee of the company shall at all times maintain absolute integrity and devotion to duty and conduct himself/herself in a manner conducive to the best interest, credit and prestige of the company. An employee must always report to work in company issued uniform.
              </li>
              <li>
                <strong>2. Commercial Enterprise:</strong> An employee whether on leave or in active service shall not, without the previous sanction of the company, take part in the promotion, registration or management of any commercial enterprise.
              </li>
              <li>
                <strong>3. Official Documents:</strong> No employee shall communicate directly any official documents or information to any unauthorized person.
              </li>
              <li>
                <strong>4. Media & Broadcasts:</strong> No employee shall except with the previous approval of the CEO edit or manage any publication, or participate in radio/TV/online broadcasts, except of a purely literary or artistic character.
              </li>
              <li>
                <strong>5. Evidence in Inquiry:</strong> No employee shall, except with previous sanction of Senior Management, give evidence in connection with any inquiry conducted by external committees.
              </li>
              <li>
                <strong>6. Airport Authority Regulations:</strong> All employees have to abide by the code of conduct under the Airport Authority of India (AAI) and respective Airport Operators.
              </li>
              <li>
                <strong>7. Prohibition of Gifts:</strong> An employee must not accept gifts of any kind from external parties. Any gift must be immediately surrendered to HR/Admin Department.
              </li>
            </ol>
            <p className="clause-p" style={{ marginTop: "6px", fontWeight: 600 }}>
              The terms set out are acceptable to me, and are hereby agreed to.
            </p>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <div className="sig-line">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Designation: {designation}<br />
                Date: {letterDate}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "72px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 11 of 12</div>
        </div>
      </div>

      {/* PAGE 12: Annexure D Job Purpose & SOPs */}
      <div className="page">
        {renderWatermark()}
        <div>
          {renderHeader()}
          <div className="ref-date-bar">
            <div><strong>REF:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">ANNEXURE - D</div>
            <div className="doc-subtitle">Job Purpose & Specific Responsibilities</div>
          </div>

          <div className="content-body">
            <ul className="list-styled" style={{ gap: "4px" }}>
              <li>Shall be responsible for loading and offloading while ensuring the SOPs and guidelines issued by Airport and customer airlines are followed.</li>
              <li>Report to work on time as allocated and attend all daily shift briefings.</li>
              <li>Carry out baggage condition checks before loading and unloading; immediately inform seniors about any damaged bag.</li>
              <li>Look out for Dangerous Goods Stickers on baggage/items and escalate to supervisor immediately.</li>
              <li>Perform general airport operations functions such as boarding counter preparation, wheelchair guidance, and gate closing as required.</li>
            </ul>

            <div className="clause-title" style={{ marginTop: "6px" }}>Assist Wheelchair Passengers (PRM Protocol):</div>
            <ul className="list-styled" style={{ gap: "3px" }}>
              <li>At all times personnel will report for duty in company full uniform worn with reflective jacket labeled as "No Tips".</li>
              <li>Assist Passengers with Reduced Mobility (PRM) by providing wheelchair services from departure gate to aircraft and from arrival flight to curbside.</li>
              <li>Wheelchair assistant is not authorized to carry any passenger personal baggage voluntarily or involuntarily.</li>
              <li>Concentrate on wheelchair passenger safety and comfort at all times during movement.</li>
              <li>Assist needy passengers at check-in counter to keep baggage on weighing scales; remove old luggage tags.</li>
              <li>Meet & Assist assigned Pax (VVIP, VIP, CIP, and unaccompanied minors) as advised by shift Duty Managers.</li>
              <li style={{ fontWeight: 700, color: "#0f2d59" }}>
                Zero Gratuity Policy: Strictly no tips or personal gratuity in cash or kind is allowed. Anyone indulging in such practices is liable for immediate service termination.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <div className="sig-line">
                Signature: _______________________<br />
                Name: {student.student_name}<br />
                Designation: {designation}<br />
                Date: {letterDate}
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <div className="stamp-sig-container">
                <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "72px", right: "75px" }} />
                <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
              </div>
            </div>
          </div>
          {renderFooter()}
          <div className="page-number-text">Page 12 of 12</div>
        </div>
      </div>
    </>
  );
}

// =========================================================================
// 4. CONFIRMATION ADVICE (1 Page) - Clean Corporate Training Confirmation
// =========================================================================
function renderConfirmationLetter(
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  reportingTime: string,
  batchCode: string
) {
  return (
    <div className="page">
      {renderWatermark()}
      <div>
        {renderHeader()}
        <div className="ref-date-bar">
          <div><strong>REF NO:</strong> {refNo}</div>
          <div><strong>DATE:</strong> {letterDate}</div>
        </div>

        <div className="doc-title-container">
          <div className="doc-title">TRAINING ADMISSION & REPORTING CONFIRMATION</div>
          <div className="doc-subtitle">{student.course_name || "Aviation Ground Operations Program"}</div>
        </div>

        <div className="content-body">
          <div className="candidate-box">
            <div className="candidate-col">
              <p><strong>Trainee Name:</strong> {student.student_name}</p>
              <p><strong>Father's Name:</strong> {student.father_name}</p>
            </div>
            <div className="candidate-col" style={{ textAlign: "right" }}>
              <p><strong>Candidate ID:</strong> {student.application_number}</p>
              <p><strong>Batch Code:</strong> {batchCode}</p>
            </div>
          </div>

          <p style={{ fontSize: "8.8pt", lineHeight: 1.45, marginTop: "4px" }}>
            Dear <strong>{student.student_name}</strong>,<br />
            We are pleased to confirm your admission into the <strong>Aviation Customer Service & Airport Passenger Handling Skill Program</strong> conducted by <strong>Indian Alliance Services</strong>. This curriculum covers essential passenger handling SOPs, terminal customer service, reservation systems, and professional aviation communication.
          </p>

          <table className="data-table">
            <tbody>
              <tr>
                <th style={{ width: "32%" }}>Training Course</th>
                <td><strong>{student.course_name || "Customer Service & Airport Operations"}</strong></td>
              </tr>
              <tr>
                <th>Reporting Center / Airport</th>
                <td><strong>{centerLocation}</strong></td>
              </tr>
              <tr>
                <th>Reporting & Induction Date</th>
                <td><strong>{reportingDate}</strong> (Reporting Time: {reportingTime})</td>
              </tr>
              <tr>
                <th>Curriculum Focus</th>
                <td>Passenger Service SOPs, Airline Check-in, Boarding Gate Protocol, Soft Skills & Interview Drills</td>
              </tr>
            </tbody>
          </table>

          <div>
            <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "8.8pt", marginBottom: "3px" }}>
              TRAINING RULES & ACADEMY PROTOCOLS:
            </div>
            <ul className="list-styled">
              <li><strong>Attendance Requirement:</strong> Trainees must maintain a minimum of 85% attendance to qualify for course assessments and certification.</li>
              <li><strong>Grooming & Attire:</strong> Professional business formal attire is mandatory during all training sessions. Candidates must adhere to airline industry grooming standards.</li>
              <li><strong>Documentation:</strong> Candidate must submit self-attested copies of educational marksheets, Aadhaar card, and 4 passport-size photographs on the reporting date.</li>
              <li><strong>Verification:</strong> All student credentials and registration status can be verified 24/7 on our official registry at <em>indianallianceservices.com</em>.</li>
            </ul>
          </div>

          <p style={{ fontSize: "8pt", color: "#475569", fontStyle: "italic", marginTop: "4px" }}>
            <strong>Jurisdiction:</strong> Any inquiry concerning this training enrollment shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Visakhapatnam / Mumbai.
          </p>
        </div>
      </div>

      <div>
        <div className="signatures-section">
          <div className="sig-block">
            <p><strong>Trainee Declaration & Acceptance:</strong></p>
            <div className="sig-line">
              Candidate Signature: _______________________<br />
              Date: {letterDate}
            </div>
          </div>
          <div className="sig-block" style={{ textAlign: "right" }}>
            <p><strong>For Indian Alliance Services</strong></p>
            <p style={{ fontSize: "7.8pt", color: "#64748b" }}>Authorized Signatory</p>
            <div className="stamp-sig-container">
              <img className="stamp-img" src="/stamp.png" alt="seal" style={{ width: "74px", right: "75px" }} />
              <img className="sig-img" src="/signature.png" alt="sig" style={{ width: "95px", right: "12px" }} />
            </div>
            <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59", marginTop: "2px" }}>
              Registrar of Training & Admissions
            </div>
          </div>
        </div>
        {renderFooter()}
      </div>
    </div>
  );
}
