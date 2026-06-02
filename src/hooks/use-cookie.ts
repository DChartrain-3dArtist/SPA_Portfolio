
'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer la lecture et l'écriture de cookies.
 * Gère le rendu côté serveur (SSR) en ne tentant de lire/écrire le cookie
 * que lorsque le composant est monté côté client.
 *
 * @param key La clé (nom) du cookie.
 * @param initialValue La valeur initiale à utiliser si le cookie n'existe pas.
 * @returns Un tableau contenant la valeur actuelle du cookie et une fonction pour la mettre à jour.
 */
export function useCookie(key: string, initialValue: string | null): [string | null, (value: string | null) => void] {
  const [storedValue, setStoredValue] = useState<string | null>(initialValue);

  useEffect(() => {
    try {
      setStoredValue(window.localStorage.getItem(key));
    } catch (error) {
      console.warn(`Erreur lors de la lecture du cookie "${key}" :`, error);
    }
  }, [key]);

  /**
   * Fonction pour définir une nouvelle valeur pour le cookie.
   * Utilise `useCallback` pour la mémorisation et l'optimisation.
   */
  const setValue = useCallback((value: string | null) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Mettre à jour l'état du hook.
      setStoredValue(value);
      // Mettre à jour le cookie dans le LocalStorage.
      if (value !== null) {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Erreur lors de l'écriture du cookie "${key}" :`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
