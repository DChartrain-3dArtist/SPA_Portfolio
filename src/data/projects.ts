// Ce fichier sert de couche d'accès aux données des projets.
// Il centralise la logique de récupération des données, qu'elles proviennent
// d'un fichier JSON local, d'une base de données ou d'une API externe.

import type { Project, VisualizerItem } from './definitions';
import projectsData from './projects.json';
import {z} from 'zod';

const localizedStringSchema = z.object({
  fr: z.string(),
  en: z.string(),
});

const visualizerItemSchema = z.object({
  id: z.string(),
  name: localizedStringSchema,
  description: localizedStringSchema,
  image: z.string(),
  modelUrl: z.string(),
  hint: z.string(),
  projectId: z.string().optional(),
  projectTitle: localizedStringSchema.optional(),
  polycount: z.number().optional(),
  materials: z.number().optional(),
  software: z.string().optional(),
  category: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

const projectSchema = z.object({
  id: z.string(),
  title: localizedStringSchema,
  description: localizedStringSchema,
  longDescription: localizedStringSchema,
  sector: z.enum(['Infographie 3D', '3D Temps Réel', 'Développement Web']),
  productionType: z.enum(['Rendu', 'Animation', 'Application', 'Site Web']),
  image: z.string(),
  images: z.array(z.string()),
  technologies: z.array(z.string()),
  hint: z.string(),
  date: z.string(),
  isVisualizable: z.boolean(),
  videoUrl: z.string().optional(),
  visualizerItems: z.array(visualizerItemSchema).optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
});

// Valide les données importées une fois au chargement du module.
const projects: Project[] = z.array(projectSchema).parse(projectsData);

/**
 * Récupère la liste de tous les projets.
 * La fonction est asynchrone pour simuler un appel API et permettre une
 * transition facile vers une source de données externe à l'avenir.
 * @returns Une promesse qui se résout avec un tableau de tous les projets.
 */
export async function getProjects(): Promise<Project[]> {
  // Pour l'instant, nous retournons simplement les données importées dans une promesse résolue.
  return Promise.resolve(projects);
}

/**
 * Récupère une liste de tous les éléments visualisables (modèles 3D)
 * à travers tous les projets.
 * @returns Une promesse qui se résout avec un tableau de tous les `VisualizerItem`.
 */
export async function getVisualizerItems(): Promise<VisualizerItem[]> {
  const allProjects = await getProjects();
  const allItems: VisualizerItem[] = [];

  // Parcourt chaque projet pour extraire ses éléments visualisables.
  allProjects.forEach(project => {
    if (project.isVisualizable && project.visualizerItems) {
      // Pour chaque élément, ajoute des informations sur le projet parent.
      project.visualizerItems.forEach(item => {
        allItems.push({
          ...item,
          projectId: project.id,
          projectTitle: project.title,
        });
      });
    }
  });

  return allItems;
}

/**
 * Récupère un élément visualisable spécifique par son identifiant.
 * @param id - L'identifiant de l'élément à trouver.
 * @returns Une promesse qui se résout avec l'élément trouvé ou `null` s'il n'existe pas.
 */
export async function getVisualizerItem(id: string): Promise<VisualizerItem | null> {
  const allItems = await getVisualizerItems();
  // Trouve le premier élément qui correspond à l'ID donné.
  return allItems.find(item => item.id === id) || null;
}
