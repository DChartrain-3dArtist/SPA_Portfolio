/**
 * Composant pour afficher des halos de lumière décoratifs en arrière-plan.
 * Ces éléments sont purement esthétiques et ajoutent de la profondeur au design.
 * Le `pointer-events-none` empêche ces éléments d'interférer avec les clics de l'utilisateur.
 * Le `z-[-1]` place les halos derrière tout le contenu de la page.
 * @returns Un composant React avec plusieurs divs stylisées pour créer un effet de halo.
 */
export function BackgroundHalos() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
            {/* Chaque div représente un halo de couleur avec un flou important (blur-3xl). */}
            <div className="absolute top-[5%] left-[10%] h-[300px] w-[500px] rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute top-[25%] right-[15%] h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl"></div>
            <div className="absolute bottom-[15%] left-[20%] h-[350px] w-[350px] rounded-full bg-emerald-500/20 blur-3xl"></div>
            <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-yellow-500/20 blur-3xl"></div>
            <div className="absolute top-[40%] left-[45%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"></div>
        </div>
    )
}
