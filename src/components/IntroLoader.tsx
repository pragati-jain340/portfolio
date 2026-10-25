"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { INTRO_SENTENCE, introCharacterCount } from "@/lib/intro-playback";
import styles from "./IntroLoader.module.css";

type PlaybackMode = "loading" | "playing" | "paused" | "ended" | "blocked" | "error";
const VIDEO = "/robot-intro.mp4";
const POSTER = "/robot-intro-poster.jpg";

export default function IntroLoader() {
  const [phase, setPhase] = useState<"active" | "exiting" | "done">("active");
  const [mode, setMode] = useState<PlaybackMode>("loading");
  const [characters, setCharacters] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const modeRef = useRef<PlaybackMode>("loading");
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finished = phase === "done";

  const updateMode = useCallback((next: PlaybackMode) => {
    modeRef.current = next;
    if (next !== "loading" && loadTimer.current) {
      clearTimeout(loadTimer.current);
      loadTimer.current = null;
    }
    setMode(next);
  }, []);

  const showFallback = useCallback((next: "blocked" | "error") => {
    updateMode(next);
    video.current?.pause();
    setCharacters(INTRO_SENTENCE.length);
  }, [updateMode]);

  useEffect(() => {
    if (finished) return;
    const media = video.current;
    if (!media) return;
    let disposed = false;
    let attempted = false;
    const start = () => {
      if (disposed || attempted || document.visibilityState !== "visible") return;
      attempted = true;
      if (media.ended) {
        setHasPlayed(true);
        updateMode("ended");
        setCharacters(INTRO_SENTENCE.length);
        setPhase("exiting");
        return;
      }
      updateMode("loading");
      media.muted = true;
      media.defaultMuted = true;
      loadTimer.current = setTimeout(() => {
        if (!disposed && modeRef.current === "loading") showFallback("error");
      }, 6000);
      // Native autoplay can begin before hydration; don't reload or restart it.
      void media.play().then(() => {
        if (disposed) return;
        setHasPlayed(true);
        updateMode("playing");
      }).catch(() => {
        if (!disposed) showFallback("blocked");
      });
    };
    const frame = requestAnimationFrame(start);
    document.addEventListener("visibilitychange", start);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (loadTimer.current) clearTimeout(loadTimer.current);
      document.removeEventListener("visibilitychange", start);
      modeRef.current = "loading";
      media.pause();
    };
  }, [finished, showFallback, updateMode]);

  useEffect(() => {
    if (mode !== "playing" || phase !== "active") return;
    let frame = 0;
    const synchronize = () => {
      if (video.current) setCharacters(introCharacterCount(video.current.currentTime));
      frame = requestAnimationFrame(synchronize);
    };
    frame = requestAnimationFrame(synchronize);
    return () => cancelAnimationFrame(frame);
  }, [mode, phase]);

  useEffect(() => {
    if (finished) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const content = Array.from(document.querySelectorAll<HTMLElement>("body > main, body > nav, body > footer"));
    const previousInert = content.map((element) => element.inert);
    content.forEach((element) => { element.inert = true; });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("exiting");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      content.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [finished]);

  useEffect(() => {
    if (phase !== "exiting") return;
    video.current?.pause();
    // Preserve the curtain's existing animation and safety net.
    const timer = setTimeout(() => setPhase("done"), 2600);
    return () => clearTimeout(timer);
  }, [phase]);

  if (finished) return null;
  const showPoster = mode === "error" || mode === "blocked" || (mode === "loading" && !hasPlayed);
  const complete = characters === INTRO_SENTENCE.length;
  const emphasisStart = INTRO_SENTENCE.indexOf("look around");

  return (
    <>
      <noscript><style>{".intro-loader { display: none !important; }"}</style></noscript>
      <div
        className={`intro-loader ${styles.shell}`}
        data-phase={phase}
        data-playing={mode === "playing"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="robot-intro-sentence"
        onAnimationEnd={(event) => {
          if (phase === "exiting" && event.target === event.currentTarget) setPhase("done");
        }}
      >
        <div className={`intro-loader__sheet ${styles.sheet}`}>
          <p className={styles.brand}>PRAGATI JAIN</p>
          <div className={styles.content}>
            <div className={styles.stage}>
              <div className={styles.videoFrame} data-poster={showPoster}>
                <video
                  ref={video}
                  src={VIDEO}
                  className={styles.video}
                  poster={POSTER}
                  width={3840}
                  height={2160}
                  muted
                  autoPlay
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  aria-hidden="true"
                  onPlaying={() => {
                    setHasPlayed(true);
                    updateMode("playing");
                  }}
                  onPause={() => {
                    if (modeRef.current === "playing") updateMode("paused");
                  }}
                  onTimeUpdate={(event) => {
                    if (modeRef.current === "playing" || modeRef.current === "paused") {
                      setCharacters(introCharacterCount(event.currentTarget.currentTime));
                    }
                  }}
                  onEnded={() => {
                    updateMode("ended");
                    setCharacters(INTRO_SENTENCE.length);
                    setPhase("exiting");
                  }}
                  onError={() => {
                    showFallback("error");
                  }}
                />
                <Image src={POSTER} alt="" fill priority sizes="100vw" className={styles.poster} />
              </div>
              <h1 id="robot-intro-sentence" className={styles.phrase}>
                <span className={styles.accessible}>{INTRO_SENTENCE}</span>
                <span className={styles.ghost} aria-hidden="true">{INTRO_SENTENCE}</span>
                <span className={styles.typed} aria-hidden="true">
                  {INTRO_SENTENCE.slice(0, Math.min(characters, emphasisStart))}
                  <span className={styles.emphasis}>{INTRO_SENTENCE.slice(emphasisStart, Math.max(emphasisStart, characters))}</span>
                  {characters > 0 && !complete && <span className={styles.cursor} />}
                </span>
              </h1>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" className={`intro-loader__skip ${styles.enter}`} onClick={() => setPhase("exiting")}>
              {complete ? "Explore portfolio" : "Skip intro"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
