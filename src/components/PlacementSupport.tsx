import { MessageSquare, Route, FileText, UserCheck, Briefcase, Shield } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "1", title: "Career Counselling & Assessment" },
  { icon: Route, step: "2", title: "Career Path Selection" },
  { icon: FileText, step: "3", title: "Training & Documentation Support" },
  { icon: UserCheck, step: "4", title: "Interview Preparation" },
  { icon: Briefcase, step: "5", title: "Opportunity Assistance" },
];

const PlacementSupport = () => (
  <section id="placement" className="py-20 gradient-navy">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Our Opportunity Process</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground mt-2 mb-4">
          Simple & Transparent Process
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-12">
        {steps.map((item, i) => (
          <div key={item.step} className="flex items-center">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5 hover:bg-primary-foreground/10 transition-all duration-300 text-center min-w-[180px]">
              <div className="rounded-full bg-secondary/20 p-3 w-fit mx-auto mb-3">
                <item.icon className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-2xl font-heading font-bold text-secondary mb-2 block">{item.step}</span>
              <h3 className="text-sm font-heading font-semibold text-primary-foreground">{item.title}</h3>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block text-secondary/40 text-2xl px-2">→</div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
        <div className="flex items-center gap-3 justify-center">
          <Shield className="h-6 w-6 text-secondary shrink-0" />
          <p className="text-primary-foreground/80 font-medium">
            We follow a transparent and ethical approach — no false promises.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PlacementSupport;
