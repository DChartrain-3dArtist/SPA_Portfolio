
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';

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
export function ThemeProvider({ children }: { children: ReactNode }) {
  // État pour stocker le thème actuel, initialisé à 'dark'.
  const [theme, setTheme] = useState<Theme>('dark');

  // Effet pour appliquer le thème actuel au document HTML.
  // Il ajoute/supprime les classes 'light'/'dark' sur la balise <html>.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Fonction pour basculer entre les thèmes 'light' et 'dark'.
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // useMemo pour optimiser la valeur du contexte.
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

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
