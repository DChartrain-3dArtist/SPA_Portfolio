// Ce fichier est utilisé par Next.js pour générer le fichier `sitemap.xml` à la racine du site.
// Il aide les moteurs de recherche à découvrir et indexer efficacement toutes les pages importantes.
// https://nextjs.org/docs/app/api-reference/file-conventions/sitemap

import { MetadataRoute } from 'next'
import { getProjects } from '@/data/projects';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://donovan-dev3d.vercel.app';

  // Récupère dynamiquement les projets pour les ajouter au sitemap.
  const projects = await getProjects();
  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Liste des pages statiques principales du site.
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/style-guide`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal-notice`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ];

  // Combine les URLs statiques et celles des projets.
  return [...staticUrls, ...projectUrls];
}
