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
    const dismiss = () => setPhase("done");
    const start = () => {
      if (started || document.visibilityState !== "visible") return;
      started = true;
      frame = window.requestAnimationFrame(() => {
        setPhase("greetings");
        greetings.forEach((_, index) => {
          if (index > 0) {
            timers.push(window.setTimeout(() => setWordIndex(index), index * 200));
          }
        });
        const greetingDuration = 2000;
        timers.push(window.setTimeout(() => setPhase("exiting"), greetingDuration));
        timers.push(window.setTimeout(dismiss, greetingDuration + 1000));
      });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    start();
    document.addEventListener("visibilitychange", start);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [finished, backgroundReady]);

  if (phase === "done") return null;
  const greeting = greetings[wordIndex];

  return (
    <>
      <noscript><style>{".intro-loader { display: none !important; }"}</style></noscript>
      <div className="intro-loader" data-phase={phase} aria-label="Welcome to Pragati's portfolio">
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
            <span lang={greeting.lang} dir="auto" className="intro-loader__word">
              {greeting.text}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="intro-loader__skip"
          onClick={() => setPhase("done")}
        >
          Skip intro
        </button>
      </div>
    </>
  );
}
