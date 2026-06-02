'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Library, Layers, Palette, Cpu } from 'lucide-react';

import type { VisualizerItem } from '@/data/definitions';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ModelCanvas = dynamic(() => import('@/components/visualizer/model-canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg border bg-card/50">
      <p className="text-foreground">Chargement du visualiseur...</p>
    </div>
  ),
});

function StatCounter({ end, suffix }: { end: number; suffix?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <span ref={ref}>
      {inView ? <CountUp end={end} duration={2} separator=" " /> : '0'}
      {suffix}
    </span>
  );
}

export default function ItemDetailPage({ item }: { item: VisualizerItem }) {
  const [polycount, setPolycount] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
  const { setBreadcrumbs } = useBreadcrumb();
  const { language } = useLanguage();
  const c = content[language];

  useEffect(() => {
    setBreadcrumbs([
      { label: c.visualizer.header_home_breadcrumb, href: '/visualizer' },
      { label: c.visualizer.header_library_breadcrumb, href: '/visualizer/library' },
      { label: item.name[language] },
    ]);

    return () => {
      setBreadcrumbs([]);
    };
  }, [item, setBreadcrumbs, language, c]);

  const handlePolycountChange = useCallback((count: number) => {
    setPolycount(count);
  }, []);

  const handleMaterialCountChange = useCallback((count: number) => {
    setMaterialCount(count);
  }, []);

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
        <ModelCanvas
          modelUrl={item.modelUrl}
          onPolycountChange={handlePolycountChange}
          onMaterialCountChange={handleMaterialCountChange}
        />
      </div>

      <div className="my-12 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{c.visualizer.tech_details_title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{item.description[language]}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">{c.visualizer.tech_details_polycount}</p>
                  <p className="text-muted-foreground font-mono"><StatCounter end={polycount} /></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">{c.visualizer.tech_details_materials}</p>
                  <p className="text-muted-foreground font-mono"><StatCounter end={materialCount} /></p>
                </div>
              </div>
              <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                <Cpu className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">{c.visualizer.tech_details_software}</p>
                  <p className="text-muted-foreground">{item.software || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
