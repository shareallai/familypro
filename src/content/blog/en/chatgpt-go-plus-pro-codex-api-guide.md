---
locale: en
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go vs Plus vs Pro: Codex and API Billing Explained"
headline: What are ChatGPT Go, Plus, and Pro? Codex and API explained
description: Checked on April 23, 2026, this guide compares ChatGPT Go, Plus, and Pro (including $100/$200 Pro), explains Codex access, and confirms API billing is separate.
summary: If you are deciding between ChatGPT Go, Plus, and Pro, or you are unsure how Codex and the OpenAI API fit together, this guide gives you a fast and practical decision path.
category: AI Subscription Comparisons
pubDate: 2026-03-31
updatedDate: 2026-04-24
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

If you are looking at OpenAI plans for the first time, four questions usually create the most confusion:

- What is the real difference between `ChatGPT Go`, `Plus`, and `Pro`?
- Is `Codex` a separate paid product?
- How does the `OpenAI API` relate to a ChatGPT subscription?
- If I pay for Plus or Pro, do I still need to pay for API usage?

This post has one job: answer those questions clearly, so you can pick the right option in about 10 minutes.

Scope note: all plan details in this article are based on official OpenAI pages visible on **2026-04-23**. Prices are shown in **USD** and are **for reference only**. Always confirm on your current checkout and billing pages.

## 1. Quick answer: four common questions, one framework

1. `Go / Plus / Pro` are **personal ChatGPT subscription tiers** on `chatgpt.com`. The main differences are model access, tool coverage, and usage limits.
2. `Codex` is OpenAI's **AI coding agent**, not a separate "chat membership."
3. `OpenAI API` is for the **developer platform** (`platform.openai.com`) when you want to integrate models into your own product, app, or workflow.
4. **ChatGPT subscriptions do not include API usage credits.** API billing is separate and usage-based.

If you only remember one line:

- ChatGPT subscriptions are for using AI inside ChatGPT.
- API billing is for building AI into your own systems.

## 2. What Go, Plus, and Pro are actually selling

Treat Go, Plus, and Pro as three levels of the same product line. The real difference is practical ceiling, not product identity.

| Tier | Simplified positioning | Best fit |
| --- | --- | --- |
| Go | Low-cost expansion above Free, with more messages, uploads, image tools, memory, and related features | Budget-conscious individual users who want more than Free |
| Plus | Higher limits and broader advanced features for heavy daily use | Individual users doing regular writing, analysis, learning, and research |
| Pro | Highest limits and priority experience for very heavy use | High-frequency power users who care about limits and speed |

As of 2026-04-23 on official pages:

- `Plus`: **$20/month** (help center)
- `Pro`: currently **two plans: $100/month and $200/month** (same Pro capability set, different usage headroom)
- `Go`: defined as a low-cost tier; launch materials included a **US $8/month** reference, but Go pricing is region-dependent, so checkout is the final source

Three details to keep in mind:

- Go/Plus/Pro are monthly subscriptions; annual prepay is not currently offered.
- The two Pro plans ($100 / $200) mainly differ by usage allowance (officially framed around roughly 5x vs 20x compared with Plus).
- "Unlimited" on plan pages is not absolute unlimited use. It is still constrained by abuse guardrails and terms.

## 3. Go vs Plus vs Pro limits (as of 2026-04-23)

OpenAI can adjust limits over time. The table below only includes differences explicitly shown on official pages.

| Dimension | Go | Plus | Pro |
| --- | --- | --- | --- |
| Price (USD) | Low-cost tier (pricing display varies by region/currency; checkout final) | `$20/month` | `$100/month` or `$200/month` (roughly `5x / 20x` usage headroom vs Plus) |
| GPT-5.3 message cap | Up to `160 messages / 3 hours` | Up to `160 messages / 3 hours` | GPT-5 family is `unlimited*` (abuse guardrails apply) |
| Thinking cap | Can enable Thinking from the input `+` menu, up to `10 messages / 5 hours` | Can manually select GPT-5.4 Thinking, up to `3000 messages / week` | Includes GPT-5.4 Pro, GPT-5 family is `unlimited*` (abuse guardrails apply) |
| Legacy models (for example 4o) | Not included | Expanded access included | Included, with higher limits |
| Agent mode | Not included | Included, `40 requests / month` | Included, `400 requests / month` |
| Sora | Not included | Included | Included, typically with higher priority and concurrency |
| Voice | Included (check the in-product limit shown on your account) | Included (check the in-product limit shown on your account) | `unlimited*` (abuse guardrails apply) |
| Codex | Available for a limited time (official wording: `limited time`) | Included | Included |

`*` Here, `unlimited` means high practical availability, not unconditional unlimited usage. Terms and system guardrails still apply.

Three details that are commonly misunderstood:

- After Go/Plus reach `160 / 3h`, usage shifts to a mini model until the rolling window resets.
- Plus `3000 / week` applies to manual Thinking selection; automatic Instant-to-Thinking switches are not counted in that weekly bucket.
- If your in-product limit banners differ from this post, trust what your account currently shows.

## 4. How Codex relates to Go, Plus, and Pro

First, definition: `Codex` is a coding agent. You can use it in CLI, IDE, web, and desktop experiences for code understanding, editing, execution, and collaboration.

Current official inclusion language indicates:

- `Plus / Pro / Business / Enterprise / Edu` include Codex
- `Free / Go` can also access Codex during limited-time availability windows

So Codex is not best understood as a fully separate membership. It is better understood as a specialized capability layer across plan tiers, with different limits by tier.

One important billing detail: Codex CLI supports two authentication paths.

- Sign in with your ChatGPT account: usage follows your ChatGPT plan allowances.
- Sign in with an API key: usage follows API billing.

That is why two people can both "use Codex" but see costs in different places.

## 5. What OpenAI API is, and why it is fundamentally different from chat subscriptions

`OpenAI API` is a developer interface, not a chat membership. The core use case is integrating model capabilities into your own systems, for example:

- building your own support bot or knowledge assistant
- running summarization, classification, or extraction in internal workflows
- adding text, image, or voice capabilities to your product

Its billing model is also different: API usage is generally pay-as-you-go (for example by token, request, or tool usage).

Using official pricing visible on 2026-04-23 as a reference point:

- GPT-5.4 text input: about `2.50 USD / 1M tokens`
- GPT-5.4 text output: about `15.00 USD / 1M tokens`

Pricing can change with model updates and regional strategy. Recalculate with the current official pricing page before budgeting.

## 6. The key question: does a ChatGPT subscription include API usage?

Short answer: **No. Subscription fees do not offset API usage, and API credits are not automatically included.**

OpenAI help center guidance is consistent:

- ChatGPT (`chatgpt.com`) and Platform (`platform.openai.com`) use separate billing systems.
- ChatGPT subscription billing does not transfer to API usage.
- To use API, you need to set up payment on the Platform side and pay based on usage.

A single OpenAI account can still do both:

- personal usage through Go / Plus / Pro
- product integration through separate API pay-as-you-go

This split is common in teams and does not conflict.

## 7. Choose by scenario to avoid overbuying

If you are still deciding, this simple path usually works:

- Mostly personal chat and light tools: start with `Go`
- Daily writing, analysis, learning, and research: choose `Plus` first
- Very heavy, high-frequency usage with strong limit sensitivity: consider `Pro` (usually start with `$100`, then move to `$200` for sustained parallel heavy workflows)
- Building your own product or automation with model calls: enable `API` separately, whether or not you subscribe to ChatGPT

Three-line summary:

- `Go / Plus / Pro` are subscription choices for using ChatGPT itself.
- `API` is the engineering choice for building your own AI-powered workflows or products.
- `Codex` can sit between both worlds: plan-based usage with ChatGPT login, or usage-based billing with API key auth.

## 8. FAQ

### 1) What is the biggest practical difference between Go and Plus?

Go is mainly about affordability with higher basic limits than Free. Plus is where advanced capabilities and heavier ongoing usage become meaningfully more comfortable.

### 2) Can Go use Thinking?

Yes. Go can enable Thinking from the input `+` menu, with an officially published limit of `10 / 5h`. If you rely on long reasoning workflows often, Plus or Pro is usually a safer fit.

### 3) Do both Plus and Pro include Agent? How different are the limits?

Yes. Current public limits are Plus `40 / month` and Pro `400 / month`. If Agent is part of your daily workflow, the Pro gap is substantial.

### 4) What is the practical difference between Pro `$100` and Pro `$200`?

The practical difference is usage allowance, not whether core Pro capabilities exist. Both are Pro plans; in official language, `$100` targets serious weekly use while `$200` is for heavier, continuously parallel workloads.

### 5) Pro says "unlimited." Is it truly unlimited?

No. It does not mean unconditional infinite usage. Official language still ties usage to abuse guardrails and terms of use.

### 6) What happens after I hit Go/Plus primary model limits?

After you hit the current rolling-window cap, usage moves to a mini model until reset. This is rolling-window logic, not midnight daily reset logic.

### 7) I already pay for Plus/Pro. Do I still pay separately for API?

Yes. ChatGPT subscriptions and API billing are separate systems, and subscription fees do not offset API call charges.

### 8) Can I downgrade from Plus or Pro to Go?

Yes, you can switch plans. Official guidance indicates no prorated refund for the current cycle; the lower tier usually takes effect in the next billing cycle.

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
