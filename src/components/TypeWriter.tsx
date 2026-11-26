"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TypeWriterProps {
  prefix?: string;
  name: string;
  typingSpeed?: number;
  className?: string;
  prefixClassName?: string;
  nameClassName?: string;
}

export default function TypeWriter({
  prefix = "Hi, I am",
  name,
  typingSpeed = 90,
  className,
  prefixClassName,
  nameClassName,
}: TypeWriterProps) {
  const [displayedPrefix, setDisplayedPrefix] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"waitingForLoader" | "typingPrefix" | "typingName" | "done">("waitingForLoader");
  const prefixIndexRef = useRef(0);
  const nameIndexRef = useRef(0);

  // Wait for the intro loader to disappear, then start typing
  const checkLoaderGone = useCallback(() => {
    const loader = document.querySelector(".intro-loader");
    if (!loader) {
      // No loader found — start typing immediately
      setPhase("typingPrefix");
      return;
    }
    // Check if loader is in "exiting" phase
    const dataPhase = loader.getAttribute("data-phase");
    if (dataPhase === "exiting" || dataPhase === "done") {
      // Wait a beat after exit animation starts, then type
      setTimeout(() => setPhase("typingPrefix"), 1200);
      return;
    }
    // Otherwise, observe for changes
    const observer = new MutationObserver(() => {
      const el = document.querySelector(".intro-loader");
      if (!el) {
        observer.disconnect();
        setTimeout(() => setPhase("typingPrefix"), 400);
        return;
      }
      const p = el.getAttribute("data-phase");
      if (p === "exiting" || p === "done") {
        observer.disconnect();
        setTimeout(() => setPhase("typingPrefix"), 1200);
      }
    });
    observer.observe(loader, { attributes: true, attributeFilter: ["data-phase"] });
    // Also observe parent in case loader is removed entirely
    if (loader.parentElement) {
      observer.observe(loader.parentElement, { childList: true });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "waitingForLoader") return;
    return checkLoaderGone();
  }, [phase, checkLoaderGone]);

  // Type prefix: "Hi, I am"
  useEffect(() => {
    if (phase !== "typingPrefix") return;
    const fullPrefix = prefix + " ";
    if (prefixIndexRef.current >= fullPrefix.length) {
      // small pause before name
      const pause = setTimeout(() => setPhase("typingName"), 300);
      return () => clearTimeout(pause);
    }
    const timer = setTimeout(() => {
      prefixIndexRef.current += 1;
      setDisplayedPrefix(fullPrefix.slice(0, prefixIndexRef.current));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [phase, displayedPrefix, prefix, typingSpeed]);

  // Type name: "Pragati Jain"
  useEffect(() => {
    if (phase !== "typingName") return;
    if (nameIndexRef.current >= name.length) {
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => {
      nameIndexRef.current += 1;
      setDisplayedName(name.slice(0, nameIndexRef.current));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [phase, displayedName, name, typingSpeed]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    if (phase === "done") {
      const stop = setTimeout(() => {
        clearInterval(interval);
        setShowCursor(false);
      }, 2500);
      return () => { clearInterval(interval); clearTimeout(stop); };
    }
    return () => clearInterval(interval);
  }, [phase]);

  const cursor = (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "3px",
        height: "1em",
        marginLeft: "3px",
        background: "currentColor",
        verticalAlign: "text-bottom",
        opacity: showCursor ? 1 : 0,
        transition: "opacity 80ms",
      }}
    />
  );

  return (
    <span className={className}>
      <span className={prefixClassName}>
        {displayedPrefix}
      </span>
      {phase !== "waitingForLoader" && phase !== "typingPrefix" || displayedPrefix.length > 0 ? (
        <span className={nameClassName}>
          {displayedName}
          {phase !== "done" && cursor}
        </span>
      ) : null}
    </span>
  );
}
