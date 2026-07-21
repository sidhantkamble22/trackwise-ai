import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";
import WhyChoose from "./components/landing/WhyChoose";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <CTA />
      <Footer />
    </>
  );
}