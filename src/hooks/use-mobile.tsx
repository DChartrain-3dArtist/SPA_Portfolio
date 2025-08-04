import * as React from "react"

// Point de rupture (breakpoint) pour la détection du mode mobile.
// En dessous de cette largeur, le site est considéré comme étant en mode mobile.
const MOBILE_BREAKPOINT = 1024 // lg de Tailwind

/**
 * Hook personnalisé pour détecter si l'application est affichée sur un appareil mobile.
 * Se base sur la largeur de la fenêtre du navigateur.
 * @returns `true` si la largeur de la fenêtre est inférieure au `MOBILE_BREAKPOINT`, sinon `false`.
 */
export function useIsMobile() {
  // L'état `isMobile` est `undefined` au début pour gérer le rendu côté serveur (SSR).
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Media Query List pour écouter les changements de taille de la fenêtre.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Fonction de rappel pour mettre à jour l'état lorsque la taille de la fenêtre change.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Ajoute un écouteur d'événement pour le changement de média query.
    mql.addEventListener("change", onChange)
    
    // Définit l'état initial au premier montage côté client.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Fonction de nettoyage pour retirer l'écouteur lorsque le composant est démonté.
    return () => mql.removeEventListener("change", onChange)
  }, []) // Le tableau de dépendances vide assure que cet effet ne s'exécute qu'une fois côté client.

  return !!isMobile // Convertit `undefined` en `false` pour le rendu initial côté serveur.
}
