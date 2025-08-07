
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects, getVisualizerItems } from '@/data/projects';
import type { Project, VisualizerItem } from '@/data/definitions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ChevronRight, Briefcase, Cuboid, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Skeleton } from '@/components/ui/skeleton';


/**
 * Composant de section réutilisable pour structurer la page.
 */
function Section({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {children}
                </ul>
            </CardContent>
        </Card>
    );
}

/**
 * Composant d'élément de liste réutilisable pour les liens.
 */
function ListItemLink({ href, title }: { href: string, title: string }) {
    return (
        <li className="border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
            <Link href={href} className="flex items-center justify-between group text-foreground/80 hover:text-primary transition-colors">
                <span>{title}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
        </li>
    );
}

/**
 * Composant pour la page du plan du site.
 */
export default function SitemapPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [projects, setProjects] = useState<Project[]>([]);
    const [visualizerItems, setVisualizerItems] = useState<VisualizerItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const [fetchedProjects, fetchedVisualizerItems] = await Promise.all([
                getProjects(),
                getVisualizerItems()
            ]);
            setProjects(fetchedProjects);
            setVisualizerItems(fetchedVisualizerItems);
            setIsLoading(false);
        }
        loadData();
    }, []);

    const mainPages = [
        { href: '/', title: c.nav.home },
        { href: '/portfolio', title: c.nav.portfolio },
        { href: '/about', title: c.nav.about },
        { href: '/contact', title: c.nav.contact },
    ];
    
    const visualizerPages = [
        { href: '/visualizer', title: c.visualizer.home_title },
        { href: '/visualizer/library', title: c.visualizer.library_title },
    ];

    const legalPages = [
        { href: '/legal-notice', title: c.legal_notice.title },
        { href: '/privacy-policy', title: c.privacy_policy.title },
        { href: '/style-guide', title: c.style_guide.title },
    ];

    if (isLoading) {
        return (
            <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
                    <div className="space-y-8">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="outline" className="mb-8">
                    <Link href="/">
                        <Home className="mr-2" />
                        {c.sitemap.back_to_home}
                    </Link>
                </Button>

                <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{c.sitemap.title}</h1>

                <Section title={c.sitemap.main_pages} icon={<Home className="h-6 w-6" />}>
                    {mainPages.map(page => <ListItemLink key={page.href} {...page} />)}
                </Section>
                
                <Section title={c.sitemap.portfolio_projects} icon={<Briefcase className="h-6 w-6" />}>
                    {projects.map(project => (
                        <ListItemLink key={project.id} href={`/portfolio/${project.id}`} title={project.title[language]} />
                    ))}
                </Section>

                <Section title={c.sitemap.visualizer_space} icon={<Cuboid className="h-6 w-6" />}>
                     {visualizerPages.map(page => <ListItemLink key={page.href} {...page} />)}
                     <h3 className="font-bold text-sm text-foreground pt-4 pb-2">{c.sitemap.visualizer_models_subtitle}</h3>
                     {visualizerItems.map(item => (
                        <li key={item.id} className="border-b border-border/50 pb-2 last:border-b-0 last:pb-0 pl-4">
                           <Link href={`/visualizer/item/${item.id}`} className="flex items-center justify-between group text-foreground/80 hover:text-primary transition-colors text-sm">
                               <span>{item.name[language]}</span>
                               <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </Link>
                        </li>
                    ))}
                </Section>
                
                <Section title={c.sitemap.legal_info} icon={<FileText className="h-6 w-6" />}>
                    {legalPages.map(page => <ListItemLink key={page.href} {...page} />)}
                </Section>
            </div>
        </main>
    );
}
