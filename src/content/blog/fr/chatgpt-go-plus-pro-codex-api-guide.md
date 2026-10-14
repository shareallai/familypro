---
locale: fr
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go, Plus, Pro : Codex et facturation API expliqués"
headline: "ChatGPT Go, Plus, Pro : comment comprendre Codex et OpenAI API"
description: "Comparez ChatGPT Go, Plus et Pro, GPT-6.1 Sol, Astra, Luna, Codex et les frais API distincts. Prix et modèles vérifiés le 14 octobre 2026."
summary: "Choisissez selon vos tâches, découvrez les nouveaux modèles de Work/Codex et distinguez le quota de votre abonnement de la facturation API."
category: Comparatifs d'abonnements IA
pubDate: 2026-03-31
updatedDate: 2026-10-14
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
  title: "Offres ChatGPT sur familypro dès 5,5 USD"
  subtitle: "Meilleur prix · Activation rapide · Support après achat"
  buttonText: "Accéder à familypro"
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

Pour choisir ChatGPT Go, Plus ou Pro, commencez par votre usage : conversations dans Chat, agent travaillant sur du code et des documents, ou intégration dans votre produit. Les modèles accessibles et la facturation diffèrent selon le parcours.

Les offres, modèles et prix API ont été vérifiés le **2026-10-14**. Les montants en USD sont **indicatifs** : le paiement, les taxes locales et la facture font foi. L'accès dépend aussi du déploiement, du client et des paramètres de l'espace de travail.

## 1. Go, Plus et Pro : prix et choix

La [page officielle des tarifs Work/Codex](https://learn.chatgpt.com/docs/pricing) présente les offres personnelles suivantes. Les conseils ne garantissent pas un nombre fixe de tâches.

| Offre | Prix mensuel indicatif, USD | Quand l'envisager |
| --- | --- | --- |
| Free | $0 | Tester des tâches légères avant de payer |
| Go | $8 | Petit budget et tâches Codex légères |
| Plus | $20 | Travail régulier avec un agent sur du code et des documents |
| Pro | $100 / $200 / $500 | Limites régulièrement atteintes ou besoin précis de vitesse |

Pro compte désormais trois niveaux. Dire qu'il existe seulement deux offres aux fonctions identiques est incomplet : l'accès **Ultrafast** figure dans Pro $500, selon le modèle et le client. Comparez l'offre actuelle et les limites du compte, sans traiter les anciens ratios 5x/20x comme des multiplicateurs valables pour toutes les tâches.

Pour les conversations ordinaires, regardez les modèles et outils de Chat. Les droits Work/Codex ne décrivent pas le sélecteur de modèles de Chat.

## 2. Les nouveaux modèles : GPT-6.1 Sol, GPT-6 Astra et GPT-6 Luna

GPT-5.4 n'est plus le bon exemple principal pour présenter les nouveaux modèles. La [documentation actuelle](https://learn.chatgpt.com/docs/models) distingue ces usages :

| Modèle | Tâches adaptées | Point de départ |
| --- | --- | --- |
| GPT-6.1 Sol | Travail en plusieurs étapes sur du code, des applications et des documents | À tester d'abord pour le travail complexe récurrent |
| GPT-6 Astra | Processus exigeants demandant raisonnement et jugement soutenus | Quand la difficulté justifie une consommation supérieure |
| GPT-6 Luna | Résumés, extraction, classification et modifications de code ciblées | Pour des tâches claires et répétitives à moindre coût |

Dans ChatGPT, **GPT-6.1 Sol, GPT-6 Sol et GPT-6 Luna sont disponibles dans Work/Codex, pas dans Chat ordinaire**. Le lancement de GPT-6.1 Sol inclut Plus, Pro, Business, Enterprise et Edu, mais pas Free/Go. Un administrateur peut devoir l'activer pour Enterprise/Edu. Vérifiez votre compte et votre client.

OpenAI a annoncé le retrait de GPT-5.5 de ChatGPT, Work et Codex pour le **14 octobre 2026**. L'API n'est pas concernée. Remplacez ce modèle dans les réglages enregistrés, scripts et tâches planifiées par un modèle disponible ; cela ne signifie pas que son API s'arrête le même jour.

## 3. Codex est-il inclus, et comment fonctionnent les limites ?

Codex est un agent capable de comprendre, modifier et exécuter du code. Les tarifs officiels incluent maintenant Free et Go, au lieu de présenter leur accès uniquement comme une promotion temporaire. **Free/Go donnent accès à GPT-6 Luna dans l'application de bureau, sous réserve du déploiement** ; Plus propose davantage d'accès, dont le web, la CLI et l'extension IDE.

Work et Codex partagent leur quota. Le modèle, le contexte, le raisonnement et les outils modifient la consommation : un message ne représente pas une quantité fixe de travail. Les anciens plafonds de Chat ne permettent pas de calculer les tâches Codex, et les prix API par token ne permettent pas de déduire le quota inclus.

Consultez Usage pour le quota restant et les réinitialisations. Plus/Pro peuvent acheter des crédits ChatGPT après avoir atteint leurs limites ; ce solde est distinct de celui de l'API. Essayez Luna pour les tâches ciblées et Sol ou Astra pour les plus difficiles avant de changer d'offre.

## 4. Facturation API distincte et prix des nouveaux modèles

Les requêtes avec une clé API depuis un produit, un script ou un service relèvent de la facturation API. L'abonnement ChatGPT n'offre pas automatiquement de crédits API et ne déduit pas ces frais. Codex avec connexion ChatGPT utilise le quota du plan ; avec une clé API, il utilise la facturation API.

Voici les **tarifs Standard de texte avec contexte court, vérifiés le 2026-10-14**, en USD par million de tokens, à titre indicatif.

| Identifiant API | Entrée | Entrée en cache | Écriture du cache | Sortie |
| --- | --- | --- | --- | --- |
| `gpt-6.1-sol` | $2.00 | $0.10 | $2.50 | $10.00 |
| `gpt-6-astra` | $10.00 | $1.00 | $12.50 | $50.00 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.125 | $0.50 |

Un million de tokens d'entrée non cachés et 200 000 tokens de sortie avec Sol coûtent ici **$4**, hors écritures du cache, outils et autres frais. Le contexte long a ses propres tarifs ; Batch, Flex, Fast et Ultrafast peuvent aussi modifier le prix. Calculez avec la [grille API actuelle](https://developers.openai.com/api/docs/pricing), pas avec ce seul tableau.

## 5. Une application tierce peut-elle utiliser le quota Plus/Pro ?

Oui, si elle le permet et si le compte est éligible. [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt) permet d'autoriser des applications compatibles à consommer le quota Work/Codex existant. **La connexion et l'autorisation d'utiliser le plan sont distinctes** : un bouton de connexion ChatGPT ne suffit pas à établir qui paie les requêtes.

Aucun quota supplémentaire ni clé API générale n'est fourni. L'application peut facturer ses propres services. Pour votre intégration, vérifiez si cette voie est prise en charge ; les requêtes classiques avec une clé API restent facturées séparément.

## 6. Choisir selon son travail réel

Pour un usage léger, essayez Free ou Go. Pour des tâches Work/Codex complexes et régulières, vérifiez Plus et l'accès à GPT-6.1 Sol. Comparez les trois niveaux Pro si les limites interrompent souvent votre travail ou si vous avez besoin d'un mode Ultrafast pris en charge.

Pour un produit, établissez un budget API distinct : testez Luna sur des lots de tâches claires, Sol sur le travail complexe, et Astra lorsque la difficulté le justifie. Avec un vendeur tiers, confirmez l'offre, les modalités d'utilisation du compte, l'accès à Codex et le support. Un prix bas ne prouve pas l'accès aux avantages officiels de Pro ou à tous les modèles.

## References

- [ChatGPT Work and Codex pricing](https://learn.chatgpt.com/docs/pricing)
- [Models and availability in Work and Codex](https://learn.chatgpt.com/docs/models)
- [GPT-6.1 Sol API model](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [GPT-6 Astra API model](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [GPT-6 Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)
