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
    "Currently building **AI pipelines at Savgen** while researching **3D reconstruction** and **visual understanding** at **IIT BHU**.",
    "Co-author of the NeurIPS MusIML workshop paper **From Rules to Pixels (LaGPS)**."
  ]
};
