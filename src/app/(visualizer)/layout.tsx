
import type { ReactNode } from 'react';
import './visualizer-theme.css';
import { VisualizerHeader } from '@/components/visualizer/visualizer-header';
import { BackgroundHalos } from '@/components/background-halos';

export default function VisualizerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="visualizer-theme">
      <div className="relative flex min-h-screen flex-col">
          <BackgroundHalos />
          <VisualizerHeader />
          <main className="flex-1 w-full px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
