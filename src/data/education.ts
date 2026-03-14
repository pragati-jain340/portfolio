export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export const education: Education[] = [
  {
    id: "btech-amu",
    degree: "B.Tech Computer Engineering",
    institution: "Aligarh Muslim University",
    period: "2023 – 2027",
    score: "CGPA: 8.8 / 10"
  },
  {
    id: "xii-threedots",
    degree: "Senior Secondary (Class XII)",
    institution: "Three Dots Sewamarg Public School",
    period: "2021 – 2022",
    score: "Percentage: 93.4%"
  },
  {
    id: "x-threedots",
    degree: "High school",
    institution: "Three Dots Sewamarg Public School",
    period: "2019 – 2020",
    score: "Percentage: 92.6%"
  }
];
