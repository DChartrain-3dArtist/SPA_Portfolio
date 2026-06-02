
'use client';

import { useState, useEffect } from 'react';
import { useCookie } from '@/hooks/use-cookie';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * Composant pour la bannière de consentement aux cookies.
 * S'affiche si l'utilisateur n'a pas encore fait de choix.
 * Stocke le choix de l'utilisateur dans un cookie.
 */
export function CookieConsentBanner() {
  const [consent, setConsent] = useCookie('cookie_consent', null);
  const [isVisible, setIsVisible] = useState(false);

  // Détermine si la bannière doit être affichée.
  useEffect(() => {
    // Si aucun choix n'a été fait (la valeur du cookie est null), on affiche la bannière.
    if (consent === null) {
      setIsVisible(true);
    }
  }, [consent]);

  // Gère l'action d'accepter les cookies.
  const handleAccept = () => {
    setConsent('true'); // Enregistre le consentement
    setIsVisible(false); // Masque la bannière
  };

  // Gère l'action de refuser les cookies.
  const handleDecline = () => {
    setConsent('false'); // Enregistre le refus
    setIsVisible(false); // Masque la bannière
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[200] p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg animate-in slide-in-from-bottom-full',
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground text-center md:text-left">
          Ce site utilise des cookies pour analyser le trafic et améliorer votre expérience. En cliquant sur &quot;Accepter&quot;, vous consentez à notre utilisation des cookies.{' '}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            En savoir plus
          </Link>.
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Refuser
          </Button>
          <Button variant="default" size="sm" onClick={handleAccept}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
