"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, inView } from "motion";
import { researchData } from "@/data/research";
import styles from "./Research.module.css";

export default function Research() {
  const entries = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = entries.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    return inView(container.querySelectorAll("article"), (entry) => {
      animate(entry, { opacity: [0.9, 1], y: [8, 0] }, { duration: 0.35, ease: "easeOut" });
    }, { amount: 0.2 });
  }, []);

  return (
    <section className={`portfolio-section ${styles.section}`} id="research" aria-labelledby="research-title">
      <h2 id="research-title" className={styles.title}>Research &amp; Publications</h2>

      <div ref={entries} className={styles.entries}>
        {researchData.map((item) => (
          <article key={item.id} className={styles.entry} aria-labelledby={`research-${item.id}`}>
            <header className={styles.heading}>
              <div className={styles.metadata}>
                <p className={styles.institution}>{item.institution}</p>
                <p className={styles.period}>{item.period}</p>
              </div>
              <h3 id={`research-${item.id}`}>{item.title}</h3>
            </header>

            {item.illustration && (
              <figure className={styles.illustration}>
                <a
                  href={item.illustration.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full-size illustration for ${item.title} (opens in a new tab)`}
                >
                  <Image
                    src={item.illustration.src}
                    alt={item.illustration.alt}
                    width={288}
                    height={162}
                    sizes="(min-width: 760px) 288px, min(288px, 85vw)"
                  />
                </a>
              </figure>
            )}

            <div className={styles.body}>
              {item.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {(item.results || item.link) && (
                <div className={styles.details}>
                  {item.results && (
                    <ul className={styles.results} aria-label="LaGPS benchmark results">
                      {item.results.map(({ value, label }) => (
                        <li key={label}><strong>{value}</strong><span>{label}</span></li>
                      ))}
                    </ul>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.paperLink}>
                      {item.linkLabel || "View Paper"}
                      <span className="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
