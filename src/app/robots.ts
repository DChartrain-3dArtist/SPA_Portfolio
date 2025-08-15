// Ce fichier est utilisé par Next.js pour générer le fichier `robots.txt` à la racine du site.
// Il définit les règles d'exploration pour les moteurs de recherche.
// https://nextjs.org/docs/app/api-reference/file-conventions/robots

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Autorise tous les user-agents (comme Googlebot, Bingbot, etc.) à explorer l'intégralité du site.
      userAgent: '*',
      allow: '/',
      // Interdit l'exploration de chemins spécifiques si nécessaire (aucun pour le moment).
      // disallow: '/private/', 
    },
    // Spécifie l'emplacement du sitemap pour aider les robots à découvrir toutes les pages.
    sitemap: 'https://donovan-dev3d.vercel.app/site-sitemap.xml',
  }
}
