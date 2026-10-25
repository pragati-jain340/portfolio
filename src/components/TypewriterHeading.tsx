"use client";

import { useEffect, useState } from "react";
import styles from "./TypewriterHeading.module.css";

const introduction = "Hello, I'm";

export default function TypewriterHeading({ name }: { name: string }) {
  const [characters, setCharacters] = useState(0);
  const [started, setStarted] = useState(false);
  const total = introduction.length + name.length;

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;
    let typing = false;
    const firstLineDuration = introduction.length * 85;

    const type = (time: number) => {
      if (startTime === null) {
        startTime = time;
        setStarted(true);
      }
      const elapsed = time - startTime;
      const count = elapsed <= firstLineDuration
        ? Math.floor(elapsed / 85)
        : introduction.length + Math.max(0, Math.floor((elapsed - firstLineDuration - 180) / 105));
      setCharacters(Math.min(total, count));
      if (count < total) frame = requestAnimationFrame(type);
    };

    const startWhenReady = () => {
      // Let the curtain finish so visitors see the complete typing animation.
      if (typing || document.querySelector(".intro-loader")) return;
      typing = true;
      observer.disconnect();
      frame = requestAnimationFrame(type);
    };
    const observer = new MutationObserver(startWhenReady);
    observer.observe(document.body, { childList: true });
    startWhenReady();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [name, total]);

  const complete = characters === total;
  return (
    <>
      <noscript><style>{`.${styles.ghost}{visibility:visible}.${styles.typed}{display:none}`}</style></noscript>
      <h1 className={`${styles.heading} text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter`} aria-label={`${introduction} ${name}`} data-complete={complete}>
        <span className={styles.line} aria-hidden="true">
          <span className={styles.ghost}>{introduction}</span>
          <span className={styles.typed}>
            {introduction.slice(0, characters)}
            {started && characters < introduction.length && <span className={styles.cursor} />}
          </span>
        </span>
        <span className={`${styles.line} text-primary`} aria-hidden="true">
          <span className={styles.ghost}>{name}</span>
          <span className={styles.typed}>
            {name.slice(0, Math.max(0, characters - introduction.length))}
            {started && characters >= introduction.length && <span className={styles.cursor} />}
          </span>
        </span>
      </h1>
    </>
  );
}
