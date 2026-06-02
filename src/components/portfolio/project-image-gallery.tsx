'use client';

import Image from 'next/image';
import { Maximize } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/language-context';

export function ProjectImageGallery({
  images,
  title,
}: {
  images: string[];
  title: { fr: string; en: string };
}) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <Dialog key={image}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`${title[language]} - gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize className="h-8 w-8 text-white" />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl border-0 p-0">
            <DialogTitle className="sr-only">
              {title[language]} - Image {index + 1}
            </DialogTitle>
            <Image
              src={image}
              alt={`${title[language]} - gallery image ${index + 1}`}
              width={1600}
              height={900}
              className="h-auto w-full rounded-lg object-contain"
              loading="eager"
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
