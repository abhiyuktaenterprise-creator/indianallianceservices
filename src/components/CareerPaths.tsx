import { Users, Headphones, Plane, Settings, Package, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const careers = [
  { icon: Users, title: "Airport Ground Staff" },
  { icon: Headphones, title: "Customer Service Executive (CSE)" },
  { icon: Plane, title: "Cabin Crew (Guidance)" },
  { icon: Settings, title: "Airport Operations" },
  { icon: Package, title: "Cargo & Baggage Handling" },
  { icon: UserCheck, title: "Airline Support Staff" },
];

const CareerPaths = () => (
  <section id="careers" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Career Options in Aviation</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
          Airport Job Roles We Guide For
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {careers.map((career) => (
          <div key={career.title} className="group bg-card rounded-xl border border-border p-6 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="rounded-lg bg-secondary/10 p-4 w-fit mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
              <career.icon className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{career.title}</h3>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8 italic">
        (Eligibility & roles depend on profile and requirements)
      </p>

      <div className="text-center mt-10">
        <a href="#contact">
          <Button variant="default" size="lg" className="gap-2">
            Get Career Guidance <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CareerPaths;
