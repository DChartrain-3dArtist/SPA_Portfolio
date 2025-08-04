
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content } from '@/lib/content';
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Découvrez comment vos données personnelles et les cookies sont utilisés et protégés sur le site de Chartrain Donovan.',
};


export default function PrivacyPolicyPage() {
  // Pour la simplicité, nous utiliserons le contenu en français car c'est une page légale destinée principalement aux utilisateurs français.
  const c = content['fr'].privacy_policy;

  return (
      <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">{c.title}</h1>
          
          <Section title={c.introduction_title}>
            <p>{c.introduction_content}</p>
          </Section>

          <Section title={c.collection_title}>
            <p>{c.collection_content}</p>
            
            <h3 className="text-xl font-bold font-headline mt-6 mb-2">{c.user_data_title}</h3>
            <p>{c.user_data_content}</p>
            <ul>
              {c.user_data_list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <h3 className="text-xl font-bold font-headline mt-6 mb-2">{c.third_party_data_title}</h3>
             <p>{c.third_party_data_content}</p>
            <ul>
                <li>
                    <p dangerouslySetInnerHTML={{ __html: c.third_party_hosting }} />
                </li>
                <li>
                    <p dangerouslySetInnerHTML={{ __html: c.third_party_youtube }} />
                </li>
            </ul>
             <p>{c.third_party_responsibility}</p>
          </Section>

          <Section title={c.usage_title}>
            <p>{c.usage_content}</p>
            <ul>
              {c.usage_list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <p>{c.usage_share}</p>
          </Section>
          
          <Section title={c.retention_title}>
            <p>{c.retention_content}</p>
          </Section>

          <Section title={c.cookie_policy_title}>
            <h3 className="text-xl font-bold font-headline mb-2">{c.cookie_what_are_cookies_title}</h3>
            <p>{c.cookie_what_are_cookies_content}</p>
            <h3 className="text-xl font-bold font-headline mt-6 mb-2">{c.cookie_how_we_use_cookies_title}</h3>
            <p>{c.cookie_how_we_use_cookies_content}</p>
            <ul>
                {c.cookie_usage_list.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
            </ul>
            <h3 className="text-xl font-bold font-headline mt-6 mb-2">{c.cookie_your_choices_title}</h3>
            <p>{c.cookie_your_choices_content}</p>
            <p>{c.cookie_manage_preferences}</p>
          </Section>

          <Section title={c.rights_title}>
            <p>{c.rights_content}</p>
            <ul>
              {c.rights_list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <p>{c.rights_exercise}</p>
          </Section>

           <Section title={c.security_title}>
            <p>{c.security_content}</p>
          </Section>

          <Section title={c.modifications_title}>
             <p>{c.modifications_content}</p>
          </Section>

        </div>
      </main>
  );
}
