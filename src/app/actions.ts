'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function submitContactForm(data: unknown) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }
  
  const { name, email, company, phone, message } = validatedFields.data;

  // Si la variable d'environnement pour la clé API Resend n'est pas configurée,
  // on simule un succès sans envoyer d'email.
  // Cela permet au formulaire de fonctionner en développement local ou si Resend n'est pas configuré.
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. Simulating form submission.');
    console.log('Form data:', validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Simulation successful. No email sent.' };
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Doit être un domaine vérifié sur Resend
      to: ['donovan.chartrain@gmail.com'], // Mettez votre email de destination ici
      subject: `Nouveau message de ${name} via votre portfolio`,
      html: `
        <p>Vous avez reçu un nouveau message depuis le formulaire de contact de votre portfolio.</p>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, message: 'Failed to send email through Resend.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, message: 'An unexpected error occurred on the server.' };
  }
}
