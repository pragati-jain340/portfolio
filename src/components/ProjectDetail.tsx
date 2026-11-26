import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FeaturedProject } from "@/data/featured-projects";

const projectActions = [
  { field: "report", label: "Project Report", icon: "description" },
  { field: "slides", label: "Slides", icon: "slideshow" },
  { field: "ppt", label: "Presentation", icon: "slideshow" },
  { field: "code", label: "Code", icon: "code" },
  { field: "code1", label: "Hand Tracking Code", icon: "back_hand" },
  { field: "code2", label: "Pose Estimation Code", icon: "view_in_ar" },
  { field: "demo", label: "Demo", icon: "play_circle" },
  { field: "video", label: "Video", icon: "smart_display" },
] as const;

export default function ProjectDetail({
  project,
  coverCaption,
  children,
}: {
  project: FeaturedProject;
  coverCaption?: string;
  children?: ReactNode;
}) {
  const actions = projectActions.filter(({ field }) => project[field] && project[field] !== "#");

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 pb-20 pt-28 lg:px-8">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        Back to Featured Projects
      </Link>

      <article className="mt-7 space-y-9">
        <header className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{project.category}</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-text-light-secondary sm:text-lg">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700">
                {tag}
              </li>
            ))}
          </ul>
          {actions.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Project resources">
              {actions.map(({ field, label, icon }) => (
                <li key={field}>
                  <a
                    href={project[field]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-primary hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary dark:border-slate-700"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        {project.image && (
          <figure className="space-y-3">
            <div className="relative aspect-[3/2] max-h-[460px] overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                sizes="(min-width: 896px) 832px, 95vw"
                className="object-contain"
              />
            </div>
            {coverCaption && (
              <figcaption className="text-sm text-text-light-secondary">{coverCaption}</figcaption>
            )}
          </figure>
        )}

        {children}
      </article>
    </main>
  );
}
