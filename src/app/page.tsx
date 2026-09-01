import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* More sections coming soon */}
      <section
        id="about"
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <p className="text-white/20 text-sm tracking-widest uppercase">
          — more sections coming —
        </p>
      </section>
    </main>
  );
}
