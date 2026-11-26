"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { achievementsData } from "@/data/achievements";
import styles from "./Achievements.module.css";

export default function Achievements() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (achievementsData.length === 0) {
    return (
      <section className={`portfolio-section ${styles.section}`} id="achievements">
        <div className="max-w-6xl mx-auto text-center py-16">
          <h2 className={styles.heading}>Achievements.</h2>
          <p className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">Coming soon...</p>
        </div>
      </section>
    );
  }

  const active = achievementsData[activeIndex] ?? achievementsData[0];
  const totalLabel = String(achievementsData.length).padStart(2, "0");

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % achievementsData.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + achievementsData.length) % achievementsData.length;
    } else {
      return;
    }
    event.preventDefault();
    setActiveIndex(next);
  };

  return (
    <section className={`portfolio-section ${styles.section}`} id="achievements">
      <div className={styles.container}>
        {/* ── Top Header Row ── */}
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Honors &amp; Recognition</span>
            <h2 className={styles.heading}>Achievements.</h2>
            <p className={styles.subheading}>
              Milestones along my research and engineering journey.
            </p>
          </div>
          <div className={styles.counter} aria-live="polite">
            <span>{active.watermark}</span>
            <span className={styles.counterSep}>/</span>
            <span>{totalLabel}</span>
          </div>
        </header>

        {/* ── Spotlight Body ── */}
        <div id="achievement-spotlight-panel" role="tabpanel" className={styles.spotlight}>
          <div key={active.id} className={styles.spotlightInner}>
            {/* Left Copy */}
            <div className={styles.copyCol}>
              <span
                className={styles.rankBadge}
                data-winner={active.highlight ? "true" : undefined}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {active.icon}
                </span>
                <span>{active.rank}</span>
              </span>

              <p className={styles.org}>{active.organization}</p>
              <h3 className={styles.title}>{active.title}.</h3>
              <p className={styles.date}>{active.fullDate}</p>
              <p className={styles.description}>{active.description}</p>

              <Link href={active.projectHref} className={styles.ctaLink}>
                <span>Explore {active.projectLabel}</span>
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Right Browser-Framed Visual Mat */}
            <div className={styles.visualCol}>
              <div className={styles.mat}>
                <span className={styles.matCircle} aria-hidden="true" />
                <div className={styles.browserFrame}>
                  <div className={styles.browserBar} aria-hidden="true">
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.mediaBox}>
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 560px, 92vw"
                      className={styles.mediaImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom 3-Tab Switcher Rail ── */}
        <div className={styles.bottomTabs} role="tablist" aria-label="Achievements selector">
          {achievementsData.map((item, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="achievement-spotlight-panel"
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={styles.tabItem}
              >
                <span className={styles.tabLine} aria-hidden="true" />
                <div className={styles.tabTop}>
                  <span className={styles.tabNum}>{item.watermark}</span>
                  <span className={styles.tabArrow} aria-hidden="true">↗</span>
                </div>
                <span className={styles.tabTitle}>{item.shortTitle ?? item.title}</span>
                <span className={styles.tabMeta}>{item.tabMeta}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
