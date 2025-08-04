import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fonction utilitaire pour fusionner des classes Tailwind CSS de manière conditionnelle et intelligente.
 * Elle combine la flexibilité de `clsx` (pour les classes conditionnelles) avec la puissance de `tailwind-merge`
 * (pour résoudre les conflits de classes Tailwind, par ex. `p-2` et `p-4` -> `p-4`).
 * 
 * @param {...ClassValue[]} inputs - Une liste de classes CSS. Peut être des chaînes, des objets, des tableaux.
 * @returns {string} Une chaîne de caractères contenant les classes finales et optimisées.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
