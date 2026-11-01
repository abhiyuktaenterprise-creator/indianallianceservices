const fs = require('fs');
const path = require('path');
const workspaceDir = '/Users/apple/Documents/Upendra Projects/Ajit/indianallianceservices';
const { chromium } = require(path.join(workspaceDir, 'node_modules/@playwright/test'));

const logoB64 = fs.readFileSync(path.join(workspaceDir, 'public/logo.png')).toString('base64');
const stampB64 = fs.readFileSync('/tmp/pdf_assets/stamp_transparent.png').toString('base64');
const sigB64 = fs.readFileSync('/tmp/pdf_assets/signature_transparent.png').toString('base64');

// Common CSS
const commonCSS = `
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    font-size: 9.5pt;
    line-height: 1.4;
  }
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    padding: 12mm 16mm 10mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    overflow: hidden;
  }
  .watermark {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }
  .header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 2px solid #0f2d59;
  }
  .header-gold-line {
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37);
    margin-top: 2px;
    margin-bottom: 10px;
  }
  .logo-container img {
    height: 52px;
    object-fit: contain;
  }
  .org-details {
    text-align: right;
    font-size: 8pt;
    color: #334155;
    line-height: 1.35;
  }
  .org-details strong {
    color: #0f2d59;
    font-size: 9pt;
    letter-spacing: 0.3px;
  }
  .ref-date-bar {
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
  .doc-title-container {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }
  .doc-title {
    font-size: 13.5pt;
    font-weight: 800;
    color: #0f2d59;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: inline-block;
    border-bottom: 2px solid #d4af37;
    padding-bottom: 2px;
  }
  .doc-subtitle {
    font-size: 8.5pt;
    color: #64748b;
    font-weight: 600;
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .content-body {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 9pt;
    color: #1e293b;
  }
  .candidate-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #0f2d59;
    border-radius: 4px;
    padding: 7px 12px;
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
  }
  .candidate-col p {
    margin: 1.5px 0;
  }
  .candidate-col strong {
    color: #0f2d59;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
    margin: 3px 0 6px 0;
  }
  .data-table th, .data-table td {
    border: 1px solid #cbd5e1;
    padding: 5px 9px;
    text-align: left;
  }
  .data-table th {
    background-color: #0f2d59;
    color: #ffffff;
    font-weight: 600;
    font-size: 8.5pt;
  }
  .data-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  .disclaimer-box {
    background: #fffbeb;
    border: 1.5px solid #f59e0b;
    border-radius: 5px;
    padding: 7px 10px;
    font-size: 8pt;
    color: #92400e;
    line-height: 1.35;
    margin: 4px 0;
  }
  .disclaimer-box strong {
    color: #b45309;
    font-size: 8.5pt;
    display: block;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .signatures-section {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 6px;
    padding-top: 4px;
  }
  .sig-block {
    width: 48%;
    font-size: 8.5pt;
    color: #334155;
  }
  .sig-line {
    border-top: 1px solid #64748b;
    margin-top: 25px;
    padding-top: 3px;
    line-height: 1.4;
  }
  .stamp-sig-container {
    position: relative;
    height: 65px;
    margin-top: 2px;
  }
  .stamp-img {
    position: absolute;
    bottom: -6px;
    right: 80px;
    width: 78px;
    opacity: 0.95;
  }
  .sig-img {
    position: absolute;
    bottom: 2px;
    right: 15px;
    width: 105px;
    opacity: 0.98;
  }
  .footer {
    position: relative;
    z-index: 1;
    padding-top: 6px;
    margin-top: 4px;
    border-top: 2px solid #d4af37;
    text-align: center;
  }
  .footer-services {
    font-size: 7.2pt;
    font-weight: 700;
    color: #0f2d59;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  .footer-tagline {
    font-size: 7.5pt;
    font-weight: 800;
    color: #d4af37;
    letter-spacing: 0.8px;
  }
  .list-styled {
    padding-left: 16px;
    font-size: 8.5pt;
    line-height: 1.38;
  }
  .list-styled li {
    margin-bottom: 2px;
  }
  .clause-title {
    font-weight: 700;
    color: #0f2d59;
    font-size: 9pt;
    margin-top: 5px;
    margin-bottom: 2px;
  }
  .clause-p {
    font-size: 8.5pt;
    color: #334155;
    text-align: justify;
    line-height: 1.38;
    margin-bottom: 5px;
  }
`;

// Build Header HTML
function getHeaderHTML() {
  return `
    <div class="header">
      <div class="logo-container">
        <img src="data:image/png;base64,${logoB64}" alt="Indian Alliance Services" />
      </div>
      <div class="org-details">
        <strong>INDIAN ALLIANCE SERVICES</strong><br />
        Aviation Training & Career Academy<br />
        Main Office: D.No. 45-8-28/1, 2nd Floor, Dwaraka Nagar,<br />
        Visakhapatnam - 530016, Andhra Pradesh, India<br />
        <span>Ph: +91 8707617134 / +91 9651212713</span><br />
        <span>Email: careers@indianallianceservices.com | www.indianallianceservices.com</span>
      </div>
    </div>
    <div class="header-gold-line"></div>
  `;
}

// Build Footer HTML
function getFooterHTML() {
  return `
    <div class="footer">
      <div class="footer-services">
        CABIN CREW &bull; GROUND STAFF &bull; CUSTOMER SERVICES &bull; AIRPORT OPERATIONS &bull; TRAINING & DEVELOPMENT
      </div>
      <div class="footer-tagline">
        INDIAN ALLIANCE SERVICES - BUILDING CAREERS &bull; CONNECTING OPPORTUNITIES
      </div>
    </div>
  `;
}

// DOCUMENT 1: Khushbu Ashok Mahto
function generateDoc1HTML() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Training Welcome Letter - Khushbu Ashok Mahto</title>
    <style>${commonCSS}</style>
  </head>
  <body>
    <div class="page">
      <img class="watermark" src="data:image/png;base64,${logoB64}" />
      <div>
        ${getHeaderHTML()}
        <div class="ref-date-bar">
          <div><strong>REF NO:</strong> IAS/TRG/ADM/2026/134803</div>
          <div><strong>DATE:</strong> 26-Nov-2026</div>
        </div>

        <div class="doc-title-container">
          <div class="doc-title">OFFICIAL TRAINING WELCOME LETTER</div>
          <div class="doc-subtitle">Aviation Ground Operations & Passenger Services Training Program</div>
        </div>

        <div class="content-body">
          <div class="candidate-box">
            <div class="candidate-col">
              <p><strong>Candidate Name:</strong> Ms. Khushbu Ashok Mahto</p>
              <p><strong>Father's Name:</strong> Mr. Ashok Mahto</p>
            </div>
            <div class="candidate-col" style="text-align: right;">
              <p><strong>Enrollment Batch Code:</strong> IAS-TRG-134803</p>
              <p><strong>Program Level:</strong> Professional Certification</p>
            </div>
          </div>

          <p style="font-size: 8.8pt; line-height: 1.4;">
            Dear <strong>Ms. Khushbu Ashok Mahto</strong>,<br />
            We are pleased to inform you that you have been successfully accepted for the 
            <strong>Aviation Induction & Ground Operations Skill Training Program</strong> at 
            <strong>Indian Alliance Services</strong>. We warmly welcome you to our academy. Our comprehensive training 
            curriculum is structured to impart core operational competence, airport customer service skills, and airline industry readiness.
          </p>

          <p style="font-size: 8.8pt; font-weight: 600; color: #0f2d59;">
            You are required to report for your training orientation and induction as per the schedule below:
          </p>

          <table class="data-table">
            <tr>
              <th style="width: 32%;">Program Title</th>
              <td><strong>Aviation Induction & Ground Operations Skill Training</strong></td>
            </tr>
            <tr>
              <th>Reporting Date</th>
              <td><strong>29-Nov-2026</strong> (Reporting Time: 09:30 AM IST)</td>
            </tr>
            <tr>
              <th>Training Center Location</th>
              <td><strong>Nagpur Regional Training Center</strong> (Airport Zone, IATA: NAG)</td>
            </tr>
            <tr>
              <th>Program Duration</th>
              <td>As per prescribed academic curriculum (Detailed batch timetable provided upon arrival)</td>
            </tr>
            <tr>
              <th>Batch Allocation Code</th>
              <td><strong>IAS-TRG-134803</strong></td>
            </tr>
          </table>

          <div>
            <div style="font-weight: 700; color: #0f2d59; font-size: 8.8pt; margin-bottom: 3px;">
              MANDATORY DOCUMENTS REQUIRED FOR INDUCTION:
            </div>
            <ol class="list-styled">
              <li>Original Educational Certificates & Marksheets (10th / 12th / Graduation) + 2 sets of self-attested copies.</li>
              <li>Valid Government Identity Proof & Address Proof (Aadhaar Card, Voter ID, or Passport).</li>
              <li>Character Certificate & Medical Fitness Certificate issued by a certified medical practitioner.</li>
              <li>Six (6) recent passport-sized color photographs in formal attire.</li>
              <li>Prior IATA / Airline ticketing certification or relevant internship/experience letters (if any).</li>
            </ol>
          </div>

          <p style="font-size: 8.5pt; color: #334155;">
            Please ensure you report punctually on the designated date in formal professional business attire. Neatly groomed presentation is mandatory for all aviation academy sessions.
          </p>

          <div class="disclaimer-box">
            <strong>OFFICIAL STATUTORY NOTICE & TRAINING DISCLAIMER:</strong>
            Indian Alliance Services is an independent vocational aviation skill development and training academy. This letter is issued exclusively for admission into our skill development training program. Indian Alliance Services does <u>NOT</u> provide direct airline employment, appointment orders, or guaranteed airport job placements. Candidates are trained and evaluated strictly on academic merit, discipline, and practical performance. All aviation recruitments in India are conducted independently by airline operators and ground handlers according to their statutory norms.
          </div>
        </div>
      </div>

      <div>
        <div class="signatures-section">
          <div class="sig-block">
            <p><strong>Candidate Acknowledgment:</strong></p>
            <p style="font-size: 7.8pt; color: #64748b;">I accept the admission and confirm understanding that this is purely a training program.</p>
            <div class="sig-line">
              Candidate Signature: _______________________<br />
              Date: ________________________
            </div>
          </div>
          <div class="sig-block" style="text-align: right;">
            <p><strong>For Indian Alliance Services</strong></p>
            <p style="font-size: 7.8pt; color: #64748b;">Authorized Academic Signatory</p>
            <div class="stamp-sig-container">
              <img class="stamp-img" src="data:image/png;base64,${stampB64}" />
              <img class="sig-img" src="data:image/png;base64,${sigB64}" />
            </div>
            <div style="font-size: 8pt; font-weight: 700; color: #0f2d59; margin-top: 2px;">
              Training & Operations Department
            </div>
          </div>
        </div>
        ${getFooterHTML()}
      </div>
    </div>
  </body>
  </html>
  `;
}

// DOCUMENT 2: Alraza Khan
function generateDoc2HTML() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Training Confirmation & Batch Advice - Alraza Khan</title>
    <style>${commonCSS}</style>
  </head>
  <body>
    <div class="page">
      <img class="watermark" src="data:image/png;base64,${logoB64}" />
      <div>
        ${getHeaderHTML()}
        <div class="ref-date-bar">
          <div><strong>REF NO:</strong> IAS/TRG/CONF/2026/134557</div>
          <div><strong>DATE:</strong> 26-Oct-2026</div>
        </div>

        <div class="doc-title-container">
          <div class="doc-title">TRAINING ADMISSION & REPORTING CONFIRMATION</div>
          <div class="doc-subtitle">Aviation Customer Service & Passenger Handling Program</div>
        </div>

        <div class="content-body">
          <div class="candidate-box">
            <div class="candidate-col">
              <p><strong>Trainee Name:</strong> Mr. Alraza Khan</p>
              <p><strong>Father's Name:</strong> Mr. Samsuddin Khan</p>
            </div>
            <div class="candidate-col" style="text-align: right;">
              <p><strong>Candidate ID:</strong> IAS-APP-2026/134557</p>
              <p><strong>Training Grade:</strong> G1 (Foundation)</p>
            </div>
          </div>

          <p style="font-size: 8.8pt; line-height: 1.4;">
            Dear <strong>Mr. Alraza Khan</strong>,<br />
            We are pleased to confirm your admission into the <strong>Aviation Customer Service Assistant (CSA) Skill Development Program</strong> 
            conducted by <strong>Indian Alliance Services</strong>. This curriculum covers essential passenger handling SOPs, 
            terminal customer service, reservation systems, and professional aviation communication.
          </p>

          <table class="data-table">
            <tr>
              <th style="width: 32%;">Training Course</th>
              <td><strong>Aviation Customer Service & Airport Operations (Grade G1)</strong></td>
            </tr>
            <tr>
              <th>Reporting Training Center</th>
              <td>
                <strong>Bhubaneswar Regional Training Center</strong><br />
                <span style="font-size: 8pt; color: #475569;">Biju Patnaik International Airport Road vicinity, Bhubaneswar, Odisha - 751020</span>
              </td>
            </tr>
            <tr>
              <th>Reporting & Induction Date</th>
              <td><strong>27-Nov-2026</strong> (Reporting Time: 10:00 AM – 04:30 PM)</td>
            </tr>
            <tr>
              <th>Curriculum Focus</th>
              <td>Passenger Service SOPs, Airline Check-in, Boarding Gate Protocol, Soft Skills & Interview Drills</td>
            </tr>
          </table>

          <div>
            <div style="font-weight: 700; color: #0f2d59; font-size: 8.8pt; margin-bottom: 3px;">
              TRAINING RULES & ACADEMY PROTOCOLS:
            </div>
            <ul class="list-styled">
              <li><strong>Attendance Requirement:</strong> Trainees must maintain a minimum of 85% attendance to qualify for course assessments and certification.</li>
              <li><strong>Grooming & Attire:</strong> Professional business formal attire is mandatory during all training sessions. Candidates must adhere to airline industry grooming standards.</li>
              <li><strong>Documentation:</strong> Candidate must submit self-attested copies of educational marksheets, Aadhaar card, and 4 passport-size photographs on the reporting date.</li>
              <li><strong>Verification:</strong> All student credentials and registration status can be verified 24/7 on our official registry at <em>indianallianceservices.com</em>.</li>
            </ul>
          </div>

          <div class="disclaimer-box">
            <strong>CRITICAL LEGAL ADVISORY & ANTI-FRAUD NOTICE:</strong>
            Indian Alliance Services is an independent aviation career guidance and vocational training academy. <u>THIS DOCUMENT IS STRICTLY AN ADMISSION TO TRAINING AND DOES NOT CONSTITUTE AN EMPLOYMENT CONTRACT, SALARY COMMITMENT, OR GUARANTEED JOB PLACEMENT</u>. Indian Alliance Services is not an airline operator or a government airport authority. We never demand unauthorized cash deposits, gate-pass bribes, or informal UPI transfers. Successful completion of the program entitles the student to a Certificate of Training Completion to assist in independent recruitment applications.
          </div>

          <p style="font-size: 8pt; color: #475569; font-style: italic;">
            <strong>Jurisdiction:</strong> Any legal matter or inquiry concerning this training enrollment shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Visakhapatnam / Mumbai.
          </p>
        </div>
      </div>

      <div>
        <div class="signatures-section">
          <div class="sig-block">
            <p><strong>Trainee Declaration & Acceptance:</strong></p>
            <p style="font-size: 7.8pt; color: #64748b;">I confirm that I have enrolled voluntarily for skills training only.</p>
            <div class="sig-line">
              Candidate Signature: _______________________<br />
              Date: ________________________
            </div>
          </div>
          <div class="sig-block" style="text-align: right;">
            <p><strong>For Indian Alliance Services</strong></p>
            <p style="font-size: 7.8pt; color: #64748b;">Authorized Signatory</p>
            <div class="stamp-sig-container">
              <img class="stamp-img" src="data:image/png;base64,${stampB64}" />
              <img class="sig-img" src="data:image/png;base64,${sigB64}" />
            </div>
            <div style="font-size: 8pt; font-weight: 700; color: #0f2d59; margin-top: 2px;">
              Registrar of Training & Admissions
            </div>
          </div>
        </div>
        ${getFooterHTML()}
      </div>
    </div>
  </body>
  </html>
  `;
}

// DOCUMENT 3: Kiran Ishwar Kurhe (Comprehensive 3-Page Training Agreement)
function generateDoc3HTML() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Student Training Agreement - Kiran Ishwar Kurhe</title>
    <style>
      ${commonCSS}
      .page-footer-block {
        position: relative;
        z-index: 1;
      }
      .page-number-text {
        font-size: 7.5pt;
        color: #94a3b8;
        text-align: right;
        margin-top: 2px;
      }
    </style>
  </head>
  <body>

    <!-- PAGE 1 OF 3 -->
    <div class="page">
      <img class="watermark" src="data:image/png;base64,${logoB64}" />
      <div>
        ${getHeaderHTML()}
        <div class="ref-date-bar">
          <div><strong>REF NO:</strong> IAS/TRG/AGR/2026/139960</div>
          <div><strong>DATE:</strong> 26-Oct-2026</div>
        </div>

        <div class="doc-title-container">
          <div class="doc-title">STUDENT VOCATIONAL TRAINING AGREEMENT</div>
          <div class="doc-subtitle">Terms of Enrollment, Academic Conduct & Training Undertaking</div>
        </div>

        <div class="content-body">
          <div class="candidate-box">
            <div class="candidate-col">
              <p><strong>Trainee / Student:</strong> Mr. Kiran Ishwar Kurhe</p>
              <p><strong>Father's Name:</strong> Mr. Ishwar Kurhe</p>
            </div>
            <div class="candidate-col" style="text-align: right;">
              <p><strong>Student Ref:</strong> IAS-APP-2026/139960</p>
              <p><strong>Training Program:</strong> Ground Staff & Passenger Handling</p>
            </div>
          </div>

          <p class="clause-p" style="margin-top: 3px;">
            This Student Vocational Training Agreement (the "Agreement") is entered into by and between 
            <strong>INDIAN ALLIANCE SERVICES</strong> (hereinafter referred to as the <strong>"Institute"</strong>) and 
            <strong>Mr. Kiran Ishwar Kurhe</strong> (hereinafter referred to as the <strong>"Trainee"</strong>).
          </p>

          <p class="clause-p" style="background: #f1f5f9; padding: 5px 8px; border-radius: 4px;">
            <strong>RECITALS:</strong> Whereas the Institute is an independent academy providing vocational skill coaching, aviation communication grooming, and airport operational training modules; and whereas the Trainee has voluntarily applied for admission to enhance personal knowledge and career skills.
          </p>

          <div class="clause-title">1. Training Program & Center Allocation</div>
          <p class="clause-p">
            The Trainee is enrolled in the <strong>Aviation Ground Operations & Passenger Handling Skill Program</strong>. 
            Training will be conducted at the <strong>Pune Regional Training Facility</strong> (Jagadguru Sant Tukaram Maharaj Pune International Airport Area / Lohegaon, Pune, Maharashtra - 411032). 
            The scheduled batch orientation commences on <strong>29-Nov-2026</strong> for a structured duration of 3 months.
          </p>

          <div class="clause-title">2. Verification of Credentials & Identity</div>
          <p class="clause-p">
            Admission is subject to verification of the Trainee's educational testimonials, proof of age, address, and character certificates. 
            If any document or statement provided is discovered to be fraudulent, misleading, or forged, the Institute reserves the right to immediately terminate the enrollment with forfeiture of fees, without prejudice to legal remedies.
          </p>

          <div class="clause-title">3. Attendance & Academic Progression</div>
          <p class="clause-p">
            Aviation operations require unwavering punctuality. The Trainee must maintain a minimum of <strong>85% attendance</strong> across all theoretical classroom modules, customer service drills, and practical simulations. Unauthorized absence for continuous 5 days may result in batch de-registration.
          </p>

          <div class="clause-title">4. Training Modules & Scope of Curriculum</div>
          <p class="clause-p">
            The curriculum encompasses: (a) Aviation Industry Basics & Airport Terminal Layout; (b) Customer Relationship Management (CRM) & Passenger Assistance; (c) Check-in Procedures & Baggage Tagging Standards; (d) Passenger with Reduced Mobility (PRM) special handling; (e) Aviation Safety, Dangerous Goods Awareness & Emergency Drills; and (f) Executive Grooming & Interview Readiness.
          </p>
        </div>
      </div>

      <div class="page-footer-block">
        <div style="display: flex; justify-content: space-between; font-size: 8pt; color: #64748b; padding: 3px 0; border-top: 1px solid #e2e8f0;">
          <span>Trainee Initials: ____________________</span>
          <span>Authorized Signatory Initials: [IAS Verified]</span>
        </div>
        ${getFooterHTML()}
        <div class="page-number-text">Page 1 of 3</div>
      </div>
    </div>

    <!-- PAGE 2 OF 3 -->
    <div class="page">
      <img class="watermark" src="data:image/png;base64,${logoB64}" />
      <div>
        ${getHeaderHTML()}
        <div class="ref-date-bar">
          <div><strong>REF NO:</strong> IAS/TRG/AGR/2026/139960</div>
          <div><strong>STUDENT:</strong> Kiran Ishwar Kurhe</div>
        </div>

        <div class="content-body">
          <div class="clause-title">5. Grooming, Uniform & Discipline Standards</div>
          <p class="clause-p">
            The Trainee shall strictly maintain the professional grooming guidelines established by the Institute, including prescribed business attire, neat appearance, and respectful decorum. No unruly behavior, insubordination, or disturbance in the training facility will be tolerated.
          </p>

          <div class="clause-title">6. Training Fees, Tuition & Facilities</div>
          <p class="clause-p">
            The training fees charged are strictly tuition charges for instruction, coaching materials, and administrative facility overheads. 
            Official GST-compliant receipts will be issued for all payments made through official bank channels. 
            The Institute does NOT demand arbitrary security deposits, gate-pass clearance charges, or unauthorized cash collections.
          </p>

          <div class="disclaimer-box" style="margin: 6px 0; padding: 10px;">
            <strong style="font-size: 9pt; color: #b45309; margin-bottom: 3px;">
              7. STRICT STATUTORY DISCLAIMER - NO EMPLOYMENT OR PLACEMENT GUARANTEE:
            </strong>
            <span style="font-size: 8.5pt; color: #78350f; line-height: 1.4; display: block;">
              (A) <strong>NON-EMPLOYMENT STATUS:</strong> Indian Alliance Services is solely an independent vocational training and career advisory academy. This Agreement is EXCLUSIVELY for skills training and learning. <strong>THIS DOCUMENT DOES NOT CONSTITUTE AN EMPLOYMENT CONTRACT, APPOINTMENT LETTER, SALARY OFFER, OR DIRECT RECRUITMENT ORDER.</strong><br /><br />
              (B) <strong>NO PLACEMENT GUARANTEE:</strong> Indian Alliance Services does NOT guarantee, warrant, or promise employment, jobs, or permanent posting in any airline, airport, or ground handling agency. Successful completion of the course awards a Certificate of Training Completion. Final selection in the aviation sector is the exclusive discretion of hiring employers based on merit, personal interviews, medical fitness, and BCAS security vetting.<br /><br />
              (C) <strong>NO OFFICIAL AIRLINE AFFILIATION:</strong> Indian Alliance Services is not a subsidiary or hiring agent of Jetstar Airways, Air India, IndiGo, or any specific airline. All airline brand marks and codes referenced in training coursework are used solely for educational, pedagogical, and simulation purposes.
            </span>
          </div>

          <div class="clause-title">8. Confidentiality & Academy Course Materials</div>
          <p class="clause-p">
            All course guides, mock tests, simulation software, presentations, and intellectual materials supplied by the Institute remain the exclusive property of Indian Alliance Services. Trainees shall not record, copy, distribute, or commercially exploit any educational content.
          </p>

          <div class="clause-title">9. Medical Fitness & Safety Guidelines</div>
          <p class="clause-p">
            Aviation training involves active standing, simulation drills, and situational exercises. The Trainee affirms that they possess adequate physical fitness and have disclosed any pre-existing medical conditions that might impair participation.
          </p>
        </div>
      </div>

      <div class="page-footer-block">
        <div style="display: flex; justify-content: space-between; font-size: 8pt; color: #64748b; padding: 3px 0; border-top: 1px solid #e2e8f0;">
          <span>Trainee Initials: ____________________</span>
          <span>Authorized Signatory Initials: [IAS Verified]</span>
        </div>
        ${getFooterHTML()}
        <div class="page-number-text">Page 2 of 3</div>
      </div>
    </div>

    <!-- PAGE 3 OF 3 -->
    <div class="page">
      <img class="watermark" src="data:image/png;base64,${logoB64}" />
      <div>
        ${getHeaderHTML()}
        <div class="ref-date-bar">
          <div><strong>REF NO:</strong> IAS/TRG/AGR/2026/139960</div>
          <div><strong>STUDENT:</strong> Kiran Ishwar Kurhe</div>
        </div>

        <div class="content-body">
          <div class="clause-title">10. Code of Conduct & Academic Integrity</div>
          <p class="clause-p">
            Trainees must exhibit high standards of integrity and moral conduct. Prohibited activities include: (a) harassment or discrimination; (b) damage or vandalism of academy assets; (c) fraudulent claims; (d) unauthorized financial transactions or solicitation of gratuity. Violations will lead to immediate expulsion from the program.
          </p>

          <div class="clause-title">11. Governing Law & Dispute Resolution</div>
          <p class="clause-p">
            This Agreement shall be governed and interpreted in accordance with the laws of the Republic of India. In the event of any dispute or controversy arising out of this training agreement, the parties agree to submit to the exclusive jurisdiction of the competent courts in Visakhapatnam / Mumbai.
          </p>

          <div style="background: #f8fafc; border: 1.5px solid #0f2d59; border-radius: 5px; padding: 10px 12px; margin-top: 5px;">
            <div style="font-weight: 800; color: #0f2d59; font-size: 9.5pt; margin-bottom: 4px; text-transform: uppercase;">
              12. Trainee Solemn Declaration & Undertaking
            </div>
            <p style="font-size: 8.5pt; color: #1e293b; line-height: 1.4; text-align: justify;">
              I, <strong>Kiran Ishwar Kurhe</strong>, Son of <strong>Mr. Ishwar Kurhe</strong>, hereby solemnly declare that:
              <br />1. I have carefully read, reviewed, and understood all twelve (12) clauses of this Vocational Training Agreement.
              <br />2. I acknowledge and confirm that <strong>Indian Alliance Services provides training services only and does NOT provide, promise, or guarantee job placement, salary, or airline appointment</strong>.
              <br />3. I am enrolling voluntarily to acquire vocational skills, and I agree to abide strictly by the rules and code of conduct of the Institute.
            </p>

            <div style="display: flex; justify-content: space-between; margin-top: 14px; font-size: 8.5pt;">
              <div style="width: 48%;">
                <div style="border-top: 1px solid #475569; padding-top: 3px;">
                  <strong>Signature of Trainee:</strong> _____________________<br />
                  <strong>Name:</strong> Kiran Ishwar Kurhe<br />
                  <strong>Date:</strong> ________________________<br />
                  <strong>Place:</strong> Pune, Maharashtra
                </div>
              </div>
              <div style="width: 48%;">
                <div style="border-top: 1px solid #475569; padding-top: 3px;">
                  <strong>Signature of Parent / Guardian:</strong> _____________________<br />
                  <strong>Name:</strong> Ishwar Kurhe<br />
                  <strong>Date:</strong> ________________________<br />
                  <strong>Contact:</strong> _____________________
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer-block">
        <div class="signatures-section" style="margin-top: 4px;">
          <div class="sig-block" style="width: 100%; display: flex; justify-content: flex-end;">
            <div style="text-align: right; width: 50%;">
              <p><strong>For Indian Alliance Services</strong></p>
              <p style="font-size: 7.5pt; color: #64748b;">Authorized Signatory - Academic & Operations</p>
              <div class="stamp-sig-container">
                <img class="stamp-img" src="data:image/png;base64,${stampB64}" />
                <img class="sig-img" src="data:image/png;base64,${sigB64}" />
              </div>
              <div style="font-size: 8pt; font-weight: 700; color: #0f2d59; margin-top: 2px;">
                Executive Director / Registrar
              </div>
            </div>
          </div>
        </div>
        ${getFooterHTML()}
        <div class="page-number-text">Page 3 of 3</div>
      </div>
    </div>

  </body>
  </html>
  `;
}

// Generate files and convert to PDF
async function run() {
  console.log('Generating HTML files...');
  const outDir = '/tmp/ias_docs';
  fs.mkdirSync(outDir, { recursive: true });

  const doc1Path = path.join(outDir, 'doc1_khushbu.html');
  const doc2Path = path.join(outDir, 'doc2_alraza.html');
  const doc3Path = path.join(outDir, 'doc3_kiran.html');

  fs.writeFileSync(doc1Path, generateDoc1HTML());
  fs.writeFileSync(doc2Path, generateDoc2HTML());
  fs.writeFileSync(doc3Path, generateDoc3HTML());

  console.log('HTML files created. Launching browser to print PDFs...');
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const pdfDesktopDir = '/Users/apple/Desktop';

  // Render Doc 1
  console.log('Rendering Doc 1 (Khushbu)...');
  const page1 = await browser.newPage();
  await page1.goto('file://' + doc1Path, { waitUntil: 'load' });
  const pdf1 = path.join(pdfDesktopDir, 'Khushbu Ashok Mahto - Training Welcome Letter (Corrected).pdf');
  await page1.pdf({
    path: pdf1,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await page1.close();
  console.log('Saved:', pdf1);

  // Render Doc 2
  console.log('Rendering Doc 2 (Alraza)...');
  const page2 = await browser.newPage();
  await page2.goto('file://' + doc2Path, { waitUntil: 'load' });
  const pdf2 = path.join(pdfDesktopDir, 'Alraza Khan - Training Confirmation Letter (Corrected).pdf');
  await page2.pdf({
    path: pdf2,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await page2.close();
  console.log('Saved:', pdf2);

  // Render Doc 3
  console.log('Rendering Doc 3 (Kiran)...');
  const page3 = await browser.newPage();
  await page3.goto('file://' + doc3Path, { waitUntil: 'load' });
  const pdf3 = path.join(pdfDesktopDir, 'Kiran Ishwar Kurhe - Student Training Agreement (Corrected).pdf');
  await page3.pdf({
    path: pdf3,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await page3.close();
  console.log('Saved:', pdf3);

  await browser.close();
  console.log('ALL PDFS GENERATED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
