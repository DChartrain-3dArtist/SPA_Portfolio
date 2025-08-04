'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Définition du schéma de validation pour les données du formulaire de contact en utilisant Zod.
// Cela garantit que les données reçues sont conformes au format attendu avant tout traitement.
const contactSchema = z.object({
  name: z.string().min(2), // Le nom doit comporter au moins 2 caractères.
  email: z.string().email(), // L'email doit être une adresse valide.
  company: z.string().optional(), // L'entreprise est facultative.
  phone: z.string().optional(), // Le téléphone est facultatif.
  message: z.string().min(10), // Le message doit comporter au moins 10 caractères.
});

/**
 * Action serveur pour soumettre le formulaire de contact.
 * Cette fonction est exécutée sur le serveur pour des raisons de sécurité (clé API).
 * @param data - Les données brutes du formulaire.
 * @returns Un objet indiquant le succès ou l'échec de l'opération, avec les erreurs éventuelles.
 */
export async function submitContactForm(data: unknown) {
  // Tente de valider les données reçues avec le schéma défini.
  const validatedFields = contactSchema.safeParse(data);

  // Si la validation échoue, retourne une erreur détaillée.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erreur : Veuillez vérifier les champs du formulaire.',
    };
  }
  
  // Extrait les données validées pour une utilisation plus facile.
  const { name, email, company, phone, message } = validatedFields.data;

  // Si la variable d'environnement pour la clé API Resend n'est pas configurée,
  // on simule un succès sans envoyer d'email.
  // Cela permet au formulaire de fonctionner en développement local ou si Resend n'est pas configuré.
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. Simulating form submission.');
    console.log('Form data:', validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule une attente réseau.
    return { success: true, message: 'Simulation réussie. Aucun email envoyé.' };
  }
  
  // Initialise le client Resend avec la clé API.
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Envoie l'email en utilisant l'API de Resend.
    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // L'expéditeur doit être un domaine vérifié sur Resend.
      to: ['donovan.chartrain@gmail.com'], // L'email de destination.
      subject: `Nouveau message de ${name} via votre portfolio`,
      // Le corps de l'email en HTML pour un meilleur formatage.
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

    // Si Resend retourne une erreur, la journalise et retourne un échec.
    if (error) {
      console.error('Resend API error:', error);
      return { success: false, message: 'Failed to send email through Resend.' };
    }

    // Si l'envoi réussit, retourne un succès.
    return { success: true };
  } catch (error) {
    // Gère les erreurs inattendues (ex: problème réseau).
    console.error('Error submitting form:', error);
    return { success: false, message: 'An unexpected error occurred on the server.' };
  }
}
