---
locale: zh
translationKey: codex-multi-account-mac-guide
title: Mac 上 Codex 多账号管理指南：用轻量工具切换多个 ChatGPT 账号
headline: Codex 不再支持多开后，如何在 Mac 上管理多个 ChatGPT 账号
description: 截至 2026 年 8 月，Codex App 已无法通过 CODEX_HOME 稳定多开。本文介绍用 codex-auth 与 codex-bar 管理多个 ChatGPT 账号、查看额度并快速切换的方法，同时说明平台限制、认证风险，以及与主流方案的功能和资源占用差异。
summary: 旧的 CODEX_HOME 多开方式已经失效。现在可以用 codex-auth 管理多个 ChatGPT 账号，再通过轻量的 codex-bar 在 Mac 菜单栏查看额度和切换账号。
category: AI 工具教程
pubDate: 2026-05-14
updatedDate: 2026-08-21
author: Mark
service: General
tags:
  - Codex
  - ChatGPT
  - macOS
  - 多账号管理
  - codex-auth
  - codex-bar
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

截至 2026-08-21，原来通过 `CODEX_HOME` 配合 `open -n -a Codex` 启动第二套 Codex App 的方法已经失效。即使指定不同目录，Codex App 也不能再依靠这条命令稳定保留两个并行登录的 ChatGPT 账号。

如果你的实际需求是管理多个 ChatGPT 账号、查看各账号的 Codex 剩余额度，并在额度用完后切到另一个账号，更可行的做法是使用 [Loongphy/codex-auth](https://github.com/Loongphy/codex-auth) 管理账号，再搭配 [xingcan-hu/codex-bar](https://github.com/xingcan-hu/codex-bar) 提供 Mac 菜单栏入口。

这套方案解决的是账号管理和切换，不会同时运行多个独立的 Codex App，也不会合并不同账号的额度。

## 1. 旧的 Codex 多开方法为什么不再适用

旧方法依赖两个前提：macOS 能为 Codex App 启动多个独立进程，并且每个进程都读取启动时指定的 `CODEX_HOME`。当前 Codex App 的行为已经变化，这两个条件不能再组成可靠的多账号隔离方案。

因此，下面这类命令不应再被当成可用教程：

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

继续尝试不同目录或重复执行 `open -n`，也不能保证得到两套彼此独立的登录状态。现在更合理的思路是保留一个活动账号，通过工具保存其他账号的认证快照，在需要时切换当前账号。

## 2. 推荐组合：codex-auth 加 codex-bar

`codex-auth` 是核心工具。它负责登录、保存、列出和切换多个 Codex 账号，并维护账号注册表。你可以只使用它，不安装任何菜单栏应用。

`codex-bar` 是配套的轻量 macOS 菜单栏应用。它读取 `codex-auth` 使用的同一份账号注册表，显示当前账号的 5 小时和每周剩余额度，也可以从菜单中选择另一个账号。账号登录、导入、删除和别名管理仍由 `codex-auth` 完成。

这两个工具的职责比较清楚：

- 想在终端中管理账号，只安装 `codex-auth`。
- 想随时看额度并从菜单栏切换，再安装 `codex-bar`。
- 切换的是当前活动账号，不是同时打开多个 Codex App。

## 3. 支持哪些平台和 Codex 客户端

### 3.1 codex-auth

`codex-auth` 的项目文档列出的客户端包括 Codex CLI、VS Code 扩展和 Codex App。对于 Codex CLI 和 Codex App，切换账号后需要重启客户端，新账号才会生效。

项目还提供实验性的 `codex-auth app` 命令，尝试让 Codex App 无需重启即可切换账号。不过项目作者明确说明这个功能不稳定，可能随着官方 Codex App 或 Codex CLI 的变化而失效，也可能影响 App 正常运行。日常使用不建议把它当成稳定能力。

### 3.2 codex-bar

`codex-bar` 是原生 macOS 菜单栏应用，要求 macOS 13 或更高版本，并需要 Apple Command Line Tools 才能从源码构建。它目前没有官方预编译安装包，需要克隆仓库后运行项目自带脚本。

它只支持 ChatGPT/Codex 认证，不支持 API Key。它也不负责刷新过期令牌；令牌失效后，需要重新通过 `codex-auth` 登录或导入账号。

### 3.3 steipete/CodexBar

[steipete/CodexBar](https://github.com/steipete/CodexBar) 是更成熟、功能范围更广的方案。其 macOS 菜单栏应用要求 macOS 14 或更高版本，附带的命令行工具则提供 macOS 和 Linux 构建。

CodexBar 不只支持 Codex，还能显示 Claude、Cursor、Gemini、GitHub Copilot 等许多服务的额度、重置时间、状态和本地费用信息。它更适合需要统一监控多个 AI 服务的人，而不是只管理几个 Codex 账号的人。

## 4. 安装和使用 codex-auth

先确保电脑已安装 Node.js 和官方 Codex CLI。然后通过 npm 全局安装：

```bash
npm install -g @openai/codex
npm install -g @loongphy/codex-auth
```

也可以不做全局安装，先查看已有账号：

```bash
npx @loongphy/codex-auth list
```

添加第一个或新的 ChatGPT 账号：

```bash
codex-auth login
```

如果普通登录流程不方便，可以使用设备授权：

```bash
codex-auth login --device-auth
```

列出已保存账号和当前活动账号：

```bash
codex-auth list
codex-auth list --active
```

交互式选择账号，或者按列表编号直接切换：

```bash
codex-auth switch
codex-auth switch 02
```

切换完成后，重启 Codex CLI 或 Codex App。VS Code 扩展如未立即更新登录状态，也应重载窗口或重启 VS Code。

## 5. 安装 codex-bar 菜单栏应用

`codex-bar` 目前需要从源码构建。先确认系统为 macOS 13 或更高版本，并已安装 Apple Command Line Tools，然后执行：

```bash
git clone https://github.com/xingcan-hu/codex-bar.git
cd codex-bar
./scripts/test.sh
./scripts/build_app.sh
./scripts/install.sh /Applications
open "/Applications/Codex Bar.app"
```

应用启动后会读取 `~/.codex/accounts/registry.json`。如果菜单中没有账号，应先回到终端通过 `codex-auth login` 添加账号。

菜单栏可以显示当前账号的 5 小时和每周剩余额度。点击另一个账号会把对应认证快照复制为当前的 `~/.codex/auth.json`；随后仍需重启正在运行的 Codex CLI 或 Codex App，才能稳妥地使用新账号。

## 6. 为什么没有优先推荐 CodexBar

CodexBar 是目前更流行的同类项目。截至 2026-08-21，其 GitHub 仓库约有 2 万个 star，安装也更方便：macOS 用户可以直接下载 Release，或运行 `brew install --cask codexbar`。

如果你同时使用多种 AI 编程服务，需要额度汇总、费用统计、状态轮询、通知和图表，CodexBar 的完整功能更合适。

但如果目的只是管理几个 ChatGPT/Codex 账号，`codex-auth` 加 `codex-bar` 的功能更聚焦。我在自己的 Mac 上使用 CodexBar 时，观察到它的 CPU 和内存占用明显高于这个轻量组合，因此更倾向后者。这只是个人设备上的实际体验，不是统一性能测试；不同版本、启用的服务数量、刷新频率和本机环境都会影响资源占用。

## 7. 认证信息和接口风险

这两款轻量工具都不是 OpenAI 官方产品。使用前需要理解它们如何处理认证信息：

- `codex-auth` 会保存账号认证文件，并通过切换 `~/.codex/auth.json` 改变当前活动账号。
- `codex-bar` 会读取同一账号注册表，并在切换时复制所选账号的认证快照。
- 为刷新额度，工具会携带 ChatGPT 访问令牌请求 OpenAI/ChatGPT 后端接口。
- 这些用量接口不是公开、稳定的 API，字段或访问方式可能随时变化。

`codex-auth` 提供 `--skip-api` 选项，可以只读取本地会话中的用量数据，避免为刷新额度发起上述请求。但本地记录可能缺失或滞后数小时，显示结果不一定是最新状态。

认证文件相当于账号凭据，不要上传到网盘、代码仓库或发送给他人。安装第三方账号工具前，应检查源代码、发布记录和权限范围，并自行判断账号条款与安全风险。

## 8. 如何选择

如果你只需要在多个 ChatGPT/Codex 账号之间切换，先安装 `codex-auth` 就够了。需要随时查看各账号额度时，再加上 `codex-bar`。

如果你同时使用 Codex、Claude、Cursor、Gemini 等多个服务，并希望在一个成熟的菜单栏应用中统一监控，可以选择 CodexBar，同时根据自己的设备观察常驻资源占用。

无论选择哪一种，当前方案的重点都是“管理和切换账号”，不是恢复已经失效的 Codex App 多开能力。

## 官方参考

- [Loongphy/codex-auth：Codex 多账号管理命令行工具](https://github.com/Loongphy/codex-auth)
- [xingcan-hu/codex-bar：配合 codex-auth 的轻量 macOS 菜单栏应用](https://github.com/xingcan-hu/codex-bar)
- [steipete/CodexBar：多服务额度监控菜单栏应用](https://github.com/steipete/CodexBar)
- [OpenAI：Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [OpenAI Codex GitHub 仓库](https://github.com/openai/codex)
