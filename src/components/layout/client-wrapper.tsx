
'use client';

import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Preloader } from '@/components/ui/preloader';
import { cn } from '@/lib/utils';
import { Providers } from './providers';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Minimum duration for the preloader animation to complete
        const minAnimationTime = 3000; 

        const animationTimer = setTimeout(() => {
            setIsLoading(false);
        }, minAnimationTime);

        return () => clearTimeout(animationTimer);
    }, []);

    return (
        <Providers>
            {isLoading && <Preloader />}
            <div className={cn("transition-opacity duration-500 w-full", isLoading ? "opacity-0" : "opacity-100")}>
                {children}
                <Toaster />
            </div>
        </Providers>
    )
}
