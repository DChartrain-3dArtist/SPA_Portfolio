
'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
                {children}
            </CardContent>
        </Card>
    )
}

export default function LegalNoticePage() {
    const { language } = useLanguage();
    const c = content[language].legal_notice;
  return (
    <>
        <Header />
        <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{c.title}</h1>

                <Section title={c.editor_title}>
                    <p>
                        <strong>{c.editor_name} :</strong> Chartrain Donovan<br />
                        <strong>{c.editor_address} :</strong> 84410, Bédoin, France<br />
                        <strong>{c.editor_email} :</strong> <a href="mailto:donovan.chartrain@gmail.com" className="text-primary hover:underline">donovan.chartrain@gmail.com</a><br />
                        <strong>{c.editor_phone} :</strong> +33 6 43 88 39 60<br />
                    </p>
                </Section>
                
                <Section title={c.hosting_title}>
                     <p dangerouslySetInnerHTML={{ __html: c.hosting_content }} />
                </Section>

                <Section title={c.ip_title}>
                     <p>{c.ip_content1}</p>
                    <p>{c.ip_content2}</p>
                </Section>
                
                <Section title={c.data_title}>
                    <p>{c.data_content}</p>
                </Section>
            </div>
        </main>
    </>
  );
}
