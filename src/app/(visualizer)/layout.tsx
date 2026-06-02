
import type { ReactNode } from 'react';
import './visualizer-theme.css';
import { VisualizerHeader } from '@/components/visualizer/visualizer-header';
import { BackgroundHalos } from '@/components/background-halos';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { VisualizerSidebar } from '@/components/visualizer/visualizer-sidebar';
import { getVisualizerItems } from '@/data/projects';
import { MobileMenuToggle } from '@/components/visualizer/mobile-menu-toggle';

export default async function VisualizerLayout({ children }: { children: ReactNode }) {
  const items = await getVisualizerItems();


  return (
     <SidebarProvider>
        <div className="visualizer-theme dark">
          <div className="relative flex min-h-screen">
              <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/80 backdrop-blur-sm">
                  <VisualizerSidebar items={items} />
              </Sidebar>
               <div className="flex flex-1 justify-center">
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
