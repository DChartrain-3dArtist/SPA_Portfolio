
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  Cuboid,
  Github,
  Linkedin,
  Mail,
  Swords,
  Instagram,
  Youtube,
  ChevronRight,
  Monitor,
  Dices,
  Palette,
  ArrowRight,
  ExternalLink,
  Bot,
  Figma,
  Component,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { cn } from '@/lib/utils';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiThreedotjs,
  SiBlender,
  SiUnity,
  SiUnrealengine,
  SiFigma,
} from '@icons-pack/react-simple-icons';

const tools = [
  { name: 'React', icon: SiReact, color: "text-sky-500" },
  { name: 'Next.js', icon: SiNextdotjs, color: "text-neutral-400" },
  { name: 'TypeScript', icon: SiTypescript, color: "text-sky-600" },
  { name: 'JavaScript', icon: SiJavascript, color: "text-yellow-400" },
  { name: 'Three.js', icon: SiThreedotjs, color: "text-neutral-400" },
  { name: 'Blender', icon: SiBlender, color: "text-orange-500" },
  { name: 'Unity', icon: SiUnity, color: "text-neutral-400" },
  { name: 'Unreal Engine', icon: SiUnrealengine, color: "text-neutral-400" },
  { name: 'Figma', icon: SiFigma, color: "text-pink-500" },
];

function AnimatedSection({ children, className, animation = "animate-fade-in-up" }: { children: React.ReactNode, className?: string, animation?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={cn("transition-opacity duration-1000", inView ? "opacity-100" : "opacity-0", inView ? animation : "", className)}>
      {children}
    </div>
  );
}


function StatCard({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Card ref={ref} className="group relative overflow-hidden bg-card/80 border-border/50 text-center transition-all duration-300 ease-in-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm">
            <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 inline-block">
                        {inView ? <CountUp end={end} duration={2.5} /> : '0'}
                        {suffix}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-2">{label}</span>
                </div>
            </CardContent>
        </Card>
    );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden bg-card/80 border-border/50 text-center transition-all duration-300 ease-in-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold font-headline text-card-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language].home;

  return (
    <>
      <Header />
      <main>
        
            {/* Hero Section */}
            <section
              id="home"
              className="relative flex min-h-screen items-center w-full overflow-hidden px-4 sm:px-6 lg:px-8"
            >
             <div className="w-full">
                <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <AnimatedSection animation="animate-fade-in-down" className="text-left">
                    <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
                        dangerouslySetInnerHTML={{ __html: c.title }}
                    >
                    </h1>
                    <p className="mt-4 text-lg text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: c.subtitle }}
                    >
                    </p>
                    <p className="mt-6 text-foreground/90 max-w-lg">
                        {c.intro_paragraph}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button size="lg" asChild className="group">
                        <Link href="/portfolio">
                            {c.hero_cta}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                            <a href="https://www.linkedin.com/in/donovan-chartrain-63686a138" target="_blank" aria-label="LinkedIn" className="social-icon social-icon-linkedin">
                                <Linkedin />
                            </a>
                            <a href="https://www.instagram.com/3dc_effect?igsh=MXd1NTBob2Zmdmx5cA==" target="_blank" aria-label="Instagram" className="social-icon social-icon-instagram">
                                <Instagram />
                            </a>
                            <a href="https://www.youtube.com/@d.chartrain3dtechnicalarti873" target="_blank" aria-label="Youtube" className="social-icon social-icon-youtube">
                                <Youtube />
                            </a>
                            <a href="https://github.com/DChartrain-3dArtist" target="_blank" aria-label="Github" className="social-icon social-icon-github">
                                <Github />
                            </a>
                        </div>
                    </div>
                    </AnimatedSection>
                    <AnimatedSection className="flex items-center justify-center md:[perspective:1000px]">
                      <div className="group relative w-full h-auto">
                        <div className="relative w-full aspect-square rounded-2xl transition-transform duration-500 [filter:drop-shadow(0_10px_15px_hsl(var(--primary)/0.2))]">
                            <Image
                                src="/assets/data/hero.webp"
                                alt="Rendu 3D d'un personnage de science-fiction"
                                width={1200}
                                height={900}
                                className="rounded-xl object-cover w-full h-full"
                                priority
                            />
                        </div>
                      </div>
                    </AnimatedSection>
                </div>
                </div>
            </div>
            </section>

            {/* Quick Stats Section */}
            <section className="w-full py-16 relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full relative z-10">
                <AnimatedSection className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <StatCard end={50} suffix="+" label={c.stats.projects} />
                <StatCard end={5} suffix="+" label={c.stats.experience} />
                <StatCard end={3} label={c.stats.expertise} />
                <StatCard end={30} suffix="+" label={c.stats.technologies} />
                </AnimatedSection>
            </div>
            </section>

            {/* Mini Presentation Section */}
            <section className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full relative z-10">
                <div className="max-w-3xl mx-auto">
                <AnimatedSection>
                    <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
                    {c.presentation.part1}{' '}
                    <span className="font-medium text-primary">{c.presentation.highlight1}</span>,{' '}
                    <span className="font-medium text-primary">
                        {c.presentation.highlight2}
                    </span>{' '}
                    {c.presentation.part2}{' '}
                    <span className="font-medium text-primary">{c.presentation.highlight3}</span>{' '}
                    {c.presentation.part3}
                    </h2>
                </AnimatedSection>
                </div>
            </div>
            </section>

            {/* Services Section */}
            <section id="services" className="w-full py-16 md:py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full relative z-10">
                <AnimatedSection animation="animate-fade-in-down" className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold md:text-5xl">
                    {c.services.title}
                    </h2>
                </AnimatedSection>
                <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <ServiceCard
                    icon={<Palette size={48} className="mx-auto" />}
                    title={c.services.item1.title}
                    description={c.services.item1.description}
                />
                <ServiceCard
                    icon={<Dices size={48} className="mx-auto" />}
                    title={c.services.item2.title}
                    description={c.services.item2.description}
                />
                <ServiceCard
                    icon={<Monitor size={48} className="mx-auto" />}
                    title={c.services.item3.title}
                    description={c.services.item3.description}
                />
                </AnimatedSection>
            </div>
            </section>
        

        {/* Showreel Section */}
         <section
            id="showreel"
            className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
          >
            <div className="w-full relative z-10">
              <AnimatedSection>
                 <div className="bg-primary/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-primary/20">
                    <h2 className="font-headline text-4xl font-bold text-foreground md:text-6xl mb-4">
                    {c.showreel.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground mb-8">
                    {c.showreel.subtitle}
                    </p>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/30">
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/FAJsUI9OTsk?si=S1Xv_x8j0kZ-yKlN"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                    </div>
                    <Button size="lg" asChild className="group mt-8">
                    <Link href="/portfolio">
                        {c.showreel.cta}
                        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                    </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

        
            {/* Skills Section */}
            <section id="skills" className="w-full py-16 md:py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full text-center relative z-10">
                <AnimatedSection animation="animate-fade-in-down" className="mb-12">
                    <h2 className="text-center font-headline text-4xl font-bold md:text-5xl">
                    {c.skills.title}
                    </h2>
                </AnimatedSection>
                <AnimatedSection className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
                {tools.map((tool) => (
                    <div
                    key={tool.name}
                    className="group flex flex-col items-center gap-2 p-4"
                    >
                    <tool.icon className={cn("h-12 w-12 transition-all duration-300 group-hover:scale-110", tool.color)} />
                    <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                        {tool.name}
                    </span>
                    </div>
                ))}
                </AnimatedSection>
                <AnimatedSection className="mt-12">
                    <Button variant="outline" asChild className="group">
                    <Link href="/about">
                        {c.skills.cta}
                        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                    </Button>
                </AnimatedSection>
            </div>
            </section>

            {/* Final CTA Section */}
            <section
            id="contact-cta"
            className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
            >
            <div className="w-full relative z-10">
                <AnimatedSection>
                    <div className="bg-primary/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-primary/20">
                        <h2 className="font-headline text-3xl font-bold md:text-5xl">
                        {c.cta.title}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                        {c.cta.subtitle}
                        </p>
                        <Button size="lg" asChild className="group mt-8">
                        <Link href="/contact">
                            {c.cta.button}
                            <Mail className="ml-2" />
                        </Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </div>
            </section>
      </main>
    </>
  );
}
