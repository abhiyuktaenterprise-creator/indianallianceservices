# Indian Alliance Services (IAS)

**Official Portal**: [https://indianallianceservices.com](https://indianallianceservices.com)  
**Brand**: Indian Alliance Services (IAS) – Aviation Careers & Training  
**Helpline / WhatsApp**: +91 7851836860  
**Official Email**: support@indianallianceservices.com  

---

## 🛫 Overview

**Indian Alliance Services (IAS)** is a modern, responsive, and SEO-optimized aviation career guidance, training, and placement portal built with React, Vite, TypeScript, and Tailwind CSS.

### Key Features
- **Job Vacancies & Career Paths**: Ground Staff, Customer Service Associate (CSA), Cabin Crew, Airport Cargo, Airport Retail, Lounge Operations, and HR Coordinators.
- **Candidate Recruitment Verification**: Anti-fraud lookup tool verifying candidate registration codes (e.g. `IAS-2026-XXXX`) and recruiter credentials.
- **Dynamic Notifications & Google Sheet Sync**: Live circulars and notices that can sync automatically or on-demand from a Google Sheet with automatic expiration date pruning.
- **Admin Management Console**:
  - Site settings management (Helpline phone numbers, WhatsApp, support email, office hours, notice ticker).
  - Job postings creation & editing (Job code, salary, openings, requirements, responsibilities).
  - Office branch manager (Multi-city branches across Mumbai / Navi Mumbai, Delhi NCR, Madhya Pradesh, Andhra Pradesh, Gujarat).
  - Notification circulars manager with Google Sheet sync integration.
  - Candidate leads CRM with status tracking and CSV export.
  - Interactive direct assessment & contact lead capture.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI + Lucide Icons
- **State & Storage**: React Context + LocalStorage persistent database + TanStack Query
- **SEO & Meta**: React Helmet Async + Schema.org JSON-LD

---

## 🚀 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🔐 Administrative Console

- **Route**: `/admin` (Redirects to `/admin/dashboard` or `/admin/login`)
- **Default Username**: `admin@indianallianceservices.com`
- **Default Password**: `admin123`

---

## 📄 License & Ownership

© 2026 Indian Alliance Services (IAS). All rights reserved.
