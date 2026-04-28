import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import AboutUs from "@/components/AboutUs";
import CareerPaths from "@/components/CareerPaths";
import PlacementSupport from "@/components/PlacementSupport";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <AboutUs />
      <CareerPaths />
      <PlacementSupport />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
