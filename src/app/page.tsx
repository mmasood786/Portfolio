import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import Pricing from "@/components/Pricing";
import Integrations from "@/components/Integrations";
import Process from "@/components/Process";
import AIAgent from "@/components/AIAgent";
import FAQ from "@/components/FAQ";
import AuditForm from "@/components/AuditForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <ExclusiveOffers />
      <Pricing />
      <Integrations />
      <Process />
      <AIAgent />
      <FAQ />
      <AuditForm />
      <Contact />
      <Footer />
    </main>
  );
}