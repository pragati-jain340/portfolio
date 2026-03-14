import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";

// Helper function to render bold tags from the markdown-like bio strings
function renderBioLine(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <b key={i}>{part.slice(2, -2)}</b>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 min-h-screen">
      <section className="pt-24 pb-14 min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12" id="home">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative group cursor-pointer">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent blur-2xl rounded-full group-hover:scale-110 transition-all duration-500"></div>
            
            {/* Image container */}
            <div className="relative size-64 md:size-[360px] lg:size-[420px] rounded-full overflow-hidden border-8 border-white/50 dark:border-slate-800/50 shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500 glass-image-container">
              {/* Note: In a real Next.js app, use the Image component. 
                  Using standard img here for portability without external config */}
              <img 
                src="/myimage.jpeg" 
                alt="Pragati" 
                className="w-full h-full object-cover object-center brightness-115 saturate-110 dark:brightness-95 dark:saturate-100 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass !bg-white/90 dark:!bg-slate-900/90 px-6 py-4 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 flex items-center gap-3 animate-float group-hover:-translate-y-2 group-hover:shadow-primary/20 transition-all duration-500">
              <span className="material-symbols-outlined text-primary text-3xl">waving_hand</span>
              <span className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">Hello!</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8 md:pl-10">
          <div className="space-y-6">
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-2">
              {profile.titles.join(" | ")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter">
              Hello, I'm<br />
              <span className="text-primary">{profile.name}</span>
            </h1>
            <div className="flex flex-col gap-3 text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-xl leading-relaxed font-normal">
              {profile.bio.map((line, idx) => (
                <p key={idx}>{renderBioLine(line)}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 pt-4">
            <Link className="circle-btn group" href="/resume">
              <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">description</span>
              <span className="text-sm font-bold uppercase tracking-tighter">Experience</span>
            </Link>
            <Link className="circle-btn group" href="/research">
              <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">science</span>
              <span className="text-sm font-bold uppercase tracking-tighter">Research</span>
            </Link>
            <Link className="circle-btn group" href="/achievements">
              <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">emoji_events</span>
              <span className="text-sm font-bold uppercase tracking-tighter">Awards</span>
            </Link>
            <Link className="circle-btn group" href="/projects">
              <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">grid_view</span>
              <span className="text-sm font-bold uppercase tracking-tighter">Projects</span>
            </Link>
            <Link className="circle-btn group" href="/contact">
              <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">alternate_email</span>
              <span className="text-sm font-bold uppercase tracking-tighter">Contact</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
