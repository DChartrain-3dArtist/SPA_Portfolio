import { content } from '@/lib/content';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Header } from '../layout/header';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { LocalizedHtml, LocalizedText } from '@/components/i18n/localized';

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">{children}</h1>;
}

function AvailabilityCard() {
  const fr = content.fr.contact;
  const en = content.en.contact;

  return (
    <Card className="bg-card/50">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex h-5 w-5 items-center justify-center shrink-0">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full bg-green-500"></span>
            <span className="animate-ping absolute h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
          </div>
        </div>
        <div>
          <LocalizedText as="p" className="font-semibold font-headline" fr={fr.availability_title} en={en.availability_title} />
          <LocalizedText as="p" className="text-sm text-muted-foreground" fr={fr.availability_text} en={en.availability_text} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  const fr = content.fr.contact;
  const en = content.en.contact;

  return (
    <>
      <Header />
      <main>
        <section id="contact" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <PageTitle>
              <LocalizedText fr={fr.title} en={en.title} />
            </PageTitle>
            <LocalizedHtml as="p" className="text-foreground/90 mb-12" fr={fr.subtitle} en={en.subtitle} />
          </div>

          <div className="mb-8 lg:hidden">
            <AvailabilityCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div className="hidden lg:block">
                <AvailabilityCard />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-headline">
                    <LocalizedText fr={fr.info_title} en={en.info_title} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <LocalizedText as="p" className="font-semibold font-headline" fr={fr.info_email_label} en={en.info_email_label} />
                      <a href={`mailto:${fr.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {fr.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <LocalizedText as="p" className="font-semibold font-headline" fr={fr.info_phone_label} en={en.info_phone_label} />
                      <a href={`tel:${fr.phone_link}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        <LocalizedText fr={fr.phone} en={en.phone} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <LocalizedText as="p" className="font-semibold font-headline" fr={fr.info_location_label} en={en.info_location_label} />
                      <LocalizedText as="p" className="text-sm text-muted-foreground" fr={fr.location_text} en={en.location_text} />
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
