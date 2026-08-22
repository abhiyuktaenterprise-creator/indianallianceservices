import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle2, Phone, Sparkles, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { checkDuplicatePhone, normalizePhoneNumber, SubmittedLeadRecord } from "@/utils/leadValidator";

interface ContactFormProps {
  defaultRole?: string;
  submitButtonText?: string;
  showTitle?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export default function ContactForm({
  defaultRole = "",
  submitButtonText = "Get Career Counselling",
  showTitle = true,
  className = "",
  onSuccess,
}: ContactFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addLead, settings } = useSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    isDuplicate: boolean;
    leadRecord?: SubmittedLeadRecord;
  }>({ isDuplicate: false });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    role: defaultRole || "",
    city: "",
    message: "",
  });

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    const check = checkDuplicatePhone(val);
    setDuplicateInfo(check);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Required Information",
        description: "Please provide your Full Name and Mobile Number to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone.trim().length < 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    // Check duplicate phone
    const duplicateCheck = checkDuplicatePhone(formData.phone);
    if (duplicateCheck.isDuplicate) {
      setDuplicateInfo(duplicateCheck);
      toast({
        title: "Application Already Submitted!",
        description: `We already have an active application registered for +91 ${normalizePhoneNumber(formData.phone)}. Our senior counsellor will call you shortly.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const targetRoleName = formData.role || defaultRole || "General Aviation Career";
    const leadResult = await addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      qualification: formData.qualification || undefined,
      targetRole: targetRoleName,
      city: formData.city || undefined,
      source: "Contact Form",
      notes: formData.message.trim() || undefined,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Career Counselling Request Received!",
      description: "Our senior counselling team will call you within 24 business hours.",
    });

    if (onSuccess) {
      onSuccess();
    }

    // Navigate to dedicated Thank You page with submission details
    navigate("/thank-you", {
      state: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        qualification: formData.qualification || undefined,
        targetRole: targetRoleName,
        city: formData.city || undefined,
        source: "Contact Form",
        refId: leadResult?.id ? `IAS-${new Date().getFullYear()}-${leadResult.id.replace("lead-", "").slice(-6)}` : undefined,
      },
    });
  };

  if (isSubmitted) {
    return (
      <div className={`bg-card rounded-2xl border border-border p-8 text-center shadow-md ${className}`}>
        <div className="rounded-full bg-secondary/15 p-4 w-fit mx-auto mb-4 text-secondary">
          <CheckCircle2 className="h-10 w-10 text-secondary" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
          Thank You, {formData.name || "Candidate"}!
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
          Your request for career counselling has been logged. Our student advisor will contact you on{" "}
          <strong className="text-foreground font-semibold">{formData.phone}</strong>.
        </p>
        <div className="bg-muted/60 rounded-xl p-4 text-sm text-muted-foreground text-left mb-6 max-w-md mx-auto space-y-1.5 border border-border/50">
          <p><span className="font-medium text-foreground">Interested Path:</span> {formData.role || "Aviation Career Guidance"}</p>
          <p><span className="font-medium text-foreground">Qualification:</span> {formData.qualification || "Not specified"}</p>
          <p><span className="font-medium text-foreground">Preferred City:</span> {formData.city || "Pan India"}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              qualification: "",
              role: "",
              city: "",
              message: "",
            });
          }}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-4 ${className}`}
    >
      {showTitle && (
        <div className="border-b border-border pb-4 mb-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" /> Direct Candidate Registration
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground">
            Get Career Counselling
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Speak with an aviation career expert. Transparent opportunity guidance.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            maxLength={100}
            required
            className="h-10 bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-phone" className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Mobile Number <span className="text-destructive">*</span></span>
            {duplicateInfo.isDuplicate && (
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Already Registered
              </span>
            )}
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            maxLength={15}
            required
            className={`h-10 bg-background ${
              duplicateInfo.isDuplicate
                ? "border-amber-500/80 focus-visible:ring-amber-500/50 bg-amber-500/5"
                : ""
            }`}
          />
        </div>
      </div>

      {/* Duplicate Phone Notice Banner */}
      {duplicateInfo.isDuplicate && (
        <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 p-4 sm:p-5 text-left space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground text-sm">
                You have already submitted an enquiry!
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                An enquiry for mobile number <strong className="text-foreground font-semibold">+91 {normalizePhoneNumber(formData.phone)}</strong> was already registered on <span className="text-foreground font-medium">{duplicateInfo.leadRecord?.submittedAt || "recently"}</span>{duplicateInfo.leadRecord?.targetRole ? ` for "${duplicateInfo.leadRecord.targetRole}"` : ""}.
              </p>
            </div>
          </div>

          <div className="bg-background/80 rounded-xl p-3 text-xs text-foreground/90 border border-amber-500/20 space-y-1">
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Your profile is already in our Senior Counselling Queue</span>
            </p>
            <p className="text-[11px] text-muted-foreground pl-5">
              Our student advisor will call you within 24 business hours. You do not need to fill this form again.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline bg-secondary/15 px-3 py-1.5 rounded-lg border border-secondary/30 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-secondary" />
              <span>Call Helpline: {settings.helplinePhone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hi%20Indian%20Alliance%20Services,%20I%20have%20already%20submitted%20an%20enquiry%20from%20%2B91${normalizePhoneNumber(formData.phone)}%20and%20need%20an%20update.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>WhatsApp Helpdesk</span>
            </a>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
            Email Address
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            maxLength={255}
            className="h-10 bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-qualification" className="text-xs font-semibold text-foreground">
            Highest Qualification
          </Label>
          <Select
            value={formData.qualification}
            onValueChange={(val) => setFormData({ ...formData, qualification: val })}
          >
            <SelectTrigger id="contact-qualification" className="h-10 bg-background">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th Pass">10th Pass</SelectItem>
              <SelectItem value="12th Pass">12th Pass</SelectItem>
              <SelectItem value="Undergraduate / In College">Undergraduate / Pursuing Degree</SelectItem>
              <SelectItem value="Graduate">Graduate (Any Stream)</SelectItem>
              <SelectItem value="Post Graduate">Post Graduate</SelectItem>
              <SelectItem value="Diploma Holder">Diploma Holder</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-role" className="text-xs font-semibold text-foreground">
            Interested Aviation Career
          </Label>
          <Select
            value={formData.role}
            onValueChange={(val) => setFormData({ ...formData, role: val })}
          >
            <SelectTrigger id="contact-role" className="h-10 bg-background">
              <SelectValue placeholder="Select interested role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AGS — Airport Ground Staff">AGS — Airport Ground Staff</SelectItem>
              <SelectItem value="CSA — Customer Service Assistant">CSA — Customer Service Assistant</SelectItem>
              <SelectItem value="Cabin Crew">Cabin Crew</SelectItem>
              <SelectItem value="GSA — Ground Service Assistant">GSA — Ground Service Assistant</SelectItem>
              <SelectItem value="PSA — Passenger Service Assistant">PSA — Passenger Service Assistant</SelectItem>
              <SelectItem value="Airhostess">Airhostess</SelectItem>
              <SelectItem value="HR & Telecalling Executive">HR & Telecalling Executive (Open Job)</SelectItem>
              <SelectItem value="General Opportunity Guidance">General Opportunity Guidance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-city" className="text-xs font-semibold text-foreground">
            Preferred / Current City
          </Label>
          <Select
            value={formData.city}
            onValueChange={(val) => setFormData({ ...formData, city: val })}
          >
            <SelectTrigger id="contact-city" className="h-10 bg-background">
              <SelectValue placeholder="Select preferred city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Kolkata">Kolkata</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Nagpur">Nagpur</SelectItem>
              <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Other City (Pan India)">Other City (Pan India)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
          Questions / Additional Details (Optional)
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your background, preferred airport, or any questions you have..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          maxLength={1000}
          className="bg-background resize-none text-sm"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || duplicateInfo.isDuplicate}
          className={`w-full gap-2 text-base font-semibold shadow-md h-11 transition-all ${
            duplicateInfo.isDuplicate
              ? "bg-amber-600/90 hover:bg-amber-600 text-white cursor-not-allowed opacity-90"
              : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          }`}
        >
          {isSubmitting ? (
            <span>Submitting Request...</span>
          ) : duplicateInfo.isDuplicate ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Already Submitted — In Review Queue
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> {submitButtonText}
            </>
          )}
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground text-center pt-1">
        🔒 We respect your privacy. Your information is strictly used for career guidance and is never shared with third-party spammers.
      </p>
    </form>
  );
}
