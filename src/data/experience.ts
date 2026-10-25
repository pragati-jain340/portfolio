export interface Experience {
  id: string;
  role: string;
  company: string;
  logo?: string;
  logoStyle?: "roundel" | "wordmark";
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: "ai-engineer-intern-bmw-group",
    role: "AI Engineer Intern",
    company: "BMW Group (Munich)",
    logo: "/logos/bmw.webp",
    logoStyle: "roundel",
    period: "Jun 2026 – Sept 2026",
    description: [
    ]
  },
  {
    id: "research-intern-iit-bhu",
    role: "Research Intern",
    company: "IIT BHU",
    logo: "/logos/iit-bhu.png",
    period: "Dec 2025 – Apr 2026",
    description: [
      "Researching animal 3D reconstruction using SMAL + SDFit, diffusion models and ControlNet conditioning. Working on pose alignment, mesh fitting stability and reconstruction quality.",
      "Worked on satellite-based landslide detection using multi-spectral imagery with YOLO, UNet and Transformer segmentation models."
    ]
  },
  {
    id: "ai-intern-sourceworx",
    role: "AI Intern",
    company: "SourceWorx AI",
    logo: "/logos/sourceworx-ai.png",
    logoStyle: "wordmark",
    period: "Nov 2025 – Apr 2026",
    description: [
      "Developed a RAG-based pipeline where an AI meeting bot joins meetings, generates transcripts, and converts transcripts and BRDs into structured user stories, implementation code, and system design artifacts.",
      "Implemented asynchronous background processing using Redis queues and APScheduler with observability for monitoring pipeline execution.",
      "Built an AI-powered infographic generator that creates visual posts for companies based on trending news topics.",
      "Contributed to backend APIs using Django and PostgreSQL."
    ]
  },
  {
    id: "computer-team-mts-auv",
    role: "Computer Team Member",
    company: "MTS AUV",
    logo: "/logos/mts-auv.png",
    period: "Aug 2024 – Present",
    description: [
      "Worked on computer vision modules for underwater autonomous vehicles including PnP localization and feature tracking."
    ]
  }
];
