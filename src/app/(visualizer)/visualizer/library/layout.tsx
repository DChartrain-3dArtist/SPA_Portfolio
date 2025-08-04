
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibliothèque | Visualiseur 3D',
  description: 'Explorez, manipulez et examinez tous les modèles 3D disponibles dans la bibliothèque interactive.',
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
