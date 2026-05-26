---
locale: zh
translationKey: grok-build-guide
title: 2026年 Grok Build 发布解读：套餐权限、平台支持、模型与额度指南
headline: Grok Build 实务指南：CLI/TUI 形态、常用命令与套餐选择策略
description: 基于 xAI 2026-05 官方发布与文档，本文系统梳理 Grok Build 的产品定位、可用套餐、上手流程、平台与模型支持、额度逻辑，以及常用内置命令与核心能力。
summary: 本文面向需要评估 Grok Build 是否适配既有研发流程的读者，提供可直接执行的购买判断、安装登录与日常使用建议。
category: AI 开发工具
pubDate: 2026-05-26
updatedDate: 2026-05-26
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - AI Coding Agent
  - CLI
  - Grok
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build 发布后，研发团队通常需要先回答两个问题：它与 Codex CLI、Claude Code、Cursor Agent 的差异在哪里；是否值得纳入既有研发体系。

本文围绕决策所需的关键变量展开：**Grok Build 的定义、可用用户范围、安装与接入路径、CLI 与图形交互形态、可用模型、额度与计费逻辑、以及高频命令集**。

为避免信息错位，先列出关键时间线：

- `2026-05-14`：xAI 在开发者 Release Notes 里把 Grok Build 标记为 beta 可用。
- `2026-05-19`：`grok-build-0.1` 作为早期访问编码模型出现在 Release Notes。
- `2026-05-25`：xAI News 发布《Introducing Grok Build》，面向订阅用户公开早期测试入口。

## 1. 什么是 Grok Build

按 xAI 官方定义，Grok Build 是一款“运行于终端环境的编码代理（agent）”，核心交付形态包括：

- 一个可交互的全屏 TUI（支持鼠标操作）
- 一个可脚本化的 headless CLI（`grok -p ...`）
- 一个可对接其他应用的 ACP agent（`grok agent stdio`）

它并非“在聊天界面外包一层命令执行”，而是将计划制定、代码改动、文件读写、工具调用与并行子代理统一到同一执行链路。

## 2. 哪些套餐可以用 Grok Build

按 `2026-05-25` 的官方发布文，**当前早期 beta 明确开放给两类个人订阅用户**：

- `SuperGrok`
- `X Premium Plus`

同时，xAI 的定价页和团队管理文档显示，团队/企业线可以通过业务许可证方式分配权限：

- `SuperGrok`（business license）
- `SuperGrok Heavy`（business license）

对于个人用户，建议按以下顺序判断：

1. 先确认自己是否是 `SuperGrok` 或 `X Premium Plus`。
2. 再在本机安装 CLI 并登录验证。
3. 如果组织统一采购，则让管理员在 Grok Business 里分配 license。

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

### 3.3 立即进入项目

```bash
cd your-project
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

## 6. 支持使用哪些模型

### 6.1 Grok Build 的核心编码模型

官方在 Build 文档中直接给出：

- `grok-build-0.1`（early access）

它也是 xAI API 上可直接调用的模型，适合将 Build 能力嵌入既有 agent loop。

### 6.2 其他可切换模型

Grok Build 支持在会话内用 `/model <name>` 切换可用模型，也支持在配置里指定默认模型，甚至挂自定义 `base_url` 的模型源。

这意味着：

- CLI 不是只能绑死一个模型。
- 可见模型范围取决于账号权限与当前配置源。

## 7. Grok Build 的额度如何理解（重点）

这一部分最容易产生误读，建议将“订阅额度”与“API 计费”分开处理。

### 7.1 订阅侧（SuperGrok / Premium+）

官方长期公开口径仍偏“档位描述”，不是完整硬配额表。常见关键词通常是：

- `higher rate limits`
- `enhanced quotas`
- `much higher rate limits`（Heavy）

换言之，**官方已确认不同订阅层级存在差异，但尚未将 Grok Build 的每日固定次数公开为稳定配额表**。实践中可按以下方式评估：

1. 通过 `/usage` 观察当前 session 的 token/credit 消耗。
2. 用一周真实任务压测，判断是否常撞限制。
3. 再决定是否从普通档升级到更高档位。

### 7.2 API 侧（开发者计费）

若采用 xAI API，按 `2026-05-15` 文档口径：

- `grok-build-0.1`：输入 `$1.00/1M tokens`，缓存输入 `$0.20/1M`，输出 `$2.00/1M`
- 工具调用另计（例如 `web_search` / `x_search` / `code_execution` 通常是 `$5/1k calls`）

**数据日期：2026-05-26。以上价格仅供参考，最终以官方计费页实时展示为准。**

## 8. Grok Build 常用内置命令（优先记这 12 个）

在日常开发中，以下命令的使用频率较高：

- `/model <name>`：切换模型
- `/plan`：查看当前计划（适合先审再改）
- `/usage`：查看 token / credit 使用
- `/context`：看上下文占用
- `/new`：新开会话
- `/resume`：恢复历史会话
- `/rewind`：回滚到会话早期节点
- `/compact`：压缩历史上下文，降低冗余
- `/feedback`：把 bug / 建议直接发给 xAI
- `/plugins`：打开插件扩展页
- `/skills`：查看/启用 skills
- `/mcps`：管理 MCP 工具入口

此外，shell 层面的以下命令也较为常见：

- `/memory`：检索和编辑持久记忆
- `/imagine`：文生图
- `/imagine-video`：文生视频

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

## 10. 结论：适配人群与观察人群

更适合立即试用的人群：

- 以终端作为主要研发界面的开发者或团队
- 希望将“计划 + 代码改动 + 工具调用”收敛到单一入口的团队
- 已具备 `SuperGrok` 或 `X Premium Plus` 权益的用户

建议先观察再决定的人群：

- 对“独立桌面 GUI”高度依赖的用户
- 对固定硬配额透明度要求较高的用户（而非档位描述）
- 当前工作流已深度绑定其他 agent 平台的团队

核心结论：**Grok Build 已具备进入真实研发流程的可用性，但最佳适配场景仍是“终端优先 + 自动化优先”，而非“桌面 GUI 优先”。**

## 官方参考

- [Introducing Grok Build（xAI News, 2026-05-25）](https://x.ai/news/grok-build-cli)
- [Grok Build Getting Started（xAI Docs）](https://docs.x.ai/build/overview)
- [Modes and Commands（xAI Docs）](https://docs.x.ai/build/modes-and-commands)
- [Headless & Scripting（xAI Docs）](https://docs.x.ai/build/cli/headless-scripting)
- [Skills, Plugins & Marketplaces（xAI Docs）](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [Enterprise Deployments（xAI Docs）](https://docs.x.ai/build/enterprise)
- [xAI Developer Release Notes（May 2026 条目）](https://docs.x.ai/developers/release-notes)
- [xAI Pricing（Grok plans）](https://x.ai/pricing)
- [xAI API Pricing（grok-build-0.1 与 tools 计费）](https://docs.x.ai/developers/pricing)
- [Manage Licenses and Users（Grok Business）](https://docs.x.ai/grok/management)
