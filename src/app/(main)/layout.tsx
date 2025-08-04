
'use client';

import { SiteLayout } from '@/components/layout/site-layout';
import { BackgroundHalos } from '@/components/background-halos';
import { useTheme } from '@/contexts/theme-context';
import { useEffect } from 'react';

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
