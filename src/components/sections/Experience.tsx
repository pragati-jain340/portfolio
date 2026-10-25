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
            <SkillsExplorer categories={skillCategories} />
          </div>
        </div>
      </section>
    </>
  );
}
