import Link from 'next/link';
import { Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Project } from '@/data/definitions';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import { LocalizedText } from '@/components/i18n/localized';
import { PortfolioClient } from './portfolio-client';

function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-4 text-center font-headline text-4xl font-bold md:text-5xl">
      {children}
    </h1>
  );
}

export default function PortfolioPage({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const fr = content.fr.portfolio;
  const en = content.en.portfolio;

  return (
    <>
      <Header />
      <main className="w-full py-16 md:py-24">
        <section id="portfolio" className="w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <PageTitle>
                <LocalizedText fr={fr.title} en={en.title} />
              </PageTitle>
              <p className="mx-auto mb-12 max-w-4xl text-foreground/90 localized-fr">
                {fr.intro.part1}
                <span className="font-medium text-primary">
                  {fr.intro.highlight1}
                </span>
                {fr.intro.part2}
                <span className="font-medium text-primary">
                  {fr.intro.highlight2}
                </span>
                {fr.intro.part3}
                <span className="font-medium text-primary">
                  {fr.intro.highlight3}
                </span>
                {fr.intro.part4}
              </p>
              <p className="mx-auto mb-12 max-w-4xl text-foreground/90 localized-en">
                {en.intro.part1}
                <span className="font-medium text-primary">
                  {en.intro.highlight1}
                </span>
                {en.intro.part2}
                <span className="font-medium text-primary">
                  {en.intro.highlight2}
                </span>
                {en.intro.part3}
                <span className="font-medium text-primary">
                  {en.intro.highlight3}
                </span>
                {en.intro.part4}
              </p>
            </div>
          </div>

          <PortfolioClient initialProjects={initialProjects} />
        </section>

        <section className="w-full px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <div className="animate-fade-in rounded-lg border border-border/50 bg-card/80 p-8 text-center md:p-12">
            <LocalizedText
              as="h2"
              className="font-headline text-3xl font-bold md:text-4xl"
              fr="Un projet a cadrer ou a faire evoluer ?"
              en="Do you have a project to shape or improve?"
            />
            <LocalizedText
              as="p"
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              fr="Je peux intervenir sur une vitrine, une interface, une application ou une demonstration 3D. Parlons du bon format pour votre besoin."
              en="I can help on a showcase site, an interface, an application, or a 3D demonstration. Let's talk about the right format for your needs."
            />
            <Button size="lg" asChild className="group mt-8">
              <Link href="/contact">
                <LocalizedText fr="Me contacter" en="Contact me" />
                <Mail className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
