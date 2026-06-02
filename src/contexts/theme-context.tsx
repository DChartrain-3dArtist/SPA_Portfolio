
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { DEFAULT_THEME, isTheme, THEME_COOKIE_NAME } from '@/lib/preferences';

// Type définissant les thèmes disponibles.
export type Theme = 'light' | 'dark';

// Interface pour le type de contexte du thème.
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Création du contexte React pour la gestion du thème.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Fournisseur de contexte pour le thème.
 * Enveloppe l'application pour fournir l'état du thème et les fonctions pour le modifier.
 * @param {object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants.
 * @returns Le fournisseur de contexte.
 */
export function ThemeProvider({
  children,
  initialTheme = DEFAULT_THEME,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_COOKIE_NAME) ?? undefined;

    if (isTheme(storedTheme)) {
      setThemeState(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_COOKIE_NAME, theme);
    document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte du thème.
 * @throws {Error} Si le hook est utilisé en dehors d'un `ThemeProvider`.
 * @returns Le contexte du thème.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
