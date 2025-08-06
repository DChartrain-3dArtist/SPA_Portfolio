// Ce fichier est le composant "Serveur" qui gère les métadonnées de la page d'accueil.
// Il importe ensuite le composant "Client" qui contient la logique interactive.

import HomePage from '@/components/sections/home';
import type { Metadata, Viewport } from 'next';

// Métadonnées par défaut pour l'application.
// `metadataBase` définit l'URL de base pour résoudre les URLs relatives dans les métadonnées.
export const metadata: Metadata = {
  metadataBase: new URL('https://donovan-dev3d.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | Chartrain Donovan',
    default: 'Chartrain Donovan | Développeur Web & Artiste 3D en Vaucluse et Gard',
  },
  description: 'Portfolio de Chartrain Donovan, développeur web et artiste 3D basé en Vaucluse et mobile dans le Gard. Spécialisé dans la création d\'applications web, de configurateurs 3D et d\'expériences interactives.',
  openGraph: {
    title: 'Chartrain Donovan | Développeur Web & Artiste 3D',
    description: 'Découvrez le portfolio d\'un créateur d\'expériences numériques, alliant développement web et expertise 3D.',
    url: 'https://donovan-dev3d.vercel.app',
    siteName: 'Chartrain Donovan Portfolio',
    images: [
      {
        url: '/assets/data/Opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Chartrain Donovan',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chartrain Donovan | Développeur Web & Artiste 3D',
    description: 'Portfolio de Chartrain Donovan, développeur web et artiste 3D.',
    images: ['https://donovan-dev3d.vercel.app/assets/data/Opengraph.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// `themeColor` définit la couleur de la barre d'outils du navigateur sur les appareils mobiles.
// Il est maintenant défini dans l'export `viewport` comme recommandé par Next.js.
export const viewport: Viewport = {
  themeColor: '#050608',
};


// Le composant serveur se contente d'appeler le composant client.
export default HomePage;
