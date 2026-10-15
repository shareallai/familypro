---
locale: fr
translationKey: grok-build-guide
title: "Guide Grok Build 2026 : offres, modèles, limites et commandes"
headline: Comment évaluer Grok Build pour votre workflow d’ingénierie
description: "Guide Grok Build actualisé : forfaits, Grok 4.7 et Fast, installation, commandes, quota hebdomadaire partagé et facturation API séparée."
summary: Cet article aide les équipes techniques à décider si Grok Build s’intègre à leur workflow de delivery, avec des repères concrets sur l’accès, l’onboarding et l’usage quotidien.
category: Analyse d'outils IA
pubDate: 2026-05-26
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - Agent de code IA
  - CLI
  - Workflow d’ingénierie
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build réunit lecture du code, planification, modifications et vérification dans le terminal. Distinguez les fonctions du client, les modèles réellement accessibles et la facturation par abonnement ou API.

**Faits et prix vérifiés : 2026-10-15. Prix en dollars indicatifs, hors taxes applicables. Les tarifs officiels et votre facture font référence.** Pour acheter ou migrer, consultez le [guide des nouveaux forfaits Grok](../xai-grok-x-subscription-plan-guide/).

## 1. Ce qu’est Grok Build

D’après la documentation xAI, Grok Build est un agent de codage qui s’exécute dans un terminal, avec trois modes d’usage principaux :

- Une TUI plein écran interactive avec support souris.
- Un mode CLI headless pour scripts et automatisation (`grok -p ...`).
- Un mode ACP pour l’intégration avec des applications externes (`grok agent stdio`).

En pratique, ce n’est pas juste un chat qui enchaîne des commandes. C’est une chaîne d’exécution unifiée qui combine planification, modifications, opérations fichiers, appels d’outils et sous-agents parallèles.

## 2. Forfaits actuels et accès

Les nouveaux clients comparent The X Subscription : Free est limité ; Plus coûte $8/mois, Premium $30, Super $100 et Ultra $200. La page tarifaire mentionne Grok Build dans Plus. Vérifiez modèles et solde après connexion ; les anciens SuperGrok et X Premium+ ne sont plus l’unique condition d’achat.

Premium, Super et Ultra offrent 4x, 15x et 50x l’usage Plus, pas des nombres fixes de tâches. Grok Bot commence à Premium. Les anciens abonnements peuvent actuellement être conservés ; ne regroupez pas vos comptes simplement pour essayer Build. Une équipe vérifie aussi l’attribution des sièges et les politiques internes.

## 3. Mise en route rapide (environ 5 minutes)

### 3.1 Installation

macOS / Linux / WSL :

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows (PowerShell) :

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 Première authentification

```bash
grok
```

Par défaut, le premier lancement ouvre une authentification navigateur. En environnement sans navigateur (par exemple hôte distant ou conteneur), utilisez une clé API :

```bash
export XAI_API_KEY="xai-..."
grok
```

Si un environnement distant ne peut pas ouvrir le navigateur, le code appareil est une alternative, pas une étape supplémentaire après une connexion normale.

```bash
grok login --device-auth
```

### 3.3 Démarrer dans un dépôt

```bash
cd your-project
grok inspect
grok
```

Premiers prompts utiles dans un dépôt de production :

- "Map this repository and identify boot paths."
- "Enter plan mode first, do not edit files yet."
- "List risks first, then propose edits."

### 3.4 Mode headless et automatisation

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

Pour l’orchestration IDE ou un tooling interne, utilisez ACP :

```bash
grok agent stdio
```

## 4. Support CLI et GUI : est-ce proche de codex.app ?

Réponse courte : **Grok Build est aujourd’hui d’abord CLI/TUI, pas une application desktop GUI autonome**.

- CLI : oui, c’est le point d’entrée principal.
- Interface interactive : oui, mais native terminal (TUI plein écran), pas une GUI fenêtrée desktop.
- Expérience type codex.app : possible via intégration ACP dans d’autres logiciels, mais ce n’est pas la forme produit par défaut aujourd’hui.

Si votre équipe privilégie les environnements visuels de workspace, traitez Grok Build comme une plateforme agentique orientée terminal, pas comme un remplacement GUI 1:1.

## 5. Plateformes supportées

D’après la documentation officielle Getting Started, les environnements de setup confirmés sont :

- `macOS`
- `Linux`
- `WSL`
- `Windows PowerShell`

Au niveau de la famille produit, les capacités Grok couvrent aussi :

- `Web`
- `iOS`
- `Android`
- `X`

Point important : Grok Build lui-même est positionné comme agent de codage terminal, pas comme application de chat mobile.

## 6. Choix du modèle et configuration

### 6.1 Grok 4.7, Fast et anciens modèles

La présentation actuelle de Build met en avant `grok-4.7` ; les prix API listent encore `grok-build-0.1`. Cet ancien identifiant ne prouve pas qu’il soit le seul modèle ou le modèle par défaut du client. Le nom `grok-build` dans l’exemple de réglages est un nom de configuration, pas nécessairement un identifiant API identique.

Grok 4.7 Fast utilise le même modèle sur une infrastructure plus rapide. Disponible uniquement dans Cursor et Build, il est facturé par le forfait du produit, sans accès par l’API publique xAI et sans inclusion dans le niveau gratuit Build. Une réponse plus rapide peut coûter davantage.

### 6.2 Vérifier compte et réglages chargés

Utilisez `grok models` dans le shell et `/model <name>` dans la TUI. Modèles personnalisés et modèle par défaut vont dans `~/.grok/config.toml`, au niveau utilisateur. Le fichier de projet `.grok/config.toml` couvre surtout MCP, Plugins et règles de permission, pas tous les réglages personnels. `grok inspect` confirme les sources chargées.

## 7. Quota partagé, API et coût Fast

### 7.1 Consommation de l’abonnement

Chaque siège payant possède une réserve hebdomadaire pour les usages éligibles des modèles du fournisseur dans les interfaces Grok et Cursor prises en charge. La consommation varie selon la tâche : aucun multiplicateur ne garantit des messages, tâches de code ou vidéos par jour. Observez `/usage` et le tableau de consommation sur une semaine normale.

Les modèles tiers dans Cursor sont facturés dès le premier usage. Les appels à l’API Grok publique sont aussi séparés de cette réserve. Un endpoint personnalisé suit la facturation de son fournisseur.

### 7.2 Tarifs API actuels et Fast

Prix de l’endpoint global standard pour `grok-4.7`, en dollars par million de tokens. Dès le seuil de contexte long, le tarif correspondant s’applique à tous les tokens de la requête, pas seulement au dépassement.

| Contexte d’entrée | Entrée | Entrée en cache | Sortie |
| --- | --- | --- | --- |
| Moins de 200k tokens | $2.00 | $0.50 | $6.00 |
| À partir de 200k tokens | $4.00 | $1.00 | $12.00 |

Dans Cursor/Build, Fast coûte 2 fois le tarif standard en contexte court et 1,5 fois en contexte long, via le forfait du produit. Les outils peuvent être facturés en plus ; l’ancien forfait indicatif de $5 par mille appels pour tous les outils ne convient plus. **Données : 2026-10-15, pour référence. Endpoints régionaux, modèles, outils et règles de facturation modifient le total.**

## 8. Commandes quotidiennes et tâches longues

`/model <name>` change de modèle ; `/plan [description]` ouvre le mode Plan et `/view-plan` affiche le plan. `/usage` montre la consommation, `/context` le contexte et `/compact` le résume. `/new` et `/resume` démarrent ou reprennent une session ; `/rewind` revient à un tour antérieur. `/skills`, `/plugins` et `/mcps` ouvrent les onglets d’extensions.

`/goal <objective>` convient à un travail long avec une fin vérifiable. `/create-workflow` crée un processus, `/workflow <name>` le lance, `/workflows` ouvre le suivi des exécutions. `/loop` répète des instructions, `/tasks` liste le travail en arrière-plan. Vérifiez permissions, coût et `/help` local.

Le verrou d’édition Plan est indépendant du mode de permission : seul le fichier du plan peut être modifié avant approbation. Bash et MCP suivent toujours leurs permissions ; le shell peut écrire. Plan n’est pas une sandbox en lecture seule.

## 9. Capacités Grok fréquentes et cas utiles

### 9.1 Recherche d’information en temps réel (Web + X)

Un différenciateur fort est l’usage combiné de la recherche web temps réel et de la recherche X dans le même flux de réponse. C’est particulièrement utile pour les sujets sensibles à l’actualité.

### 9.2 Workflow de codage agentique

Au-delà des réponses de code, Grok Build peut exécuter exploration de dépôt, génération de plan, modifications de code et explication de diff, dès lors que les permissions adaptées sont en place.

### 9.3 Sous-agents parallèles

Sur les tâches volumineuses, le travail peut être réparti en pistes d’exploration parallèles, utile pour le diagnostic d’incident complexe et l’analyse multi-modules.

### 9.4 Écosystème skills, plugins et MCP

Grok Build sait découvrir règles locales et répertoires de skills, puis s’étendre via plugins et intégrations MCP, ce qui facilite la migration depuis d’autres écosystèmes d’agents.

### 9.5 Capacités multimodales dans la même famille produit

La famille Grok inclut aussi des capacités de génération et de compréhension image/vidéo, utiles pour la documentation, les démos et les workflows orientés contenu.

## 10. Décider d’intégrer l’outil

Essayez une tâche bornée après vérification du compte, du modèle et de la facturation. Lisez les règles du projet, examinez plan et diff, puis exécutez tests ou build. Choisissez le forfait d’après la consommation mesurée, pas les anciens noms d’abonnement.

Si une interface desktop est indispensable, testez l’intégration réelle. Un environnement déjà établi doit comparer résultats, coût total et effort de migration sur la même tâche. L’accès aux outils ne remplace pas la validation.

## References

- [Grok Build overview](https://docs.x.ai/build/overview)
- [CLI reference](https://docs.x.ai/build/cli/reference)
- [Modes and commands](https://docs.x.ai/build/modes-and-commands)
- [Plan mode](https://docs.x.ai/build/features/plan-mode)
- [Permissions](https://docs.x.ai/build/features/permissions)
- [Headless and scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Settings](https://docs.x.ai/build/settings)
- [Skills, Plugins and Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API pricing and Grok 4.7 Fast](https://docs.x.ai/developers/pricing)
- [The X Subscription pricing](https://x.ai/pricing)
- [Monthly and annual prices](https://docs.x.ai/x-subscription/pricing)
- [Weekly usage limits](https://docs.x.ai/x-subscription/usage-limits)
