import type { Project } from '@/data/definitions';

export function getSectorBadgeClass(sector?: Project['sector']) {
  if (!sector) {
    return '';
  }

  switch (sector) {
    case 'Infographie 3D':
      return 'bg-orange-500 hover:bg-orange-500/90 text-white border-transparent';
    case '3D Temps Réel':
      return 'bg-emerald-500 hover:bg-emerald-500/90 text-white border-transparent';
    case 'Développement Web':
      return 'bg-violet-500 hover:bg-violet-500/90 text-white border-transparent';
    default:
      return '';
  }
}
