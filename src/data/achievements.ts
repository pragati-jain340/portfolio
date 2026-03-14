export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  icon?: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "amulate-2025",
    date: "Dec 2025",
    title: "2nd Position — Amulate Hackathon",
    organization: "BMW Group @ AMU",
    description: "Secured 2nd position for building 'Agenda AI', a personalized agentic AI system that automates daily workflows including email management, GitHub interactions, and Google Workspace scheduling.",
    icon: "emoji_events"
  },
  {
    id: "ignite-2025",
    date: "Oct 2025",
    title: "Winner — Ignite Hackathon",
    organization: "CodeChef × Starlab",
    description: "Built 'NewsSure', an AI-powered system that verifies the credibility of news articles using NLP, OCR extraction, and semantic similarity to combat misinformation.",
    icon: "local_fire_department"
  },
  {
    id: "isro-bah-2025",
    date: "Aug 2025",
    title: "National Finalist — ISRO Bharatiya Antariksh Hackathon",
    organization: "ISRO",
    description: "Selected among the Top 28 national finalist teams for developing an AI-based system that estimates PM2.5 air quality levels across India using satellite data and ensemble machine learning models.",
    icon: "satellite_alt"
  }
];
