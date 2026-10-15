---
locale: en
translationKey: grok-build-guide
title: "Grok Build 2026 Guide: Plans, Models, Limits, and Commands"
headline: How to evaluate Grok Build for your engineering workflow
description: "Updated Grok Build guide covering unified plans, Grok 4.7 and Fast, setup, terminal modes, commands, shared usage and separate API billing."
summary: This article is for teams deciding whether Grok Build fits an existing delivery workflow, with practical guidance on access, onboarding, and day-to-day usage.
category: AI Developer Tools
pubDate: 2026-05-26
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - AI Coding Agent
  - CLI
  - Engineering Workflow
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build brings repository reading, planning, edits and verification into a terminal workflow. Evaluate client capabilities, the models your account actually exposes and whether work is billed to a subscription or an API account separately.

**Facts and prices checked: 2026-10-15. USD prices are for reference only, exclude applicable taxes and must be checked against official pricing and your bill.** This guide reflects current documentation. See the [new Grok subscription guide](../xai-grok-x-subscription-plan-guide/) for purchasing and migration.

## 1. What Grok Build is

Per xAI documentation, Grok Build is a coding agent that runs in terminal environments, with three primary operating modes:

- An interactive fullscreen TUI with mouse support.
- A headless CLI path for scripts and automation (`grok -p ...`).
- ACP mode for integration with external apps (`grok agent stdio`).

In practice, this is not just a chat shell around command execution. It is a single execution chain that combines planning, edits, file operations, tool calls, and parallel subagents.

## 2. Current plans and access

New customers compare The X Subscription: Free offers limited access; Plus costs $8/month, Premium $30, Super $100 and Ultra $200. The pricing page lists Grok Build under Plus. Confirm the available models and remaining usage after signing in; legacy SuperGrok or X Premium+ is no longer the sole purchase prerequisite.

Premium, Super and Ultra include 4x, 15x and 50x Plus usage, not fixed task counts. Grok Bot starts at Premium. Existing subscribers can currently keep their plan; do not merge accounts merely to test Build. Teams must also check seat assignment and organization policies.

## 3. How to use it: fast onboarding flow (about 5 minutes)

### 3.1 Install

macOS / Linux / WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows (PowerShell):

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 First authentication

```bash
grok
```

By default, first launch opens browser authentication. In no-browser environments (for example, remote hosts or containers), use an API key:

```bash
export XAI_API_KEY="xai-..."
grok
```

If the remote environment cannot open a browser, device-code login is an alternative, not an extra step required after browser login.

```bash
grok login --device-auth
```

### 3.3 Start in a repository

```bash
cd your-project
grok inspect
grok
```

Useful first prompts in production repositories:

- "Map this repository and identify boot paths."
- "Enter plan mode first, do not edit files yet."
- "List risks first, then propose edits."

### 3.4 Headless and automation paths

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

For IDE orchestration or internal tooling, use ACP:

```bash
grok agent stdio
```

## 4. Does it support CLI and GUI? Is it similar to codex.app?

The short answer: **Grok Build is currently CLI/TUI-first, not a standalone desktop GUI app.**

- CLI: yes, and it is the main entry point.
- Interactive UI: yes, but terminal-native (fullscreen TUI), not a desktop windowed GUI.
- codex.app-like graphical flow: possible through ACP integration into other software, but not the default product form today.

If your team primarily prefers visual workspace tooling, treat Grok Build as a terminal-centric agent platform rather than a one-to-one GUI replacement.

## 5. Which platforms are supported

From official Getting Started docs, confirmed setup environments are:

- `macOS`
- `Linux`
- `WSL`
- `Windows PowerShell`

At the product family level, Grok capabilities also span:

- `Web`
- `iOS`
- `Android`
- `X`

Important distinction: Grok Build itself is positioned as a terminal coding agent, not as a mobile chat application.

## 6. Model selection and configuration

### 6.1 Grok 4.7, Fast and earlier models

The current Build overview introduces `grok-4.7`; API pricing still lists `grok-build-0.1`. The older ID is not evidence of the client's only or default model. The `grok-build` name in a settings example is a client configuration name, not automatically the same as an API model ID.

Grok 4.7 Fast serves the same model on faster infrastructure. It is available only in Cursor and Grok Build, billed through the product plan, not on the public xAI API. Build's free tier does not include it. Faster responses can carry higher usage costs.

### 6.2 Check the account and configuration

Use `grok models` in the shell and `/model <name>` in the TUI. Custom model definitions and defaults belong in user-level `~/.grok/config.toml`. Project `.grok/config.toml` supports MCP, plugins and permission rules rather than every user setting. Run `grok inspect` to confirm the loaded sources.

## 7. Shared usage, API billing and Fast costs

### 7.1 Subscription consumption

Each paid seat receives a weekly pool for eligible first-party usage across supported Grok and Cursor surfaces. Different activities cost different amounts; multipliers do not promise daily messages, coding tasks or videos. Check `/usage` and the live account usage view during a normal working week.

Third-party models in Cursor are separately billed from first use. Public Grok API calls are also billed separately and do not draw from that pool. A custom endpoint follows its provider's billing.

### 7.2 Current API rates and Fast

These are global standard-endpoint `grok-4.7` USD rates per million tokens. Once the long-context threshold is reached, its rates apply to all tokens in the request, not only the excess.

| Prompt context | Input | Cached input | Output |
| --- | --- | --- | --- |
| Below 200k tokens | $2.00 | $0.50 | $6.00 |
| 200k tokens or more | $4.00 | $1.00 | $12.00 |

Within Cursor/Build, Fast costs 2x standard token rates for shorter context and 1.5x for long context, billed through the product plan. Tools may add charges; the old blanket estimate of $5 per thousand calls for every tool should not be reused. **Data date: 2026-10-15, for reference only. Regional endpoints, selected models, tools and billing terms can change the total.**

## 8. Everyday commands and longer tasks

| Command | Purpose |
| --- | --- |
| `/model <name>` | Switch models |
| `/plan [description]` | Enter plan mode |
| `/view-plan` | Open the current plan |
| `/usage` | View usage or billing |
| `/context`, `/compact` | Inspect or compact context |
| `/new`, `/resume` | Start or resume a session |
| `/rewind` | Return to an earlier conversation turn |
| `/skills`, `/plugins`, `/mcps` | Open extension tabs |

Use `/goal <objective>` for longer work with a verifiable finish line. `/create-workflow` authors a workflow, `/workflow <name>` runs one and `/workflows` opens the run dashboard. `/loop` handles recurring prompts and `/tasks` lists background work. Adopt these when needed, monitor permissions and costs, and check local `/help`.

Plan's file-edit gate is independent of permission mode: only its plan file can be edited before approval, but bash and MCP still follow tool permissions. Shell commands can still write, so Plan is not a read-only sandbox.

## 9. Common Grok capabilities and where they matter

### 9.1 Real-time information retrieval (Web + X)

A key differentiator is the combined use of real-time web search and X search in one response flow. This is most valuable in time-sensitive research contexts.

### 9.2 Agentic coding workflow

Beyond answering code questions, Grok Build can execute repository scanning, plan generation, code changes, and diff explanation once appropriate permissions are granted.

### 9.3 Parallel subagents

For large tasks, work can be split into multiple parallel exploration tracks, which is useful for complex incident diagnosis and multi-module analysis.

### 9.4 Skills, plugins, and MCP ecosystem

Grok Build can discover local rules and skill directories, and extend via plugins and MCP integrations, making migration from existing agent ecosystems relatively straightforward.

### 9.5 Multimodal capabilities in the same product line

The same Grok product family also includes image/video generation and understanding paths, useful for documentation, demos, and content-oriented workflows.

## 10. Deciding whether to adopt

Try a bounded task after checking the account, model and billing source. Read project rules, review the plan, inspect the diff and run the relevant tests or build. Choose a tier from measured usage rather than assumptions based on old subscription names.

Teams needing a desktop GUI should test the actual integration. Established workflows should compare results, total costs and switching effort on the same task. Tool access does not replace acceptance checks.

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
