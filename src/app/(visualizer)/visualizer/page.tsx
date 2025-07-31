
'use client';

import { Button } from '@/components/ui/button';
import { Library, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function VisualizerHomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-300">
          Espace Visualiseur 3D
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Bienvenue dans l'espace interactif. Ici, vous pouvez manipuler, explorer et examiner en détail une sélection de mes modèles 3D directement dans votre navigateur.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/visualizer/library">
              <Library className="mr-2" />
              Explorer la bibliothèque
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="main-site-cta">
            <Link href="/portfolio">
              <Briefcase className="mr-2" />
              Retourner au portfolio
            </Link>
          </Button>
        </div>
      </div>
      <section id="contact-cta" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Un projet en tête ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discutons de la manière dont nous pourrions concrétiser votre vision. Je suis ouvert à de nouvelles collaborations.
              </p>
              <Button size="lg" asChild className="group mt-8">
                  <Link href="/contact">
                  Me contacter
                  <Mail className="ml-2" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
