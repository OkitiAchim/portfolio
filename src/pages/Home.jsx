import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#030305]">
      <Navbar />
      <Hero />
      {/* More sections will be added in Phase 3 */}
    </main>
  );
}
