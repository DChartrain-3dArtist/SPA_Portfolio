
'use client';

import { LogoSVG } from '../logo-svg';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const terminalLines = [
  '> Initialisation du système...',
  '> Chargement des assets 3D...',
  '> Compilation des shaders...',
];

export function Preloader() {
  const [lines, setLines] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Clear any existing timeouts to prevent memory leaks on re-renders
    let lineTimeout: NodeJS.Timeout;
    let logoTimeout: NodeJS.Timeout;

    // A function to add lines sequentially
    const addLine = (index: number) => {
      if (index < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[index]]);
        lineTimeout = setTimeout(() => addLine(index + 1), 600); // Delay between each line
      } else {
        // After the last line, show the logo
        logoTimeout = setTimeout(() => {
            setShowLogo(true);
        }, 200);
      }
    };

    // Start the sequence
    addLine(0);

    return () => {
        clearTimeout(lineTimeout);
        clearTimeout(logoTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-out animate-fade-in">
        <div className="absolute inset-0 bg-[url('/assets/grain.svg')] opacity-5"></div>
        <div className="flex flex-col items-center gap-8 w-full max-w-md p-4">
            <div className="font-code text-sm text-primary w-full h-24">
              {lines.map((line, index) => (
                <p 
                  key={index} 
                  className={cn(
                    "mb-1 overflow-hidden whitespace-nowrap",
                     index === lines.length - 1 ? 'animate-typing' : 'animate-typing-no-cursor'
                  )}
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

            <div className="relative flex flex-col items-center justify-center w-64 h-64">
                <div className={cn("relative flex items-center justify-center w-full h-full transition-opacity duration-1000", showLogo ? "opacity-100" : "opacity-0")}>
                    <div className="absolute h-80 w-80 animate-pulse rounded-full bg-primary/20 blur-2xl"></div>
                    <LogoSVG className={cn("relative w-full h-full", showLogo ? "animate-draw-all" : "opacity-0")} />
                </div>
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
