
'use client';

import { useState, useEffect } from 'react';
import { getVisualizerItems } from '@/data/projects';
import { VisualizerItem } from '@/data/definitions';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cuboid } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';

// Note: This component is a client component, so we can't export metadata directly.
// We would need a parent server component to do so. For now, we'll add it in the layout or parent page.
// As a workaround, we can set the document title directly, but this is not the recommended Next.js way.

function ItemCard({ item }: { item: VisualizerItem }) {
    return (
      <Link href={`/visualizer/item/${item.id}`} className="block group">
        <Card className="overflow-hidden relative transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1 h-full flex flex-col">
            <div className="relative overflow-hidden w-full aspect-video">
                <Image
                    src={item.image}
                    alt={item.name.fr}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm border border-border/50">
                    <Cuboid className="h-4 w-4 text-primary" />
                    <span>3D</span>
                </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow justify-center text-center">
                <h3 className="text-lg font-bold font-headline text-card-foreground mb-2">{item.name.fr}</h3>
                <div className="hidden mt-auto md:flex items-center justify-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Voir le modèle
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
            </CardContent>
        </Card>
      </Link>
    );
}


export default function LibraryPage() {
    const [items, setItems] = useState<VisualizerItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadItems() {
            setIsLoading(true);
            const fetchedItems = await getVisualizerItems();
            setItems(fetchedItems);
            setIsLoading(false);
        }
        loadItems();
    }, []);

    const renderItems = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i}>
                            <Skeleton className="w-full aspect-video" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                <Skeleton className="h-4 w-1/2 mx-auto" />
                            </div>
                        </Card>
                    ))}
                </div>
            );
        }

        if (items.length === 0) {
            return (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">Aucun modèle 3D disponible pour le moment.</p>
                </div>
            );
        }
        
        return (
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        )
    };


  return (
    <div>
      <h1 className="text-4xl font-bold font-headline mt-4 mb-2 text-center">Bibliothèque des modèles</h1>
      <p className="mb-12 text-muted-foreground text-center">
        Explorez, manipulez et examinez tous les modèles 3D disponibles.
      </p>
      <div className="max-w-7xl mx-auto">
        {renderItems()}
      </div>
    </div>
  );
}
