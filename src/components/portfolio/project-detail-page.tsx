

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Project } from '@/data/definitions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { ArrowLeft, Maximize, Mail, Cuboid, ExternalLink, CalendarDays, Linkedin } from 'lucide-react';
import { SiX } from '@icons-pack/react-simple-icons';
import { cn } from '@/lib/utils';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectCard } from '@/components/portfolio/project-card';
import { Card, CardContent } from '@/components/ui/card';
import Script from 'next/script';

// Fonction pour déterminer la classe CSS du badge de secteur.
const getSectorBadgeClass = (sector?: Project['sector']) => {
    if (!sector) return '';
    switch (sector) {
      case 'Infographie 3D':
        return 'bg-orange-500 hover:bg-orange-500/90 text-white border-transparent';
      case '3D Temps Réel':
        return 'bg-emerald-500 hover:bg-emerald-500/90 text-white border-transparent';
      case 'Développement Web':
        return 'bg-violet-500 hover:bg-violet-500/90 text-white border-transparent';
      default:
        return '';
    }
};

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
  const { language } = useLanguage();
  const c = content[language].portfolio;
  
  // États et logique pour le carrousel d'images.
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const handleDotClick = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api]);

  // Génère les données structurées pour le fil d'Ariane (Breadcrumb).
  const breadcrumbStructuredData = useMemo(() => {
    if (!project) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Portfolio",
          "item": "https://donovan-dev3d.vercel.app/portfolio"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": project.title[language]
        }
      ]
    };
  }, [project, language]);

  // Formate la date du projet.
  const formattedDate = new Date(project.date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Script pour les données structurées du fil d'Ariane. */}
      {breadcrumbStructuredData && (
        <Script
            id="breadcrumb-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      )}
      {/* En-tête de la page, visible sur mobile. */}
      <Header />
      <main className="py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline underline-offset-4 mb-8">
              <ArrowLeft className="h-5 w-5" />
              <span>{c.back_to_portfolio}</span>
            </Link>
            </div>
            <article>
              <div className="px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                  {/* Badges, date et titre du projet */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                      {/* Badge pour le secteur, cliquable pour filtrer */}
                      <Link href={`/portfolio?sector=${encodeURIComponent(project.sector)}`}>
                        <Badge className={getSectorBadgeClass(project.sector)}>{project.sector}</Badge>
                      </Link>
                      {/* Badge pour le type, cliquable pour filtrer */}
                      <Link href={`/portfolio?type=${encodeURIComponent(project.productionType)}`}>
                        <Badge variant="outline">{project.productionType}</Badge>
                      </Link>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formattedDate}</span>
                      </div>
                  </div>
                  <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">{project.title[language]}</h1>
                  {/* Badges des technologies, cliquables pour filtrer */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                        <Link href={`/portfolio?tech=${encodeURIComponent(tech)}`} key={tech}>
                           <Badge variant="secondary">{tech}</Badge>
                        </Link>
                    ))}
                  </div>
                </header>
              </div>

              {/* Affiche la vidéo si une URL est fournie. */}
              {project.videoUrl && (
                 <section className="mb-12 px-4 sm:px-6 lg:px-8">
                   <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/30 bg-black">
                     {/* Gère les vidéos YouTube et les vidéos locales. */}
                     {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                       <iframe
                         src={project.videoUrl.replace('watch?v=', 'embed/')}
                         title={`Vidéo pour ${project.title[language]}`}
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         referrerPolicy="strict-origin-when-cross-origin"
                         allowFullScreen
                         className="w-full h-full"
                       ></iframe>
                     ) : (
                       <video controls autoPlay={false} className="w-full h-full" poster={project.image}>
                         <source src={project.videoUrl} type="video/mp4" />
                         Votre navigateur ne supporte pas la lecture de vidéos.
                       </video>
                     )}
                   </div>
                 </section>
              )}

              {/* Carrousel d'images */}
              <div className="mb-12">
                <Carousel setApi={setApi} className="w-full">
                  <CarouselContent>
                    {project.images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                          <Image
                              src={img}
                              alt={`${project.title[language]} - screenshot ${index + 1}`}
                              fill
                              className="object-cover"
                              loading={index === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-4 md:ml-16" />
                  <CarouselNext className="mr-4 md:mr-16" />
                </Carousel>
                {/* Indicateurs de points pour le carrousel. */}
                {count > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-4">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={cn(
                                'h-2 w-2 rounded-full transition-colors',
                                current === i + 1 ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
              </div>
              
              {/* Description longue du projet */}
              <div 
                className="prose prose-invert prose-lg max-w-none mx-auto mb-16 px-4 sm:px-6 lg:px-8"
                dangerouslySetInnerHTML={{ __html: project.longDescription[language] }}
              />


              {/* Liens vers le site et partage */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4 sm:px-6 lg:px-8">
                  {project.liveUrl && (
                      <Button asChild size="lg" variant="outline">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Voir le site en direct
                          <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                      </Button>
                  )}
                  <Card className="bg-muted/30">
                      <CardContent className="p-2 sm:p-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-sm font-medium mr-2">{c.share_project}</span>
                              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://donovan-dev3d.vercel.app/portfolio/${project.id}&title=${encodeURIComponent(project.title[language])}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                  <Linkedin className="h-5 w-5" />
                              </a>
                               <a href={`https://twitter.com/intent/tweet?url=https://donovan-dev3d.vercel.app/portfolio/${project.id}&text=${encodeURIComponent('Découvrez ce projet : ' + project.title[language])}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                  <SiX className="h-5 w-5" />
                              </a>
                              <a href={`mailto:?subject=${encodeURIComponent('Découvrez ce projet : ' + project.title[language])}&body=${encodeURIComponent('J\'ai pensé que ce projet pourrait vous intéresser : https://donovan-dev3d.vercel.app/portfolio/' + project.id)}`} className="text-muted-foreground hover:text-primary transition-colors">
                                  <Mail className="h-5 w-5" />
                              </a>
                          </div>
                      </CardContent>
                  </Card>
              </div>

              {/* Section pour les modèles 3D interactifs si disponibles. */}
              {project.isVisualizable && project.visualizerItems && project.visualizerItems.length > 0 && (
                 <section className="mb-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-headline text-3xl font-bold mb-8">{c.interactive_experience_title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {project.visualizerItems.map(item => (
                            <Card key={item.id} className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col">
                              <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.name[language]}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm border border-border/50">
                                    <Cuboid className="h-4 w-4 text-primary" />
                                    <span>3D</span>
                                </div>
                              </div>
                              <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold font-headline mb-1">{item.name[language]}</h3>
                                <p className="text-sm text-muted-foreground flex-grow mb-4">{item.description[language]}</p>
                                <Button asChild variant="outline" className="w-full mt-auto">
                                   <Link href={`/visualizer/item/${item.id}`}>
                                     {c.visualize_3d_cta}
                                     <Cuboid className="ml-2 h-4 w-4" />
                                   </Link>
                                </Button>
                              </div>
                            </Card>
                        ))}
                    </div>
                 </section>
              )}

              {/* Galerie d'images avec modale pour agrandir. */}
              <section className="mb-16 px-4 sm:px-6 lg:px-8">
                <h2 className="font-headline text-3xl font-bold mb-8">{c.gallery_title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((img, index) => (
                     <Dialog key={index}>
                        <DialogTrigger asChild>
                           <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg">
                                <Image
                                    src={img}
                                    alt={`${project.title[language]} - gallery image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize className="text-white h-8 w-8" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 border-0">
                            <DialogTitle className="sr-only">{project.title[language]} - Image {index + 1}</DialogTitle>
                             <Image
                                src={img}
                                alt={`${project.title[language]} - gallery image ${index + 1}`}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain rounded-lg"
                                loading="eager"
                            />
                        </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </section>

              {/* Section des autres projets suggérés. */}
              {suggestedProjects.length > 0 && (
              <section className="mb-16 px-4 sm:px-6 lg:px-8">
                 <h2 className="font-headline text-3xl font-bold mb-8">{c.other_projects_title}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {suggestedProjects.map(p => (
                      <ProjectCard key={p.id} project={p} layout="grid" isLatest={p.id === latestProject?.id} />
                    ))}
                 </div>
              </section>
              )}

              {/* Appel à l'action pour contacter. */}
              <section id="contact-cta" className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
                <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">
                        Intéressé par ce projet ?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discutons de la manière dont nous pourrions adapter une solution similaire à vos besoins.
                    </p>
                    <Button size="lg" asChild className="group mt-8">
                        <Link href="/contact">
                        Me contacter
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
