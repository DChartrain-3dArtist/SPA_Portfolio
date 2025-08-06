// Ce fichier est le layout racine de l'application.
// Il enveloppe toutes les pages et est idéal pour définir des éléments globaux
// comme la police de caractères, les fournisseurs de contexte et les scripts/métadonnées communs.

'use client';

import './globals.css';
import { ClientWrapper } from '@/components/layout/client-wrapper';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useCookie } from '@/hooks/use-cookie';

// Importe la police Space Grotesk depuis Google Fonts.
// `subsets` spécifie les jeux de caractères à précharger.
// `variable` l'expose en tant que variable CSS pour une utilisation facile avec Tailwind.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hook pour récupérer l'état du consentement aux cookies.
  const [cookieConsent] = useCookie('cookie_consent', null);

  // Les données structurées aident les moteurs de recherche à comprendre le contenu de votre site.
  // 'WebSite' décrit le site dans son ensemble.
  // 'Person' vous identifie en tant que créateur du site.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Chartrain Donovan | Portfolio",
        "url": "https://donovan-dev3d.vercel.app",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://donovan-dev3d.vercel.app/portfolio?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "name": "Chartrain Donovan",
        "url": "https://donovan-dev3d.vercel.app/about",
        "jobTitle": "Développeur Web & Artiste 3D",
        "sameAs": [
          "https://www.linkedin.com/in/donovan-chartrain-63686a138",
          "https://github.com/DChartrain-3dArtist",
          "https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==",
          "https://www.youtube.com/@d.chartrain3dtechnicalarti873"
        ],
        "email": "mailto:donovan.chartrain@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bédoin",
          "postalCode": "84410",
          "addressCountry": "FR"
        }
      }
    ]
  };

  return (
    <html lang="fr" className="dark">
       <head>
        {/* Le script Google Tag Manager ne sera injecté que si l'utilisateur a donné son consentement. */}
        {cookieConsent === 'true' && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TCVSRQ9F');
            `}
          </Script>
        )}
        
        {/* Liens pour le manifest et les favicons pour la PWA et les différents navigateurs/plateformes. */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/assets/data/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/data/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/data/apple-touch-icon.jpg" />

        {/* Balise de vérification pour la Google Search Console. */}
        <meta name="google-site-verification" content="ST56g-SXhHTanGGB3VO_XaHresA_4bKWrW5W6_gKpNI" />
        
        {/* Script pour injecter les données structurées au format JSON-LD. */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* Applique la classe de la police au corps du document. */}
      <body className={cn("font-body antialiased", spaceGrotesk.variable)}>
        {/* Le noscript de Google Tag Manager ne s'affichera que si le consentement a été donné. */}
        {cookieConsent === 'true' && (
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCVSRQ9F"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        )}
        
        {/* ClientWrapper gère le preloader et les fournisseurs de contexte. */}
        <ClientWrapper>
            {children}
        </ClientWrapper>

        {/* Les composants d'analyse Vercel ne sont injectés que si le consentement a été donné. */}
        {cookieConsent === 'true' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
