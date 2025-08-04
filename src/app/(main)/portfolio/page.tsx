// Ce fichier est le composant "Serveur" qui gère les métadonnées de la page portfolio.
// Il importe ensuite le composant "Client" qui contient la logique interactive.
// Il utilise Suspense pour gérer le chargement du composant client qui utilise des hooks comme `useSearchParams`.

import PortfolioPage from '@/components/sections/portfolio';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Métadonnées pour la page portfolio.
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explorez les projets de Chartrain Donovan, incluant des travaux en infographie 3D, 3D temps réel, et développement web. Filtrez par secteur et type de production.',
};

// Composant de fallback à afficher pendant que le composant client se charge.
// Cela améliore l'expérience utilisateur (UX) en montrant que le contenu arrive.
function PortfolioLoading() {
  return (
    <div className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
      </div>
      <div className="mb-12">
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}

// Le composant serveur enveloppe le composant client `PortfolioPage` dans une balise `<Suspense>`.
// C'est nécessaire car `PortfolioPage` utilise le hook `useSearchParams`, qui requiert cette limite de suspense
// pour fonctionner correctement avec le rendu serveur de Next.js.
export default function Page() {
    return (
        <Suspense fallback={<PortfolioLoading />}>
            <PortfolioPage />
        </Suspense>
    );
}
