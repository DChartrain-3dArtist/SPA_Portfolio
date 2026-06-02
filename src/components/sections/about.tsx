import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download, Mail, Component, FileCode } from 'lucide-react';
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
  SiDotnet,
} from '@icons-pack/react-simple-icons';
import { cn } from '@/lib/utils';
import { LocalizedHtml, LocalizedText } from '@/components/i18n/localized';
import { AboutTimeline } from './about-timeline';
import { CvDownloadSelector } from './cv-download-selector';

type SkillItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type TimelineItem = {
  date: string;
  period: string;
  type: 'experience' | 'formation';
  role: string;
  company: string;
  description: string;
};

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{children}</h1>;
}

const skills: Record<string, SkillItem[]> = {
  'Logiciels 3D & Moteurs': [
    { name: 'Blender', icon: SiBlender, color: 'text-orange-500' },
    { name: 'Maya', icon: SiAutodesk, color: 'text-sky-500' },
    { name: '3DS Max', icon: SiAutodesk, color: 'text-sky-400' },
    { name: 'Cinema 4D', icon: SiCinema4d, color: 'text-blue-500' },
    { name: 'ZBrush', icon: Component, color: 'text-red-600' },
    { name: 'Substance P.', icon: SiAdobe, color: 'text-red-500' },
    { name: 'NomadSculpt', icon: Component, color: 'text-green-400' },
    { name: 'Unreal Engine', icon: SiUnrealengine, color: 'text-neutral-300' },
    { name: 'Unity', icon: SiUnity, color: 'text-neutral-300' },
    { name: 'Unigine', icon: Component, color: 'text-blue-400' },
    { name: 'CryEngine', icon: Component, color: 'text-neutral-400' },
    { name: 'Photoshop', icon: SiAdobephotoshop, color: 'text-sky-400' },
    { name: 'Illustrator', icon: SiAdobeillustrator, color: 'text-orange-400' },
    { name: 'InDesign', icon: SiAdobeindesign, color: 'text-pink-600' },
    { name: 'After Effects', icon: SiAdobeaftereffects, color: 'text-purple-500' },
    { name: 'Premiere Pro', icon: SiAdobepremierepro, color: 'text-purple-400' },
    { name: 'DaVinci', icon: SiBlackmagicdesign, color: 'text-red-500' },
    { name: 'Natron', icon: Component, color: 'text-blue-300' },
  ],
  'Langages de Programmation': [
    { name: 'C#', icon: FileCode, color: 'text-purple-400' },
    { name: 'C++', icon: SiCplusplus, color: 'text-sky-600' },
    { name: 'Blueprint', icon: Component, color: 'text-sky-400' },
    { name: 'HLSL', icon: FileCode, color: 'text-green-400' },
    { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
    { name: 'HTML', icon: SiHtml5, color: 'text-orange-600' },
    { name: 'CSS', icon: SiCss3, color: 'text-sky-500' },
    { name: 'SCSS', icon: SiSass, color: 'text-pink-400' },
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-300' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-sky-500' },
    { name: 'PHP', icon: SiPhp, color: 'text-indigo-400' },
    { name: 'SQL', icon: FileCode, color: 'text-teal-400' },
  ],
  'Web & Design': [
    { name: 'WordPress', icon: SiWordpress, color: 'text-sky-500' },
    { name: 'Elementor', icon: SiElementor, color: 'text-pink-500' },
    { name: 'Divi', icon: Component, color: 'text-purple-400' },
    { name: 'React', icon: SiReact, color: 'text-sky-400' },
    { name: 'Angular', icon: SiAngular, color: 'text-red-600' },
    { name: 'C# .NET', icon: SiDotnet, color: 'text-purple-500' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-sky-400' },
    { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-600' },
    { name: 'Figma', icon: SiFigma, color: 'text-pink-500' },
    { name: 'Adobe XD', icon: SiAdobexd, color: 'text-pink-400' },
    { name: 'Google Ads', icon: SiGoogleads, color: 'text-yellow-500' },
    { name: 'Analytics', icon: SiGoogleanalytics, color: 'text-orange-500' },
  ],
};

function SkillCard({
  icon: Icon,
  name,
  color,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <div className={cn('group relative flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 border border-border/50 hover:border-primary/50', className)}>
      <div className={cn('transition-colors group-hover:opacity-80', color)}>
        <Icon className="w-8 h-8" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{name}</span>
    </div>
  );
}

export default function AboutPage() {
  const fr = content.fr.about;
  const en = content.en.about;

  const [logicielsSkills, programmationSkills, webSkills] = Object.values(skills) as [SkillItem[], SkillItem[], SkillItem[]];

  return (
    <>
      <Header />
      <main>
        <section id="about" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <PageTitle>
            <LocalizedText fr={fr.title} en={en.title} />
          </PageTitle>
          <div className="mb-16 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  <LocalizedText fr={fr.profile_title} en={en.profile_title} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <Avatar className="w-32 h-32 text-lg shrink-0">
                    <AvatarImage src="/assets/data/PhotoProfil.webp" alt="Photo de profil" />
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <LocalizedHtml as="div" className="text-foreground/90 prose prose-invert" fr={fr.profile_content} en={en.profile_content} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  <LocalizedText fr={fr.journey_title} en={en.journey_title} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocalizedHtml as="div" className="text-foreground/90 prose prose-invert" fr={fr.journey_content} en={en.journey_content} />
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <a href="#download-cv">
                      <Download className="mr-2 h-4 w-4" />
                      <LocalizedText fr={fr.resume_cta} en={en.resume_cta} />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <LocalizedText as="h3" className="text-3xl font-bold font-headline text-center mb-12" fr={fr.skills_title} en={en.skills_title} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 h-full flex flex-col">
                <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-center">
                      <LocalizedText fr="Logiciels 3D & Moteurs" en="3D Software & Engines" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {logicielsSkills.map((skill) => (
                        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-8 h-full flex flex-col">
                <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      <LocalizedText fr="Langages de Programmation" en="Programming Languages" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                      {programmationSkills.map((skill) => (
                        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-grow transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      <LocalizedText fr="Web & Design" en="Web & Design" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {webSkills.map((skill) => (
                        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} color={skill.color} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  <LocalizedText fr={fr.experience_title} en={en.experience_title} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AboutTimeline frItems={fr.timeline as TimelineItem[]} enItems={en.timeline as TimelineItem[]} />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="download-cv" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="text-center">
            <LocalizedText as="h2" className="text-3xl font-bold font-headline mb-4" fr={fr.resume_section_title} en={en.resume_section_title} />
            <LocalizedText as="p" className="text-muted-foreground mb-8 max-w-2xl mx-auto" fr={fr.resume_section_subtitle} en={en.resume_section_subtitle} />
          </div>
          <CvDownloadSelector />
        </section>

        <section id="contact-cta" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="bg-card/80 border-border/50 rounded-lg p-8 md:p-12 animate-fade-in border text-center">
            <LocalizedText as="h2" className="font-headline text-3xl font-bold md:text-4xl" fr="Intéressé par mon profil ?" en="Interested in my profile?" />
            <LocalizedText
              as="p"
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              fr="Travaillons ensemble pour concrétiser votre prochain projet. Je suis toujours ouvert à de nouvelles opportunités."
              en="Let's work together to bring your next project to life. I am always open to new opportunities."
            />
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/contact">
                  <LocalizedText fr="Me contacter" en="Contact me" />
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
