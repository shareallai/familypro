---
locale: en
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go vs Plus vs Pro: Codex and API Billing Explained"
headline: What are ChatGPT Go, Plus, and Pro? Codex and API explained
description: "Compare ChatGPT Go, Plus and Pro, GPT-6.1 Sol, Astra and Luna, Codex access and separate API costs. Plans and prices checked October 14, 2026."
summary: "Choose a plan for your tasks, understand the new Work/Codex models, and check which requests use your subscription or a separate API bill."
category: AI Subscription Comparisons
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
  - AI subscription
relatedTranslationKeys:
  - google-ai-plan-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: familypro ChatGPT plans from USD 5.5
  subtitle: Better pricing · Faster activation · Post-purchase support
  buttonText: Get started on familypro
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

Choosing ChatGPT Go, Plus or Pro starts with where you will use it: ordinary Chat, an agent working on code and documents, or a model integrated into your own product. These routes have different model access and billing.

Plan details, models and API prices were checked on **2026-10-14**. USD amounts are **for reference only**; checkout, regional taxes and your bill determine the actual charge. Availability also depends on rollout, client and workspace settings.

## 1. Go, Plus and Pro: prices and practical choices

The [official Work/Codex pricing page](https://learn.chatgpt.com/docs/pricing) lists the following personal plans. The recommendations are starting points, not promises of a fixed number of tasks.

| Plan | Reference monthly price, USD | When to consider it |
| --- | --- | --- |
| Free | $0 | Try lightweight tasks before paying |
| Go | $8 | A limited budget and lightweight Codex work |
| Plus | $20 | Regular agent work across code and documents |
| Pro | $100 / $200 / $500 | Persistent usage limits or a specific need for higher speed |

Pro now has three tiers. The older description of two plans with identical capabilities is incomplete: **Ultrafast access** is listed for Pro $500, with model and client requirements. Compare the current checkout and account limits rather than treating the old 5x/20x figures as universal task multipliers.

For ordinary conversations, check the models and tools available in Chat itself. Work/Codex access does not describe the Chat model picker.

## 2. The new models: GPT-6.1 Sol, GPT-6 Astra and GPT-6 Luna

GPT-5.4 is no longer the right headline example for newer models. The [current model documentation](https://learn.chatgpt.com/docs/models) distinguishes these choices:

| Model | Suitable tasks | A practical starting point |
| --- | --- | --- |
| GPT-6.1 Sol | Multi-step work across code, apps and documents | Try it for routine complex work before moving to Astra |
| GPT-6 Astra | Demanding workflows requiring sustained reasoning and judgment | Consider it when task difficulty justifies the usage cost |
| GPT-6 Luna | Summaries, extraction, classification and focused code edits | Try it for clear, repetitive tasks on a tighter budget |

In ChatGPT, **GPT-6.1 Sol, GPT-6 Sol and GPT-6 Luna are available in Work/Codex, not ordinary Chat**. GPT-6.1 Sol's launch rollout includes Plus, Pro, Business, Enterprise and Edu; Free/Go are excluded at launch. Enterprise/Edu administrators may need to enable it. Check your account and client for availability.

OpenAI scheduled GPT-5.5's retirement from ChatGPT, Work and Codex for **October 14, 2026**. That retirement does not affect the API. Update saved defaults, scripts or scheduled tasks that select it to an available replacement; do not assume its API availability ends on the same date.

## 3. Is Codex included, and how do its limits work?

Codex is an agent that can understand, edit and run code. Official pricing now includes Free and Go rather than describing their access only as a temporary promotion. **Free/Go get GPT-6 Luna in the desktop app, subject to rollout**; Plus offers more surfaces, including web, CLI and IDE extension.

Work and Codex share usage. Model, context, reasoning and tools affect consumption, so a message is not a fixed unit of work. Old Chat message caps cannot tell you how many Codex tasks you can run, and API token prices cannot predict included subscription tasks.

Check the Usage page for remaining allowance and reset times. Plus/Pro users can buy ChatGPT credits after reaching limits; these are separate from API balances. Try Luna for focused work and Sol or Astra for harder tasks before deciding that a higher plan is necessary.

## 4. Separate API billing and current model prices

API-key requests in your product, script or service use API billing. A ChatGPT subscription does not automatically grant API credits or offset API charges. Codex with ChatGPT sign-in uses plan allowances; API-key authentication uses the API bill.

These are **Standard, short-context text rates checked on 2026-10-14**, in USD per million tokens, for reference only.

| API model ID | Input | Cached input | Cache writes | Output |
| --- | --- | --- | --- | --- |
| `gpt-6.1-sol` | $2.00 | $0.10 | $2.50 | $10.00 |
| `gpt-6-astra` | $10.00 | $1.00 | $12.50 | $50.00 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.125 | $0.50 |

For example, one million uncached input tokens and 200,000 output tokens on Sol cost **$4** at these rates, before cache writes, tools and other charges. Long context has separate rates, and Batch, Flex, Fast or Ultrafast processing can change pricing. Budget with the [current API rate card](https://developers.openai.com/api/docs/pricing), not this table alone.

## 5. Can a third-party app use a Plus/Pro allowance?

Yes, when the app supports it and your account is eligible. [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt) lets eligible Plus/Pro users authorize supported apps to consume existing Work/Codex usage. **Signing in and granting plan usage are separate permissions**: a ChatGPT login button alone does not establish how requests are paid for.

This adds no new allowance and does not provide a general-purpose API key. The app may charge its own fees. For your own integration, check whether this route is supported; conventional API-key requests still use separate billing.

## 6. Choose around the work you actually do

For light use, try Free or Go first. For recurring complex Work/Codex tasks, check Plus and GPT-6.1 Sol availability. Compare the three Pro tiers when limits regularly interrupt your work or you need a supported Ultrafast mode.

For product integration, calculate an API budget separately: test Luna on clear batch tasks, Sol on complex work, and Astra where the difficulty warrants it. When buying through a third party, confirm the exact plan, account arrangement, Codex access and support terms. A lower price alone does not establish official Pro benefits or access to every model.

## References

- [ChatGPT Work and Codex pricing](https://learn.chatgpt.com/docs/pricing)
- [Models and availability in Work and Codex](https://learn.chatgpt.com/docs/models)
- [GPT-6.1 Sol API model](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [GPT-6 Astra API model](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [GPT-6 Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)
