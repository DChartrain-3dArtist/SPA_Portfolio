# Plan Directeur de Mise a Niveau du Site

## 1. Objet du document

Ce document sert de :

- backlog de mise a jour du site,
- suivi d'avancement,
- plan de travail pour la phase contenu / parcours / integrations,
- base du futur rapport de mise a niveau.

Cette phase prend le relais apres la remise a niveau technique principale.

## 2. Regles de la phase

1. La base technique actuelle ne doit pas etre degradee.
2. Les mises a jour de contenu doivent respecter l'architecture statique / serveur deja mise en place.
3. Les integrations externes doivent etre documentees avant implementation.
4. Les changements de discours doivent rester coherents entre UX, image professionnelle et SEO.
5. Les audits SEO, accessibilite et performance complets pourront etre repris plus tard apres la mise a jour du contenu.
6. Ce site doit etre traite comme le portfolio creatif / 3D / design / experience, tandis que le portfolio web technique vit sur un site compagnon dedie.

## 3. Legende des statuts

- `[TODO]` : a faire
- `[IN PROGRESS]` : en cours
- `[DONE]` : termine et valide
- `[BLOCKED]` : bloque par une information ou une dependance externe
- `[DEFERRED]` : reporte volontairement

---

## ISSUE U0-01 - Mise a jour de la page d'accueil

- **Priorite** : U0
- **Statut** : `[DONE]`
- **Objectif** : repositionner la page d'accueil autour des parcours et CTA prioritaires.

### Taches

- [DONE] Mettre a jour le CTA principal vers le visualiseur
- [DONE] Ajouter un CTA vers le portfolio developpement web externe
- [DONE] Revoir la hierarchie des CTA sur la hero
- [DONE] Revoir les textes d'introduction de la page d'accueil
- [DONE] Ajuster la presentation des parcours prioritaires
- [DONE] Verifier la coherence FR / EN

### Commentaires

- L'accueil doit mieux separer les parcours :
  - visualiseur 3D,
  - portfolio web externe,
  - presentation du profil,
  - prise de contact.
- Realise dans la hero et dans le bloc "Acces directs".
- Le CTA web doit pointer vers `https://donovan-dev-web.vercel.app` et non vers une section locale.
- Le discours d'accueil doit clairement presenter ce site comme le versant creatif / 3D / experience du profil.

---

## ISSUE U0-02 - Mise a jour des projets

- **Priorite** : U0
- **Statut** : `[IN PROGRESS]`
- **Objectif** : remettre a jour les projets, leur discours et leur angle SEO.

### Taches

- [TODO] Revoir la selection des projets a conserver
- [IN PROGRESS] Mettre a jour les donnees projets
- [TODO] Mettre a jour les visuels, dates, liens et technologies
- [IN PROGRESS] Revoir les descriptions courtes et longues
- [IN PROGRESS] Revoir le type de discours et les formulations
- [IN PROGRESS] Ameliorer le cadrage SEO des projets
- [IN PROGRESS] Verifier la coherence FR / EN

### Commentaires

- Ce lot inclut a la fois la mise a jour de fond et la reformulation editoriale.
- Le cadrage editoriale doit prioriser les angles creatifs, design, experience utilisateur, mise en scene et visualisation, plutot qu'un discours trop technique.
- Premiere passe realisee sur les projets les plus structurants cote web :
  - portfolio principal,
  - Othello AI,
  - Grapheau,
  - Location Drive Ventoux,
  - La Meynardiere.
- Deuxieme passe editoriale engagee sur les projets creatifs / 3D avec un format plus complet :
  - presentation,
  - contexte,
  - objectif,
  - competences mobilisees,
  - mise en oeuvre.
- Ce nouveau format a deja ete applique a un lot important de fiches creatives :
  - reducteur planetaire,
  - automatisation de ligne,
  - salon Japandi,
  - amenagement piscine / terrasse,
  - orrery de l'inventeur,
  - showreel,
  - motion design & VFX,
  - animation voiture,
  - visualisation produit,
  - Leica Backpack,
  - VIVAX,
  - DJI Drone,
  - US RADAR,
  - configurateur Android,
  - configurateur PC,
  - Orbital Portfolio,
  - Archi Viz,
  - animation du plan d'eau d'Apt.
- La selection finale des projets a conserver reste a arbitrer dans une seconde passe.
- Une correction de cap a ete decidee : les reformulations futures devront mieux distinguer ce site du portfolio web technique externe.

---

## ISSUE U0-03 - Amelioration globale du discours et du contenu

- **Priorite** : U0
- **Statut** : `[IN PROGRESS]`
- **Objectif** : harmoniser l'ensemble du discours du site.

### Taches

- [IN PROGRESS] Revoir le positionnement global du site
- [IN PROGRESS] Revoir le ton des textes sur accueil, portfolio, about et contact
- [IN PROGRESS] Ameliorer les formulations vieillissantes ou faibles
- [IN PROGRESS] Uniformiser le niveau de langage
- [IN PROGRESS] Aligner discours UX, discours professionnel et discours SEO
- [IN PROGRESS] Revoir la coherence FR / EN

### Commentaires

- L'objectif n'est pas seulement de corriger des textes, mais d'ameliorer la lisibilite et l'impact global du site.
- Le cap editorial est maintenant clarifie :
  - ce site = discours creatif / design / 3D / experience,
  - autre portfolio = discours technique / developpement web.
- Premiere passe engagee sur :
  - accueil,
  - intro portfolio,
  - CTA portfolio,
  - CTA detail projet,
  - page contact.
- Une seconde passe reste a faire sur "about" et sur les fiches projet pour pousser davantage le ton creatif et retirer les formulations trop techniques quand elles ne sont pas utiles.
- Pour les projets, le ton cible est maintenant mieux defini :
  - plus de mise en contexte,
  - plus d'intention visuelle,
  - plus de lecture orientee usage / perception / experience,
  - moins de descriptions purement techniques ou enumeratives.

---

## ISSUE U1-04 - Suppression du mailer local et mise a jour du formulaire de contact

- **Priorite** : U1
- **Statut** : `[DONE]`
- **Objectif** : remplacer le mailer local par une API venant du Portfolio Web.

### Taches

- [DONE] Supprimer l'usage du mailer local
- [DONE] Etudier l'API distante du Portfolio Web
- [DONE] Adapter le formulaire de contact pour utiliser cette API
- [DONE] Revoir le contrat de donnees du formulaire
- [DONE] Gerer les erreurs et etats de retour
- [DONE] Verifier les besoins d'environnement / secrets / CORS
- [DONE] Documenter l'integration

### Commentaires

- Le formulaire utilise maintenant un proxy local `/api/contact` qui relaie vers `https://donovan-dev-web.vercel.app/api/messages`.
- Choix retenu : conserver une route locale cote site pour eviter un couplage direct du front au service distant.
- Le contrat a ete simplifie a : `name`, `email`, `phone`, `message`, avec ajout d'un consentement RGPD obligatoire cote interface et validation.
- `phone` reste optionnel et est transmis comme chaine vide s'il n'est pas renseigne.

---

## ISSUE U1-05 - Refonte du bloc de telechargement du CV

- **Priorite** : U1
- **Statut** : `[DONE]`
- **Objectif** : simplifier le bloc CV et le connecter a une source externe.

### Taches

- [DONE] Supprimer la logique a deux CV
- [DONE] Passer a un seul CV
- [DONE] Recuperer le CV via un appel API depuis un autre site
- [DONE] Revoir le bloc UX de telechargement
- [DONE] Revoir les textes d'accompagnement
- [DONE] Verifier la coherence FR / EN

### Commentaires

- Le bloc doit devenir plus simple, plus clair et plus facile a maintenir.
- Le telechargement pointe maintenant vers `https://donovan-dev-web.vercel.app/api/docs`.
- Le choix de version a ete retire pour aligner l'UX avec l'existence d'un seul CV source.

---

## ISSUE U2-06 - Recette et cloture de la phase de mise a niveau

- **Priorite** : U2
- **Statut** : `[TODO]`
- **Objectif** : verifier et cloturer la phase de mise a jour du site.

### Taches

- [TODO] Relire l'ensemble des contenus mis a jour
- [TODO] Verifier les CTA et parcours utilisateur
- [TODO] Verifier les integrations API externes
- [TODO] Faire une recette FR / EN
- [TODO] Valider les projets, le formulaire et le bloc CV
- [TODO] Consolider un mini rapport de fin de phase

---

## 4. Ordre recommande

1. Mise a jour de la page d'accueil
2. Mise a jour des projets
3. Amelioration globale du discours et du contenu
4. Migration du formulaire vers l'API externe
5. Refonte du bloc CV
6. Recette et cloture

## 5. Definition de fin de phase

La phase pourra etre consideree comme terminee quand :

- les CTA principaux seront remis a niveau,
- les projets seront mis a jour,
- le discours global sera harmonise,
- le formulaire n'utilisera plus le mailer local,
- le bloc CV sera simplifie autour d'un seul document,
- les integrations externes seront valides,
- une recette FR / EN aura ete effectuee.
