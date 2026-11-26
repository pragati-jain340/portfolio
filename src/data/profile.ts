export interface Profile {
  name: string;
  titles: string[];
  headline: string;
  bio: string[];
}

export const profile: Profile = {
  name: "Pragati Jain",
  titles: ["AI Engineer", "Computer Vision", "Agentic Systems"],
  headline: "AI engineer, researcher and Computer Engineering student at AMU, India.",
  bio: [
    "My work spans AI agents, large language models and computer vision, combining academic research with real-world engineering experience."
  ]
};
