import { Target, Users, Route, Briefcase, MapPin, Eye } from "lucide-react";

const reasons = [
  { icon: Target, title: "Industry-Focused Career Guidance" },
  { icon: Users, title: "Student & Parent Friendly Counselling" },
  { icon: Route, title: "Clear Career Pathway" },
  { icon: Briefcase, title: "Placement-Oriented Support" },
  { icon: MapPin, title: "Multiple City Presence" },
  { icon: Eye, title: "Honest & Transparent Process" },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-20 gradient-sky">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Why Choose Us</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
          Why Choose Indian Alliance Services
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {reasons.map((item) => (
          <div key={item.title} className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:shadow-md hover:border-secondary/50 transition-all">
            <div className="rounded-lg bg-primary/10 p-3 shrink-0">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
