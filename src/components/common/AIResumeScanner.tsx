import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIResumeScannerProps {
  onOpenApply?: (role: string) => void;
}

export default function AIResumeScanner({ onOpenApply }: AIResumeScannerProps) {
  const [resumeText, setResumeText] = useState("");
  const [selectedRole, setSelectedRole] = useState("Airport Ground Staff (AGS)");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    score: number;
    foundKeywords: string[];
    missingKeywords: string[];
    aiFeedback: string;
  } | null>(null);

  const roleKeywords: Record<string, string[]> = {
    "Airport Ground Staff (AGS)": [
      "Boarding Gate",
      "Baggage Reconciliation (BRS)",
      "Passenger Handling",
      "DCS (Departure Control System)",
      "Ramp Safety",
      "Terminal Operations",
      "Customer Communication",
    ],
    "Customer Service Associate (CSA)": [
      "Check-in Counter",
      "Ticketing & Reservation",
      "Boarding Announcements",
      "Lounge Assistance",
      "Query Resolution",
      "English Fluency",
      "Complaint Handling",
    ],
    "Cabin Crew / Flight Attendant": [
      "In-flight Safety",
      "First Aid / CPR",
      "Emergency Evacuation",
      "Hospitality & Grooming",
      "Passenger Briefing",
      "Service Etiquette",
      "Crew Resource Management",
    ],
    "Air Cargo Logistics Handler": [
      "Airway Bill (AWB)",
      "Dangerous Goods (DGR)",
      "Palletization",
      "Warehouse Scanning",
      "Customs Manifest",
      "Airside Logistics",
    ],
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const keywords = roleKeywords[selectedRole] || roleKeywords["Airport Ground Staff (AGS)"];
      const lower = resumeText.toLowerCase();

      const found: string[] = [];
      const missing: string[] = [];

      keywords.forEach((kw) => {
        if (lower.includes(kw.toLowerCase()) || lower.includes(kw.split(" ")[0].toLowerCase())) {
          found.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const score = Math.min(96, Math.max(58, Math.round((found.length / keywords.length) * 85 + 15)));

      setScanResult({
        score,
        foundKeywords: found,
        missingKeywords: missing,
        aiFeedback:
          score >= 80
            ? "Strong ATS alignment! Your profile features vital aviation keywords and is well-primed for airline HR screening."
            : "Moderate ATS score. Adding standardized aviation terminology (like DCS, BRS, or IATA standards) will boost your screening shortlist rate.",
      });
    }, 1200);
  };

  return (
    <div className="rounded-3xl bg-card border border-gold/30 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gold/15 text-gold border border-gold/30">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-xl font-heading font-extrabold text-foreground">
              AI Airport Resume <span className="gold-gradient-text">ATS Scanner</span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Scan your resume text against real airline keyword screening filters.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-foreground block mb-1.5">
            Select Target Aviation Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-gold focus:outline-none"
          >
            <option value="Airport Ground Staff (AGS)">Airport Ground Staff (AGS)</option>
            <option value="Customer Service Associate (CSA)">Customer Service Associate (CSA)</option>
            <option value="Cabin Crew / Flight Attendant">Cabin Crew / Flight Attendant</option>
            <option value="Air Cargo Logistics Handler">Air Cargo Logistics Handler</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground block mb-1.5">
            Paste Resume Summary, Skills, or Experience Bullet Points
          </label>
          <textarea
            rows={4}
            required
            placeholder="e.g. 12th pass graduate with strong spoken English, customer handling experience, seeking boarding gate or ground staff opportunities at Delhi / Mumbai airport..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-gold focus:outline-none resize-none"
          />
        </div>

        <Button
          type="submit"
          variant="hero"
          disabled={isScanning || !resumeText.trim()}
          className="w-full font-extrabold"
        >
          {isScanning ? (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin" /> Scanning ATS Keywords...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Run Instant AI Resume Scan
            </span>
          )}
        </Button>
      </form>

      {scanResult && (
        <div className="mt-6 pt-6 border-t border-border space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/60 border border-border">
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase">ATS Match Score</div>
              <div className="text-2xl font-heading font-black text-emerald-600 dark:text-emerald-400">
                {scanResult.score}% Compatibility
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenApply && onOpenApply(selectedRole)}
              className="text-xs font-bold border-gold/40 text-foreground hover:bg-gold hover:text-slate-950"
            >
              Apply With This Profile
            </Button>
          </div>

          <p className="text-xs text-foreground font-medium leading-relaxed">
            {scanResult.aiFeedback}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Matched Keywords ({scanResult.foundKeywords.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {scanResult.foundKeywords.length > 0 ? (
                  scanResult.foundKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-foreground font-mono text-[10px]">
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground text-[11px]">No exact matches yet.</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Suggested Keywords to Add
              </span>
              <div className="flex flex-wrap gap-1">
                {scanResult.missingKeywords.slice(0, 4).map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-amber-500/20 text-foreground font-mono text-[10px]">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
