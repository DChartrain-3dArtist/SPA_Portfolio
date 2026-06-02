
import { cn } from '@/lib/utils';

/**
 * Composant SVG pour le logo.
 * Il est utilisé à plusieurs endroits dans l'application (preloader, sidebar, footer).
 * @param {object} props - Les propriétés du composant.
 * @param {string} [props.className] - Classes CSS optionnelles pour styliser le SVG.
 * @returns Un composant SVG React.
 */
export function LogoSVG({ className }: { className?: string }) {
  // Le SVG est un chemin complexe dessiné avec des coordonnées.
  // La couleur du trait (stroke) est définie en dur mais pourrait être remplacée par `currentColor`
  // pour être contrôlée par le CSS via `text-primary`, par exemple.
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1080 1080"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2.41279,
      }}
    >
      {/* Les différents chemins qui composent le logo. */}
      <path
        d="M210,310L550,120L940,340L940,780L550,1008.61L155.8,785.172L160,330L550,570L910,360"
        style={{
          fill: 'none',
          stroke: 'currentColor', // Utilise la couleur du texte parent.
          strokeWidth: '29.07px',
        }}
      />
      <path
        d="M550,960L550,620"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '29.07px',
        }}
      />
      <path
        d="M340,320L547.9,200L800,332.63L550,490L290,340"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '29.07px',
        }}
      />
      <path
        d="M231.893,469.612C231.893,469.612 497.016,535.377 470,750C452.275,890.815 240,770 240,770L240,520"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '29.07px',
        }}
      />
      <path
        d="M870,450C870,450 604.878,519.653 610,750C614.323,944.386 880,730 880,730"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '29.07px',
        }}
      />
    </svg>
  );
}
