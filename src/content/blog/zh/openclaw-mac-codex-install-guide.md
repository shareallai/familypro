---
locale: zh
translationKey: openclaw-mac-codex-install-guide
title: Mac 上 OpenClaw 安装与 Codex 接入实战指南
headline: 在 Mac 上安装 OpenClaw，并完成 Codex OAuth 接入
description: 面向开发者的 OpenClaw for Mac 最新实操，覆盖安装脚本、onboarding 与 direct login 的选择、OAuth 回调排错、模型状态检查和 embeddings 前置条件。
summary: 一篇可直接照做的 macOS 安装与接入指南，重点是先跑通 OpenClaw + Codex，再用最少命令验证环境真的可用。
category: AI 工具教程
pubDate: 2026-03-24
updatedDate: 2026-03-27
author: Mark
service: OpenClaw
tags:
  - OpenClaw
  - Codex
  - Mac
  - AI Agent
  - OAuth
draft: false
---

如果你的目标是把 AI Agent 真正用进日常开发，而不是只停在聊天窗口，OpenClaw 在 macOS 上是一个很实用的起点。它把模型调用、认证、Gateway 和工作区配置放在同一条运行链路里，后续做自动化时会更稳。

这篇文章按当前公开文档重写（核对日期：2026-03-27）。重点不是堆更多命令，而是把最容易踩坑的决策讲清楚：你该选哪条登录路径、怎样确认配置真的生效、哪些问题不能靠 Codex OAuth 一次性解决。

## 1. 先定接入路线：`openai-codex` 还是 `openai`

先分清 provider 才不会走弯路。根据 [OpenAI provider 文档](https://docs.openclaw.ai/providers/openai)：

- `openai-codex/*`：面向 ChatGPT / Codex 订阅 OAuth。
- `openai/*`：面向 OpenAI API Key。

如果你准备直接用 ChatGPT 账号授权，就选 `openai-codex`。如果你要走 API Key 计费，才是 `openai` 这条线。

## 2. 在 Mac 上先跑最短可用安装路径

根据 [Install 文档](https://docs.openclaw.ai/install)，推荐顺序是：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw doctor
openclaw gateway status
```

这组命令能先回答四个关键问题：CLI 是否可执行、基础环境是否健康、Gateway 是否正常。

安装前你还要知道两点：

- 当前推荐 Node 24，兼容下限是 Node 22.14+。
- 想安装但不立刻进入 onboarding，可以用 `--no-onboard`。

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

## 3. 接入 Codex：首次优先 onboarding，维护期用 direct login

从 [OpenAI provider 文档](https://docs.openclaw.ai/providers/openai) 看，两个命令都受支持：

```bash
# 首次安装更推荐
openclaw onboard --auth-choice openai-codex

# 已安装环境里补登录/重登录
openclaw models auth login --provider openai-codex
```

为什么首次更推荐 onboarding？因为它会把默认模型选择与认证放进一条连续流程，不容易漏步骤。

如果你已经装好 OpenClaw，只是 token 过期或需要换账号，direct login 更快。

## 4. OAuth 回调报错时，不要先判死刑

根据 [OAuth 文档](https://docs.openclaw.ai/concepts/oauth)，OpenClaw 的 Codex 流程是 PKCE。CLI 会尝试监听本地回调（常见是 `http://127.0.0.1:1455/auth/callback`）。

关键点是：回调页打不开，不等于登录必然失败。文档明确给了兜底方式：本地无法绑定回调时，可以把浏览器最终跳转 URL 或 code 粘贴回终端继续。

这也是很多人误判“OAuth 挂了”的来源。实际问题常常是本地回调监听受限，而不是 OpenAI 授权本身失败。

## 5. 安装完成后，用模型命令做收口验证

根据 [Models 文档](https://docs.openclaw.ai/concepts/models)，至少跑这组：

```bash
openclaw models status
openclaw models list --provider openai-codex
openclaw models status --check
```

你应重点看三件事：

- `models status` 是否显示已解析的主模型和 auth 状态。
- `models list --provider openai-codex` 是否列出当前账号可见模型。
- `models status --check` 的退出码是否健康（自动化场景很有用）。

另外，provider 文档还说明 `openai/*` 与 `openai-codex/*` 默认 transport 为 `auto`（WebSocket 优先，失败回退 SSE）。首次安装一般不需要手动改 transport。

## 6. 最常被忽略的一点：Codex OAuth 不覆盖 embeddings

根据 [FAQ](https://docs.openclaw.ai/help/faq)，Codex OAuth 只覆盖 chat/completions，不自动提供 OpenAI embeddings。也就是说：

- 只做 Codex 推理：OAuth 通常够用。
- 要做 semantic memory search 且使用 OpenAI embeddings：仍需 `OPENAI_API_KEY`（或等价 provider 配置）。

很多“我都登录了为什么记忆检索还是不通”的问题，根源就在这里。

## 7. 一套更稳妥的执行顺序（SOP）

1. 脚本安装 OpenClaw。
2. 先跑 `openclaw --version`、`openclaw doctor`、`openclaw gateway status`。
3. 首次场景走 `openclaw onboard --auth-choice openai-codex`。
4. 跑 `openclaw models status` 和 `openclaw models list --provider openai-codex`。
5. 需要自动化守护时，加上 `openclaw models status --check`。
6. 只有确实要做 memory search 时，再补 embeddings provider 与 API Key。

## 结语

在 Mac 上配置 OpenClaw + Codex，难点不是命令本身，而是顺序。先把安装、认证、模型可见性这三层跑通，再去扩展 transport、fallback、memory，排错成本会低很多。

## 官方参考

- [OpenClaw GitHub 仓库](https://github.com/openclaw/openclaw)
- [Install](https://docs.openclaw.ai/install)
- [Onboarding (CLI)](https://docs.openclaw.ai/start/wizard)
- [OpenAI provider](https://docs.openclaw.ai/providers/openai)
- [Models](https://docs.openclaw.ai/concepts/models)
- [OAuth](https://docs.openclaw.ai/concepts/oauth)
- [FAQ](https://docs.openclaw.ai/help/faq)
