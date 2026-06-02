import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères.'),
  email: z.string().email("L'email doit être une adresse valide."),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, 'Le message doit comporter au moins 10 caractères.')
    .max(2000, 'Le message doit comporter au maximum 2000 caractères.'),
  legalConsent: z.boolean().refine((value) => value),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides.',
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validatedData.data;
    const payload = {
      _id: '',
      name,
      email,
      phone: phone ?? '',
      content: message,
      read: false,
      dateSent: new Date().toISOString(),
      dateRead: '',
    };

    const response = await fetch('https://donovan-dev-web.vercel.app/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    let result: unknown = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            typeof result === 'object' &&
            result !== null &&
            'message' in result &&
            typeof result.message === 'string'
              ? result.message
              : 'Le service de messagerie distant a renvoyé une erreur.',
          details: result,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès !',
      data: result,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message distant :', error);
    return NextResponse.json({ success: false, message: 'Une erreur est survenue.' }, { status: 500 });
  }
}
