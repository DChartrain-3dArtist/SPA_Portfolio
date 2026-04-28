
import ProjectDetailPage from "@/components/portfolio/project-detail-page";
import { getProjects } from "@/data/projects";
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const projects = await getProjects()
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: 'Le projet que vous cherchez n\'existe pas ou a été déplacé.',
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: project.title.fr,
    description: project.description.fr,
    openGraph: {
      title: `${project.title.fr} | Projet de Chartrain Donovan`,
      description: project.description.fr,
      images: [project.image, ...previousImages],
    },
  }
}

export default async function Page({ params }: Props) {
    const projects = await getProjects();
    const project = projects.find((entry) => entry.id === params.id);

    if (!project) {
      notFound();
    }

    const suggestedProjects = projects.filter((entry) => entry.id !== params.id).slice(0, 3);
    const latestProject = [...projects].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0] ?? null;

    return (
      <ProjectDetailPage
        project={project}
        suggestedProjects={suggestedProjects}
        latestProject={latestProject}
      />
    );
}
