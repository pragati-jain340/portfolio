export interface Certification {
  id: string;
  index: string;
  title: string;
  issuer: string;
  category: string;
  icon: string;
  skills: string[];
  certificateUrl: string;
}

export const certificationsData: Certification[] = [
  {
    id: "iit-kanpur-ml",
    index: "01",
    title: "Machine Learning",
    issuer: "IIT Kanpur",
    category: "AI & Machine Learning",
    icon: "neurology",
    skills: ["Supervised Learning", "Model Evaluation", "Feature Engineering"],
    certificateUrl: "https://drive.google.com/file/d/1oJgVjxAzUHvqTuCAgloXrp3HUhZZ42YF/view?usp=sharing",
  },
  {
    id: "nptel-cloud-computing",
    index: "02",
    title: "Cloud Computing",
    issuer: "NPTEL",
    category: "Cloud & Infrastructure",
    icon: "cloud_done",
    skills: ["Distributed Systems", "Virtualization", "Cloud Architecture"],
    certificateUrl: "https://drive.google.com/file/d/1s9mFKeqwWsSTiA4oZMG7sCxjBMM0NMyi/view?usp=sharing",
  },
  {
    id: "opencv-bootcamp",
    index: "03",
    title: "OpenCV Certification",
    issuer: "OpenCV",
    category: "Computer Vision",
    icon: "visibility",
    skills: ["Image Processing", "Feature Detection", "Computer Vision"],
    certificateUrl: "https://drive.google.com/file/d/1FYFGy69zntEVyxBpe1qgQ4m2KOn70U5W/view?usp=sharing",
  },
  {
    id: "iit-kanpur-excel",
    index: "04",
    title: "Microsoft Excel",
    issuer: "IIT Kanpur",
    category: "Data & Analytics",
    icon: "table_chart",
    skills: ["Data Analysis", "Formulas & Modeling", "Visualization"],
    certificateUrl: "https://drive.google.com/file/d/1zgnu1Osf-NWVcxjmVQ_De123dduPKxX3/view?usp=sharing",
  },
];
