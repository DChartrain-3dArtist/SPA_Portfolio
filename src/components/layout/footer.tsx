
import { Linkedin, Instagram, Youtube, Github } from 'lucide-react';
import Link from 'next/link';
import { LogoSVG } from '../logo-svg';
import { Separator } from '../ui/separator';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background/50 text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="group/logo flex items-center gap-2 text-sm font-bold font-headline text-foreground">
                <div className="relative h-6 w-6 transition-transform duration-300 group-hover/logo:rotate-[15deg]">
                  <LogoSVG className="w-full h-full" />
                </div>
                <span>
                  Chartrain Donovan
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/in/donovan-chartrain-63686a138" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon social-icon-linkedin">
                  <Linkedin />
              </a>
              <a href="https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon social-icon-instagram">
                  <Instagram />
              </a>
              <a href="https://www.youtube.com/@d.chartrain3dtechnicalarti873" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="social-icon social-icon-youtube">
                  <Youtube />
              </a>
              <a href="https://github.com/DChartrain-3dArtist" target="_blank" rel="noopener noreferrer" aria-label="Github" className="social-icon social-icon-github">
                  <Github />
              </a>
            </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Chartrain Donovan. Tous droits réservés.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                <Link href="/sitemap" className="hover:text-primary transition-colors">Plan du site</Link>
                <Link href="/style-guide" className="hover:text-primary transition-colors">Charte Graphique</Link>
                <Link href="/legal-notice" className="hover:text-primary transition-colors">Mentions Légales</Link>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
