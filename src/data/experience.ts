export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: "research-intern-iit-bhu",
    role: "Research Intern",
    company: "IIT BHU",
    period: "Dec 2024 – Present",
    description: [
      "Researching animal 3D reconstruction using SMAL + SDFit, diffusion models and ControlNet conditioning. Working on pose alignment, mesh fitting stability and reconstruction quality.",
      "Worked on satellite-based landslide detection using multi-spectral imagery with YOLO, UNet and Transformer segmentation models."
    ]
  },
  {
    id: "ai-intern-savgen",
    role: "AI Intern",
    company: "Savgen",
    period: "Nov 2025 – Present",
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
    period: "Aug 2024 – Present",
    description: [
      "Worked on computer vision modules for underwater autonomous vehicles including PnP localization and feature tracking."
    ]
  }
];
