"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, scroll } from "motion";
import { featuredProjects, type FeaturedProject } from "@/data/featured-projects";
import styles from "./Projects.module.css";

const projectActions = [
  { field: "ppt", label: "PPT", icon: "slideshow" },
  { field: "code", label: "Code", icon: "code" },
  { field: "code1", label: "Hand Tracking", icon: "back_hand" },
  { field: "code2", label: "Pose Est.", icon: "view_in_ar" },
  { field: "demo", label: "Demo", icon: "play_circle" },
  { field: "video", label: "Video", icon: "smart_display" },
] as const satisfies readonly { field: keyof FeaturedProject; label: string; icon: string }[];

export default function Projects() {
  const gallery = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;

    const scenes = Array.from(element.querySelectorAll<HTMLElement>("[data-project-scene]"));
    let stackCleanups: (() => void)[] = [];
    let stackAnimations: { cancel: () => void }[] = [];
    let previousStacked: boolean | null = null;

    const measure = () => {
      // Match card heights so the incoming project completely replaces the old one.
      const heights = scenes.map((scene) => {
        const content = scene.querySelector<HTMLElement>("[data-project-content]");
        const image = scene.querySelector<HTMLElement>("[data-project-image]");
        const contentBox = content?.parentElement;
        const visualBox = image?.closest<HTMLElement>("[data-project-visual]");
        const contentStyle = contentBox ? getComputedStyle(contentBox) : null;
        const visualStyle = visualBox ? getComputedStyle(visualBox) : null;
        const textHeight = (content?.offsetHeight ?? 0) + parseFloat(contentStyle?.paddingTop ?? "0") + parseFloat(contentStyle?.paddingBottom ?? "0");
        const imageHeight = (image?.offsetHeight ?? 0) + parseFloat(visualStyle?.paddingTop ?? "0") + parseFloat(visualStyle?.paddingBottom ?? "0");
        return Math.max(textHeight, imageHeight) + 2;
      });
      const desktop = window.innerWidth >= 1024;
      if (desktop) element.style.setProperty("--project-card-height", `${Math.max(...heights, 0)}px`);
      else element.style.removeProperty("--project-card-height");
      const fits = desktop && scenes.every((scene) => scene.offsetHeight <= window.innerHeight - 148);
      element.dataset.stacked = String(fits);
      if (fits === previousStacked) return;
      previousStacked = fits;
      stackCleanups.forEach((cleanup) => cleanup());
      stackAnimations.forEach((animation) => animation.cancel());
      stackCleanups = [];
      stackAnimations = [];
      scenes.forEach((scene, index) => {
        scene.dataset.covered = "false";
        scene.inert = false;
        const slide = scene.querySelector<HTMLElement>("[data-project-slide]");
        if (!slide) return;
        // A stacked card must stay opaque so lower projects cannot show through it.
        if (fits) slide.style.opacity = "1";
        else slide.style.removeProperty("opacity");
        const nextScene = scenes[index + 1];
        if (fits && nextScene) {
          const animation = animate(slide, { scale: [1, 0.97] }, { ease: "linear", duration: 1 });
          stackAnimations.push(animation);
          stackCleanups.push(scroll(animation, { target: nextScene, offset: ["start 90%", "start 128px"] }));
          stackCleanups.push(scroll((progress) => {
            // Retire the entire previous layer before it can peek out above
            // the incoming card. Reversing scroll restores it automatically.
            const covered = progress >= 0.85;
            scene.dataset.covered = String(covered);
            scene.inert = covered;
          }, { target: nextScene, offset: ["start 90%", "start 128px"] }));
        } else if (!fits) {
          const animation = animate(slide, { y: [55, 0], opacity: [0.4, 1] }, { ease: "linear", duration: 1 });
          stackAnimations.push(animation);
          stackCleanups.push(scroll(animation, { target: scene, offset: ["start end", "start 65%"] }));
        }
      });
    };
    const observer = new ResizeObserver(measure);
    scenes.forEach((scene) => {
      const content = scene.querySelector<HTMLElement>("[data-project-content]");
      const image = scene.querySelector<HTMLElement>("[data-project-image]");
      if (content) observer.observe(content);
      if (image) observer.observe(image);
    });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      stackCleanups.forEach((cleanup) => cleanup());
      stackAnimations.forEach((animation) => animation.cancel());
      scenes.forEach((scene) => {
        delete scene.dataset.covered;
        scene.inert = false;
      });
    };
  }, []);

  return (
    <section className="portfolio-section space-y-10 md:space-y-16" id="projects">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black">Featured Projects</h2>
        <p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
          A selection of my work in AI, computer vision, and software engineering.
        </p>
      </div>

      <div ref={gallery} className={styles.gallery}>
        {featuredProjects.map((project, index) => (
          <article
            key={project.id}
            className={styles.scene}
            data-project-scene
            style={{ zIndex: index + 1 }}
            data-reversed={index % 2 !== 0}
            aria-labelledby={`project-title-${project.id}`}
          >
            <div className={styles.slide} data-project-slide>
              <div className={styles.sceneHeader}>
                <span className={styles.sceneLabel}>PROJECT</span>
                <span className={styles.number} aria-hidden="true">#{String(index + 1).padStart(3, "0")}</span>
              </div>
            <div className={styles.showcase}>
              <div className={styles.content}>
                <div className={styles.contentInner} data-project-content>
                  <p className={styles.category}>{project.category}</p>
                  <h3 id={`project-title-${project.id}`} className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <ul className={styles.tags} aria-label="Technologies used">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className={styles.actions}>
                    {projectActions.map(({ field, label, icon }) => {
                      const url = project[field];
                      if (!url || url === "#") return null;
                      return (
                        <a key={field} href={url} target="_blank" rel="noopener noreferrer" className={styles.action} data-primary={field === "demo" || field === "ppt"}>
                          <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.visual} data-project-visual>
                <div className={styles.imageStage}>
                  <div className={styles.imageWindow} data-project-image>
                    <div className={styles.artwork} data-project-artwork>
                      {project.image ? (
                        <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className={styles.image} />
                      ) : (
                        <span className={`${styles.fallbackIcon} material-symbols-outlined`} aria-hidden="true">{project.icon}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
