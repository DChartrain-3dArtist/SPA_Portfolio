'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import {
  sectors,
  productionTypes,
  type Sector,
  type ProductionType,
  type Project,
} from '@/data/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  RotateCcw,
  Grid,
  List,
  Cuboid,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectCard } from '@/components/portfolio/project-card';
import { Badge } from '@/components/ui/badge';

function getInitialPortfolioFilters() {
  if (typeof window === 'undefined') {
    return {
      activeSector: 'all' as Sector | 'all',
      activeProductionType: 'all' as ProductionType | 'all',
      selectedTechnologies: [] as string[],
    };
  }

  const params = new URLSearchParams(window.location.search);
  const sectorParam = params.get('sector');
  const typeParam = params.get('type');
  const techParam = params.get('tech');

  return {
    activeSector:
      sectorParam && sectors.includes(sectorParam as Sector)
        ? (sectorParam as Sector)
        : ('all' as const),
    activeProductionType:
      typeParam && productionTypes.includes(typeParam as ProductionType)
        ? (typeParam as ProductionType)
        : ('all' as const),
    selectedTechnologies: techParam ? [techParam] : [],
  };
}

function getSectorFilterClass(activeSector: Sector | 'all', sector: Sector) {
  if (activeSector === sector) {
    if (sector === 'Infographie 3D') {
      return 'bg-orange-500 hover:bg-orange-500/90 text-white border-transparent';
    }

    if (sector === '3D Temps Réel') {
      return 'bg-emerald-500 hover:bg-emerald-500/90 text-white border-transparent';
    }

    return 'bg-violet-500 hover:bg-violet-500/90 text-white border-transparent';
  }

  if (sector === 'Infographie 3D') {
    return 'border-orange-500/50 text-orange-500 dark:text-orange-400 dark:border-orange-400/50 hover:bg-orange-500/10';
  }

  if (sector === '3D Temps Réel') {
    return 'border-emerald-500/50 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400/50 hover:bg-emerald-500/10';
  }

  return 'border-violet-500/50 text-violet-500 dark:text-violet-400 dark:border-violet-400/50 hover:bg-violet-500/10';
}

export function PortfolioClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const { language } = useLanguage();
  const c = content[language].portfolio;
  const isMobile = useIsMobile();
  const initialFilters = useMemo(() => getInitialPortfolioFilters(), []);

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [activeSector, setActiveSector] = useState<Sector | 'all'>(
    initialFilters.activeSector
  );
  const [activeProductionType, setActiveProductionType] = useState<
    ProductionType | 'all'
  >(initialFilters.activeProductionType);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [showVisualizableOnly, setShowVisualizableOnly] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    initialFilters.selectedTechnologies
  );

  const latestProject = useMemo(() => {
    if (initialProjects.length === 0) {
      return null;
    }

    return [...initialProjects].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [initialProjects]);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();

    initialProjects.forEach((project) => {
      project.technologies.forEach((technology) => techSet.add(technology));
    });

    return Array.from(techSet).sort();
  }, [initialProjects]);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = initialProjects;

    if (showVisualizableOnly) {
      filtered = filtered.filter((project) => project.isVisualizable);
    }

    if (activeSector !== 'all') {
      filtered = filtered.filter((project) => project.sector === activeSector);
    }

    if (activeProductionType !== 'all') {
      filtered = filtered.filter(
        (project) => project.productionType === activeProductionType
      );
    }

    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title[language].toLowerCase().includes(normalizedSearch) ||
          project.description[language]
            .toLowerCase()
            .includes(normalizedSearch)
      );
    }

    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechnologies.some((technology) =>
          project.technologies.includes(technology)
        )
      );
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'date-asc' ? dateA - dateB : dateB - dateA;
    });
  }, [
    activeProductionType,
    activeSector,
    initialProjects,
    language,
    searchTerm,
    selectedTechnologies,
    showVisualizableOnly,
    sortOrder,
  ]);

  const handleResetFilters = () => {
    setActiveSector('all');
    setActiveProductionType('all');
    setSearchTerm('');
    setSortOrder('date-desc');
    setLayout('grid');
    setShowVisualizableOnly(false);
    setSelectedTechnologies([]);
  };

  const renderedProjects = useMemo(() => {
    if (filteredAndSortedProjects.length === 0) {
      return (
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-lg text-muted-foreground">{c.no_results}</p>
        </div>
      );
    }

    let gridColumns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (isMobile) {
      gridColumns = layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1';
    } else if (layout === 'list') {
      gridColumns = 'grid-cols-1';
    }

    const gap = isMobile && layout === 'grid' ? 'gap-0.5' : 'gap-8';

    return (
      <div className={cn('grid w-full', gridColumns, gap)}>
        {filteredAndSortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            layout={layout}
            isLatest={project.id === latestProject?.id}
          />
        ))}
      </div>
    );
  }, [c.no_results, filteredAndSortedProjects, isMobile, layout, latestProject]);

  return (
    <>
      <div className="mb-12 px-4 sm:px-6 lg:px-8">
        <Card className="bg-muted p-4 dark:bg-card">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder={c.search_placeholder}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-10 w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleResetFilters}
              className="h-10 w-10 shrink-0"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="sr-only">Retablir les filtres</span>
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <Button
              variant={filtersVisible ? 'default' : 'secondary'}
              onClick={() => setFiltersVisible((current) => !current)}
              className="w-full justify-center data-[state=open]:bg-primary hover:bg-primary/90 md:w-auto md:col-span-1"
              data-state={filtersVisible ? 'open' : 'closed'}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {c.filters.title}
            </Button>
            <div className="flex items-center justify-center gap-2 md:col-span-1 md:col-start-3 md:ml-auto">
              <Button
                variant={layout === 'grid' ? 'default' : 'secondary'}
                onClick={() => setLayout('grid')}
                size="sm"
              >
                <Grid className="mr-2 h-4 w-4" />
                {c.layout_grid}
              </Button>
              <Button
                variant={layout === 'list' ? 'default' : 'secondary'}
                onClick={() => setLayout('list')}
                size="sm"
              >
                <List className="mr-2 h-4 w-4" />
                {c.layout_list}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              filtersVisible ? 'max-h-[500px] pt-4 opacity-100' : 'max-h-0 pt-0 opacity-0'
            )}
          >
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 items-center gap-x-4 gap-y-2 md:grid-cols-[max-content_1fr]">
                <p className="text-sm font-medium text-muted-foreground md:text-right">
                  {c.sort_label}
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  <Button
                    variant={sortOrder === 'date-desc' ? 'default' : 'secondary'}
                    onClick={() => setSortOrder('date-desc')}
                    className="h-8 rounded-full px-4 text-sm"
                  >
                    {c.sort_newest}
                  </Button>
                  <Button
                    variant={sortOrder === 'date-asc' ? 'default' : 'secondary'}
                    onClick={() => setSortOrder('date-asc')}
                    className="h-8 rounded-full px-4 text-sm"
                  >
                    {c.sort_oldest}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 items-center gap-x-4 gap-y-2 md:grid-cols-[max-content_1fr]">
                <p className="text-sm font-medium text-muted-foreground md:text-right">
                  {c.filters.sector}
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  <Button
                    variant={activeSector === 'all' ? 'default' : 'secondary'}
                    onClick={() => setActiveSector('all')}
                    className="h-8 rounded-full px-4 text-sm"
                  >
                    {c.filters.all}
                  </Button>
                  {sectors.map((sector) => (
                    <Button
                      key={sector}
                      variant={activeSector === sector ? 'default' : 'secondary'}
                      onClick={() =>
                        setActiveSector((current) =>
                          current === sector ? 'all' : sector
                        )
                      }
                      className={cn(
                        'h-8 rounded-full border px-4 text-sm',
                        getSectorFilterClass(activeSector, sector)
                      )}
                    >
                      {c.filters.sectors[sector]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 items-center gap-x-4 gap-y-2 md:grid-cols-[max-content_1fr]">
                <p className="text-sm font-medium text-muted-foreground md:text-right">
                  {c.filters.production}
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  <Button
                    variant={
                      activeProductionType === 'all' ? 'default' : 'secondary'
                    }
                    onClick={() => setActiveProductionType('all')}
                    className="h-8 rounded-full px-4 text-sm"
                  >
                    {c.filters.all_f}
                  </Button>
                  {productionTypes.map((type) => (
                    <Button
                      key={type}
                      variant={
                        activeProductionType === type ? 'default' : 'secondary'
                      }
                      onClick={() =>
                        setActiveProductionType((current) =>
                          current === type ? 'all' : type
                        )
                      }
                      className="h-8 rounded-full px-4 text-sm"
                    >
                      {c.filters.production_types[type]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-center">
                      {c.filters.technologies}
                      {selectedTechnologies.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedTechnologies.length}
                        </Badge>
                      )}
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-80 w-64 overflow-y-auto">
                    <DropdownMenuLabel>
                      {c.filters.technologies_label}
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onSelect={() => setSelectedTechnologies([])}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      {c.filters.technologies_reset}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {allTechnologies.map((technology) => (
                      <DropdownMenuCheckboxItem
                        key={technology}
                        checked={selectedTechnologies.includes(technology)}
                        onCheckedChange={(checked) => {
                          setSelectedTechnologies((current) =>
                            checked
                              ? [...current, technology]
                              : current.filter((item) => item !== technology)
                          );
                        }}
                        onSelect={(event) => event.preventDefault()}
                      >
                        {technology}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant={showVisualizableOnly ? 'default' : 'outline'}
                  onClick={() => setShowVisualizableOnly((current) => !current)}
                  className="w-full"
                >
                  <Cuboid className="mr-2 h-4 w-4" />
                  {c.filter_visualizable_projects}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div
        className={cn(
          'mb-16 md:mb-24',
          isMobile && layout === 'grid' ? '' : 'px-4 sm:px-6 lg:px-8'
        )}
      >
        {renderedProjects}
      </div>
    </>
  );
}
