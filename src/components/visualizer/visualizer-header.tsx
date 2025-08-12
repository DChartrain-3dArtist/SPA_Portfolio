
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Breadcrumbs } from './breadcrumbs';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/portfolio" className="group flex items-center space-x-2 main-site-cta-text">
            <Button variant="outline" size="icon" className="main-site-cta">
                <LogOut className="h-5 w-5" />
            </Button>
            <span className="hidden font-bold sm:inline-block group-hover:underline">{c.header_back}</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
           {showBreadcrumbs && (
            <div className="rounded-lg bg-card/50 px-3 py-1.5 border">
                <Breadcrumbs items={breadcrumbs} />
            </div>
           )}
        </div>
      </div>
    </header>
  );
}
