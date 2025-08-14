
'use client'

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Home,
  Library,
  Briefcase,
  User,
  Mail,
  Cuboid,
  LayoutGrid,
  Menu,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { getVisualizerItems } from '@/data/projects';
import type { VisualizerItem } from '@/data/definitions';
import { useState, useEffect } from 'react';
import { LogoSVG } from '../logo-svg';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function VisualizerSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const c = content[language];
  const [items, setItems] = useState<VisualizerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setOpenMobile, toggleSidebar, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
        setOpenMobile(false);
    }
  }

  useEffect(() => {
    async function loadItems() {
      setIsLoading(true);
      const fetchedItems = await getVisualizerItems();
      setItems(fetchedItems);
      setIsLoading(false);
    }
    loadItems();
  }, []);

  const visualizerNav = [
    { href: '/visualizer', label: c.visualizer.header_home_breadcrumb, icon: Home },
    { href: '/visualizer/library', label: c.visualizer.header_library_breadcrumb, icon: Library },
  ];

  const mainSiteNav = [
    { href: '/portfolio', label: c.nav.portfolio, icon: Briefcase },
    { href: '/about', label: c.nav.about, icon: User },
    { href: '/contact', label: c.nav.contact, icon: Mail },
  ];

  const SidebarToggleButton = () => (
     <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="shrink-0"
    >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Ouvrir/Fermer le menu</span>
    </Button>
  );

  return (
    <>
      <SidebarHeader className="flex flex-col items-center group-data-[collapsible=icon]:gap-4">
        {/* En vue icône, le bouton est au-dessus du logo */}
        <div className="hidden group-data-[collapsible=icon]:flex">
            <SidebarToggleButton />
        </div>
         {/* En vue complète, le bouton est à droite du logo */}
        <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
            <Link
            href="/visualizer"
            className="group/logo flex items-center gap-2 text-lg font-bold font-headline text-foreground"
            onClick={handleLinkClick}
            >
            <div className="relative h-10 w-10 transition-transform duration-300 group-hover/logo:rotate-[15deg]">
                <LogoSVG className="w-full h-full text-primary" />
            </div>
            <span className="duration-200">
                Visualiseur
            </span>
            </Link>
            <SidebarToggleButton />
        </div>
         {/* En vue icône, le logo est affiché seul en dessous du bouton */}
         <Link href="/visualizer" className="hidden group-data-[collapsible=icon]:flex">
            <LogoSVG className="w-10 h-10 text-primary" />
         </Link>
      </SidebarHeader>

      <SidebarContent className="flex-grow p-0">
        <ScrollArea className="h-full">
            <SidebarMenu className="w-full p-4">
                <p className="px-2 py-1 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden uppercase">
                    Navigation Visualiseur
                </p>
                {visualizerNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        size="default"
                        variant={pathname === item.href ? 'default' : 'ghost'}
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <Link href={item.href} onClick={handleLinkClick}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                
                <p className="px-2 py-1 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden mt-4 uppercase">
                  Modèles 3D
                </p>
                <SidebarMenuSub>
                    {isLoading && (
                        <>
                            <SidebarMenuSkeleton showIcon />
                            <SidebarMenuSkeleton showIcon />
                        </>
                    )}
                    {items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuSubButton
                        asChild
                        isActive={pathname === `/visualizer/item/${item.id}`}
                        >
                        <Link href={`/visualizer/item/${item.id}`} onClick={handleLinkClick}>
                            <span>{item.name[language]}</span>
                        </Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenuSub>


            </SidebarMenu>
            <SidebarSeparator className="my-4" />
            <SidebarMenu className="w-full p-4">
                 <p className="px-2 py-1 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden uppercase">
                    Retour au site
                </p>
                {mainSiteNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        size="default"
                        variant='ghost'
                        tooltip={item.label}
                    >
                        <Link href={item.href} onClick={handleLinkClick}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
            <SidebarMenuButton asChild variant='outline' size='default' className="main-site-cta" tooltip="Retour au site principal">
                <Link href="/" onClick={handleLinkClick}>
                    <LayoutGrid />
                    <span className="group-data-[collapsible=icon]:hidden">Retour au site principal</span>
                </Link>
            </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </>
  );
}
