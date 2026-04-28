import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: 'Portfolio de Chartrain Donovan, artiste 3D et developpeur web.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050608',
    theme_color: '#050608',
    icons: [
      {
        src: '/assets/data/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/data/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/data/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
