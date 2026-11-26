import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import ExperienceTimeline from "./ExperienceTimeline";
import EducationCards from "./EducationCards";
import SkillsExplorer from "./SkillsExplorer";

export default function Resume() {
  return (
    <>
      <section className="portfolio-section space-y-10 md:space-y-16" id="experience">
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">Professional Journey</h2>
          <p className="text-sm sm:text-base text-text-light-secondary dark:text-text-dark-secondary">
            My work experience, education, and technical skills.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {/* Work Experience */}
          <div className="glass-card p-3.5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-10">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-4xl">work</span>
              <h3 className="text-xl sm:text-3xl font-bold">Work Experience</h3>
            </div>
            <ExperienceTimeline experiences={experiences} />
          </div>

          {/* Education */}
          <div className="glass-card p-3.5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-4xl">school</span>
              <h3 className="text-xl sm:text-3xl font-bold">Education</h3>
            </div>
            <EducationCards education={education} />
          </div>

          {/* Skills */}
          <section className="glass-card rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-8 md:px-12 md:py-8" id="skills" aria-labelledby="skills-title">
            <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl" aria-hidden="true">military_tech</span>
              <h3 id="skills-title" className="text-xl sm:text-2xl md:text-3xl font-bold">Skills &amp; Expertise</h3>
            </div>
            <SkillsExplorer categories={skillCategories} />
          </section>
        </div>
      </section>
    </>
  );
}
