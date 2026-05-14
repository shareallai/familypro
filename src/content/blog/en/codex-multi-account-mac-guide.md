---
locale: en
translationKey: codex-multi-account-mac-guide
title: "Open Two Codex Accounts on Mac Without Logging Out"
headline: Switch Codex to another Plus account on Mac with CODEX_HOME
description: Use CODEX_HOME and open -n -a Codex on macOS to keep a second Plus account signed in, so you can switch when one account hits its Codex limit.
summary: When one Plus account runs out of Codex quota, a separate CODEX_HOME lets a second Codex instance keep another account signed in.
category: AI Tooling
pubDate: 2026-05-14
updatedDate: 2026-05-14
author: Mark
service: General
tags:
  - Codex
  - ChatGPT Plus
  - macOS
  - Multi-account
  - CODEX_HOME
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

The use case is simple: one ChatGPT Plus account has run out of Codex quota, while another Plus account still has room. If you use only one Codex window, switching means signing out, signing in again, and then doing the same thing in reverse later.

On macOS, you can keep a second Codex environment open with a separate local home directory:

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

Your normal Codex app keeps using `~/.codex`. The new instance uses `~/.codex-work`, so it can stay signed in to a different Plus account. When account A hits its limit, you move to the Codex window for account B instead of going through the sign-in flow again.

This does not merge limits or bypass usage rules. Codex usage still belongs to the ChatGPT account that is signed in. The only thing this changes is how local sign-in state is stored on your Mac.

## 1. When this setup is worth using

This is most useful when you actively rotate between two Plus accounts. For example, account A has reached its Codex limit, account B is still available, and you want to keep working without replacing the current login session.

If you only switch accounts once in a while, signing out manually may be enough. The separate `CODEX_HOME` approach is worth it when you use both accounts often enough that repeated auth flows become friction.

It can also separate a personal account from a work account, but the main problem here is narrower: one account is out of quota, and you want a clean way to move to another one.

## 2. Set up the second Codex profile

Open Codex normally first and sign in to your primary Plus account. That instance usually uses the default directory:

```bash
~/.codex
```

Then run this in Terminal:

```bash
mkdir -p "$HOME/.codex-work"
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

Sign in to the second Plus account in the new Codex window.

You can also pass the environment variable through macOS `open` explicitly:

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

Use the same `CODEX_HOME` path whenever you want to reopen that second account. The directory name is up to you; `~/.codex-work` or `~/.codex-plus2` are both fine. Do not put this directory in a project repo or sync it to a public drive.

## 3. Why the command works

The command has two jobs:

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

`CODEX_HOME` tells Codex which local home directory to use. Sign-in state, configuration, session indexes, caches, and related local data are tied to that directory. By default, Codex uses `~/.codex`; with the override above, this instance uses `~/.codex-work`.

`open -n -a Codex` is the macOS app-launch part. `-a Codex` launches the Codex app, and `-n` asks macOS to open a new instance even if Codex is already running. Without `-n`, macOS may simply bring the existing window forward, and your alternate `CODEX_HOME` may never be used.

That is the whole mechanism: `open -n` gives you another app instance; `CODEX_HOME` gives that instance a different local state directory.

To inspect the `open` options on your own Mac, run:

```bash
man open
```

In `open(1)`, the `(1)` means the user-command section of the Unix manual. It is the built-in macOS command documentation, not a separate tool.

## 4. Confirm the two accounts are isolated

Keep the normal Codex window signed in to account A. Open the second window with:

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

Sign in to account B there. Close that second window, then reopen it with the same command. If the normal window still shows account A and the second window remembers account B, the local states are separate.

If the second window still shows account A, check the basics first:

- Make sure `-n` is present.
- Reuse the same `CODEX_HOME` path each time.
- Launch it from Terminal so the environment variable is actually passed to the new process.

If it still behaves oddly, quit the second Codex instance completely and reopen it with the explicit form:

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

## 5. Does this work for WeChat, WhatsApp, or Telegram?

The idea is portable. The exact command is not.

This works for Codex because Codex reads `CODEX_HOME` and can store local state in separate directories. Messaging apps usually do not work that way. WeChat, WhatsApp, and Telegram may store account state in `~/Library/Containers`, `~/Library/Application Support`, Keychain, browser profiles, app-group containers, or server-side device records. Setting `CODEX_HOME` does nothing for apps that never read it.

For WeChat, forcing another desktop instance is risky. Even if `open -n -a WeChat` starts another process, both instances may still compete for the same local data.

For WhatsApp, prefer official multi-account support, linked devices, or a separate browser profile for WhatsApp Web. Avoid unofficial multi-instance builds.

For Telegram, use the built-in multiple-account feature first. It is usually clearer than running several Telegram processes.

The real question is not whether two windows can appear. It is whether the app has reliable state isolation. Without that, multi-opening is only cosmetic.

## 6. Notes before using this daily

Do not copy `~/.codex-work` to another machine. It may contain credentials and local state. Sign in again on the new Mac instead.

Deleting `~/.codex-work` removes the second Codex profile. You will usually need to sign in again, and local settings, indexes, or cached data may be gone.

This is not an official account-switching feature. It is a practical macOS/Codex local-state workaround for users comfortable with Terminal.

## 7. Keep these two commands

```bash
# Primary account
open -a Codex

# Second Plus account
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

If your real problem is "my current Plus account has hit the Codex limit, and I want to switch to another Plus account without signing out," these two commands are enough.

## References

- [Apple Developer: Reading UNIX Manual Pages](https://developer.apple.com/documentation/os/reading-unix-manual-pages)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [openai/codex GitHub README](https://github.com/openai/codex)
- [Multiple Accounts Coming to WhatsApp](https://about.fb.com/news/2023/10/multiple-accounts-on-whatsapp/)
- [WhatsApp Adds New Features to Simplify Storage, Switch Accounts, and More](https://about.fb.com/news/2026/03/whatsapp-new-features-simplify-storage-switch-accounts/)
- [Telegram: Autoplaying Videos, Automatic Downloads and Multiple Accounts](https://telegram.org/blog/autoplay)
