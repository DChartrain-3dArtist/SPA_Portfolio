
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getVisualizerItem } from '@/data/projects';
import { VisualizerItem } from '@/data/definitions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Library, AlertTriangle } from 'lucide-react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

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
  const { language } = useLanguage();
  const c = content[language];

  useEffect(() => {
    if (!id) return;
    async function loadItem() {
      setIsLoading(true);
      const fetchedItem = await getVisualizerItem(id);
      setItem(fetchedItem);
      if (fetchedItem) {
        setBreadcrumbs([
          { label: c.visualizer.header_home_breadcrumb, href: '/visualizer' },
          { label: c.visualizer.header_library_breadcrumb, href: '/visualizer/library' },
          { label: fetchedItem.name[language] },
        ]);
      }
      setIsLoading(false);
    }
    loadItem();

    return () => {
       setBreadcrumbs([]); // Reset on unmount
    }
  }, [id, setBreadcrumbs, language, c]);

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
        <h1 className="text-4xl font-bold font-headline mt-4">{c.visualizer.item_detail_not_found}</h1>
        <div className="mt-8 flex items-center justify-center h-96 border rounded-lg bg-card/50">
          <div className="text-center text-destructive">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
            <p className="font-bold">{c.visualizer.item_detail_not_found_message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
     <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 mb-8 gap-4">
            <h1 className="text-4xl font-bold font-headline">{item.name[language]}</h1>
            {item.projectId && (
                 <Button asChild>
                    <Link href={`/portfolio/${item.projectId}`}>
                        <Briefcase className="mr-2" />
                        {c.visualizer.item_detail_cta_project}
                    </Link>
                </Button>
            )}
        </div>
      <div className="mt-8 h-[50vh] md:h-[65vh] w-full max-w-6xl mx-auto">
        <ModelCanvas modelUrl={item.modelUrl} />
      </div>

       <div className="my-8 max-w-3xl mx-auto text-center">
        <p className="text-muted-foreground">{item.description[language]}</p>
       </div>

       <div className="flex justify-center">
            <Button asChild>
                <Link href="/visualizer/library">
                    <Library className="mr-2" />
                    {c.visualizer.item_detail_cta_library}
                </Link>
            </Button>
       </div>
    </div>
  );
}
