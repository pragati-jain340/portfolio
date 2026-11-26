"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects, projectTopics } from "@/data/featured-projects";
import styles from "./Projects.module.css";

const filters = ["All projects", ...projectTopics] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All projects");
  const projects = filter === "All projects"
    ? featuredProjects
    : featuredProjects.filter((project) => project.topic === filter);

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
            onClick={() => setFilter(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{projects.length} {projects.length === 1 ? "project" : "projects"} shown</p>
      <div id="project-gallery" className={styles.gallery}>
        {projects.map((project) => (
          <article key={project.id} className={styles.item}>
            <Link
              href={project.details ?? `/projects/${project.id}`}
              aria-labelledby={`project-title-${project.id}`}
              className={styles.card}
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
    </section>
  );
}
