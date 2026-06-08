import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import DiscoverMore from "../components/DiscoverMore";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#030305]">
      <Navbar />
      <Hero />
      <DiscoverMore />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
