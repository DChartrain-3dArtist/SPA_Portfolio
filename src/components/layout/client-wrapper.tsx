
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Toaster } from '@/components/ui/toaster';
import { Preloader } from '@/components/ui/preloader';
import { cn } from '@/lib/utils';
import { Providers } from './providers';
import { CookieConsentBanner } from '../cookie-consent-banner';
import { useCookie } from '@/hooks/use-cookie';
import type { Language } from '@/contexts/language-context';
import type { Theme } from '@/contexts/theme-context';

/**
 * ClientWrapper est un composant de haut niveau qui gère les éléments côté client
 * comme le pré-chargeur (preloader) et les fournisseurs de contexte (providers).
 * Il s'assure que le preloader s'affiche pendant un temps minimum pour permettre à l'animation de se terminer.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à afficher après le chargement.
 * @returns Un composant React qui enveloppe l'application.
 */
export function ClientWrapper({
  children,
  initialLanguage,
  initialTheme,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [cookieConsent] = useCookie('cookie_consent', null);

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
        <Providers initialLanguage={initialLanguage} initialTheme={initialTheme}>
            {cookieConsent === 'true' && (
                <>
                    <Script id="google-tag-manager" strategy="afterInteractive">
                        {`
                          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                          })(window,document,'script','dataLayer','GTM-TCVSRQ9F');
                        `}
                    </Script>
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-TCVSRQ9F"
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}

            {isLoading && <Preloader />}
            <div className={cn("transition-opacity duration-500 w-full", isLoading ? "opacity-0" : "opacity-100")}>
                {children}
                <Toaster />
                <CookieConsentBanner />
            </div>
            {cookieConsent === 'true' && (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            )}
        </Providers>
    )
}
