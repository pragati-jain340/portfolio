import { contactInfo } from "@/data/contact";

export default function Contact() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 min-h-screen">
      <section className="py-12 pb-24 space-y-16" id="contact">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black">Contact</h2>
          <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
            Open to research collaborations, AI projects, and new opportunities.
          </p>
        </div>
        <div className="glass-card rounded-[3rem] p-12 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 overflow-hidden relative">
          <div className="absolute -bottom-20 -left-20 size-80 bg-primary/20 blur-3xl rounded-full"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <h2 className="text-5xl font-black">
                Let's build<br />something <span className="text-primary">intelligent</span>.
              </h2>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-base">
                I'm always open to discussing research collaborations, AI projects, or opportunities in computer vision and machine learning.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="size-16 rounded-full glass flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">call</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest">Call Me</p>
                  <p className="text-lg font-bold">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="size-16 rounded-full glass flex items-center justify-center text-primary dark:text-dark-primary">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest">Email Me</p>
                  <p className="text-lg font-bold">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="size-16 rounded-full glass flex items-center justify-center text-primary dark:text-dark-primary">
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest">Location</p>
                  <p className="text-lg font-bold">{contactInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <a 
                className="size-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md shadow-primary/10" 
                href={contactInfo.github} 
                target="_blank" 
                title="GitHub"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a 
                className="size-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md shadow-primary/10" 
                href={contactInfo.linkedin} 
                target="_blank" 
                title="LinkedIn"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div className="relative z-10 w-full">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="space-y-2 w-full">
                  <label className="text-lg font-bold px-1">Name</label>
                  <input className="w-full bg-white/50 dark:bg-slate-800/50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2 w-full">
                  <label className="text-lg font-bold px-1">Email</label>
                  <input className="w-full bg-white/50 dark:bg-slate-800/50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="text-lg font-bold px-1">Message</label>
                <textarea className="w-full bg-white/50 dark:bg-slate-800/50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none overflow-hidden" placeholder="How can I help you?" rows={4}></textarea>
              </div>
              <button className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:bg-primary-hover dark:bg-dark-primary dark:hover:bg-dark-primary-hover transition-all shadow-xl shadow-primary/20 text-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
