import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Do you guarantee placement?", a: "We provide complete placement assistance based on eligibility and performance. Final selection depends on your interview performance and meeting role requirements." },
  { q: "Is prior experience required?", a: "Most airport roles are open for freshers. We guide you through the complete process from training to placement." },
  { q: "Can students from any city apply?", a: "Yes, we guide students from all over India. We have offices in Mumbai, Kolkata, Chennai, Visakhapatnam, Pune, and Nagpur." },
];

const FAQ = () => (
  <section className="py-20 bg-card border-t border-border">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">FAQ</span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Answers to common questions from students and parents about airport career opportunities and our placement process.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border border-border px-5">
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground text-sm hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
