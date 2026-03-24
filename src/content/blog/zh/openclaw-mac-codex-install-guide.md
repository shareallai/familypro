---
locale: zh
translationKey: openclaw-mac-codex-install-guide
title: OpenClaw for Mac 安装与配置指南：接入 Codex 作为大模型 API
description: 在 Mac 上安装 OpenClaw 并通过 openai-codex 接入 Codex 的完整指南，覆盖安装、OAuth 认证、默认模型配置、常见问题与排查步骤。
summary: 一篇面向开发者的 OpenClaw 上手文章，重点讲清楚如何在 macOS 上完成安装、通过 onboarding 接入 Codex，并检查默认模型与 embeddings 配置。
category: AI 工具教程
pubDate: 2026-03-24
updatedDate: 2026-03-24
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

如果你想在 Mac 上快速部署 OpenClaw，并把 Codex 接入为默认的大模型能力，这篇文章可以帮你从安装、认证到基础配置一次走通。

根据 OpenClaw 官方文档，macOS 上最省事的方式是直接运行官方安装脚本；安装器会自动检测系统环境、补齐 Node 依赖并启动初始化流程。

## OpenClaw 是什么

[OpenClaw](https://github.com/openclaw/openclaw) 是一个面向 AI Agent 场景的框架，支持模型提供方切换、任务执行、工作区管理以及多种自动化能力。

对开发者来说，它不只是一个“模型调用工具”，更像是一个可以把模型、工具和执行流程串起来的 Agent 运行框架。更多背景可以参考官方的 [模型提供方概念文档](https://docs.openclaw.ai/concepts/model-providers)。

## 为什么选择 Codex

在 OpenClaw 的模型提供方体系里，Codex 对应的 provider 是 `openai-codex`，其认证方式使用 OAuth，而不是传统的 API Key。这个点在官方 FAQ 和 provider 文档里都说明得比较明确：

- [OpenClaw FAQ](https://docs.openclaw.ai/help/faq)
- [OpenAI / Codex provider 文档](https://docs.openclaw.ai/providers/openai)

官方文档显示，在 Codex 路径下，常见可用模型包括 `openai-codex/gpt-5.4`；不过不同账号可见的具体模型列表可能略有差异，最终应以你账号内实际可用的模型为准。

## 环境准备

在开始之前，建议先确认你的 Mac 可以正常使用终端，并具备基础的网络访问能力，以便下载安装资源和完成 OAuth 授权。

OpenClaw 官方安装说明提到，推荐使用 Node 24，或至少使用 Node 22.16 及以上版本。你可以先执行：

```bash
node -v
```

如果你的机器还没有合适的 Node 环境，也不用太担心，因为官方安装脚本会尝试自动处理相关依赖。安装说明见官方文档：[OpenClaw Install](https://docs.openclaw.ai/install)。

## 在 Mac 上安装 OpenClaw

官方推荐的安装命令如下：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这条命令会自动识别当前系统环境，并完成 OpenClaw CLI 的安装与基础初始化。

如果你只想先安装，不想立刻进入 onboarding，也可以这样执行：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

如果你更习惯手动管理 Node 包，也可以通过 npm 直接安装 OpenClaw，然后再执行初始化命令：

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

对应官方安装文档：<https://docs.openclaw.ai/install>

## 安装完成后的检查

安装完成后，建议先执行下面几条命令，确认 OpenClaw 是否已经正常工作：

```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

如果终端提示 `openclaw: command not found`，通常说明 PATH 中没有正确包含 npm 的全局可执行目录。官方文档建议检查 `npm prefix -g` 的输出，并把对应目录加入 shell 配置文件。

例如，你可以把下面这一行写入 `~/.zshrc` 或 `~/.bashrc`：

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

保存后重新打开终端，再次执行 `openclaw --version`，一般就可以确认是否已经修复成功。

## 配置 Codex 认证

接下来是最关键的一步：把 Codex 接入 OpenClaw。

按照 OpenClaw 官方文档，推荐使用 onboarding 流程直接选择 `openai-codex` 完成认证：

```bash
openclaw onboard --auth-choice openai-codex
```

需要特别注意的是，公开 issue 中提到，在部分版本里，`openclaw models auth login --provider openai-codex` 并不是正确入口，因为该子命令主要面向 provider 插件，而 `openai-codex` 的 OAuth 认证实际由 onboarding 流程处理。

参考：

- [模型提供方概念文档](https://docs.openclaw.ai/concepts/model-providers)
- [相关 issue 讨论](https://github.com/openclaw/openclaw/issues/32892)

换句话说，如果你是要登录 Codex，优先使用下面这条命令会更稳妥：

```bash
openclaw onboard --auth-choice openai-codex
```

## OAuth 登录流程说明

执行命令后，终端通常会生成一个 OAuth 授权链接，你需要在浏览器中打开它，并使用自己的 OpenAI/ChatGPT 账号完成授权。

部分用户在浏览器跳转到本地 `localhost` 回调地址后，可能会看到空白页或异常提示，但这并不一定意味着失败。实际关键步骤通常是将浏览器地址栏中的完整回调 URL 复制回终端，以便 OpenClaw 完成后续认证。

如果一切顺利，OpenClaw 会在本地保存认证状态，并把可用的 Codex 模型加入模型列表中。

这部分流程可以结合第三方实操记录理解，但最终仍应以官方文档为准：

- [OpenAI / Codex provider 文档](https://docs.openclaw.ai/providers/openai)
- [Lumadock 教程](https://lumadock.com/tutorials/openclaw-openai-codex-chatgpt-subscription?language=turkish)

## 将 Codex 设为默认模型

OpenClaw 的配置示例显示，模型默认项通常位于主配置文件中，而主配置文件一般位于 `~/.openclaw/openclaw.json`。

如果 onboarding 已经自动完成默认模型设置，那么你可能不需要再手动修改配置；但如果你希望显式指定主模型，可以参考类似下面的写法：

```json
{
  "agents": {
    "defaults": {
      "workspace": "~/.openclaw/workspace",
      "model": {
        "primary": "openai-codex/gpt-5.4"
      }
    }
  }
}
```

这里的 `primary` 表示默认主模型，而 `workspace` 则对应 Agent 的工作目录。

需要注意的是，具体模型名称应以你当前账号在 OpenClaw 中实际可见的 Codex 模型列表为准，因为不同账户可能看到不同的型号。参考：

- [配置示例文档](https://docs.openclaw.ai/gateway/configuration-examples)
- [OpenAI / Codex provider 文档](https://docs.openclaw.ai/providers/openai)
- [Lumadock 配置参考](https://lumadock.com/tutorials/openclaw-cli-config-reference)

## 配置文件位置与结构

公开的配置参考资料显示，OpenClaw 通常使用单一配置文件管理模型、认证、工具和 Agent 默认项，主配置文件路径一般为 `~/.openclaw/openclaw.json`。

在这个配置体系里，常见会涉及几个重点区域：

- `agents.defaults`：设置默认 Agent 行为
- `models.providers`：定义模型提供方
- `auth.profiles`：保存认证资料

这意味着，如果你后续要扩展到 OpenAI API Key、OpenRouter、本地模型或其他 provider，也大概率会继续围绕这一个配置文件展开。

可参考：

- [Gist 配置参考](https://gist.github.com/digitalknk/4169b59d01658e20002a093d544eb391)
- [Lumadock 配置说明](https://lumadock.com/tutorials/openclaw-cli-config-reference)
- [官方配置示例](https://docs.openclaw.ai/gateway/configuration-examples)

## 一个容易忽略的问题：Embeddings

如果你准备用 Codex 作为主模型，还需要额外注意 embeddings。公开讨论中有人提到，Codex 方案本身不一定自带 embeddings，因此当你启用记忆、检索或知识库相关功能时，可能还需要额外配置 embeddings 提供方。

这也意味着，实际生产使用中很可能会出现“Codex 负责推理与生成，另一个 provider 负责 embeddings”的组合，这一点在搭建完整 Agent 工作流时尤其需要提前确认。

参考：

- [Wes Bos 相关讨论](https://x.com/wesbos/status/2024610896811524535)
- [官方配置示例](https://docs.openclaw.ai/gateway/configuration-examples)

## 推荐的安装与配置顺序

如果你希望尽量少踩坑，建议按下面的顺序来操作：

1. 运行官方安装脚本安装 OpenClaw。
2. 使用 `openclaw --version`、`openclaw doctor` 和 `openclaw gateway status` 检查环境。
3. 执行 `openclaw onboard --auth-choice openai-codex`。
4. 在浏览器中完成 OpenAI/ChatGPT 账号授权。
5. 按提示把回调 URL 粘贴回终端。
6. 检查默认模型是否已经设置为可用的 Codex 模型。
7. 如果需要记忆或检索功能，再单独补 embeddings 配置。

参考来源：

- [OpenClaw 安装文档](https://docs.openclaw.ai/install)
- [Issue 32892](https://github.com/openclaw/openclaw/issues/32892)
- [Wes Bos 讨论](https://x.com/wesbos/status/2024610896811524535)

## 常见问题

### 1. 安装成功，但命令无法执行

这类问题大多与 PATH 配置有关。只要把 npm 的全局 bin 目录正确加入 shell 环境变量，通常就能解决。

### 2. 为什么不用 `models auth login`

因为在部分版本中，`models auth login --provider openai-codex` 并不是 Codex OAuth 的正确入口。根据公开 issue 的说明，Codex 认证更适合通过 onboarding 流程完成。

### 3. 登录成功后仍然看不到目标模型

这种情况通常需要优先检查当前 OpenClaw 版本、账号权限以及 onboarding 是否真正完成了认证持久化。

### 4. Codex 能否直接覆盖所有模型能力

不一定。尤其是在 embeddings 相关场景下，你可能还需要额外补充其他模型或 API 配置。

## 可直接复制的命令清单

下面这组命令适合直接放在文章末尾，读者可以按顺序执行：

```bash
# 1) 安装 OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# 2) 检查安装状态
openclaw --version
openclaw doctor
openclaw gateway status

# 3) 通过 onboarding 接入 Codex
openclaw onboard --auth-choice openai-codex
```

如果你需要手动调整默认模型，再打开配置文件检查 `~/.openclaw/openclaw.json` 中的 `agents.defaults.model.primary` 是否已经指向可用的 Codex 模型即可。

## 结语

如果你的目标是在 Mac 上快速搭建一个可执行任务的 AI Agent 环境，那么 OpenClaw 是一个值得尝试的方案，而通过 `openai-codex` 接入 Codex 则能让整体配置流程更加顺畅。

对大多数开发者来说，最推荐的路径是：先完成 OpenClaw 安装，再通过 onboarding 完成 Codex OAuth 认证，最后检查默认模型和 embeddings 配置是否完整，这样通常就可以比较稳定地把 Codex 作为 OpenClaw 的大模型 API 使用起来。

官方文档入口：

- [安装文档](https://docs.openclaw.ai/install)
- [OpenAI / Codex provider 文档](https://docs.openclaw.ai/providers/openai)
