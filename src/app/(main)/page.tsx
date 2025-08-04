import HomePage from '@/components/sections/home';
import type { Metadata } from 'next';

// Métadonnées par défaut pour l'application.
// `metadataBase` définit l'URL de base pour résoudre les URLs relatives dans les métadonnées.
// `themeColor` définit la couleur de la barre d'outils du navigateur sur les appareils mobiles.
export const metadata: Metadata = {
  metadataBase: new URL('https://donovan-dev3d.vercel.app'),
  themeColor: '#050608',
  title: {
    template: '%s | Chartrain Donovan',
    default: 'Chartrain Donovan | Artiste 3D & Développeur Web en Vaucluse',
  },
  description: 'Portfolio de Chartrain Donovan, artiste 3D et développeur web basé en Vaucluse, spécialisé dans la création d\'expériences numériques, de configurateurs 3D et d\'applications interactives.',
  openGraph: {
    title: 'Chartrain Donovan | Artiste 3D & Développeur',
    description: 'Découvrez le portfolio d\'un créateur d\'expériences numériques, alliant expertise 3D et développement web.',
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
    title: 'Chartrain Donovan | Artiste 3D & Développeur',
    description: 'Portfolio de Chartrain Donovan, artiste 3D et développeur web.',
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


export default HomePage;
