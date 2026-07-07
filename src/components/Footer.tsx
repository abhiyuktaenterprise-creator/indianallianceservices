import { Plane, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="gradient-navy py-12">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-lg bg-secondary p-1.5">
              <Plane className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="font-heading font-bold text-primary-foreground">Airport Career Services</span>
          </div>
          <p className="text-sm text-primary-foreground/50 leading-relaxed">
            Career Guidance | Aviation Careers | Placement Support
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "About Us", "Career Paths", "Placement", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-").replace("home", "home")}`} className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Career Paths</h4>
          <div className="flex flex-col gap-2">
            {["Ground Staff", "Cabin Crew", "Customer Service", "Cargo Handling", "Airport Operations"].map((path) => (
              <a key={path} href="#careers" className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors">
                {path}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+919549658894" className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />+91 *****58894
            </a>
            <a href="mailto:infor.airportcareerservices@gmail.com" className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" /> infor.airportcareerservices@gmail.com
            </a>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/50">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Ranipet Highway, Orvakal, Pudicherla, Andhra Pradesh 518010
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40">© 2026 Airport Career Services. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-secondary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
