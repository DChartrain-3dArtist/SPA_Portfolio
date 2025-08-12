
# Documentation Technique Complète – Portfolio Interactif

**Auteur :** Chartrain Donovan  
**Version :** 1.0.1 
**Date :** 2024-08-12

---

<!-- ========== PAGE DE GARDE ========== -->

## 📄 Page de garde

![Capture d’écran page d’accueil portfolio](/public/assets/data/Opengraph.jpg)
*Description : Capture d’écran en pleine largeur de la page d’accueil, thème sombre, avec le visuel 3D et les titres principaux.*

**Titre alternatif :** Portfolio Interactif — Donovan Chartrain — Développeur Web & Artiste 3D

---

<!-- ========== RÉSUMÉ EXÉCUTIF ========== -->

## Résumé exécutif

Ce document est la **documentation technique complète** du projet **Portfolio Interactif** développé par Chartrain Donovan. Il a pour vocation de fournir un dossier technique exhaustif qui témoigne des compétences en développement front-end moderne (Next.js, TypeScript), en intégration 3D temps réel (Three.js) et en implémentation d'IA générative (Genkit).

**Objectif principal :** Servir de référence unique et détaillée pour comprendre, maintenir et faire évoluer le projet. Il s'adresse aux recruteurs, responsables techniques et développeurs.

**Points forts du projet :**
- **Architecture Moderne :** Next.js 14 (App Router), TypeScript, composants serveur/client.
- **UI Soignée :** ShadCN UI + Tailwind CSS pour un design system modulaire et personnalisable.
- **Visualiseur 3D Interactif :** Espace WebGL optimisé avec `@react-three/fiber` et `@react-three/drei`.
- **Chatbot Intelligent "AURIA" :** Assistant IA basé sur Genkit/Gemini avec une connaissance contextuelle du site et des outils de navigation.
- **Expérience Utilisateur Complète :** Thème clair/sombre, multilingue (FR/EN), PWA, SEO optimisé, et gestion du consentement RGPD.

---

<!-- ========== TABLE DES MATIÈRES ========== -->

## Table des matières

1.  **Présentation générale**
    1.  Objectif du projet
    2.  Public cible
    3.  Stack technique
    4.  Fonctionnalités principales
2.  **Guide d'installation & déploiement**
    1.  Prérequis
    2.  Installation locale
    3.  Variables d'environnement et Clés API
    4.  Déploiement (Vercel)
    5.  Scripts utiles
3.  **Documentation technique détaillée**
    1.  Architecture (schéma ASCII)
    2.  Structure du projet (arborescence)
    3.  Description détaillée des dossiers et fichiers
    4.  Flux de données (chatbot, portfolio, 3D)
4.  **Aspects clés**
    1.  SEO (Search Engine Optimization)
    2.  Accessibilité (a11y)
    3.  Sécurité
    4.  Performances
5.  **Annexes**
    1.  Système de téléchargement de CV
    2.  Preloader animé
    3.  Intégration des icônes
    4.  Historique des versions (Changelog)
6.  **Conformité & Licence**
    1.  Gestion du Consentement (RGPD)
    2.  Mentions Légales
    3.  Politique de Confidentialité
    4.  Licence du code source

---

<!-- ========== 1. PRÉSENTATION GÉNÉRALE ========== -->

# 1. Présentation générale

## 1.1 Objectif du projet

Ce portfolio a été conçu comme un **espace professionnel personnel** pour exposer des projets 3D et web, en mettant l'accent sur l'interaction temps réel et la qualité de la présentation. Il sert à la fois de CV interactif, de showroom technique, et de preuve de maîtrise des technologies récentes (Next.js, TypeScript, R3F, Genkit).

## 1.2 Public cible

-   **Recruteurs / Responsables techniques :** Pour évaluer les compétences techniques, la qualité du code et la vision produit.
-   **Équipes techniques :** Pour comprendre l'architecture et la capacité à intégrer des technologies modernes.
-   **Partenaires ou studios :** Pour examiner les réalisations et l'approche UX/UI.

## 1.3 Stack technique

| Technologie                 | Version/Note   | Rôle                                                                 |
| --------------------------- | -------------- | -------------------------------------------------------------------- |
| Next.js (App Router)        | v14+           | Routing, Server/Client components, métadonnées, API routes           |
| React + TypeScript          | v19 (RC), v5+  | UI, logique front-end, typage statique                               |
| Tailwind CSS + ShadCN UI    | v3+, v1+       | Design system utilitaire et composants pré-construits                |
| Three.js, @react-three/fiber | `alpha`        | Rendu 3D WebGL, gestion de scène, contrôles caméra                  |
| Genkit (Google AI)          | v1.0+          | Chatbot AURIA, flow côté serveur, intégration Gemini                 |
| Vercel                      | Platform       | Build, déploiement et hébergement (Edge CDN)                         |
| Nodemailer                  | v6.9+          | Envoi d'e-mails depuis le formulaire de contact (via API route)      |
| Zod                         | v3+            | Validation de schémas (formulaire de contact, chatbot)               |

## 1.4 Fonctionnalités principales

### 1.4.1 Visualiseur 3D interactif

-   **Rôle et Objectif :**
    -   Aller au-delà des images et vidéos statiques en proposant une **exploration immersive** des modèles 3D.
    -   Démontrer une compétence clé dans l'intégration de la 3D temps réel dans un environnement web, une compétence recherchée dans des secteurs comme l'e-commerce, l'éducation ou l'immobilier.

-   **Implémentation technique :**
    -   **Scène WebGL via `@react-three/fiber` :** La technologie WebGL permet le rendu 3D natif dans le navigateur. L'utilisation de `@react-three/fiber` agit comme un **moteur de rendu React pour Three.js**, permettant de construire la scène 3D de manière déclarative avec des composants React. Cela simplifie la gestion de l'état, des événements et le cycle de vie des objets 3D, tout en s'intégrant parfaitement à l'écosystème React. La scène est encapsulée dans le composant `ModelCanvas`.
    -   **Chargement optimisé avec `useGLTF` :** Les modèles au format `.glb` sont chargés de manière asynchrone grâce au hook `useGLTF` de la bibliothèque `@react-three/drei`. Ce hook utilise `Suspense` pour gérer l'état de chargement, affichant un fallback pendant que le modèle est téléchargé et traité, ce qui évite de bloquer l'UI.
    -   **Contrôles caméra avec `OrbitControls` :** Pour permettre l'interaction, le composant `OrbitControls` (de `@react-three/drei`) est ajouté à la scène. Il gère nativement la rotation (clic gauche), le panoramique (clic droit) et le zoom (molette), offrant des contrôles standards et intuitifs.
    -   **Interface utilisateur (UI) dédiée :** Des boutons ont été ajoutés pour réinitialiser la vue, activer/désactiver l'auto-rotation et passer en plein écran. Ces contrôles manipulent directement l'état du composant ou les instances de la scène (ex: `controlsRef.current.reset()`).

-   **Lien avec les projets :**
    -   Certains projets dans `projects.json` ont un booléen `isVisualizable: true` et un tableau `visualizerItems`.
    -   La page de détail d'un projet (`ProjectDetailPage`) vérifie ces données et, le cas échéant, affiche une section dédiée listant les modèles 3D associés. Chaque élément de cette liste est un lien vers une page dynamique (`/visualizer/item/[id]`) qui charge `ModelCanvas` avec l'URL du modèle 3D correspondant.

### 1.4.2 Portfolio dynamique et filtrable

-   **Rôle et Objectif :**
    -   Présenter les projets de manière organisée et professionnelle, en évitant une page statique difficile à maintenir.
    -   Démontrer la capacité à gérer et à afficher des ensembles de données dynamiques côté client, une compétence fondamentale du développement front-end.

-   **Implémentation technique :**
    -   **Source de données centralisée (`projects.json`) :** Au lieu de coder en dur chaque projet dans l'HTML, les données sont stockées dans un fichier `projects.json`. Cette approche "headless" permet de modifier, ajouter ou supprimer des projets sans toucher au code des composants React, ce qui facilite grandement la maintenance.
    -   **Affichage double (Grille / Liste) :** Un état React `layout` est utilisé dans le composant `PortfolioPage` pour basculer entre deux rendus visuels. Le rendu conditionnel change les classes CSS (via `grid-cols-*`) et utilise le même composant `ProjectCard` qui adapte son propre style en fonction de la prop `layout`.
    -   **Filtrage multi-critères :** Le filtrage est géré côté client avec le hook `useMemo` pour des performances optimales. `useMemo` recalcule la liste des projets à afficher uniquement lorsque les dépendances (la liste des projets ou les critères de filtre) changent. Les filtres (secteur, type, technologie, etc.) sont gérés par des états React (`useState`). La logique de filtrage combine plusieurs `.filter()` sur le tableau des projets.
    -   **Recherche textuelle et Tri :** Un état `searchTerm` stocke la valeur de l'input de recherche. Le filtrage inclut une condition qui vérifie si le terme de recherche est présent (en minuscules) dans le titre ou la description du projet. Le tri est géré par un état `sortOrder` qui modifie la logique de la fonction `.sort()` appliquée au tableau des projets.

### 1.4.3 Chatbot AURIA (Genkit / Gemini)

-   **Rôle et Objectif :**
    -   Offrir un moyen de navigation et de recherche d'information plus naturel et engageant qu'une simple FAQ ou un champ de recherche.
    -   Démontrer une compétence avancée dans l'intégration de services d'IA générative (LLM) dans une application web moderne.

-   **Implémentation technique :**
    -   **Nom :** AURIA (Assistant Utilitaire de Recherche et d’Information par Intelligence Artificielle) lui donne une identité mémorable.
    -   **Logique côté serveur avec Genkit :** Pour sécuriser la clé API Google et gérer la logique complexe, un "flow" Genkit est défini dans `src/ai/chatbot-flow.ts`. Ce fichier, marqué `'use server'`, est une API sans état qui est appelée par le composant client.
    -   **Contexte dynamique :** Avant d'appeler le modèle Gemini, le flow Genkit collecte des informations à jour depuis le site (liste des projets de `projects.json`, contenu de `content.ts`) et les injecte dans le prompt système. Cela permet à l'IA d'avoir une connaissance précise et actuelle du portfolio.
    -   **Gestion des erreurs d'API :** Le composant client `Chatbot.tsx` enveloppe l'appel à l'API dans un bloc `try...catch`. Le `catch` analyse l'erreur retournée. Si l'erreur contient un message indiquant un épuisement des quotas (`429 RESOURCE_EXHAUSTED`), il affiche un message personnalisé et informatif à l'utilisateur, évitant un plantage silencieux.
    -   **UI conversationnelle :** Le composant `Chatbot.tsx` gère l'état de la conversation (liste des messages), les états de chargement (`isLoading`) et les erreurs. Il utilise la bibliothèque `framer-motion` pour des animations fluides lors de l'ouverture/fermeture et de l'affichage des messages.

### 1.4.4 Personnalisation & PWA

-   **Rôle et Objectif :**
    -   Améliorer l'expérience utilisateur (UX) en s'adaptant à ses préférences (thème, langue) et en offrant des fonctionnalités d'application native (installation).

-   **Implémentation technique :**
    -   **Thème clair / sombre :** Un `ThemeContext` est utilisé pour stocker l'état du thème (`light` ou `dark`). Le `ThemeProvider` enveloppe l'application. Un `useEffect` dans ce provider change la classe sur la balise `<html>`, ce qui permet au système de variables CSS de `globals.css` d'appliquer les bonnes couleurs.
    -   **Support multilingue (FR/EN) :** Un `LanguageContext` fonctionne de manière similaire. Les textes sont centralisés dans l'objet `content` du fichier `src/lib/content.ts`. Les composants accèdent aux textes via le hook `useLanguage` (ex: `c.nav.home`).
    -   **PWA (Progressive Web App) :** La capacité d'installation est activée par la présence du fichier `manifest.webmanifest` à la racine du dossier `public`. Ce fichier JSON définit le nom de l'application, les icônes, la couleur du thème, etc., permettant aux navigateurs de proposer à l'utilisateur d' "installer" le site sur son écran d'accueil.

---

# 2. Guide d'installation & déploiement

## 2.1 Prérequis

Avant de lancer le projet, assurez-vous que les outils suivants sont installés sur votre machine :
-   **Node.js :** Version 18.x ou supérieure.
-   **Gestionnaire de paquets :** `npm` (inclus avec Node.js) ou `yarn`.

## 2.2 Installation locale

Pour faire tourner une version de développement du projet sur votre machine, suivez ces étapes :

1.  **Cloner le dépôt Git :**
    ```bash
    git clone https://github.com/DChartrain-3dArtist/SPA_Portfolio.git
    cd SPA_Portfolio
    ```

2.  **Installer les dépendances :**
    Cette commande va télécharger et installer tous les paquets nécessaires listés dans `package.json`.
    ```bash
    npm install
    # ou avec yarn :
    # yarn install
    ```

3.  **Lancer le serveur de développement :**
    Cette commande démarre le serveur de développement Next.js.
    ```bash
    npm run dev
    # ou avec yarn :
    # yarn dev
    ```

Par défaut, l'application sera accessible à l'adresse **`http://localhost:9002`**. Le port `9002` est spécifié dans le script `dev` du fichier `package.json`.

## 2.3 Variables d'environnement et Clés API

Certaines fonctionnalités, comme le chatbot AURIA et le formulaire de contact, nécessitent des clés API et des informations sensibles. Ces dernières ne doivent jamais être stockées directement dans le code. Elles sont gérées via un fichier `.env.local`.

1.  **Créer le fichier `.env.local` :**
    À la racine du projet, créez un fichier nommé `.env.local`. Ce fichier est ignoré par Git (via `.gitignore`) pour des raisons de sécurité.

2.  **Ajouter les variables nécessaires :**
    Remplissez le fichier `.env.local` avec les variables suivantes :

    ```env
    # Clé API pour Google Generative AI (Gemini)
    # Nécessaire pour le fonctionnement du chatbot AURIA.
    GEMINI_API_KEY="VOTRE_CLÉ_API_GEMINI_ICI"

    # --- Paramètres pour l'envoi d'e-mails (Nodemailer) ---
    # Utilisés par l'API route /api/contact

    # Hôte de votre serveur SMTP
    SMTP_HOST="smtp.votre-fournisseur.com"

    # Port du serveur SMTP (ex: 465 pour SSL, 587 pour TLS)
    SMTP_PORT=465

    # Nom d'utilisateur pour l'authentification SMTP
    SMTP_USER="votre-email@domaine.com"

    # Mot de passe pour l'authentification SMTP (ou mot de passe d'application)
    SMTP_PASS="VOTRE_MOT_DE_PASSE_SMTP"

    # L'adresse e-mail qui recevra les messages du formulaire de contact
    CONTACT_EMAIL="email-de-destination@domaine.com"
    ```

> **Note de sécurité :** Ne partagez jamais votre fichier `.env.local` ou vos clés API.

## 2.4 Déploiement (Vercel)

Le projet est optimisé pour être déployé sur **Vercel**, la plateforme de hosting conçue par les créateurs de Next.js. Le déploiement est automatisé via l'intégration avec un dépôt Git (GitHub, GitLab, etc.).

1.  **Créer un compte Vercel** et le lier à votre compte Git.
2.  **Importer le projet Git** depuis l'interface de Vercel.
3.  **Configurer les variables d'environnement :** Dans les paramètres du projet sur Vercel, ajoutez les mêmes variables d'environnement que celles de votre fichier `.env.local` (section "Environment Variables").
4.  **Déployer :** Vercel détectera automatiquement que c'est un projet Next.js et utilisera les commandes de build et de start appropriées. Chaque `git push` sur la branche principale (généralement `main` ou `master`) déclenchera un nouveau déploiement.

## 2.5 Scripts utiles

Le fichier `package.json` contient plusieurs scripts pour faciliter le développement et la maintenance :

-   `npm run dev`: Lance le serveur de développement en local.
-   `npm run build`: Compile l'application pour la production. Cette commande est généralement exécutée automatiquement par Vercel.
-   `npm run start`: Démarre un serveur de production local après un `build`. Utile pour tester les performances de la version de production.
-   `npm run lint`: Lance ESLint pour vérifier les erreurs de style et de syntaxe dans le code.
-   `npm run typecheck`: Lance le compilateur TypeScript (`tsc`) pour vérifier les erreurs de type sans générer de fichiers.
-   `npm run test`: Lance les tests unitaires avec Jest.

---

# 3. Documentation technique détaillée

## 3.1 Architecture (schéma ASCII)

Ce schéma illustre l'architecture globale de l'application, des interactions utilisateur aux services externes.

```
+------------------+      +---------------------------------+      +------------------------+
| UTILISATEUR      |      |          VERCEL PLATFORM          |      |    SERVICES EXTERNES   |
| (Navigateur Web) |----->|         (Hosting & Edge)          |      |                        |
+------------------+      +---------------------------------+      +------------------------+
         |                                |                                |
         |                                |                                |
         | HTTP(S) Request                |                                |
         |                                V                                V
         |                      +-------------------------------------------------+
         |                      |               NEXT.JS APPLICATION               |
         |                      +-------------------------------------------------+
         |                      |                                                 |
         |                      |  +------------------+     +-------------------+ |
         |                      |  | CLIENT-SIDE      |     | SERVER-SIDE       | |
         |                      |  | (Composants      |     | (Composants       | |
         |                      |  |  Interactifs)    |     |  Serveur, API)    | |
         |                      |  +------------------+     +-------------------+ |
         |                      |          ^                        |             |
         |                      |          | Hydratation            |             |
         +---------------------------------|------------------------+             |
                                |          V                        |             |
+-------------------------------+  +------------------+             |             |
| Composants React (UI)         |  | /app (App Router)|             |             |
| - Chatbot.tsx                 |  | - Pages (RSC)    |             |             |
| - PortfolioPage.tsx           |  | - Layouts (RSC)  |             |             |
| - ModelCanvas.tsx (Three.js)  |  +------------------+             |             |
| - ContactForm.tsx             |                                   |             |
+-------------------------------+                                   |             |
        |           |                                               |             |
        | (1)       +---------------------------------------------->+             |
        | Appel     |                                               |             |
        |           |  (2) Appel API Route                          |             |
        +---------->+  /api/contact                                 |             |
                    |                                               |             |
                    |                                 +-------------V-------------+
                    |                                 | src/ai/chatbot-flow.ts  |
                    |                                 | (Genkit Flow)           |
                    |                                 +-------------------------+
                    |                                     |           |
                    |                                     | (3)       | (4)
                    |                                     V           V
                    |               +---------------------+   +-----------------+
                    |               | API Google Gemini   |   | projects.json   |
                    |               +---------------------+   +-----------------+
                    |                                                         
                    |                                 +-------------------------+
                    |                                 | /api/contact/route.ts   |
                    +-------------------------------->| (Nodemailer)            |
                                                      +-------------------------+
                                                                  | (5)
                                                                  V
                                                          +-----------------+
                                                          | Serveur SMTP    |
                                                          +-----------------+

```

### Justification de l'architecture

Cette architecture a été choisie pour plusieurs raisons stratégiques :

-   **Sécurité et Performance avec Next.js :** L'utilisation de l'App Router de Next.js permet une séparation claire entre les composants Client et Serveur. Toute la logique sensible (appels aux API externes, envoi d'e-mails) est exécutée côté serveur, ce qui empêche toute exposition des clés API au navigateur. De plus, le rendu côté serveur (SSR/RSC) améliore considérablement les performances de chargement initial et le SEO.
-   **Maintenabilité :** La centralisation des données des projets dans un fichier `projects.json` et des textes dans `content.ts` découple le contenu de la logique de l'interface. Cela permet de mettre à jour le portfolio très facilement sans avoir à modifier le code des composants React.
-   **Modularité et Scalabilité :** La structure basée sur des composants (ShadCN, composants personnalisés) et des services dédiés (le flow Genkit pour l'IA, l'API Route pour le contact) rend l'application modulaire. Il est facile d'ajouter de nouvelles fonctionnalités ou de modifier des existantes sans impacter le reste du site.

En somme, cette architecture offre un équilibre optimal entre performance, sécurité, et facilité de maintenance, tout en utilisant des technologies modernes et reconnues.

## 3.2 Structure du projet (arborescence)

L'organisation des fichiers suit une convention logique qui sépare les différentes responsabilités de l'application. Elle est conçue pour être intuitive, maintenable et scalable.

```
/
├── public/                 # Fichiers statiques (images, polices, modèles 3D, manifest)
├── src/
│   ├── ai/                 # Logique liée à l'IA (Genkit, Gemini)
│   │   ├── chatbot-flow.ts # Flow Genkit pour le chatbot AURIA
│   │   └── genkit.ts       # Initialisation du client Genkit
│   │
│   ├── app/                # Cœur de l'application (Next.js App Router)
│   │   ├── (main)/         # Groupe de routes pour le site principal
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── portfolio/
│   │   │   │   └── [id]/   # Page dynamique de détail d'un projet
│   │   │   ├── ... (autres pages)
│   │   │   └── layout.tsx  # Layout spécifique au site principal
│   │   │
│   │   ├── (visualizer)/   # Groupe de routes pour le visualiseur 3D
│   │   │   ├── visualizer/
│   │   │   │   ├── item/
│   │   │   │   │   └── [id]/
│   │   │   │   └── ...
│   │   │   └── layout.tsx  # Layout spécifique au visualiseur
│   │   │
│   │   ├── api/            # API Routes (ex: formulaire de contact)
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css     # Styles globaux et variables de thème
│   │   ├── layout.tsx      # Layout racine de l'application
│   │   ├── not-found.tsx   # Page 404 personnalisée
│   │   ├── sitemap.ts      # Génération du sitemap.xml
│   │   └── robots.ts       # Génération du robots.txt
│   │
│   ├── components/         # Composants React réutilisables
│   │   ├── chatbot/
│   │   ├── layout/         # Composants de structure (header, footer, sidebar)
│   │   ├── portfolio/      # Composants spécifiques au portfolio
│   │   ├── sections/       # Composants représentant des pages entières
│   │   ├── ui/             # Composants d'UI génériques (ShadCN)
│   │   └── visualizer/     # Composants pour le visualiseur 3D
│   │
│   ├── contexts/           # Contextes React (thème, langue, etc.)
│   │
│   ├── data/               # Source des données (JSON) et logique d'accès
│   │   ├── definitions.ts  # Types TypeScript pour les données
│   │   └── projects.json   # Base de données des projets
│   │
│   ├── hooks/              # Hooks React personnalisés
│   │
│   └── lib/                # Fonctions utilitaires et contenu textuel
│       ├── content.ts      # Contenu multilingue du site
│       └── utils.ts        # Fonctions utilitaires (ex: cn)
│
├── .env.local              # Variables d'environnement (ignoré par Git)
├── next.config.ts          # Configuration de Next.js
├── package.json            # Dépendances et scripts du projet
└── tailwind.config.ts      # Configuration de Tailwind CSS
```

### Justification de la structure

Cette structure de dossiers a été choisie pour sa clarté et sa scalabilité.

-   **Convention Next.js :** Le dossier `app/` respecte la structure de l'App Router de Next.js, ce qui est fondamental pour le routing et l'organisation des pages et layouts. Les groupes de routes `(main)` et `(visualizer)` permettent de partager des layouts spécifiques sans affecter l'URL.
-   **Séparation des préoccupations (SoC) :** Chaque dossier a un rôle clair. `components/` contient tout ce qui est visuel et réutilisable, `contexts/` gère l'état global, `data/` isole l'accès aux données, `lib/` regroupe la logique métier et les utilitaires, et `hooks/` contient la logique réutilisable des composants. Cette séparation rend le code plus facile à trouver, à comprendre et à débugger.
-   **Maintenabilité :** En isolant les composants, les données, et la logique, il devient plus simple de mettre à jour une partie de l'application sans créer d'effets de bord. Par exemple, changer la source des données des projets (de JSON à une base de données) ne nécessiterait de modifications que dans le dossier `data/`.

## 3.3 Description détaillée des dossiers et fichiers

Cette section détaille le contenu et le rôle de chaque dossier majeur et fichier clé du projet, offrant une carte complète de la base de code.

-   **`/public`**
    -   **Rôle :** Contient tous les fichiers statiques qui sont servis directement par le serveur, accessibles à la racine du site.
    -   **Contenu notable :**
        -   `/assets`: Images, modèles 3D (`.glb`), documents (CVs en `.pdf`).
        -   `manifest.webmanifest`: Fichier de configuration pour la Progressive Web App (PWA).
        -   `favicon.ico`, `favicon.svg`: Icônes du site pour les navigateurs.

-   **`/src/ai`**
    -   **Rôle :** Centralise toute la logique liée à l'intelligence artificielle (Genkit).
        -   `genkit.ts`: Initialise et configure le client Genkit avec le plugin Google AI. C'est le point d'entrée pour toutes les interactions avec l'API Gemini.
        -   `chatbot-flow.ts`: Définit le "flow" Genkit principal du chatbot AURIA. Il gère la réception des messages, la construction du contexte, l'appel au modèle d'IA avec les outils appropriés (navigation, contact), et la mise en forme de la réponse. Ce fichier s'exécute côté serveur pour sécuriser la clé API.

-   **`/src/app`**
    -   **Rôle :** Cœur de l'application Next.js, suivant la convention de l'App Router.
    -   **Contenu notable :**
        -   `layout.tsx`: Le layout racine de toute l'application. Il définit la structure HTML de base (`<html>`, `<body>`), charge les polices, les fournisseurs de contexte globaux (`Providers`), la bannière de consentement aux cookies et les scripts d'analyse.
        -   `globals.css`: Fichier CSS global. Il contient les directives de base de Tailwind CSS ainsi que la définition des variables CSS pour les thèmes clair et sombre, permettant un changement de thème dynamique.
        -   `(main)` et `(visualizer)`: Ce sont des **groupes de routes**. Ils permettent de structurer le projet en appliquant des layouts différents à des sections du site (`SiteLayout` pour le site principal, `VisualizerLayout` pour la partie 3D) sans que `(main)` ou `(visualizer)` n'apparaissent dans l'URL.
        -   `api/contact/route.ts`: Une API Route Next.js. C'est un endpoint côté serveur qui reçoit les données du formulaire de contact, les valide avec Zod, et utilise Nodemailer pour envoyer un e-mail.
        -   `sitemap.ts` & `robots.ts`: Fichiers de configuration qui génèrent dynamiquement `sitemap.xml` et `robots.txt` au moment du build, essentiels pour le SEO.

-   **`/src/components`**
    -   **Rôle :** Le répertoire le plus important pour l'interface utilisateur. Il contient tous les composants React réutilisables, organisés par fonctionnalité.
    -   **Contenu notable :**
        -   `ui/`: Composants d'interface utilisateur de base, principalement issus de ShadCN (Button, Card, Input, etc.). Ils sont conçus pour être génériques et réutilisables partout.
        -   `layout/`: Composants responsables de la structure globale des pages (Header, Footer, Sidebar, etc.). `SiteLayout` est le composant principal qui assemble ces éléments.
        -   `sections/`: Composants qui représentent des pages complètes (HomePage, AboutPage, etc.). Ils agissent comme des conteneurs qui assemblent d'autres composants plus petits.
        -   `portfolio/`: Composants spécifiques à la fonctionnalité du portfolio, comme `ProjectCard` (la carte d'un projet) et `ProjectDetailPage` (la page de détail).
        -   `chatbot/`: Le composant `Chatbot.tsx`, qui gère toute l'interface de l'assistant IA (fenêtre, messages, input).
        -   `visualizer/`: Composants pour le visualiseur 3D, comme `ModelCanvas` qui contient la scène Three.js.

-   **`/src/contexts`**
    -   **Rôle :** Contient les Contextes React pour la gestion de l'état global partagé à travers l'application.
    -   **Contenu notable :**
        -   `LanguageContext.tsx`: Gère la langue actuelle (FR/EN) et permet de la changer.
        -   `ThemeContext.tsx`: Gère le thème actuel (clair/sombre).
        -   `BreadcrumbContext.tsx`: Gère l'état du fil d'Ariane, spécifiquement pour le visualiseur 3D.

-   **`/src/data`**
    -   **Rôle :** Centralise les sources de données et leur logique d'accès.
    -   **Contenu notable :**
        -   `projects.json`: Fait office de base de données pour tous les projets du portfolio. Stocker les données ici permet de les modifier facilement sans toucher au code.
        -   `projects.ts`: Couche d'abstraction pour accéder aux données de `projects.json`. Les fonctions (`getProjects`, `getVisualizerItem`) sont asynchrones pour permettre une future migration vers une vraie base de données sans changer le code des composants.
        -   `definitions.ts`: Contient toutes les interfaces TypeScript (`Project`, `VisualizerItem`) qui définissent la structure des données du projet.

-   **`/src/hooks`**
    -   **Rôle :** Contient les hooks React personnalisés pour encapsuler et réutiliser de la logique complexe.
    -   **Contenu notable :**
        -   `use-cookie.ts`: Un hook pour gérer les cookies de manière sécurisée en distinguant le rendu serveur du rendu client.
        -   `use-mobile.ts`: Un hook qui détecte si l'utilisateur est sur un appareil mobile en se basant sur la largeur de l'écran.
        -   `use-toast.ts`: Le système de gestion des notifications (toasts).

-   **`/src/lib`**
    -   **Rôle :** Librairie de fonctions utilitaires et de contenu.
    -   **Contenu notable :**
        -   `utils.ts`: Contient la fonction `cn`, un utilitaire très pratique pour fusionner des classes Tailwind CSS de manière conditionnelle.
        -   `content.ts`: Fichier central pour tout le contenu textuel du site, structuré par langue. C'est le cœur du système multilingue.

-   **Fichiers de configuration à la racine**
    -   `next.config.ts`: Fichier de configuration de Next.js. Permet de définir des options avancées comme les domaines d'images autorisés, la transpilation de paquets, etc.
    -   `tailwind.config.ts`: Fichier de configuration de Tailwind CSS. C'est ici que sont définies les couleurs, les polices, et les extensions du framework.
    -   `package.json`: Définit les métadonnées du projet, les dépendances (`dependencies` et `devDependencies`) et les scripts (`dev`, `build`, `test`).
    -   `tsconfig.json`: Fichier de configuration pour le compilateur TypeScript, définissant les règles de typage et les chemins d'accès (`@/*`).

## 3.4 Flux de données

Cette section détaille le parcours des données pour les fonctionnalités clés de l'application. Comprendre ces flux est essentiel pour débugger ou faire évoluer le site.

### 3.4.1 Flux du Chatbot AURIA

Ce flux décrit l'interaction complète entre l'utilisateur, l'interface du chatbot et le service d'IA de Google, via le framework Genkit.

1.  **Déclenchement (Client) :** L'utilisateur saisit un message dans le champ de saisie du composant `Chatbot.tsx` (`src/components/chatbot/chatbot.tsx`) et clique sur "Envoyer".
    -   **Composant :** `Chatbot.tsx`
    -   **Action :** La fonction `handleSendMessage` est appelée.

2.  **Appel de la Server Action (Client → Serveur) :** La fonction `handleSendMessage` met à jour l'état local pour afficher le message de l'utilisateur instantanément. Ensuite, elle appelle la fonction `chat`, qui est une Server Action importée depuis `src/ai/chatbot-flow.ts`.
    -   **Fichier Client :** `Chatbot.tsx`
    -   **Fonction Serveur appelée :** `chat({ message: inputValue, language })`
    -   **Données transmises :** Un objet `{ message: string, language: 'fr' | 'en' }`.

3.  **Exécution du Flow Genkit (Serveur) :** L'appel atteint le fichier `chatbot-flow.ts`, qui s'exécute entièrement sur le serveur.
    -   **Fichier Serveur :** `src/ai/chatbot-flow.ts`
    -   **Logique :**
        a.  Le `chatbotFlow` reçoit le message de l'utilisateur.
        b.  Il construit un **contexte dynamique** en lisant les données locales à jour depuis `projects.json` (via `getProjects()`) et `content.ts`.
        c.  Toutes ces informations (profil, projets, compétences, etc.) sont compilées dans une longue chaîne de caractères (`contextualInfo`).
        d.  Le `chatbotFlow` appelle le `chatbotPrompt` en lui passant le message de l'utilisateur et le `contextualInfo`.

4.  **Appel à l'API Google Gemini (Serveur → Externe) :** Le prompt Genkit, configuré avec le modèle `gemini-1.5-flash`, envoie le prompt final (incluant le contexte et la question) à l'API de Google. Il fournit également les `tools` (ex: `navigateToPageTool`) que le modèle peut décider d'utiliser.

5.  **Traitement de la réponse (Serveur) :**
    -   L'API Gemini renvoie une réponse qui peut être :
        -   Un simple texte.
        -   Un texte accompagné d'une demande d'appel à un outil (`toolRequest`).
    -   Le `chatbotFlow` analyse cette réponse. Si un outil a été appelé (par exemple, pour naviguer vers `/portfolio/projet-X`), le flow exécute la logique de l'outil et met en forme l'objet de retour pour inclure une `action`.

6.  **Retour au Client (Serveur → Client) :** Le `chatbotFlow` termine son exécution et retourne un objet `ChatbotOutput` au composant `Chatbot.tsx`.
    -   **Données retournées :** Un objet `{ text: string, action?: { type: string, path: string } }`.
    -   **Exemple :** `{ text: "Bien sûr, voici le projet X.", action: { type: 'navigate', path: '/portfolio/projet-X' } }`

7.  **Affichage de la réponse (Client) :** Le composant `Chatbot.tsx` reçoit la réponse.
    -   Il met à jour son état `messages` pour afficher la réponse textuelle de l'IA.
    -   S'il y a une `action` dans la réponse, il affiche un bouton (`Allons-y`) qui, au clic, utilisera `next/navigation` pour rediriger l'utilisateur vers le chemin spécifié (`action.path`).

### 3.4.2 Flux du Formulaire de Contact

Ce flux décrit comment les données saisies par un utilisateur dans le formulaire de contact sont validées, sécurisées et envoyées par e-mail.

1.  **Saisie utilisateur (Client) :** Un utilisateur remplit les champs du formulaire dans le composant `ContactForm.tsx` (`src/components/contact-form.tsx`).

2.  **Validation côté client (Client) :** La bibliothèque `react-hook-form` avec le resolver `Zod` (`zodResolver`) valide les champs en temps réel (ex: format de l'e-mail, longueur minimale du message) en se basant sur le `formSchema` défini dans le composant.

3.  **Soumission du formulaire (Client → Serveur) :** L'utilisateur clique sur le bouton "Envoyer".
    -   **Composant :** `ContactForm.tsx`
    -   **Action :** La fonction `onSubmit` est déclenchée.
    -   Elle effectue une requête `POST` vers l'API Route `/api/contact` avec les données du formulaire dans le corps de la requête au format JSON.

4.  **Réception et Validation côté serveur (Serveur) :** L'API Route située dans `src/app/api/contact/route.ts` reçoit la requête.
    -   **Fichier Serveur :** `route.ts`
    -   **Logique :**
        a.  Le corps de la requête (`body`) est extrait et analysé.
        b.  Une **seconde validation** est effectuée côté serveur en utilisant le `contactSchema` de `Zod`. C'est une mesure de sécurité essentielle pour s'assurer que les données sont conformes, même si un utilisateur contourne la validation client.
        c.  Si la validation échoue, une réponse d'erreur 400 est renvoyée au client avec les détails.

5.  **Envoi de l'e-mail (Serveur → Externe) :**
    -   Si la validation réussit, le serveur utilise la bibliothèque `Nodemailer`.
    -   Il se connecte au serveur SMTP configuré via les variables d'environnement (`SMTP_HOST`, `SMTP_USER`, etc.).
    -   Il construit l'e-mail avec les données validées et l'envoie à l'adresse de destination (`CONTACT_EMAIL`).

6.  **Réponse au Client (Serveur → Client) :**
    -   Si l'e-mail est envoyé avec succès, l'API Route renvoie une réponse JSON de succès (ex: `{ success: true, message: 'Message envoyé...' }`) avec un statut 200.
    -   En cas d'échec (ex: erreur SMTP), elle renvoie une réponse d'erreur 500.

7.  **Affichage de la notification (Client) :** Le composant `ContactForm.tsx` reçoit la réponse de l'API.
    -   Il utilise le hook `useToast` pour afficher une notification (toast) de succès ou d'échec à l'utilisateur.
    -   Si l'envoi a réussi, le formulaire est réinitialisé.

---

# 4. Aspects clés

## 4.1 SEO (Search Engine Optimization)

Le référencement naturel a été une priorité pour garantir une visibilité maximale du portfolio, en particulier auprès des recruteurs locaux. L'architecture de Next.js (App Router) a été pleinement exploitée.

-   **Stratégie de Mots-clés :**
    -   **Mots-clés principaux :** "développeur web", "artiste 3D", "développeur 3D interactif". Ces termes définissent le cœur de métier.
    -   **Mots-clés de longue traîne :** "configurateur 3D", "application 3D temps réel", "développeur Next.js", "portfolio interactif". Ces expressions ciblent des recherches plus spécifiques et qualifiées.
    -   **Mots-clés locaux :** L'accent est mis sur "Vaucluse" et "Gard" pour attirer les opportunités locales. Ces termes sont intégrés dans les balises `title` et `description` des pages clés.

-   **Optimisation pour le Référencement Local :**
    -   **Métadonnées :** Le titre de la page d'accueil (`src/app/(main)/page.tsx`) inclut explicitement "Vaucluse et Gard".
    -   **Données Structurées (`JSON-LD`) :** Le fichier `src/app/layout.tsx` injecte des données structurées de type `Person` qui contiennent une `address` avec "Bédoin", "84410", et "FR". C'est un signal très fort pour Google, indiquant une présence physique dans une zone géographique précise, ce qui est crucial pour apparaître dans les résultats de recherche locaux (ex: "développeur web Vaucluse").

-   **Métadonnées Dynamiques :** Chaque page possède ses propres balises `title` et `description` grâce à la fonctionnalité `metadata` de Next.js. Pour les pages de projets (`/portfolio/[id]`), ces métadonnées sont générées dynamiquement côté serveur (`generateMetadata`) en fonction du projet demandé, assurant que chaque projet soit parfaitement indexable avec un contenu unique. Cela maximise les chances d'apparaître sur des recherches spécifiques liées à un projet.

-   **Sitemap & Robots.txt :** Les fichiers `src/app/sitemap.ts` et `src/app/robots.ts` génèrent automatiquement `sitemap.xml` et `robots.txt`. Le sitemap inclut toutes les pages statiques ainsi que les pages de projets générées dynamiquement, facilitant leur découverte par les robots d'exploration.

-   **HTML Sémantique :** L'utilisation correcte des balises HTML (`<main>`, `<section>`, `<article>`, `<header>`, `<h1>`, `<h2>`, etc.) structure le contenu de manière logique, ce qui est bénéfique à la fois pour le SEO et l'accessibilité.

-   **URLs Canoniques :** La balise `canonical` est définie dans les métadonnées pour indiquer aux moteurs de recherche l'URL préférée pour chaque page, évitant ainsi les problèmes de contenu dupliqué.

## 4.2 Accessibilité (a11y)

Une attention particulière a été portée à rendre le site utilisable par le plus grand nombre.

-   **Navigation au clavier :** Tous les éléments interactifs (boutons, liens, champs de formulaire) sont accessibles et utilisables via la touche `Tab`. Les styles de `focus-visible` (définis dans `tailwind.config.ts`) assurent un retour visuel clair pour l'élément sélectionné.
-   **Contraste des couleurs :** Les couleurs du thème clair et sombre (`src/app/globals.css`) ont été choisies pour respecter les ratios de contraste recommandés par les WCAG, garantissant une bonne lisibilité.
-   **Labels et ARIA :** Les champs de formulaire sont correctement associés à leurs labels via l'attribut `htmlFor`. Les boutons contenant uniquement des icônes sont dotés d'un `aria-label` pour fournir un contexte aux lecteurs d'écran.
-   **Alternative pour les images :** Toutes les images affichées via le composant `next/image` possèdent un attribut `alt` descriptif.

## 4.3 Sécurité

La sécurité du site et des données a été un aspect fondamental de sa conception.

-   **Variables d'environnement :** Toutes les clés API (Google Gemini, SMTP) et informations sensibles sont stockées dans un fichier `.env.local` qui est **exclu du contrôle de version** par `.gitignore`. Cela empêche toute fuite d'informations confidentielles dans le code source public.
-   **Opérations sensibles côté serveur :** La logique d'envoi d'e-mails (formulaire de contact) et les appels à l'API Gemini (chatbot) sont effectués côté serveur, respectivement via une API Route Next.js (`/api/contact`) et un "flow" Genkit. De cette manière, les clés API ne sont jamais exposées côté client.
-   **Validation des entrées :** La bibliothèque `Zod` est utilisée côté serveur dans l'API de contact pour valider et assainir les données envoyées par le formulaire avant tout traitement. Cela prévient les injections de code et garantit l'intégrité des données.
-   **Dépendances à jour :** Les dépendances du projet sont régulièrement auditées pour s'assurer qu'aucune vulnérabilité connue n'est présente.

## 4.4 Performances

L'optimisation des performances a été au cœur des choix techniques pour garantir une expérience utilisateur fluide et rapide.

-   **Composants Serveur (RSC) :** L'utilisation de l'App Router de Next.js permet de rendre par défaut les composants côté serveur, réduisant considérablement la quantité de JavaScript envoyée au client et accélérant le temps de chargement initial.
-   **Optimisation des images :** Le composant `next/image` est utilisé pour toutes les images. Il optimise automatiquement les images (compression, format WebP), les redimensionne et applique le lazy-loading (chargement différé) pour les images qui ne sont pas visibles à l'écran.
-   **Chargement asynchrone (Suspense & `dynamic`) :** Les composants lourds comme le visualiseur 3D (`ModelCanvas`) ou qui dépendent de hooks spécifiques au client (`PortfolioPage` avec `useSearchParams`) sont chargés de manière asynchrone avec `dynamic` et `Suspense`. Cela permet d'afficher le reste de la page rapidement pendant que ces composants se chargent, avec un fallback visuel (squelette de chargement).
-   **Minification & Bundling :** Le processus de build de Next.js (`npm run build`) minifie automatiquement le code (HTML, CSS, JS) et le découpe en "chunks" (morceaux) optimisés, ne chargeant que le code nécessaire pour la page actuelle.
-   **Déploiement sur Vercel Edge :** Le déploiement sur Vercel permet de bénéficier de leur réseau CDN mondial, qui met en cache le contenu au plus près des utilisateurs pour des temps de réponse réduits.

---

# 5. Annexes

### 5.1 Système de téléchargement de CV
La page "À propos" propose un sélecteur permettant à l'utilisateur de choisir entre deux versions du CV : "Designer" et "Imprimable".
- **Composants :** La sélection est gérée par le composant `RadioGroup` de ShadCN, assurant l'accessibilité et une bonne expérience utilisateur.
- **Logique Client :** La logique de téléchargement est entièrement gérée côté client dans le composant `AboutPage.tsx`. Un état React (`selectedCv`) stocke le choix de l'utilisateur.
- **Déclenchement :** Au clic sur le bouton "Télécharger", la fonction `handleDownload` crée dynamiquement un élément `<a>` en JavaScript. L'attribut `href` est défini sur le chemin du fichier PDF correspondant (`/document/cv-designer.pdf` ou `/document/cv-printable.pdf`) et l'attribut `download` est utilisé pour spécifier le nom du fichier. Un clic programmatique sur ce lien (`link.click()`) déclenche le téléchargement par le navigateur, sans rechargement de page.

### 5.2 Preloader animé
Pour améliorer l'expérience de premier chargement et masquer la latence initiale, un preloader animé a été mis en place.
- **Rôle :** Il sert à la fois d'indicateur de chargement et d'élément de branding, créant une première impression soignée.
- **Composant :** La logique est encapsulée dans `src/components/ui/preloader.tsx`.
- **Fonctionnement :**
    1.  Le composant utilise un hook `useEffect` avec des `setTimeout` pour créer une séquence d'animations.
    2.  Il affiche d'abord une simulation de terminal de chargement, où des lignes de texte apparaissent une par une avec un effet de frappe.
    3.  Une fois la séquence de texte terminée, le logo SVG apparaît avec une animation de "dessin" (`stroke-dasharray` et `stroke-dashoffset`).
    4.  Enfin, le nom s'affiche en fondu.
- **Intégration :** Le preloader est géré par `ClientWrapper.tsx`, qui garantit qu'il reste affiché pendant une durée minimale (3 secondes) pour que l'animation puisse se terminer, même si le site charge plus vite.

### 5.3 Intégration des icônes
Pour une cohérence visuelle et une performance optimale, le projet utilise deux bibliothèques d'icônes principales :
- **`lucide-react` :** Utilisée pour toutes les icônes d'interface (navigation, boutons, etc.). C'est une bibliothèque légère, bien conçue et "tree-shakable", ce qui signifie que seules les icônes utilisées sont incluses dans le bundle final.
- **`@icons-pack/react-simple-icons` :** Spécifiquement utilisée pour afficher les logos des technologies et des marques (par exemple, React, Blender, Figma). Cela garantit que les logos sont officiels et facilement reconnaissables.

Cette approche permet de maintenir une interface propre tout en affichant des logos de marques précis là où c'est nécessaire.

### 5.4 Historique des versions (Changelog)
Le projet suit les bonnes pratiques de gestion des versions en maintenant un fichier `CHANGELOG.md` à la racine.
- **Format :** Le journal des modifications est basé sur les conventions de [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
- **Versioning :** Le projet adhère à la [Gestion Sémantique de Version (SemVer)](https://semver.org/spec/v2.0.0.html). Chaque version est taguée et documente les ajouts (`Added`), corrections (`Fixed`), ou modifications (`Changed`).
- **Utilité :** Ce fichier permet à quiconque (recruteur, développeur) de suivre l'évolution du projet, de comprendre les décisions prises et de voir le rythme des améliorations.

---

# 6. Conformité & Licence

Cette section détaille les mesures prises pour assurer la conformité légale du site, notamment avec le RGPD, et définit la licence sous laquelle le code source est distribué.

### 6.1 Gestion du Consentement (RGPD)

La conformité avec le Règlement Général sur la Protection des Données (RGPD) est une priorité. Le site met en œuvre un mécanisme de consentement explicite de l'utilisateur avant d'activer tout service susceptible de collecter des données personnelles ou de déposer des cookies non essentiels.

-   **Composant `CookieConsentBanner` :** Ce composant React, situé dans `src/components/cookie-consent-banner.tsx`, est responsable de l'affichage d'une bannière en bas de l'écran lors de la première visite d'un utilisateur.
-   **Hook `useCookie` :** Un hook personnalisé (`src/hooks/use-cookie.ts`) gère la lecture et l'écriture du choix de l'utilisateur dans le `localStorage` du navigateur. Ce hook est conçu pour fonctionner de manière isomorphique (côté serveur et client) sans causer d'erreurs d'hydratation.
-   **Logique de consentement conditionnel :** Dans le layout racine (`src/app/layout.tsx`), le chargement des scripts externes (Google Tag Manager, Vercel Analytics) est conditionné par la valeur du cookie de consentement. Si l'utilisateur n'a pas accepté, ces scripts ne sont tout simplement pas injectés dans le DOM, garantissant ainsi qu'aucune donnée n'est envoyée à ces services tiers sans permission.

### 6.2 Mentions Légales

Le contenu de la page `/legal-notice` est géré de manière centralisée dans le fichier `src/lib/content.ts` pour faciliter la maintenance et la traduction. Voici le contenu actuel :

-   **Éditeur du site :**
    -   **Nom & Prénom :** Chartrain Donovan
    -   **Adresse :** 84410, Bédoin, France
    -   **Email :** donovan.chartrain@gmail.com
    -   **Téléphone :** +33 6 43 88 39 60
-   **Hébergement :**
    -   Le site est hébergé par Vercel Inc., dont le siège social est situé à 340 S Lemon Ave #4133 Walnut, CA 91789, et joignable à l'adresse mail privacy@vercel.com.
-   **Propriété intellectuelle :**
    -   L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
-   **Données personnelles :**
    -   Les informations recueillies via le formulaire de contact sont nécessaires pour répondre à votre demande et ne sont pas transmises à des tiers.

### 6.3 Politique de Confidentialité

Le contenu de la page `/privacy-policy` détaille de manière transparente la collecte et l'utilisation des données.

-   **Introduction :** Engagement à protéger la vie privée des utilisateurs.
-   **Collecte des données :**
    -   **Données fournies par l'utilisateur :** Nom, email, message via le formulaire de contact.
    -   **Données de l'Assistant IA (AURIA) :** Les conversations sont envoyées à l'API de Google pour traitement mais ne sont pas stockées sur le serveur du portfolio.
    -   **Données collectées par des tiers :** Vercel Analytics et YouTube (via le mode de confidentialité avancée) sous réserve du consentement.
-   **Utilisation des données :** Exclusivement pour répondre aux demandes, faire fonctionner l'IA et améliorer le site (avec consentement).
-   **Politique des Cookies :** Description des cookies nécessaires et des cookies d'analyse (soumis à consentement). Explication sur la manière de gérer les préférences.
-   **Droits de l'utilisateur :** Rappel des droits d'accès, de rectification, d'effacement, etc., conformément au RGPD.
-   **Sécurité et Modifications :** Engagement sur la sécurité des données et information sur les futures modifications de la politique.

### 6.4 Licence du code source

Le code source de ce portfolio est mis à disposition sous la **Licence MIT**.

**En résumé, cela signifie que vous êtes libre de :**
-   **Utiliser** le code à des fins commerciales ou privées.
-   **Modifier** le code pour l'adapter à vos besoins.
-   **Distribuer** le code.
-   **Sous-licencier** le code.

**À la seule condition de :**
-   **Inclure l'avis de droit d'auteur et la déclaration de licence** originale dans toute copie substantielle du logiciel.

Le code est fourni "tel quel", sans garantie d'aucune sorte. Pour le texte complet de la licence, veuillez vous référer à un fichier `LICENSE` qui pourrait être ajouté à la racine du projet.
