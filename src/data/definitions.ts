
export type Sector = 'Infographie 3D' | '3D Temps Réel' | 'Développement Web' | 'Visualisation Architecturale' | 'Animation 3D / Interactif';
export type ProductionType = 'Rendu' | 'Animation' | 'Application' | 'Site Web' | 'Visualisation' | 'Animation 3D Interactive';

export interface VisualizerItem {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  image: string;
  modelUrl: string; // Lien vers le modèle .glb
  hint: string;
  // Ajout pour le contexte
  projectId?: string;
  projectTitle?: { fr: string; en: string };
}

export interface Project {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  longDescription: {
    fr: string;
    en: string;
  };
  sector: Sector;
  productionType: ProductionType;
  image: string;
  images: string[];
  technologies: string[];
  hint: string;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  isVisualizable: boolean;
  videoUrl?: string; // URL de la vidéo (locale ou YouTube)
  visualizerItems?: VisualizerItem[];
  liveUrl?: string; // URL du site en ligne
}

export const sectors: Sector[] = ['Infographie 3D', '3D Temps Réel', 'Développement Web'];
export const productionTypes: ProductionType[] = ['Rendu', 'Animation', 'Application', 'Site Web'];
