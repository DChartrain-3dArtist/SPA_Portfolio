
'use client';

import { Breadcrumbs } from './breadcrumbs';
import { usePathname } from 'next/navigation';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

export function VisualizerHeader() {
    const pathname = usePathname();
    const { breadcrumbs, setBreadcrumbs } = useBreadcrumb();
    const [isClient, setIsClient] = useState(false);
    const { language } = useLanguage();
    const c = content[language].visualizer;
    
    useEffect(() => {
        setIsClient(true);
        // Default breadcrumbs for pages that don't set their own
        if (pathname.startsWith('/visualizer/library')) {
            setBreadcrumbs([
                { label: c.header_home_breadcrumb, href: '/visualizer' },
                { label: c.header_library_breadcrumb },
            ]);
        } else if (pathname === '/visualizer') {
            setBreadcrumbs([{ label: c.header_home_breadcrumb }]);
        } else if (pathname.startsWith('/visualizer/item')) {
          // Placeholder, the page itself will set the full breadcrumb
        } else {
          setBreadcrumbs([]);
        }

        // Cleanup function to reset breadcrumbs when leaving a visualizer path
        return () => {
            if (!pathname.startsWith('/visualizer')) {
                setBreadcrumbs([]);
            }
        };
    }, [pathname, setBreadcrumbs, c, language]);

    const isHomePage = pathname === '/visualizer';
    const showBreadcrumbs = isClient && !isHomePage && breadcrumbs.length > 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        {/* Espace réservé pour le bouton de menu qui est maintenant à l'extérieur */}
        <div className="w-10 h-10"></div>
        
        <div className="flex items-center">
           {showBreadcrumbs && (
            <div className="flex items-center rounded-lg bg-card/50 px-3 py-1.5 border">
                <Breadcrumbs items={breadcrumbs} />
            </div>
           )}
        </div>
      </div>
    </header>
  );
}
