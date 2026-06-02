import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Youtube,
  Monitor,
  Dices,
  Palette,
  ArrowRight,
  Cuboid,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { content } from '@/lib/content';
import { cn } from '@/lib/utils';
import { LocalizedHtml, LocalizedText } from '@/components/i18n/localized';
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
  { name: 'React', icon: SiReact, color: 'text-sky-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-neutral-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-sky-600' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'Three.js', icon: SiThreedotjs, color: 'text-neutral-400' },
  { name: 'Blender', icon: SiBlender, color: 'text-orange-500' },
  { name: 'Unity', icon: SiUnity, color: 'text-neutral-400' },
  { name: 'Unreal Engine', icon: SiUnrealengine, color: 'text-neutral-400' },
  { name: 'Figma', icon: SiFigma, color: 'text-pink-500' },
];

function StatCard({
  value,
  suffix,
  frLabel,
  enLabel,
}: {
  value: number;
  suffix?: string;
  frLabel: string;
  enLabel: string;
}) {
  return (
    <Card className="group relative overflow-hidden bg-card/80 border-border/50 text-center transition-all duration-300 ease-in-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 inline-block">
            {value}
            {suffix}
          </span>
          <LocalizedText as="span" className="block text-sm text-muted-foreground mt-2" fr={frLabel} en={enLabel} />
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceCard({
  icon,
  frTitle,
  enTitle,
  frDescription,
  enDescription,
}: {
  icon: React.ReactNode;
  frTitle: string;
  enTitle: string;
  frDescription: string;
  enDescription: string;
}) {
  return (
    <Card className="group relative overflow-hidden bg-card/80 border-border/50 text-center transition-all duration-300 ease-in-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <LocalizedText as="h3" className="mb-2 text-xl font-bold font-headline text-card-foreground" fr={frTitle} en={enTitle} />
        <LocalizedHtml as="p" className="text-sm text-muted-foreground" fr={frDescription} en={enDescription} />
      </CardContent>
    </Card>
  );
}

function PathwayCard({
  icon,
  frTitle,
  enTitle,
  frDescription,
  enDescription,
  href,
  frCta,
  enCta,
  external,
}: {
  icon: React.ReactNode;
  frTitle: string;
  enTitle: string;
  frDescription: string;
  enDescription: string;
  href: string;
  frCta: string;
  enCta: string;
  external?: boolean;
}) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <LocalizedText
          as="h3"
          className="mb-3 font-headline text-xl font-bold text-card-foreground"
          fr={frTitle}
          en={enTitle}
        />
        <LocalizedText
          as="p"
          className="mb-6 flex-grow text-sm text-muted-foreground"
          fr={frDescription}
          en={enDescription}
        />
        <Button asChild variant="outline" className="mt-auto w-full justify-between">
          <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            <LocalizedText fr={frCta} en={enCta} />
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const fr = content.fr.home;
  const en = content.en.home;

  return (
    <>
      <Header />
      <main>
        <section id="home" className="relative flex min-h-screen items-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left animate-fade-in-down">
                  <LocalizedHtml
                    as="h1"
                    className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
                    fr={fr.title}
                    en={en.title}
                  />
                  <LocalizedHtml as="p" className="mt-4 text-lg text-foreground/90" fr={fr.subtitle} en={en.subtitle} />
                  <LocalizedHtml as="p" className="mt-6 text-foreground/90 max-w-lg" fr={fr.intro_paragraph} en={en.intro_paragraph} />
                  <LocalizedText as="p" className="mt-4 max-w-xl text-sm text-muted-foreground" fr={fr.hero_supporting_text} en={en.hero_supporting_text} />
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button size="lg" asChild className="group">
                      <Link href="/visualizer">
                        <LocalizedText fr={fr.hero_cta} en={en.hero_cta} />
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="group">
                      <Link href="/portfolio">
                        <LocalizedText fr={fr.hero_secondary_cta} en={en.hero_secondary_cta} />
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
                </div>
                <div className="flex items-center justify-center md:[perspective:1000px] animate-fade-in-up">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in-up">
              <StatCard value={50} suffix="+" frLabel={fr.stats.projects} enLabel={en.stats.projects} />
              <StatCard value={5} suffix="+" frLabel={fr.stats.experience} enLabel={en.stats.experience} />
              <StatCard value={3} frLabel={fr.stats.expertise} enLabel={en.stats.expertise} />
              <StatCard value={30} suffix="+" frLabel={fr.stats.technologies} enLabel={en.stats.technologies} />
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10">
            <LocalizedText
              as="h2"
              className="mb-4 text-center font-headline text-4xl font-bold md:text-5xl"
              fr={fr.pathways.title}
              en={en.pathways.title}
            />
            <LocalizedText
              as="p"
              className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground"
              fr={fr.pathways.subtitle}
              en={en.pathways.subtitle}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <PathwayCard
                icon={<Cuboid size={44} />}
                frTitle={fr.pathways.visualizer_title}
                enTitle={en.pathways.visualizer_title}
                frDescription={fr.pathways.visualizer_description}
                enDescription={en.pathways.visualizer_description}
                href="/visualizer"
                frCta={fr.pathways.visualizer_cta}
                enCta={en.pathways.visualizer_cta}
              />
              <PathwayCard
                icon={<Monitor size={44} />}
                frTitle={fr.pathways.web_title}
                enTitle={en.pathways.web_title}
                frDescription={fr.pathways.web_description}
                enDescription={en.pathways.web_description}
                href="https://donovan-dev-web.vercel.app"
                frCta={fr.pathways.web_cta}
                enCta={en.pathways.web_cta}
                external
              />
              <PathwayCard
                icon={<User size={44} />}
                frTitle={fr.pathways.profile_title}
                enTitle={en.pathways.profile_title}
                frDescription={fr.pathways.profile_description}
                enDescription={en.pathways.profile_description}
                href="/about"
                frCta={fr.pathways.profile_cta}
                enCta={en.pathways.profile_cta}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10">
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-foreground localized-fr">
                {fr.presentation.part1} <span className="font-medium text-primary">{fr.presentation.highlight1}</span>,{' '}
                <span className="font-medium text-primary">{fr.presentation.highlight2}</span> {fr.presentation.part2}{' '}
                <span className="font-medium text-primary">{fr.presentation.highlight3}</span> {fr.presentation.part3}
              </h2>
              <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-foreground localized-en">
                {en.presentation.part1} <span className="font-medium text-primary">{en.presentation.highlight1}</span>,{' '}
                <span className="font-medium text-primary">{en.presentation.highlight2}</span> {en.presentation.part2}{' '}
                <span className="font-medium text-primary">{en.presentation.highlight3}</span> {en.presentation.part3}
              </h2>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-16 md:py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10">
            <LocalizedText
              as="h2"
              className="font-headline text-4xl font-bold md:text-5xl text-center mb-12 animate-fade-in-down"
              fr={fr.services.title}
              en={en.services.title}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 animate-fade-in-up">
              <ServiceCard
                icon={<Palette size={48} className="mx-auto" />}
                frTitle={fr.services.item1.title}
                enTitle={en.services.item1.title}
                frDescription={fr.services.item1.description}
                enDescription={en.services.item1.description}
              />
              <ServiceCard
                icon={<Dices size={48} className="mx-auto" />}
                frTitle={fr.services.item2.title}
                enTitle={en.services.item2.title}
                frDescription={fr.services.item2.description}
                enDescription={en.services.item2.description}
              />
              <ServiceCard
                icon={<Monitor size={48} className="mx-auto" />}
                frTitle={fr.services.item3.title}
                enTitle={en.services.item3.title}
                frDescription={fr.services.item3.description}
                enDescription={en.services.item3.description}
              />
            </div>
          </div>
        </section>

        <section id="showreel" className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10 animate-fade-in-up">
            <div className="bg-primary/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-primary/20">
              <LocalizedText as="h2" className="font-headline text-4xl font-bold text-foreground md:text-6xl mb-4" fr={fr.showreel.title} en={en.showreel.title} />
              <LocalizedText as="p" className="mt-4 text-lg text-muted-foreground mb-8" fr={fr.showreel.subtitle} en={en.showreel.subtitle} />
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
                  <LocalizedText fr={fr.showreel.cta} en={en.showreel.cta} />
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-16 md:py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center relative z-10">
            <LocalizedText as="h2" className="text-center font-headline text-4xl font-bold md:text-5xl mb-12 animate-fade-in-down" fr={fr.skills.title} en={en.skills.title} />
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4 animate-fade-in-up">
              {tools.map((tool) => (
                <div key={tool.name} className="group flex flex-col items-center gap-2 p-4">
                  <tool.icon className={cn('h-12 w-12 transition-all duration-300 group-hover:scale-110', tool.color)} />
                  <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary">{tool.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 animate-fade-in-up">
              <Button variant="outline" asChild className="group">
                <Link href="/about">
                  <LocalizedText fr={fr.skills.cta} en={en.skills.cta} />
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact-cta" className="w-full py-24 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full relative z-10 animate-fade-in-up">
            <div className="bg-primary/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-primary/20">
              <LocalizedText as="h2" className="font-headline text-3xl font-bold md:text-5xl" fr={fr.cta.title} en={en.cta.title} />
              <LocalizedText as="p" className="mt-4 text-lg text-muted-foreground" fr={fr.cta.subtitle} en={en.cta.subtitle} />
              <Button size="lg" asChild className="group mt-8">
                <Link href="/contact">
                  <LocalizedText fr={fr.cta.button} en={en.cta.button} />
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
