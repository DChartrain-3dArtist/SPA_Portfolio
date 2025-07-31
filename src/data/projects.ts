'use server';

import type { Project, VisualizerItem } from './definitions';
import projectsData from './projects.json';

// The JSON file is now imported directly and will be bundled with the server code.
// This avoids any file system access at runtime, which is the cause of the Vercel error.
const projects: Project[] = projectsData;

export async function getProjects(): Promise<Project[]> {
  // We return a promise to maintain compatibility with components that use 'await'.
  return Promise.resolve(projects);
}


export async function getVisualizerItems(): Promise<VisualizerItem[]> {
  const projects = await getProjects();
  const allItems: VisualizerItem[] = [];

  projects.forEach(project => {
    if (project.isVisualizable && project.visualizerItems) {
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

export async function getVisualizerItem(id: string): Promise<VisualizerItem | null> {
  const allItems = await getVisualizerItems();
  return allItems.find(item => item.id === id) || null;
}
