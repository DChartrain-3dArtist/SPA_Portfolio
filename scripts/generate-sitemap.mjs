// Ce script génère un fichier sitemap.xml statique dans le dossier /public.
// Il est exécuté avant le build de Next.js.

import fs from 'fs';
import path from 'path';
import projectsData from '../src/data/projects.json' assert { type: 'json' };

const baseUrl = 'https://donovan-dev3d.vercel.app';

function generateSitemap() {
  // Liste des pages statiques
  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'yearly' },
    { url: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { url: '/visualizer', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/visualizer/library', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/style-guide', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/legal-notice', priority: 0.2, changeFrequency: 'yearly' },
    { url: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  ];

  // Récupère les projets depuis le JSON
  const projects = projectsData;

  // Crée les URLs pour les projets
  const projectUrls = projects.map(project => ({
    url: `/portfolio/${project.id}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: project.date,
  }));
  
  // Crée les URLs pour les items du visualiseur
  const visualizerItems = projects.flatMap(p => p.visualizerItems || []).map(item => ({
    url: `/visualizer/item/${item.id}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const allUrls = [...staticPages, ...projectUrls, ...visualizerItems];

  // Construit le contenu XML du sitemap
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(({ url, priority, changeFrequency, lastModified }) => {
      const lastModTag = lastModified ? `<lastmod>${new Date(lastModified).toISOString()}</lastmod>` : '';
      return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <priority>${priority}</priority>
    <changefreq>${changeFrequency}</changefreq>
    ${lastModTag}
  </url>`;
    })
    .join('')}
</urlset>`;

  // Écrit le fichier dans le dossier /public
  const sitemapPath = path.resolve('./public/site-sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);

  console.log(`✅ Sitemap généré avec succès dans ${sitemapPath}`);
}

try {
    generateSitemap();
} catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap :', error);
    process.exit(1);
}
