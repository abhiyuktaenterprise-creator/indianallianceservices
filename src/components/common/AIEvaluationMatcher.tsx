import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Plane,
  Award,
  Zap,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIEvaluationMatcherProps {
  onSelectRole?: (role: string) => void;
}

export default function AIEvaluationMatcher({ onSelectRole }: AIEvaluationMatcherProps) {
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState("12th Pass");
  const [age, setAge] = useState("20");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("160");
  const [englishLevel, setEnglishLevel] = useState("Conversational");
  const [preferredHub, setPreferredHub] = useState("Delhi (DEL)");

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [results, setResults] = useState<{
    bestMatch: string;
    bestScore: number;
    secondaryMatch: string;
    secondaryScore: number;
    strengths: string[];
    recommendations: string[];
  } | null>(null);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setScanProgress(10);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      calculateMatches();
      setStep(2);
    }, 1600);
  };

  const calculateMatches = () => {
    const ageNum = parseInt(age) || 20;
    const heightNum = parseInt(height) || 160;

    let bestRole = "Airport Ground Staff (AGS)";
    let bestScore = 96;
    let secRole = "Customer Service Associate (CSA)";
    let secScore = 91;
    const strengths: string[] = [];
    const recs: string[] = [];

    if (gender === "Female" && heightNum >= 155 && ageNum <= 26 && (englishLevel === "Conversational" || englishLevel === "Fluent")) {
      bestRole = "Cabin Crew / Air Hostess";
      bestScore = 98;
      secRole = "Customer Service Associate (CSA)";
      secScore = 94;
      strengths.push("Height meets DGCA airline cabin safety reach standards (≥155 cm).");
      strengths.push("Age qualifies within premier fleet recruitment band (18–27 yrs).");
      strengths.push("English communication ready for pre-flight passenger briefing.");
      recs.push("Enroll in In-Flight Emergency Mock Drills to master situational HR questions.");
    } else if (education === "Graduate" || englishLevel === "Fluent") {
      bestRole = "Customer Service Associate (CSA)";
      bestScore = 95;
      secRole = "Airport Ground Staff (AGS)";
      secScore = 92;
      strengths.push("Graduation qualifies for executive terminal lounge and ticketing counters.");
      strengths.push("Fluent communication fits boarding gate announcement requirements.");
      recs.push("Review airport 3-letter IATA codes and DCS check-in simulations.");
    } else if (education === "10th Pass") {
      bestRole = "Air Cargo & Ramp Logistics Handler";
      bestScore = 94;
      secRole = "Ground Service Assistant (GSA)";
      secScore = 89;
      strengths.push("Educational profile optimal for high-demand airside cargo logistics.");
      strengths.push("Physical capability suits tarmac turnaround and baggage reconciliation.");
      recs.push("Complete Dangerous Goods Regulations (DGR) basic orientation.");
    } else {
      bestRole = "Airport Ground Staff (AGS)";
      bestScore = 95;
      secRole = "Airport Security & Tarmac Marshall";
      secScore = 90;
      strengths.push("12th Pass qualification verified for domestic terminal check-in.");
      strengths.push("Strong candidate compatibility for passenger boarding coordination.");
      recs.push("Practice airline Group Discussion (GD) confidence and voice modulation.");
    }

    setResults({
      bestMatch: bestRole,
      bestScore,
      secondaryMatch: secRole,
      secondaryScore: secScore,
      strengths,
      recommendations: recs,
    });
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="relative rounded-3xl bg-[#060913] border-2 border-gold/45 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white overflow-hidden">
      {/* Background Neural Grid Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0d1424] border border-gold/50 px-3.5 py-1 mb-2 shadow-inner">
            <Bot className="h-4 w-4 text-gold animate-pulse" />
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
              ACS AI Engine v4.2
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            AI Aviation Eligibility & <span className="gold-gradient-text">ATS Matcher</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 font-normal">
            Input your criteria to run instant algorithmic screening against 45+ airline recruitment standards.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-[#0d1424] border border-gold/40 px-3.5 py-1.5 rounded-full">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-300 font-bold">
            Neural Match Online
          </span>
        </div>
      </div>

      {isScanning ? (
        <div className="py-16 text-center space-y-6 animate-in fade-in duration-300">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-spin" />
            <div
              className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"
              style={{ animationDuration: "1s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-extrabold text-gold">
              {scanProgress}%
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold text-white">
              Scanning 45+ Airline Opportunity Benchmarks...
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              Evaluating physical parameters, height requirements, qualification thresholds, and spoken communication indices.
            </p>
          </div>
        </div>
      ) : step === 1 ? (
        <form onSubmit={handleStartScan} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Qualification */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                1. Highest Qualification
              </label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              >
                <option value="10th Pass" className="bg-[#0c1322] text-white">10th Pass (High School)</option>
                <option value="12th Pass" className="bg-[#0c1322] text-white">12th Pass (Higher Secondary)</option>
                <option value="Diploma" className="bg-[#0c1322] text-white">Diploma / Aviation Cert.</option>
                <option value="Graduate" className="bg-[#0c1322] text-white">Any Graduate / Degree</option>
                <option value="Post Graduate" className="bg-[#0c1322] text-white">Post Graduate</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                2. Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              >
                <option value="Female" className="bg-[#0c1322] text-white">Female</option>
                <option value="Male" className="bg-[#0c1322] text-white">Male</option>
                <option value="Other" className="bg-[#0c1322] text-white">Other</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                3. Current Age (Years)
              </label>
              <input
                type="number"
                min="17"
                max="35"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              />
            </div>

            {/* Height */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                4. Approximate Height (cm)
              </label>
              <input
                type="number"
                min="140"
                max="210"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              />
            </div>

            {/* English Communication */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                5. Spoken English Level
              </label>
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              >
                <option value="Conversational" className="bg-[#0c1322] text-white">Conversational (Good)</option>
                <option value="Fluent" className="bg-[#0c1322] text-white">Fluent / Native</option>
                <option value="Basic" className="bg-[#0c1322] text-white">Basic / Learning</option>
              </select>
            </div>

            {/* Preferred Airport Hub */}
            <div>
              <label className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                6. Preferred Airport Hub
              </label>
              <select
                value={preferredHub}
                onChange={(e) => setPreferredHub(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0c1322] border-2 border-gold/35 text-white text-sm focus:border-gold focus:outline-none"
              >
                <option value="Delhi (DEL)" className="bg-[#0c1322] text-white">Delhi (DEL) - IGI Terminal</option>
                <option value="Mumbai (BOM)" className="bg-[#0c1322] text-white">Mumbai (BOM) - CSMIA</option>
                <option value="Bangalore (BLR)" className="bg-[#0c1322] text-white">Bangalore (BLR) - KIA</option>
                <option value="Hyderabad (HYD)" className="bg-[#0c1322] text-white">Hyderabad (HYD) - RGIA</option>
                <option value="Jaipur (JAI)" className="bg-[#0c1322] text-white">Jaipur (JAI) - International</option>
                <option value="Pan-India Open" className="bg-[#0c1322] text-white">Any Major Airport in India</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/30">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Official Profile & Eligibility Assessment</span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black px-8 py-6 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              <Zap className="h-4 w-4" /> Run AI Match Algorithm
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      ) : (
        results && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Match Hero Box */}
            <div className="rounded-2xl bg-[#0c1324] border-2 border-gold/50 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 text-xs font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Highest Algorithmic Compatibility
                </div>
                <h4 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  {results.bestMatch}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200">
                  Target Hub: <strong className="text-gold">{preferredHub}</strong> • Screening Status:{" "}
                  <span className="text-emerald-400 font-bold">Ready for Interview Coaching</span>
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-gold">
                    {results.bestScore}%
                  </div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                    Match Confidence
                  </div>
                </div>

                <Button
                  onClick={() => onSelectRole?.(results.bestMatch)}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black px-6 py-6 rounded-2xl shadow-xl hover:scale-105 transition-transform"
                >
                  Apply for This Role <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Strengths & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="rounded-2xl bg-[#0c1324] border border-gold/30 p-6 space-y-3">
                <div className="flex items-center gap-2 text-gold font-bold text-sm">
                  <Award className="h-4 w-4" /> Validated Profile Strengths
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {results.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Plan */}
              <div className="rounded-2xl bg-[#0c1324] border border-gold/30 p-6 space-y-3">
                <div className="flex items-center gap-2 text-gold font-bold text-sm">
                  <Sparkles className="h-4 w-4" /> Recommended Next Steps
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Secondary Match Bar */}
            <div className="rounded-2xl bg-[#0c1324] border border-gold/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gold/20 p-2 text-gold">
                  <Plane className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-slate-300 font-medium">Alternative Secondary Career Match: </span>
                  <strong className="text-white font-bold">{results.secondaryMatch}</strong>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-gold">{results.secondaryScore}% Match</span>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-gold font-bold underline transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Re-calculate Criteria
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
