import React, { useState } from "react";
import { Send, CheckCircle2, Briefcase, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle?: string;
}

export default function JobApplicationModal({
  isOpen,
  onOpenChange,
  jobTitle = "HR & Telecalling Executive",
}: JobApplicationModalProps) {
  const { toast } = useToast();
  const { addLead } = useSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    city: "",
    noticePeriod: "",
    skills: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your Full Name and Mobile Number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    await addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      qualification: formData.experience ? `Exp: ${formData.experience}` : undefined,
      targetRole: jobTitle,
      city: formData.city || undefined,
      source: "Careers Job Application",
      notes: `Notice: ${formData.noticePeriod || "Immediate"} | Skills: ${formData.skills || "N/A"}`,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted Successfully!",
      description: `Your application for ${jobTitle} has been received by our Talent Acquisition team.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
            <Briefcase className="h-3.5 w-3.5" /> Direct HR Application
          </div>
          <DialogTitle className="text-2xl font-heading font-bold text-foreground">
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Department: Human Resources / Talent Acquisition • Full-time / Office role
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="rounded-full bg-secondary/15 p-4 w-fit mx-auto mb-4 text-secondary">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Application Received!
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Our Senior HR team will review your profile and contact you on{" "}
              <strong className="text-foreground">{formData.phone}</strong> for telephonic screening.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                onOpenChange(false);
              }}
            >
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="app-name" className="text-xs font-semibold text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="app-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="app-phone" className="text-xs font-semibold text-foreground">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="app-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  maxLength={15}
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="app-email" className="text-xs font-semibold text-foreground">
                  Email Address
                </Label>
                <Input
                  id="app-email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={255}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="app-exp" className="text-xs font-semibold text-foreground">
                  Relevant Experience
                </Label>
                <Select
                  value={formData.experience}
                  onValueChange={(val) => setFormData({ ...formData, experience: val })}
                >
                  <SelectTrigger id="app-exp">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fresher / 0 Years">Fresher (Zero Experience)</SelectItem>
                    <SelectItem value="6 Months - 1 Year">6 Months – 1 Year (Telecalling/HR)</SelectItem>
                    <SelectItem value="1 - 2 Years">1 – 2 Years</SelectItem>
                    <SelectItem value="2+ Years">2+ Years (Talent Acquisition / BPO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="app-city" className="text-xs font-semibold text-foreground">
                  Current City
                </Label>
                <Input
                  id="app-city"
                  placeholder="e.g. Mumbai, Kurnool, Visakhapatnam"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  maxLength={100}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="app-notice" className="text-xs font-semibold text-foreground">
                  Availability / Notice Period
                </Label>
                <Select
                  value={formData.noticePeriod}
                  onValueChange={(val) => setFormData({ ...formData, noticePeriod: val })}
                >
                  <SelectTrigger id="app-notice">
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate (0 Days)">Immediate Joiner</SelectItem>
                    <SelectItem value="Within 7 Days">Within 7 Days</SelectItem>
                    <SelectItem value="15 Days">15 Days</SelectItem>
                    <SelectItem value="1 Month">1 Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="app-skills" className="text-xs font-semibold text-foreground">
                Languages & Computer Skills (Optional)
              </Label>
              <Textarea
                id="app-skills"
                placeholder="Mention languages spoken (Hindi, English, Telugu, Marathi, etc.) and knowledge of Excel / MS Office..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                rows={2}
                maxLength={500}
                className="resize-none text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground h-11"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Submit Application
                </>
              )}
            </Button>

            <p className="text-[11px] text-muted-foreground text-center">
              Our Talent Acquisition team will reach out directly. No fees are ever charged for applying to internal ACS roles.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
