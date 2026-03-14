export interface ResearchItem {
  id: string;
  title: string;
  institution?: string;
  period?: string;
  tags?: string[];
  description: string[];
  link?: string;
  linkLabel?: string;
}

export const researchData: ResearchItem[] = [
  {
    id: "neurips-lagps",
    title: "From Rules to Pixels (LaGPS)",
    institution: "NeurIPS MusIML Workshop",
    period: "Sept 2025",
    description: [
      "Co-authored a research paper proposing LaGPS, a neuro-symbolic framework for detecting human-centric rule violations from images.",
      "Introduced the HRS benchmark (1,100 annotated images) and achieved +19.4% mIoU improvement over CLIPSeg and Grounded SAM baselines."
    ],
    link: "https://openreview.net/forum?id=fSND55MrbT",
    linkLabel: "View Paper"
  },
  {
    id: "iit-bhu-intern",
    title: "Research Intern",
    institution: "IIT BHU",
    period: "Dec 2024 – Present (Ongoing)",
    description: [
      "Researching animal 3D reconstruction using SMAL + SDFit, diffusion models and ControlNet conditioning. Working on pose alignment, mesh fitting stability and reconstruction quality.",
      "Worked on satellite-based landslide detection using multi-spectral imagery with YOLO, UNet and Transformer segmentation models."
    ]
  }
];
