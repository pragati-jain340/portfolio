"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import type { Education } from "@/data/education";
import styles from "./EducationCards.module.css";

export default function EducationCards({ education }: { education: Education[] }) {
  const grid = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = grid.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    element.dataset.enhanced = "true";
    Array.from(element.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={grid} className={styles.grid}>
      {education.map((entry, index) => (
        <li
          key={entry.id}
          className={styles.item}
          style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
        >
          <article className={styles.card} data-current={entry.id === "btech-amu"}>
            <div className={styles.header}>
              <span className={styles.logo}>
                <Image src={entry.logo} alt={`${entry.institution} logo`} width={56} height={56} />
              </span>
              {entry.id === "btech-amu" && <span className={styles.current}>Currently studying</span>}
            </div>
            <h4 className={styles.degree}>{entry.degree}</h4>
            <p className={styles.institution}>{entry.institution}</p>
            <div className={styles.details}>
              <span className={styles.period}>
                <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                {entry.period}
              </span>
              <span className={styles.score}>
                <span className="material-symbols-outlined" aria-hidden="true">grade</span>
                {entry.score}
              </span>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
