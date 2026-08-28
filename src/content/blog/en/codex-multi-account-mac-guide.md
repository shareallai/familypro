---
locale: en
translationKey: codex-multi-account-mac-guide
title: Manage Multiple Codex Accounts on Mac with Lightweight Tools
headline: How to manage multiple ChatGPT accounts on Mac after Codex multi-launch stopped working
description: As of August 2026, CODEX_HOME no longer provides reliable Codex multi-launch. Use codex-auth and codex-bar to save accounts, check limits, and switch quickly.
summary: The old CODEX_HOME workaround no longer keeps two Codex accounts open reliably. A lighter approach is to save multiple accounts and switch the active one when needed.
category: AI Tooling
pubDate: 2026-05-14
updatedDate: 2026-08-28
author: Mark
service: General
tags:
  - Codex
  - ChatGPT
  - macOS
  - Multi-account
  - codex-auth
  - codex-bar
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

If you previously used `CODEX_HOME` with `open -n -a Codex` to run two Codex environments on a Mac, that workaround is no longer worth relying on. As of 2026-08-28, it cannot consistently preserve two parallel ChatGPT sign-ins.

The underlying need has not changed. One account may have exhausted its Codex allowance while another still has capacity, and repeatedly signing out and authorizing the next account is tedious. The practical answer now is not to force two app instances. It is to save the accounts, then switch which one is active.

I currently recommend combining [Loongphy/codex-auth](https://github.com/Loongphy/codex-auth) with [xingcan-hu/codex-bar](https://github.com/xingcan-hu/codex-bar). The first manages stored accounts; the second puts account status and remaining usage in the Mac menu bar. They do not keep two Codex apps online at once or combine account limits, but they make routine switching much less disruptive.

## 1. Why the old workaround no longer works

The earlier method assigned another local directory to a second Codex process:

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

For this to work, macOS must start a genuinely separate Codex process, and that process must honor the supplied `CODEX_HOME`. Changes in Codex App behavior mean those two conditions no longer provide dependable account isolation. Repeating `open -n` or trying a different directory name may occasionally appear to work, but it is not a stable setup.

The replacement approach keeps one active sign-in. A helper stores the other accounts' authentication data, and switching an account makes its credentials current. It is less visual than having one account in each window, but it avoids repeating the complete sign-out and authorization flow.

## 2. How the two lightweight tools fit together

`codex-auth` is the foundation. It logs in, stores, lists, and switches accounts from the terminal, maintaining a multi-account registry. If you are comfortable with the command line, it is the only tool you need.

`codex-bar` is a small macOS menu bar app built around the same registry. It shows the active account's remaining 5-hour and weekly usage and lets you select another account. New sign-ins, account removal, and aliases still belong in `codex-auth`; the menu bar keeps only the frequent status and switching actions close at hand.

The supported environments differ slightly. The `codex-auth` documentation lists Codex CLI, the VS Code extension, and Codex App. After switching accounts for Codex CLI or Codex App, restart the client so it picks up the new sign-in. The project also offers an experimental `codex-auth app` command that attempts to switch Codex App without a restart, but its author explicitly describes it as unstable and vulnerable to changes in the official client. Do not build a daily workflow around it.

`codex-bar` is macOS-only and requires macOS 13 or later. It currently has no prebuilt official installer, so you need Apple Command Line Tools and must build it from source. It supports ChatGPT/Codex authentication only, not API keys, and it does not refresh expired tokens for you.

## 3. Save accounts with codex-auth

Before installing, make sure the Mac has Node.js and the official Codex CLI. These commands install the CLI and `codex-auth` globally:

```bash
npm install -g @openai/codex
npm install -g @loongphy/codex-auth
```

If you prefer not to install it globally yet, run `npx @loongphy/codex-auth list`. For normal use, sign in to one ChatGPT account, then repeat the process for each additional account:

```bash
codex-auth login

# Use device authorization when the normal flow is inconvenient
codex-auth login --device-auth
```

Once the accounts are stored, these commands cover listing and switching:

```bash
# Show every account and identify the active one
codex-auth list
codex-auth list --active

# Open an interactive picker, or switch directly by row number
codex-auth switch
codex-auth switch 02
```

Restart Codex CLI or Codex App after the switch. If the VS Code extension does not update immediately, reload its window or restart VS Code. The tool is replacing the current account represented by `~/.codex/auth.json`; it is not running several Codex environments in the background.

## 4. Put account status in the Mac menu bar

If you check limits often, add `codex-bar`. Confirm that the Mac runs macOS 13 or later and has Apple Command Line Tools, then build it from source:

```bash
git clone https://github.com/xingcan-hu/codex-bar.git
cd codex-bar
./scripts/test.sh
./scripts/build_app.sh
./scripts/install.sh /Applications
open "/Applications/Codex Bar.app"
```

At launch, it reads `~/.codex/accounts/registry.json`. An empty menu usually means no accounts have been added with `codex-auth login`, not that the menu bar app is broken.

Open the menu to see each account's remaining 5-hour and weekly usage. Selecting another account copies its stored authentication snapshot to `~/.codex/auth.json`. Restart any running Codex CLI or Codex App afterward so the client does not continue using stale in-memory state.

## 5. Why I did not choose CodexBar first

[steipete/CodexBar](https://github.com/steipete/CodexBar) is unquestionably the more mature and popular project. As of 2026-08-28, it has about 20,600 GitHub stars. Mac users can download a release or install it with Homebrew:

```bash
brew install --cask codexbar
```

Its strength is breadth. Alongside Codex, it can consolidate usage limits, reset times, service status, and local cost information for Claude, Cursor, Gemini, GitHub Copilot, and many other services. The menu bar app requires macOS 14 or later; its companion CLI also provides macOS and Linux builds. That unified view is useful if you routinely work across several AI services.

My own requirement is narrower: managing a few ChatGPT/Codex accounts. On my Mac, I observed noticeably higher CPU and memory use from CodexBar than from `codex-auth` plus `codex-bar`, so I kept the smaller toolset.

That observation is not a controlled benchmark. CodexBar's version, enabled providers, refresh interval, and the Mac itself can all affect resource use. If you need its multi-service monitoring, install it and judge the current build in Activity Monitor on your own system.

## 6. Understand the authentication risks first

The convenience comes from direct management of authentication files, so handle them as credentials. `codex-auth` stores an authentication file for each account and replaces the current `~/.codex/auth.json` during a switch. `codex-bar` reads the same registry and copies the selected snapshot into place. Do not upload these files to cloud storage or a code repository, and never send them to another person.

To refresh usage data, both tools send the ChatGPT access token to OpenAI/ChatGPT backend usage endpoints. These are not public, stable APIs, so fields and access behavior may change. `codex-auth` supports `--skip-api`, which reads usage from local session records instead, but those records can be absent or several hours behind.

If your only goal is to reduce repeated sign-ins across a few accounts, start with `codex-auth`. Add `codex-bar` only if menu bar access to limits and switching is useful. The full CodexBar project is a better fit when you want one dashboard for many AI services and accept a larger resident footprint in exchange.

## References

- [Loongphy/codex-auth: command-line account manager for Codex](https://github.com/Loongphy/codex-auth)
- [xingcan-hu/codex-bar: lightweight macOS menu bar app for codex-auth](https://github.com/xingcan-hu/codex-bar)
- [steipete/CodexBar: multi-service usage monitor](https://github.com/steipete/CodexBar)
- [OpenAI: Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [OpenAI Codex GitHub repository](https://github.com/openai/codex)
