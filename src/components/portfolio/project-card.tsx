
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import type { Project } from '@/data/definitions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cuboid, Sparkles, Film } from 'lucide-react';
import { cn } from '@/lib/utils';
import { content } from '@/lib/content';

interface ProjectCardProps {
  project: Project;
  layout?: 'grid' | 'list';
  isLatest?: boolean;
}

export function ProjectCard({ project, layout = 'grid', isLatest = false }: ProjectCardProps) {
  const { language } = useLanguage();
  const c = content[language];
  const { id, title, image, sector, productionType, hint, description, isVisualizable, date, videoUrl } = project;

  const getSectorBadgeClass = () => {
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

  const formattedDate = new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cardBadges = (
     <div className="absolute top-2 right-2 flex items-center gap-2">
        {isLatest && (
            <Badge variant="default" className="bg-primary text-primary-foreground border-transparent gap-1">
                <Sparkles className="h-3 w-3" />
                {c.portfolio.new_badge}
            </Badge>
        )}
        {videoUrl && (
            <div className="flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm border border-border/50">
                <Film className="h-4 w-4 text-primary" />
                <span>Vidéo</span>
            </div>
        )}
        {isVisualizable && (
            <div className="flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm border border-border/50">
                <Cuboid className="h-4 w-4 text-primary" />
                <span>3D</span>
            </div>
        )}
     </div>
  );

  if (layout === 'grid') {
    return (
        <Card className="group overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 h-full">
            <Link href={`/portfolio/${id}`} className="flex flex-col h-full">
                <div className="relative overflow-hidden w-full aspect-square">
                    <Image
                        src={image}
                        alt={title[language]}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {cardBadges}
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("w-fit", getSectorBadgeClass())}>{sector}</Badge>
                        <Badge variant="outline" className="w-fit">{productionType}</Badge>
                    </div>
                    <h3 className="text-lg font-bold font-headline text-card-foreground mb-2">{title[language]}</h3>
                    <p className="text-sm text-muted-foreground flex-grow mb-4">{description[language]}</p>
                    <div className="mt-auto flex items-center justify-between text-sm">
                        <span className="text-xs text-muted-foreground">{formattedDate}</span>
                        <div className="flex items-center text-primary font-medium">
                            {c.portfolio.view_project_cta}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
  }

  // List layout
  return (
    <Card className="group overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 w-full">
        <Link href={`/portfolio/${id}`} className="flex flex-col md:flex-row h-full">
            <div className="relative overflow-hidden w-full md:w-1/3 aspect-video md:aspect-auto">
                <Image
                    src={image}
                    alt={title[language]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 {cardBadges}
            </div>
            <CardContent className="p-6 flex flex-col flex-grow md:w-2/3">
                <div className="flex items-center gap-2 mb-2">
                    <Badge className={cn("w-fit", getSectorBadgeClass())}>{sector}</Badge>
                    <Badge variant="outline" className="w-fit">{productionType}</Badge>
                </div>
                <h3 className="text-xl font-bold font-headline text-card-foreground mb-2">{title[language]}</h3>
                <p className="text-sm text-muted-foreground flex-grow mb-4">{description[language]}</p>
                 <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="text-xs text-muted-foreground">{formattedDate}</span>
                    <div className="flex items-center text-primary font-medium">
                        {c.portfolio.view_project_cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                </div>
            </CardContent>
        </Link>
    </Card>
  );
}
