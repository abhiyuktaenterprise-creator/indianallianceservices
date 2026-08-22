import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Send, AlertTriangle, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { checkDuplicatePhone, normalizePhoneNumber, SubmittedLeadRecord } from "@/utils/leadValidator";

const locations = [
  { city: "Lakshadweep (Backup Office)", address: "Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553" },
  { city: "Mumbai / Navi Mumbai", address: "Office No. 402, Sai Arcade Complex, Panvel, Navi Mumbai – 410206" },
  { city: "Delhi NCR", address: "Unit 315, Galaxy Diamond Plaza, Greater Noida West – 201308" },
  { city: "Madhya Pradesh", address: "Office No. 208, Silver Estate Business Park, Indore – 452010" },
  { city: "Andhra Pradesh", address: "Survey No. 42/3, Ranipet-Kurnool Highway, Orvakal, Kurnool – 518010" },
  { city: "Gujarat", address: "Office No. 204, GIDC Business Hub, Sanand – 382110" },
];

const ContactSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, addLead } = useSiteConfig();
  const [duplicateInfo, setDuplicateInfo] = useState<{
    isDuplicate: boolean;
    leadRecord?: SubmittedLeadRecord;
  }>({ isDuplicate: false });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    role: "",
    location: "",
  });

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    const check = checkDuplicatePhone(val);
    setDuplicateInfo(check);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (formData.phone.trim().length < 10) {
      toast({ title: "Please enter a valid 10-digit mobile number", variant: "destructive" });
      return;
    }

    const duplicateCheck = checkDuplicatePhone(formData.phone);
    if (duplicateCheck.isDuplicate) {
      setDuplicateInfo(duplicateCheck);
      toast({
        title: "Application Already Submitted!",
        description: `We already have an active enquiry for mobile number +91 ${normalizePhoneNumber(formData.phone)}. Our senior counsellor will call you shortly.`,
        variant: "destructive",
      });
      return;
    }

    const targetRoleName = formData.role || "Airport Opportunity Enquiry";
    const leadResult = await addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      qualification: formData.qualification || undefined,
      targetRole: targetRoleName,
      city: formData.location || undefined,
      source: "Homepage Contact Section",
    });

    toast({
      title: "Enquiry Submitted Successfully!",
      description: "Our aviation counsellor will call you within 24 hours.",
    });
    
    navigate("/thank-you", {
      state: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        qualification: formData.qualification || undefined,
        targetRole: targetRoleName,
        city: formData.location || undefined,
        source: "Homepage Contact Section",
        refId: leadResult?.id ? `IAS-${new Date().getFullYear()}-${leadResult.id.replace("lead-", "").slice(-6)}` : undefined,
      },
    });

    setFormData({ name: "", phone: "", email: "", qualification: "", role: "", location: "" });
    setDuplicateInfo({ isDuplicate: false });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Student Enquiry</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
            Start Your Airport Career Today
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} maxLength={100} required />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phone">Mobile Number *</Label>
                  {duplicateInfo.isDuplicate && (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Already Registered
                    </span>
                  )}
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={15}
                  required
                  className={
                    duplicateInfo.isDuplicate
                      ? "border-amber-500/80 focus-visible:ring-amber-500/50 bg-amber-500/5"
                      : ""
                  }
                />
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
                      <span>Your profile is in our Senior Counselling Queue</span>
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

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} maxLength={255} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Select value={formData.qualification} onValueChange={(v) => setFormData({ ...formData, qualification: v })}>
                  <SelectTrigger><SelectValue placeholder="Select qualification" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Pass</SelectItem>
                    <SelectItem value="12th">12th Pass</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Interested Airport Opportunity Role</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Airport Ground Staff (AGS)">AGS — Airport Ground Staff</SelectItem>
                    <SelectItem value="Customer Service Assistant (CSA)">CSA — Customer Service Assistant</SelectItem>
                    <SelectItem value="Cabin Crew / Flight Attendant">Cabin Crew</SelectItem>
                    <SelectItem value="Ground Service Assistant (GSA)">GSA — Ground Service Assistant</SelectItem>
                    <SelectItem value="Passenger Service Assistant (PSA)">PSA — Passenger Service Assistant</SelectItem>
                    <SelectItem value="Airhostess Hospitality">Airhostess</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred City</Label>
                <Select value={formData.location} onValueChange={(v) => setFormData({ ...formData, location: v })}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.city} value={loc.city}>{loc.city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={duplicateInfo.isDuplicate}
                className={`w-full gap-2 font-bold transition-all ${
                  duplicateInfo.isDuplicate
                    ? "bg-amber-600/90 hover:bg-amber-600 text-white cursor-not-allowed opacity-90"
                    : ""
                }`}
                size="lg"
              >
                {duplicateInfo.isDuplicate ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Already Submitted — In Review Queue
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Submit Enquiry
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Locations */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-baseline md:items-center gap-3 flex-col md:flex-row">
                  <div className="rounded-lg bg-secondary/10 p-2.5">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <a href={`tel:${settings.helplinePhone.replace(/\s+/g, "")}`} className="font-semibold text-foreground hover:text-secondary transition-colors block">
                      {settings.helplinePhone}
                    </a>
                  </div>
                </div>
                <a href={`mailto:${settings.supportEmail}`} className="flex items-baseline md:items-center gap-3 group flex-col md:flex-row">
                  <div className="rounded-lg bg-secondary/10 p-2.5 group-hover:bg-secondary/20 transition-colors">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-semibold text-foreground">{settings.supportEmail}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-3">
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">Our Office Network</h3>
              <div className="space-y-2 text-xs">
                {locations.map((loc) => (
                  <div key={loc.city} className="flex items-start gap-2 text-foreground/90">
                    <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{loc.city}: </strong>
                      <span className="text-muted-foreground">{loc.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
