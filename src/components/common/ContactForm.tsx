import React, { useState } from "react";
import { Send, CheckCircle2, Phone, Sparkles } from "lucide-react";
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

interface ContactFormProps {
  defaultRole?: string;
  submitButtonText?: string;
  showTitle?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export default function ContactForm({
  defaultRole = "",
  submitButtonText = "Get Free Career Counselling",
  showTitle = true,
  className = "",
  onSuccess,
}: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    role: defaultRole || "",
    city: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Career Counselling Request Received!",
        description: "Our senior counselling team will call you within 24 business hours.",
      });

      if (onSuccess) {
        onSuccess();
      }
    }, 600);
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
          Your request for free career counselling has been logged. Our student advisor will contact you on{" "}
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
            Get Free Career Counselling
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Speak with an aviation career expert. Zero obligation. 100% transparent guidance.
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
          <Label htmlFor="contact-phone" className="text-xs font-semibold text-foreground">
            Mobile Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            maxLength={15}
            required
            className="h-10 bg-background"
          />
        </div>
      </div>

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
              <SelectItem value="General Placement Guidance">General Placement Guidance</SelectItem>
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
          disabled={isSubmitting}
          className="w-full gap-2 text-base font-semibold shadow-md bg-secondary hover:bg-secondary/90 text-secondary-foreground h-11"
        >
          {isSubmitting ? (
            <span>Submitting Request...</span>
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
