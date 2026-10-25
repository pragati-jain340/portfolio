export interface Education {
  id: string;
  degree: string;
  institution: string;
  logo: string;
  period: string;
  score: string;
}

export const education: Education[] = [
  {
    id: "btech-amu",
    degree: "B.Tech Computer Engineering",
    institution: "Aligarh Muslim University",
    logo: "/logos/amu.png",
    period: "2023 – 2027",
    score: "CGPA: 8.817 / 10"
  },
  {
    id: "xii-threedots",
    degree: "Senior Secondary (Class XII)",
    institution: "Three Dots Sewamarg Public School",
    logo: "/logos/three-dots-school.png",
    period: "2021 – 2022",
    score: "Percentage: 93.4%"
  },
  {
    id: "x-threedots",
    degree: "High school",
    institution: "Three Dots Sewamarg Public School",
    logo: "/logos/three-dots-school.png",
    period: "2019 – 2020",
    score: "Percentage: 92.6%"
  }
];
