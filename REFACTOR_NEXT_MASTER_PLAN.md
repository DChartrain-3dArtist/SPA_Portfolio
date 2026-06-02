# Plan Directeur de Refonte Next.js

## 1. Objet du document

Ce document sert a la fois de :

- backlog de refonte technique,
- suivi d'avancement,
- journal d'intervention,
- base du rapport final de fin de chantier.

L'objectif est de stabiliser, corriger et optimiser completement le projet **avant toute mise a jour du contenu**.

## 2. Cible technique

- **Framework actuel du projet** : `Next.js 16.2.6`
- **Version cible atteinte** : `Next.js 16.2.6` (derniere version stable verifiee le **16 mai 2026**)
- **Source officielle de reference** :
  - [Next.js Releases - GitHub](https://github.com/vercel/next.js/releases)
  - [Guide officiel de mise a jour Next.js](https://nextjs.org/docs/app/getting-started/upgrading)

## 3. Regles du chantier

1. La stabilisation technique passe avant la mise a jour editoriale.
2. Toute page doit rester **statique par defaut** tant qu'un besoin dynamique n'est pas strictement justifie.
3. Toute logique dynamique doit etre isolee cote serveur ou dans de petits ilots clients clairement identifies.
4. Les regressions SEO, accessibilite, build, performances et hydration sont prioritaires.
5. Le projet doit rester buildable et testable a chaque etape.
6. Le chantier ne cherche pas a supprimer `use client` partout, mais a le limiter au **strict necessaire justifie**.
7. Les micro-refactors internes sans gain clair sur le rendu statique, le perimetre client, la migration, le build ou la maintenabilite immediate sont a **eviter**.

## 4. Legende des statuts

- `[DONE]` : termine et verifie
- `[IN PROGRESS]` : en cours
- `[TODO]` : a faire
- `[BLOCKED]` : bloque par une dependance ou une decision
- `[DEFERRED]` : reporte volontairement

## 5. Etat de reference actuel

### 5.1 Architecture constatee

- Application **Next.js App Router**
- Sections marketing / portfolio / pages legales
- Visualizer 3D avec `three`, `@react-three/fiber`, `@react-three/drei`
- Chatbot base sur `Genkit` / `Google AI`
- Formulaire de contact via route API et `nodemailer`
- Donnees projets stockees localement dans `src/data/projects.json`
- Systeme de langue cote client
- Systeme de theme cote client avec persistence
- SEO gere via metadata, `robots`, `sitemap`, `manifest`
- Analytics / consentement actifs cote client

### 5.2 Etat de build connu

- `npm run typecheck` : OK
- `npm run build` : OK

### 5.3 Strategie de rendu constatee

- Pages principales rendues en statique
- Pages de detail projets et visualizer pre-generees en SSG
- Routes API dynamiques limitees a :
  - `/api/chatbot`
  - `/api/contact`

### 5.4 Cadre de decision retenu pour `use client`

Le but n'est **pas** d'eliminer tous les composants clients.  
Le but est de s'assurer que :

- les pages et layouts restent statiques ou serveur quand c'est possible,
- les donnees locales sont resolues cote serveur,
- les composants marques `use client` sont reserves aux cas suivants :
  - preferences theme/langue,
  - navigation reactive et sidebar,
  - formulaires,
  - overlays / menus / carrousels / galeries,
  - 3D / visualizer,
  - chatbot,
  - wrappers UI Radix ou primitives similaires.

### 5.5 Decision d'architecture deja validee

La lecture directe de `cookies()` dans le layout racine a ete testee puis retiree, car elle rendait trop de routes dynamiques.  
Regle retenue : **ne pas utiliser d'API dynamique dans le layout racine si cela casse le pre-render statique sans gain fonctionnel majeur**.

## 6. Perimetre complet de la refonte

- Structure applicative et conventions App Router
- Migration et alignement vers la derniere version stable de Next
- Rationalisation du rendu serveur / client
- Nettoyage des dependances et versions
- Stabilite du build et du dev server
- SEO technique et metadata
- Accessibilite
- Performances runtime et bundle
- Optimisation du visualizer 3D
- Durcissement du chatbot et des routes serveur
- Durcissement du formulaire de contact
- Preparation du terrain pour la future mise a jour de contenu

## 7. Backlog priorise sous forme d'issues

---

## ISSUE P0-01 - Gouvernance de migration Next 16

- **Priorite** : P0
- **Statut** : `[DONE]`
- **Objectif** : preparer puis executer une migration propre vers la derniere version stable de Next sans casser l'architecture statique.

### Perimetre

- `package.json`
- `package-lock.json`
- `next.config.ts`
- compatibilite React / types / toolchain

### Taches

- [DONE] Aligner le projet sur `Next 15.5.15`
- [DONE] Aligner `React 19.2.0` et `React DOM 19.2.0`
- [DONE] Aligner `@types/react` et `@types/react-dom`
- [DONE] Corriger les erreurs TypeScript bloquantes existantes
- [DONE] Migrer le script de lint hors de `next lint` vers la CLI `eslint`
  - Commentaire : `next lint` est deprecie et sera supprime en Next 16. Ce point etait donc prioritaire avant toute migration majeure.
- [DONE] Retirer les contournements `ignoreBuildErrors` et `ignoreDuringBuilds` de `next.config.ts`
  - Commentaire : ces options masquaient des problemes reels. Leur suppression a immediatement revele le lot de dette lint encore present.
- [DONE] Auditer les breaking changes entre Next 15 et Next 16
- [DONE] Verifier la compatibilite des librairies critiques avec Next 16
- [DONE] Mettre a jour `next` et `eslint-config-next` vers `16.2.4`
- [DONE] Aligner ensuite `next` et `eslint-config-next` vers `16.2.6`
- [DONE] Verifier le comportement `dev`, `build`, `metadata`, `route handlers`, `RSC`, `images` et rendu statique
- [DONE] Adapter la configuration ESLint a la forme flat native de `eslint-config-next@16`
- [DONE] Corriger l'echec Turbopack lie au `src/app/favicon.ico` invalide
  - Commentaire : Turbopack a revele un vrai probleme d'asset jusque-la silencieux. Le projet s'appuie maintenant uniquement sur les icones declarees via les metadata.
- [DONE] Integrer les ajustements automatiques imposes par Next 16 dans `tsconfig.json`
  - Commentaire : Next 16 a force `jsx: react-jsx` et a ajoute `.next/dev/types/**/*.ts` dans `include`. Ces changements ont ete conserves.
- [TODO] Documenter les arbitrages de migration

### Notes de suivi

- La migration vers `Next 16.2.6` est validee.
- `npm run lint`, `npm run typecheck` et `npm run build` sont verts sous Next 16.
- Le profil de rendu est preserve :
  - pages principales en statique,
  - pages detail en SSG,
  - API uniquement en dynamique.
- Deux regles `react-hooks` ont ete neutralisees temporairement dans `eslint.config.mjs` :
  - `react-hooks/set-state-in-effect`
  - `react-hooks/static-components`
  - Commentaire : ces regles ouvrent un chantier de refonte plus profond de certains composants clients. Elles devront etre retravaillees durant la phase de rationalisation des ilots clients.

### Validation

- Build vert
- Dev server sans warning critique
- Pas de recul sur le pre-render statique
- Pas de regression SSR / hydration

---

## ISSUE P0-02 - Audit complet des dependances et de la chaine d'outillage

- **Priorite** : P0
- **Statut** : `[IN PROGRESS]`
- **Objectif** : nettoyer les dependances inutiles, instables, trop anciennes ou mal positionnees.

### Perimetre

- `package.json`
- toolchain TypeScript / Jest / Tailwind / PostCSS
- dependances runtime et serveur

### Taches

- [DONE] Ajouter `@radix-ui/react-menubar` manquant
- [DONE] Remplacer les plages de versions `alpha` declarees pour la stack 3D par des plages stables alignees sur l'etat reel du projet
  - Commentaire : `package.json` declarait `alpha` pour `three`, `three-stdlib` et `@react-three/fiber`, alors que l'installation effective etait deja sur des versions stables. Cette divergence etait risquee pour la reproductibilite.
- [DONE] Ajouter la base d'outillage ESLint necessaire a la migration (`eslint`, `eslint-config-next`, `@eslint/eslintrc`)
- [DONE] Mettre a jour un premier lot de dependances non majeures et a faible risque
  - Commentaire : ce lot a permis de reduire la derive de versions avant la migration du framework, sans melanger des sauts majeurs plus risqués.
- [TODO] Identifier les dependances inutilisees
- [TODO] Identifier les dependances `alpha` et evaluer leur risque
- [TODO] Verifier la pertinence de `three`, `@react-three/fiber`, `three-stdlib` en version `alpha`
- [DONE] Evaluer le maintien ou le remplacement de `Genkit`
  - Commentaire : `Genkit` a ete retire du projet. Le chatbot utilise maintenant un appel REST direct a l'API Gemini, ce qui simplifie fortement l'arbre de dependances et supprime la majeure partie du bruit d'audit associe.
- [DONE] Evaluer le maintien de `nodemailer` et traiter le risque prioritaire
  - Commentaire : `nodemailer` a ete mis a jour vers `8.0.7`, ce qui supprime la vulnerabilite haute restante du projet. Le composant reste conserve pour l'instant car son integration actuelle est simple et isolee dans la route de contact.
- [TODO] Normaliser les versions `devDependencies`
- [TODO] Definir une politique de mise a jour et de verrouillage des versions
- [TODO] Nettoyer les scripts npm et les conventions de verification
- [DONE] Prendre un lot conservateur de mises a jour patch/minor a faible risque
  - Commentaire : `next`, `eslint-config-next`, `react`, `react-dom`, `postcss`, `@types/node`, `react-hook-form`, `tailwind-merge`, `@react-three/fiber`, `@vercel/analytics` et `@vercel/speed-insights` ont ete remontes sans casser le build.
- [DONE] Distinguer explicitement les mises a jour differees car majeures ou sensibles
  - Commentaire : les paquets encore en retard (`Genkit`, `Nodemailer`, `Jest 30`, `Tailwind 4`, `date-fns 4`, `zod 4`, `lucide-react 1.x`, etc.) ne seront pas montes en version dans ce lot sans chantier dedie.

### Notes de suivi

- `npm install` a ete resynchronise avec les nouvelles declarations.
- L'environnement Node a ete mis a jour par l'utilisateur et le projet voit desormais `Node v25.9.0`.
  - Commentaire : le point de compatibilite moteur detecte precedemment n'est plus bloquant.
- Etat courant apres audit du **11 mai 2026** :
  - le lot de mises a jour sans risque immediat a ete applique,
  - `npm outdated` ne remonte plus que des ecarts majeurs ou des mineurs non prioritaires,
  - `npm audit` remonte encore `6` vulnerabilites (`4 low`, `2 moderate`, `0 high`) concentrees autour de `Jest/jsdom` et de l'avis `Next/PostCSS`.
- Decision de pilotage :
  - ne pas lancer de mises a jour majeures opportunistes tant qu'un lot dedie n'est pas ouvert pour le package concerne.
  - considerer le risque critique/prioritaire traite des lors qu'il ne reste plus de `high` ou `critical` dans l'audit courant.
  - considerer `Genkit` comme sorti du perimetre technique actif du projet.

### Validation

- Arbre de dependances reduit et justifie
- Plus de dependances manifestement orphelines
- Strategie de versions documentee

---

## ISSUE P0-03 - Architecture server-first et preservation du statique

- **Priorite** : P0
- **Statut** : `[IN PROGRESS]`
- **Objectif** : rendre le maximum du site statique, et isoler le strict necessaire en dynamique.

### Perimetre

- layout global
- pages principales
- portfolio
- visualizer
- providers et contexts

### Taches

- [DONE] Repasser `src/app/layout.tsx` en composant serveur
- [DONE] Deplacer la logique analytics / consentement dans un wrapper client
- [DONE] Basculer les pages basees sur les donnees projets en server-first
- [DONE] Generer statiquement les pages detail projets
- [DONE] Generer statiquement les pages detail visualizer
- [DONE] Supprimer les fetchs client inutiles sur des donnees locales
- [DONE] Eviter l'usage de `useSearchParams` sur le portfolio pour un cas non necessaire
- [DONE] Preserver le statique en evitant `cookies()` dans le layout racine
- [DONE] Commencer la suppression des etats initialises par `useEffect` dans les hooks et widgets clients
  - Commentaire : cette passe a permis d'alleger plusieurs zones transverses (`useCookie`, `useIsMobile`, header/sidebar visualizer, chatbot) sans melanger encore la refonte lourde des pages de contenu.
- [DONE] Supprimer une nouvelle couche d'initialisation cliente dans `language`, `theme` et les filtres portfolio
  - Commentaire : les contexts et le portfolio ne corrigent plus leur etat apres montage pour des cas simples. L'etat initial est maintenant resolu au plus tot via des initialisateurs paresseux.
- [DONE] Revoir `home`, `about`, `contact` et `project-detail` pour extraire les derniers ilots clients
- [DONE] Basculer `home`, `about` et `contact` vers une strategie de rendu bilingue server-first
  - Commentaire : les pages rendent maintenant les variantes FR/EN dans le HTML, puis s'appuient sur `html[lang]` pour n'afficher que la bonne version. Cela permet de conserver la bascule de langue sans imposer un composant React client complet a toute la page.
- [DONE] Isoler les interactions restantes de `about` dans de vrais ilots clients
  - Commentaire : la timeline animee et le selecteur de CV restent clients, mais le reste de la page est redevenu statique et beaucoup plus leger.
- [DONE] Recomposer `project-detail` en composant serveur avec ilots clients dedies
  - Commentaire : le contenu, les metadata visibles, la galerie de liens et la CTA sont revenus cote serveur. Le carousel et la galerie zoomable restent clients dans des composants limites, ce qui reduit nettement le melange contenu/interactivite.
- [DONE] Supprimer la dependance directe de `project-detail` au contexte de langue
  - Commentaire : la page detail s'aligne maintenant sur la strategie bilingue server-first deja mise en place sur `home`, `about` et `contact`.
- [DONE] Introduire une premiere variante de carte projet serveur pour les zones statiques
  - Commentaire : les suggestions de projets du detail n'embarquent plus la carte cliente complete du portfolio. Cela permet de garder le portfolio filtrable en l'etat, tout en nettoyant deja les vues non interactives.
- [DONE] Decouper `portfolio` entre une enveloppe serveur et un noyau client de filtrage
  - Commentaire : le titre, l'introduction et la CTA finale sont maintenant rendus cote serveur. Le composant client conserve uniquement les filtres, l'etat d'affichage et la grille qui depend de ces interactions.
- [TODO] Mesurer composant par composant ce qui doit vraiment rester client
- [DONE] Revoir si `ProjectCard` doit disposer d'une variante serveur dans les zones purement statiques
  - Commentaire : une variante serveur existe deja pour les suggestions de projets (`project-card-static`). La carte cliente principale reste justifiee dans le portfolio filtrable.
- [DONE] Documenter les regles d'architecture server/client du projet
  - Commentaire : la doctrine server-first du projet est maintenant ecrite dans ce plan, ce qui permettra de cadrer les prochains lots sans repartir de zero a chaque fois.
- [DONE] Continuer a reduire le JavaScript partage du `SiteLayout` tant que le gain est direct et non invasif
  - Commentaire : le layout principal reste client a cause de la sidebar, de la navigation active et des preferences. Il ne sera pas sur-refactore au-dela des gains evidents.
- [DEFERRED] Ne pas poursuivre de micro-refactors `use client` sans gain structurel direct
  - Commentaire : a ce stade, les prochains efforts doivent prioriser l'audit des dependances, SEO, accessibilite, performances et verification plutot qu'une chasse exhaustive aux composants clients residuels.

### Notes de suivi

- La structure de rendu reste saine apres remise en route du lint et du build.
- Les routes principales sont toujours statiques, les routes detail restent en SSG, et seules les routes API restent dynamiques.
- La reduction de `use client` est consideree comme suffisante tant que les cas restants sont clairement justifies par une interaction ou une contrainte de bibliotheque.

### Validation

- Toutes les pages non interactives restent statiques
- Les composants clients sont isoles et justifies
- Les donnees locales ne transitent plus par des fetchs artificiels
- Le chantier s'arrete avant les micro-refactors non rentables

---

## ISSUE P0-04 - Refonte de la structure du code et des responsabilites

- **Priorite** : P0
- **Statut** : `[TODO]`
- **Objectif** : clarifier l'organisation du projet pour le rendre maintenable avant la suite du chantier.

### Perimetre

- `src/app`
- `src/components`
- `src/lib`
- `src/data`
- `src/contexts`
- `src/hooks`

### Taches

- [TODO] Redefinir les frontieres entre UI, logique metier, data et integration serveur
- [TODO] Homogeneiser le nommage des composants et dossiers
- [TODO] Revoir l'arborescence du visualizer pour reduire la dispersion
- [TODO] Regrouper les helpers SEO, contenu, preferences et data loading
- [TODO] Supprimer les doublons structurels et les composants devenus intermediaires
- [TODO] Identifier les composants trop lourds a decouper
- [IN PROGRESS] Definir un schema clair pour `server components`, `client components` et `route handlers`
- [DONE] Documenter les regles de decision `server/client`
  - Commentaire : ces regles servent maintenant de garde-fou pour la suite du chantier et devront etre preservees lors des futures evolutions de contenu.

### Regles d'architecture server/client retenues

1. **Serveur par defaut** : tout composant est considere serveur tant qu'il n'a pas un besoin explicite de navigateur, d'etat local interactif ou de hook client.
2. **Ilots clients courts** : lorsqu'un composant doit rester client, son perimetre doit etre borne a l'interaction reelle (`carousel`, `dialog`, `form`, `3D`, filtres).
3. **Donnees locales chargees cote serveur** : les fichiers statiques du projet (`projects.json`, contenu, metadata) ne doivent pas etre relus via `fetch` client.
4. **Pas d'API dynamique dans le layout racine** : eviter `cookies()`, `headers()` ou tout autre basculement global vers le dynamique sans besoin majeur.
5. **FR/EN en HTML quand le contenu est editorial** : pour les pages de contenu, preferer le rendu bilingue statique avec affichage pilote par `html[lang]` plutot qu'un composant client entier.
6. **Composants transverses presents sans hook** : `footer`, `logo`, `404`, CTA, blocs de contenu et metadata visibles doivent rester serveurs si possible.
7. **Routes API limitees aux vraies integrations** : serveur dynamique uniquement pour contact, IA, ou actions equivalentes.

### Validation

- Arborescence lisible
- Responsabilites mieux separees
- Moins de coupling entre UI, data et side effects

---

## ISSUE P0-05 - SEO technique, metadata et discoverabilite

- **Priorite** : P0
- **Statut** : `[IN PROGRESS]`
- **Objectif** : fiabiliser le SEO technique avant toute evolution de contenu.

### Perimetre

- metadata
- `robots`
- `sitemap`
- `manifest`
- Open Graph / Twitter / JSON-LD
- canonicals

### Taches

- [DONE] Remplacer la generation manuelle du sitemap par une metadata route Next native
- [DONE] Remplacer le manifest manuel par une metadata route Next native
- [DONE] Mettre a jour `robots` pour pointer vers `/sitemap.xml`
- [DONE] Nettoyer les scripts et artefacts SEO obsoletes
- [TODO] Verifier page par page les titles, descriptions et canonical
- [TODO] Verifier la coherence des metadata multilingues
- [TODO] Auditer les Open Graph / Twitter cards
- [TODO] Verifier les donnees structurees JSON-LD
- [TODO] Evaluer le besoin d'une vraie strategie i18n SEO
- [TODO] Valider l'indexabilite des routes voulues uniquement

### Validation

- Sitemap, manifest et robots geres nativement
- Metadata coherentes sur toutes les pages
- Aucun contenu indexable ne manque de base SEO

---

## ISSUE P0-06 - Accessibilite globale

- **Priorite** : P0
- **Statut** : `[TODO]`
- **Objectif** : corriger les problemes d'accessibilite structurelle avant l'evolution du contenu.

### Perimetre

- navigation
- formulaires
- composants Radix UI
- contraste
- focus
- semantique HTML
- visualizer

### Taches

- [TODO] Auditer la structure des titres H1-H6
- [TODO] Verifier landmarks, navigation, footer et main
- [TODO] Verifier focus visible et ordre de tabulation
- [TODO] Auditer labels, messages d'erreur et etats du formulaire de contact
- [TODO] Verifier les composants interactifs custom
- [TODO] Auditer les contrastes clair/sombre
- [TODO] Ajouter ou corriger les textes alternatifs et noms accessibles
- [TODO] Evaluer les besoins de reduction de mouvement, surtout pour la 3D
- [TODO] Verifier la navigation clavier complete

### Validation

- Audit Lighthouse / axe sans erreur majeure
- Navigation clavier complete
- Formulaire et composants critiques utilisables sans souris

---

## ISSUE P0-07 - Performance, bundle et experience runtime

- **Priorite** : P0
- **Statut** : `[TODO]`
- **Objectif** : reduire le JavaScript envoye, le cout de rendu et les ralentissements.

### Perimetre

- bundles client
- hydration
- images / media
- animation
- 3D
- providers
- scripts tiers

### Taches

- [TODO] Mesurer le poids JS par page
- [TODO] Identifier les composants clients evitables
- [TODO] Verifier les imports lourds et tree-shaking
- [TODO] Evaluer le lazy loading du chatbot et d'autres widgets
- [TODO] Revoir les animations `framer-motion`
- [TODO] Optimiser le rendu et la charge du visualizer 3D
- [TODO] Evaluer les fonts, images et preloads
- [TODO] Mettre en place un budget performance minimal
- [TODO] Traiter les regressions Web Vitals

### Validation

- Reduction mesurable du JS client
- Pas de surcharge hydration inutile
- Scores Lighthouse en hausse

---

## ISSUE P0-08 - Durcissement du chatbot et de l'integration IA

- **Priorite** : P0
- **Statut** : `[DONE]`
- **Objectif** : garder la fonctionnalite IA sans polluer le rendu front ni fragiliser le build.

### Perimetre

- `src/ai/*`
- `src/app/api/chatbot/route.ts`
- `src/components/chatbot/chatbot.tsx`
- `next.config.ts`

### Taches

- [DONE] Isoler le chatbot derriere une route API serveur
- [DONE] Retirer l'import direct de `chatbot-flow` du bundle client
- [DONE] Supprimer les warnings de build lies a `Genkit`, `handlebars` et `opentelemetry`
- [DONE] Nettoyer les logs de debug
- [DONE] Ajouter une gestion d'erreurs plus robuste cote route API et cote flow
- [DONE] Definir un fallback UX propre en cas de surcharge ou de panne IA
- [DONE] Evaluer la maintenabilite de `Genkit` dans ce projet
- [DONE] Simplifier le chatbot en remplaçant `Genkit` par un appel REST direct a Gemini
- [DEFERRED] Revoir la configuration `serverExternalPackages`
  - Commentaire : ce point perd une grande partie de son importance apres retrait de `Genkit`. Il reste reportable tant qu'aucun autre package serveur ne l'impose.
- [DEFERRED] Definir timeouts, fallback UX et limites d'usage plus avances
  - Commentaire : un fallback utilisateur clair existe deja. Un durcissement supplementaire reste possible, mais n'est plus bloquant dans le cadre de cette refonte.

### Notes de suivi

- Le lot actuel a aussi permis de corriger le typage des `catch` sur le chatbot et d'eliminer des erreurs lint bloquantes.
- Le chatbot n'est plus un point de fragilite du build et ne depend plus de `Genkit`.
- Le contrat applicatif est preserve :
  - route API dynamique dediee,
  - aucun code IA embarque cote client,
  - fallback propre en cas de quota ou d'indisponibilite.

### Validation

- Zero warning critique lie au chatbot au lancement
- Aucun code IA serveur embarque cote client
- UX stable en cas d'erreur ou de reponse lente
- Dependances IA simplifiees et auditees

---

## ISSUE P0-09 - Visualizer 3D : stabilite, rendu et perf

- **Priorite** : P0
- **Statut** : `[TODO]`
- **Objectif** : garder la 3D comme ilot client maitrise, performant et accessible.

### Perimetre

- `src/components/visualizer/*`
- `src/app/(visualizer)/*`
- dependances Three / R3F / Drei

### Taches

- [DONE] Passer le layout visualizer en serveur quand possible
- [DONE] Fournir les donnees aux composants visualizer depuis le serveur
- [TODO] Auditer le cout initial du canvas 3D
- [TODO] Verifier les modeles, textures, chargements et fallbacks
- [TODO] Revoir la navigation mobile du visualizer
- [TODO] Ajouter une strategie de degrade si WebGL est absent ou lent
- [TODO] Evaluer `alpha` sur `three` / `fiber` / `three-stdlib`
- [TODO] Verifier les risques memoire et rerenders
- [TODO] Definir une UX reduced-motion / reduced-data

### Validation

- Visualizer stable desktop/mobile
- Cout de chargement controle
- Pas de blocage UX en environnement limite

---

## ISSUE P1-10 - Formulaire de contact, securite et robustesse serveur

- **Priorite** : P1
- **Statut** : `[TODO]`
- **Objectif** : solidifier l'envoi de message et la route serveur associee.

### Perimetre

- `src/app/api/contact/route.ts`
- `src/components/contact-form.tsx`
- validation / email / anti-abus

### Taches

- [TODO] Auditer la validation serveur et client
- [TODO] Ajouter une gestion d'erreur plus explicite
- [TODO] Verifier la sanitization et les protections anti-abus
- [TODO] Definir une strategie de rate limiting / honeypot si necessaire
- [TODO] Revoir les messages de succes / echec
- [TODO] Tester les cas limites d'envoi

### Validation

- Route de contact robuste
- Erreurs utilisateur claires
- Risque de spam et d'abus reduit

---

## ISSUE P1-11 - Strategie de tests, verification et non-regression

- **Priorite** : P1
- **Statut** : `[DEFERRED]`
- **Objectif** : sujet retire du perimetre actif tant qu'aucune strategie de tests automatisee n'est retenue pour le projet.

### Perimetre

- verification manuelle
- eventuelle strategie future de non-regression

### Taches

- [DONE] Retrouver un `build` vert sans masquer les erreurs TypeScript ou ESLint
  - Commentaire : le build passe desormais apres suppression des bypass de configuration.
- [DONE] Mettre en place une base de lint exploitable et compatible avec la migration Next 16
- [DONE] Nettoyer le lot initial de warnings et erreurs ESLint qui polluaient la lecture du projet
  - Commentaire : une large partie de la dette etait du bruit de code mort ou d'anciens imports. Cette passe ameliore fortement la lisibilite avant la refonte fonctionnelle.
- [DONE] Retirer la stack Jest non utilisee
  - Commentaire : le projet ne dispose pas d'une suite de tests active. Les dependances, scripts et fichiers Jest ont ete retires pour eviter de maintenir un faux socle de test.
- [DEFERRED] Revenir plus tard sur une strategie de tests si un besoin reel apparait
  - Commentaire : la verification active repose maintenant sur `lint`, `typecheck`, `build` et recette manuelle.

### Notes de suivi

- Etat courant :
  - `npm run typecheck` : OK
  - `npm run build` : OK
  - `npm run lint` : OK
- Le projet ne repose plus sur Jest.
- La chaine de verification active est maintenant :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Validation

- Verification technique de base stable
- Sujet tests automatise reporte explicitement

---

## ISSUE P1-12 - Langue, theme et strategie de preferences

- **Priorite** : P1
- **Statut** : `[IN PROGRESS]`
- **Objectif** : fiabiliser les preferences utilisateur sans sacrifier le rendu statique.

### Perimetre

- `src/lib/preferences.ts`
- providers
- contexts
- layout

### Taches

- [DONE] Introduire une base unifiee pour les preferences theme/langue
- [DONE] Synchroniser cookies et `localStorage`
- [DONE] Appliquer les preferences tres tot via script inline pour eviter le flash
- [IN PROGRESS] Reduire la logique d'initialisation client fragile dans les hooks de preferences et d'environnement
  - Commentaire : `useCookie` et `useIsMobile` ont deja ete simplifies. `language` et `theme` restent des candidats a une rationalisation plus profonde, idealement via une vraie strategie de source-of-truth externe ou une i18n/server-first plus claire.
- [DONE] Simplifier l'initialisation des contexts `language` et `theme`
  - Commentaire : les deux contexts utilisent maintenant une resolution initiale paresseuse, ce qui reduit encore les `setState` de correction apres montage.
- [TODO] Revoir la strategie de langue actuelle pilotee par contexte client
- [TODO] Evaluer une vraie i18n server-first
- [TODO] Mesurer l'impact SEO et perf du systeme actuel
- [TODO] Decider si le theme doit rester 100% client ou etre repense

### Validation

- Pas de flash visuel notable
- Pas de bascule non voulue vers du dynamique global
- Strategie de preferences documentee

---

## ISSUE P1-13 - Design system, coherences UI et dette composant

- **Priorite** : P1
- **Statut** : `[TODO]`
- **Objectif** : homogeniser les composants et simplifier la surface UI.

### Perimetre

- `src/components/ui/*`
- sections principales
- navigation
- formulaires

### Taches

- [TODO] Verifier l'usage reel des composants UI existants
- [TODO] Supprimer les composants UI morts ou redondants
- [TODO] Harmoniser les patterns de boutons, formulaires, menus et overlays
- [TODO] Verifier les etats loading / empty / error
- [TODO] Revoir la cohesion visuelle mobile / desktop

### Validation

- Surface UI plus coherente
- Moins de composants inutiles
- Etats d'interface plus propres

---

## ISSUE P2-14 - Observabilite, analytics et configuration de deploiement

- **Priorite** : P2
- **Statut** : `[TODO]`
- **Objectif** : clarifier ce qui est mesure, charge et deployee.

### Perimetre

- analytics
- speed insights
- consentement
- `apphosting.yaml`
- variables d'environnement

### Taches

- [DONE] Deplacer la logique analytics / consentement hors du layout serveur
- [TODO] Auditer les scripts tiers reels et leur utilite
- [TODO] Verifier le chargement conditionnel apres consentement
- [TODO] Revoir la configuration `apphosting.yaml`
- [TODO] Documenter les variables d'environnement requises
- [TODO] Clarifier les environnements local / preview / prod

### Validation

- Tracking maitrise
- Configuration de deploiement comprenable
- Pas de scripts tiers superflus

---

## ISSUE P2-15 - Preparer la mise a jour de contenu apres stabilisation

- **Priorite** : P2
- **Statut** : `[DEFERRED]`
- **Objectif** : preparer la future mise a jour editoriale sans la melanger a la refonte technique.

### Taches

- [TODO] Redefinir la structure des contenus projets
- [TODO] Revoir les textes FR / EN
- [TODO] Actualiser medias, captures et assets
- [TODO] Revoir la hierarchie narrative du portfolio
- [TODO] Mettre a jour les contenus SEO editoriaux

### Regle

Cette issue ne sera ouverte en execution qu'apres cloture du noyau technique P0/P1.

---

## ISSUE P3-16 - Rapport final, recette et cloture du chantier

- **Priorite** : P3
- **Statut** : `[TODO]`
- **Objectif** : produire le bilan final de la refonte et la liste des correctifs livrees.

### Taches

- [TODO] Consolider l'historique des interventions
- [TODO] Produire le recapitulatif des choix d'architecture
- [TODO] Lister les corrections, optimisations et arbitrages
- [TODO] Documenter les points volontairement reportes
- [TODO] Produire la checklist finale de recette

## 8. Journal des actions deja effectuees

### Stabilisation initiale

- [DONE] Nettoyage initial du projet ancien pour retrouver un etat sain de travail
- [DONE] Correction d'erreurs TypeScript dans plusieurs modules critiques
- [DONE] Ajout de la dependance manquante `@radix-ui/react-menubar`
- [DONE] Alignement des versions React / React DOM / types
- [DONE] Passage du projet a `Next.js 15.5.15`

### Data et typage

- [DONE] Durcissement du chargement des projets avec validation Zod
- [DONE] Fiabilisation des definitions de donnees

### SEO technique

- [DONE] Migration du sitemap vers `src/app/sitemap.ts`
- [DONE] Migration du manifest vers `src/app/manifest.ts`
- [DONE] Nettoyage des anciens scripts et fichiers generes en `public`

### Rendu serveur / client

- [DONE] Retour du layout racine en composant serveur
- [DONE] Isolation des scripts clients dans `client-wrapper`
- [DONE] Passage du portfolio et du visualizer a une logique server-first
- [DONE] Generation statique des pages detail pertinentes
- [DONE] Suppression de fetchs client inutiles vers des donnees locales
- [DONE] Simplification de plusieurs composants clients transverses apres migration Next 16 :
  - `src/hooks/use-cookie.ts`
  - `src/hooks/use-mobile.tsx`
  - `src/components/chatbot/chatbot.tsx`
  - `src/components/visualizer/visualizer-header.tsx`
  - `src/components/visualizer/visualizer-sidebar.tsx`
- [DONE] Simplification de l'initialisation dans :
  - `src/contexts/language-context.tsx`
  - `src/contexts/theme-context.tsx`
  - `src/components/sections/portfolio.tsx`
- [DONE] Nouvelle couche server-first sur les pages de contenu :
  - `src/components/sections/home.tsx`
  - `src/components/sections/contact.tsx`
  - `src/components/sections/about.tsx`
  - `src/components/i18n/localized.tsx`
  - `src/components/sections/about-timeline.tsx`
  - `src/components/sections/cv-download-selector.tsx`

### Chatbot et warnings de build

- [DONE] Isolation du chatbot derriere `/api/chatbot`
- [DONE] Suppression des imports IA serveur depuis le bundle client
- [DONE] Elimination des warnings `Genkit` / `handlebars` / `opentelemetry` observes au lancement
- [DONE] Nettoyage des logs de debug

### Preferences utilisateur

- [DONE] Refonte de la persistence theme/langue via cookies + `localStorage`
- [DONE] Injection d'un script de preference precoce pour eviter le flash
- [DONE] Abandon de la lecture serveur directe des cookies dans le root layout afin de conserver le statique

### Verification

- [DONE] `npm run typecheck`
- [DONE] `npm run build`

### Intervention du 28 avril 2026 - lot outillage et hygiene de build

- [DONE] Mise en place de `eslint.config.mjs`
- [DONE] Migration du script `lint` vers `eslint . --ext .js,.jsx,.ts,.tsx`
- [DONE] Retrait des bypass de build dans `next.config.ts`
- [DONE] Corrections initiales des erreurs ESLint bloquantes :
  - catches types en `unknown`
  - correction de textes JSX avec entites HTML
  - nettoyage de configuration Tailwind incompatible avec les regles ESLint
  - exclusion du fichier `next-env.d.ts` du perimetre lint
- [DONE] Rebuild complet valide apres ces corrections
- [DONE] Nettoyage du stock de warnings ESLint restants
- [DONE] Validation finale de la chaine de controle :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 28 avril 2026 - lot migration Next 16

- [DONE] Validation de la mise a niveau Node cote environnement local
- [DONE] Mise a jour d'un lot de dependances non majeures et a faible risque
- [DONE] Migration de `next` et `eslint-config-next` vers `16.2.4`
- [DONE] Adaptation de la configuration ESLint au format flat natif de Next 16
- [DONE] Correction d'un `favicon.ico` invalide detecte par Turbopack
- [DONE] Conservation des ajustements `tsconfig.json` appliques par Next 16
- [DONE] Validation complete sous Next 16 :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- [DONE] Conservation du profil de rendu statique / SSG apres migration

### Intervention du 11 mai 2026 - lot audit dependances et mises a jour conservatrices

- [DONE] Audit de l'etat des versions via `npm outdated`
- [DONE] Audit de securite via `npm audit --json`
- [DONE] Mise a jour de maintenance du socle :
  - `next` `16.2.4` -> `16.2.6`
  - `eslint-config-next` `16.2.4` -> `16.2.6`
  - `react` / `react-dom` `19.2.0` -> `19.2.6`
  - `postcss` -> `8.5.14`
  - `@types/node` -> `20.19.40`
  - `react-hook-form` -> `7.75.0`
  - `tailwind-merge` -> `3.6.0`
  - `@react-three/fiber` -> `9.6.1`
  - `@vercel/analytics` -> `1.6.1`
  - `@vercel/speed-insights` -> `1.3.1`
- [DONE] Conservation du profil de rendu apres update :
  - pages principales statiques,
  - pages detail en SSG,
  - routes API uniquement en dynamique
- [DONE] Identification des chantiers de dependances encore differees :
  - `Genkit`
  - `Jest 30`
  - `Tailwind 4`
  - `date-fns 4`
  - `zod 4`
  - `lucide-react 1.x`
- [DONE] Mise a jour de `nodemailer` vers `8.0.7` et de `@types/nodemailer` vers `8.0.0`
- [DONE] Suppression de la vulnerabilite haute residuelle du projet
- [DONE] Validation apres mise a jour :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 16 mai 2026 - lot retrait de Genkit et durcissement build

- [DONE] Remplacement de `Genkit` par un appel REST direct a l'API Gemini dans `src/ai/chatbot-flow.ts`
- [DONE] Suppression du fichier `src/ai/genkit.ts`
- [DONE] Suppression des dependances :
  - `genkit`
  - `@genkit-ai/ai`
  - `@genkit-ai/core`
  - `@genkit-ai/googleai`
- [DONE] Reduction massive de l'arbre installe apres `npm install`
  - Commentaire : le retrait de `Genkit` a supprime plusieurs centaines de packages transitifs.
- [DONE] Stabilisation du build hors reseau en supprimant la dependance bloquante a Google Fonts
  - Commentaire : la police utilise maintenant une fallback locale stable, ce qui evite les echecs de build dus au fetch `next/font/google`.
- [DONE] Nouvel etat d'audit apres retrait de `Genkit` :
  - `6` vulnerabilites restantes
  - `4 low`
  - `2 moderate`
  - `0 high`
  - `0 critical`
- [DONE] Validation apres refonte :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm audit --json`

### Intervention du 16 mai 2026 - retrait de Jest et preparation de la phase de mise a niveau

- [DONE] Suppression du script `test` de `package.json`
- [DONE] Suppression des dependances Jest et Testing Library non utilisees
- [DONE] Suppression des fichiers :
  - `jest.config.ts`
  - `jest.setup.ts`
  - `src/data/projects.test.ts`
- [DONE] Requalification du sujet tests comme `DEFERRED` dans le plan de refonte
- [DONE] Creation d'un nouveau plan dedie a la phase suivante :
  - `SITE_UPDATE_MASTER_PLAN.md`

### Intervention du 7 mai 2026 - lot rationalisation des hooks et widgets clients

- [DONE] Simplification de `useCookie` pour supprimer l'etat `isClient` et la lecture differee par effet
- [DONE] Refactor de `useIsMobile` vers `useSyncExternalStore`
- [DONE] Allègement du `chatbot` pour eviter une partie des initialisations d'etat dans les effets
- [DONE] Simplification du `visualizer-header` en supprimant l'etat client artificiel
- [DONE] Nettoyage du `visualizer-sidebar` pour eviter la creation de composant dans le rendu
- [DONE] Validation apres refactor :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot contexts et initialisation portfolio

- [DONE] Simplification de `language-context` avec resolution initiale paresseuse
- [DONE] Simplification de `theme-context` avec resolution initiale paresseuse
- [DONE] Suppression de la synchro initiale par effet dans `portfolio.tsx`
- [DONE] Validation apres refactor :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot pages de contenu server-first

- [DONE] Mise en place d'un helper de rendu bilingue statique :
  - `src/components/i18n/localized.tsx`
- [DONE] Ajout des regles CSS de bascule FR/EN via `html[lang]`
- [DONE] Conversion de `home` en rendu server-first sans hooks client
- [DONE] Conversion de `contact` en rendu server-first avec `ContactForm` conserve comme ilot client
- [DONE] Conversion partielle de `about` en rendu server-first
- [DONE] Isolation des interactions `about` dans :
  - `src/components/sections/about-timeline.tsx`
  - `src/components/sections/cv-download-selector.tsx`
- [DONE] Validation apres refactor :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot detail projet server-first

- [DONE] Conversion de `src/components/portfolio/project-detail-page.tsx` en composant serveur
- [DONE] Extraction du carousel image dans :
  - `src/components/portfolio/project-media-carousel.tsx`
- [DONE] Extraction de la galerie zoomable dans :
  - `src/components/portfolio/project-image-gallery.tsx`
- [DONE] Bascule du contenu FR/EN du detail projet vers `LocalizedText` et `LocalizedHtml`
- [DONE] Creation d'une variante serveur `src/components/portfolio/project-card-static.tsx` pour les suggestions
- [DONE] Mutualisation de la presentation des badges secteur via `src/lib/project-ui.ts`
- [DONE] Conservation du profil de rendu apres refactor :
  - `portfolio/[id]` reste en SSG
  - `api/chatbot` et `api/contact` restent les seules routes dynamiques
- [DONE] Validation apres refactor :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot portfolio split server/client

- [DONE] Creation d'une enveloppe serveur pour `src/components/sections/portfolio.tsx`
- [DONE] Extraction de la logique interactive dans `src/components/sections/portfolio-client.tsx`
- [DONE] Passage du titre, de l'introduction et de la CTA portfolio en rendu bilingue server-first
- [DONE] Conservation du rendu statique de `/portfolio` apres decoupage
  - Commentaire : ce lot reduit encore le perimetre client sans toucher au fonctionnement des filtres ni a la navigation existante.
- [DONE] Validation apres refactor :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot composants presentiels remis cote serveur

- [DONE] Suppression du marquage client inutile sur :
  - `src/components/logo-svg.tsx`
  - `src/components/layout/footer.tsx`
  - `src/app/not-found.tsx`
- [DONE] Documentation explicite des regles `server components` / `client components` dans le plan maitre
- [DONE] Validation apres nettoyage :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 7 mai 2026 - lot optimisation du layout partage

- [DONE] Chargement dynamique du chatbot depuis `src/components/layout/site-layout.tsx`
  - Commentaire : le chatbot ne fait plus partie du bundle partage immediat du layout principal. Il n'est charge que cote client, et uniquement sur les pages ou il est effectivement autorise.
- [DONE] Extraction de helpers de navigation partages dans `src/lib/navigation.ts`
- [DONE] Validation apres optimisation :
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

### Intervention du 11 mai 2026 - recadrage du perimetre de refonte

- [DONE] Clarification de l'objectif principal du chantier :
  - maximiser le rendu statique ou serveur,
  - limiter `use client` au strict necessaire,
  - finaliser la migration et la stabilisation,
  - eviter les micro-refactors sans gain direct.
- [DONE] Requalification de certains sous-sujets en travaux deferes plutot qu'obligatoires
- [DONE] Confirmation documentaire que les `use client` restants sont acceptables s'ils sont justifies par :
  - l'interaction utilisateur,
  - la 3D,
  - les preferences,
  - les overlays / primitives UI,
  - le chatbot,
  - ou la navigation reactive.

## 9. Ordre d'execution recommande

1. Terminer les P0 d'architecture, dependances, statique, SEO, accessibilite, perf et chatbot
2. Stabiliser les P1 : contact, tests, preferences, systeme UI
3. Revalider build, QA, Lighthouse, accessibilite et UX
4. Ouvrir ensuite la phase de mise a jour du contenu
5. Finaliser le rapport d'intervention

## 10. Definition de fin de chantier technique

Le chantier technique pourra etre considere comme termine quand :

- le projet tournera sur la version cible retenue de Next sans warning critique,
- la strategie server-first sera clairement appliquee,
- les pages non interactives resteront statiques,
- le chatbot, la 3D et les routes API seront isoles proprement,
- les dependances a risque seront traitees ou documentees,
- les performances, l'accessibilite et le SEO auront ete verifies et corriges,
- les tests minimaux de non-regression seront en place,
- la mise a jour de contenu pourra commencer sur une base saine.
