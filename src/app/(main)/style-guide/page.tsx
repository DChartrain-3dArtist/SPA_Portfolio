// Ce fichier est le composant "Serveur" qui gère les métadonnées de la page.
// Il importe ensuite le composant "Client" qui contient la logique interactive.

import type { Metadata } from 'next';
import StyleGuideClientPage from './style-guide-client';

// Métadonnées pour la page de la charte graphique.
// Exportées depuis un composant serveur, comme l'exige Next.js.
export const metadata: Metadata = {
  title: 'Charte Graphique',
  description: "Découvrez les principes, composants et styles qui définissent l'identité visuelle de ce portfolio, de la typographie à la palette de couleurs.",
};

// Le composant serveur se contente d'appeler le composant client.
export default function StyleGuidePage() {
    return <StyleGuideClientPage />;
}
