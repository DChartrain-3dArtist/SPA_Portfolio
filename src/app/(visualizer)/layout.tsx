
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import './visualizer-theme.css';
import { VisualizerHeader } from '@/components/visualizer/visualizer-header';
import { BackgroundHalos } from '@/components/background-halos';
import { useTheme } from '@/contexts/theme-context';
import { SidebarProvider, Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { VisualizerSidebar } from '@/components/visualizer/visualizer-sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// Le bouton de bascule est dans VisualizerSidebar.tsx pour desktop
// mais nous avons besoin d'un bouton séparé ici pour mobile.

function MobileMenuToggle() {
    const { setOpenMobile } = useSidebar();
    return (
        <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-50" onClick={() => setOpenMobile(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Ouvrir le menu</span>
        </Button>
    )
}

export default function VisualizerLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');

    // On unmount, restore the original theme
    return () => {
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
    };
  }, [theme]);


  return (
     <SidebarProvider>
        <div className="visualizer-theme dark">
          <div className="relative flex min-h-screen">
              <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/80 backdrop-blur-sm">
                  <VisualizerSidebar />
              </Sidebar>
               <div className={cn("flex flex-1 justify-center", isMobile && "pb-24")}>
                  <SidebarInset>
                    <div className="relative flex min-h-svh flex-1 flex-col">
                        <MobileMenuToggle />
                        <BackgroundHalos />
                        <VisualizerHeader />
                        <main className="flex-1 w-full px-4 py-8">{children}</main>
                    </div>
                  </SidebarInset>
               </div>
          </div>
        </div>
    </SidebarProvider>
  );
}
