

'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Github, Home } from 'lucide-react';
import { Header } from '../layout/header';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Link from 'next/link';

/**
 * Composant de titre de page réutilisable.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu du titre.
 * @returns Un composant de titre H1 stylisé.
 */
function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">{children}</h1>;
}

/**
 * Composant principal de la page de contact.
 * Affiche le formulaire de contact, les informations de contact et les liens sociaux.
 * @returns Un composant React pour la page de contact.
 */
export default function ContactPage() {
  const { language } = useLanguage();
  const c = content[language].contact;

  // Carte affichant le statut de disponibilité.
  const availabilityCard = (
    <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center gap-4">
           {/* Conteneur pour le point animé, avec une largeur fixe pour l'alignement */}
           <div className="flex h-5 w-5 items-center justify-center shrink-0">
             {/* Indicateur visuel de disponibilité (point vert animé) */}
             <div className="relative flex items-center justify-center">
               <span className="absolute h-3 w-3 rounded-full bg-green-500"></span>
               <span className="animate-ping absolute h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
             </div>
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
                <PageTitle>{c.title}</PageTitle>
                <p className="text-foreground/90 mb-12">{c.subtitle}</p>
            </div>
            
            {/* La carte de disponibilité est affichée en haut sur mobile pour une visibilité immédiate. */}
            <div className="mb-8 lg:hidden">
              {availabilityCard}
            </div>

            {/* Grille principale contenant le formulaire et les informations de contact. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <ContactForm />
                </div>
                <div className="space-y-8">
                    {/* La carte de disponibilité est cachée sur mobile ici pour éviter la duplication. */}
                    <div className="hidden lg:block">
                      {availabilityCard}
                    </div>
                    {/* Carte avec les informations de contact directes. */}
                    <Card>
                        <CardHeader><CardTitle className="text-lg font-headline">{c.info_title}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_email_label}</p>
                                    <a href={`mailto:${c.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_phone_label}</p>
                                    <a href={`tel:${c.phone_link}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.phone}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="font-semibold font-headline">{c.info_location_label}</p>
                                    <p className="text-sm text-muted-foreground">{c.location_text}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
          
        </section>
      </main>
    </>
  );
}
