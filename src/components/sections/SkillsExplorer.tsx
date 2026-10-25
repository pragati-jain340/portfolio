"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { animateView, spring, stagger } from "motion";
import type { SkillCategory } from "@/data/skills";
import styles from "./SkillsExplorer.module.css";

const skillIcons: Record<string, string> = {
  Python: "code", "Deep Learning": "neurology", Transformers: "hub",
  "Machine Learning": "model_training", RAG: "manage_search",
  "AI Agent Evaluation": "fact_check", "Computer Vision": "visibility", "Agentic AI": "smart_toy",
  PyTorch: "local_fire_department", TensorFlow: "deployed_code", OpenCV: "camera",
  LangChain: "link", LangGraph: "account_tree", NumPy: "calculate",
  Pandas: "table_chart", Matplotlib: "show_chart", Seaborn: "scatter_plot",
  Django: "web", PostgreSQL: "database", Redis: "bolt", Git: "fork_right",
  AWS: "cloud", Terraform: "stacks", OpenTelemetry: "monitoring",
};

export default function SkillsExplorer({ categories }: { categories: SkillCategory[] }) {
  const filters = [{ id: "all-skills", title: "All skills", icon: "apps", skills: [] }, ...categories];
  const [selected, setSelected] = useState(categories.length ? 1 : 0);
  const root = useRef<HTMLDivElement>(null);
  const tabList = useRef<HTMLDivElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mounted = useRef(false);
  const requested = useRef(selected);
  const committed = useRef(selected);
  const transitioning = useRef(false);
  const id = `skills-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const category = filters[selected];
  const skills = selected === 0
    ? categories.flatMap((group) => group.skills.map((skill) => ({ skill, key: `${group.id}-${skill}`, icon: group.icon })))
    : category.skills.map((skill) => ({ skill, key: `${category.id}-${skill}`, icon: category.icon }));

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useLayoutEffect(() => {
    const element = tabList.current;
    const indicator = highlight.current;
    if (!element || !indicator) return;
    const positionHighlight = () => {
      const tab = tabs.current[selected];
      if (!tab) return;
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.height = `${tab.offsetHeight}px`;
      indicator.style.transform = `translate3d(${tab.offsetLeft}px, ${tab.offsetTop}px, 0)`;
      indicator.style.opacity = "1";
    };
    positionHighlight();
    const observer = new ResizeObserver(positionHighlight);
    observer.observe(element);
    tabs.current.forEach((tab) => { if (tab) observer.observe(tab); });
    return () => observer.disconnect();
  }, [selected]);

  const selectCategory = async (next: number) => {
    requested.current = next;
    if (transitioning.current) return;
    transitioning.current = true;
    try {
      // Finish the current transition, then go straight to the latest request.
      // This avoids a long backlog when clicking or pressing arrow keys quickly.
      while (mounted.current && committed.current !== requested.current) {
        const target = requested.current;
        if (!("startViewTransition" in document)) {
          setSelected(target);
          committed.current = target;
          continue;
        }
        if (root.current) root.current.dataset.viewEnhanced = "true";
        const animation = animateView(() => {
          if (mounted.current) flushSync(() => setSelected(target));
        }, { type: spring, visualDuration: 0.45, bounce: 0.12 })
          .add(`#${id} [data-skill-highlight]`)
          .add(`#${id} [data-skill-panel]`)
          .layout({ duration: 0.45 })
          .old({ opacity: [1, 0] }, { duration: 0.18 })
          .new({ opacity: [0, 1] }, { duration: 0.28 })
          .add(`#${id} [data-skill-card]`)
          .enter({ opacity: [0, 1], scale: [0.88, 1] }, { delay: stagger(0.025) })
          .exit({ opacity: [1, 0], scale: [1, 0.9] }, { duration: 0.2, delay: stagger(0.015) });
        try {
          // Motion 14's builder resolves to playback controls at runtime.
          const controls: unknown = await animation;
          if (controls && typeof controls === "object" && "finished" in controls) {
            await controls.finished;
          }
        } catch {
          // Keep filtering functional if the browser skips a snapshot.
          if (mounted.current) setSelected(target);
        }
        committed.current = target;
      }
    } finally {
      transitioning.current = false;
    }
  };

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    element.dataset.enhanced = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.visible = "true";
      observer.disconnect();
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % filters.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + filters.length) % filters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = filters.length - 1;
    else return;
    event.preventDefault();
    void selectCategory(next);
    tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  return (
    <div ref={root} id={id} className={styles.explorer}>
      <div ref={tabList} className={styles.tabs} role="tablist" aria-label="Skill categories">
        <span ref={highlight} className={styles.highlight} data-skill-highlight aria-hidden="true" />
        {filters.map((filter, index) => (
          <button
            key={filter.id}
            ref={(element) => { tabs.current[index] = element; }}
            id={`${id}-tab-${filter.id}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => { void selectCategory(index); }}
            onKeyDown={(event) => navigateTabs(event, index)}
            className={styles.tab}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{filter.icon}</span>
            {filter.title}
          </button>
        ))}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${category.id}`}
        tabIndex={0}
        className={styles.panel}
        data-skill-panel
        data-featured={category.id === "core-ai-ml"}
        style={{ "--skill-columns": selected === 0 ? 4 : Math.min(skills.length, 5) } as CSSProperties}
      >
        <div className={styles.heading}>
          <h4>{category.title}</h4>
          <span className={styles.count}>{skills.length} skills</span>
        </div>
        <ul className={styles.grid}>
          {skills.map(({ skill, key, icon }, skillIndex) => (
            <li key={key} className={styles.item} data-skill-card style={{ "--skill-delay": `${Math.min(skillIndex, 7) * 45}ms` } as CSSProperties}>
              <div className={styles.tile}>
                <span className={styles.icon} aria-hidden="true">
                  <span className="material-symbols-outlined">{skillIcons[skill] ?? icon}</span>
                </span>
                <span className={styles.skill}>{skill}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
