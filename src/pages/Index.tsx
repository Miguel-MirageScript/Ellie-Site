import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import EmberParticles from "@/components/EmberParticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EmberParticles />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
