# Plan Directeur de Refonte Next.js

## 1. Objet du document

Ce document sert a la fois de :

- backlog de refonte technique,
- suivi d'avancement,
- journal d'intervention,
- base du rapport final de fin de chantier.

L'objectif est de stabiliser, corriger et optimiser completement le projet **avant toute mise a jour du contenu**.

## 2. Cible technique

- **Framework actuel du projet** : `Next.js 16.2.4`
- **Version cible atteinte** : `Next.js 16.2.4` (derniere version stable verifiee le **28 avril 2026**)
- **Source officielle de reference** :
  - [Next.js Releases - GitHub](https://github.com/vercel/next.js/releases)
  - [Guide officiel de mise a jour Next.js](https://nextjs.org/docs/app/getting-started/upgrading)

## 3. Regles du chantier

1. La stabilisation technique passe avant la mise a jour editoriale.
2. Toute page doit rester **statique par defaut** tant qu'un besoin dynamique n'est pas strictement justifie.
3. Toute logique dynamique doit etre isolee cote serveur ou dans de petits ilots clients clairement identifies.
4. Les regressions SEO, accessibilite, build, performances et hydration sont prioritaires.
5. Le projet doit rester buildable et testable a chaque etape.

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
- `npm test` : OK
- `npm run build` : OK

### 5.3 Strategie de rendu constatee

- Pages principales rendues en statique
- Pages de detail projets et visualizer pre-generees en SSG
- Routes API dynamiques limitees a :
  - `/api/chatbot`
  - `/api/contact`

### 5.4 Decision d'architecture deja validee

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
- Strategie de tests, QA et non-regression
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
- [DONE] Verifier le comportement `dev`, `build`, `metadata`, `route handlers`, `RSC`, `images` et rendu statique
- [DONE] Adapter la configuration ESLint a la forme flat native de `eslint-config-next@16`
- [DONE] Corriger l'echec Turbopack lie au `src/app/favicon.ico` invalide
  - Commentaire : Turbopack a revele un vrai probleme d'asset jusque-la silencieux. Le projet s'appuie maintenant uniquement sur les icones declarees via les metadata.
- [DONE] Integrer les ajustements automatiques imposes par Next 16 dans `tsconfig.json`
  - Commentaire : Next 16 a force `jsx: react-jsx` et a ajoute `.next/dev/types/**/*.ts` dans `include`. Ces changements ont ete conserves.
- [TODO] Documenter les arbitrages de migration

### Notes de suivi

- La migration vers `Next 16.2.4` est validee.
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
- [TODO] Evaluer le maintien ou le remplacement de `Genkit`
- [TODO] Evaluer le maintien de `nodemailer` et ses risques
- [TODO] Normaliser les versions `devDependencies`
- [TODO] Definir une politique de mise a jour et de verrouillage des versions
- [TODO] Nettoyer les scripts npm et les conventions de verification

### Notes de suivi

- `npm install` a ete resynchronise avec les nouvelles declarations.
- L'environnement Node a ete mis a jour par l'utilisateur et le projet voit desormais `Node v25.9.0`.
  - Commentaire : le point de compatibilite moteur detecte precedemment n'est plus bloquant.

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
- [TODO] Revoir `home`, `about`, `contact` et `project-detail` pour extraire les derniers ilots clients
- [TODO] Mesurer composant par composant ce qui doit vraiment rester client
- [TODO] Documenter les regles d'architecture server/client du projet

### Notes de suivi

- La structure de rendu reste saine apres remise en route du lint et du build.
- Les routes principales sont toujours statiques, les routes detail restent en SSG, et seules les routes API restent dynamiques.

### Validation

- Toutes les pages non interactives restent statiques
- Les composants clients sont isoles et justifies
- Les donnees locales ne transitent plus par des fetchs artificiels

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
- [TODO] Definir un schema clair pour `server components`, `client components` et `route handlers`

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
- **Statut** : `[IN PROGRESS]`
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
- [TODO] Revoir la configuration `serverExternalPackages`
- [TODO] Ajouter une gestion d'erreurs plus robuste cote route API
- [TODO] Definir timeouts, fallback UX et limites d'usage
- [TODO] Evaluer la maintenabilite de `Genkit` dans ce projet
- [TODO] Evaluer une simplification ou un remplacement si la dette reste trop forte

### Notes de suivi

- Le lot actuel a aussi permis de corriger le typage des `catch` sur le chatbot et d'eliminer des erreurs lint bloquantes.
- Le chatbot n'est plus un point de fragilite du build, mais il reste un point de vigilance architectural tant que `Genkit` reste dans le perimetre.

### Validation

- Zero warning critique lie au chatbot au lancement
- Aucun code IA serveur embarque cote client
- UX stable en cas d'erreur ou de reponse lente

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
- **Statut** : `[TODO]`
- **Objectif** : donner au projet un filet de securite suffisant pour poursuivre la refonte.

### Perimetre

- Jest
- tests data
- composants critiques
- pages critiques
- API routes

### Taches

- [DONE] Retrouver un etat ou les tests passent
- [DONE] Retrouver un `build` vert sans masquer les erreurs TypeScript ou ESLint
  - Commentaire : le build passe desormais apres suppression des bypass de configuration.
- [DONE] Mettre en place une base de lint exploitable et compatible avec la migration Next 16
- [DONE] Nettoyer le lot initial de warnings et erreurs ESLint qui polluaient la lecture du projet
  - Commentaire : une large partie de la dette etait du bruit de code mort ou d'anciens imports. Cette passe ameliore fortement la lisibilite avant la refonte fonctionnelle.
- [TODO] Cartographier la couverture existante
- [TODO] Ajouter des tests unitaires sur le chargement de contenu / projets
- [TODO] Ajouter des tests sur les routes API critiques
- [TODO] Ajouter des tests d'integration sur pages importantes
- [TODO] Evaluer un socle E2E
- [TODO] Formaliser une checklist QA de release

### Notes de suivi

- Etat courant :
  - `npm run typecheck` : OK
  - `npm run build` : OK
  - `npm run lint` : OK
- Le projet dispose maintenant d'une chaine de verification complete et exploitable pour la suite du chantier.

### Validation

- Couverture renforcee sur les zones a risque
- Regressions detectables avant livraison

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
- [DONE] `npm test`
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
