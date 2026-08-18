import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/context/SiteConfigContext";
import SEO from "@/components/common/SEO";

export default function AdminLogin() {
  const { login, isAuthenticated } = useSiteConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email address and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid email address or password. Please check your credentials.");
      }
    }, 400);
  };

  const handleFillDefaults = () => {
    setEmail("admin@airportcareerservices.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <>
      <SEO
        title="Admin Portal Login | Airport Career Services"
        description="Authorized administrator authentication portal for Airport Career Services (ACS) content & career postings management."
        noIndex={true}
      />

      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="text-center mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Website
            </Link>

            <div className="flex justify-center mb-4">
              <img
                src="/logo.png"
                alt="Airport Career Services (ACS)"
                className="h-16 sm:h-20 w-auto max-w-[320px] object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Administrative Console v2.4</span>
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Sign In to Admin Panel
            </h2>
            <p className="mt-1.5 text-xs text-slate-400">
              Manage job postings, contact helpline numbers, and candidate applications
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
                  Admin Email / Username
                </Label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@airportcareerservices.com"
                    required
                    className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400 rounded-xl text-xs py-5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-300">
                    Security Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400 rounded-xl text-xs py-5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-bold py-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg text-xs tracking-wide uppercase mt-2"
              >
                {isLoading ? "Verifying Credentials..." : "Unlock Dashboard"}
              </Button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="bg-slate-950/50 rounded-2xl p-3 border border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div>
                    User: <strong className="text-amber-400">admin@airportcareerservices.com</strong>
                  </div>
                  <div>
                    Pass: <strong className="text-amber-400">admin123</strong>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleFillDefaults}
                  className="text-[11px] h-7 px-2.5 rounded-lg border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  <KeyRound className="h-3 w-3 mr-1" /> Auto-Fill
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6 text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Secure 256-bit Encrypted Session</span>
          </div>
        </div>
      </div>
    </>
  );
}
