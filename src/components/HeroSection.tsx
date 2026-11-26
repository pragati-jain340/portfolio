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
  const [heroVisible, setHeroVisible] = useState(true);
  const [heroReplayed, setHeroReplayed] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const nameRowRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const transitionStateRef = useRef(transitionState);

  const [firstName = "", lastName = ""] = profile.name.split(" ");
  const fullNameLength = firstName.length + 1 + lastName.length;
  const typedFirst = firstName.slice(0, Math.min(typedCount, firstName.length));
  const typedLast =
    typedCount > firstName.length + 1
      ? lastName.slice(0, typedCount - firstName.length - 1)
      : "";
  const showFirstCursor = typedCount <= firstName.length;
  const isTypingDone = typedCount >= fullNameLength;

  useEffect(() => {
    transitionStateRef.current = transitionState;
  }, [transitionState]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const targetEl = nameRowRef.current;
    if (!targetEl) return;

    let stepTimer: number | null = null;
    let loaderObserver: MutationObserver | null = null;
    let viewObserver: IntersectionObserver | null = null;
    let initialStarted = false;
    let hasLeftViewport = false;

    const clearTypingTimer = () => {
      if (stepTimer !== null) {
        window.clearTimeout(stepTimer);
        stepTimer = null;
      }
    };

    const tick = (count: number) => {
      setTypedCount(count);
      if (count >= fullNameLength) return;
      const delay = count === firstName.length ? 140 : 80;
      stepTimer = window.setTimeout(() => tick(count + 1), delay);
    };

    const scheduleTypewriter = (initialDelay: number) => {
      clearTypingTimer();
      setTypedCount(0);
      stepTimer = window.setTimeout(() => tick(1), initialDelay);
    };

    const resetOffscreen = () => {
      clearTypingTimer();
      setTypedCount(0);
      setHeroReplayed(true);
      setHeroVisible(false);
    };

    const startInitial = (initialDelay: number) => {
      if (initialStarted) return;
      initialStarted = true;
      loaderObserver?.disconnect();
      if (!hasLeftViewport) {
        scheduleTypewriter(initialDelay);
      }
    };

    const loader = document.querySelector(".intro-loader");
    const phase = loader?.getAttribute("data-phase");
    if (!loader || phase === "exiting" || phase === "done") {
      startInitial(loader ? 820 : 520);
    } else {
      loaderObserver = new MutationObserver(() => {
        const currentLoader = document.querySelector(".intro-loader");
        const nextPhase = currentLoader?.getAttribute("data-phase");
        if (!currentLoader) {
          startInitial(420);
        } else if (nextPhase === "exiting" || nextPhase === "done") {
          startInitial(820);
        }
      });
      loaderObserver.observe(loader, { attributes: true, attributeFilter: ["data-phase"] });
      if (loader.parentElement) {
        loaderObserver.observe(loader.parentElement, { childList: true });
      }
    }

    if ("IntersectionObserver" in window) {
      viewObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          if (!entry.isIntersecting || entry.intersectionRatio === 0) {
            hasLeftViewport = true;
            if (transitionStateRef.current !== "leaving") {
              resetOffscreen();
            }
          } else if (entry.intersectionRatio >= 0.25 && hasLeftViewport) {
            hasLeftViewport = false;
            setHeroReplayed(true);
            setHeroVisible(true);
            scheduleTypewriter(160);
          }
        },
        { threshold: [0, 0.25] }
      );
      viewObserver.observe(targetEl);
    }

    return () => {
      loaderObserver?.disconnect();
      viewObserver?.disconnect();
      clearTypingTimer();
    };
  }, [firstName.length, fullNameLength]);

  const finishLeavingCurtain = () => {
    setTransitionState("idle");
    setCurtainTop(0);
    const rect = nameRowRef.current?.getBoundingClientRect();
    if (rect && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
      setHeroReplayed(true);
      setHeroVisible(false);
      setTypedCount(0);
    }
  };

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

    resetTimerRef.current = window.setTimeout(finishLeavingCurtain, 920);
  };

  const handleCurtainAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (transitionState === "leaving" && event.target === event.currentTarget) {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      finishLeavingCurtain();
    }
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="home"
      aria-labelledby="hero-name"
      data-transition={transitionState}
      data-in-view={heroVisible ? "true" : "false"}
      data-replayed={heroReplayed ? "true" : "false"}
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
          <div ref={nameRowRef} className={styles.bigNameRow}>
            <h1 id="hero-name">
              <span className="sr-only">{profile.name}</span>
              <span className={styles.greeting}>Hi, I am</span>
              <button
                type="button"
                onClick={handleAdvanceToNextSection}
                className={styles.bigName}
                aria-label="Pragati Jain — continue to experience section"
              >
                <span className={`${styles.nameLine} ${styles.typeSlot}`}>
                  <span className={styles.typeGhost} aria-hidden="true">{firstName}</span>
                  <span className={styles.typeLive} aria-hidden="true">
                    {typedFirst}
                    {showFirstCursor && <span className={styles.typeCursor} />}
                  </span>
                </span>
                <span className={`${styles.nameLine} ${styles.typeSlot}`}>
                  <span className={styles.typeGhost} aria-hidden="true">
                    {lastName}
                    <span className={styles.bigNameArrow}>→</span>
                  </span>
                  <span className={styles.typeLive} aria-hidden="true">
                    {typedLast}
                    {!showFirstCursor && (
                      <span
                        className={`${styles.typeCursor} ${isTypingDone ? styles.typeCursorDone : ""}`}
                      />
                    )}
                    <span
                      className={`${styles.bigNameArrow} ${!isTypingDone ? styles.bigNameArrowHidden : ""}`}
                    >
                      →
                    </span>
                  </span>
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
