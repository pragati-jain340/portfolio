export interface FeaturedProject {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  image?: string;
  ppt?: string;
  code?: string;
  code1?: string;
  code2?: string;
  demo?: string;
  video?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "agenda-ai",
    category: "Agentic AI System",
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
    title: "Satellite-Based Air Quality Estimation (ISRO Hackathon)",
    description: "AI system for estimating ground-level PM2.5 concentrations using satellite data. Built an ensemble ML pipeline combining Random Forest, XGBoost, and LightGBM with feature engineering and hyperparameter tuning to predict air quality across India. Project selected as Top 28 out of 8400+ teams in the ISRO Bharatiya Antarashtriya Hackathon.",
    tags: ["Python", "Machine Learning", "Random Forest", "XGBoost", "LightGBM", "Satellite Data"],
    icon: "satellite_alt",
    image: "/bah.png",
    ppt: "https://www.canva.com/design/DAGu8hzLS7M/oL72B1kiJ8VX4_jioPG8-A/view?utlId=h5264dfd6f7#1",   // TODO: replace with actual PPT link
    code: "#",  // TODO: replace with actual code link
  },
  {
    id: "newssure",
    category: "AI News Verification",
    title: "NewsSure",
    description: "AI-powered misinformation detection platform that verifies news claims from text, images, and links. Uses OCR for content extraction and NLP-based semantic similarity and stance analysis to compare claims with trusted sources and generate a credibility Truth Score.",
    tags: ["Python", "Django", "NLP", "PaddleOCR", "BART", "Trafilatura"],
    icon: "fact_check",
    image: "/newssure.jpg",
    ppt: "https://www.canva.com/design/DAG1hBQCUdQ/jLhRkG2ors_WmiblLnepXg/view?utlId=hf1a14976c0",   // TODO: replace with actual PPT link
    code: "https://github.com/pragati-jain340/NewsSure.git",  // TODO: replace with actual code link
  },
  {
    id: "hand-pose-tracking",
    category: "Computer Vision",
    title: "Gate Pose Estimation & Hand Tracking",
    description: "Real-time computer vision system for hand tracking, gesture recognition, and camera orientation estimation. Uses MediaPipe Hands for keypoint detection combined with optical flow, epipolar geometry, and PnP-based pose estimation to track hand motion and compute orientation in real time.",
    tags: ["Python", "OpenCV", "MediaPipe", "Optical Flow", "PnP", "Epipolar Geometry"],
    icon: "pan_tool",
    image: "/hand-tracking.png",
    code1: "https://github.com/pragati-jain340/Hand_Tracking-and-Finger_Counting.git",
    code2: "https://github.com/pragati-jain340/gate-pose-estimation-with-gesture.git",
  }
];
