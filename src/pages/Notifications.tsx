import React, { useState, useEffect } from "react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EnquiryModal from "@/components/common/EnquiryModal";
import {
  Bell,
  Calendar,
  FileText,
  ShieldCheck,
  Plane,
  Sparkles,
  Search,
  RefreshCw,
  Clock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useSiteConfig, isNoticeActive, NoticeItem } from "@/context/SiteConfigContext";
import { toast } from "sonner";

export default function Notifications() {
  const { notices, settings, syncNoticesFromGoogleSheet } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Auto-sync Google Sheet source on mount if URL is configured
  useEffect(() => {
    if (settings.googleSheetsNoticeUrl && settings.googleSheetsNoticeUrl.trim()) {
      syncNoticesFromGoogleSheet().catch(() => {});
    }
  }, [settings.googleSheetsNoticeUrl]);

  // Filter only ACTIVE (unexpired) notices
  const activeNotices = notices.filter(isNoticeActive);

  const filtered = activeNotices.filter((n) => {
    const matchesCat = selectedCategory === "all" || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.location && n.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleManualSync = async () => {
    if (!settings.googleSheetsNoticeUrl) {
      toast.info("No Google Sheet URL configured in Admin Panel. Loading verified database notices.");
      return;
    }

    setIsSyncing(true);
    const result = await syncNoticesFromGoogleSheet();
    setIsSyncing(false);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "walkin":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "admitcard":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30";
      case "result":
        return "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30";
      default:
        return "bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/30";
    }
  };

  const notificationsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://indianallianceservices.com/notifications/#page",
        url: "https://indianallianceservices.com/notifications",
        name: "Official Notifications & Recruitment Circulars | Indian Alliance Services",
        description: "Official real-time notice board for airport ground staff walk-in screening, cabin crew schedules, and candidate advisories.",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Official Notifications & Recruitment Circulars | Indian Alliance Services"
        description="Stay updated with official Indian Alliance Services recruitment notices, walk-in drive schedules, admit card updates, selection lists, and fraud alerts."
        keywords="aviation notifications, airport walk-in drive 2026, cabin crew admit card, ground staff circular, Indian Alliance Services notifications"
        canonical="https://indianallianceservices.com/notifications"
        schema={notificationsSchema}
      />

      {/* Hero Banner */}
      <section className="bg-navy-midnight text-white py-14 lg:py-16 border-b border-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Notifications & Circulars" }]} className="text-primary-foreground/70 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-dark border border-gold/40 px-4 py-1 text-xs font-extrabold text-gold mb-4 shadow-md">
              <Bell className="h-3.5 w-3.5 animate-bounce text-gold" /> Live Notice Board
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
              Recruitment Notices & <span className="gold-gradient-text">Official Circulars</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed mb-6 font-normal">
              Track active airport walk-in dates, download recruitment circulars, verify candidate interview letters, and view official safety advisories.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/recruitment-verification">
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 font-extrabold shadow-lg rounded-2xl px-6 py-5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950"
                >
                  <ShieldCheck className="h-4 w-4" /> Verify Candidate Application ID
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Live Status Bar */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 space-y-4">
          {/* Live Feed Status Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-3.5 rounded-2xl border border-border text-xs shadow-sm">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>
                <strong>Live Verified Feed:</strong> Displaying {activeNotices.length} active announcements (Expired notices are automatically pruned).
              </span>
            </div>

            {settings.googleSheetsNoticeUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="h-8 gap-1.5 text-xs font-bold shrink-0 rounded-xl border-border hover:bg-muted"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-secondary ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "Syncing Google Sheet..." : "Sync Live Google Source"}</span>
              </Button>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: `All Active (${activeNotices.length})` },
                { id: "walkin", label: "Walk-in Drives" },
                { id: "admitcard", label: "Admit Cards" },
                { id: "result", label: "Selection Lists" },
                { id: "advisory", label: "Fraud Advisories" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    selectedCategory === tab.id
                      ? "bg-primary text-primary-foreground border border-gold/40 shadow-md scale-105"
                      : "bg-card hover:bg-muted text-foreground border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by keyword or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications List */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-4 max-w-5xl mx-auto">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl border border-border hover:border-secondary/50 p-5 md:p-6 shadow-sm transition-all hover:shadow-md group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${getBadgeColor(item.category)}`}>
                      {item.badge}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>

                    {item.expiryDate && (
                      <span className="text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-bold">
                        <Clock className="h-2.5 w-2.5" /> Valid Till: {item.expiryDate}
                      </span>
                    )}

                    <span className="text-muted-foreground/60 text-[11px] font-mono">
                      Ref: {item.id}
                    </span>

                    {item.source === "google_sheets" && (
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">
                        Live Source
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {item.location && (
                    <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                      <Plane className="h-3 w-3 text-secondary" /> Location: {item.location}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/40">
                  {item.category === "advisory" ? (
                    <Link to="/recruitment-verification">
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-500" /> Verify Authenticity
                      </Button>
                    </Link>
                  ) : item.category === "admitcard" ? (
                    <Link to="/recruitment-verification">
                      <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-semibold">
                        <FileText className="h-3.5 w-3.5" /> Check Status
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => setIsModalOpen(true)}
                      className="gap-1.5 text-xs font-semibold"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> {item.linkText || "Apply Now"}
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-card rounded-2xl border border-border p-8">
                <p className="text-sm font-semibold text-foreground">No circulars found matching your query.</p>
                <p className="text-xs text-muted-foreground mt-1">Expired notices are automatically pruned from this feed.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
