
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

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getProjects, getVisualizerItems} from '@/data/projects';
import {content} from '@/lib/content';
import {Language} from '@/contexts/language-context';

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


// Schéma d'entrée complet pour le prompt interne.
const ChatbotPromptInputSchema = z.object({
  message: z.string(),
  contextualInfo: z.string(),
  language: z.enum(['fr', 'en']),
});

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ChatbotPromptInputSchema},
  // La sortie attendue est maintenant un objet JSON structuré.
  output: {schema: ChatbotOutputSchema},
  prompt: `Tu es AURIA, une assistante IA experte pour le portfolio de Chartrain Donovan. Ton rôle est d'aider les visiteurs (recruteurs, clients) à découvrir son profil, ses compétences et ses projets.
Réponds TOUJOURS dans la langue spécifiée (language: {{{language}}}), de manière concise et professionnelle.

Tu DOIS répondre en format JSON en respectant le schéma de sortie.

RÈGLES IMPÉRATIVES POUR LE JSON DE SORTIE :
1.  Remplis TOUJOURS le champ "text" avec une réponse utile.
2.  Si la question de l'utilisateur concerne une page spécifique (contact, portfolio, un projet, un modèle 3D), tu DOIS remplir l'objet "action".
    - Pour le type d'action, utilise "navigate".
    - Pour le chemin (path), utilise l'URL correspondante. Exemples : '/contact', '/portfolio', '/portfolio/id-du-projet', '/visualizer/item/id-du-modele'.
3.  Si la question est générale et ne correspond à aucune page, ne remplis PAS le champ "action".

CONTEXTE COMPLET DU PORTFOLIO :
{{{contextualInfo}}}

MESSAGE UTILISATEUR :
{{{message}}}`,
});

// Le flux principal du chatbot
const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const {language} = input;

    // Ajout de la vérification de la clé API
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      console.error('[CHATBOT_BACKEND] Erreur: Clé API Gemini non configurée.');
      const errorMessage =
        language === 'fr'
          ? "Oups, il semble que le service IA de Google rencontre quelques difficultés. Je ne suis pas en mesure de traiter votre demande pour le moment. Pendant que le service se rétablit, je vous suggère d'explorer les projets directement."
          : "Oops, it seems the Google AI service is experiencing some difficulties. I am unable to process your request at the moment. While the service recovers, I suggest you explore the projects directly.";
      return {
        text: errorMessage,
        action: {type: 'navigate', path: '/portfolio'},
      };
    }
    
    // Construction du contexte
    const projects = await getProjects();
    const visualizerItems = await getVisualizerItems();
    const siteContent = content[language];
    const skills = {
        "fr": { "Logiciels 3D & Moteurs": ["Blender", "Maya", "3DS Max", "Cinema 4D", "ZBrush", "Substance P.", "NomadSculpt", "Unreal Engine", "Unity", "Unigine", "CryEngine", "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "DaVinci", "Natron"], "Langages de Programmation": ["C#", "C++", "Blueprint", "HLSL", "Python", "HTML", "CSS", "SCSS", "JavaScript", "TypeScript", "PHP", "SQL"], "Web & Design": ["WordPress", "Elementor", "Divi", "Google Ads", "Analytics", "Screaming Frog", "Figma", "Adobe XD"] },
        "en": { "3D Software & Engines": ["Blender", "Maya", "3DS Max", "Cinema 4D", "ZBrush", "Substance P.", "NomadSculpt", "Unreal Engine", "Unity", "Unigine", "CryEngine", "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "DaVinci", "Natron"], "Programming Languages": ["C#", "C++", "Blueprint", "HLSL", "Python", "HTML", "CSS", "SCSS", "JavaScript", "TypeScript", "PHP", "SQL"], "Web & Design": ["WordPress", "Elementor", "Divi", "Google Ads", "Analytics", "Screaming Frog", "Figma", "Adobe XD"] }
    };
    const contextualInfo = `
      Profil de Donovan Chartrain: ${siteContent.about.profile_content}
      Parcours de Donovan Chartrain: ${siteContent.about.journey_content}
      Informations de contact: Email: ${siteContent.contact.email}, Téléphone: ${siteContent.contact.phone}. La page de contact se trouve à l'URL /contact.
      Compétences: ${JSON.stringify(skills[language])}. La page des compétences est /about.
      Liste des Projets: ${projects.map(p => `- ID: ${p.id}, Titre: ${p.title[language]}, Description: ${p.description[language]}, Technologies: ${p.technologies.join(', ')}`).join('\n')}
      Liste des Modèles 3D: ${visualizerItems.map(item => `- ID: ${item.id}, Nom: ${item.name[language]}, Description: ${item.description[language]}`).join('\n')}
      --- INFORMATIONS EXCLUSIVES POUR L'ASSISTANT ---
      - Disponibilité: Donovan est disponible immédiatement pour un poste en CDI dans le Vaucluse et le Gard. Il ne recherche pas de missions en freelance.
      - Méthode de travail: Il privilégie une approche agile avec des sprints et des points de suivi réguliers.
      --- FIN DES INFORMATIONS EXCLUSIVES ---
    `;

    const promptInput = {
        message: input.message,
        contextualInfo: contextualInfo.trim(),
        language: language,
    };

    try {
        console.log('[CHATBOT_BACKEND] Step 1: Envoi du prompt à l\'IA avec le message:', input.message);
        const { output } = await chatbotPrompt(promptInput);
        console.log('[CHATBOT_BACKEND] Step 2: Réponse brute et structurée reçue de l\'IA:', JSON.stringify(output, null, 2));

        if (!output) {
            throw new Error('IA response is empty or invalid.');
        }
        
        // La réponse est déjà dans le bon format, on la retourne directement.
        return output;

    } catch(e: any) {
        console.error('[CHATBOT_BACKEND] Erreur dans le flow:', e);
        let errorMessage;
        
        // Gestion spécifique de l'erreur de quota
        if (e.message && (e.message.includes('503') || e.message.includes('overloaded') || e.message.includes('RESOURCE_EXHAUSTED'))) {
            errorMessage = language === 'fr'
                ? "Le service IA de Google est très sollicité en ce moment et mes circuits sont un peu surchargés. Je ne peux donc pas vous répondre. En attendant que la situation se normalise, n'hésitez pas à explorer le portfolio manuellement."
                : "The Google AI service is currently in high demand, and my circuits are a bit overloaded, so I can't respond right now. While things get back to normal, please feel free to explore the portfolio directly.";
        } else {
             errorMessage = language === 'fr'
                ? "Oups, il semble que le service IA de Google rencontre quelques difficultés. Je ne suis pas en mesure de traiter votre demande pour le moment. Pendant que le service se rétablit, je vous suggère d'explorer les projets directement."
                : "Oops, it seems the Google AI service is experiencing some difficulties. I am unable to process your request at the moment. While the service recovers, I suggest you explore the projects directly.";
        }
        
        return { 
          text: errorMessage,
          action: { type: 'navigate', path: '/portfolio' }
        };
    }
  }
);

/**
 * Fonction publique exportée que le client appellera.
 * Elle sert de wrapper simple pour le flow Genkit.
 * @param input L'objet d'entrée contenant le message et la langue.
 * @returns Une promesse qui se résout avec la sortie du chatbot.
 */
export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}
