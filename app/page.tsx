import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
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
      <Deliverables />
      <Contact />
      <Footer />
    </main>
  );
}
