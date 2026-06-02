import type { MetadataRoute } from 'next';

import { getProjects, getVisualizerItems } from '@/data/projects';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, visualizerItems] = await Promise.all([
    getProjects(),
    getVisualizerItems(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/portfolio'),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/about'),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/visualizer'),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/visualizer/library'),
      lastModified: new Date(),
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.id}`),
    lastModified: new Date(project.date),
  }));

  const visualizerRoutes: MetadataRoute.Sitemap = visualizerItems.map((item) => ({
    url: absoluteUrl(`/visualizer/item/${item.id}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...visualizerRoutes];
}
