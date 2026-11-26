"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import styles from "@/app/Home.module.css";

export default function HeroSection() {
  const [transitionState, setTransitionState] = useState<"idle" | "leaving">("idle");
  const [curtainTop, setCurtainTop] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scrollToSectionInstantOrSmooth = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const handleAdvanceToNextSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 0) {
      event.currentTarget.blur();
    }
    if (transitionState !== "idle") return;

    const target = document.getElementById("experience");
    const heroEl = heroRef.current;
    if (!target || !heroEl) return;

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    const heroRect = heroEl.getBoundingClientRect();
    const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY + 2);
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;

    flushSync(() => {
      setCurtainTop(heroRect.top);
      setTransitionState("leaving");
    });

    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: targetTop, behavior: "instant" as ScrollBehavior });
    html.style.scrollBehavior = prevScrollBehavior;
    window.history.replaceState(null, "", "/#experience");

    resetTimerRef.current = window.setTimeout(() => {
      setTransitionState("idle");
      setCurtainTop(0);
    }, 920);
  };

  const handleCurtainAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (transitionState === "leaving" && event.target === event.currentTarget) {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      setTransitionState("idle");
      setCurtainTop(0);
    }
  };

  const [firstName, lastName] = profile.name.split(" ");

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="home"
      aria-labelledby="hero-name"
      data-transition={transitionState}
    >
      <div
        className={styles.curtain}
        style={transitionState === "leaving" ? { top: `${curtainTop}px` } : undefined}
        onAnimationEnd={handleCurtainAnimationEnd}
      >
        <div className={styles.stage}>
          {/* ── Center-left cutout portrait with floating badges ── */}
          <div className={styles.photoColumn}>
            <div className={styles.photoWrapper}>
              <Image
                src="/intro-hero.png"
                alt="Portrait of Pragati Jain"
                width={1122}
                height={1402}
                sizes="(max-width: 1023px) 360px, 520px"
                priority
                className={`${styles.portraitImg} select-none`}
              />

              <span className={`${styles.badge} ${styles.badgePrimary}`}>
                AI Engineer
              </span>
              <span className={`${styles.badge} ${styles.badgeSecondary}`}>
                <span>Computer Vision</span>
                <span className={styles.badgeAmp}>&amp;</span>
                <span>Agentic Systems</span>
              </span>
            </div>
          </div>

          {/* ── Bottom-left big stacked name with interactive arrow ── */}
          <div className={styles.bigNameRow}>
            <h1 id="hero-name">
              <span className={styles.greeting}>Hi, I am</span>
              <button
                type="button"
                onClick={handleAdvanceToNextSection}
                className={styles.bigName}
                aria-label="Pragati Jain — continue to experience section"
              >
                <span className={styles.nameLine}>{firstName}</span>
                <span className={styles.nameLine}>
                  {lastName}
                  <span className={styles.bigNameArrow} aria-hidden="true">→</span>
                </span>
              </button>
            </h1>
          </div>

          {/* ── Right bio column ── */}
          <div className={styles.contentColumn}>
            <span className={styles.thisIsMe}>This is me</span>

            <p className={styles.headline}>
              {profile.headline}
            </p>

            <p className={styles.bio}>
              {profile.bio[0]}
            </p>

            <div className={styles.actions}>
              <Link
                href="/#projects"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSectionInstantOrSmooth("projects");
                }}
                className={styles.primaryLink}
              >
                View projects
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </Link>
              <Link
                href="/#research"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSectionInstantOrSmooth("research");
                }}
                className={styles.secondaryLink}
              >
                Explore research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
