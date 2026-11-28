export interface Achievement {
  id: string;
  date: string;
  fullDate: string;
  title: string;
  shortTitle?: string;
  rank: string;
  shortRank: string;
  watermark: string;
  highlight?: boolean;
  organization: string;
  tabMeta: string;
  projectLabel?: string;
  projectHref?: string;
  certificateUrl?: string;
  certificateLabel?: string;
  image: string;
  imageAlt: string;
  description: string;
  icon: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "amulate-2025",
    date: "Dec 2025",
    fullDate: "December 2025",
    rank: "Winner",
    shortRank: "Winner",
    watermark: "01",
    highlight: true,
    title: "Amulate Hackathon",
    organization: "BMW Group",
    tabMeta: "Winner · BMW",
    projectLabel: "Agenda AI",
    projectHref: "/projects/agenda-ai",
    image: "/agenda-ai.png",
    imageAlt: "Agenda AI agentic workflow assistant preview",
    description: "Built Agenda AI, a personalized agentic system for automating daily workflows across email, GitHub, and Google Workspace. Awarded an AI Engineer internship at BMW Group, Munich.",
    icon: "emoji_events"
  },
  {
    id: "ignite-2025",
    date: "Oct 2025",
    fullDate: "October 2025",
    rank: "Winner",
    shortRank: "Winner",
    watermark: "02",
    highlight: true,
    title: "Ignite Hackathon",
    organization: "CodeChef × Starlab",
    tabMeta: "Winner · CodeChef × Starlab",
    projectLabel: "NewsSure",
    projectHref: "/projects/newssure",
    image: "/newssure.jpg",
    imageAlt: "NewsSure AI misinformation detection platform preview",
    description: "Built NewsSure, an AI-powered platform that verifies news credibility using NLP, OCR extraction, and semantic similarity to combat misinformation.",
    icon: "emoji_events"
  },
  {
    id: "isro-bah-2025",
    date: "Aug 2025",
    fullDate: "August 2025",
    rank: "Top 2 · Finalist",
    shortRank: "Top 2",
    watermark: "03",
    title: "ISRO Bharatiya Antariksh Hackathon",
    shortTitle: "ISRO Antariksh Hackathon",
    organization: "ISRO",
    tabMeta: "Top 2 · Problem statement",
    projectLabel: "Air Quality AI",
    projectHref: "/projects/bah-air-quality",
    certificateUrl: "https://drive.google.com/file/d/1X7dbCOUUFLZnQjWd94IjhvDB2812jgwU/view?usp=sharing",
    certificateLabel: "Grand Finale Certificate",
    image: "/bah.png",
    imageAlt: "Satellite-based PM2.5 air quality estimation project preview",
    description: "Ranked Top 2 for the given problem statement (Top 28 national finalists out of 8,400+ teams) for building an AI system estimating PM2.5 air quality across India from satellite data.",
    icon: "satellite_alt"
  },
  {
    id: "amu-best-internship-award",
    date: "2026",
    fullDate: "2026",
    rank: "Best Internship Award",
    shortRank: "Award",
    watermark: "04",
    highlight: true,
    title: "Best Internship Award",
    shortTitle: "AMU Recognition",
    organization: "Aligarh Muslim University",
    tabMeta: "Recognition · AMU",
    certificateUrl: "https://drive.google.com/file/d/1Eq3A13AfdDtyzjo5wr6wyDQ5Ls9aXv8m/view?usp=sharing",
    certificateLabel: "View Certificate",
    image: "/logos/amu.png",
    imageAlt: "Aligarh Muslim University emblem for Best Internship Award recognition",
    description: "Awarded the Best Internship Award by Aligarh Muslim University in recognition of engineering impact and internship performance.",
    icon: "workspace_premium"
  }
];
