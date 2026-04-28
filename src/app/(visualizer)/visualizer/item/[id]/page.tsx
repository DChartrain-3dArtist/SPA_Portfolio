
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ItemDetailPage from '@/components/visualizer/item-detail-page';
import { getVisualizerItems, getVisualizerItem } from '@/data/projects';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const items = await getVisualizerItems();

  return items.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getVisualizerItem(params.id);

  if (!item) {
    return {
      title: 'Modele non trouve',
      description: "Le modele 3D demande n'existe pas ou n'est plus disponible.",
    };
  }

  return {
    title: item.name.fr,
    description: item.description.fr,
  };
}

export default async function Page({ params }: Props) {
  const item = await getVisualizerItem(params.id);

  if (!item) {
    notFound();
  }

  return <ItemDetailPage item={item} />;
}
