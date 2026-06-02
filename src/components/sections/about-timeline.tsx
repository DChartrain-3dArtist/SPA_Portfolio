'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

type TimelineItem = {
  date: string;
  period: string;
  type: 'experience' | 'formation';
  role: string;
  company: string;
  description: string;
};

export function AboutTimeline({
  frItems,
  enItems,
}: {
  frItems: TimelineItem[];
  enItems: TimelineItem[];
}) {
  const { language } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [dotPosition, setDotPosition] = useState(0);

  const items = useMemo(
    () => (language === 'fr' ? frItems : enItems).slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [enItems, frItems, language]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const { top, height } = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 0;

      if (top < windowHeight / 2) {
        progress = windowHeight / 2 - top;
      }

      const clampedProgress = Math.max(0, Math.min(progress, height - 20));
      setDotPosition(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div ref={timelineRef} className="relative border-l-2 border-primary/20 ml-3 py-3 space-y-8">
      <div
        className="absolute -left-[11px] h-5 w-5 rounded-full bg-primary border-4 border-background transition-transform duration-200 ease-out z-10"
        style={{ transform: `translateY(${dotPosition}px)` }}
      />
      {items.map((exp, index) => (
        <div key={`${exp.date}-${index}`} className="relative pl-8">
          <div className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-background border-2 border-primary/50" />
          <p className="font-semibold text-muted-foreground mb-1">{exp.period}</p>
          <div className="flex items-center gap-2 mb-1">
            {exp.type === 'experience' ? (
              <Briefcase className="h-5 w-5 text-primary shrink-0" />
            ) : (
              <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            )}
            <h4 className="font-bold text-lg font-headline">
              {exp.role}
              <span className="text-muted-foreground font-medium"> @ {exp.company}</span>
            </h4>
          </div>
          <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: exp.description }} />
        </div>
      ))}
    </div>
  );
}
