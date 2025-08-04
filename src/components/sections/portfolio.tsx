

'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { getProjects } from '@/data/projects';
import { sectors, productionTypes, type Sector, type ProductionType, Project } from '@/data/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Search, Mail, RotateCcw, Grid, List, Cuboid, Sparkles, Film, SlidersHorizontal, ChevronDown, Home } from 'lucide-react';
import { Header } from '../layout/header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectCard } from '@/components/portfolio/project-card';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

/**
 * Composant de titre de page réutilisable.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu du titre.
 * @returns Un composant de titre H1 stylisé.
 */
function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">{children}</h1>;
}

/**
 * Composant principal pour la page du portfolio.
 * Gère l'affichage, le filtrage et le tri des projets.
 * @returns Un composant React pour la page portfolio.
 */
export default function PortfolioPage() {
  const { language } = useLanguage();
  const c = content[language].portfolio;
  const isMobile = useIsMobile();
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  
  // États pour les données et l'UI
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // États pour les filtres et l'affichage
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [activeSector, setActiveSector] = useState<Sector | 'all'>('all');
  const [activeProductionType, setActiveProductionType] = useState<ProductionType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [showVisualizableOnly, setShowVisualizableOnly] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  // Charge les projets au montage du composant.
  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      setIsLoading(false);
    }
    loadProjects();
  }, []);

  // Synchronise les filtres avec les paramètres de l'URL au chargement.
  useEffect(() => {
    const sectorParam = searchParams.get('sector');
    const typeParam = searchParams.get('type');
    const techParam = searchParams.get('tech');

    if (sectorParam && sectors.includes(sectorParam as Sector)) {
        setActiveSector(sectorParam as Sector);
    }
    if (typeParam && productionTypes.includes(typeParam as ProductionType)) {
        setActiveProductionType(typeParam as ProductionType);
    }
    if (techParam) {
        setSelectedTechnologies([techParam]);
    }
  }, [searchParams]);

  // Adapte la mise en page par défaut en fonction de la taille de l'écran.
  useEffect(() => {
    if (isMobile) {
        setLayout('grid');
    }
  }, [isMobile]);

  // Fait défiler jusqu'à la section des filtres lors du changement de layout sur desktop.
  useEffect(() => {
    if (filterSectionRef.current && !isMobile) {
        filterSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [layout, isMobile]);

  // Calcule le projet le plus récent pour lui attribuer un badge spécial.
  const latestProject = useMemo(() => {
    if (!projects || projects.length === 0) return null;
    const sortedByDate = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedByDate.length > 0 ? sortedByDate[0] : null;
  }, [projects]);
  
  // Calcule la liste de toutes les technologies uniques disponibles pour le filtre.
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  // Logique principale de filtrage et de tri des projets.
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;
    
    // Filtre pour n'afficher que les projets avec des modèles 3D visualisables.
    if (showVisualizableOnly) {
      filtered = filtered.filter(p => p.isVisualizable);
    }

    // Filtre par secteur.
    if (activeSector !== 'all') {
      filtered = filtered.filter(p => p.sector === activeSector);
    }
    
    // Filtre par type de production.
    if (activeProductionType !== 'all') {
        filtered = filtered.filter(p => p.productionType === activeProductionType);
    }

    // Filtre par terme de recherche dans le titre ou la description.
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par technologies. Affiche les projets qui ont AU MOINS UNE des technologies sélectionnées.
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(p => 
        selectedTechnologies.some(tech => p.technologies.includes(tech))
      );
    }

    // Tri les projets filtrés.
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortOrder === 'date-asc') {
        return dateA - dateB;
      }
      return dateB - dateA; // date-desc (par défaut)
    });

    return sorted;
  }, [projects, activeSector, activeProductionType, searchTerm, sortOrder, language, showVisualizableOnly, selectedTechnologies]);
  
  // Gère le clic sur un filtre de secteur.
  const handleSectorClick = (sector: Sector) => {
    setActiveSector(prev => (prev === sector ? 'all' : sector));
  };

  // Réinitialise tous les filtres à leur état par défaut.
  const handleResetFilters = () => {
    setActiveSector('all');
    setActiveProductionType('all');
    setSearchTerm('');
    setSortOrder('date-desc');
    if (!isMobile) setLayout('grid');
    setShowVisualizableOnly(false);
    setSelectedTechnologies([]);
  };

  // Rendu de la grille des projets, avec des états de chargement et de "aucun résultat".
  const renderProjects = () => {
    if (isLoading) {
      const gridCols = layout === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      return (
        <div className={cn("grid gap-8 w-full", gridCols)}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="w-full aspect-video" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    if (filteredAndSortedProjects.length === 0) {
        return (
            <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
                <p className="text-lg text-muted-foreground">{c.no_results}</p>
            </div>
        );
    }

    // Affichage spécifique pour la grille sur mobile (miniatures compactes).
    if (isMobile && layout === 'grid') {
        return (
             <div className="grid grid-cols-4 gap-1">
                {filteredAndSortedProjects.map(project => {
                    const isLatest = project.id === latestProject?.id;
                    return (
                        <Link href={`/portfolio/${project.id}`} key={project.id} className="relative group aspect-square">
                            <Image
                                src={project.image}
                                alt={project.title[language]}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-1 right-1 flex flex-col items-end gap-1">
                                {isLatest && (
                                    <Badge variant="default" className="bg-primary text-primary-foreground border-transparent gap-1 text-xs h-5 w-5 p-0 flex items-center justify-center">
                                        <Sparkles className="h-2.5 w-2.5" />
                                    </Badge>
                                )}
                                {project.videoUrl && (
                                    <div className="flex items-center justify-center gap-1 rounded-full bg-background/80 text-xs font-semibold backdrop-blur-sm border border-border/50 h-5 w-5 p-0">
                                        <Film className="h-2.5 w-2.5 text-primary" />
                                    </div>
                                )}
                                {project.isVisualizable && (
                                    <div className="flex items-center justify-center gap-1 rounded-full bg-background/80 text-xs font-semibold backdrop-blur-sm border border-border/50 h-5 w-5 p-0">
                                        <Cuboid className="h-2.5 w-2.5 text-primary" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    // Affichage pour le bureau (Grille & Liste) et le mobile (Liste).
    const gridCols = layout === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
      <div className={cn("grid gap-8 w-full", gridCols)}>
        {filteredAndSortedProjects.map(project => (
          <ProjectCard key={project.id} project={project} layout={layout} isLatest={project.id === latestProject?.id} />
        ))}
      </div>
    );
  };


  return (
    <>
      <Header />
      <main className="w-full py-16 md:py-24">
        <section id="portfolio" className="w-full">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <PageTitle>{c.title}</PageTitle>
                    <p className="text-foreground/90 mb-12 max-w-4xl mx-auto">
                        {c.intro.part1}
                        <span className="text-primary font-medium">{c.intro.highlight1}</span>
                        {c.intro.part2}
                        <span className="text-primary font-medium">{c.intro.highlight2}</span>
                        {c.intro.part3}
                        <span className="text-primary font-medium">{c.intro.highlight3}</span>
                        {c.intro.part4}
                    </p>
                </div>
            </div>

            {/* Section des filtres */}
            <div ref={filterSectionRef} className="px-4 sm:px-6 lg:px-8 mb-12">
              <Card className="p-4 bg-muted dark:bg-card">
                  {/* Barre de recherche et bouton de réinitialisation */}
                  <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                          <Input 
                              placeholder={c.search_placeholder}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 h-10 w-full"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                      <Button variant="secondary" size="icon" onClick={handleResetFilters} className="h-10 w-10 shrink-0">
                          <RotateCcw className="h-5 w-5"/>
                          <span className="sr-only">Rétablir les filtres</span>
                      </Button>
                  </div>
                  
                  {/* Boutons pour afficher les filtres et changer de layout */}
                   <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
                     <Button 
                       variant={filtersVisible ? 'default' : 'secondary'}
                       onClick={() => setFiltersVisible(prev => !prev)} 
                       className="w-full md:w-auto justify-center md:col-span-1 data-[state=open]:bg-primary hover:bg-primary/90 active:bg-primary/90"
                       data-state={filtersVisible ? 'open' : 'closed'}
                     >
                       <SlidersHorizontal className="mr-2 h-4 w-4" />
                       {c.filters.title}
                     </Button>
                     <div className="flex justify-center items-center gap-2 md:col-start-3 md:col-span-1 md:ml-auto">
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

                  {/* Contenu des filtres (affiché conditionnellement) */}
                  <div className={cn("transition-all duration-300 ease-in-out overflow-hidden", filtersVisible ? "max-h-[500px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0")}>
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                        {/* Filtre de tri */}
                        <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2">
                           <p className="text-sm font-medium text-muted-foreground md:text-right">{c.sort_label}</p>
                           <div className="flex flex-wrap justify-start gap-2">
                               <Button
                                   variant={sortOrder === 'date-desc' ? 'default' : 'secondary'}
                                   onClick={() => setSortOrder('date-desc')}
                                   className="rounded-full h-8 px-4 text-sm"
                               >
                                   {c.sort_newest}
                               </Button>
                               <Button
                                   variant={sortOrder === 'date-asc' ? 'default' : 'secondary'}
                                   onClick={() => setSortOrder('date-asc')}
                                   className="rounded-full h-8 px-4 text-sm"
                               >
                                   {c.sort_oldest}
                               </Button>
                           </div>
                       </div>
                       {/* Filtre par secteur */}
                       <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2">
                          <p className="text-sm font-medium text-muted-foreground md:text-right">{c.filters.sector}</p>
                          <div className="flex flex-wrap justify-start gap-2">
                              <Button
                                  variant={activeSector === 'all' ? 'default' : 'secondary'}
                                  onClick={() => setActiveSector('all')}
                                  className="rounded-full h-8 px-4 text-sm"
                              >
                                  {c.filters.all}
                              </Button>
                              {sectors.map(sector => (
                                  <Button
                                      key={sector}
                                      variant={activeSector === sector ? 'default' : 'secondary'}
                                      onClick={() => handleSectorClick(sector)}
                                      className={cn(
                                          "rounded-full h-8 px-4 text-sm border",
                                          activeSector === sector ?
                                              (sector === 'Infographie 3D' ? 'bg-orange-500 hover:bg-orange-500/90 text-white border-transparent' :
                                              sector === '3D Temps Réel' ? 'bg-emerald-500 hover:bg-emerald-500/90 text-white border-transparent' :
                                              'bg-violet-500 hover:bg-violet-500/90 text-white border-transparent')
                                          :
                                              (sector === 'Infographie 3D' ? 'border-orange-500/50 text-orange-500 dark:text-orange-400 dark:border-orange-400/50 hover:bg-orange-500/10' :
                                              sector === '3D Temps Réel' ? 'border-emerald-500/50 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400/50 hover:bg-emerald-500/10' :
                                              'border-violet-500/50 text-violet-500 dark:text-violet-400 dark:border-violet-400/50 hover:bg-violet-500/10')
                                      )}
                                  >
                                      {c.filters.sectors[sector]}
                                  </Button>
                              ))}
                          </div>
                      </div>
                      {/* Filtre par type de production */}
                      <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2">
                          <p className="text-sm font-medium text-muted-foreground md:text-right">{c.filters.production}</p>
                          <div className="flex flex-wrap justify-start gap-2">
                              <Button
                                  variant={activeProductionType === 'all' ? 'default' : 'secondary'}
                                  onClick={() => setActiveProductionType('all')}
                                  className="rounded-full h-8 px-4 text-sm"
                              >
                                  {c.filters.all_f}
                              </Button>
                              {productionTypes.map(type => (
                                  <Button
                                      key={type}
                                      variant={activeProductionType === type ? 'default' : 'secondary'}
                                      onClick={() => setActiveProductionType(prev => prev === type ? 'all' : type)}
                                      className="rounded-full h-8 px-4 text-sm"
                                  >
                                      {c.filters.production_types[type]}
                                  </Button>
                              ))}
                          </div>
                      </div>
                      
                      {/* Filtres avancés (Technologies et Projets 3D) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full justify-center">
                                {c.filters.technologies}
                                {selectedTechnologies.length > 0 && (
                                  <Badge variant="secondary" className="ml-2">{selectedTechnologies.length}</Badge>
                                )}
                                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                              <DropdownMenuLabel>{c.filters.technologies_label}</DropdownMenuLabel>
                               <DropdownMenuItem onSelect={() => setSelectedTechnologies([])} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                {c.filters.technologies_reset}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {allTechnologies.map(tech => (
                                <DropdownMenuCheckboxItem
                                  key={tech}
                                  checked={selectedTechnologies.includes(tech)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedTechnologies([...selectedTechnologies, tech]);
                                    } else {
                                      setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
                                    }
                                  }}
                                  onSelect={(e) => e.preventDefault()} // Empêche le menu de se fermer
                                >
                                  {tech}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                              variant={showVisualizableOnly ? 'default' : 'outline'}
                              onClick={() => setShowVisualizableOnly(prev => !prev)}
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
            
            {/* Zone d'affichage des projets */}
            <div className={cn("mb-16 md:mb-24", (layout === 'list' || !isMobile) && "px-4 sm:px-6 lg:px-8")}>
                {renderProjects()}
            </div>
            
        </section>

        {/* Appel à l'action final */}
        <section className="w-full pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
            
                <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">
                        Intéressé par mon profil ?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Travaillons ensemble pour concrétiser votre prochain projet. Je suis toujours ouvert à de nouvelles opportunités.
                    </p>
                    <Button size="lg" asChild className="group mt-8">
                        <Link href="/contact">
                        Me contacter
                        <Mail className="ml-2" />
                        </Link>
                    </Button>
                </div>
        </section>
      </main>
    </>
  );
}
