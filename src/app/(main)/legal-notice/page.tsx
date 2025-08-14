
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content } from '@/lib/content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

/**
 * Composant de section réutilisable pour structurer la page.
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.title - Le titre de la section.
 * @param {React.ReactNode} props.children - Le contenu de la section.
 * @returns Un composant React de section stylisé.
 */
function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
                {children}
            </CardContent>
        </Card>
    )
}

// Métadonnées de la page pour le SEO.
export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Consultez les mentions légales du site de Chartrain Donovan : éditeur, hébergement, propriété intellectuelle et données personnelles.',
};

/**
 * Composant pour la page des mentions légales.
 * @returns Un composant React affichant les mentions légales.
 */
export default function LegalNoticePage() {
    // Pour la simplicité, nous utiliserons le contenu en français car c'est une page légale destinée principalement aux utilisateurs français.
    const c = content['fr'].legal_notice;
  return (
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Ajout du bouton de retour à l'accueil */}
                <Button asChild variant="outline" className="mb-8">
                    <Link href="/">
                        <Home className="mr-2" />
                        Retour à l'accueil
                    </Link>
                </Button>

                <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{c.title}</h1>

                <Section title={c.editor_title}>
                    <p>
                        <strong>{c.editor_name} :</strong> Chartrain Donovan<br />
                        <strong>{c.editor_address} :</strong> 84410, Bédoin, France<br />
                        <strong>{c.editor_email} :</strong> <a href="mailto:donovan.chartrain@gmail.com" className="text-primary hover:underline">donovan.chartrain@gmail.com</a><br />
                        <strong>{c.editor_phone} :</strong> +33 6 43 88 39 60<br />
                    </p>
                </Section>
                
                <Section title={c.hosting_title}>
                     <div dangerouslySetInnerHTML={{ __html: c.hosting_content }} />
                </Section>

                <Section title={c.ip_title}>
                     <div dangerouslySetInnerHTML={{ __html: c.ip_content1 }} />
                     <div dangerouslySetInnerHTML={{ __html: c.ip_content2 }} />
                </Section>
                
                <Section title={c.data_title}>
                    <div dangerouslySetInnerHTML={{ __html: c.data_content }} />
                </Section>
            </div>
        </main>
  );
}
