import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Packages from "@/components/sections/Packages";
import Deliverables from "@/components/sections/Deliverables";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Packages />
      <Portfolio />
      <Deliverables />
      <Contact />
      <Footer />
    </main>
  );
}
