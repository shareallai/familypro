---
locale: en
translationKey: openclaw-mac-codex-install-guide
title: "OpenClaw on macOS: Install and Connect Codex Correctly"
headline: Install OpenClaw on Mac and complete Codex OAuth setup
description: Updated guide for installing OpenClaw on macOS, completing Codex OAuth setup, verifying model and gateway status, and avoiding callback or embeddings mistakes.
summary: A practical setup walkthrough for developers who want a working OpenClaw + Codex workflow on Mac, with a clear verification checklist.
category: AI Tooling
pubDate: 2026-03-24
updatedDate: 2026-04-16
author: Mark
service: OpenClaw
tags:
  - OpenClaw
  - Codex
  - macOS
  - OAuth
  - AI Agent
relatedTranslationKeys:
  - codex-claude-cursor-instructions-guide
  - chatgpt-go-plus-pro-codex-api-guide
  - google-ai-plan-guide
draft: false
---

OpenClaw is useful on macOS when your goal is repeatable agent workflows, not one-off prompts. It gives you a runtime layer that keeps model access, authentication, gateway state, and workspace behavior in one place.

This rewrite is aligned with the currently published docs (checked on 2026-03-27). The focus is on the decisions that usually create setup friction: choosing the right provider lane, picking onboarding vs direct login, validating real model availability, and handling the OAuth/embeddings edge cases early.

## 1. Pick the right provider lane first

Before running commands, decide how you want to authenticate. Based on the [OpenAI provider doc](https://docs.openclaw.ai/providers/openai):

- `openai-codex/*` is for ChatGPT/Codex subscription OAuth.
- `openai/*` is for OpenAI API-key-based access.

If your plan is account-based sign-in, start with `openai-codex`. If your plan is API usage through `OPENAI_API_KEY`, use `openai`.

## 2. Run the shortest working install path on Mac

The [Install doc](https://docs.openclaw.ai/install) supports this baseline flow:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw doctor
openclaw gateway status
```

This tells you quickly whether the CLI is reachable, the local health checks pass, and the gateway service is alive.

Two preflight notes that matter in practice:

- Current recommendation is Node 24, with Node 22.14+ as minimum support.
- If you want to install first and onboard later, use `--no-onboard`.

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

## 3. For Codex auth, use onboarding first, direct login later

The provider docs support both commands:

```bash
# Better for first-time setup
openclaw onboard --auth-choice openai-codex

# Better when OpenClaw is already installed
openclaw models auth login --provider openai-codex
```

For a fresh install, onboarding is safer because model selection and auth happen in one guided path. For existing machines, direct login is the faster maintenance path.

## 4. OAuth callback failure is often recoverable

Per the [OAuth doc](https://docs.openclaw.ai/concepts/oauth), Codex auth uses PKCE and typically returns to a local callback (commonly `http://127.0.0.1:1455/auth/callback`).

If that callback page fails locally, it does not always mean auth failed. The docs explicitly allow continuing by pasting the final redirect URL/code back into the CLI when callback binding is blocked.

That distinction saves time during debugging: many failures are local callback handling issues, not broken OpenAI authorization.

## 5. Validate model readiness before touching advanced config

Use the [Models doc](https://docs.openclaw.ai/concepts/models) workflow:

```bash
openclaw models status
openclaw models list --provider openai-codex
openclaw models status --check
```

What to confirm:

- `models status` resolves a primary model and shows healthy auth state.
- `models list --provider openai-codex` returns models your account can actually use.
- `models status --check` gives machine-friendly pass/fail signaling for CI or scripts.

Also, provider docs note that `openai/*` and `openai-codex/*` default to `auto` transport (WebSocket first, then SSE fallback). In most first-time installs, there is no need to override transport early.

## 6. Commonly missed: Codex OAuth does not include embeddings access

The [FAQ](https://docs.openclaw.ai/help/faq) states this clearly: Codex OAuth covers chat/completions, not OpenAI embeddings.

So:

- If you only need Codex reasoning, OAuth may be enough.
- If you need semantic memory search with OpenAI embeddings, you still need `OPENAI_API_KEY` (or equivalent provider key config).

This is a frequent source of confusion when core model calls work but retrieval/memory flows still fail.

## 7. A practical setup order you can reuse

1. Install with the official script.
2. Run `openclaw --version`, `openclaw doctor`, and `openclaw gateway status`.
3. Complete first-time auth via `openclaw onboard --auth-choice openai-codex`.
4. Verify with `openclaw models status` and `openclaw models list --provider openai-codex`.
5. Add `openclaw models status --check` for automation monitoring.
6. Add embeddings provider/API key only when your workflow actually needs memory search.

## Final note

Most setup pain comes from doing steps out of order. If you verify install, auth, and model visibility first, you can postpone advanced tuning and isolate failures much faster.

## References

- [OpenClaw GitHub repository](https://github.com/openclaw/openclaw)
- [Install](https://docs.openclaw.ai/install)
- [Onboarding (CLI)](https://docs.openclaw.ai/start/wizard)
- [OpenAI provider](https://docs.openclaw.ai/providers/openai)
- [Models](https://docs.openclaw.ai/concepts/models)
- [OAuth](https://docs.openclaw.ai/concepts/oauth)
- [FAQ](https://docs.openclaw.ai/help/faq)
