import './globals.css';
import { ClientWrapper } from '@/components/layout/client-wrapper';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  LANGUAGE_COOKIE_NAME,
  THEME_COOKIE_NAME,
} from '@/lib/preferences';
import { absoluteUrl, siteConfig } from '@/lib/site';

// Importe la police Space Grotesk depuis Google Fonts.
// `subsets` spécifie les jeux de caractères à précharger.
// `variable` l'expose en tant que variable CSS pour une utilisation facile avec Tailwind.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | Chartrain Donovan',
    default: 'Chartrain Donovan | Developpeur Web & Artiste 3D en Vaucluse et Gard',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/assets/data/favicon.ico', sizes: 'any' },
      { url: '/assets/data/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/assets/data/apple-touch-icon.png' }],
  },
  verification: {
    google: siteConfig.verification.google,
  },
};

export const viewport: Viewport = {
  themeColor: '#050608',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "potentialAction": {
          "@type": "SearchAction",
          "target": absoluteUrl('/portfolio?q={search_term_string}'),
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "name": "Chartrain Donovan",
        "url": absoluteUrl('/about'),
        "jobTitle": "Développeur Web & Artiste 3D",
        "sameAs": [
          "https://www.linkedin.com/in/donovan-chartrain-63686a138",
          "https://github.com/DChartrain-3dArtist",
          "https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==",
          "https://www.youtube.com/@d.chartrain3dtechnicalarti873"
        ],
        "email": `mailto:${siteConfig.email}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bédoin",
          "postalCode": "84410",
          "addressCountry": "FR"
        }
      }
    ]
  };

  const preferencesScript = `
    (function() {
      var defaultLanguage = '${DEFAULT_LANGUAGE}';
      var defaultTheme = '${DEFAULT_THEME}';
      var languageMatch = document.cookie.match(/(?:^|; )${LANGUAGE_COOKIE_NAME}=([^;]+)/);
      var themeMatch = document.cookie.match(/(?:^|; )${THEME_COOKIE_NAME}=([^;]+)/);
      var storedLanguage = window.localStorage.getItem('${LANGUAGE_COOKIE_NAME}');
      var storedTheme = window.localStorage.getItem('${THEME_COOKIE_NAME}');
      var language = storedLanguage || (languageMatch ? decodeURIComponent(languageMatch[1]) : defaultLanguage);
      var theme = storedTheme || (themeMatch ? decodeURIComponent(themeMatch[1]) : defaultTheme);

      if (language !== 'fr' && language !== 'en') language = defaultLanguage;
      if (theme !== 'light' && theme !== 'dark') theme = defaultTheme;

      document.documentElement.lang = language;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    })();
  `;

  return (
    <html lang={DEFAULT_LANGUAGE} className={DEFAULT_THEME} suppressHydrationWarning>
       <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={cn("font-body antialiased", spaceGrotesk.variable)}>
        <ClientWrapper initialLanguage={DEFAULT_LANGUAGE} initialTheme={DEFAULT_THEME}>
            {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
