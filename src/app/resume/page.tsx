import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

// Helper for rendering bold tags just like on the home page
function renderTextWithBold(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Resume() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 min-h-screen">
      <section className="py-12 space-y-16 pb-24" id="resume">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black">Professional Journey</h2>
          <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
            My work experience, education, and technical skills.
          </p>
        </div>

        <div className="space-y-12">
          {/* Work Experience */}
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="material-symbols-outlined text-primary text-4xl">work</span>
              <h3 className="text-3xl font-bold">Work Experience</h3>
            </div>
            <div className="space-y-12 border-l-2 border-primary/20 ml-4 pl-8 relative">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative">
                  <div className={`absolute -left-[42px] top-1 size-5 rounded-full border-4 border-white dark:border-slate-800 ${idx === 0 || idx === 1 ? 'bg-primary' : 'bg-primary/40'}`}></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <span className="bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full uppercase self-start md:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary font-medium mb-4 italic">
                    {exp.company}
                  </p>
                  <div className="text-base text-text-light-secondary dark:text-text-dark-secondary space-y-3">
                    {exp.description.map((desc, i) => (
                      <p key={i} className="leading-relaxed">
                        {exp.description.length > 1 && "• "}
                        {renderTextWithBold(desc)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">school</span>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>
            <div className="space-y-10 ml-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                  <div className="absolute -left-[9px] top-1.5 size-4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary font-medium">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-base text-text-light-secondary dark:text-text-dark-secondary">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">calendar_month</span> {edu.period}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">grade</span> {edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="material-symbols-outlined text-primary text-4xl">military_tech</span>
              <h3 className="text-3xl font-bold">Skills &amp; Expertise</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {skillCategories.map((category) => (
                <div key={category.id} className="group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {category.icon}
                    </span>
                    <h4 className="text-base font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3 pl-1">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
