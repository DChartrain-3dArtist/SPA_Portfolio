
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { getProjects } from '@/data/projects';
import { Project } from '@/data/definitions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { ArrowLeft, Maximize, Mail, Cuboid, ExternalLink, ArrowRight, CalendarDays } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';


export default function ProjectDetailPage({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { language } = useLanguage();
  const c = content[language].portfolio;

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const fetchedProjects = await getProjects();
      setAllProjects(fetchedProjects);
      
      const currentProject = fetchedProjects.find(p => p.id === projectId);
      if (currentProject) {
        setProject(currentProject);
      } else {
        router.push('/portfolio');
      }
      setIsLoading(false);
    }
    if (projectId) {
      loadData();
    }
  }, [projectId, router]);

  const suggestedProjects = useMemo(() => {
    return allProjects.filter(p => p.id !== projectId).slice(0, 3);
  }, [allProjects, projectId]);

  const latestProject = useMemo(() => {
    if (allProjects.length === 0) return null;
    const sortedByDate = [...allProjects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedByDate.length > 0 ? sortedByDate[0] : null;
  }, [allProjects]);
  
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

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <article>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
              <Skeleton className="h-16 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </header>
            <div className="mb-12">
              <Skeleton className="w-full aspect-video rounded-lg" />
            </div>
            <div className="prose prose-invert prose-lg max-w-none mx-auto mb-16 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </article>
        </main>
      </>
    )
  }

  if (!project) {
    return null;
  }
  
  const formattedDate = new Date(project.date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const getSectorBadgeClass = () => {
    if (!project) return '';
    switch (project.sector) {
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


  return (
    <>
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
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className={cn(getSectorBadgeClass())}>{project.sector}</Badge>
                      <Badge variant="outline">{project.productionType}</Badge>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formattedDate}</span>
                      </div>
                  </div>
                  <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">{project.title[language]}</h1>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </header>
              </div>
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
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-4 md:ml-16" />
                  <CarouselNext className="mr-4 md:mr-16" />
                </Carousel>
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
              
              <div className="prose prose-invert prose-lg max-w-none mx-auto mb-16 px-4 sm:px-6 lg:px-8">
                <p className="text-foreground/90">{project.longDescription[language]}</p>
              </div>

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
                            />
                        </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </section>

              <section className="mb-16 px-4 sm:px-6 lg:px-8">
                 <h2 className="font-headline text-3xl font-bold mb-8">{c.other_projects_title}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {suggestedProjects.map(p => (
                      <ProjectCard key={p.id} project={p} layout="list" isLatest={p.id === latestProject?.id} />
                    ))}
                 </div>
              </section>

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
