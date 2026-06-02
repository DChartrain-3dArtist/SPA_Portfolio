export const siteConfig = {
  name: 'Chartrain Donovan | Portfolio',
  shortName: "Donovan's Portfolio",
  description:
    'Portfolio de Chartrain Donovan, developpeur web et artiste 3D base en Vaucluse et mobile dans le Gard.',
  url: 'https://donovan-dev3d.vercel.app',
  email: 'donovan.chartrain@gmail.com',
  verification: {
    google: 'SnIuiDI-vgFpHU-9oT44pMQNlqb7vP5N2rAZm4DhtZ8',
  },
} as const;

export function absoluteUrl(path = ''): string {
  return new URL(path, siteConfig.url).toString();
}
