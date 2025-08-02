
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Github } from 'lucide-react';
import { Header } from '../layout/header';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">{children}</h2>;
}

export default function ContactPage() {
  const { language } = useLanguage();
  const c = content[language].contact;

  const availabilityCard = (
    <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center gap-4">
           <div className="relative flex items-center justify-center">
             <span className="absolute h-3 w-3 rounded-full bg-green-500"></span>
             <span className="animate-ping absolute h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
           </div>
           <div>
                <p className="font-semibold font-headline">{c.availability_title}</p>
                <p className="text-sm text-muted-foreground">{c.availability_text}</p>
           </div>
        </CardContent>
    </Card>
  );

  return (
    <>
      <Header />
      <main>
        <section id="contact" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          
            <div className="text-center">
                <SectionTitle>{c.title}</SectionTitle>
                <p className="text-foreground/90 mb-12">{c.subtitle}</p>
            </div>
            
            <div className="mb-8 lg:hidden">
              {availabilityCard}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <ContactForm />
                </div>
                <div className="space-y-8">
                    <div className="hidden lg:block">
                      {availabilityCard}
                    </div>
                    <Card>
                        <CardHeader><CardTitle className="text-lg font-headline">{c.info_title}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_email_label}</p>
                                    <a href="mailto:donovan.chartrain@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">donovan.chartrain@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_phone_label}</p>
                                    <a href="tel:+33643883960" className="text-sm text-muted-foreground hover:text-primary transition-colors">+33 6 43 88 39 60</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_location_label}</p>
                                    <p className="text-sm text-muted-foreground">Bédoin (84), France - Mobile sur Vaucluse/Gard</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-lg font-headline">{c.social_title}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">{c.social_subtitle}</p>
                </CardHeader>
                <CardContent className="flex justify-center gap-4">
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
                </CardContent>
            </Card>
          
        </section>
      </main>
    </>
  );
}
