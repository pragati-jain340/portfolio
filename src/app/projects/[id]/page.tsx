import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { featuredProjects } from "@/data/featured-projects";

type ProjectPageProps = { params: Promise<{ id: string }> };

const standardProjects = featuredProjects.filter((project) => !project.details);

export const dynamicParams = false;

export function generateStaticParams() {
  return standardProjects.map(({ id }) => ({ id }));
}

async function findProject(params: ProjectPageProps["params"]) {
  const { id } = await params;
  return standardProjects.find((project) => project.id === id);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await findProject(params);
  return project ? { title: `${project.title} | Pragati Jain`, description: project.description } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await findProject(params);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
