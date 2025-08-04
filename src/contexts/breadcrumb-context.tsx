
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';

/**
 * Interface définissant la structure d'un élément du fil d'Ariane (breadcrumb).
 */
export interface BreadcrumbItem {
  label: string;  // Le texte affiché pour l'élément.
  href?: string; // L'URL de l'élément. S'il est absent, l'élément n'est pas un lien.
}

/**
 * Interface pour le type de contexte du fil d'Ariane.
 */
interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[]; // La liste des éléments du fil d'Ariane.
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void; // Fonction pour mettre à jour le fil d'Ariane.
}

// Création du contexte React pour le fil d'Ariane.
const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

/**
 * Fournisseur de contexte pour le fil d'Ariane.
 * Ce composant enveloppe les parties de l'application qui ont besoin d'accéder
 * ou de modifier l'état du fil d'Ariane.
 * @param {object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants.
 * @returns Le fournisseur de contexte.
 */
export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  // État pour stocker la liste actuelle des éléments du fil d'Ariane.
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  // useMemo est utilisé pour éviter de recréer l'objet `value` à chaque rendu,
  // optimisant ainsi les performances en empêchant les rendus inutiles des consommateurs du contexte.
  const value = useMemo(() => ({ breadcrumbs, setBreadcrumbs }), [breadcrumbs]);

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte du fil d'Ariane.
 * Fournit un accès facile à `breadcrumbs` et `setBreadcrumbs`.
 * @throws {Error} Si le hook est utilisé en dehors d'un `BreadcrumbProvider`.
 * @returns Le contexte du fil d'Ariane.
 */
export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
