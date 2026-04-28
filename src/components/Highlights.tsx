import { MessageSquare, Route, GraduationCap, UserCheck, Briefcase } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Career Counselling",
    desc: "Personalized guidance based on eligibility, interest, and industry demand.",
  },
  {
    icon: Route,
    title: "Airport Career Path Planning",
    desc: "We help students choose the right role in the airport & aviation industry.",
  },
  {
    icon: GraduationCap,
    title: "Training Guidance",
    desc: "Support for required skills, grooming, and documentation.",
  },
  {
    icon: UserCheck,
    title: "Interview Preparation",
    desc: "Mock interviews and confidence-building sessions.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance",
    desc: "End-to-end support until placement in airport-related roles.",
  },
];

const Highlights = () => (
  <section id="services" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Our Services</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
          What We Offer
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-card rounded-xl border border-border p-6 hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4">
              <service.icon className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;