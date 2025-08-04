
'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LogoSVG } from '@/components/logo-svg';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charte Graphique',
  description: 'Découvrez les principes, composants et styles qui définissent l\'identité visuelle de ce portfolio, de la typographie à la palette de couleurs.',
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


function Section({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) {
    return (
        <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">{title}</h2>
            {description && <p className="text-muted-foreground mb-8 max-w-3xl">{description}</p>}
            <Card>
                <CardContent className="p-6 md:p-8">
                    {children}
                </CardContent>
            </Card>
        </section>
    )
}

function ColorPalette({ colors }: { colors: { name: string, hsl: string, hex: string }[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {colors.map(color => (
                 <div key={color.name} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-lg border-2 border-border/50 shadow-md mb-2" style={{ backgroundColor: `hsl(${color.hsl})` }}></div>
                    <p className="font-bold font-headline">{color.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{color.hex}</p>
                    <p className="text-xs text-muted-foreground font-mono">hsl({color.hsl})</p>
                </div>
            ))}
        </div>
    )
}

function TypographySample({ name, size, weight, fontClass, children }: { name: string, size: string, weight: string, fontClass: string, children: React.ReactNode }) {
    return (
        <div className="border-b border-border/50 py-4 last:border-b-0">
            <div className="flex items-baseline justify-between">
                 <p className="text-muted-foreground text-sm">{name}</p>
                 <p className="text-muted-foreground text-sm font-mono">{size} / {weight}</p>
            </div>
            <p className={cn("mt-2", fontClass)}>{children}</p>
        </div>
    )
}


export default function StyleGuidePage() {
  const { language } = useLanguage();
  const c = content[language].style_guide;

  const mainSiteColors = [
    { name: 'Background', hsl: '220 20% 3%', hex: '#050608' },
    { name: 'Foreground', hsl: '210 40% 98%', hex: '#f9fafb' },
    { name: 'Card', hsl: '220 20% 3%', hex: '#050608' },
    { name: 'Primary', hsl: '158 62% 65%', hex: '#6de2b3' },
    { name: 'Primary Fg', hsl: '210 40% 9.8%', hex: '#18181b' },
    { name: 'Accent', hsl: '210 40% 96.1%', hex: '#f4f4f5' },
    { name: 'Border', hsl: '217.2 32.6% 17.5%', hex: '#212a3a' },
    { name: 'Ring', hsl: '158 62% 65%', hex: '#6de2b3' },
  ];

  const visualizerColors = [
    { name: 'Background', hsl: '0 0% 24%', hex: '#3d3d3d' },
    { name: 'Primary', hsl: '217 91% 60%', hex: '#3b82f6' },
    { name: 'Primary Fg', hsl: '210 40% 98%', hex: '#f9fafb' },
    { name: 'Ring', hsl: '217 91% 60%', hex: '#3b82f6' },
  ];

  return (
    <>
        <Header />
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">{c.title}</h1>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{c.subtitle}</p>
                </div>

                <Section 
                    title={c.logo_title}
                    description={c.logo_description}
                >
                   <div className="flex justify-center items-center h-48 bg-muted/30 rounded-lg">
                        <LogoSVG className="w-32 h-32 text-primary" />
                   </div>
                </Section>
                
                <Section
                    title={c.colors_main_title}
                    description={c.colors_main_description}
                >
                    <ColorPalette colors={mainSiteColors} />
                </Section>

                 <Section
                    title={c.colors_visualizer_title}
                    description={c.colors_visualizer_description}
                >
                    <ColorPalette colors={visualizerColors} />
                </Section>
                
                <Section
                    title={c.typography_title}
                    description={c.typography_description}
                >
                   <div className={spaceGrotesk.variable}>
                       <TypographySample name="Titre H1" size="5xl" weight="Bold" fontClass="text-5xl font-bold font-headline">
                            {c.h1_sample}
                       </TypographySample>
                        <TypographySample name="Titre H2" size="4xl" weight="Bold" fontClass="text-4xl font-bold font-headline">
                            {c.h2_sample}
                       </TypographySample>
                        <TypographySample name="Titre H3" size="2xl" weight="Bold" fontClass="text-2xl font-bold font-headline">
                            {c.h3_sample}
                       </TypographySample>
                       <TypographySample name="Texte de corps" size="base" weight="Regular" fontClass="text-base font-body">
                           {c.body_sample}
                       </TypographySample>
                       <TypographySample name="Label / Petit texte" size="sm" weight="Medium" fontClass="text-sm font-medium">
                            {c.label_sample}
                       </TypographySample>
                   </div>
                </Section>

                <Section
                    title={c.components_title}
                    description={c.components_description}
                >
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold font-headline mb-4">{c.buttons_title}</h3>
                            <div className="flex flex-wrap items-center gap-4">
                               <Button>{c.button_primary}</Button>
                               <Button variant="secondary">{c.button_secondary}</Button>
                               <Button variant="outline">{c.button_outline}</Button>
                               <Button variant="ghost">{c.button_ghost}</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold font-headline mb-4">{c.badges_title}</h3>
                            <div className="flex flex-wrap items-center gap-4">
                               <Badge>{c.badge_default}</Badge>
                               <Badge variant="secondary">{c.badge_secondary}</Badge>
                               <Badge variant="outline">{c.badge_outline}</Badge>
                               <Badge className="bg-orange-500 text-white border-transparent">{c.badge_sector}</Badge>
                            </div>
                        </div>
                         <div>
                            <h3 className="font-bold font-headline mb-4">{c.cards_title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Card>
                                   <CardHeader>
                                       <CardTitle>{c.card_standard_title}</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-muted-foreground">{c.card_standard_description}</p>
                                   </CardContent>
                               </Card>
                                <Card className="border-primary shadow-lg shadow-primary/10">
                                   <CardHeader>
                                       <CardTitle>{c.card_highlight_title}</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-muted-foreground">{c.card_highlight_description}</p>
                                   </CardContent>
                               </Card>
                            </div>
                        </div>
                    </div>
                </Section>

                 <section id="contact-cta" className="w-full py-16 md:py-24">
                    <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">
                            {c.cta_title}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            {c.cta_subtitle}
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                            <Button size="lg" asChild className="group">
                                <Link href="/contact">
                                {c.cta_button}
                                <Mail className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </>
  );
}
