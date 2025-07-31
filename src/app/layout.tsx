
import type { Metadata } from 'next';
import './globals.css';
import { ClientWrapper } from '@/components/layout/client-wrapper';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={cn("font-body antialiased", spaceGrotesk.variable)}>
        <ClientWrapper>
            {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
