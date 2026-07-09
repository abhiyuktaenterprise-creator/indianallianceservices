import { useState, useEffect } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Career Paths", href: "#careers" },
  { label: "Placement", href: "#placement" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" className="flex items-center gap-2">
          <div className="rounded-lg bg-secondary p-1.5">
            <Plane className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className={`text-lg font-heading font-bold ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
            Airport Career Services
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                scrolled ? "text-foreground" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact">
            <Button variant="gold" size="sm" className="gap-2">
              Enquire Now
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-card shadow-xl border-t border-border animate-fade-in">
          <div className="container mx-auto flex flex-col gap-1 py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="mt-2" onClick={() => setIsOpen(false)}>
              <Button variant="gold" className="w-full gap-2">
                Enquire Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
