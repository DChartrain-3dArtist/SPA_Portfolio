
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  useSidebar,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Home,
  Briefcase,
  User,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Sun,
  Moon,
  Languages,
  Cuboid,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Footer } from './footer';
import { Button } from '../ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { content } from '@/lib/content';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Header } from './header';
import { LogoSVG } from '../logo-svg';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme, setTheme } = useTheme();
  const c = content[language];

  const navItems = [
    { href: '/', label: c.nav.home, icon: Home },
    { href: '/portfolio', label: c.nav.portfolio, icon: Briefcase },
    { href: '/about', label: c.nav.about, icon: User },
    { href: '/contact', label: c.nav.contact, icon: Mail },
  ];

  const visualizerItem = { href: '/visualizer', label: c.nav.visualizer, icon: Cuboid, variant: 'outline' as const };
  
  const isNavItemActive = (itemHref: string) => {
    if (itemHref === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(itemHref);
  }

  const sidebarContent = (
    <>
      <SidebarHeader>
        <Link
          href="/"
          className="group/logo flex items-center gap-2 text-lg font-bold font-headline text-foreground"
        >
          <div className="relative h-10 w-10 transition-transform duration-300 group-hover/logo:rotate-[15deg]">
            <LogoSVG className="w-full h-full" />
          </div>
          <span className="duration-200 group-data-[collapsible=icon]:hidden">
            Chartrain Donovan
          </span>
        </Link>

        <div className="space-y-4 group-data-[collapsible=icon]:hidden pt-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="language-switch"
              className="text-sm text-muted-foreground"
            >
              <span>Langue</span>
            </Label>
            <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                    <Label htmlFor="language-switch" className="text-xs">
                        EN
                    </Label>
                </div>
                <Switch
                    id="language-switch"
                    checked={language === 'fr'}
                    onCheckedChange={(checked) =>
                    setLanguage(checked ? 'fr' : 'en')
                    }
                />
                <div className="w-8 flex justify-center">
                    <Label htmlFor="language-switch" className="text-xs">
                        FR
                    </Label>
                </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="theme-switch"
              className="text-sm text-muted-foreground"
            >
              <span>Thème</span>
            </Label>
             <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                    <Sun className="h-5 w-5" />
                </div>
                <Switch
                    id="theme-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) =>
                    setTheme(checked ? 'dark' : 'light')
                    }
                />
                <div className="w-8 flex justify-center">
                    <Moon className="h-5 w-5" />
                </div>
            </div>
          </div>
           <SidebarSeparator className="mt-4" />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex flex-col gap-2 pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
           <SidebarSeparator className="mt-4" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-grow">
        <SidebarMenu className="w-full p-4 flex flex-col justify-center h-full">
          {navItems.slice(0, 4).map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                size="lg"
                variant={isNavItemActive(item.href) ? 'default' : 'ghost'}
                isActive={isNavItemActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            <SidebarMenuItem className="mt-4">
              <SidebarMenuButton
                asChild
                size="lg"
                variant={visualizerItem.variant}
                tooltip={visualizerItem.label}
              >
                <Link href={visualizerItem.href}>
                  <visualizerItem.icon />
                  <span>{visualizerItem.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
            <div className="flex flex-col gap-4 p-2 group-data-[collapsible=icon]:items-center">
              <div className="flex items-center justify-center gap-2 group-data-[collapsible=icon]:hidden">
                <a href="https://www.linkedin.com/in/donovan-chartrain-63686a138" target="_blank" aria-label="LinkedIn" className="social-icon social-icon-linkedin">
                    <Linkedin />
                </a>
                <a href="https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==" target="_blank" aria-label="Instagram" className="social-icon social-icon-instagram">
                    <Instagram />
                </a>
                <a href="https://www.youtube.com/@d.chartrain3dtechnicalarti873" target="_blank" aria-label="Youtube" className="social-icon social-icon-youtube">
                    <Youtube />
                </a>
                <a href="https://github.com/DChartrain-3dArtist" target="_blank" aria-label="Github" className="social-icon social-icon-github">
                    <Github />
                </a>
              </div>
            </div>
          </SidebarFooter>
    </>
  );

  const allNavItems = [...navItems, visualizerItem];

  return (
    <div className="relative flex min-h-screen">
      <Sidebar
        collapsible="icon"
        className="border-r border-border/50 bg-background/80 backdrop-blur-sm"
      >
        {sidebarContent}
      </Sidebar>
      <div className={cn("flex flex-1 justify-center", isMobile && "pb-24")}>
        <SidebarInset>
            <main className="relative flex min-h-svh flex-1 flex-col">
                {children}
            </main>
            <Footer />
        </SidebarInset>
      </div>

      {isMobile && (
        <>
          <div className="fixed bottom-0 left-0 z-50 h-20 w-full border-t border-border bg-background/95 pb-4 backdrop-blur">
            <nav className="grid h-full grid-cols-5 items-stretch">
              {allNavItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                const isCta = 'variant' in item && item.variant === 'outline';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex flex-col items-center justify-center gap-1 font-medium transition-colors',
                      isCta ? "m-1 p-1 rounded-md bg-primary text-primary-foreground" : "text-sm p-2",
                      !isCta && (isActive ? 'text-primary' : 'text-muted-foreground'),
                    )}
                  >
                    <item.icon
                      className={cn(
                        'transition-transform duration-200',
                        isCta ? "h-5 w-5" : "h-6 w-6",
                        isActive && !isCta ? 'scale-110' : 'scale-100'
                      )}
                    />
                    <span className="text-xs">{item.label}</span>
                    {isActive && !isCta && (
                      <div className="absolute top-1 h-1 w-1 rounded-full bg-primary transition-all duration-300"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
