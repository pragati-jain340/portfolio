export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "core-ai-ml",
    title: "Core AI / ML",
    icon: "psychology",
    skills: ["Python", "Deep Learning", "Transformers", "Machine Learning", "RAG", "Computer Vision"]
  },
  {
    id: "frameworks-libraries",
    title: "Frameworks / Libraries",
    icon: "code_blocks",
    skills: ["PyTorch", "TensorFlow", "OpenCV", "LangChain", "LangGraph"]
  },
  {
    id: "data-visualization",
    title: "Data / Visualization",
    icon: "bar_chart",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn"]
  },
  {
    id: "backend-systems",
    title: "Backend / Systems",
    icon: "dns",
    skills: ["Django", "PostgreSQL", "Redis", "Git"]
  }
];
