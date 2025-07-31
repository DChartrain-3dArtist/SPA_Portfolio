'use server';

import path from 'path';
import { promises as fs } from 'fs';
import type { Project, VisualizerItem } from './definitions';

let cachedProjects: Project[] | null = null;

export async function getProjects(): Promise<Project[]> {
  // Since this is a server action, it will only run on the server.
  // Caching is still useful to avoid reading the file on every call within the same request lifecycle.
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'public', 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'projects.json'), 'utf8');
    const projects: Project[] = JSON.parse(fileContents);
    cachedProjects = projects;
    return projects;
  } catch (error) {
    console.error('Error loading projects from filesystem:', error);
    return []; // Return empty array on error
  }
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
