export interface Profile {
  name: string;
  titles: string[];
  bio: string[];
}

export const profile: Profile = {
  name: "Pragati",
  // We can join this by " | " in the UI
  titles: ["AI Engineer", "Computer Vision", "Agentic Systems"],
  bio: [
    "Working on **Agentic AI**, **Computer Vision**, **Deep Learning**, and **Machine Learning**. B.Tech Computer Engineering @ Aligarh Muslim University.",
    "Currently an **AI Engineer Intern at BMW Group (Munich)**, with prior experience building AI pipelines at **SourceWorx AI** and research background at **IIT BHU**.",
    "Co-author of the NeurIPS MusIML workshop paper **From Rules to Pixels (LaGPS)**."
  ]
};
