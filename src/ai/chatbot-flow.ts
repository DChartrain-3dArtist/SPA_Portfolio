
'use server';

/**
 * @fileOverview Ce fichier définit le flux Genkit pour le chatbot IA du portfolio.
 * Il gère la logique de conversation, l'accès aux informations du site et
 * l'utilisation d'outils pour la navigation.
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

// Schéma de sortie pour la fonction publique `chat`
const ChatbotOutputSchema = z.object({
  text: z.string().describe("La réponse textuelle de l'IA."),
  action: z
    .object({
      type: z.enum(['navigate', 'contact']).optional(),
      path: z.string().optional(),
    })
    .optional()
    .describe(
      "Une action de navigation ou de contact suggérée par l'IA."
    ),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Outils que l'IA peut utiliser
const navigateToPageTool = ai.defineTool(
  {
    name: 'navigateToPage',
    description:
      "Suggère à l'utilisateur de naviguer vers une page spécifique du portfolio (ex: /about, /portfolio). N'utilise pas cet outil pour la page contact.",
    inputSchema: z.object({
      path: z.string().describe('Le chemin de la page, ex: "/about"'),
    }),
    outputSchema: z.any(),
  },
  async ({path}) => ({success: true, path})
);

const navigateToProjectTool = ai.defineTool(
  {
    name: 'navigateToProject',
    description:
      "Suggère de naviguer vers la page de détail d'un projet spécifique en utilisant son ID.",
    inputSchema: z.object({id: z.string().describe("L'ID du projet")}),
    outputSchema: z.any(),
  },
  async ({id}) => ({success: true, path: `/portfolio/${id}`})
);

const navigateToVisualizerItemTool = ai.defineTool(
  {
    name: 'navigateToVisualizerItem',
    description:
      "Suggère de naviguer vers un modèle 3D spécifique dans le visualiseur en utilisant son ID.",
    inputSchema: z.object({id: z.string().describe("L'ID du modèle 3D")}),
    outputSchema: z.any(),
  },
  async ({id}) => ({success: true, path: `/visualizer/item/${id}`})
);

const contactTool = ai.defineTool(
    {
        name: 'contactTool',
        description: "Suggère à l'utilisateur d'aller sur la page contact pour envoyer un message.",
        inputSchema: z.object({}),
        outputSchema: z.any(),
    },
    async () => ({success: true})
)

// Schéma d'entrée complet pour le prompt interne.
const ChatbotPromptInputSchema = z.object({
  message: z.string(),
  contextualInfo: z.string(),
  language: z.enum(['fr', 'en']),
});

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  model: 'googleai/gemini-1.5-flash',
  tools: [
    navigateToPageTool,
    navigateToProjectTool,
    navigateToVisualizerItemTool,
    contactTool,
  ],
  input: {schema: ChatbotPromptInputSchema},
  output: {schema: z.object({ text: z.string() }) }, // On attend que le texte du modèle. L'action est gérée par les outils.
  prompt: `Tu es AURIA, une assistante IA pour le portfolio de Chartrain Donovan. Ton rôle est d'aider les visiteurs (recruteurs, clients) à découvrir son profil, ses compétences et projets.
Réponds dans la langue spécifiée (language: {{{language}}}), de manière concise et professionnelle.
Utilise le contexte ci-dessous pour répondre et les outils pour guider l'utilisateur si c'est pertinent. Si une question concerne la prise de contact, fournis les informations de contact du contexte ET utilise l'outil 'contactTool'. Si tu ne sais pas, dis-le clairement.

CONTEXTE:
{{{contextualInfo}}}

MESSAGE UTILISATEUR:
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

    // Vérifie la présence de la clé API.
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      console.error('Clé API manquante. Le chatbot ne peut pas fonctionner.');
      const errorMessage =
        language === 'fr'
          ? "Désolé, la fonctionnalité de l'assistant IA est actuellement désactivée car la clé API n'est pas configurée côté serveur."
          : "Sorry, the AI assistant feature is currently disabled because the API key is not configured on the server.";
      return {text: errorMessage};
    }

    const projects = await getProjects();
    const visualizerItems = await getVisualizerItems();
    const siteContent = content[language];

    // Données des compétences tirées de la page "À Propos".
    const skills = {
        "fr": {
            "Logiciels 3D & Moteurs": ["Blender", "Maya", "3DS Max", "Cinema 4D", "ZBrush", "Substance P.", "NomadSculpt", "Unreal Engine", "Unity", "Unigine", "CryEngine", "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "DaVinci", "Natron"],
            "Langages de Programmation": ["C#", "C++", "Blueprint", "HLSL", "Python", "HTML", "CSS", "SCSS", "JavaScript", "TypeScript", "PHP", "SQL"],
            "Web & Design": ["WordPress", "Elementor", "Divi", "Google Ads", "Analytics", "Screaming Frog", "Figma", "Adobe XD"]
        },
        "en": {
            "3D Software & Engines": ["Blender", "Maya", "3DS Max", "Cinema 4D", "ZBrush", "Substance P.", "NomadSculpt", "Unreal Engine", "Unity", "Unigine", "CryEngine", "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "DaVinci", "Natron"],
            "Programming Languages": ["C#", "C++", "Blueprint", "HLSL", "Python", "HTML", "CSS", "SCSS", "JavaScript", "TypeScript", "PHP", "SQL"],
            "Web & Design": ["WordPress", "Elementor", "Divi", "Google Ads", "Analytics", "Screaming Frog", "Figma", "Adobe XD"]
        }
    };
    
    // Construit une seule chaîne de caractères avec toutes les informations contextuelles.
    const contextualInfo = `
      Profil de Donovan Chartrain: ${siteContent.about.profile_content}
      Parcours de Donovan Chartrain: ${siteContent.about.journey_content}
      
      Informations de contact:
      - Email: ${siteContent.contact.email}
      - Téléphone: ${siteContent.contact.phone}
      
      Compétences:
      - Logiciels 3D & Moteurs: ${skills[language]["Logiciels 3D & Moteurs"].join(', ')}
      - Langages de Programmation: ${skills[language]["Langages de Programmation"].join(', ')}
      - Web & Design: ${skills[language]["Web & Design"].join(', ')}

      Expériences et Formations:
      ${siteContent.about.timeline
        .map(
          (item) => `- ${item.role} chez ${item.company} (${item.period})`
        )
        .join('\n')}

      Liste des Projets:
      ${projects
        .map(
          (p) =>
            `- ID: ${p.id}, Titre: ${p.title[language]}, Description courte: ${p.description[language]}, Description longue: ${p.longDescription[language]}, Technologies: ${p.technologies.join(', ')}`
        )
        .join('\n')}

      Liste des Modèles 3D:
      ${visualizerItems
        .map(
          (item) =>
            `- ID: ${item.id}, Nom: ${item.name[language]}, Description: ${item.description[language]}`
        )
        .join('\n')}
      
      --- INFORMATIONS EXCLUSIVES POUR L'ASSISTANT ---
      Ces informations ne sont pas visibles sur le site mais peuvent être utilisées pour répondre aux questions des recruteurs.
      - Disponibilité: Donovan est disponible immédiatement pour un poste en CDI dans le Vaucluse et le Gard. Il ne recherche pas de missions en freelance, préférant se concentrer sur son cœur de métier au sein d'une entreprise plutôt que sur la gestion administrative.
      - Méthode de travail: Il privilégie une approche agile avec des sprints et des points de suivi réguliers pour garantir la transparence. Il est à l'aise avec des outils comme Jira, Trello ou Notion.
      - Veille technologique et centres d'intérêt: Il se tient constamment à jour sur les évolutions de la 3D temps réel, notamment sur les nouvelles versions d'Unreal Engine. Il affectionne particulièrement tout ce qui est lié à l'innovation technologique et à la R&D.
      --- FIN DES INFORMATIONS EXCLUSIVES ---
    `;

    // Construit l'objet d'entrée complet pour le prompt.
    const promptInput = {
      message: input.message,
      contextualInfo: contextualInfo.trim(),
      language: language,
    };

    const llmResponse = await chatbotPrompt(promptInput);
    const output = llmResponse.output;

    if (!output) {
      const errorMessage =
        language === 'fr'
          ? 'Je ne suis pas sûr de savoir comment répondre. Pouvez-vous reformuler ?'
          : "I'm not sure how to respond. Can you rephrase?";
      return {text: errorMessage};
    }
    
    const response: ChatbotOutput = { text: output.text };

    // Gère la réponse des outils.
    if(llmResponse.toolRequest) {
        const calledTool = llmResponse.toolRequest.tool.name;
        if(calledTool === 'contactTool') {
             response.action = {type: 'contact', path: '/contact'};
        }
        if(calledTool === 'navigateToPage' || calledTool === 'navigateToProject' || calledTool === 'navigateToVisualizerItem') {
            const toolResponse = llmResponse.toolRequest.tool.output;
            if (toolResponse?.path) {
                response.action = {type: 'navigate', path: toolResponse.path};
            }
        }
    }
    
    return response;
  }
);

// Fonction wrapper exportée pour être utilisée par le composant React
export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}
