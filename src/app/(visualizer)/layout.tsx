
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import './visualizer-theme.css';
import { VisualizerHeader } from '@/components/visualizer/visualizer-header';
import { BackgroundHalos } from '@/components/background-halos';
import { useTheme } from '@/contexts/theme-context';

export default function VisualizerLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');

    // On unmount, restore the original theme
    return () => {
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
    };
  }, [theme]);


  return (
    <div className="visualizer-theme dark">
      <div className="relative flex min-h-screen flex-col">
          <BackgroundHalos />
          <VisualizerHeader />
          <main className="flex-1 w-full px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
