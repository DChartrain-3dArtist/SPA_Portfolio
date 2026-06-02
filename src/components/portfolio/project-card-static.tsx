import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cuboid, Film, Sparkles } from 'lucide-react';
import type { Project } from '@/data/definitions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocalizedText } from '@/components/i18n/localized';
import { content } from '@/lib/content';
import { cn } from '@/lib/utils';
import { getSectorBadgeClass } from '@/lib/project-ui';

export function ProjectCardStatic({
  project,
  isLatest = false,
}: {
  project: Project;
  isLatest?: boolean;
}) {
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

  return (
    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
      <Link href={`/portfolio/${project.id}`} className="flex h-full flex-col">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title.fr} / ${project.title.en}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            {isLatest && (
              <Badge
                variant="default"
                className="hidden gap-1 border-transparent bg-primary text-primary-foreground md:inline-flex"
              >
                <Sparkles className="h-3 w-3" />
                <LocalizedText
                  fr={content.fr.portfolio.new_badge}
                  en={content.en.portfolio.new_badge}
                />
              </Badge>
            )}
            {project.videoUrl && (
              <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                <Film className="h-4 w-4 text-primary" />
              </div>
            )}
            {project.isVisualizable && (
              <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                <Cuboid className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        </div>
        <CardContent className="flex flex-grow flex-col p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge className={cn('w-fit', getSectorBadgeClass(project.sector))}>
              <LocalizedText
                fr={content.fr.portfolio.filters.sectors[project.sector]}
                en={content.en.portfolio.filters.sectors[project.sector]}
              />
            </Badge>
            <Badge variant="outline" className="w-fit">
              <LocalizedText
                fr={content.fr.portfolio.filters.production_types[project.productionType]}
                en={content.en.portfolio.filters.production_types[project.productionType]}
              />
            </Badge>
          </div>
          <LocalizedText
            as="h3"
            className="mb-2 font-headline text-lg font-bold text-card-foreground"
            fr={project.title.fr}
            en={project.title.en}
          />
          <LocalizedText
            as="p"
            className="mb-4 flex-grow text-sm text-muted-foreground"
            fr={project.description.fr}
            en={project.description.en}
          />
          <div className="mt-auto flex items-center justify-between text-sm">
            <span className="text-xs text-muted-foreground localized-fr">{formattedDateFr}</span>
            <span className="text-xs text-muted-foreground localized-en">{formattedDateEn}</span>
            <div className="flex items-center font-medium text-primary">
              <LocalizedText
                fr={content.fr.portfolio.view_project_cta}
                en={content.en.portfolio.view_project_cta}
              />
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
