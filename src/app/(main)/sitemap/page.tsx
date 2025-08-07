
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects, getVisualizerItems } from '@/data/projects';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ChevronRight, Briefcase, Cuboid, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan du Site',
  description: 'Explorez facilement toutes les pages, projets et modèles 3D du site de Chartrain Donovan grâce à notre plan de site complet.',
};

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
            <Link href={href} className="flex items-center justify-between group text-muted-foreground hover:text-primary transition-colors">
                <span>{title}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
        </li>
    );
}

/**
 * Composant pour la page du plan du site.
 */
export default async function SitemapPage() {
    const projects = await getProjects();
    const visualizerItems = await getVisualizerItems();
  
    const mainPages = [
        { href: '/', title: 'Accueil' },
        { href: '/portfolio', title: 'Portfolio' },
        { href: '/about', title: 'À Propos' },
        { href: '/contact', title: 'Contact' },
    ];
    
    const visualizerPages = [
        { href: '/visualizer', title: 'Accueil du Visualiseur 3D' },
        { href: '/visualizer/library', title: 'Bibliothèque des modèles' },
    ];

    const legalPages = [
        { href: '/style-guide', title: 'Charte Graphique' },
        { href: '/legal-notice', title: 'Mentions Légales' },
        { href: '/privacy-policy', title: 'Politique de confidentialité' },
    ];

    return (
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="outline" className="mb-8">
                    <Link href="/">
                        <Home className="mr-2" />
                        Retour à l'accueil
                    </Link>
                </Button>

                <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">Plan du Site</h1>

                <Section title="Pages Principales" icon={<Home className="h-6 w-6" />}>
                    {mainPages.map(page => <ListItemLink key={page.href} {...page} />)}
                </Section>
                
                <Section title="Projets du Portfolio" icon={<Briefcase className="h-6 w-6" />}>
                    {projects.map(project => (
                        <ListItemLink key={project.id} href={`/portfolio/${project.id}`} title={project.title.fr} />
                    ))}
                </Section>

                <Section title="Espace Visualiseur 3D" icon={<Cuboid className="h-6 w-6" />}>
                     {visualizerPages.map(page => <ListItemLink key={page.href} {...page} />)}
                     <h3 className="font-bold text-sm text-foreground pt-4 pb-2">Modèles 3D :</h3>
                     {visualizerItems.map(item => (
                        <li key={item.id} className="border-b border-border/30 pb-2 last:border-b-0 last:pb-0 pl-4">
                           <Link href={`/visualizer/item/${item.id}`} className="flex items-center justify-between group text-muted-foreground hover:text-primary transition-colors text-sm">
                               <span>{item.name.fr}</span>
                               <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </Link>
                        </li>
                    ))}
                </Section>
                
                <Section title="Informations Légales & Autres" icon={<FileText className="h-6 w-6" />}>
                    {legalPages.map(page => <ListItemLink key={page.href} {...page} />)}
                </Section>
            </div>
        </main>
    );
}
