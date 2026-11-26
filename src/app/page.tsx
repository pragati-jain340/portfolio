import HeroSection from "@/components/HeroSection";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Achievements from "@/components/sections/Achievements";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Experience />
        <Research />
        <Achievements />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
