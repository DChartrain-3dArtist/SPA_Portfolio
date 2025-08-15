// scripts/generate-sitemap.mjs
import fs from 'fs';
import { getProjects, getVisualizerItems } from '../src/data/projects.js';

async function generateSitemap() {
  const baseUrl = 'https://donovan-dev3d.vercel.app';
  const projects = await getProjects();
  const visualizerItems = await getVisualizerItems();

  const staticPages = [
    '/',
    '/portfolio',
    '/about',
    '/contact',
    '/visualizer',
    '/visualizer/library',
    '/legal-notice',
    '/privacy-policy',
    '/style-guide',
    '/sitemap',
  ];

  const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
      `;
    })
    .join('')}
  ${projects
    .map(({ id, date }) => {
      return `
    <url>
      <loc>${baseUrl}/portfolio/${id}</loc>
      <lastmod>${new Date(date).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
       <priority>0.9</priority>
    </url>
      `;
    })
    .join('')}
    ${visualizerItems
    .map(({ id }) => {
      return `
    <url>
      <loc>${baseUrl}/visualizer/item/${id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
       <priority>0.8</priority>
    </url>
      `;
    })
    .join('')}
</urlset>
  `;

  fs.writeFileSync('public/site-sitemap.xml', sitemap.trim());
}

generateSitemap();
