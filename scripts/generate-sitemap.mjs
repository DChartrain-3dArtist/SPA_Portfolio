// Ce script est destiné à être exécuté par Node.js avant le build de Next.js.
// Il lit les projets depuis le fichier JSON, génère un sitemap, et l'écrit dans le dossier `public`.

import fs from 'fs';
import path from 'path';

// Utilise une importation synchrone de JSON, compatible avec Node.js.
// On lit le contenu du fichier et on le parse.
const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
const projectsFileContent = fs.readFileSync(projectsFilePath, 'utf8');
const projects = JSON.parse(projectsFileContent);

const BASE_URL = 'https://donovan-dev3d.vercel.app';

async function generateSitemap() {
  const sitemapEntries = [
    { url: BASE_URL, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/about`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/contact`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/visualizer`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/visualizer/library`, lastModified: new Date().toISOString() },
  ];

  for (const project of projects) {
    sitemapEntries.push({
      url: `${BASE_URL}/portfolio/${project.id}`,
      lastModified: new Date(project.date).toISOString(),
    });

    if (project.isVisualizable && project.visualizerItems) {
        for (const item of project.visualizerItems) {
            sitemapEntries.push({
                url: `${BASE_URL}/visualizer/item/${item.id}`,
                lastModified: new Date(project.date).toISOString(),
            })
        }
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries
    .map(
      ({ url, lastModified }) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastModified}</lastmod>
    </url>
  `
    )
    .join('')}
</urlset>`;

  try {
    const publicPath = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath);
    }
    fs.writeFileSync(path.join(publicPath, 'site-sitemap.xml'), sitemap, 'utf-8');
    console.log('Sitemap généré avec succès dans public/site-sitemap.xml');
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap :', error);
    process.exit(1);
  }
}

generateSitemap();
