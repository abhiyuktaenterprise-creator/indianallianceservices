import { Compass, Heart, Route, Users } from "lucide-react";

const focusPoints = [
  { icon: Compass, text: "Clear career guidance" },
  { icon: Heart, text: "Honest counselling" },
  { icon: Route, text: "Structured career path" },
  { icon: Users, text: "Dedicated opportunity assistance" },
];

const teamMembers = [
  {
    name: "Anthony Ghospade",
    role: "Founder & CEO",
    description:
      "Anthony Ghospade is the Founder and CEO of Indian Alliance Services. With strong industry understanding and a student-first approach, he guides aspiring aviation professionals toward the right career path with clarity, honesty, and long-term vision. ",
  },
  {
    name: "Aditya Gujral",
    role: "Senior Assistant Manager",
    description:
      "Aditya Gujral supports students throughout their counselling and opportunity journey. He ensures smooth coordination, accurate guidance, and timely assistance, helping students move confidently from counselling to final airport opportunity.",
  },
];

const AboutUs = () => (
  <section id="about" className="py-20 gradient-sky">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">

        {/* ABOUT SECTION */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
            Who We Are
          </h2>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 shadow-sm mb-16">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Indian Alliance Services is a dedicated aviation career guidance and training opportunity portal.
            We guide students step-by-step — from career selection to training and final airport job opportunities.
          </p>

          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Our focus is on:
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {focusPoints.map((point) => (
              <div key={point.text} className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground italic border-l-4 border-secondary pl-4">
            We believe every student deserves the right direction before choosing an aviation career.
          </p>
        </div>

        {/* OUR TEAM SECTION */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
            Leadership & Management
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-secondary mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default AboutUs;
