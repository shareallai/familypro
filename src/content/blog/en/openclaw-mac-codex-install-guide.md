---
locale: en
translationKey: openclaw-mac-codex-install-guide
title: "OpenClaw on Mac: Install It and Connect Codex"
headline: How to install OpenClaw on Mac and connect it to Codex
description: A practical Mac setup guide for OpenClaw with Codex OAuth, covering install steps, config structure, model checks, callback fixes, and embeddings caveats.
summary: A developer-focused walkthrough for installing OpenClaw on macOS and wiring Codex in as the default model with the supported OAuth flow.
category: AI Tooling
pubDate: 2026-03-24
updatedDate: 2026-03-24
author: Mark
service: OpenClaw
tags:
  - OpenClaw
  - Codex
  - macOS
  - OAuth
  - AI Agent
draft: false
---

If you want a Mac-based AI agent stack that can do more than chat, OpenClaw is a sensible place to start. It is not just a wrapper around model calls. It gives you a runtime for models, auth, gateway services, workspaces, tools, memory, and automation. That matters because once you move past toy prompts and into repeatable workflows, the hard part is rarely “can I call a model?” It is “can I keep the whole environment predictable?”

Codex is a common first choice in that setup for an equally practical reason: if you already live inside ChatGPT or Codex, OAuth can be a cleaner on-ramp than standing up API-key billing on day one. That makes OpenClaw plus `openai-codex` a very approachable combination for solo developers and small teams.

This guide is based on the OpenClaw docs available on March 24, 2026. The goal here is not to throw every CLI command at you. It is to clarify the parts that usually get blurred together: what OpenClaw is responsible for, how `openai-codex` differs from `openai`, when to use onboarding versus direct auth login, what the config file actually controls, and how to verify that the install is genuinely working instead of merely looking plausible.

## 1. Understand what OpenClaw does and what Codex does

[OpenClaw](https://github.com/openclaw/openclaw) makes more sense as an agent runtime than as a simple model switcher. It sits above providers, auth, gateway state, workspaces, tools, memory, and automation. You do not need every layer on day one, but that structure is exactly why it can grow from “call a model” into “run work reliably.”

### 1.1 `openai-codex` is not the same thing as `openai`

Inside OpenClaw, Codex lives under the `openai-codex` provider. That matters because people often blur it together with the plain `openai` provider, but they support different entry points:

- `openai-codex/*` is the lane for ChatGPT or Codex subscription OAuth.
- `openai/*` is the lane for OpenAI Platform API-key usage.

So if your plan is “sign in with my ChatGPT account,” you want `openai-codex`. If your plan is “use `OPENAI_API_KEY` and pay per API usage,” you are usually looking at `openai`.

Docs:

- [OpenAI / Codex provider](https://docs.openclaw.ai/providers/openai)
- [Model Providers](https://docs.openclaw.ai/concepts/model-providers)

## 2. Start with the shortest working path

For a first-time Mac setup, this is still the cleanest place to begin:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw doctor
openclaw onboard --auth-choice openai-codex
```

After the browser sign-in finishes, verify the stack:

```bash
openclaw gateway status
openclaw status --deep
openclaw models status
```

If those commands look healthy, install, gateway, auth, and default model resolution are usually all in place. Run this path first; then add nuance only where you actually need it.

## 3. Check these three things before you start

### 3.1 Your Node version

OpenClaw currently recommends Node 24 and supports Node 22.16 or newer. The installer can help you, but it still helps to know the floor before you begin.

### 3.2 Browser-based auth is part of the normal flow

Codex on this path uses OAuth, not copy-pasted API keys. That means a browser step is expected, not a weird detour.

### 3.3 Keep shell PATH issues in mind

A surprising number of “the install failed” reports are really “the install worked, but the shell cannot find `openclaw`.” Knowing that up front saves time.

Install doc:

- [OpenClaw Install](https://docs.openclaw.ai/install)

## 4. Install OpenClaw on macOS

### 4.1 The official script is still the default choice

The recommended install method is still the official script:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

That does more than download a CLI. According to the docs, it detects the environment, prepares Node when necessary, installs OpenClaw, and launches onboarding.

If you want the binary in place before doing setup, use:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

### 4.2 The npm route is for people who want tighter control

There is also a manual npm route:

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

That works, but the official script is usually the better first pass because it reduces environment drift and keeps setup more predictable.

## 5. Connect Codex to OpenClaw

### 5.1 Use onboarding for a first-time setup

As of the current OpenClaw docs, both of these are valid Codex login commands:

```bash
openclaw onboard --auth-choice openai-codex
```

```bash
openclaw models auth login --provider openai-codex
```

If you are starting from scratch, I would still choose onboarding first. It keeps initialization, auth, and default model setup in one flow, which means fewer places to miss a step.

### 5.2 Use direct login when auth is the only thing you need

`openclaw models auth login --provider openai-codex` is the better fit when OpenClaw is already installed and you only need to add, refresh, or repair Codex auth.

So the difference is not which command is “real.” The difference is whether you are doing a first setup or maintaining an existing install.

### 5.3 A broken callback page does not always mean the login failed

Codex auth in OpenClaw uses standard PKCE OAuth. In practice, the CLI opens an authorization URL, you sign in through OpenAI, and the browser tries to return to a local callback, commonly:

```text
http://127.0.0.1:1455/auth/callback
```

Two details matter here. First, a broken-looking callback page does not automatically mean failure. The OAuth docs explicitly note that if the CLI cannot capture the redirect cleanly, you can paste the final redirect URL back into the terminal and continue.

Second, after login succeeds, OpenClaw stores OAuth state in local auth profiles and handles refresh for you. The real question is whether the auth profile was saved correctly, not whether you should be editing token files yourself.

Doc:

- [OAuth](https://docs.openclaw.ai/concepts/oauth)

## 6. Verify the install before you touch config

### 6.1 Start with CLI-reported health

A lot of people open `~/.openclaw/openclaw.json` too early. The better order is to inspect the CLI-reported state first:

```bash
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status
```

Each command answers a different question:

- `openclaw --version` tells you whether the CLI is reachable from the shell.
- `openclaw doctor` surfaces and repairs common config or state problems.
- `openclaw gateway status` checks whether the gateway service is actually installed and running.
- `openclaw status --deep` performs a deeper runtime probe.
- `openclaw models status` shows the resolved default model, provider auth state, and whether OAuth is missing, expiring, or broken.

If you want more signal, add these:

```bash
openclaw models list --provider openai-codex
openclaw models status --check
```

The first shows which Codex models the current account can actually see. The second is useful in automation because it returns exit codes for missing, expired, or soon-to-expire credentials.

Related docs:

- [Models CLI](https://docs.openclaw.ai/models)
- [Troubleshooting](https://docs.openclaw.ai/help/troubleshooting)
- [Health Checks](https://docs.openclaw.ai/health)

### 6.2 If `openclaw` is not found after install

That is usually a PATH problem, not a failed install. Check the npm global prefix first:

```bash
npm prefix -g
```

Then add the global bin directory to your shell config:

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

Restart the terminal and run `openclaw --version` again.

### 6.3 Where the default model and config usually live

The current OpenClaw docs use `openai-codex/gpt-5.4` as the default Codex example. If onboarding completed cleanly, that may already be written for you. To confirm manually, inspect `~/.openclaw/openclaw.json`.

The minimal shape looks like this:

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "openai-codex/gpt-5.4"
      }
    }
  }
}
```

If you want to understand the config structure instead of copying one field, these are the key sections to notice:

- `agents.defaults` for default agent behavior such as primary model, fallbacks, and workspace.
- `models.providers` for explicit provider configuration.
- auth profiles for OAuth or API-key-backed provider state.

That means later changes like adding OpenAI API access, adding OpenRouter, or defining fallbacks still fit into the same config model.

Config doc:

- [Configuration](https://docs.openclaw.ai/gateway/configuration)

## 7. Two things to confirm before you treat the setup as complete

### 7.1 Codex OAuth handles reasoning access, not embeddings

This is one of the most common hidden assumptions in real-world setups. Codex OAuth gives you a working reasoning-model path. It does not automatically give you an embeddings strategy.

The OpenClaw FAQ is explicit on this point: if you want semantic memory search with OpenAI embeddings, you still need a real API key. Codex OAuth alone is not enough.

So if your goal is only “make the agent run on Codex,” you may already be done. But if you also want retrieval, memory search, or knowledge-base workflows, check embeddings separately.

FAQ:

- [FAQ](https://docs.openclaw.ai/faq)

### 7.2 You probably do not need to touch transport on day one

The provider docs note that both `openai/*` and `openai-codex/*` default to `auto` transport, which means WebSocket first and SSE fallback.

That is useful to know, but not something you should rush to customize unless you have a real compatibility or network reason. For a first install, leaving transport alone is usually the right call.

## 8. When something breaks, walk the stack instead of guessing

A practical local troubleshooting ladder looks like this:

```bash
openclaw status
openclaw status --all
openclaw gateway probe
openclaw gateway status
openclaw doctor
openclaw models status
openclaw health --verbose
openclaw logs --follow
```

That sequence helps separate local config issues, gateway service failures, auth problems, and runtime health issues instead of collapsing them into one vague “it does not work.”

## 9. The setup order I would actually use

If I were writing this into a personal runbook, I would use this order:

1. Install OpenClaw with the official script.
2. Run `openclaw --version` and `openclaw doctor`.
3. Complete first-time Codex auth with `openclaw onboard --auth-choice openai-codex`.
4. Check `openclaw models status` to confirm the resolved default model and OAuth state.
5. Verify gateway and runtime health with `openclaw gateway status` and `openclaw status --deep`.
6. Only then add embeddings providers, fallbacks, or more detailed provider config if the workflow actually needs them.

That order keeps the debugging surface small. When something breaks, you can usually tell whether it belongs to install, auth, service, or model config.

## 10. Copy-paste command block

```bash
# Install
curl -fsSL https://openclaw.ai/install.sh | bash

# Core checks
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status

# First-time Codex setup
openclaw onboard --auth-choice openai-codex

# Re-auth for an existing install
openclaw models auth login --provider openai-codex

# Check what Codex models the account can see
openclaw models list --provider openai-codex
```

## 11. Final note

The Mac setup is much clearer now than it was in earlier OpenClaw releases, but the key idea is still the same: do not treat install, gateway health, auth, and embeddings as one problem. They are related, but they fail differently.

If this is your first pass, use onboarding. If you are repairing an existing install, direct provider login is a perfectly valid path now. Both are supported in the current docs. The difference is simply when to use them.
