import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import DiscoverMore from "../components/DiscoverMore";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#030305]">
      <Navbar />
      <Hero />
      <DiscoverMore />
      {/* More sections will be added in Phase 3 */}
    </main>
  );
}
