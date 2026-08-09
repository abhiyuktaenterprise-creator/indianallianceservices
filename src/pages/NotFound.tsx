import React from "react";
import { Link } from "react-router-dom";
import { Plane, Home, Briefcase, Phone, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Airport Career Services"
        description="The page you are looking for does not exist. Return to Airport Career Services homepage or explore career pathways."
      />

      <div className="min-h-[80vh] flex items-center justify-center bg-muted/40 py-20 px-4">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-3xl p-8 shadow-lg">
          <div className="rounded-2xl bg-secondary/15 p-4 text-secondary w-fit mx-auto mb-5">
            <Plane className="h-10 w-10 rotate-45" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            404 Error
          </span>
          <h1 className="text-3xl font-heading font-extrabold text-foreground mt-1 mb-3">
            Flight Path Not Found
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            The page you requested could not be located. You can navigate back to our homepage or explore our main sections below.
          </p>

          <div className="space-y-3">
            <Link to="/" className="block">
              <Button variant="hero" className="w-full gap-2 font-bold py-5">
                <Home className="h-4 w-4" /> Return to Homepage
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/services">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Our Services
                </Button>
              </Link>
              <Link to="/careers">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Aviation Careers
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Contact Us
                </Button>
              </Link>
              <Link to="/recruitment-verification">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Verify Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
