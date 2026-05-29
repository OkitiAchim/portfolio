import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import DiscoverMore from "../components/DiscoverMore";
import Projects from "../components/Projects";
import About from "../components/About";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#030305]">
      <Navbar />
      <Hero />
      <DiscoverMore />
      <Projects />
      <About />
      {/* More sections will be added in Phase 3 */}
    </main>
  );
}
