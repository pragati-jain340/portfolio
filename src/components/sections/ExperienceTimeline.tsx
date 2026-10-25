"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Experience } from "@/data/experience";
import styles from "./ExperienceTimeline.module.css";
import TimelineRobot from "./TimelineRobot";

function renderDescription(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <span key={index}>{part}</span>,
  );
}

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const timeline = useRef<HTMLDivElement>(null);
  const route = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const element = timeline.current;
    if (!element) return;
    const rows = Array.from(element.querySelectorAll<HTMLElement>("[data-timeline-entry]"));
    const path = route.current;
    const tip = head.current;
    if (!path || !tip) return;
    let frame = 0;
    let stops: { y: number; start: number }[] = [];
    let totalLength = 0;
    let targetDistance = 0;
    let displayedDistance = 0;
    let previousTime = 0;
    let visible = false;
    let displayedCurrent = -2;

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 1000 / 60;
      previousTime = time;
      // Time-based damping keeps wheel steps smooth at any display refresh rate.
      displayedDistance += (targetDistance - displayedDistance) * (1 - Math.exp(-elapsed / 120));
      const settled = Math.abs(targetDistance - displayedDistance) < 0.1;
      if (settled) displayedDistance = targetDistance;
      path.style.strokeDashoffset = String(totalLength - displayedDistance);
      const point = path.getPointAtLength(displayedDistance);
      tip.setAttribute("cx", String(point.x));
      tip.setAttribute("cy", String(point.y));
      tip.style.opacity = visible ? "1" : "0";

      const current = visible ? stops.findLastIndex((stop) => displayedDistance >= stop.start) : -1;
      if (current !== displayedCurrent) {
        rows.forEach((row, index) => {
          row.dataset.active = String(index <= current);
          row.dataset.current = String(index === current);
          if (index === current) row.setAttribute("aria-current", "step");
          else row.removeAttribute("aria-current");
        });
        displayedCurrent = current;
      }
      element.dataset.enhanced = "true";
      frame = settled ? 0 : requestAnimationFrame(animate);
    };

    const scheduleUpdate = () => {
      const cursor = window.innerHeight * 0.68 - element.getBoundingClientRect().top;
      const current = stops.findLastIndex((stop) => cursor >= stop.y);
      targetDistance = Math.max(0, Math.min(totalLength, cursor - (stops[0]?.y ?? 0)));
      visible = current >= 0;
      if (!frame) {
        previousTime = 0;
        frame = requestAnimationFrame(animate);
      }
    };
    const measure = () => {
      const measuredStops: typeof stops = [];
      let center = 0;
      rows.forEach((row) => {
        const dot = row.querySelector<HTMLElement>("[data-timeline-point]");
        if (!dot) return;
        center = row.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2;
        const y = row.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
        measuredStops.push({
          y,
          start: 0,
        });
      });
      const firstY = measuredStops[0]?.y ?? 0;
      const lastY = measuredStops.at(-1)?.y ?? firstY;
      measuredStops.forEach((stop) => { stop.start = stop.y - firstY; });
      stops = measuredStops;
      path.setAttribute("d", `M ${center} ${firstY} V ${lastY}`);
      totalLength = Math.max(0, lastY - firstY);
      displayedDistance = Math.min(displayedDistance, totalLength);
      path.style.strokeDasharray = String(totalLength);
      element.style.setProperty("--timeline-length", `${totalLength}px`);
      // Refresh the selected role after the timeline layout changes.
      displayedCurrent = -2;
      scheduleUpdate();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={timeline} className={styles.timeline}>
      <div className={styles.track} aria-hidden="true" />
      <svg className={styles.snake} width="100%" height="100%" aria-hidden="true">
        <path ref={route} className={styles.route} />
        <circle ref={head} className={styles.head} r="4" />
      </svg>
      <ol className={styles.entries}>
        {experiences.map((experience) => (
          <li key={experience.id} className={styles.entry} data-timeline-entry>
            <span className={styles.point} data-timeline-point aria-hidden="true" />
            <article className={styles.card}>
              <div className={styles.robotPosition}>
                <TimelineRobot />
              </div>
              <div className={styles.cardTop}>
                <span className={experience.logo ? styles.companyLogo : styles.icon} data-logo-style={experience.logoStyle}>
                  {experience.logo ? (
                    <Image src={experience.logo} alt={`${experience.company} logo`} width={48} height={48} className={styles.logoImage} />
                  ) : (
                    <span className="material-symbols-outlined" aria-hidden="true">work</span>
                  )}
                </span>
                <span className={styles.period}>{experience.period}</span>
              </div>
              <h4 className={styles.role}>{experience.role}</h4>
              <p className={styles.company}>{experience.company}</p>
              {experience.description.length > 0 && (
                <ul className={styles.description}>
                  {experience.description.map((description, index) => (
                    <li key={index}>{renderDescription(description)}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
