---
locale: zh
translationKey: deepseek-harness-guide
title: DeepSeek Harness 入门指南：插件化 Agent 的安装、适用场景和安全风险说明
headline: DeepSeek Harness 是什么？先弄清它适不适合你的开发工作流
description: DeepSeek Harness 是一套仍在快速迭代的开源 Agent Harness。本文基于 2026 年 8 月 21 日官方资料，说明插件化架构、Web UI 的最短上手流程、适用边界，以及处理代码和会话数据前应注意的权限与隐私问题。
summary: 它不是另一个聊天机器人，而是一套用插件拼装 Agent 运行时的开发者工具。想试用前，先了解它能替换什么、会接触哪些数据，以及为什么不宜直接拿来跑重要生产任务。
category: AI 工具教程
pubDate: 2026-08-21
updatedDate: 2026-08-21
author: Mark
service: General
tags:
  - DeepSeek Harness
  - DeepSeek
  - AI Agent
  - Agent Harness
  - 插件架构
relatedTranslationKeys:
  - codex-claude-cursor-instructions-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - gpt-5-6-sol-terra-luna-guide
draft: false
---

如果你已经用过带终端、文件编辑和网页检索能力的编码 Agent，DeepSeek Harness（命令名 `dsh`）可以把这些能力拆开重组：模型、工具、技能、会话、沙箱、存储、调度和 Web UI 都是插件。它面向的是想研究或定制 Agent 运行方式的开发者，而不是一个安装后就无需配置的成品 IDE。

本文按 **2026-08-21** 可见的官方资料重写。最重要的前提是：DeepSeek Harness 仍处于开发者预览阶段，官方明确提示核心插件和 API 会快速迭代，可能发生不兼容变更。先在隔离的测试项目里使用，比直接接入重要仓库更合适。

## 1. DeepSeek Harness 解决的是什么问题？

DeepSeek Harness 不是一个新模型，也不等同于 DeepSeek 的聊天产品。它是 Agent 的 **harness（运行时外壳）**：模型负责生成判断和文本；harness 则把模型接到文件、命令、网页、会话状态、权限控制等真实环境能力上。

它的核心主张是“所有能力都是插件”。底层 Cordis 内核负责插件的加载、卸载与依赖关系，具体能力则由插件提供。对开发者而言，这意味着可以通过配置选择或替换能力，而不必先修改整个 Harness 源码。

| 能力 | 在 Harness 中的含义 | 对开发者的实际价值 |
| --- | --- | --- |
| 模型与 Provider | 决定请求交给哪个模型服务 | 可按项目接入 DeepSeek 或其他已支持的 Provider |
| 工具与技能 | 让 Agent 读写文件、运行命令、检索信息、执行专项流程 | 能按任务删减或扩展工具面，而不是接受固定工具集 |
| 会话、存储与调度 | 保留上下文、任务过程和协作流程 | 适合观察长任务、恢复会话或研究子 Agent 协作 |
| 沙箱、权限与 UI | 决定操作边界，以及用户如何审阅和介入 | 能把“能不能执行”与“怎样展示”纳入运行时设计 |

这套架构的代价也很直接：你需要理解所启用的插件、Provider 和权限策略。若你的需求只是“在编辑器里补全或聊几句代码”，成熟 IDE 插件往往更省事；如果你在做自定义 Agent、评估运行环境，或需要可替换的能力组合，Harness 才更有价值。

## 2. 最短上手路径：先在测试目录启动 Web UI

官方给出的快速启动方式是安装好 Node.js 后，运行：

```bash
npx @deepseek-ai/dsh web
```

命令会启动 Web UI；默认地址是 `http://127.0.0.1:3080`。第一次不要在包含密钥、客户资料或未提交改动的重要仓库中试运行。更稳妥的做法是新建一个只放示例代码的目录，再从该目录启动：

```bash
mkdir dsh-sandbox
cd dsh-sandbox
npx @deepseek-ai/dsh web
```

进入 Web UI 后，按下面顺序完成最小验证：

1. 打开 **Settings → Models**，填写并保存可用的模型凭据。
2. 选择或添加工作区。官方指南指出：`dsh` 启动目录会成为默认文件系统位置，但新的 Web UI 仍需选定一个工作区，才能开始会话。
3. 先让 Agent 做只读任务，例如“概述这个仓库的目录结构”。确认模型、工作区和权限提示都符合预期后，再尝试编辑文件或运行命令。

DeepSeek 的模型设置页将 API key 设计为只写入：保存后界面只返回脱敏信息，凭据与普通设置分开保存。这能减少密钥在界面中再次暴露的机会，但不改变基本原则：不要把密钥写进仓库、截图、提示词或可分享的会话记录。

## 3. 四种运行模式，应该怎么选？

官方目前列出四类模式。它们不是“性能档位”，而是给模型提供不同能力组合的运行时预设。

### 3.1 Standard：先从完整工作流开始

Standard 模式包含文件编辑、Shell、文件与网页检索、Skills、计划、目标、子 Agent 和工作流等完整工具集。想快速判断 Harness 是否符合团队流程，通常先在受控测试仓库使用这一模式即可。

### 3.2 PTC / Code mode：让模型用代码编排多步调用

PTC（英文页面称 Code mode）会把 Standard 的能力通过 Code Mode SDK 暴露出来，让模型用一段 TypeScript 编排多轮工具调用。它更适合研究复杂操作编排，或需要把重复的多步工具流程组织成程序化执行的场景；也因此更需要审阅权限范围和工具结果。

### 3.3 Minimal：做更干净的环境对照

Minimal 模式只保留持久 Bash 与 `str_replace_editor` 两类工具。它的定位是最小化环境下的模型基准测试：当你想比较模型本身的表现、减少工具和系统提示造成的干扰时，这个模式更合适。它并不等于“更安全”；Shell 仍然是有影响力的能力，权限策略照样要检查。

### 3.4 Creator：构造自己的 Agent 预设

Creator 模式在 Standard 的基础上，加入运行时检查、内存中的插件实验和预设创作辅助。只有当你已经能说明“要替换哪项能力、为何替换、如何验证”时，才值得进入这一层。刚接触时先读现有配置、跑通一个小任务，通常比立即写插件更有效。

## 4. 哪些人值得试，哪些人应先观望？

比较适合试用的情况包括：

- 你在开发自己的编码 Agent 或自动化工作流，希望模型、工具、存储和 UI 都能替换或重组。
- 你要比较不同模型在相同工具环境下的行为，并希望用 Minimal 模式做对照。
- 你需要查看一次任务中系统提示、工具调用、上下文注入和子 Agent 调度是如何串起来的。

更建议先观望的情况也很明确：你需要长期稳定的插件 API、只想要开箱即用的编辑器体验，或没有时间审查插件与权限。开发者预览期的更新节奏、第三方插件质量差异和配置复杂度，都会让生产环境的维护成本上升。

## 5. 运行前必须想清楚：权限、日志和第三方插件

DeepSeek Harness 的可观察性很强。官方说明，模型看到的系统提示、推理、工具调用及结果、子 Agent 调度和上下文注入，都会进入仅追加的会话日志；Trajectory 视图可按来源查看这些记录，恢复、分叉、检索和回放也基于同一事件流。

这对排错很有用，但也意味着你应把会话当作可能包含敏感信息的工程记录来管理。实际执行前，建议至少完成以下检查：

1. 用无敏感数据的最小工作区验证流程；不要把 `.env`、私钥、客户导出文件或生产配置当作第一个测试样本。
2. 查看当前模式允许的文件、Shell、网页与子 Agent 能力，并在需要审批的操作出现时逐项确认。不要因为“本地运行”就默认所有操作无风险。
3. 接入模型 Provider 前，核对该 Provider 对提示词和工具结果的处理政策；代码内容、命令输出和检索结果都可能成为模型请求的上下文。
4. 安装社区插件前，先审查其源码、维护状态、依赖和所需权限，并把版本固定在可复现范围内。插件可组合并不代表每个插件都适合你的数据边界。

## 6. 结论：把它当作 Agent 基础设施，而不是普通聊天工具

DeepSeek Harness 最吸引人的地方不是多一个对话界面，而是把 Agent 的组成部分明确拆成可组合的插件，并保留足够的运行轨迹供开发者检查。对需要搭建、评估或改造 Agent 的人来说，这是一条值得测试的路径。

但它仍是开发者预览。最稳妥的起点是：在隔离目录启动 Web UI，配置一个可控的模型凭据，执行只读小任务，确认日志与权限行为后，再决定是否让它接触真实代码库和第三方插件。

## 官方参考

- <a href="https://deepseek.com/harness/" rel="nofollow">DeepSeek Harness 官方介绍</a>
- <a href="https://github.com/deepseek-ai/deepseek-harness" rel="nofollow">DeepSeek Harness GitHub 仓库与快速启动说明</a>
- <a href="https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md" rel="nofollow">官方 Web UI 使用指南</a>
- <a href="https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md" rel="nofollow">官方模型 Provider 配置指南</a>
