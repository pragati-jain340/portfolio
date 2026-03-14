import { featuredProjects } from "@/data/featured-projects";

export default function Projects() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 min-h-screen">
      <section className="py-12 pb-24 space-y-16" id="projects">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black">Featured Projects</h2>
          <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
            A selection of my work in AI, computer vision, and software engineering.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-card rounded-3xl overflow-hidden group flex flex-col border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Left: Text content */}
              <div className="flex flex-col justify-center gap-5 p-10 md:p-12 md:w-1/2">
                <p className="text-primary text-sm font-bold uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-2xl font-black group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                {(project.ppt || project.code || project.code1 || project.code2 || project.demo || project.video) && (
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {project.ppt && (
                      <a
                        href={project.ppt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">slideshow</span>
                        PPT
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs hover:border-primary hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">code</span>
                        Code
                      </a>
                    )}
                    {project.code1 && (
                      <a
                        href={project.code1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs hover:border-primary hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">back_hand</span>
                        Hand Tracking
                      </a>
                    )}
                    {project.code2 && (
                      <a
                        href={project.code2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs hover:border-primary hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">view_in_ar</span>
                        Pose Est.
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/50 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        Demo
                      </a>
                    )}
                    {project.video && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/50 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        Video
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Image */}
              {project.image ? (
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="md:w-1/2 h-64 md:h-auto bg-primary/5 dark:bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/40 text-[100px]">
                    {project.icon}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
