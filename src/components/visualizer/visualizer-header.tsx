
'use client';

import { Breadcrumbs } from './breadcrumbs';
import { usePathname } from 'next/navigation';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

export function VisualizerHeader() {
  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumb();
  const { language } = useLanguage();
  const c = content[language].visualizer;

  const fallbackBreadcrumbs = useMemo(() => {
    if (pathname.startsWith('/visualizer/library')) {
      return [
        { label: c.header_home_breadcrumb, href: '/visualizer' },
        { label: c.header_library_breadcrumb },
      ];
    }

    if (pathname === '/visualizer') {
      return [{ label: c.header_home_breadcrumb }];
    }

    return [];
  }, [pathname, c.header_home_breadcrumb, c.header_library_breadcrumb]);

  const isHomePage = pathname === '/visualizer';
  const resolvedBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : fallbackBreadcrumbs;
  const showBreadcrumbs = !isHomePage && resolvedBreadcrumbs.length > 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        {/* Espace réservé pour le bouton de menu qui est maintenant à l'extérieur */}
        <div className="w-10 h-10"></div>
        
        <div className="flex items-center">
           {showBreadcrumbs && (
            <div className="flex items-center rounded-lg bg-card/50 px-3 py-1.5 border">
                <Breadcrumbs items={resolvedBreadcrumbs} />
            </div>
           )}
        </div>
      </div>
    </header>
  );
}
