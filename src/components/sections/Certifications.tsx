"use client";

import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { certificationsData, type Certification } from "@/data/certifications";
import styles from "./Certifications.module.css";

const AUTO_CYCLE_MS = 5500;

function HolographicPass({ cert }: { cert: Certification }) {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springX = useSpring(rawX, { stiffness: 260, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width);
    rawY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <div
      className={styles.stagePerspective}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Stacked deck depth cards peeking behind */}
      <span className={styles.deckLayerBack} aria-hidden="true" />
      <span className={styles.deckLayerMid} aria-hidden="true" />

      <motion.div
        className={styles.passCard}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Persistent frame decorations (no flicker on switch) */}
        <span className={styles.borderBeam} aria-hidden="true" />
        <span className={styles.gridPattern} aria-hidden="true" />
        <motion.span
          className={styles.autoShimmer}
          animate={{ x: ["-130%", "230%"] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 4,
            duration: 1.5,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={cert.id}
            className={styles.passContent}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top Bar: Issuer + Animated Seal */}
            <div className={styles.passTop}>
              <div className={styles.issuerBadge}>
                <span className={styles.issuerPulse} aria-hidden="true" />
                <span>{cert.issuer}</span>
              </div>

              <div className={styles.sealWrap}>
                <motion.span
                  className={styles.sealRing}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                  aria-hidden="true"
                />
                <motion.span
                  className={styles.sealRingInner}
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                  aria-hidden="true"
                />
                <span className="material-symbols-outlined" aria-hidden="true">
                  {cert.icon}
                </span>
              </div>
            </div>

            {/* Center: Credential Title + Staggered Skill Chips */}
            <div className={styles.passBody}>
              <span className={styles.passCategory}>{cert.category}</span>
              <h3 className={styles.passTitle}>{cert.title}</h3>
              <ul className={styles.passSkills} aria-label="Skills covered">
                {cert.skills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    className={styles.passSkill}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: 0.06 + idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom Bar: Serial + Crisp Open CTA */}
            <div className={styles.passFooter}>
              <span className={styles.serialCode}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  verified
                </span>
                CERT // {cert.index} · VERIFIED
              </span>
              <motion.a
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 24 }}
                className={styles.openBtn}
                aria-label={`Open ${cert.title} certificate by ${cert.issuer}`}
              >
                <span>Open Certificate</span>
                <svg
                  className={styles.openArrow}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeCert = certificationsData[activeIndex] ?? certificationsData[0];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % certificationsData.length);
    }, AUTO_CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % certificationsData.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + certificationsData.length) % certificationsData.length;
    } else {
      return;
    }
    event.preventDefault();
    setActiveIndex(next);
  };

  return (
    <section
      className={`portfolio-section ${styles.section}`}
      id="certifications"
      aria-labelledby="certifications-heading"
    >
        <div className={styles.container}>
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className={styles.eyebrow}>Credentials &amp; Learning</span>
              <h2 id="certifications-heading" className={styles.heading}>
                Certifications.
              </h2>
            </div>
            <div className={styles.counterWrap}>
              <span className={styles.counter} aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeCert.index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={styles.counterActive}
                  >
                    {activeCert.index}
                  </motion.span>
                </AnimatePresence>
                <span className={styles.counterSlash}>/</span>
                <span>{String(certificationsData.length).padStart(2, "0")}</span>
              </span>
            </div>
          </motion.header>

          <motion.div
            className={styles.vaultGrid}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {/* Left: 3D Tilt Holographic Credential Pass */}
            <HolographicPass cert={activeCert} />

            {/* Right: Interactive Credential Selector Stack */}
            <div
              className={styles.selectorList}
              role="tablist"
              aria-label="Select a certification"
            >
              {certificationsData.map((cert, index) => {
                const isSelected = index === activeIndex;
                return (
                  <motion.button
                    key={cert.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className={styles.selectorItem}
                    data-active={isSelected}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="active-cert-bg"
                        className={styles.selectorActiveBg}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}

                    {/* Auto-cycle progress bar on active item */}
                    {isSelected && !isPaused && (
                      <motion.span
                        key={`progress-${cert.id}`}
                        className={styles.progressBar}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: AUTO_CYCLE_MS / 1000,
                          ease: "linear",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <span className={styles.selectorIcon}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {cert.icon}
                      </span>
                    </span>

                    <span className={styles.selectorText}>
                      <span className={styles.selectorTitle}>{cert.title}</span>
                      <span className={styles.selectorIssuer}>
                        {cert.issuer} · {cert.category}
                      </span>
                    </span>

                    <svg
                      className={styles.selectorChevron}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
  );
}
