export interface ResearchItem {
  id: string;
  title: string;
  institution?: string;
  period?: string;
  tags?: string[];
  description: string[];
  illustration?: {
    src: string;
    alt: string;
  };
  results?: { value: string; label: string }[];
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
      "Introduced the HRS benchmark and evaluated LaGPS against CLIPSeg and Grounded SAM."
    ],
    results: [
      { value: "1,100", label: "annotated HRS images" },
      { value: "+19.4%", label: "mIoU improvement" },
    ],
    illustration: {
      src: "/research-lagps.webp",
      alt: "The rule “Forearms must be covered” appears above a workshop image and a second panel with the exposed forearm highlighted by a segmentation mask.",
    },
    link: "https://openreview.net/forum?id=fSND55MrbT",
    linkLabel: "View Paper"
  },
  {
    id: "iit-bhu-intern",
    title: "Research Intern",
    institution: "IIT BHU",
    period: "Dec 2024 – Apr 2026",
    illustration: {
      src: "/research-iit-bhu.webp",
      alt: "A fox transitions from a photograph to a 3D mesh beside stacked satellite imagery with a highlighted landslide area.",
    },
    description: [
      "Researching animal 3D reconstruction using SMAL + SDFit, diffusion models and ControlNet conditioning. Working on pose alignment, mesh fitting stability and reconstruction quality.",
      "Worked on satellite-based landslide detection using multi-spectral imagery with YOLO, UNet and Transformer segmentation models."
    ]
  }
];
