
// Ce fichier contient les définitions de types TypeScript utilisées dans toute l'application.
// Centraliser ces types permet d'assurer la cohérence et de faciliter la maintenance.

// Type pour les différents secteurs d'activité des projets.
export type Sector = 'Infographie 3D' | '3D Temps Réel' | 'Développement Web';

// Type pour les différents types de production des projets.
export type ProductionType = 'Rendu' | 'Animation' | 'Application' | 'Site Web';

/**
 * Interface pour un objet 3D visualisable.
 * Représente un modèle spécifique qui peut être affiché dans le visualiseur 3D.
 */
export interface VisualizerItem {
  id: string; // Identifiant unique de l'objet.
  name: {
    fr: string; // Nom en français.
    en: string; // Nom en anglais.
  };
  description: {
    fr: string; // Description en français.
    en: string; // Description en anglais.
  };
  image: string; // URL de l'image de prévisualisation.
  modelUrl: string; // URL du fichier de modèle 3D (.glb).
  hint: string; // Indice pour l'IA ou la recherche d'images.
  projectId?: string; // ID du projet parent.
  projectTitle?: { fr: string; en: string }; // Titre du projet parent.
  polycount?: number;
  materials?: number;
  software?: string;
  category?: string; // Nouvelle catégorie pour le filtrage
  isFeatured?: boolean; // Pour mettre en avant certains modèles
}

/**
 * Interface pour un projet du portfolio.
 * Contient toutes les informations nécessaires pour afficher un projet.
 */
export interface Project {
  id: string; // Identifiant unique du projet.
  title: {
    fr: string; // Titre en français.
    en: string; // Titre en anglais.
  };
  description: {
    fr: string; // Description courte en français.
    en: string; // Description courte en anglais.
  };
  longDescription: {
    fr: string; // Description longue et détaillée en français.
    en: string; // Description longue et détaillée en anglais.
  };
  sector: Sector; // Le secteur d'activité du projet.
  productionType: ProductionType; // Le type de production.
  image: string; // URL de l'image principale.
  images: string[]; // URLs des images de la galerie.
  technologies: string[]; // Liste des technologies utilisées.
  hint: string; // Indice pour l'IA ou la recherche d'images.
  date: string; // Date de réalisation au format ISO 8601: "YYYY-MM-DD".
  isVisualizable: boolean; // Indique si le projet contient des objets 3D visualisables.
  videoUrl?: string; // URL optionnelle d'une vidéo de présentation (locale ou YouTube).
  visualizerItems?: VisualizerItem[]; // Liste optionnelle d'objets 3D associés au projet.
  liveUrl?: string; // URL optionnelle vers le site ou l'application en ligne.
  githubUrl?: string; // URL optionnelle vers le dépôt source.
}

// Constantes listant les secteurs et types de production pour les filtres du portfolio.
export const sectors: Sector[] = ['Infographie 3D', '3D Temps Réel', 'Développement Web'];
export const productionTypes: ProductionType[] = ['Rendu', 'Animation', 'Application', 'Site Web'];
