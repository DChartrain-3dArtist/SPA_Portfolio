

import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/lib/content';
import { Project } from '@/data/definitions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { ArrowLeft, Mail, Cuboid, ExternalLink, CalendarDays, Linkedin } from 'lucide-react';
import { SiX } from '@icons-pack/react-simple-icons';
import { ProjectCardStatic } from '@/components/portfolio/project-card-static';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectMediaCarousel } from '@/components/portfolio/project-media-carousel';
import { ProjectImageGallery } from '@/components/portfolio/project-image-gallery';
import { LocalizedHtml, LocalizedText } from '@/components/i18n/localized';
import { absoluteUrl } from '@/lib/site';
import { getSectorBadgeClass } from '@/lib/project-ui';

/**
 * Composant de la page de détail d'un projet.
 * Affiche toutes les informations d'un projet spécifique, y compris les galeries, les vidéos et les liens.
 * @param {object} props - Les propriétés du composant.
 * @param {Project} props.project - Le projet courant.
 * @returns Un composant React pour la page de détail du projet.
 */
export default function ProjectDetailPage({
  project,
  suggestedProjects,
  latestProject,
}: {
  project: Project;
  suggestedProjects: Project[];
  latestProject: Project | null;
}) {
  const fr = content.fr.portfolio;
  const en = content.en.portfolio;
  const formattedDateFr = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(project.date));
  const formattedDateEn = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(project.date));
  const projectUrl = absoluteUrl(`/portfolio/${project.id}`);

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Portfolio',
        item: absoluteUrl('/portfolio'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: project.title.fr,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Header />
      <main className="py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <LocalizedText fr={fr.back_to_portfolio} en={en.back_to_portfolio} />
          </Link>
        </div>
        <article>
          <div className="px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Link href={`/portfolio?sector=${encodeURIComponent(project.sector)}`}>
                  <Badge className={getSectorBadgeClass(project.sector)}>
                    <LocalizedText
                      fr={content.fr.portfolio.filters.sectors[project.sector]}
                      en={content.en.portfolio.filters.sectors[project.sector]}
                    />
                  </Badge>
                </Link>
                <Link href={`/portfolio?type=${encodeURIComponent(project.productionType)}`}>
                  <Badge variant="outline">
                    <LocalizedText
                      fr={content.fr.portfolio.filters.production_types[project.productionType]}
                      en={content.en.portfolio.filters.production_types[project.productionType]}
                    />
                  </Badge>
                </Link>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <LocalizedText fr={formattedDateFr} en={formattedDateEn} />
                </div>
              </div>
              <LocalizedText
                as="h1"
                className="mb-4 font-headline text-4xl font-bold md:text-6xl"
                fr={project.title.fr}
                en={project.title.en}
              />
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Link href={`/portfolio?tech=${encodeURIComponent(tech)}`} key={tech}>
                    <Badge variant="secondary">{tech}</Badge>
                  </Link>
                ))}
              </div>
            </header>
          </div>

          {project.videoUrl && (
            <section className="mb-12 px-4 sm:px-6 lg:px-8">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-primary/30 bg-black shadow-2xl shadow-primary/20">
                {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                    title={`${project.title.fr} / ${project.title.en}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full"
                  ></iframe>
                ) : (
                  <video controls autoPlay={false} className="h-full w-full" poster={project.image}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de videos.
                  </video>
                )}
              </div>
            </section>
          )}

          <ProjectMediaCarousel images={project.images} title={project.title} />

          <LocalizedHtml
            as="div"
            className="prose prose-invert prose-lg mx-auto mb-16 max-w-none px-4 sm:px-6 lg:px-8"
            fr={project.longDescription.fr}
            en={project.longDescription.en}
          />

          <div className="mb-16 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
            {project.liveUrl && (
              <Button asChild size="lg" variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <LocalizedText fr="Voir le site en direct" en="View live site" />
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            <Card className="bg-muted/30">
              <CardContent className="p-2 sm:p-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="mr-2 text-sm font-medium">
                    <LocalizedText fr={fr.share_project} en={en.share_project} />
                  </span>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(projectUrl)}&title=${encodeURIComponent(project.title.fr)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(`Discover this project: ${project.title.en}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <SiX className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`Discover this project: ${project.title.en}`)}&body=${encodeURIComponent(`I thought this project might interest you: ${projectUrl}`)}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {project.isVisualizable &&
            project.visualizerItems &&
            project.visualizerItems.length > 0 && (
              <section className="mb-16 px-4 sm:px-6 lg:px-8">
                <LocalizedText
                  as="h2"
                  className="mb-8 font-headline text-3xl font-bold"
                  fr={fr.interactive_experience_title}
                  en={en.interactive_experience_title}
                />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {project.visualizerItems.map((item) => (
                    <Card
                      key={item.id}
                      className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name.fr}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                          <Cuboid className="h-4 w-4 text-primary" />
                          <span>3D</span>
                        </div>
                      </div>
                      <div className="flex flex-grow flex-col p-4">
                        <LocalizedText
                          as="h3"
                          className="mb-1 font-headline text-lg font-bold"
                          fr={item.name.fr}
                          en={item.name.en}
                        />
                        <LocalizedText
                          as="p"
                          className="mb-4 flex-grow text-sm text-muted-foreground"
                          fr={item.description.fr}
                          en={item.description.en}
                        />
                        <Button asChild variant="outline" className="mt-auto w-full">
                          <Link href={`/visualizer/item/${item.id}`}>
                            <LocalizedText fr={fr.visualize_3d_cta} en={en.visualize_3d_cta} />
                            <Cuboid className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

          <section className="mb-16 px-4 sm:px-6 lg:px-8">
            <LocalizedText
              as="h2"
              className="mb-8 font-headline text-3xl font-bold"
              fr={fr.gallery_title}
              en={en.gallery_title}
            />
            <ProjectImageGallery images={project.images} title={project.title} />
          </section>

          {suggestedProjects.length > 0 && (
            <section className="mb-16 px-4 sm:px-6 lg:px-8">
              <LocalizedText
                as="h2"
                className="mb-8 font-headline text-3xl font-bold"
                fr={fr.other_projects_title}
                en={en.other_projects_title}
              />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {suggestedProjects.map((suggestedProject) => (
                    <ProjectCardStatic
                      key={suggestedProject.id}
                      project={suggestedProject}
                      isLatest={suggestedProject.id === latestProject?.id}
                    />
                  ))}
                </div>
              </section>
          )}

          <section id="contact-cta" className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
            <div className="animate-fade-in rounded-lg border border-border/50 bg-card/80 p-8 text-center md:p-12">
              <LocalizedText
                as="h2"
                className="font-headline text-3xl font-bold md:text-4xl"
                fr="Un besoin proche de ce cas d'usage ?"
                en="Working on a similar use case?"
              />
              <LocalizedText
                as="p"
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
                fr="Nous pouvons partir de cette logique de projet et l'adapter a votre contexte, vos contraintes et vos objectifs."
                en="We can use this kind of project as a starting point and adapt it to your context, constraints, and goals."
              />
              <Button size="lg" asChild className="group mt-8">
                <Link href="/contact">
                  <LocalizedText fr="Me contacter" en="Contact me" />
                  <Mail className="ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
