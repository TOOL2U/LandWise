import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import FreeLandQuickCheck from "@/components/sections/FreeLandQuickCheck";
import HowItWorks from "@/components/sections/HowItWorks";
import Portfolio from "@/components/sections/Portfolio";
import Packages from "@/components/sections/Packages";
import AdditionalServices from "@/components/sections/AdditionalServices";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <FreeLandQuickCheck />
      <HowItWorks />
      <Packages />
      <AdditionalServices />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
