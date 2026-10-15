---
locale: zh
translationKey: grok-build-guide
title: Grok Build 最新指南：套餐、模型、安装与用量计费
headline: Grok Build 实务指南：CLI/TUI 形态、常用命令与套餐选择策略
description: "按最新官方文档整理 Grok Build 的统一套餐、Grok 4.7 与 Fast 模型、安装登录、终端模式和常用命令，解释共享周额度、API 单独计费及长上下文价格，帮助开发者评估接入成本。"
summary: 本文面向需要评估 Grok Build 是否适配既有研发流程的读者，提供可直接执行的购买判断、安装登录与日常使用建议。
category: AI 开发工具
pubDate: 2026-05-26
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - AI Coding Agent
  - CLI
  - Grok
relatedTranslationKeys:
  - grok-build-commands-beginner-guide
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build 适合希望在终端里完成代码阅读、计划、修改和验证的开发者。选择时需要分清三件事：客户端能做什么、账号实际开放哪些模型，以及每次任务从订阅额度还是 API 账单扣费。

**事实与价格核对日期：2026-10-15。美元价格仅供参考，未含适用税费，最终以官方价格页与账户账单为准。** 本文按当前官方文档更新；需要逐步操作示例，可读[Grok Build 新手命令教程](../grok-build-commands-beginner-guide/)。完整套餐比较见[Grok 新套餐与迁移指南](../xai-grok-x-subscription-plan-guide/)。

## 1. 什么是 Grok Build

按 xAI 官方定义，Grok Build 是一款“运行于终端环境的编码代理（agent）”，核心交付形态包括：

- 一个可交互的全屏 TUI（支持鼠标操作）
- 一个可脚本化的 headless CLI（`grok -p ...`）
- 一个可对接其他应用的 ACP agent（`grok agent stdio`）

它并非“在聊天界面外包一层命令执行”，而是将计划制定、代码改动、文件读写、工具调用与并行子代理统一到同一执行链路。

## 2. 当前套餐与访问资格

新用户应查看 The X Subscription：Free 提供有限访问，Plus 为 $8/月、Premium 为 $30/月、Super 为 $100/月、Ultra 为 $200/月。官网在 Plus 中列出 Grok Build，具体可用模型和余量仍需登录后确认；不能再把旧 SuperGrok 或 X Premium+ 写成唯一购买前提。

Premium、Super、Ultra 的包含用量分别为 Plus 的 4、15、50 倍，但不是固定任务次数。Grok Bot 从 Premium 起包含。存量用户目前可保留原套餐，不应只为试用 Build 就贸然合并账号。团队使用还需管理员确认席位和组织策略。

## 3. 如何使用：快速上手流程（约 5 分钟）

### 3.1 安装

macOS / Linux / WSL：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows（PowerShell）：

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 首次登录

```bash
grok
```

首次启动默认通过浏览器完成认证。在无浏览器环境（例如远程主机、容器）可改用 API key：

```bash
export XAI_API_KEY="xai-..."
grok
```

远程环境不能打开浏览器时，可以使用设备码登录；这不是本机浏览器登录后的必做步骤。

```bash
grok login --device-auth
```

### 3.3 立即进入项目

```bash
cd your-project
grok inspect
grok
```

首次进入项目时，可优先使用以下提示词建立上下文：

- “先解释这个仓库的结构和启动路径”
- “先做 plan，不要改代码”
- “先列出风险，再给修改方案”

### 3.4 脚本化与自动化

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

若需要将其接入 IDE、自动化编排器或内部平台，可使用 ACP：

```bash
grok agent stdio
```

## 4. 支持 CLI 和 GUI 吗？与 codex.app 类似吗

结论如下：**Grok Build 当前以 CLI/TUI 为主体，并非独立桌面 GUI 应用。**

- CLI 入口：支持，且为主入口。
- 交互界面：支持，但形态为终端内全屏 TUI，而非系统级桌面 GUI。
- 与 codex.app 类似的图形化体验：可通过 ACP 集成到其他应用中实现，但官方当前主推仍是终端工作流。

若已习惯 codex.app 这类“可视化工作区 + 指令流”体验，需要明确：Grok Build 的产品定位更接近“终端内的强交互代理”，并非等价替代关系。

## 5. 支持哪些平台

根据官方 Getting Started，当前可确认：

- 桌面/开发环境：`macOS`、`Linux`、`WSL`、`Windows PowerShell`
- 使用入口：本地终端（TUI/CLI）、脚本环境（headless）、ACP 集成

从产品层能力边界看，Grok 同时覆盖：

- `Web`
- `iOS`
- `Android`
- `X`

需要区分的是：**Grok Build 的核心定位是终端编码代理，不等同于移动端聊天应用。**

## 6. 模型选择与配置

### 6.1 Grok 4.7、Fast 与旧模型的区别

官方 Build 入门页目前介绍 `grok-4.7`，API 价格表也列出 `grok-build-0.1`。后者是旧模型，不能再作为客户端当前唯一模型或默认模型的依据。设置示例中的 `grok-build` 是客户端配置名称，不应与 API 模型 ID 混为一谈。

`Grok 4.7 Fast` 是同一 Grok 4.7 模型在更快基础设施上提供的变体，仅在 Cursor 与 Grok Build 内提供，通过所在产品的套餐计费，不在公开 xAI API 中提供，Build 免费档也不包含。更快并不意味着同样任务消耗相同额度。

### 6.2 以账号与实际配置为准

普通终端用 `grok models` 查看可用模型，TUI 中用 `/model <name>` 切换。自定义模型与默认模型放在用户级 `~/.grok/config.toml`；项目 `.grok/config.toml` 的范围主要是 MCP、Plugins 和权限规则，并非所有用户配置都能搬入项目。修改后用 `grok inspect` 确认实际加载来源。

## 7. 共享额度、API 与 Fast 计费

### 7.1 订阅与任务消耗

统一订阅按付费席位提供合资格第一方用量的共享周额度，支持的 Grok 与 Cursor 入口共同消耗。不同任务的成本不同，不能把倍率写成每天固定提问、编码或视频次数。通过 `/usage` 和账户用量页观察真实工作周。

Cursor 中的第三方模型从首次使用起另收费；公开 Grok API 也单独计费，不消耗套餐周额度。自定义 endpoint 的费用应向对应提供商核对。

### 7.2 当前 API 价格与 Fast 成本

以下是全球标准 endpoint 的 `grok-4.7` 每百万 token 美元价格。达到长上下文门槛后，该请求的全部 token 按长上下文档计费，不只是超出部分。

| 输入上下文 | 输入 | 缓存输入 | 输出 |
| --- | --- | --- | --- |
| 少于 200k tokens | $2.00 | $0.50 | $6.00 |
| 200k tokens 及以上 | $4.00 | $1.00 | $12.00 |

Fast 在 Cursor/Build 内按更高费率计入所在套餐：普通上下文为标准 token 费率的 2 倍，长上下文为 1.5 倍。工具调用还可能另收费，不能继续用旧文章里所有工具统一 $5/千次的说法估算。**数据日期：2026-10-15，仅供参考；地区 endpoint、模型、工具和实际账单规则可能改变总费用。**

## 8. 日常命令与较长任务

| 命令 | 用途 |
| --- | --- |
| `/model <name>` | 切换模型 |
| `/plan [description]` | 进入计划模式 |
| `/view-plan` | 查看当前计划 |
| `/usage` | 查看额度或账单入口 |
| `/context`、`/compact` | 检查与压缩上下文 |
| `/new`、`/resume` | 新开与恢复会话 |
| `/rewind` | 返回较早对话节点 |
| `/skills`、`/plugins`、`/mcps` | 打开对应扩展页签 |

`/goal <objective>` 面向有可验证完成条件的长任务；`/create-workflow` 创建流程，`/workflow <name>` 运行已保存流程，`/workflows` 查看运行看板。`/loop` 用于周期提示，`/tasks` 查看后台任务。需要时再启用这些能力，并留意权限与费用；以本机 `/help` 为准。

Plan 的编辑限制与权限模式独立：批准前只允许编辑计划文件，但 bash 和 MCP 仍受其权限规则管理，shell 仍可能写文件，因此 Plan 不等于只读沙箱。

## 9. Grok 常用功能概览（高频场景）

### 9.1 实时检索：Web + X

Grok 的差异化能力之一，是将实时网页搜索与 X 搜索纳入同一回答流程，适用于时效性要求较高的任务。

### 9.2 代码代理工作流

其能力并不局限于代码问答；在获得授权后，还可执行：

- 扫描仓库
- 制定计划
- 执行改动
- 输出 diff 与解释

### 9.3 并行子代理（Subagents）

在大型任务中可拆分多条并行探索路径，适合复杂故障排查、分模块审查与多方向调研。

### 9.4 扩展生态：Skills / Plugins / MCP

Grok Build 可读取本地规则与技能目录，并通过插件和 MCP 接入外部能力；对既有 agent 体系的迁移相对友好。

### 9.5 多模态能力联动

在同一产品线下，可联动图像/视频生成与理解能力，适用于文档、演示、创意与内容生产等场景。

## 10. 如何决定是否接入

先选一个边界清楚的任务，核对登录账号、模型和计费来源；阅读项目规则后提出计划，改完查看 diff 并执行相关测试或 build。记录实际用量再选择档位，比从旧套餐名推断权限更可靠。

需要桌面 GUI 的团队应验证具体集成；已有成熟工具链的团队则先比较同一任务的结果、总费用和迁移成本。客户端能调用工具，并不能替代对交付结果的验收。

## 官方参考

- [Grok Build overview](https://docs.x.ai/build/overview)
- [CLI reference](https://docs.x.ai/build/cli/reference)
- [Modes and commands](https://docs.x.ai/build/modes-and-commands)
- [Plan mode](https://docs.x.ai/build/features/plan-mode)
- [Permissions](https://docs.x.ai/build/features/permissions)
- [Headless and scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Settings](https://docs.x.ai/build/settings)
- [Skills, Plugins and Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API pricing and Grok 4.7 Fast](https://docs.x.ai/developers/pricing)
- [The X Subscription pricing](https://x.ai/pricing)
- [Monthly and annual prices](https://docs.x.ai/x-subscription/pricing)
- [Weekly usage limits](https://docs.x.ai/x-subscription/usage-limits)
