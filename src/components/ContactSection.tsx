import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/context/SiteConfigContext";

const locations = [
  { city: "Lakshadweep", address: "Indian Alliance Services Backup Office, 152, Agatti, Lakshadweep 682553" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const { settings, addLead } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    role: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    await addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      qualification: formData.qualification || undefined,
      targetRole: formData.role || "Airport Opportunity Enquiry",
      city: formData.location || undefined,
      source: "Homepage Contact Section",
    });

    toast({
      title: "Enquiry Submitted Successfully!",
      description: "Our aviation counsellor will call you within 24 hours.",
    });
    setFormData({ name: "", phone: "", email: "", qualification: "", role: "", location: "" });
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
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input id="phone" type="tel" placeholder="Enter your mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} maxLength={15} required />
              </div>

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

              <Button type="submit" className="w-full gap-2 font-bold" size="lg">
                <Send className="h-4 w-4" /> Submit Enquiry
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
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Our Locations</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />
                  <span className="font-medium">{settings.displayAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
