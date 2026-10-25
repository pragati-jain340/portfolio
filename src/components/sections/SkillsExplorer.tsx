"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
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
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

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
    if (event.key === "ArrowRight") next = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus({ preventScroll: true });
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  return (
    <div ref={root} className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Skill categories">
        {categories.map((category, index) => (
          <button
            key={category.id}
            ref={(element) => { tabs.current[index] = element; }}
            id={`${id}-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`${id}-panel-${category.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigateTabs(event, index)}
            className={styles.tab}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {categories.map((category, index) => (
        <div
          key={category.id}
          id={`${id}-panel-${category.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${category.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className={styles.panel}
          data-featured={category.id === "core-ai-ml"}
          style={{ "--skill-columns": Math.min(category.skills.length, 5) } as CSSProperties}
        >
          <div className={styles.heading}>
            <h4>{category.title}</h4>
            <span className={styles.count}>{category.skills.length} skills</span>
          </div>
          <ul className={styles.grid}>
            {category.skills.map((skill, skillIndex) => (
              <li key={skill} className={styles.item} style={{ "--skill-delay": `${skillIndex * 55}ms` } as CSSProperties}>
                <div className={styles.tile}>
                  <span className={styles.icon} aria-hidden="true">
                    <span className="material-symbols-outlined">{skillIcons[skill] ?? category.icon}</span>
                  </span>
                  <span className={styles.skill}>{skill}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
