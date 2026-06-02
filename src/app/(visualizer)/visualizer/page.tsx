

'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Library, Mail, Briefcase, Code, Cuboid } from 'lucide-react';
import Link from 'next/link';
import { content } from '@/lib/content';
import { useLanguage } from '@/contexts/language-context';

// Dynamically import the background component to ensure it's client-side only
const HeroBackground = dynamic(
  () => import('@/components/visualizer/hero-background').then(mod => mod.HeroBackground),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-0 bg-background" />
  }
);

export default function VisualizerHomePage() {
  const { language } = useLanguage();
  const c = content[language].visualizer;
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-64px)] overflow-hidden">
      <Suspense fallback={null}>
        <HeroBackground />
      </Suspense>

      <div className="relative z-10 max-w-3xl animate-fade-in-up mt-16 sm:mt-0">
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-300">
          {c.home_title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: c.home_subtitle }} />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/visualizer/library">
              <Library className="mr-2" />
              {c.home_cta_library}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="main-site-cta">
            <Link href="/portfolio">
              <Briefcase className="mr-2" />
              {c.home_cta_portfolio}
            </Link>
          </Button>
        </div>
      </div>
      
       <section className="relative z-10 w-full max-w-6xl py-16 md:py-24 px-4 sm:px-6 lg:px-8 mt-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="bg-card/50 border-border/50 rounded-lg p-8 md:p-12 border backdrop-blur-sm">
              <h2 className="font-headline text-3xl font-bold md:text-4xl text-center">
                  {c.tech_showcase.title}
              </h2>
               <p className="mt-2 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                 {c.tech_showcase.subtitle}
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl font-headline flex items-center gap-2"><Cuboid className="h-5 w-5 text-primary" /> {c.tech_showcase.why_title}</h3>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: c.tech_showcase.why_content }} />
                  </div>
                   <div className="space-y-2">
                    <h3 className="font-bold text-xl font-headline flex items-center gap-2"><Code className="h-5 w-5 text-primary" /> {c.tech_showcase.how_title}</h3>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: c.tech_showcase.how_content }} />
                  </div>
              </div>
          </div>
      </section>

      <section id="contact-cta" className="relative z-10 w-full pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="bg-card/50 border-border/50 rounded-lg p-8 md:p-12 border text-center backdrop-blur-sm">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  {c.home_cta_contact_title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: c.home_cta_contact_subtitle }}/>
              <Button size="lg" asChild className="group mt-8">
                  <Link href="/contact">
                  {c.home_cta_contact_button}
                  <Mail className="ml-2" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
