
import { SiteLayout } from '@/components/layout/site-layout';
import { BackgroundHalos } from '@/components/background-halos';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
