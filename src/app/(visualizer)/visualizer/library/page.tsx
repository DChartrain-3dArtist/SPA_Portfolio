
// Ce fichier est le composant "Serveur" qui gère les métadonnées.
// Il importe le composant client depuis son nouvel emplacement.
import LibraryPage from '@/components/visualizer/library/page';
import { getVisualizerItems } from '@/data/projects';

export default async function Page() {
  const items = await getVisualizerItems();

  return <LibraryPage items={items} />;
}
