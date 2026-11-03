import React, { useState } from "react";
import { X, Printer, FileText, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/services/studentService";

interface StudentLetterModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  initialLetterType?: LetterType;
}

type LetterType = "welcome" | "confirmation" | "agreement";

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
    font-size: 9.5pt;
    line-height: 1.4;
  }
  .letter-page-scope .page {
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    margin: 0 auto 24px auto;
    background: #ffffff;
    position: relative;
    padding: 12mm 16mm 10mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
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
    padding-bottom: 8px;
    border-bottom: 2px solid #0f2d59;
  }
  .letter-page-scope .header-gold-line {
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37);
    margin-top: 2px;
    margin-bottom: 10px;
  }
  .letter-page-scope .logo-container img {
    height: 52px !important;
    max-height: 52px !important;
    width: auto !important;
    object-fit: contain;
    display: block;
  }
  .letter-page-scope .org-details {
    text-align: right;
    font-size: 8pt;
    color: #334155;
    line-height: 1.35;
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
    color: #475569;
    font-weight: 600;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #e2e8f0;
  }
  .letter-page-scope .doc-title-container {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }
  .letter-page-scope .doc-title {
    font-size: 13.5pt;
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
    gap: 8px;
    font-size: 9pt;
    color: #1e293b;
  }
  .letter-page-scope .candidate-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #0f2d59;
    border-radius: 4px;
    padding: 7px 12px;
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
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
  .letter-page-scope .disclaimer-box {
    background: #fffbeb;
    border: 1.5px solid #f59e0b;
    border-radius: 5px;
    padding: 7px 10px;
    font-size: 8pt;
    color: #92400e;
    line-height: 1.35;
    margin: 4px 0;
  }
  .letter-page-scope .disclaimer-box strong {
    color: #b45309;
    font-size: 8.5pt;
    display: block;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
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
    margin-top: 25px;
    padding-top: 3px;
    line-height: 1.4;
  }
  .letter-page-scope .stamp-sig-container {
    position: relative;
    height: 65px;
    margin-top: 2px;
  }
  .letter-page-scope .stamp-img {
    position: absolute;
    bottom: -6px;
    right: 80px;
    width: 78px !important;
    opacity: 0.95;
  }
  .letter-page-scope .sig-img {
    position: absolute;
    bottom: 2px;
    right: 15px;
    width: 105px !important;
    opacity: 0.98;
  }
  .letter-page-scope .footer {
    position: relative;
    z-index: 1;
    padding-top: 6px;
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
    line-height: 1.38;
  }
  .letter-page-scope .list-styled li {
    margin-bottom: 2px;
  }
  .letter-page-scope .clause-title {
    font-weight: 700;
    color: #0f2d59;
    font-size: 9pt;
    margin-top: 5px;
    margin-bottom: 2px;
  }
  .letter-page-scope .clause-p {
    font-size: 8.5pt;
    color: #334155;
    text-align: justify;
    line-height: 1.38;
    margin-bottom: 5px;
  }
  .letter-page-scope .page-number-text {
    font-size: 7.5pt;
    color: #94a3b8;
    text-align: right;
    margin-top: 2px;
  }
`;

export default function StudentLetterModal({
  student,
  isOpen,
  onClose,
  initialLetterType = "welcome",
}: StudentLetterModalProps) {
  const [letterType, setLetterType] = useState<LetterType>(initialLetterType);

  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [refNo, setRefNo] = useState(
    `IAS/TRG/${student.application_number ? student.application_number.replace("IAS-APP-", "") : "2026/01"}`
  );
  const [letterDate, setLetterDate] = useState(todayFormatted);
  const [centerLocation, setCenterLocation] = useState(
    "Nagpur Regional Training Center (Airport Zone, IATA: NAG)"
  );
  const [reportingDate, setReportingDate] = useState(
    student.placement_date || student.course_start_date || student.admission_date || "2026-11-29"
  );
  const [reportingTime, setReportingTime] = useState("09:30 AM IST");
  const [batchCode, setBatchCode] = useState(
    student.batch_code ||
      `IAS-TRG-${student.application_number ? student.application_number.replace(/\D/g, "") : "134803"}`
  );

  if (!isOpen) return null;

  // Print function
  const handlePrint = () => {
    const printContent = document.getElementById("printable-letter-container");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print/download the letter.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${student.student_name} - ${
      letterType === "welcome"
        ? "Training Welcome Letter"
        : letterType === "confirmation"
        ? "Training Confirmation Advice"
        : "Candidate Training Agreement"
    }</title>
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
      {/* Inject Scoped CSS for the preview */}
      <style>{LETTER_PREVIEW_CSS}</style>

      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-white">
                Training Letter Preview: <span className="text-amber-400">{student.student_name}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official Indian Alliance Services Letterhead & Training Undertaking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs gap-1.5 shadow-md"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 my-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Select Document Type
            </label>
            <select
              value={letterType}
              onChange={(e) => setLetterType(e.target.value as LetterType)}
              className="w-full bg-slate-900 border border-amber-500/50 text-amber-300 font-semibold rounded-lg p-2 text-xs focus:outline-none"
            >
              <option value="welcome">🎓 Training Welcome Letter</option>
              <option value="confirmation">📋 Training Confirmation Advice</option>
              <option value="agreement">📜 Candidate Agreement (3-Page)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Training Center Location
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
              Reporting Date & Time
            </label>
            <input
              type="text"
              value={`${reportingDate} (${reportingTime})`}
              onChange={(e) => {
                const val = e.target.value;
                setReportingDate(val);
              }}
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
        </div>

        {/* Live Preview Area with Exact Paper Dimension and Styling */}
        <div className="flex-1 overflow-y-auto bg-slate-950/80 p-4 sm:p-6 rounded-2xl border border-slate-800/80 flex flex-col items-center">
          <div
            id="printable-letter-container"
            className="letter-page-scope w-full flex flex-col items-center"
          >
            {renderLetterContent(
              letterType,
              student,
              refNo,
              letterDate,
              centerLocation,
              reportingDate,
              reportingTime,
              batchCode
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent to render selected letter
function renderLetterContent(
  letterType: LetterType,
  student: Student,
  refNo: string,
  letterDate: string,
  centerLocation: string,
  reportingDate: string,
  reportingTime: string,
  batchCode: string
) {
  const header = (
    <div>
      <div className="header">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Indian Alliance Services"
            style={{ height: "52px", maxHeight: "52px", width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
        <div className="org-details">
          <strong>INDIAN ALLIANCE SERVICES</strong><br />
          Aviation Training & Career Academy<br />
          Main Office: D.No. 45-8-28/1, 2nd Floor, Dwaraka Nagar,<br />
          Visakhapatnam - 530016, Andhra Pradesh, India<br />
          <span>Ph: +91 8707617134 / +91 9651212713</span><br />
          <span>Email: careers@indianallianceservices.com | www.indianallianceservices.com</span>
        </div>
      </div>
      <div className="header-gold-line"></div>
    </div>
  );

  const footer = (
    <div className="footer">
      <div className="footer-services">
        CABIN CREW &bull; GROUND STAFF &bull; CUSTOMER SERVICES &bull; AIRPORT OPERATIONS &bull; TRAINING & DEVELOPMENT
      </div>
      <div className="footer-tagline">
        INDIAN ALLIANCE SERVICES - BUILDING CAREERS &bull; CONNECTING OPPORTUNITIES
      </div>
    </div>
  );

  if (letterType === "welcome") {
    return (
      <div className="page">
        <img
          className="watermark"
          src="/logo.png"
          alt="watermark"
          style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", width: "440px", maxWidth: "440px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}
        />
        <div>
          {header}
          <div className="ref-date-bar">
            <div><strong>REF NO:</strong> {refNo}</div>
            <div><strong>DATE:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">OFFICIAL TRAINING WELCOME LETTER</div>
            <div className="doc-subtitle">{student.course_name}</div>
          </div>

          <div className="content-body">
            <div className="candidate-box">
              <div className="candidate-col">
                <p><strong>Candidate Name:</strong> {student.student_name}</p>
                <p><strong>Father's Name:</strong> {student.father_name}</p>
              </div>
              <div className="candidate-col" style={{ textAlign: "right" }}>
                <p><strong>Enrollment Batch Code:</strong> {batchCode}</p>
                <p><strong>App Number:</strong> {student.application_number}</p>
              </div>
            </div>

            <p style={{ fontSize: "8.8pt", lineHeight: 1.4 }}>
              Dear <strong>{student.student_name}</strong>,<br />
              We are pleased to inform you that you have been successfully accepted for the{" "}
              <strong>Aviation Induction & Ground Operations Skill Training Program</strong> at{" "}
              <strong>Indian Alliance Services</strong>. We warmly welcome you to our academy. Our comprehensive training 
              curriculum is structured to impart core operational competence, airport customer service skills, and airline industry readiness.
            </p>

            <p style={{ fontSize: "8.8pt", fontWeight: 600, color: "#0f2d59" }}>
              You are required to report for your training orientation and induction as per the schedule below:
            </p>

            <table className="data-table">
              <tbody>
                <tr>
                  <th style={{ width: "32%" }}>Program Title</th>
                  <td><strong>{student.course_name}</strong></td>
                </tr>
                <tr>
                  <th>Reporting Date</th>
                  <td><strong>{reportingDate}</strong> (Reporting Time: {reportingTime})</td>
                </tr>
                <tr>
                  <th>Training Center Location</th>
                  <td><strong>{centerLocation}</strong></td>
                </tr>
                <tr>
                  <th>Program Duration</th>
                  <td>As per prescribed academic curriculum (Detailed batch timetable provided upon arrival)</td>
                </tr>
                <tr>
                  <th>Batch Allocation Code</th>
                  <td><strong>{batchCode}</strong></td>
                </tr>
              </tbody>
            </table>

            <div>
              <div style={{ fontWeight: 700, color: "#0f2d59", fontSize: "8.8pt", marginBottom: "3px" }}>
                MANDATORY DOCUMENTS REQUIRED FOR INDUCTION:
              </div>
              <ol className="list-styled">
                <li>Original Educational Certificates & Marksheets (10th / 12th / Graduation) + 2 sets of self-attested copies.</li>
                <li>Valid Government Identity Proof & Address Proof (Aadhaar Card, Voter ID, or Passport).</li>
                <li>Character Certificate & Medical Fitness Certificate issued by a certified medical practitioner.</li>
                <li>Six (6) recent passport-sized color photographs in formal attire.</li>
                <li>Prior IATA / Airline ticketing certification or relevant internship/experience letters (if any).</li>
              </ol>
            </div>

            <p style={{ fontSize: "8.5pt", color: "#334155" }}>
              Please ensure you report punctually on the designated date in formal professional business attire. Neatly groomed presentation is mandatory for all aviation academy sessions.
            </p>

            <div className="disclaimer-box">
              <strong>OFFICIAL STATUTORY NOTICE & TRAINING DISCLAIMER:</strong>
              Indian Alliance Services is an independent vocational aviation skill development and training academy. This letter is issued exclusively for admission into our skill development training program. Indian Alliance Services does <u>NOT</u> provide direct airline employment, appointment orders, or guaranteed airport job placements. Candidates are trained and evaluated strictly on academic merit, discipline, and practical performance. All aviation recruitments in India are conducted independently by airline operators and ground handlers according to their statutory norms.
            </div>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <p><strong>Candidate Acknowledgment:</strong></p>
              <p style={{ fontSize: "7.8pt", color: "#64748b" }}>I accept the admission and confirm understanding that this is purely a training program.</p>
              <div className="sig-line">
                Candidate Signature: _______________________<br />
                Date: ________________________
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <p style={{ fontSize: "7.8pt", color: "#64748b" }}>Authorized Academic Signatory</p>
              <div className="stamp-sig-container">
                <img
                  className="stamp-img"
                  src="/stamp.png"
                  alt="seal"
                  style={{ position: "absolute", bottom: "-6px", right: "80px", width: "78px", height: "auto" }}
                />
                <img
                  className="sig-img"
                  src="/signature.png"
                  alt="signature"
                  style={{ position: "absolute", bottom: "2px", right: "15px", width: "105px", height: "auto" }}
                />
              </div>
              <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59", marginTop: "2px" }}>
                Training & Operations Department
              </div>
            </div>
          </div>
          {footer}
        </div>
      </div>
    );
  }

  if (letterType === "confirmation") {
    return (
      <div className="page">
        <img
          className="watermark"
          src="/logo.png"
          alt="watermark"
          style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", width: "440px", maxWidth: "440px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}
        />
        <div>
          {header}
          <div className="ref-date-bar">
            <div><strong>REF NO:</strong> {refNo}</div>
            <div><strong>DATE:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">TRAINING ADMISSION & REPORTING CONFIRMATION</div>
            <div className="doc-subtitle">{student.course_name}</div>
          </div>

          <div className="content-body">
            <div className="candidate-box">
              <div className="candidate-col">
                <p><strong>Trainee Name:</strong> {student.student_name}</p>
                <p><strong>Father's Name:</strong> {student.father_name}</p>
              </div>
              <div className="candidate-col" style={{ textAlign: "right" }}>
                <p><strong>Candidate ID:</strong> {student.application_number}</p>
                <p><strong>Training Status:</strong> {student.status}</p>
              </div>
            </div>

            <p style={{ fontSize: "8.8pt", lineHeight: 1.4 }}>
              Dear <strong>{student.student_name}</strong>,<br />
              We are pleased to confirm your admission into the <strong>Aviation Customer Service & Airport Passenger Handling Skill Program</strong>{" "}
              conducted by <strong>Indian Alliance Services</strong>. This curriculum covers essential passenger handling SOPs, 
              terminal customer service, reservation systems, and professional aviation communication.
            </p>

            <table className="data-table">
              <tbody>
                <tr>
                  <th style={{ width: "32%" }}>Training Course</th>
                  <td><strong>{student.course_name}</strong></td>
                </tr>
                <tr>
                  <th>Reporting Training Center</th>
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

            <div className="disclaimer-box">
              <strong>CRITICAL LEGAL ADVISORY & ANTI-FRAUD NOTICE:</strong>
              Indian Alliance Services is an independent aviation career guidance and vocational training academy. <u>THIS DOCUMENT IS STRICTLY AN ADMISSION TO TRAINING AND DOES NOT CONSTITUTE AN EMPLOYMENT CONTRACT, SALARY COMMITMENT, OR GUARANTEED JOB PLACEMENT</u>. Indian Alliance Services is not an airline operator or a government airport authority. We never demand unauthorized cash deposits, gate-pass bribes, or informal UPI transfers. Successful completion of the program entitles the student to a Certificate of Training Completion to assist in independent recruitment applications.
            </div>

            <p style={{ fontSize: "8pt", color: "#475569", fontStyle: "italic" }}>
              <strong>Jurisdiction:</strong> Any legal matter or inquiry concerning this training enrollment shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Visakhapatnam / Mumbai.
            </p>
          </div>
        </div>

        <div>
          <div className="signatures-section">
            <div className="sig-block">
              <p><strong>Trainee Declaration & Acceptance:</strong></p>
              <p style={{ fontSize: "7.8pt", color: "#64748b" }}>I confirm that I have enrolled voluntarily for skills training only.</p>
              <div className="sig-line">
                Candidate Signature: _______________________<br />
                Date: ________________________
              </div>
            </div>
            <div className="sig-block" style={{ textAlign: "right" }}>
              <p><strong>For Indian Alliance Services</strong></p>
              <p style={{ fontSize: "7.8pt", color: "#64748b" }}>Authorized Signatory</p>
              <div className="stamp-sig-container">
                <img
                  className="stamp-img"
                  src="/stamp.png"
                  alt="seal"
                  style={{ position: "absolute", bottom: "-6px", right: "80px", width: "78px", height: "auto" }}
                />
                <img
                  className="sig-img"
                  src="/signature.png"
                  alt="signature"
                  style={{ position: "absolute", bottom: "2px", right: "15px", width: "105px", height: "auto" }}
                />
              </div>
              <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59", marginTop: "2px" }}>
                Registrar of Training & Admissions
              </div>
            </div>
          </div>
          {footer}
        </div>
      </div>
    );
  }

  // 3-Page Agreement
  return (
    <>
      {/* PAGE 1 */}
      <div className="page">
        <img
          className="watermark"
          src="/logo.png"
          alt="watermark"
          style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", width: "440px", maxWidth: "440px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}
        />
        <div>
          {header}
          <div className="ref-date-bar">
            <div><strong>REF NO:</strong> {refNo}</div>
            <div><strong>DATE:</strong> {letterDate}</div>
          </div>

          <div className="doc-title-container">
            <div className="doc-title">STUDENT VOCATIONAL TRAINING AGREEMENT</div>
            <div className="doc-subtitle">Terms of Enrollment, Academic Conduct & Training Undertaking</div>
          </div>

          <div className="content-body">
            <div className="candidate-box">
              <div className="candidate-col">
                <p><strong>Trainee / Candidate:</strong> {student.student_name}</p>
                <p><strong>Father's Name:</strong> {student.father_name}</p>
              </div>
              <div className="candidate-col" style={{ textAlign: "right" }}>
                <p><strong>Candidate Ref:</strong> {student.application_number}</p>
                <p><strong>Training Program:</strong> {student.course_name}</p>
              </div>
            </div>

            <p className="clause-p" style={{ marginTop: "3px" }}>
              This Candidate Vocational Training Agreement (the "Agreement") is entered into by and between{" "}
              <strong>INDIAN ALLIANCE SERVICES</strong> (hereinafter referred to as the <strong>"Institute"</strong>) and{" "}
              <strong>{student.student_name}</strong> (hereinafter referred to as the <strong>"Trainee"</strong>).
            </p>

            <p className="clause-p" style={{ background: "#f1f5f9", padding: "5px 8px", borderRadius: "4px" }}>
              <strong>RECITALS:</strong> Whereas the Institute is an independent academy providing vocational skill coaching, aviation communication grooming, and airport operational training modules; and whereas the Trainee has voluntarily applied for admission to enhance personal knowledge and career skills.
            </p>

            <div className="clause-title">1. Training Program & Center Allocation</div>
            <p className="clause-p">
              The Trainee is enrolled in the <strong>{student.course_name}</strong>. 
              Training will be conducted at the <strong>{centerLocation}</strong>. 
              The scheduled batch orientation commences on <strong>{reportingDate}</strong> for a structured duration of 3 months.
            </p>

            <div className="clause-title">2. Verification of Credentials & Identity</div>
            <p className="clause-p">
              Admission is subject to verification of the Trainee's educational testimonials, proof of age, address, and character certificates. 
              If any document or statement provided is discovered to be fraudulent, misleading, or forged, the Institute reserves the right to immediately terminate the enrollment with forfeiture of fees, without prejudice to legal remedies.
            </p>

            <div className="clause-title">3. Attendance & Academic Progression</div>
            <p className="clause-p">
              Aviation operations require unwavering punctuality. The Trainee must maintain a minimum of <strong>85% attendance</strong> across all theoretical classroom modules, customer service drills, and practical simulations. Unauthorized absence for continuous 5 days may result in batch de-registration.
            </p>

            <div className="clause-title">4. Training Modules & Scope of Curriculum</div>
            <p className="clause-p">
              The curriculum encompasses: (a) Aviation Industry Basics & Airport Terminal Layout; (b) Customer Relationship Management (CRM) & Passenger Assistance; (c) Check-in Procedures & Baggage Tagging Standards; (d) Passenger with Reduced Mobility (PRM) special handling; (e) Aviation Safety, Dangerous Goods Awareness & Emergency Drills; and (f) Executive Grooming & Interview Readiness.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Trainee Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {footer}
          <div className="page-number-text">Page 1 of 3</div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page">
        <img
          className="watermark"
          src="/logo.png"
          alt="watermark"
          style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", width: "440px", maxWidth: "440px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}
        />
        <div>
          {header}
          <div className="ref-date-bar">
            <div><strong>REF NO:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">5. Grooming, Uniform & Discipline Standards</div>
            <p className="clause-p">
              The Trainee shall strictly maintain the professional grooming guidelines established by the Institute, including prescribed business attire, neat appearance, and respectful decorum. No unruly behavior, insubordination, or disturbance in the training facility will be tolerated.
            </p>

            <div className="clause-title">6. Training Fees, Tuition & Facilities</div>
            <p className="clause-p">
              The training fees charged are strictly tuition charges for instruction, coaching materials, and administrative facility overheads. 
              Official GST-compliant receipts will be issued for all payments made through official bank channels. 
              The Institute does NOT demand arbitrary security deposits, gate-pass clearance charges, or unauthorized cash collections.
            </p>

            <div className="disclaimer-box" style={{ margin: "6px 0", padding: "10px" }}>
              <strong style={{ fontSize: "9pt", color: "#b45309", marginBottom: "3px" }}>
                7. STRICT STATUTORY DISCLAIMER - NO EMPLOYMENT OR PLACEMENT GUARANTEE:
              </strong>
              <span style={{ fontSize: "8.5pt", color: "#78350f", lineHeight: 1.4, display: "block" }}>
                (A) <strong>NON-EMPLOYMENT STATUS:</strong> Indian Alliance Services is solely an independent vocational training and career advisory academy. This Agreement is EXCLUSIVELY for skills training and learning. <strong>THIS DOCUMENT DOES NOT CONSTITUTE AN EMPLOYMENT CONTRACT, APPOINTMENT LETTER, SALARY OFFER, OR DIRECT RECRUITMENT ORDER.</strong><br /><br />
                (B) <strong>NO PLACEMENT GUARANTEE:</strong> Indian Alliance Services does NOT guarantee, warrant, or promise employment, jobs, or permanent posting in any airline, airport, or ground handling agency. Successful completion of the course awards a Certificate of Training Completion. Final selection in the aviation sector is the exclusive discretion of hiring employers based on merit, personal interviews, medical fitness, and BCAS security vetting.<br /><br />
                (C) <strong>NO OFFICIAL AIRLINE AFFILIATION:</strong> Indian Alliance Services is not a subsidiary or hiring agent of Jetstar Airways, Air India, IndiGo, or any specific airline. All airline brand marks and codes referenced in training coursework are used solely for educational, pedagogical, and simulation purposes.
              </span>
            </div>

            <div className="clause-title">8. Confidentiality & Academy Course Materials</div>
            <p className="clause-p">
              All course guides, mock tests, simulation software, presentations, and intellectual materials supplied by the Institute remain the exclusive property of Indian Alliance Services. Trainees shall not record, copy, distribute, or commercially exploit any educational content.
            </p>

            <div className="clause-title">9. Medical Fitness & Safety Guidelines</div>
            <p className="clause-p">
              Aviation training involves active standing, simulation drills, and situational exercises. The Trainee affirms that they possess adequate physical fitness and have disclosed any pre-existing medical conditions that might impair participation.
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#64748b", padding: "3px 0", borderTop: "1px solid #e2e8f0" }}>
            <span>Trainee Initials: ____________________</span>
            <span>Authorized Signatory Initials: [IAS Verified]</span>
          </div>
          {footer}
          <div className="page-number-text">Page 2 of 3</div>
        </div>
      </div>

      {/* PAGE 3 */}
      <div className="page">
        <img
          className="watermark"
          src="/logo.png"
          alt="watermark"
          style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", width: "440px", maxWidth: "440px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}
        />
        <div>
          {header}
          <div className="ref-date-bar">
            <div><strong>REF NO:</strong> {refNo}</div>
            <div><strong>STUDENT:</strong> {student.student_name}</div>
          </div>

          <div className="content-body">
            <div className="clause-title">10. Code of Conduct & Academic Integrity</div>
            <p className="clause-p">
              Trainees must exhibit high standards of integrity and moral conduct. Prohibited activities include: (a) harassment or discrimination; (b) damage or vandalism of academy assets; (c) fraudulent claims; (d) unauthorized financial transactions or solicitation of gratuity. Violations will lead to immediate expulsion from the program.
            </p>

            <div className="clause-title">11. Governing Law & Dispute Resolution</div>
            <p className="clause-p">
              This Agreement shall be governed and interpreted in accordance with the laws of the Republic of India. In the event of any dispute or controversy arising out of this training agreement, the parties agree to submit to the exclusive jurisdiction of the competent courts in Visakhapatnam / Mumbai.
            </p>

            <div style={{ background: "#f8fafc", border: "1.5px solid #0f2d59", borderRadius: "5px", padding: "10px 12px", marginTop: "5px" }}>
              <div style={{ fontWeight: 800, color: "#0f2d59", fontSize: "9.5pt", marginBottom: "4px", textTransform: "uppercase" }}>
                12. Trainee Solemn Declaration & Undertaking
              </div>
              <p style={{ fontSize: "8.5pt", color: "#1e293b", lineHeight: 1.4, textAlign: "justify" }}>
                I, <strong>{student.student_name}</strong>, Son/Daughter of <strong>Mr. {student.father_name}</strong>, hereby solemnly declare that:
                <br />1. I have carefully read, reviewed, and understood all twelve (12) clauses of this Vocational Training Agreement.
                <br />2. I acknowledge and confirm that <strong>Indian Alliance Services provides training services only and does NOT provide, promise, or guarantee job placement, salary, or airline appointment</strong>.
                <br />3. I am enrolling voluntarily to acquire vocational skills, and I agree to abide strictly by the rules and code of conduct of the Institute.
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", fontSize: "8.5pt" }}>
                <div style={{ width: "48%" }}>
                  <div style={{ borderTop: "1px solid #475569", paddingTop: "3px" }}>
                    <strong>Signature of Trainee:</strong> _____________________<br />
                    <strong>Name:</strong> {student.student_name}<br />
                    <strong>Date:</strong> ________________________<br />
                    <strong>Place:</strong> {centerLocation.split(" ")[0]}
                  </div>
                </div>
                <div style={{ width: "48%" }}>
                  <div style={{ borderTop: "1px solid #475569", paddingTop: "3px" }}>
                    <strong>Signature of Parent / Guardian:</strong> _____________________<br />
                    <strong>Name:</strong> {student.father_name}<br />
                    <strong>Date:</strong> ________________________<br />
                    <strong>Contact:</strong> {student.mobile_number || "_____________________"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="signatures-section" style={{ marginTop: "4px" }}>
            <div className="sig-block" style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <div style={{ textAlign: "right", width: "50%" }}>
                <p><strong>For Indian Alliance Services</strong></p>
                <p style={{ fontSize: "7.5pt", color: "#64748b" }}>Authorized Signatory - Academic & Operations</p>
                <div className="stamp-sig-container">
                  <img
                    className="stamp-img"
                    src="/stamp.png"
                    alt="seal"
                    style={{ position: "absolute", bottom: "-6px", right: "80px", width: "78px", height: "auto" }}
                  />
                  <img
                    className="sig-img"
                    src="/signature.png"
                    alt="signature"
                    style={{ position: "absolute", bottom: "2px", right: "15px", width: "105px", height: "auto" }}
                  />
                </div>
                <div style={{ fontSize: "8pt", fontWeight: 700, color: "#0f2d59", marginTop: "2px" }}>
                  Executive Director / Registrar
                </div>
              </div>
            </div>
          </div>
          {footer}
          <div className="page-number-text">Page 3 of 3</div>
        </div>
      </div>
    </>
  );
}
