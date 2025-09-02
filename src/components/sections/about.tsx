
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download, Mail, Briefcase, GraduationCap, Component, FileCode, Star, Palette, Printer, Home } from 'lucide-react';
import { Header } from '../layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
    SiBlender,
    SiAutodesk,
    SiAdobe,
    SiUnrealengine,
    SiUnity,
    SiCplusplus,
    SiPython,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiPhp,
    SiWordpress,
    SiFigma,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiBlackmagicdesign,
    SiTypescript,
    SiSass,
    SiAdobexd,
    SiAdobeindesign,
    SiElementor,
    SiGoogleads,
    SiGoogleanalytics,
    SiCinema4d,
    SiAngular,
    SiReact,
    SiTailwindcss,
    SiBootstrap,
    SiDotnet
} from '@icons-pack/react-simple-icons';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

/**
 * Composant de titre de page réutilisable.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu du titre.
 * @returns Un composant de titre H1 stylisé.
 */
function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{children}</h1>;
}

// Données statiques pour les compétences, organisées par catégorie.
const skills = {
    "Logiciels 3D & Moteurs": [
        { name: "Blender", icon: SiBlender, color: "text-orange-500" },
        { name: "Maya", icon: SiAutodesk, color: "text-sky-500" },
        { name: "3DS Max", icon: SiAutodesk, color: "text-sky-400" },
        { name: "Cinema 4D", icon: SiCinema4d, color: "text-blue-500" },
        { name: "ZBrush", icon: Component, color: "text-red-600" },
        { name: "Substance P.", icon: SiAdobe, color: "text-red-500" },
        { name: "NomadSculpt", icon: Component, color: "text-green-400" },
        { name: "Unreal Engine", icon: SiUnrealengine, color: "text-neutral-300" },
        { name: "Unity", icon: SiUnity, color: "text-neutral-300" },
        { name: "Unigine", icon: Component, color: "text-blue-400" },
        { name: "CryEngine", icon: Component, color: "text-neutral-400" },
        { name: "Photoshop", icon: SiAdobephotoshop, color: "text-sky-400" },
        { name: "Illustrator", icon: SiAdobeillustrator, color: "text-orange-400" },
        { name: "InDesign", icon: SiAdobeindesign, color: "text-pink-600" },
        { name: "After Effects", icon: SiAdobeaftereffects, color: "text-purple-500" },
        { name: "Premiere Pro", icon: SiAdobepremierepro, color: "text-purple-400" },
        { name: "DaVinci", icon: SiBlackmagicdesign, color: "text-red-500" },
        { name: "Natron", icon: Component, color: "text-blue-300" },
    ],
    "Langages de Programmation": [
        { name: "C#", icon: FileCode, color: "text-purple-400" },
        { name: "C++", icon: SiCplusplus, color: "text-sky-600" },
        { name: "Blueprint", icon: Component, color: "text-sky-400" },
        { name: "HLSL", icon: FileCode, color: "text-green-400" },
        { name: "Python", icon: SiPython, color: "text-yellow-400" },
        { name: "HTML", icon: SiHtml5, color: "text-orange-600" },
        { name: "CSS", icon: SiCss3, color: "text-sky-500" },
        { name: "SCSS", icon: SiSass, color: "text-pink-400" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-300" },
        { name: "TypeScript", icon: SiTypescript, color: "text-sky-500" },
        { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
        { name: "SQL", icon: FileCode, color: "text-teal-400" },
    ],
    "Web & Design": [
        { name: "WordPress", icon: SiWordpress, color: "text-sky-500" },
        { name: "Elementor", icon: SiElementor, color: "text-pink-500" },
        { name: "Divi", icon: Component, color: "text-purple-400" },
        { name: "React", icon: SiReact, color: "text-sky-400" },
        { name: "Angular", icon: SiAngular, color: "text-red-600" },
        { name: "C# .NET", icon: SiDotnet, color: "text-purple-500" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-sky-400" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
        { name: "Figma", icon: SiFigma, color: "text-pink-500" },
        { name: "Adobe XD", icon: SiAdobexd, color: "text-pink-400" },
        { name: "Google Ads", icon: SiGoogleads, color: "text-yellow-500" },
        { name: "Analytics", icon: SiGoogleanalytics, color: "text-orange-500" },
    ],
}

/**
 * Composant pour afficher une carte de compétence individuelle.
 * @param {object} props - Les propriétés du composant.
 * @returns Un composant React pour une compétence.
 */
function SkillCard({ icon: Icon, name, color, className }: { icon: React.ElementType, name: string, color: string, className?: string }) {
    return (
        <div className={cn("group relative flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 border border-border/50 hover:border-primary/50", className)}>
            <div className={cn("transition-colors group-hover:opacity-80", color)}>
                <Icon className="w-8 h-8" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{name}</span>
        </div>
    )
}

/**
 * Composant de frise chronologique pour afficher les expériences et formations.
 * Utilise le défilement pour animer un point sur la ligne de temps.
 * @param {object} props - Les propriétés du composant.
 * @returns Un composant React de frise chronologique.
 */
function Timeline({ items }: { items: { date: string, period: string; type: 'experience' | 'formation'; role: string; company: string; description: string }[]}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [dotPosition, setDotPosition] = useState(0);

  // Gère la position du point animé en fonction du défilement de la page.
  const handleScroll = () => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    const { top, height } = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    let progress = 0;
    
    // Calcule la progression du défilement par rapport à la frise.
    if (top < windowHeight / 2) {
        progress = (windowHeight / 2) - top;
    }
    
    const clampedProgress = Math.max(0, Math.min(progress, height - 20));

    setDotPosition(clampedProgress);
  };

  // Ajoute et retire l'écouteur d'événement de défilement.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Appel initial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div ref={timelineRef} className="relative border-l-2 border-primary/20 ml-3 py-3 space-y-8">
      {/* Le point animé */}
      <div 
        className="absolute -left-[11px] h-5 w-5 rounded-full bg-primary border-4 border-background transition-transform duration-200 ease-out z-10" 
        style={{ transform: `translateY(${dotPosition}px)` }}
      />
      {items.map((exp, index) => (
        <div key={index} className="relative pl-8">
          {/* Les points fixes de la frise */}
          <div className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-background border-2 border-primary/50" />
          <p className="font-semibold text-muted-foreground mb-1">{exp.period}</p>
          <div className="flex items-center gap-2 mb-1">
            {exp.type === 'experience' ? 
              <Briefcase className="h-5 w-5 text-primary shrink-0" /> : 
              <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            }
            <h4 className="font-bold text-lg font-headline">
              {exp.role}
              <span className="text-muted-foreground font-medium"> @ {exp.company}</span>
            </h4>
          </div>
          {/* Utilise `dangerouslySetInnerHTML` pour interpréter le HTML dans la description. */}
          <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: exp.description }}></p>
        </div>
      ))}
    </div>
  )
}

/**
 * Composant principal de la page "À propos".
 * @returns Un composant React pour la page "À propos".
 */
export default function AboutPage() {
  const { language } = useLanguage();
  const c = content[language].about;
  const { toast } = useToast();

  const [selectedCv, setSelectedCv] = useState<'designer' | 'printable' | null>(null);

  // Gère le téléchargement du CV sélectionné.
  const handleDownload = () => {
    if (!selectedCv) {
      toast({
        variant: "destructive",
        title: c.resume_error_title,
        description: c.resume_error_description,
      });
      return;
    }
    const link = document.createElement('a');
    link.href = selectedCv === 'designer' ? '/document/cv-designer.pdf' : '/document/cv-printable.pdf';
    link.download = `CV_Donovan_Chartrain_${selectedCv}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Sépare les compétences pour l'affichage.
  const [
    logicielsSkills,
    programmationSkills,
    webSkills
  ] = Object.values(skills);

  // Trie la frise chronologique par date la plus récente.
  const sortedTimeline = useMemo(() => {
    return [...c.timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [c.timeline]);

  return (
    <>
      <Header />
      <main>
        <section id="about" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            
                <PageTitle>{c.title}</PageTitle>
                <div className="mb-16 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{c.profile_title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                        <Avatar className="w-32 h-32 text-lg shrink-0">
                            <AvatarImage src="/assets/data/PhotoProfil.webp" alt="Votre photo" />
                            <AvatarFallback>CD</AvatarFallback>
                        </Avatar>
                        {/* Affiche le contenu avec les balises HTML interprétées. */}
                        <div className="text-foreground/90 prose prose-invert" dangerouslySetInnerHTML={{ __html: c.profile_content }} />
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                          <CardTitle className="font-headline">{c.journey_title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {/* Affiche le contenu avec les balises HTML interprétées. */}
                          <div className="text-foreground/90 prose prose-invert" dangerouslySetInnerHTML={{ __html: c.journey_content }} />
                           <div className="mt-6 flex flex-wrap justify-center gap-4">
                              <Button asChild>
                                  <a href="#download-cv">
                                  <Download className="mr-2 h-4 w-4" />
                                  {c.resume_cta}
                                  </a>
                              </Button>
                          </div>
                      </CardContent>
                    </Card>
                </div>
                
                {/* Section des compétences */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold font-headline text-center mb-12">{c.skills_title}</h3>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Colonne 1 : Logiciels */}
                        <div className="lg:col-span-1 h-full flex flex-col">
                           <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                               <CardHeader><CardTitle className="font-headline text-xl text-center">{Object.keys(skills)[0]}</CardTitle></CardHeader>
                               <CardContent>
                                    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                       {logicielsSkills.map(skill => (
                                           <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                                       ))}
                                   </div>
                               </CardContent>
                           </Card>
                        </div>

                        {/* Colonne 2 : Programmation et Web */}
                        <div className="lg:col-span-2 space-y-8 h-full flex flex-col">
                           <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                               <CardHeader><CardTitle className="font-headline text-xl">{Object.keys(skills)[1]}</CardTitle></CardHeader>
                               <CardContent>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                                       {programmationSkills.map(skill => (
                                           <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                                       ))}
                                   </div>
                               </CardContent>
                           </Card>
                           <Card className="flex-grow transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                               <CardHeader><CardTitle className="font-headline text-xl">{Object.keys(skills)[2]}</CardTitle></CardHeader>
                               <CardContent>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                      {webSkills.map(skill => (
                                          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                                      ))}
                                  </div>
                               </CardContent>
                           </Card>
                        </div>

                    </div>
                </div>

                {/* Section du parcours (frise chronologique) */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">{c.experience_title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Timeline items={sortedTimeline} />
                        </CardContent>
                    </Card>
                </div>

            
        </section>

        {/* Section de téléchargement de CV */}
        <section id="download-cv" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">{c.resume_section_title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{c.resume_section_subtitle}</p>
          </div>
          
          <RadioGroup onValueChange={(value) => setSelectedCv(value as 'designer' | 'printable')} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <Label htmlFor="cv-designer" className="block">
              <Card className={cn("p-6 cursor-pointer border-2 border-transparent transition-all", selectedCv === 'designer' && "border-primary shadow-2xl shadow-primary/20")}>
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="designer" id="cv-designer" className="mt-1" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg font-headline flex items-center gap-2"><Palette className="h-5 w-5 text-primary" />{c.resume_designer_title}</h4>
                      <p className="text-muted-foreground text-sm">{c.resume_designer_description}</p>
                    </div>
                  </div>
              </Card>
            </Label>
            <Label htmlFor="cv-printable" className="block">
              <Card className={cn("p-6 cursor-pointer border-2 border-transparent transition-all", selectedCv === 'printable' && "border-primary shadow-2xl shadow-primary/20")}>
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="printable" id="cv-printable" className="mt-1" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg font-headline flex items-center gap-2"><Printer className="h-5 w-5 text-primary" />{c.resume_printable_title}</h4>
                    <p className="text-muted-foreground text-sm">{c.resume_printable_description}</p>
                  </div>
                </div>
              </Card>
            </Label>
          </RadioGroup>

          <div className="text-center">
            <Button size="lg" onClick={handleDownload} disabled={!selectedCv}>
              <Download className="mr-2 h-4 w-4" />
              {c.resume_download_button}
            </Button>
          </div>
        </section>

        {/* Appel à l'action */}
        <section id="contact-cta" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">
                        Intéressé par mon profil ?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Travaillons ensemble pour concrétiser votre prochain projet. Je suis toujours ouvert à de nouvelles opportunités.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                        <Button size="lg" asChild className="group">
                            <Link href="/contact">
                            Me contacter
                            <Mail className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
        </section>
      </main>
    </>
  );
}

    