
'use client';

import dynamic from 'next/dynamic';
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
import { LogoSVG } from '../logo-svg';
import { CHATBOT_VISIBLE_PATHS, isNavItemActive } from '@/lib/navigation';

const Chatbot = dynamic(
  () => import('../chatbot/chatbot').then((module) => module.Chatbot),
  {
    ssr: false,
    loading: () => null,
  }
);

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
    { href: '/visualizer', label: c.nav.visualizer, icon: Cuboid, variant: 'outline' as const, isCta: true },
  ];
  const showChatbot = CHATBOT_VISIBLE_PATHS.includes(
    pathname as (typeof CHATBOT_VISIBLE_PATHS)[number]
  );


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
          {navItems.filter(item => !item.isCta).map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                size="lg"
                variant={'default'}
                isActive={isNavItemActive(pathname, item.href)}
                tooltip={item.label}
                className={!isNavItemActive(pathname, item.href) ? 'bg-transparent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground' : undefined}
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
                variant={'outline'}
                tooltip={c.nav.visualizer}
              >
                <Link href={'/visualizer'}>
                  <Cuboid />
                  <span>{c.nav.visualizer}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
            <div className="flex flex-col gap-4 p-2 group-data-[collapsible=icon]:items-center">
              <div className="flex items-center justify-center gap-2 group-data-[collapsible=icon]:hidden">
                <a href="https://www.linkedin.com/in/donovan-chartrain-63686a138" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon social-icon-linkedin">
                    <Linkedin />
                </a>
                <a href="https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon social-icon-instagram">
                    <Instagram />
                </a>
                <a href="https://www.youtube.com/@d.chartrain3dtechnicalarti873" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="social-icon social-icon-youtube">
                    <Youtube />
                </a>
                <a href="https://github.com/DChartrain-3dArtist" target="_blank" rel="noopener noreferrer" aria-label="Github" className="social-icon social-icon-github">
                    <Github />
                </a>
              </div>
            </div>
          </SidebarFooter>
    </>
  );

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
            <main className="relative flex min-h-svh flex-1 flex-col animate-fade-in">
                {children}
            </main>
            <Footer />
        </SidebarInset>
      </div>

      <Chatbot show={showChatbot} />

      {isMobile && (
        <>
          <div className="fixed bottom-0 left-0 z-50 h-20 w-full border-t border-border bg-background/95 pb-4 backdrop-blur">
            <nav className="grid h-full grid-cols-5 items-stretch">
              {navItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex flex-col items-center justify-center gap-1 font-medium transition-colors',
                      item.isCta ? "m-1 p-1 rounded-md bg-primary text-primary-foreground" : "text-sm p-2",
                      !item.isCta && (isActive ? 'text-primary' : 'text-muted-foreground'),
                    )}
                  >
                    <item.icon
                      className={cn(
                        'transition-transform duration-200',
                        item.isCta ? "h-5 w-5" : "h-6 w-6",
                        isActive && !item.isCta ? 'scale-110' : 'scale-100'
                      )}
                    />
                    <span className="text-xs">{item.label}</span>
                    {isActive && !item.isCta && (
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
