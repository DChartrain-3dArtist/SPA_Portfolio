
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';

// Type définissant les langues supportées par l'application.
export type Language = 'fr' | 'en';

// Interface pour le type de contexte de la langue.
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Création du contexte React pour la gestion de la langue.
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Fournisseur de contexte pour la langue.
 * Ce composant enveloppe l'application pour fournir l'état de la langue
 * et la fonction pour la modifier à tous ses enfants.
 * @param {object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants.
 * @returns Le fournisseur de contexte.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // État pour stocker la langue actuelle, initialisée à 'fr'.
  const [language, setLanguage] = useState<Language>('fr');

  // Effet pour mettre à jour l'attribut `lang` de la balise <html>
  // à chaque changement de langue, ce qui est bon pour l'accessibilité et le SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // useMemo pour optimiser en ne recréant l'objet de valeur que si la langue change.
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de la langue.
 * Simplifie l'accès à l'état et à la fonction de mise à jour de la langue.
 * @throws {Error} Si le hook est utilisé en dehors d'un `LanguageProvider`.
 * @returns Le contexte de la langue.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
