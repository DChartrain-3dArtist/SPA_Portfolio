import { NextResponse } from 'next/server';
import { z } from 'zod';

const chatbotRequestSchema = z.object({
  message: z.string().min(1),
  language: z.enum(['fr', 'en']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatbotRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid chatbot payload.',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { chat } = await import('@/ai/chatbot-flow');
    const response = await chat(parsed.data);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[CHATBOT_API] Error while processing chatbot request:', error);

    return NextResponse.json(
      {
        text: 'Le service est temporairement indisponible.',
      },
      { status: 500 }
    );
  }
}
