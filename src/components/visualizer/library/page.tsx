
'use client';

import { useState, useMemo } from 'react';
import { VisualizerItem } from '@/data/definitions';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cuboid, Library, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Nouveau composant pour la carte d'un modèle 3D, conçu pour être responsive et s'adapter à la grille.
 */
function ItemCard({ item, isFeatured = false }: { item: VisualizerItem, isFeatured?: boolean }) {
    const { language } = useLanguage();
    const isMobile = useIsMobile();

    const cardClasses = cn(
        "block group overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 h-full flex flex-col"
    );
    
    const imageContainerClasses = cn(
        "relative overflow-hidden w-full",
        isFeatured && !isMobile ? "aspect-video" : "aspect-square"
    );

    return (
      <Link href={`/visualizer/item/${item.id}`} className={cardClasses}>
        <Card className="h-full flex flex-col">
            <div className={imageContainerClasses}>
                <Image
                    src={item.image}
                    alt={item.name[language]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm border border-border/50">
                    <Cuboid className="h-4 w-4 text-primary" />
                    <span>{content[language].visualizer.item_card_badge}</span>
                </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className={cn(
                    "font-bold font-headline text-card-foreground mb-1", 
                    isFeatured && !isMobile ? 'text-xl' : 'text-lg'
                )}>
                    {item.name[language]}
                </h3>
                 <p className={cn(
                    "text-muted-foreground flex-grow line-clamp-2", 
                    isFeatured && !isMobile ? 'text-sm mb-4' : 'text-xs mb-2'
                )}>
                    {item.description[language]}
                </p>
                <div className={cn(
                    "flex items-center text-sm text-primary font-medium mt-auto",
                    isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}>
                    {content[language].visualizer.item_card_cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
            </CardContent>
        </Card>
      </Link>
    );
}

export default function LibraryPage({ items }: { items: VisualizerItem[] }) {
    const { language } = useLanguage();
    const c = content[language].visualizer;

    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Création de listes de données indépendantes et mémorisées
    const categories = useMemo(() => {
        const cats = new Set(items.map(item => item.category || "Autre"));
        return ['all', ...Array.from(cats)];
    }, [items]);
    
    const featuredItems = useMemo(() => {
        return items.filter(item => item.isFeatured);
    }, [items]);

    const allItemsFiltered = useMemo(() => {
        if (activeCategory === 'all') {
            return items;
        }
        return items.filter(item => item.category === activeCategory);
    }, [items, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold font-headline mt-4 mb-2 text-center">{c.library_title}</h1>
      <p className="mb-12 text-muted-foreground text-center">
        {c.library_subtitle}
      </p>

      {featuredItems.length > 0 && (
         <section className="mb-16">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2">
                <Library className="h-6 w-6 text-primary" />
                {c.library_featured_title}
            </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredItems.map(item => <ItemCard key={item.id} item={item} isFeatured={true} />)}
            </div>
        </section>
      )}

      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                 <Tag className="h-6 w-6 text-primary" />
                {c.library_all_title}
            </h2>
             <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                    <Button 
                        key={category} 
                        variant={activeCategory === category ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full shrink-0"
                    >
                        {category === 'all' ? c.filters.all : category}
                    </Button>
                ))}
            </div>
        </div>

        {allItemsFiltered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allItemsFiltered.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
        ) : (
             <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">{c.library_empty}</p>
            </div>
        )}
      </section>
    </div>
  );
}
