export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  repo?: string;
  tags: string[];
}

export const projects: Project[] = [
  // Example data since projects weren't explicitly on the main resume page
  {
    id: "lagps",
    title: "From Rules to Pixels (LaGPS)",
    description: "Neuro-symbolic framework for detecting human-centric rule violations from images.",
    link: "https://openreview.net/forum?id=fSND55MrbT",
    tags: ["Neuro-symbolic AI", "Computer Vision", "PyTorch"]
  }
];
