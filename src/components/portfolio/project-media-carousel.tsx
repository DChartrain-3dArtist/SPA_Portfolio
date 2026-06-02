'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

export function ProjectMediaCarousel({
  images,
  title,
}: {
  images: string[];
  title: { fr: string; en: string };
}) {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncCarouselState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    syncCarouselState();
    api.on('select', syncCarouselState);

    return () => {
      api.off('select', syncCarouselState);
    };
  }, [api]);

  return (
    <div className="mb-12">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${title[language]} - screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4 md:ml-16" />
        <CarouselNext className="mr-4 md:mr-16" />
      </Carousel>
      {count > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                current === index + 1
                  ? 'bg-primary'
                  : 'bg-muted-foreground/50 hover:bg-muted-foreground'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
