import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Ground Staff, Delhi Airport", text: "Airport Career Services guided me from zero knowledge to landing my dream job at Delhi Airport. The training and interview prep were outstanding!", rating: 5 },
  { name: "Rahul Verma", role: "Cargo Operations, Mumbai Airport", text: "I was confused about career options after 12th. Their counselling helped me discover airport cargo operations — and now I'm working at Mumbai Airport!", rating: 5 },
  { name: "Ananya Patel", role: "Customer Service, Bangalore Airport", text: "The entire process was transparent and supportive. Within 3 months of joining, I was placed as a Customer Service Executive.", rating: 5 },
  { name: "Mohammed Irfan", role: "Cabin Crew, IndiGo", text: "Professional grooming and mock interviews gave me the confidence I needed. Today I fly with IndiGo — thanks to Airport Career Services!", rating: 5 },
];

const Testimonials = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
          What Our Students Say
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-xl border border-border p-6 flex flex-col hover:shadow-md transition-shadow">
            <Quote className="h-8 w-8 text-secondary/30 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t.text}</p>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div>
              <div className="font-heading font-semibold text-foreground text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
