
import { Button } from '@/components/ui/button';
import { Home, Telescope } from 'lucide-react';
import Link from 'next/link';

/**
 * Composant pour la page 404 (non trouvée).
 * S'affiche lorsque l'utilisateur accède à une URL qui n'existe pas.
 * @returns Un composant React pour la page 404.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <Telescope className="h-24 w-24 text-primary animate-pulse" />
      <h1 className="mt-8 text-4xl font-bold font-headline md:text-6xl">
        404 - Page Perdue
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Oups ! Il semblerait que vous ayez suivi une piste qui ne mène nulle part.
      </p>
      <p className="text-muted-foreground">
        La page que vous cherchez a peut-être été déplacée ou n&apos;a jamais existé.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/">
          <Home className="mr-2" />
          Retourner à l&apos;accueil
        </Link>
      </Button>
    </div>
  );
}
