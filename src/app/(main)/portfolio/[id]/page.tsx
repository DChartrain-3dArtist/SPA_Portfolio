
import ProjectDetailPage from "@/components/portfolio/project-detail-page";
import { getProjects } from "@/data/projects";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
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


export default function Page({ params }: Props) {
    return <ProjectDetailPage projectId={params.id} />
}
