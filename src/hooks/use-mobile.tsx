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
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
  }, [])

  const getSnapshot = React.useCallback(
    () => window.innerWidth < MOBILE_BREAKPOINT,
    []
  )

  const getServerSnapshot = React.useCallback(() => false, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
