---
locale: zh
translationKey: chatgpt-dot-guide
title: ChatGPT Dot 是什么？普通聊天区别、适用套餐与额度计算详解
headline: ChatGPT Dot 是什么，怎么工作，又占用谁的额度？
description: ChatGPT Dot 能在对话之外持续跟进工作。本文依据官方资料解释它与普通聊天的区别、可用套餐和地区限制、云端运行与记忆原理，并说明哪些操作消耗 Codex 与 ChatGPT Work 额度，帮助你判断是否适合使用。
summary: Dot 可以持续跟进一项工作，也能把具体任务交给 Work 或 Codex。能否使用要看套餐、地区与开放进度；额度则要区分与 Dot 对话和它实际执行的任务。
category: AI 工具指南
pubDate: 2026-10-13
updatedDate: 2026-10-13
author: Mark
service: General
tags:
  - ChatGPT
  - ChatGPT Dot
  - Codex
  - ChatGPT Work
  - AI Agent
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - gpt-6-astra-guide
draft: false
---

如果你希望 ChatGPT 帮你持续盯住一个项目，发现变化后接着处理，而不是每次都重新布置任务，ChatGPT Dot 就是面向这种需求的功能。OpenAI 在文档中使用 **dots** 或 **your dot** 的写法，本文统一称为 Dot。

使用前最需要分清的是：**与 Dot 对话不计入 ChatGPT 用量限制；它启动或管理的 Work、Codex 任务，仍计入对应产品用量。**“聊天不占额度”不能理解成“交给它的所有工作都免费无限运行”。这项区分来自 [OpenAI 的 Dot 介绍](https://learn.chatgpt.com/docs/dots)。

本文的功能、套餐与用量规则核对日期为 **2026-10-13**。文中的额度费率仅供参考，实际以账号用量页面、工作区协议与官方最新规则为准。

## 1. ChatGPT Dot 与普通 GPT 有什么不同

日常说的“普通 GPT”，通常是指打开 ChatGPT 提问、得到回答的聊天方式。GPT 是模型名称中的一部分，Dot 则是一种持续工作的代理体验，两者不在同一个层级。官方说明 Dot 由 **GPT-6 Astra** 驱动，但它的用途不只是换一个模型回答问题。

| 使用方式 | 适合交给它的事情 |
| --- | --- |
| 普通 ChatGPT 聊天 | 解释问题、讨论想法、修改一段文字 |
| ChatGPT Work | 委托一次调研、分析或文件制作任务 |
| Codex | 编写、调试、测试和审查代码 |
| Dot | 持续跟进一项责任，协调后续工作，在需要你决定时联系你 |

这张表按 [官方产品分工](https://learn.chatgpt.com/docs/dots)整理。它比较的是工作方式，并不表示普通聊天没有工具或记忆。

例如，“帮我整理今天的项目反馈”是一项明确任务；“接下来两周跟进项目反馈，发现影响上线的问题就调查，并把需要我决定的事情告诉我”则更适合交给 Dot。你给后者的是持续责任，而不只是一次回复要求。

## 2. 哪些套餐可以使用 Dot

截至核对日期，[官方访问条件](https://learn.chatgpt.com/docs/dots)列出以下套餐：

| 套餐 | Dot 开放条件 |
| --- | --- |
| Pro 100、Pro 200、Pro 500 | 面向超过 18 岁，且位于欧洲经济区、英国、瑞士之外的用户，逐步开放 |
| Business Premium | 全球逐步开放 |
| Enterprise | 全球逐步开放；默认关闭，需要工作区管理员启用 |

Free、Go、Plus、标准 Business 和 Edu 没有列入这份 Dot 资格清单，不能仅凭这些套餐可以使用 Work 或 Codex，就推断它们也支持 Dot。

**符合套餐条件仍可能暂时看不到入口。** Dot 正在分批开放，个人用户还要满足相应年龄与地区条件；企业用户要看管理员设置。若你是为了 Dot 而考虑升级，建议先确认自己账号的入口与资格，避免只看套餐名称就购买。

## 3. Dot 怎么工作：模型、记忆与执行环境

下面是依据官方功能描述整理的运行过程，便于理解产品行为，并不是 OpenAI 公布的内部架构图。

### 3.1 记住工作进度，再决定下一步

你把目标、资料和约束交给 Dot 后，它可以在对话之间继续跟进，判断何时暂停、何时唤醒继续，也可以把工作分给后台代理并行处理。严格按固定时间执行的任务则需要保存日程；指定检查时间、时区、通知条件后，应让它确认已保存的安排。[任务与调度说明](https://learn.chatgpt.com/docs/dots/tasks-and-memory)

这种连续性来自可用的对话上下文、相关 ChatGPT 记忆，以及 Dot 自己保存的工作笔记。笔记记录偏好、决定和进行中的责任，并非所有对话的完整副本；修改 ChatGPT 的记忆设置，也不一定改变 Dot 已经留下的笔记。[记忆说明](https://learn.chatgpt.com/docs/dots/tasks-and-memory)

因此，“一直在线”不应理解成模型每秒都在推理。官方描述的是一种能够在需要时继续工作的机制，具体唤醒算法、轮询频率和内部模型调用流程并未在上述文档中披露。

### 3.2 在云端做事，需要本机时再连接电脑

Dot 有自己的云端电脑与浏览器。研究、文件处理和软件工作可以在这个环境中进行，因此你的电脑关机后，云端工作仍可继续。如果任务需要本地文件或应用，则要单独连接个人电脑，并保持电脑联网、ChatGPT 应用打开。[电脑连接说明](https://learn.chatgpt.com/docs/dots/computers-and-apps)

云端浏览器拥有独立登录会话，不会继承你个人浏览器的登录状态。需要登录网站时，你可以通过私密登录流程或接管浏览器完成；登录后，有效会话可以供后续工作使用。[网站登录说明](https://learn.chatgpt.com/docs/dots/computers-and-apps)

Dot 也能创建 Work 或 Codex 任务，并继续已存在的本地 Codex 任务。新任务会收到完成该工作所需的指令与上下文，而不是自动拿到你和 Dot 的全部聊天记录。云端编程如果需要特定仓库与配置，要先准备相应的 Codex 云端环境。[任务执行环境说明](https://learn.chatgpt.com/docs/dots/tasks-and-memory)

### 3.3 工具权限决定它能做到哪一步

连接应用后，Dot 才能在相应权限内使用资料与工具。连接 Slack 等消息渠道，不等于同时授予邮箱、本机或其他应用访问权。[应用连接说明](https://learn.chatgpt.com/docs/dots/computers-and-apps)

对可能影响账号或分享信息的操作，系统会结合你的指令、权限和安全要求进行自动审查，判断能否执行、是否需要批准，或是否必须由你接手。“帮我写回复草稿”也不等于授权发送。你可以在 Activity 查看具体任务的进展与结果。[操作与审批说明](https://learn.chatgpt.com/docs/dots/controls)

## 4. Dot 占用 Codex 还是 ChatGPT 额度

### 4.1 先看对话，再看实际任务

| 操作 | 用量归属 |
| --- | --- |
| 与 Dot 对话 | 官方明确不计入 ChatGPT 用量限制 |
| Dot 启动或管理 Work 任务 | 按 Work 的用量规则计算 |
| Dot 启动或管理 Codex 任务 | 按 Codex 的用量规则计算 |
| Dot 的 deeper work（更深入的工作） | 套餐包含相应用量 allowance；具体数量看账号当前限制 |

官方还说明，发布后的首月有扩展限制，但没有在 [Dot 介绍页](https://learn.chatgpt.com/docs/dots)给出可套用到所有套餐的固定次数、统一重置周期，或所有后台操作的扣量明细。因此不能据此承诺“每天无限次”或自行编出 Dot 专属额度表。

另一个容易混淆的地方是：**Work 与 Codex 共享用量。** [官方用量与价格页](https://learn.chatgpt.com/docs/pricing)说明，ChatGPT 内的 Work 使用与 Codex 相同的定价、credits 和用量限制。所以 Dot 即使把调研任务交给 Work，也可能减少你之后能用于 Codex 的共享额度；不是只有写代码才会影响它。

### 4.2 额度不是按你发了几句话计算

Work、Codex 的任务消耗取决于实际模型、上下文、推理、工具使用、缓存和执行环境。一次“帮我修好这个问题”，可能经过读文件、运行工具、修改和验证等多个环节。提示词很短，也不能说明任务消耗很少。[官方用量解释](https://learn.chatgpt.com/docs/pricing)

对于采用 credits 计费、且适用官方 token 费率的任务，可按下式理解基础计算：

```text
credits = 非缓存输入 tokens ÷ 1,000,000 × 输入费率
        + 缓存输入 tokens ÷ 1,000,000 × 缓存输入费率
        + 输出 tokens ÷ 1,000,000 × 输出费率
```

截至 2026-10-13，Standard 速度下 GPT-6 Astra 的这三项费率分别为 **250、25、1,250 credits / 百万 tokens**。假设某个适用该费率的任务累计产生 10,000 非缓存输入 tokens 和 2,000 输出 tokens，没有缓存输入，则基础模型消耗为 `0.01 × 250 + 0.002 × 1,250 = 5 credits`。[官方 credits 费率](https://learn.chatgpt.com/docs/pricing)

这个例子只解释指定条件下的 credits 算法，**不能拿来计算与 Dot 对话的收费，也不能反推订阅包含多少次 Dot 任务**。订阅内额度与购买的 credits 还可能采用不同速度倍率；官方也提醒，credits 单价本身不能确定订阅内用量。实际剩余额度与重置时间应以账号的 usage dashboard 为准。[用量页面说明](https://learn.chatgpt.com/docs/pricing)

## 5. 第一次使用，怎样交代任务更有效

获得入口后，可以在 ChatGPT 手机应用、桌面应用或桌面浏览器创建 Dot，设置名字，并连接这次工作真正需要的应用。手机端应使用最新应用；移动网页不支持创建流程。[官方上手指南](https://learn.chatgpt.com/docs/dots/getting-started)

建议先选一项边界清楚的责任，而不是一次把所有工作交给它。例如：

> 接下来两周，帮我跟进这份产品上线清单。使用我提供的需求文档和已连接的反馈渠道，发现影响上线的问题时整理证据，并提出下一步建议。只有时间表变化或需要我决定时才通知我。涉及代码修改，先告诉我任务范围，得到我同意后再创建 Codex 任务；对外回复先给我看草稿。若需要固定日程，请确认检查时间、上海时区和结束日期。

这种写法把资料来源、通知条件和任务权限说清楚，也方便你从第一轮结果判断它是否理解目标。跑一项小任务后，再检查 Activity 中的输出和账号用量，确认质量与消耗都符合预期，再扩大职责。[官方建议从持续责任开始并审阅首轮结果](https://learn.chatgpt.com/docs/dots/getting-started)

## 官方参考

- [OpenAI：Meet dots——产品定位、访问资格与用量归属](https://learn.chatgpt.com/docs/dots)
- [OpenAI：Tasks and memory——任务调度、记忆与上下文](https://learn.chatgpt.com/docs/dots/tasks-and-memory)
- [OpenAI：Computers and apps——云端电脑、本机与应用连接](https://learn.chatgpt.com/docs/dots/computers-and-apps)
- [OpenAI：Control your dot——任务检查、权限与审批](https://learn.chatgpt.com/docs/dots/controls)
- [OpenAI：Get started with your dot——创建与首次使用](https://learn.chatgpt.com/docs/dots/getting-started)
- [OpenAI：Pricing——Work 与 Codex 共享用量、tokens 与 credits](https://learn.chatgpt.com/docs/pricing)
