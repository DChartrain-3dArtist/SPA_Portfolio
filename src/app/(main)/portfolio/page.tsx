// Ce fichier est le composant "Serveur" qui gère les métadonnées de la page portfolio.
// Il importe ensuite le composant "Client" qui contient la logique interactive.
// Il utilise Suspense pour gérer le chargement du composant client qui utilise des hooks comme `useSearchParams`.

import PortfolioPage from '@/components/sections/portfolio';
import type { Metadata } from 'next';
import { getProjects } from '@/data/projects';

// Métadonnées pour la page portfolio.
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explorez les projets de Chartrain Donovan, incluant des travaux en infographie 3D, 3D temps réel, et développement web. Filtrez par secteur et type de production.',
};

export default async function Page() {
    const projects = await getProjects();

    return <PortfolioPage initialProjects={projects} />;
}
