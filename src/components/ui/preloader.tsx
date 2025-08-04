
'use client';

import { LogoSVG } from '../logo-svg';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Tableau des lignes de texte à afficher séquentiellement dans le terminal simulé.
const terminalLines = [
  '> Initialisation du système...',
  '> Chargement des assets 3D...',
  '> Compilation des shaders...',
];

/**
 * Composant Preloader qui s'affiche au premier chargement du site.
 * Simule un terminal de chargement puis affiche un logo animé.
 * @returns Un composant React pour le preloader.
 */
export function Preloader() {
  // État pour stocker les lignes de texte actuellement affichées.
  const [lines, setLines] = useState<string[]>([]);
  // État pour contrôler l'affichage du logo après les lignes de texte.
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Les minuteurs sont utilisés pour créer un effet de séquence.
    let lineTimeout: NodeJS.Timeout;
    let logoTimeout: NodeJS.Timeout;

    // Fonction récursive pour ajouter les lignes de texte une par une.
    const addLine = (index: number) => {
      if (index < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[index]]);
        // Ajoute la ligne suivante après un délai.
        lineTimeout = setTimeout(() => addLine(index + 1), 600);
      } else {
        // Une fois toutes les lignes affichées, déclenche l'affichage du logo.
        logoTimeout = setTimeout(() => {
            setShowLogo(true);
        }, 200);
      }
    };

    // Démarre la séquence en ajoutant la première ligne.
    addLine(0);

    // Fonction de nettoyage pour annuler les minuteurs si le composant est démonté.
    return () => {
        clearTimeout(lineTimeout);
        clearTimeout(logoTimeout);
    };
  }, []); // Le tableau de dépendances vide assure que cet effet ne s'exécute qu'une seule fois.

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-out animate-fade-in">
        {/* Arrière-plan subtil avec un motif de grain. */}
        <div className="absolute inset-0 bg-[url('/assets/grain.svg')] opacity-5"></div>
        <div className="flex flex-col items-center gap-8 w-full max-w-md p-4">
            {/* Conteneur pour le terminal simulé. */}
            <div className="font-code text-sm text-primary w-full h-24">
              {lines.map((line, index) => (
                <p 
                  key={index} 
                  className={cn(
                    "mb-1 overflow-hidden whitespace-nowrap",
                    // La dernière ligne a une animation de curseur clignotant.
                     index === lines.length - 1 ? 'animate-typing' : 'animate-typing-no-cursor'
                  )}
                  // Styles d'animation pour l'effet de frappe au clavier.
                  style={{
                    animationDuration: '1s',
                    animationTimingFunction: 'steps(40, end)',
                    animationFillMode: 'forwards'
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Conteneur pour le logo et son animation. */}
            <div className="relative flex flex-col items-center justify-center w-64 h-64">
                <div className={cn("relative flex items-center justify-center w-full h-full transition-opacity duration-1000", showLogo ? "opacity-100" : "opacity-0")}>
                    {/* Halo lumineux animé derrière le logo. */}
                    <div className="absolute h-80 w-80 animate-pulse rounded-full bg-primary/20 blur-2xl"></div>
                    {/* Le logo SVG avec une animation de dessin. */}
                    <LogoSVG className={cn("relative w-full h-full text-primary", showLogo ? "animate-draw-all" : "opacity-0")} />
                </div>
                {/* Le nom s'affiche avec un fondu après l'animation du logo. */}
                <div className={cn("text-center mt-4 transition-opacity duration-1000 h-8 opacity-0", showLogo && "animate-fade-in")} style={{ animationDelay: '0.6s' }}>
                   <h3 className="font-headline text-2xl font-bold tracking-wider text-foreground">
                      Chartrain Donovan
                  </h3>
                </div>
            </div>
        </div>
    </div>
  );
}
