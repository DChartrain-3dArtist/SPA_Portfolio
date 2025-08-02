
'use client';

import { SiteLayout } from '@/components/layout/site-layout';
import { BackgroundHalos } from '@/components/background-halos';
import type { Metadata } from 'next';
import { useTheme } from '@/contexts/theme-context';
import { useEffect } from 'react';

// Note: Metadata export is commented out because it can't be used in a client component.
// You might need to move this to a server component parent if you need metadata here.
/*
export const metadata: Metadata = {
  title: {
    template: '%s | Chartrain Donovan',
    default: 'Chartrain Donovan | Artiste 3D & Développeur Web en Vaucluse',
  },
  description: 'Portfolio de Chartrain Donovan, artiste 3D et développeur web basé en Vaucluse, spécialisé dans la création d\'expériences numériques, de configurateurs 3D et d\'applications interactives.',
  openGraph: {
    title: 'Chartrain Donovan | Artiste 3D & Développeur',
    description: 'Découvrez le portfolio d\'un créateur d\'expériences numériques, alliant expertise 3D et développement web.',
    url: 'https://your-domain.com', // TODO: Change this to your actual domain
    siteName: 'Chartrain Donovan Portfolio',
    images: [
      {
        url: 'https://your-domain.com/og-image.png', // TODO: Change this to an actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chartrain Donovan | Artiste 3D & Développeur',
    description: 'Portfolio de Chartrain Donovan, artiste 3D et développeur web.',
    // TODO: Add your twitter handle
    // creator: '@yourhandle', 
    images: ['https://your-domain.com/og-image.png'], // TODO: Change this to an actual OG image URL
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
*/


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="relative z-0">
        <BackgroundHalos />
        <SiteLayout>
            <div className="w-full max-w-7xl mx-auto">
                {children}
            </div>
        </SiteLayout>
    </div>
  );
}
