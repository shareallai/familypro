---
locale: zh
translationKey: codex-multi-account-mac-guide
title: Mac 上 Codex 多开教程：两个 Plus 账号不用切换
headline: 在 Mac 上多开 Codex：一个 Plus 额度用完后切到另一个账号
description: macOS Codex 多开指南：用 CODEX_HOME 与 open -n -a Codex 隔离本地登录态，适合一个 Plus 账号额度用完后切到另一个账号。
summary: 一个 Plus 账号额度用完后，不必反复退出登录；给第二个 Codex 实例指定独立 CODEX_HOME，就能保留另一套账号状态。
category: AI 工具教程
pubDate: 2026-05-14
updatedDate: 2026-05-14
author: Mark
service: General
tags:
  - Codex
  - ChatGPT Plus
  - macOS
  - 多账号
  - CODEX_HOME
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

场景很具体：一个 ChatGPT Plus 账号的 Codex 额度用完了，另一个 Plus 账号还有额度。如果只用一个 Codex 实例，就只能退出当前账号、重新登录另一个账号，用完后再切回来。这个过程不复杂，但很打断工作。

在 macOS 上，可以用下面这条命令打开第二套 Codex 环境：

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

默认 Codex 继续使用 `~/.codex`；这条命令打开的新实例使用 `~/.codex-work`。你可以在默认窗口登录账号 A，在新窗口登录账号 B。以后一个账号额度用完时，直接切到另一个窗口继续工作，不需要来回退出登录。

需要先说明边界：这不是绕过额度，也不是把两个 Plus 账号的额度合并。Codex 的用量仍然跟各自登录的 ChatGPT 账号走。这里解决的只是本机登录态隔离。

## 1. 什么时候值得这样多开 Codex

最适合的场景就是双 Plus 账号轮换：账号 A 的 Codex 额度已经用完或接近用完，账号 B 仍然可用。与其在同一个窗口里反复退出、登录，不如让两个账号各自保留一套本地状态。

如果你只是偶尔切一次账号，手动退出登录也可以。多开的价值在于高频使用：你可以把主账号和备用账号固定在两个 Codex 实例里，减少授权、扫码、等待回调这类重复操作。

它也适合把个人账号和工作账号分开，但这不是本文重点。本文只解决一个实际问题：一个号额度不够时，如何更顺手地切到另一个号。

## 2. 具体操作

先正常打开 Codex，并登录第一个 Plus 账号。这个实例通常会使用默认目录：

```bash
~/.codex
```

然后在 Terminal 执行：

```bash
mkdir -p "$HOME/.codex-work"
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

新打开的 Codex 会使用 `~/.codex-work`。在这个窗口里登录第二个 Plus 账号即可。

也可以写成 macOS `open` 的 `--env` 形式，含义更明确：

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

以后要打开第二个账号，就继续使用同一个 `CODEX_HOME` 目录。目录名可以自定义，例如 `~/.codex-plus2`、`~/.codex-work`，但不要把它放进项目仓库，也不要同步到公开网盘。

## 3. 为什么这条命令有效

这条命令由两部分组成：

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

`CODEX_HOME` 决定 Codex 使用哪一个本地 home 目录。Codex 的登录状态、配置、会话索引、缓存等本地数据会跟这个目录相关。默认情况下是 `~/.codex`；换成 `~/.codex-work` 后，就形成了另一套本地状态。

`open -n -a Codex` 是 macOS 的应用启动方式。`-a Codex` 表示打开名为 Codex 的 App；`-n` 表示即使 Codex 已经在运行，也再启动一个新实例。少了 `-n`，macOS 可能只是把已有窗口切到前台，第二套 `CODEX_HOME` 不一定会生效。

这就是多开的核心：`open -n` 负责开新实例，`CODEX_HOME` 负责换本地状态目录。两个条件同时满足，才适合用来做双账号隔离。

如果想查看 `open` 参数，可以在 Terminal 执行：

```bash
man open
```

这里的 `open(1)` 指的是 macOS 自带 `open` 命令的 manual page，括号里的 `1` 表示“用户命令”章节。它不是第三方工具，也不是需要额外安装的软件。

## 4. 如何确认两个账号已经分开

默认 Codex 窗口保持登录账号 A。再用下面命令打开第二个窗口：

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

在第二个窗口登录账号 B。随后关闭第二个窗口，再用同一条命令打开一次。如果默认窗口仍然是账号 A，而第二个窗口继续记住账号 B，就说明隔离成功。

如果第二个窗口还是账号 A，优先检查三件事：

- 命令里是否漏了 `-n`。
- 每次是否使用了同一个 `CODEX_HOME` 目录。
- 命令是否从 Terminal 执行，环境变量是否传给了新进程。

仍然不稳定时，先完全退出第二个 Codex 实例，再用更明确的写法重开：

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

## 5. 能不能用于微信、WhatsApp、Telegram

这套思路可以借鉴，但命令不能照抄。

Codex 能这样多开，是因为它会读取 `CODEX_HOME`，并且可以把本地状态放在不同目录下。微信、WhatsApp、Telegram 这类通讯软件通常不是这个模型。它们可能把登录态放在 `~/Library/Containers`、`~/Library/Application Support`、Keychain、浏览器 profile、App Group 容器，或者服务端设备列表里。给它们加 `CODEX_HOME` 没有意义，因为它们不会读取这个变量。

微信不建议硬开多个桌面实例。即使 `open -n -a WeChat` 能拉起第二个进程，也不代表两边有独立数据目录；两个实例争用同一套数据时，登录状态和消息缓存都可能出现问题。

WhatsApp 更适合使用官方多账号能力、已链接设备，或者用不同浏览器 profile 打开 WhatsApp Web。不要为了多开去下载不明来源的“多开版”。

Telegram 则优先使用内置多账号。官方客户端本身支持添加多个账号并切换，通常没有必要强行启动多个 Telegram 进程。

判断一个 App 是否适合多开，重点不是能不能出现两个窗口，而是有没有可靠的状态隔离。没有隔离，多开只是表面上多开。

## 6. 注意事项

不要把 `~/.codex-work` 复制到另一台电脑。这个目录可能包含登录凭据和本地状态。换机器时，更稳妥的做法是在新机器上重新登录。

删除 `~/.codex-work` 会清掉第二套 Codex 环境的本地状态，第二个账号通常需要重新登录，相关配置、会话索引和缓存也可能丢失。

这不是官方账号管理功能，而是利用 macOS 多实例启动和 Codex 本地 home 目录实现的隔离方式。它适合熟悉命令行的 Mac 用户，但不应被理解为服务端层面的账号切换机制。

## 7. 最后保留这两条命令

```bash
# 默认账号
open -a Codex

# 第二个 Plus 账号
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

如果你的主要问题是“一个 Plus 账号额度用完了，想快速切到另一个 Plus 账号”，这两条命令就够用。真正要记住的是：`open -n` 开新实例，`CODEX_HOME` 换本地状态目录。

## 官方参考

- [Apple Developer：Reading UNIX Manual Pages](https://developer.apple.com/documentation/os/reading-unix-manual-pages)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [openai/codex GitHub README](https://github.com/openai/codex)
- [Multiple Accounts Coming to WhatsApp](https://about.fb.com/news/2023/10/multiple-accounts-on-whatsapp/)
- [WhatsApp Adds New Features to Simplify Storage, Switch Accounts, and More](https://about.fb.com/news/2026/03/whatsapp-new-features-simplify-storage-switch-accounts/)
- [Telegram: Autoplaying Videos, Automatic Downloads and Multiple Accounts](https://telegram.org/blog/autoplay)
