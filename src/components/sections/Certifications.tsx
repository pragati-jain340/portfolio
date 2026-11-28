"use client";

import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { certificationsData, type Certification } from "@/data/certifications";
import styles from "./Certifications.module.css";

const AUTO_CYCLE_MS = 5500;

function HolographicPass({ cert }: { cert: Certification }) {
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springX = useSpring(rawX, { stiffness: 260, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
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

      <AnimatePresence mode="wait">
        <motion.div
          key={cert.id}
          className={styles.passCard}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 18, scale: 0.96, rotateX: 6 }
          }
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -14, scale: 0.96, rotateX: -6 }
          }
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated rotating border beam + subtle dot grid + periodic shimmer */}
          <span className={styles.borderBeam} aria-hidden="true" />
          <span className={styles.gridPattern} aria-hidden="true" />
          <motion.span
            className={styles.autoShimmer}
            animate={
              prefersReducedMotion
                ? undefined
                : { x: ["-130%", "230%"] }
            }
            transition={{
              repeat: Infinity,
              repeatDelay: 4,
              duration: 1.5,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />

          {/* Top Bar: Issuer + Animated Seal */}
          <div className={styles.passTop}>
            <div className={styles.issuerBadge}>
              <span className={styles.issuerPulse} aria-hidden="true" />
              <span>{cert.issuer}</span>
            </div>

            <div className={styles.sealWrap}>
              <motion.span
                className={styles.sealRing}
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                aria-hidden="true"
              />
              <motion.span
                className={styles.sealRingInner}
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
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
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.05,
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
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
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
    </div>
  );
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeCert = certificationsData[activeIndex] ?? certificationsData[0];

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificationsData.length);
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
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
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
                  whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
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
                  {isSelected && !isPaused && !prefersReducedMotion && (
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
