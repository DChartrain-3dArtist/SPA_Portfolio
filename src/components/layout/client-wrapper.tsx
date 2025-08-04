
'use client';

import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Preloader } from '@/components/ui/preloader';
import { cn } from '@/lib/utils';
import { Providers } from './providers';
import { CookieConsentBanner } from '../cookie-consent-banner';

/**
 * ClientWrapper est un composant de haut niveau qui gère les éléments côté client
 * comme le pré-chargeur (preloader) et les fournisseurs de contexte (providers).
 * Il s'assure que le preloader s'affiche pendant un temps minimum pour permettre à l'animation de se terminer.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à afficher après le chargement.
 * @returns Un composant React qui enveloppe l'application.
 */
export function ClientWrapper({ children }: { children: React.ReactNode }) {
    // État pour contrôler la visibilité du preloader.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Durée minimale pour que l'animation du preloader ait le temps de s'exécuter.
        const minAnimationTime = 3000; 

        // Démarre un minuteur pour masquer le preloader après la durée minimale.
        const animationTimer = setTimeout(() => {
            setIsLoading(false);
        }, minAnimationTime);

        // Nettoyage : annule le minuteur si le composant est démonté avant la fin.
        return () => clearTimeout(animationTimer);
    }, []); // Le tableau de dépendances vide assure que cet effet ne s'exécute qu'une fois.

    return (
        // Enveloppe l'application avec tous les fournisseurs de contexte.
        <Providers>
            {/* Affiche le preloader si isLoading est vrai. */}
            {isLoading && <Preloader />}
            {/* Affiche le contenu principal avec une transition d'opacité une fois le chargement terminé. */}
            <div className={cn("transition-opacity duration-500 w-full", isLoading ? "opacity-0" : "opacity-100")}>
                {children}
                {/* Le composant Toaster gère l'affichage des notifications. */}
                <Toaster />
                {/* La bannière de consentement aux cookies sera affichée ici si nécessaire. */}
                <CookieConsentBanner />
            </div>
        </Providers>
    )
}
