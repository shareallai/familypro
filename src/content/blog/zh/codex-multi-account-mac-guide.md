---
locale: zh
translationKey: codex-multi-account-mac-guide
title: Mac 上 Codex 多账号管理指南：用轻量工具切换多个 ChatGPT 账号
headline: Codex 不再支持多开后，如何在 Mac 上管理多个 ChatGPT 账号
description: 截至 2026 年 8 月，Codex App 已无法通过 CODEX_HOME 稳定多开。本文介绍用 codex-auth 与 codex-bar 管理多个 ChatGPT 账号、查看额度并快速切换的方法，同时说明平台限制、认证风险，以及与主流方案的功能和资源占用差异。
summary: 过去用 CODEX_HOME 多开 Codex 的办法已经走不通了。好在多账号管理仍有轻量的替代方案，只是思路从“同时多开”变成了“保存账号，随用随切”。
category: AI 工具教程
pubDate: 2026-05-14
updatedDate: 2026-08-28
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

如果你以前按照本文的方法，用 `CODEX_HOME` 配合 `open -n -a Codex` 在 Mac 上打开两套 Codex，那么现在可以不用再折腾这条命令了。截至 2026-08-28，这种方式已经不能稳定保留两个并行登录的 ChatGPT 账号。

变化之后，需求其实没有消失：一个账号的 Codex 额度用完了，另一个账号还有额度，怎样少做几次退出和重新登录？目前更实用的答案不是重新想办法“多开”，而是先把账号保存下来，需要时切换当前账号。

我现在更推荐 [Loongphy/codex-auth](https://github.com/Loongphy/codex-auth) 和 [xingcan-hu/codex-bar](https://github.com/xingcan-hu/codex-bar) 这套组合。前者负责管理账号，后者把账号与剩余额度放进 Mac 菜单栏。它们不会让两个 Codex App 同时在线，也不会合并不同账号的额度，但日常切换已经顺手许多。

## 1. 旧方法为什么走不通了

原来的做法，是给第二个 Codex 进程指定另一套本地目录：

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

它要成立，既要求 macOS 真正启动另一个独立的 Codex 进程，也要求新进程采用指定的 `CODEX_HOME`。随着 Codex App 的行为变化，这两个条件已经不能形成可靠的账号隔离。重复执行 `open -n`，或者换一个目录名，最多只能算尝试，不能再作为稳定方案。

因此，新的思路只保留一套当前登录状态。其他账号的认证信息由工具收好，轮到哪个账号使用，就把它切换为当前账号。它没有“两个窗口各登一个号”那么直观，却比反复退出、授权和登录省事。

## 2. 两个轻量工具怎样配合

`codex-auth` 是这套方法的基础。它在终端里完成账号登录、保存、查看和切换，并维护一份多账号注册表。如果你习惯命令行，只安装它就可以了。

`codex-bar` 则是一个很小的 macOS 菜单栏应用。它沿用 `codex-auth` 的账号注册表，在菜单中显示当前账号的 5 小时和每周剩余额度，也能点选另一个账号。登录新账号、删除账号或设置别名，仍然回到 `codex-auth` 处理；菜单栏只负责把最常用的查看与切换放在手边。

两者所处的平台也略有区别。`codex-auth` 的文档列出了 Codex CLI、VS Code 扩展和 Codex App。Codex CLI 或 Codex App 切换账号后，需要重启客户端才能使用新的登录状态。项目虽然还有一个实验性的 `codex-auth app` 命令，尝试让 App 无需重启切换，但作者已经注明它不稳定，可能随着官方客户端更新而失效，不适合当成日常依赖。

`codex-bar` 只面向 macOS，要求 macOS 13 或更高版本。它目前没有现成的官方安装包，需要借助 Apple Command Line Tools 从源码构建；同时只支持 ChatGPT/Codex 登录，不支持 API Key，也不会替你刷新已经过期的令牌。

## 3. 先用 codex-auth 保存账号

安装前，电脑需要有 Node.js 和官方 Codex CLI。下面两条命令会把 Codex CLI 与 `codex-auth` 安装到全局：

```bash
npm install -g @openai/codex
npm install -g @loongphy/codex-auth
```

如果暂时不想全局安装，也可以用 `npx @loongphy/codex-auth list` 直接运行。正式使用时，先登录一个 ChatGPT 账号，再按同样的方法继续添加其他账号：

```bash
codex-auth login

# 普通登录不方便时，可以改用设备授权
codex-auth login --device-auth
```

账号保存好以后，查看和切换只需要下面几条命令：

```bash
# 查看所有账号，以及当前正在使用的账号
codex-auth list
codex-auth list --active

# 打开交互式选择，或按列表编号直接切换
codex-auth switch
codex-auth switch 02
```

切换完成后，重启 Codex CLI 或 Codex App。VS Code 扩展若没有马上更新登录状态，重载窗口或重启 VS Code 即可。这里切换的是 `~/.codex/auth.json` 对应的当前账号，并不会在后台同时运行多套 Codex。

## 4. 再把账号放进 Mac 菜单栏

经常查看额度的话，可以继续安装 `codex-bar`。确认系统版本不低于 macOS 13，并已安装 Apple Command Line Tools，然后从源码构建：

```bash
git clone https://github.com/xingcan-hu/codex-bar.git
cd codex-bar
./scripts/test.sh
./scripts/build_app.sh
./scripts/install.sh /Applications
open "/Applications/Codex Bar.app"
```

启动后，它会读取 `~/.codex/accounts/registry.json`。菜单里没有账号，通常不是应用坏了，而是还没有通过 `codex-auth login` 把账号加入注册表。

平时点开菜单，可以看到各账号的 5 小时与每周剩余额度；点选另一个账号后，应用会把相应的认证快照复制到 `~/.codex/auth.json`。为了避免客户端仍握着旧状态，切换后仍建议重启正在运行的 Codex CLI 或 Codex App。

## 5. 为什么我没有优先选择 CodexBar

[steipete/CodexBar](https://github.com/steipete/CodexBar) 无疑是更成熟、也更流行的项目。截至 2026-08-28，它在 GitHub 上约有 2.06 万个 star，macOS 用户可以下载 Release，也可以直接运行：

```bash
brew install --cask codexbar
```

它的长处在于功能完整。除了 Codex，CodexBar 还能汇总 Claude、Cursor、Gemini、GitHub Copilot 等许多服务的额度、重置时间、运行状态和本地费用信息。菜单栏 App 要求 macOS 14 或更高版本，附带的命令行工具另有 macOS 和 Linux 构建。对于同时使用多个 AI 服务的人，这种统一视图很有价值。

不过，我自己的需求只是管理几个 ChatGPT/Codex 账号。此前在 Mac 上使用 CodexBar 时，我观察到它的 CPU 和内存占用明显高于 `codex-auth` 加 `codex-bar`，最后还是选择了功能更少的轻量组合。

这不是一组统一的性能测试，只是我在自己的设备上的使用感受。CodexBar 的版本、启用的服务数量、刷新频率和本机环境都会改变资源占用。如果你需要它的多服务监控能力，完全可以先安装试用，再以活动监视器中的实际表现作决定。

## 6. 使用第三方账号工具前要知道什么

方便来自对认证文件的直接管理，也意味着这里需要多一点谨慎。`codex-auth` 会保存各账号的认证文件，在切换时更换当前的 `~/.codex/auth.json`；`codex-bar` 读取同一份注册表，并把选中的认证快照复制到当前位置。这些文件相当于账号凭据，不应上传到网盘或代码仓库，更不要转发给其他人。

为了刷新额度，两款工具还会携带 ChatGPT 访问令牌，请求 OpenAI/ChatGPT 的后端用量接口。这不是公开、稳定的 API，字段与访问方式都可能发生变化。`codex-auth` 可以加上 `--skip-api`，只从本地会话读取用量数据，但本地记录有时会缺失或滞后数小时，看到的数字未必最新。

如果只想减少几个账号之间的登录操作，先使用 `codex-auth`，已经足以解决问题；确实需要在菜单栏随时查看额度，再补上 `codex-bar`。至于功能更完整的 CodexBar，更适合同时管理多种 AI 服务、并且愿意为丰富功能接受更高常驻开销的用户。

## 官方参考

- [Loongphy/codex-auth：Codex 多账号管理命令行工具](https://github.com/Loongphy/codex-auth)
- [xingcan-hu/codex-bar：配合 codex-auth 的轻量 macOS 菜单栏应用](https://github.com/xingcan-hu/codex-bar)
- [steipete/CodexBar：多服务额度监控菜单栏应用](https://github.com/steipete/CodexBar)
- [OpenAI：Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [OpenAI Codex GitHub 仓库](https://github.com/openai/codex)
