
'use server';

/**
 * @fileOverview Ce fichier définit le flux Genkit pour le chatbot IA du portfolio.
 * Il gère la logique de conversation, l'accès aux informations du site et
 * la génération de réponses structurées incluant des actions de navigation.
 *
 * - chat - La fonction principale pour interagir avec le chatbot.
 * - ChatbotInput - Le type d'entrée pour la fonction de chat.
 * - ChatbotOutput - Le type de retour de la fonction de chat.
 */

import { z } from 'zod';
import { getProjects, getVisualizerItems } from '@/data/projects';
import { content } from '@/lib/content';

// Schéma d'entrée pour la fonction publique `chat`
const ChatbotInputSchema = z.object({
  message: z.string(),
  language: z.enum(['fr', 'en']),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Schéma de sortie pour la fonction publique `chat`.
// L'IA doit maintenant remplir cet objet structuré.
const ChatbotOutputSchema = z.object({
  text: z.string().describe("La réponse textuelle de l'IA."),
  action: z
    .object({
      type: z.enum(['navigate']).describe("Le type d'action à effectuer."),
      path: z.string().describe("Le chemin de destination. Ex: '/contact', '/portfolio/project-id'."),
    })
    .optional()
    .describe("Une action de navigation suggérée si elle est pertinente. Reste vide si aucune navigation n'est évidente."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'models/gemini-2.5-flash';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';

const chatbotResponseSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: "La reponse textuelle de l'assistant.",
    },
    action: {
      type: 'object',
      description: "Action de navigation si une page specifique est pertinente.",
      properties: {
        type: {
          type: 'string',
          enum: ['navigate'],
          description: "Le type d'action a effectuer.",
        },
        path: {
          type: 'string',
          description: "Le chemin de destination. Ex: /contact ou /portfolio/id-du-projet.",
        },
      },
      required: ['type', 'path'],
      additionalProperties: false,
    },
  },
  required: ['text'],
  additionalProperties: false,
} as const;

function getSystemInstruction(language: ChatbotInput['language'], contextualInfo: string) {
  return `Tu es AURIA, une assistante IA experte pour le portfolio de Chartrain Donovan. Ton role est d'aider les visiteurs (recruteurs, clients) a decouvrir son profil, ses competences et ses projets.
Reponds TOUJOURS dans la langue specifiee (language: ${language}), de maniere concise et professionnelle.

Tu DOIS repondre en format JSON strict correspondant au schema fourni.

REGLES IMPERATIVES POUR LE JSON DE SORTIE :
1. Remplis TOUJOURS le champ "text" avec une reponse utile.
2. Si la question de l'utilisateur concerne une page specifique (contact, portfolio, un projet, un modele 3D), remplis l'objet "action".
   - Pour le type d'action, utilise "navigate".
   - Pour le chemin (path), utilise l'URL correspondante. Exemples : '/contact', '/portfolio', '/portfolio/id-du-projet', '/visualizer/item/id-du-modele'.
3. Si la question est generale et ne correspond a aucune page, ne remplis PAS le champ "action".
4. N'invente jamais de projet, de modele 3D, de disponibilite ou de coordonnee.

CONTEXTE COMPLET DU PORTFOLIO :
${contextualInfo}`;
}

function getFallbackResponse(language: ChatbotInput['language'], overloaded = false): ChatbotOutput {
  if (overloaded) {
    return {
      text:
        language === 'fr'
          ? "Le service IA de Google est tres sollicite en ce moment et mes circuits sont un peu surchargés. Je ne peux donc pas vous repondre. En attendant que la situation se normalise, n'hesitez pas a explorer le portfolio manuellement."
          : "The Google AI service is currently under heavy load, and my circuits are a bit overwhelmed, so I can't reply right now. While things settle down, please feel free to explore the portfolio directly.",
      action: { type: 'navigate', path: '/portfolio' },
    };
  }

  return {
    text:
      language === 'fr'
        ? "Oups, il semble que le service IA de Google rencontre quelques difficultes. Je ne suis pas en mesure de traiter votre demande pour le moment. Pendant que le service se retablit, je vous suggere d'explorer les projets directement."
        : "Oops, it seems the Google AI service is experiencing some difficulties. I am unable to process your request at the moment. While the service recovers, I suggest you explore the projects directly.",
    action: { type: 'navigate', path: '/portfolio' },
  };
}

function extractGeminiText(payload: unknown): string {
  const result = z
    .object({
      candidates: z
        .array(
          z.object({
            content: z.object({
              parts: z.array(
                z.object({
                  text: z.string().optional(),
                })
              ),
            }),
          })
        )
        .min(1),
    })
    .safeParse(payload);

  if (!result.success) {
    throw new Error('Gemini response payload is invalid.');
  }

  const text = result.data.candidates[0]?.content.parts
    .map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    throw new Error('Gemini response text is empty.');
  }

  return text;
}

async function generateChatbotResponse(input: ChatbotInput, contextualInfo: string): Promise<ChatbotOutput> {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error('[CHATBOT_BACKEND] Erreur: cle API Gemini non configuree.');
    return getFallbackResponse(input.language);
  }

  const response = await fetch(
    `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: getSystemInstruction(input.language, contextualInfo) }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: input.message }],
          },
        ],
        generationConfig: {
          responseFormat: {
            text: {
              mimeType: 'application/json',
              schema: chatbotResponseSchema,
            },
          },
        },
      }),
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const payload = (await response.json()) as unknown;
  const text = extractGeminiText(payload);
  const parsedOutput = ChatbotOutputSchema.safeParse(JSON.parse(text));

  if (!parsedOutput.success) {
    throw new Error('Gemini structured output does not match the chatbot schema.');
  }

  return parsedOutput.data;
}

/**
 * Fonction publique exportée que le client appellera.
 * Elle sert de wrapper simple pour le flow Genkit.
 * @param input L'objet d'entrée contenant le message et la langue.
 * @returns Une promesse qui se résout avec la sortie du chatbot.
 */
export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  const validatedInput = ChatbotInputSchema.parse(input);
  const { language } = validatedInput;
  const projects = await getProjects();
  const visualizerItems = await getVisualizerItems();
  const siteContent = content[language];
  const skills = {
    fr: {
      'Logiciels 3D & Moteurs': [
        'Blender',
        'Maya',
        '3DS Max',
        'Cinema 4D',
        'ZBrush',
        'Substance P.',
        'NomadSculpt',
        'Unreal Engine',
        'Unity',
        'Unigine',
        'CryEngine',
        'Photoshop',
        'Illustrator',
        'InDesign',
        'After Effects',
        'Premiere Pro',
        'DaVinci',
        'Natron',
      ],
      'Langages de Programmation': [
        'C#',
        'C++',
        'Blueprint',
        'HLSL',
        'Python',
        'HTML',
        'CSS',
        'SCSS',
        'JavaScript',
        'TypeScript',
        'PHP',
        'SQL',
      ],
      'Web & Design': [
        'WordPress',
        'Elementor',
        'Divi',
        'Google Ads',
        'Analytics',
        'Screaming Frog',
        'Figma',
        'Adobe XD',
      ],
    },
    en: {
      '3D Software & Engines': [
        'Blender',
        'Maya',
        '3DS Max',
        'Cinema 4D',
        'ZBrush',
        'Substance P.',
        'NomadSculpt',
        'Unreal Engine',
        'Unity',
        'Unigine',
        'CryEngine',
        'Photoshop',
        'Illustrator',
        'InDesign',
        'After Effects',
        'Premiere Pro',
        'DaVinci',
        'Natron',
      ],
      'Programming Languages': [
        'C#',
        'C++',
        'Blueprint',
        'HLSL',
        'Python',
        'HTML',
        'CSS',
        'SCSS',
        'JavaScript',
        'TypeScript',
        'PHP',
        'SQL',
      ],
      'Web & Design': [
        'WordPress',
        'Elementor',
        'Divi',
        'Google Ads',
        'Analytics',
        'Screaming Frog',
        'Figma',
        'Adobe XD',
      ],
    },
  };

  const contextualInfo = `
    Profil de Donovan Chartrain: ${siteContent.about.profile_content}
    Parcours de Donovan Chartrain: ${siteContent.about.journey_content}
    Informations de contact: Email: ${siteContent.contact.email}, Téléphone: ${siteContent.contact.phone}. La page de contact se trouve à l'URL /contact.
    Compétences: ${JSON.stringify(skills[language])}. La page des compétences est /about.
    Liste des Projets: ${projects.map((project) => `- ID: ${project.id}, Titre: ${project.title[language]}, Description: ${project.description[language]}, Technologies: ${project.technologies.join(', ')}`).join('\n')}
    Liste des Modèles 3D: ${visualizerItems.map((item) => `- ID: ${item.id}, Nom: ${item.name[language]}, Description: ${item.description[language]}`).join('\n')}
    --- INFORMATIONS EXCLUSIVES POUR L'ASSISTANT ---
    - Disponibilité: Donovan est disponible immédiatement pour un poste en CDI dans le Vaucluse et le Gard. Il ne recherche pas de missions en freelance.
    - Méthode de travail: Il privilégie une approche agile avec des sprints et des points de suivi réguliers.
    --- FIN DES INFORMATIONS EXCLUSIVES ---
  `;

  try {
    return await generateChatbotResponse(validatedInput, contextualInfo.trim());
  } catch (error: unknown) {
    console.error('[CHATBOT_BACKEND] Erreur dans le flow:', error);
    const message = error instanceof Error ? error.message : '';
    const overloaded =
      message.includes('503') ||
      message.includes('429') ||
      message.includes('overloaded') ||
      message.includes('RESOURCE_EXHAUSTED');

    return getFallbackResponse(language, overloaded);
  }
}
