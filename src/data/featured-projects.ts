export const projectTopics = ["Language Models", "Agentic AI", "Computer Vision", "Applied ML", "Full-Stack Web"] as const;

export interface FeaturedProject {
  id: string;
  category: string;
  topic: (typeof projectTopics)[number];
  title: string;
  description: string;
  tags: string[];
  icon: string;
  image?: string;
  imageAlt?: string;
  details?: string;
  report?: string;
  slides?: string;
  ppt?: string;
  code?: string;
  code1?: string;
  code2?: string;
  demo?: string;
  website?: string;
  video?: string;
}

export const lssSteganography = {
  id: "lss-steganography",
  category: "Computer Vision & Information Hiding",
  topic: "Computer Vision",
  title: "LSS Steganography",
  description: "I built a latent-space steganography pipeline that embeds compressed messages in images using DINOv2 features, perceptual masking, and error correction. The project recovered payloads after JPEG compression down to quality 40.",
  tags: ["DINOv2 ViT-L/14", "EOT", "DiffJPEG", "BCH Codes", "Brotli", "tiktoken", "Streamlit"],
  icon: "encrypted",
  image: "/lss-steganography.webp",
  imageAlt: "Concept illustration showing a tiled landscape photograph and three stages: prepare payload, DINOv2-guided embedding, and recover message.",
  details: "/projects/lss-steganography",
} satisfies FeaturedProject;

export const featuredProjects: FeaturedProject[] = [
  {
    id: "dkd-qwen",
    category: "Biomedical Language Models",
    topic: "Language Models",
    title: "DKD-Qwen",
    description: "Adapted Qwen3.5-4B-Base for diabetic kidney disease research through continued pretraining. In Phase I, we curated a 163M-token corpus and trained on a single NVIDIA H100, reducing perplexity on held-out DKD text by 6.8%.",
    tags: ["Qwen3.5-4B", "Continued Pretraining", "Corpus Curation", "Model Evaluation"],
    icon: "biotech",
    image: "/dkd-qwen.webp",
    imageAlt: "DKD literature flows through corpus curation and continued pretraining to held-out evaluation.",
    report: "https://drive.google.com/file/d/1opqUEAgJKwzGbYFq3eTkFy-2AyULjePE/view?usp=sharing",
    slides: "https://drive.google.com/file/d/1NpzkRzS6UEUG6q5DRP4mnlQMy-YLg8NJ/view?usp=sharing",
  },
  lssSteganography,
  {
    id: "agenda-ai",
    category: "Agentic AI System",
    topic: "Agentic AI",
    title: "Agenda AI",
    description: "Agent-based AI assistant that autonomously manages meeting scheduling, calendar coordination, email communication, and GitHub tasks. Built using LangGraph to enable tool-using workflows with observability for monitoring and debugging agent execution.",
    tags: ["Python", "LangGraph", "LangChain", "Agentic AI", "OAuth", "GitHub API"],
    icon: "smart_toy",
    image: "/agenda-ai.png",
    ppt: "https://www.canva.com/design/DAHD5-8puqw/pS3S6YjDUWyWXqS05edvDg/view?utm_content=DAHD5-8puqw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hbd4f173b38",   // TODO: replace with actual PPT link
    code: "https://github.com/pragati-jain340/agenda.git",  // TODO: replace with actual code link
    demo: "https://agenda-ai.streamlit.app/",   // TODO: replace with actual demo link
    video: "https://www.youtube.com/watch?v=uraJtd_OI_o"
  },
  {
    id: "bah-air-quality",
    category: "AI for Environmental Monitoring",
    topic: "Applied ML",
    title: "Satellite-Based Air Quality Estimation (ISRO Hackathon)",
    description: "AI system for estimating ground-level PM2.5 concentrations using satellite data. Built an ensemble ML pipeline combining Random Forest, XGBoost, and LightGBM with feature engineering and hyperparameter tuning to predict air quality across India. Project ranked Top 2 for the given problem statement (Top 28 out of 8,400+ teams) in the ISRO Bharatiya Antariksh Hackathon.",
    tags: ["Python", "Machine Learning", "Random Forest", "XGBoost", "LightGBM", "Satellite Data"],
    icon: "satellite_alt",
    image: "/bah.png",
    ppt: "https://www.canva.com/design/DAGu8hzLS7M/oL72B1kiJ8VX4_jioPG8-A/view?utlId=h5264dfd6f7#1",   // TODO: replace with actual PPT link
    code: "#",  // TODO: replace with actual code link
  },
  {
    id: "newssure",
    category: "AI News Verification",
    topic: "Applied ML",
    title: "NewsSure",
    description: "AI-powered misinformation detection platform that verifies news claims from text, images, and links. Uses OCR for content extraction and NLP-based semantic similarity and stance analysis to compare claims with trusted sources and generate a credibility Truth Score.",
    tags: ["Python", "Django", "NLP", "PaddleOCR", "BART", "Trafilatura"],
    icon: "fact_check",
    image: "/newssure.jpg",
    ppt: "https://www.canva.com/design/DAG1hBQCUdQ/jLhRkG2ors_WmiblLnepXg/view?utlId=hf1a14976c0",   // TODO: replace with actual PPT link
    code: "https://github.com/pragati-jain340/NewsSure.git",  // TODO: replace with actual code link
  },
  {
    id: "theastrokaur",
    category: "Full-Stack Web Platform",
    topic: "Full-Stack Web",
    title: "TheAstroKaur",
    description: "Vedic astrology consultation website built with Next.js, React, TypeScript, Tailwind CSS, and Supabase, deployed on Vercel. Features reading service showcases, consultation booking with Google Calendar integration, Edge Functions, responsive light/dark modes, and client review sections.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Google Calendar"],
    icon: "auto_awesome",
    image: "/theastrokaur.jpg",
    imageAlt: "TheAstroKaur website preview across laptop and mobile screens featuring celestial typography, zodiac chart wheel illustration, and consultation CTAs.",
    code: "https://github.com/pragati-jain340/TheAstroKaur",
    website: "https://theastrokaur-astro-kaur-web.vercel.app/",
  },
  {
    id: "hand-pose-tracking",
    category: "Computer Vision",
    topic: "Computer Vision",
    title: "Gate Pose Estimation & Hand Tracking",
    description: "Real-time computer vision system for hand tracking, gesture recognition, and camera orientation estimation. Uses MediaPipe Hands for keypoint detection combined with optical flow, epipolar geometry, and PnP-based pose estimation to track hand motion and compute orientation in real time.",
    tags: ["Python", "OpenCV", "MediaPipe", "Optical Flow", "PnP", "Epipolar Geometry"],
    icon: "pan_tool",
    image: "/hand-tracking.png",
    code1: "https://github.com/pragati-jain340/Hand_Tracking-and-Finger_Counting.git",
    code2: "https://github.com/pragati-jain340/gate-pose-estimation-with-gesture.git",
  }
];
