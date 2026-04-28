
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Send } from 'lucide-react';
import { useMemo } from 'react';

/**
 * Composant du formulaire de contact.
 * Gère la saisie utilisateur, la validation et la soumission du formulaire via une API route.
 * @returns Un composant React de formulaire de contact.
 */
export function ContactForm() {
  const { language } = useLanguage();
  const c = content[language].contact;
  const v = content[language].validation;
  const { toast } = useToast();

  // Schéma de validation Zod, mémorisé pour les performances.
  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, { message: v.name_min }),
    email: z.string().email({ message: v.email_invalid }),
    company: z.string().optional(),
    phone: z.string().optional(),
    message: z.string().min(10, { message: v.message_min }),
  }), [v]);

  // Initialisation de react-hook-form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  /**
   * Fonction de soumission du formulaire.
   * Envoie les données à l'API route /api/contact.
   * @param values - Les valeurs validées du formulaire.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: c.form_success_title,
          description: c.form_success,
        });
        form.reset();
      } else {
        // Gère les erreurs de validation ou autres erreurs serveur.
        toast({
          variant: "destructive",
          title: c.form_error_title,
          description: result.message || c.form_error,
        });
      }
    } catch {
      // Gère les erreurs réseau.
      toast({
        variant: "destructive",
        title: c.form_error_title,
        description: 'Impossible de contacter le serveur. Veuillez réessayer.',
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-lg">
          <Mail className="h-5 w-5"/>
          {c.form_title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col flex-grow">
            {/* Grille pour les champs Nom et Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form_name}</FormLabel>
                    <FormControl>
                      <Input placeholder={c.form_name_placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form_email}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={c.form_email_placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Grille pour les champs Entreprise et Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form_company}</FormLabel>
                    <FormControl>
                      <Input placeholder={c.form_company_placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form_phone}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={c.form_phone_placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Champ pour le message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-grow">
                  <FormLabel>{c.form_message}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={c.form_message_placeholder} {...field} className="flex-grow min-h-[150px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bouton de soumission */}
            <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting ? c.form_sending : c.form_submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
