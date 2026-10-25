import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import ExperienceTimeline from "./ExperienceTimeline";
import EducationCards from "./EducationCards";

export default function Resume() {
  return (
    <>
      <section className="portfolio-section space-y-10 md:space-y-16" id="experience">
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
            <ExperienceTimeline experiences={experiences} />
          </div>

          {/* Education */}
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">school</span>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>
            <EducationCards education={education} />
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
    </>
  );
}
