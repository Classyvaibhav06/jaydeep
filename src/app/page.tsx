import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <HeroSection />
      <SkillsSection />
    </main>
  );
}
