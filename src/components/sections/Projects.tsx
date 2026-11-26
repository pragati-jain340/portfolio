"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects, projectTopics } from "@/data/featured-projects";
import styles from "./Projects.module.css";

const filters = ["All projects", ...projectTopics] as const;
const INITIAL_VISIBLE_COUNT = 5;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All projects");
  const [showAll, setShowAll] = useState(false);
  const projects = filter === "All projects"
    ? featuredProjects
    : featuredProjects.filter((project) => project.topic === filter);
  const hasMoreProjects = projects.length > INITIAL_VISIBLE_COUNT;
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE_COUNT);

  const updateCardTilt = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
    const py = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));

    card.dataset.tilting = "true";
    card.style.setProperty("--tilt-x", `${(-py * 14).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(px * 16).toFixed(2)}deg`);
  };

  const resetCardTilt = (event: PointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    delete card.dataset.tilting;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section className={`portfolio-section ${styles.section}`} id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className={styles.sectionTitle}>Featured Projects</h2>
      <div className={styles.filters} role="group" aria-label="Filter projects by topic">
        {filters.map((topic) => (
          <button
            key={topic}
            type="button"
            className={styles.filter}
            aria-pressed={filter === topic}
            aria-controls="project-gallery"
            onClick={() => {
              setFilter(topic);
              setShowAll(false);
            }}
          >
            {topic}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} shown
      </p>
      <div id="project-gallery" className={styles.gallery}>
        {visibleProjects.map((project) => (
          <article key={project.id} className={styles.item}>
            <Link
              href={project.details ?? `/projects/${project.id}`}
              aria-labelledby={`project-title-${project.id}`}
              className={styles.card}
              onPointerEnter={updateCardTilt}
              onPointerMove={updateCardTilt}
              onPointerLeave={resetCardTilt}
            >
              <div className={styles.thumbnail}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 90vw"
                    className={styles.image}
                  />
                ) : (
                  <span className={`material-symbols-outlined ${styles.fallbackIcon}`} aria-hidden="true">{project.icon}</span>
                )}
              </div>
              <div className={styles.copy}>
                <p className={styles.category}>{project.category}</p>
                <h3 id={`project-title-${project.id}`} className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <span className={styles.open}>
                  View project
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {hasMoreProjects && (
        <div className={styles.toggleRow}>
          <button
            type="button"
            className={styles.toggleBtn}
            aria-expanded={showAll}
            aria-controls="project-gallery"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span>{showAll ? "Show less" : `See all (${projects.length})`}</span>
            <span
              className={`material-symbols-outlined ${styles.toggleArrow}`}
              data-expanded={showAll ? "true" : undefined}
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
