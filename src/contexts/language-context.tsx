
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { DEFAULT_LANGUAGE, isLanguage, LANGUAGE_COOKIE_NAME } from '@/lib/preferences';

// Type définissant les langues supportées par l'application.
export type Language = 'fr' | 'en';

// Interface pour le type de contexte de la langue.
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Création du contexte React pour la gestion de la langue.
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fonction pour obtenir la langue initiale depuis le navigateur ou les cookies.
const getInitialLanguage = (fallback: Language): Language => {
    if (typeof window === 'undefined') {
        return fallback;
    }
    const storedLang = localStorage.getItem(LANGUAGE_COOKIE_NAME) ?? undefined;
    if (isLanguage(storedLang)) {
        return storedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'fr' ? 'fr' : 'en';
}

/**
 * Fournisseur de contexte pour la langue.
 * Ce composant enveloppe l'application pour fournir l'état de la langue
 * et la fonction pour la modifier à tous ses enfants.
 * @param {object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants.
 * @returns Le fournisseur de contexte.
 */
export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_COOKIE_NAME, lang);
        document.cookie = `${LANGUAGE_COOKIE_NAME}=${lang}; path=/; max-age=31536000; samesite=lax`;
        document.documentElement.lang = lang;
    }
  }

  useEffect(() => {
    const resolvedLanguage = getInitialLanguage(initialLanguage);
    setLanguageState(resolvedLanguage);
    localStorage.setItem(LANGUAGE_COOKIE_NAME, resolvedLanguage);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${resolvedLanguage}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = resolvedLanguage;
  }, [initialLanguage]);

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
