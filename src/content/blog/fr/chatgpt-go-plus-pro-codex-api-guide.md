---
locale: fr
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go, Plus, Pro : Codex et facturation API expliqués"
headline: "ChatGPT Go, Plus, Pro : comment comprendre Codex et OpenAI API"
description: "Vérifié au 10 avril 2026, ce guide compare ChatGPT Go, Plus et Pro (dont Pro 100/200 USD), précise l’accès Codex et confirme que l’API est facturée séparément."
summary: Si vous hésitez entre ChatGPT Go, Plus et Pro, ou si vous voulez clarifier la relation entre Codex, ChatGPT et OpenAI API, ce guide vous donne un cadre de décision rapide.
category: Comparatifs d'abonnements IA
pubDate: 2026-03-31
updatedDate: 2026-04-22
author: Mark
service: General
tags:
  - ChatGPT Go
  - ChatGPT Plus
  - ChatGPT Pro
  - Codex
  - OpenAI API
  - Abonnement IA
relatedTranslationKeys:
  - google-ai-plan-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: "Plans ChatGPT à partir de 5,5 USD (sous le prix officiel)"
  subtitle: "Canal d’achat tiers en option · Processus d’activation clair · Support après achat disponible"
  buttonText: "Voir les options de plan ChatGPT"
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

Quand on découvre les offres OpenAI pour la première fois, la confusion revient presque toujours sur les mêmes points :

- Quelle est la vraie différence entre `ChatGPT Go`, `Plus` et `Pro` ?
- `Codex` est-il un produit payant séparé ?
- Quel est le lien entre `OpenAI API` et un abonnement ChatGPT ?
- Si je paie Plus ou Pro, dois-je quand même payer l’API ?

Ce guide a un objectif unique : clarifier ces quatre questions pour que vous puissiez choisir la bonne formule en une dizaine de minutes.

Cadre de lecture : les informations s’appuient sur les pages officielles OpenAI visibles au **2026-04-10**. Les montants sont indiqués en **USD** et restent **indicatifs**. La source finale reste toujours votre checkout et votre page de facturation au moment de l’achat.

## 1. Réponse rapide : 4 questions, un cadre simple

1. `Go / Plus / Pro` sont des **paliers d’abonnement personnel ChatGPT** sur `chatgpt.com`, différenciés par l’accès modèles, les outils et les limites d’usage.
2. `Codex` est l’**agent de développement IA** d’OpenAI, pas un "deuxième abonnement chat" séparé.
3. `OpenAI API` correspond à la **plateforme développeur** (`platform.openai.com`) pour intégrer les modèles à vos propres produits et workflows.
4. **Les abonnements ChatGPT n’incluent pas de crédits API.** L’API est facturée séparément, à l’usage.

À retenir en deux lignes :

- L’abonnement ChatGPT sert à utiliser l’IA dans ChatGPT.
- La facturation API sert à intégrer l’IA dans vos propres systèmes.

## 2. Ce que vendent réellement Go, Plus et Pro

Go, Plus et Pro sont trois niveaux d’une même ligne produit. Le sujet central n’est pas "quel produit", mais "quel plafond d’usage".

| Offre | Positionnement simplifié | Profil adapté |
| --- | --- | --- |
| Go | Extension low-cost au-dessus de Free, avec plus de messages, d’uploads, d’images, de mémoire, etc. | Utilisateurs individuels sensibles au budget qui veulent plus que Free |
| Plus | Limites plus élevées et fonctionnalités avancées plus larges pour un usage quotidien soutenu | Utilisateurs individuels qui écrivent, analysent, apprennent et recherchent régulièrement |
| Pro | Niveau le plus élevé en limites et en priorité | Utilisateurs intensifs à haute fréquence, sensibles aux plafonds et à la vitesse |

Selon les pages officielles visibles au 2026-04-10 :

- `Plus` : **20 USD/mois**
- `Pro` : **deux offres actuellement, 100 USD/mois et 200 USD/mois** (même famille Pro, réserve d’usage différente)
- `Go` : positionné comme offre économique ; une référence **US à 8 USD/mois** a été publiée, mais les prix varient selon les régions, donc checkout prioritaire

Trois points pratiques à garder en tête :

- Go/Plus/Pro sont des abonnements mensuels ; le prépaiement annuel n’est pas la norme actuelle.
- Les deux offres Pro (100/200 USD) se distinguent surtout par la marge d’usage (environ 5x et 20x vs Plus selon la formulation officielle).
- Le terme "Unlimited" ne signifie pas usage absolu sans limite ; les conditions d’utilisation et garde-fous anti-abus s’appliquent.

## 3. Go vs Plus vs Pro : fonctionnalités et limites (au 2026-04-10)

OpenAI peut ajuster les limites dans le temps. Le tableau ci-dessous reprend uniquement les écarts explicitement affichés sur les pages officielles.

| Dimension | Go | Plus | Pro |
| --- | --- | --- | --- |
| Prix (USD) | Offre low-cost (affichage variable selon région/devise ; checkout final) | `20 USD/mois` | `100 USD/mois` ou `200 USD/mois` (environ `5x / 20x` de marge vs Plus) |
| Plafond GPT-5.3 | Jusqu’à `160 messages / 3 heures` | Jusqu’à `160 messages / 3 heures` | Famille GPT-5 en `unlimited*` (garde-fous anti-abus appliqués) |
| Plafond Thinking | Activation via menu `+`, jusqu’à `10 messages / 5 heures` | GPT-5.4 Thinking en sélection manuelle, jusqu’à `3000 messages / semaine` | Inclut GPT-5.4 Pro, famille GPT-5 en `unlimited*` (avec garde-fous) |
| Legacy models (ex. 4o) | Non inclus | Accès étendu inclus | Inclus, avec limites plus élevées |
| Agent mode | Non inclus | Inclus, `40 requêtes / mois` | Inclus, `400 requêtes / mois` |
| Sora | Non inclus | Inclus | Inclus, généralement avec meilleure priorité/concurrence |
| Voice | Inclus, mais classe de limite proche de Free | Inclus dans le quota voix abonné | Voix GPT-4o en `unlimited*` (avec garde-fous) |
| Codex | Disponible temporairement (`limited time`) | Inclus | Inclus |

`*` Ici, `unlimited` signifie une forte disponibilité pratique, pas une absence totale de limites.

Trois précisions souvent mal comprises :

- Une fois `160 / 3h` atteint en Go/Plus, l’usage bascule vers un modèle mini jusqu’au reset de la fenêtre glissante.
- Le `3000 / semaine` de Plus concerne la sélection manuelle de Thinking ; les bascules automatiques Instant→Thinking ne sont généralement pas comptées dans ce seau.
- Si les bannière-limites de votre produit diffèrent de cet article, la référence est toujours ce que votre compte affiche.

## 4. Relation entre Codex et Go/Plus/Pro

Définition : `Codex` est un agent de code utilisable en CLI, IDE, web et desktop pour comprendre, modifier, exécuter et coordonner du travail de développement.

La formulation d’inclusion officielle actuelle indique :

- `Plus / Pro / Business / Enterprise / Edu` incluent Codex
- `Free / Go` peuvent aussi accéder à Codex sur des fenêtres de disponibilité limitées

Codex est donc mieux compris comme une couche de capacité spécialisée répartie sur plusieurs offres, plutôt qu’un abonnement totalement séparé.

Point clé pour la facturation : Codex CLI accepte deux modes d’authentification.

- Connexion avec compte ChatGPT : la consommation suit vos limites d’abonnement ChatGPT.
- Connexion avec clé API : la consommation suit la facturation API.

C’est la raison pour laquelle deux utilisateurs de Codex peuvent voir des coûts à des endroits différents.

## 5. Ce qu’est OpenAI API, et pourquoi c’est différent d’un abonnement chat

`OpenAI API` est une interface développeur, pas un abonnement chat. L’objectif est d’intégrer les modèles dans vos propres systèmes, par exemple :

- créer un bot support ou un assistant de connaissance interne
- exécuter des tâches de résumé, classification, extraction dans vos workflows
- ajouter des capacités texte, image, voix dans votre produit

La facturation est également différente : l’API fonctionne surtout en pay-as-you-go (token, requête, appel d’outil, etc.).

Exemple d’ordre de grandeur visible au 2026-04-10 :

- Entrée texte GPT-5.4 : environ `2.50 USD / 1M tokens`
- Sortie texte GPT-5.4 : environ `15.00 USD / 1M tokens`

Ces tarifs peuvent évoluer avec les modèles et les politiques régionales. Pour un budget fiable, recalculer avec la page officielle en cours.

## 6. Question clé : un abonnement ChatGPT inclut-il l’API ?

Réponse courte : **Non. Les frais d’abonnement ne compensent pas l’usage API, et aucun crédit API n’est ajouté automatiquement.**

Les articles d’aide convergent sur le même point :

- ChatGPT (`chatgpt.com`) et Platform (`platform.openai.com`) sont deux systèmes de facturation distincts.
- La facturation abonnement ChatGPT n’est pas transférée à l’API.
- Pour utiliser l’API, il faut configurer le paiement côté Platform puis payer à l’usage.

Un même compte OpenAI peut toutefois couvrir les deux usages en parallèle :

- usage personnel via Go / Plus / Pro
- intégration produit via API pay-as-you-go séparée

Cette séparation est fréquente en contexte équipe.

## 7. Choisir par scénario d’usage pour éviter l’achat inadapté

Si vous hésitez encore, cette logique simple évite la plupart des erreurs :

- Chat personnel et outils légers : commencer par `Go`
- Usage quotidien en rédaction, analyse, apprentissage, recherche : choisir `Plus` en premier
- Usage très intensif et sensible aux plafonds : envisager `Pro` (souvent commencer par `100 USD`, puis aller vers `200 USD` si charge parallèle durable)
- Intégration modèle dans votre produit ou automation : activer `API` séparément, avec ou sans abonnement ChatGPT

Synthèse en trois lignes :

- `Go / Plus / Pro` sont des choix d’abonnement pour utiliser ChatGPT lui-même.
- `API` est le choix d’ingénierie pour construire vos propres produits/workflows IA.
- `Codex` peut fonctionner entre les deux mondes : usage lié au plan via login ChatGPT, ou facturation API via clé.

## 8. FAQ

### 1) Quelle est la différence la plus concrète entre Go et Plus ?

Go vise l’équilibre coût/usage de base. Plus devient plus confortable dès qu’on utilise l’outil souvent et avec des besoins avancés.

### 2) Peut-on utiliser Thinking avec Go ?

Oui. Thinking est activable depuis le menu `+`, avec un plafond public de `10 / 5h`. Si vous lancez souvent des raisonnements longs, Plus ou Pro est généralement plus adapté.

### 3) Plus et Pro incluent-ils tous deux Agent ?

Oui. Les valeurs publiques sont Plus `40 / mois` et Pro `400 / mois`. Si Agent est un outil quotidien, l’écart est important.

### 4) Quelle différence entre Pro 100 USD et Pro 200 USD ?

La différence principale est la marge d’usage, pas l’existence des fonctions Pro. Les deux restent des plans Pro.

### 5) "Unlimited" sur Pro signifie-t-il vraiment illimité ?

Non. Ce n’est pas un illimité inconditionnel. Les garde-fous anti-abus et les conditions d’utilisation restent applicables.

### 6) Que se passe-t-il après le plafond principal Go/Plus ?

Après dépassement de la fenêtre glissante, l’usage passe sur un modèle mini jusqu’au reset. Ce n’est pas une logique de remise à zéro quotidienne fixe à minuit.

### 7) Je paie déjà Plus/Pro. L’API reste payante séparément ?

Oui. Abonnement ChatGPT et API sont séparés ; les frais d’abonnement ne couvrent pas les appels API.

### 8) Puis-je passer de Plus/Pro à Go ?

Oui, le changement de plan est possible. Les indications officielles précisent en général qu’il n’y a pas de remboursement prorata sur la période en cours, et que le nouveau plan s’applique au cycle suivant.

## References

- [Introducing ChatGPT Go, now available worldwide](https://openai.com/index/introducing-chatgpt-go/)
- [ChatGPT Plans | Free, Go, Plus, Pro, Business, and Enterprise](https://chatgpt.com/pricing)
- [What is ChatGPT Go?](https://help.openai.com/en/articles/11989085-what-is-chatgpt-go)
- [What is ChatGPT Plus?](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- [About ChatGPT Pro plans](https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro)
- [GPT-5.3 and GPT-5.4 in ChatGPT](https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt)
- [ChatGPT agent (availability and monthly limits)](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540)
- [Codex CLI (authentication and plan inclusion)](https://developers.openai.com/codex/cli)
- [Billing settings in ChatGPT vs Platform](https://help.openai.com/en/articles/9039756-billing-settings-in-chatgpt-vs-platform)
- [How can I move my ChatGPT subscription to the API?](https://help.openai.com/en/articles/8156019)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
