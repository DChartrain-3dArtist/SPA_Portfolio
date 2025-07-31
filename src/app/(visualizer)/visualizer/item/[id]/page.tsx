
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getVisualizerItem } from '@/data/projects';
import { VisualizerItem } from '@/data/definitions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Library } from 'lucide-react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const ModelCanvas = dynamic(() => import('@/components/visualizer/model-canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg border bg-card/50">
      <p className="text-foreground">Chargement du visualiseur...</p>
    </div>
  ),
});

export default function ItemDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [item, setItem] = useState<VisualizerItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    if (!id) return;
    async function loadItem() {
      setIsLoading(true);
      const fetchedItem = await getVisualizerItem(id);
      setItem(fetchedItem);
      if (fetchedItem) {
        setBreadcrumbs([
          { label: 'Espace Visualiseur', href: '/visualizer' },
          { label: 'Bibliothèque', href: '/visualizer/library' },
          { label: fetchedItem.name.fr },
        ]);
      }
      setIsLoading(false);
    }
    loadItem();

    return () => {
       setBreadcrumbs([]); // Reset on unmount
    }
  }, [id, setBreadcrumbs]);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mt-4 mb-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-36" />
        </div>
        <div className="h-[60vh] w-full">
            <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div>
        <h1 className="text-4xl font-bold font-headline mt-4">Modèle non trouvé</h1>
        <div className="mt-8 flex items-center justify-center h-96 border rounded-lg bg-card/50">
          <p className="text-muted-foreground">Impossible de trouver les informations pour ce modèle.</p>
        </div>
      </div>
    );
  }

  return (
     <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 mb-8 gap-4">
            <h1 className="text-4xl font-bold font-headline">{item.name.fr}</h1>
            {item.projectId && (
                 <Button asChild>
                    <Link href={`/portfolio/${item.projectId}`}>
                        <Briefcase className="mr-2" />
                        Voir le projet
                    </Link>
                </Button>
            )}
        </div>
      <div className="mt-8 h-[50vh] md:h-[65vh] w-full max-w-6xl mx-auto">
        {item.modelUrl ? (
            <ModelCanvas modelUrl={item.modelUrl} />
        ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg border bg-card/50">
                <p className="text-muted-foreground">Aucun modèle 3D disponible pour cet objet.</p>
            </div>
        )}
      </div>

       <div className="my-8 max-w-3xl mx-auto text-center">
        <p className="text-muted-foreground">{item.description.fr}</p>
       </div>

       <div className="flex justify-center">
            <Button asChild>
                <Link href="/visualizer/library">
                    <Library className="mr-2" />
                    Retour à la bibliothèque
                </Link>
            </Button>
       </div>
    </div>
  );
}
