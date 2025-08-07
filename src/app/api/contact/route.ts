// Ce fichier définit une API Route Next.js pour gérer la soumission du formulaire de contact.
// Il utilise Nodemailer pour envoyer un e-mail via un serveur SMTP.

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Schéma de validation Zod pour les données du formulaire.
// Garantit que les données reçues sont dans le bon format.
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères.'),
  email: z.string().email("L'email doit être une adresse valide."),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Le message doit comporter au moins 10 caractères.'),
});

/**
 * Gère les requêtes POST envoyées à /api/contact.
 * @param {Request} request - L'objet de la requête entrante.
 * @returns Une réponse JSON indiquant le succès ou l'échec.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Valide le corps de la requête avec le schéma Zod.
    const validatedData = contactSchema.safeParse(body);

    // Si la validation échoue, retourne une erreur 400 avec les détails.
    if (!validatedData.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Données invalides.', 
        errors: validatedData.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { name, email, company, phone, message } = validatedData.data;

    // Récupère les variables d'environnement pour la configuration SMTP.
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

    // Vérifie que toutes les variables d'environnement nécessaires sont définies.
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      console.error('Les variables d\'environnement SMTP ne sont pas toutes configurées.');
      return NextResponse.json({ success: false, message: 'Erreur de configuration du serveur.' }, { status: 500 });
    }

    // Crée un "transporteur" Nodemailer avec la configuration SMTP.
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // `true` pour le port 465, `false` pour les autres.
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Options de l'e-mail à envoyer.
    const mailOptions = {
      from: `Portfolio <${SMTP_USER}>`, // L'expéditeur doit souvent être l'adresse de l'utilisateur SMTP.
      to: CONTACT_EMAIL, // L'adresse e-mail de destination.
      replyTo: email, // Permet de répondre directement à l'expéditeur depuis le client mail.
      subject: `Nouveau message de ${name} via votre portfolio`,
      // Le corps de l'e-mail en HTML.
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Nouveau message depuis votre portfolio</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
          <hr>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // Envoie l'e-mail.
    await transporter.sendMail(mailOptions);

    // Retourne une réponse de succès.
    return NextResponse.json({ success: true, message: 'Message envoyé avec succès !' });

  } catch (error) {
    // Gère les erreurs inattendues.
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    return NextResponse.json({ success: false, message: 'Une erreur est survenue.' }, { status: 500 });
  }
}
