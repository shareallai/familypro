---
locale: zh
translationKey: openclaw-mac-codex-install-guide
title: OpenClaw for Mac 安装指南：接入 Codex 完成配置
headline: 在 Mac 上安装 OpenClaw，并把 Codex 接入完成配置
description: 按最新官方文档整理的 OpenClaw for Mac 上手流程，覆盖安装、Codex OAuth 登录、默认模型设置、配置文件结构、回调排错与 embeddings 注意事项。
summary: 一篇给开发者看的完整实操指南，重点讲清楚如何在 macOS 上安装 OpenClaw，并用 ChatGPT OAuth 把 Codex 接入为默认模型。
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

如果你想在 Mac 上搭一个能真正干活的 AI Agent 环境，OpenClaw 是一条很直接的路。它不是单纯的模型调用壳子，而是一套把模型、工具、工作区和执行流程接起来的运行框架。对开发者来说，真正有价值的地方在于：模型切换、Agent 默认配置、认证状态、服务状态和工作目录，都能收在一套相对统一的体系里。

而在模型接入这件事上，Codex 又是很多人最先会考虑的选项。原因也很现实：如果你本来就在用 ChatGPT / Codex 订阅，走 OAuth 通路通常比重新准备 API Key 更顺手，尤其适合个人开发者或小团队先把流程跑通。

这篇文章基于 2026 年 3 月 24 日可见的 OpenClaw 官方文档重写。重点不是把命令列满，而是把第一次配置时最容易混淆的几个点讲清楚：OpenClaw 到底负责什么，`openai-codex` 和 `openai` 有什么区别，第一次该用 onboarding 还是直接 auth login，以及装完之后该怎么验证自己不是“看起来配好了，其实还没通”。

## 1. 先弄清楚 OpenClaw 和 Codex 各自负责什么

[OpenClaw](https://github.com/openclaw/openclaw) 更像一个 Agent runtime，而不是单纯的模型切换器。它把 provider、认证、Gateway、工作区、工具调用、记忆和自动化收在同一套运行体系里。你一开始不必把这些能力全用上，但只要你的目标不是“聊两句就结束”，而是希望它能稳定地执行任务，这套结构就很重要。

### 1.1 `openai-codex` 和 `openai` 不是一回事

Codex 在 OpenClaw 里对应的 provider 是 `openai-codex`。这一点必须先分清，因为不少人会把它和 `openai` 写成一回事，但两者面向的接入方式并不相同：

- `openai-codex/*` 主要对应 ChatGPT / Codex 订阅 OAuth。
- `openai/*` 主要对应 OpenAI Platform API Key。

也就是说，如果你打算直接用 ChatGPT 账号授权，应该盯着 `openai-codex`；如果你准备按 API 调用计费，用的是 `OPENAI_API_KEY`，那通常应该看 `openai` 这条 provider 线。

官方文档：

- [OpenAI / Codex provider](https://docs.openclaw.ai/providers/openai)
- [Model Providers](https://docs.openclaw.ai/concepts/model-providers)

## 2. 先跑最短可用路径

第一次在 Mac 上配置时，最稳妥的起点仍然是下面这组命令：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw doctor
openclaw onboard --auth-choice openai-codex
```

浏览器里完成授权后，再补三条检查：

```bash
openclaw gateway status
openclaw status --deep
openclaw models status
```

如果这些检查都正常，通常就说明安装、Gateway、OAuth 和默认模型解析已经串起来了。先把这条最短路径跑通，后面再谈细节，会比一开始就钻配置文件更省时间。

## 3. 安装前先确认三件事

### 3.1 Node 版本别太旧

OpenClaw 当前推荐 Node 24，最低要求是 Node 22.16 以上。官方安装脚本会尽量帮你补环境，但你至少要知道：如果系统太旧，问题未必出在 OpenClaw 本身。

### 3.2 浏览器授权本来就是正常流程

Codex 这条接入路径走的是标准 OAuth，不是手动粘贴 API Key。所以安装过程中需要浏览器完成授权，不是“额外步骤”，而是正常主流程的一部分。

### 3.3 先对 PATH 问题有预期

很多“安装失败”其实不是没装上，而是装完以后 shell 找不到 `openclaw`。如果你平时 shell 环境比较干净，提前知道这一点，会少走不少弯路。

安装文档：

- [OpenClaw Install](https://docs.openclaw.ai/install)

## 4. 在 Mac 上安装 OpenClaw

### 4.1 官方脚本仍然是首选

OpenClaw 官方仍然优先推荐脚本安装：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这条命令不只是下载 CLI。按官方说明，它会探测环境、在需要时准备 Node、安装 OpenClaw，并进入 onboarding。

如果你只想先装 CLI，不立刻进入初始化流程，可以改用：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

### 4.2 npm 安装更适合想手动控环境的人

如果你更习惯自己管理全局包，也可以走 npm 路线：

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

这条路没有问题，但对第一次上手的人来说，官方脚本通常更省心，因为它会把环境准备和初始化流程一起串起来。

## 5. 把 Codex 接进 OpenClaw

### 5.1 第一次安装时，优先走 onboarding

按照当前官方文档，下面两条命令都属于受支持的 Codex 登录方式：

```bash
openclaw onboard --auth-choice openai-codex
```

```bash
openclaw models auth login --provider openai-codex
```

如果你是第一次配置，我更建议优先用 onboarding。原因很简单：它会把安装后的初始化、授权和默认模型设置放在一条连续路径里，不容易漏步骤。

### 5.2 已经装好 OpenClaw 时，再用 direct login

`openclaw models auth login --provider openai-codex` 更适合两类场景：一是 OpenClaw 已经装好了，你只需要单独补做授权；二是你想重新登录、检查某个 provider 的 auth 状态，而不想重新走一整轮 onboarding。

也就是说，区别不在于“哪条命令是真的”，而在于“你现在是在第一次配置，还是在维护一个已有环境”。

### 5.3 本地回调异常，不等于 OAuth 失败

Codex 在 OpenClaw 里走的是标准 PKCE OAuth。CLI 会生成授权链接，浏览器完成登录后，再尝试跳回本地回调地址，常见示例是：

```text
http://127.0.0.1:1455/auth/callback
```

这里最常见的误判有两个。第一，浏览器跳到本地回调页出错，不代表整个登录一定失败。官方 OAuth 文档明确提到，如果 CLI 没有成功捕获回调，你可以把浏览器最后跳转到的完整 URL 粘贴回终端，继续完成登录。

第二，登录成功后不需要手动维护 token。OAuth 状态会写进本地 auth profile，OpenClaw 会负责 refresh。你真正该确认的是 auth profile 有没有写进去，而不是自己去找 token 文件硬改。

官方说明：

- [OAuth](https://docs.openclaw.ai/concepts/oauth)

## 6. 安装完成后，先验证再改配置

### 6.1 先用 CLI 看整体状态

很多人一上来就打开 `~/.openclaw/openclaw.json`，其实顺序反了。更好的做法是先用 CLI 把状态看清楚：

```bash
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status
```

这几条命令分工很清楚：

- `openclaw --version`：确认命令已经进 PATH。
- `openclaw doctor`：检查并修复常见配置或状态问题。
- `openclaw gateway status`：确认 Gateway 服务是否已安装并运行。
- `openclaw status --deep`：做更深入的运行态探测。
- `openclaw models status`：检查默认模型解析结果、provider 认证状态，以及 OAuth 是否缺失、过期或即将过期。

如果你想看得更细一点，还可以补两条：

```bash
openclaw models list --provider openai-codex
openclaw models status --check
```

第一条适合确认当前账号实际能看到哪些 Codex 模型；第二条适合放进脚本或自动化里，用退出码直接判断凭证有没有问题。

相关文档：

- [Models CLI](https://docs.openclaw.ai/models)
- [Troubleshooting](https://docs.openclaw.ai/help/troubleshooting)
- [Health Checks](https://docs.openclaw.ai/health)

### 6.2 如果 `openclaw` 命令找不到

最常见原因不是没装上，而是 PATH 没带上 npm 的全局 bin 目录。可以先看一下：

```bash
npm prefix -g
```

然后把下面这行放进 `~/.zshrc`：

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

保存后重新开终端，再执行一次 `openclaw --version`。

### 6.3 默认模型和配置文件通常在哪里看

当前官方文档给出的 Codex 默认示例是：

```text
openai-codex/gpt-5.4
```

如果 onboarding 走得顺，这个值很多时候已经自动写进去了。你可以在 `~/.openclaw/openclaw.json` 里确认，常见位置是：

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

如果你想顺手把配置结构看明白，通常会涉及这几个区域：

- `agents.defaults`：默认 Agent 行为，比如主模型、fallback、workspace。
- `models.providers`：provider 的显式配置。
- `auth` 或 auth profiles：OAuth / API Key 的认证状态。

后面无论你是补 OpenAI API Key、加 OpenRouter，还是改 fallback，基本都还是围绕这套配置体系展开。

配置文档：

- [Configuration](https://docs.openclaw.ai/gateway/configuration)

## 7. 生产使用前，再补看两件事

### 7.1 Codex OAuth 解决的是推理模型，不是 embeddings

这件事在实际使用里特别容易被忽略。Codex OAuth 解决的是推理模型的认证和调用，不会自动替你把 embeddings 问题一起解决。OpenClaw 官方 FAQ 也明确提到：如果你要用 semantic memory search，OpenAI embeddings 仍然需要真实 API Key；单靠 Codex OAuth 不够。

所以如果你的目标只是让 Agent 能调用 Codex，大多数情况下这一步已经够了。但如果你还打算启用记忆、检索、知识库或者语义搜索，就要再单独确认 embeddings provider。

官方 FAQ：

- [FAQ](https://docs.openclaw.ai/faq)

### 7.2 transport 默认通常不用提前改

官方 provider 文档提到，`openai/*` 和 `openai-codex/*` 默认 transport 是 `auto`，会优先尝试 WebSocket，再在需要时回退到 SSE。

这意味着，大多数情况下你不需要手动改 transport。只有在你明确遇到网络兼容问题，或者需要做更细的链路控制时，才值得去碰相关参数。第一次安装时，不建议把这类高级选项提前复杂化。

## 8. 排错时，按层查比来回猜快得多

如果安装或登录有问题，一个比较实用的本地排错梯子是：

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

这组命令的好处是，它把“本地配置问题”“Gateway 服务没起来”“模型 auth 有问题”“运行时健康状态异常”拆开看，不容易把几类错误搅在一起。

## 9. 一套更稳妥的操作顺序

如果你想把这套流程写进自己的常用 SOP，我建议这样排：

1. 用官方脚本安装 OpenClaw。
2. 跑 `openclaw --version` 和 `openclaw doctor`，先确认命令和本地状态没问题。
3. 用 `openclaw onboard --auth-choice openai-codex` 完成第一次 Codex 登录。
4. 用 `openclaw models status` 看默认模型和 OAuth 状态。
5. 用 `openclaw gateway status` 和 `openclaw status --deep` 检查服务与运行态。
6. 只有在工作流真的需要时，再补 embeddings provider、fallback 或更细的 provider 配置。

这样排的好处很直接：一旦出问题，你更容易判断它卡在安装、认证、服务，还是模型配置。

## 10. 可直接复制的命令清单

```bash
# 安装
curl -fsSL https://openclaw.ai/install.sh | bash

# 基础检查
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status

# 第一次接 Codex
openclaw onboard --auth-choice openai-codex

# 已安装环境里补做或重做登录
openclaw models auth login --provider openai-codex

# 确认模型可见性
openclaw models list --provider openai-codex
```

## 11. 结语

现在在 Mac 上把 OpenClaw 接到 Codex，流程已经比早期清楚很多。真正要记住的不是某一条命令，而是几层关系：OpenClaw 负责 runtime 和配置体系，`openai-codex` 负责 ChatGPT / Codex OAuth，`openai` 负责 API Key，而 embeddings 往往是另一件事。

如果你是第一次配置，优先走 onboarding；如果你只是补授权或重新登录，直接用 `openclaw models auth login --provider openai-codex` 也完全没问题。两条路径现在都是官方支持的，只是面对的使用场景不同。
