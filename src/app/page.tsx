import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import PlaygroundSection from "@/components/PlaygroundSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <PlaygroundSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
