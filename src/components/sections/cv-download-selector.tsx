'use client';

import { Download, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CV_DOWNLOAD_URL = 'https://donovan-dev-web.vercel.app/api/docs';

export function CvDownloadSelector() {
  const { language } = useLanguage();
  const c = content[language].about;

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-border/50 bg-card/80">
        <CardContent className="flex flex-col gap-6 p-8 text-center md:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <div className="space-y-3">
            <h3 className="font-headline text-2xl font-bold">{c.resume_single_title}</h3>
            <p className="mx-auto max-w-2xl text-muted-foreground">{c.resume_single_description}</p>
          </div>
          <div>
            <Button size="lg" asChild>
              <a href={CV_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" />
                {c.resume_download_button}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
