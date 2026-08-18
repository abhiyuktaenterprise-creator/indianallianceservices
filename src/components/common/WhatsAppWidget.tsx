import React, { useState } from "react";
import { MessageCircle, X, Send, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/context/SiteConfigContext";

const quickPrompts = [
  "Hello Indian Alliance Services! I want details on Airport Ground Staff roles & eligibility.",
  "Hello! I am interested in Cabin Crew / Air Hostess career guidance.",
  "Hi, I want to verify my interview status / application ID.",
  "Hello! Please share details on airport customer service & ticketing courses.",
];

export default function WhatsAppWidget() {
  const { settings } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const cleanPhone = (settings.whatsappPhone || "917851836860").replace(/\D/g, "");

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || message || "Hello Indian Alliance Services Team! I want information on aviation & airport career guidance.";
    const encoded = encodeURIComponent(finalMsg);
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
    handleSend(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] rounded-3xl bg-card border border-gold/40 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-navy-midnight to-slate-900 p-4 text-white border-b border-gold/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-gold/20 flex items-center justify-center font-bold text-xs text-gold backdrop-blur-sm border border-gold/40">
                    IAS
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm leading-snug flex items-center gap-1.5 text-white">
                    Indian Alliance Services Desk
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  </h4>
                  <p className="text-[11px] text-primary-foreground/80 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Official WhatsApp Desk
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-muted/30 space-y-3 max-h-[360px] overflow-y-auto">
            <div className="bg-card rounded-2xl rounded-tl-sm p-3.5 text-xs text-foreground shadow-sm border border-border/60">
              <p className="font-bold text-gold flex items-center gap-1 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Welcome to Indian Alliance Services!
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Connect directly with our senior aviation counsellors. Ask questions about eligibility, ground staff jobs, cabin crew training, or verify your application.
              </p>
              <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Verified Aviation Guidance</span>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                Frequently Asked:
              </p>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left text-xs p-2.5 rounded-xl bg-card hover:bg-secondary/10 hover:text-secondary border border-border/70 text-foreground transition-all duration-150 flex items-center justify-between group"
                >
                  <span className="line-clamp-2">{prompt}</span>
                  <Send className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-secondary transition-opacity shrink-0 ml-1.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-card border-t border-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="flex-1 text-xs bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <Button
              size="sm"
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 w-9 p-0 shrink-0 shadow-sm"
              aria-label="Send WhatsApp message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 active:scale-95"
        aria-label="Open WhatsApp Chat Support"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6 text-white fill-white/20" />
          {!hasInteracted && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 border-2 border-emerald-600 animate-ping" />
          )}
        </div>
        <span className="text-xs font-bold font-heading tracking-wide hidden sm:inline">
          Chat on WhatsApp
        </span>

        {/* Pulse badge on mobile */}
        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
