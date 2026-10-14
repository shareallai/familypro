---
locale: zh
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: ChatGPT Go、Plus、Pro 如何选择：Codex 与 API 计费
headline: ChatGPT Go、Plus、Pro 分别适合谁？同时厘清 Codex 与 OpenAI API 的关系
description: "截至 2026 年 10 月 14 日，对比 ChatGPT Go、Plus、Pro，介绍 GPT-6.1 Sol、Astra 与 Luna，说明 Codex 权限、Pro 三档价格和 API 独立计费。"
summary: "从使用场景选择 Go、Plus 或 Pro，了解新模型在 Work、Codex 和 API 中的区别，以及哪些调用需要另外付费。"
category: AI 订阅对比
pubDate: 2026-03-31
updatedDate: 2026-10-14
author: Mark
service: General
tags:
  - ChatGPT Go
  - ChatGPT Plus
  - ChatGPT Pro
  - Codex
  - OpenAI API
  - AI 订阅
relatedTranslationKeys:
  - google-ai-plan-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: familypro ChatGPT 方案低至 5.5 USD
  subtitle: 价格更省 · 开通更快 · 售后支持
  buttonText: 立即前往 familypro
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

日常聊天、让代理处理代码和文档、把模型接入自己的产品，需要看的权益并不相同。选 ChatGPT Go、Plus 或 Pro 时，先确定你会在哪个入口使用，再比较模型、额度和价格。

本文套餐、模型与 API 价格核对日期为 **2026-10-14**。美元价格**仅供参考**，实际费用以下单页、地区税费和账单为准；模型还可能受客户端版本、逐步开放和工作区设置影响。

## 1. Go、Plus、Pro 怎么选，Pro 现在有几档？

[官方 Work/Codex 定价页](https://learn.chatgpt.com/docs/pricing)列出的个人套餐价格如下。右列是选择建议，不是固定任务量承诺。

| 套餐 | 美元月费参考 | 选择建议 |
| --- | --- | --- |
| Free | $0 | 先试轻量任务，确认现有额度是否够用 |
| Go | $8 | 预算有限，主要使用基础功能和轻量 Codex 任务 |
| Plus | $20 | 经常处理代码、文档或其他需要代理执行的工作 |
| Pro | $100 / $200 / $500 | 已经持续碰到额度限制，或有明确的更高速度需求 |

Pro 已有三档，不能再概括为“只有 $100 和 $200，功能完全一致”。官方将 **Ultrafast 权限**列在 Pro $500 档；是否能启用，还要看模型与客户端支持。其他档位应比较购买页面和账号内的实际额度，别把旧的 5x/20x 当成所有任务都成立的换算公式。

如果主要需求是普通聊天，请直接查看账号里的 Chat 模型与工具。下面介绍的 Work/Codex 模型权限不能当作普通 Chat 的模型清单。

## 2. 新模型：GPT-6.1 Sol、GPT-6 Astra 与 GPT-6 Luna

GPT-5.4 已不适合作为本文介绍新模型的主示例。[当前模型文档](https://learn.chatgpt.com/docs/models)推荐按任务难度和成本选择：

| 模型 | 更适合的任务 | 如何选择 |
| --- | --- | --- |
| GPT-6.1 Sol | 需要多步处理的代码、应用和文档工作 | 常规复杂任务可先试它，再判断是否需要 Astra |
| GPT-6 Astra | 难度较高、依赖持续推理和判断的完整任务 | 任务要求更高时考虑，同时留意用量与成本 |
| GPT-6 Luna | 摘要、抽取、分类、局部代码修改等明确任务 | 重复任务多、预算敏感时优先试用 |

在 ChatGPT 中，**GPT-6.1 Sol、GPT-6 Sol 和 GPT-6 Luna 属于 Work/Codex 入口，普通 Chat 不提供它们**。GPT-6.1 Sol 的首发开放范围包括 Plus、Pro、Business、Enterprise 和 Edu，Free/Go 不在首发范围；企业与教育工作区还可能需要管理员启用。具体可用性以账号和客户端为准。

OpenAI 公告安排 **2026-10-14** 将 GPT-5.5 从 ChatGPT、Work 与 Codex 退役，API 不受这次退役影响。如果旧的默认设置、脚本或定时任务指定了它，应换成账号可用的新模型；不要据此推断 API 同日停止服务。

## 3. Codex 是否包含在订阅里？额度怎么看？

Codex 是可理解、修改和运行代码的代理。官方目前把它列入 Free、Go、Plus、Pro 等套餐，而不是只把 Free/Go 写成“限时活动”。不过，入口与模型有区别：**Free/Go 在桌面端可用 GPT-6 Luna，受逐步开放影响**；Plus 支持 Web、CLI、IDE 扩展等更多入口。

Work 和 Codex 共享用量。模型、上下文、推理强度和工具调用都会影响消耗，同样一条消息并不代表相同成本。因此，不宜把旧的 Chat 消息上限当成 Codex 可执行任务数，也不能用 API 的 token 单价倒推订阅能完成多少次任务。

先在账号的 Usage 页面查看剩余额度和重置时间。Plus/Pro 达到限制后，可以购买 ChatGPT credits 延续使用；这些 credits 与 API 余额不同。升级前可先用 Luna 处理明确的小任务，把复杂工作交给 Sol 或 Astra，再判断是否确实需要更高档位。

## 4. API 单独计费，新模型价格是多少？

用 API key 把模型接入产品、脚本或服务，仍走 API 计费。ChatGPT 订阅不会自动赠送 API credits，也不会抵扣 API 调用费用。Codex 用 ChatGPT 登录时走套餐用量；用 API key 时走 API 账单。

下面是 **2026-10-14 核对的 Standard、短上下文文本价格**，单位为美元／百万 tokens，仅供参考。

| API 模型 ID | 输入 | 缓存输入 | 缓存写入 | 输出 |
| --- | --- | --- | --- | --- |
| `gpt-6.1-sol` | $2.00 | $0.10 | $2.50 | $10.00 |
| `gpt-6-astra` | $10.00 | $1.00 | $12.50 | $50.00 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.125 | $0.50 |

例如，Sol 使用 100 万未缓存输入 tokens、20 万输出 tokens，按表中价格是 **$4**，不含缓存写入、工具及其他费用。长上下文有另一套价格，Batch、Flex、Fast、Ultrafast 等处理模式也可能改变费率；做预算应按[当前 API 定价页](https://developers.openai.com/api/docs/pricing)计算，不能将上表视为完整账单。

## 5. 第三方应用能用 Plus/Pro 的额度吗？

可以，但需要应用支持且账号符合条件。[Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)允许符合条件的 Plus/Pro 用户授权应用消耗已有 Work/Codex 用量。**登录身份和使用套餐额度是两项不同权限**，仅看到 ChatGPT 登录按钮，不代表调用费用已经由订阅承担。

这不会新增一份额度，也不等于获得通用 API key。应用自身还可能收费。如果你要开发自己的集成，应先确认是否支持这条路径；常规 API key 接入仍单独计费。

## 6. 按自己的任务做最后判断

日常轻量使用可先试 Free 或 Go；需要经常在 Work/Codex 中处理复杂工作，先看 Plus 和 GPT-6.1 Sol 的实际可用性。只有持续受到额度限制，或确实需要支持的 Ultrafast 模式时，再比较 Pro 三档。

做产品集成则另算 API 预算：用 Luna 试明确的批量任务，用 Sol 试复杂工作，再评估是否需要 Astra。购买第三方方案时，也要核对具体套餐、账号使用方式、Codex 权限和售后条件；价格较低本身不能证明它包含官方 Pro 或全部模型。

## 官方参考

- [ChatGPT Work and Codex pricing](https://learn.chatgpt.com/docs/pricing)
- [Models and availability in Work and Codex](https://learn.chatgpt.com/docs/models)
- [GPT-6.1 Sol API model](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [GPT-6 Astra API model](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [GPT-6 Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)
