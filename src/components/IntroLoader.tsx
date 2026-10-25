"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const greetings = [
  { text: "Hello", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "ہیلو", lang: "ur" },
  { text: "Hola", lang: "es" },
  { text: "Bonjour", lang: "fr" },
  { text: "Hallo", lang: "de" },
  { text: "Ciao", lang: "it" },
  { text: "Привет", lang: "ru" },
  { text: "你好", lang: "zh" },
  { text: "مرحبا", lang: "ar" },
];

export default function IntroLoader() {
  const [phase, setPhase] = useState<"waiting" | "greetings" | "exiting" | "done">("waiting");
  const [wordIndex, setWordIndex] = useState(0);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const finished = phase === "done";

  useEffect(() => {
    if (finished || !backgroundReady) return;
    const timers: number[] = [];
    let frame = 0;
    let started = false;
    const start = () => {
      if (started || document.visibilityState !== "visible") return;
      started = true;
      frame = window.requestAnimationFrame(() => {
        setPhase((current) => current === "waiting" ? "greetings" : current);
        greetings.forEach((_, index) => {
          if (index > 0) {
            timers.push(window.setTimeout(() => setWordIndex(index), index * 170));
          }
        });
        const greetingDuration = greetings.length * 170;
        timers.push(window.setTimeout(() => setPhase("exiting"), greetingDuration));
      });
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("visibilitychange", start);
    };
  }, [finished, backgroundReady]);

  useEffect(() => {
    if (finished) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const content = document.querySelectorAll<HTMLElement>("body > main, body > nav, body > footer");
    content.forEach((element) => { element.inert = true; });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("exiting");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      content.forEach((element) => { element.inert = false; });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [finished]);

  useEffect(() => {
    if (phase !== "exiting") return;
    // Safety net; normally the exit animation itself completes the intro.
    const timer = window.setTimeout(() => setPhase("done"), 2600);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;
  const greeting = greetings[wordIndex];

  return (
    <>
      <noscript><style>{".intro-loader { display: none !important; }"}</style></noscript>
      <div
        className="intro-loader"
        data-phase={phase}
        aria-label="Welcome to Pragati's portfolio"
        onAnimationEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.animationName === "intro-exit-complete"
          ) setPhase("done");
        }}
      >
        <div className="intro-loader__sheet">
          <div className="intro-loader__artwork">
            <Image
              src="/intro-background.png"
              alt=""
              fill
              priority
              sizes="(min-aspect-ratio: 16/9) 100vw, 178vh"
              onLoad={() => setBackgroundReady(true)}
              onError={() => setBackgroundReady(true)}
            />
            <div className="intro-loader__greetings" aria-hidden="true">
              <span key={greeting.lang} lang={greeting.lang} dir="auto" className="intro-loader__word">
                {greeting.text}
              </span>
            </div>
          </div>
          <div className="intro-loader__signature" aria-hidden="true">
            <span>PRAGATI JAIN</span>
            <span>A little hello. A world of possibilities.</span>
          </div>
          <button
            type="button"
            className="intro-loader__skip"
            onClick={() => setPhase("exiting")}
          >
            Skip intro
          </button>
          <div className="intro-loader__progress" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
