---
locale: zh
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: ChatGPT Go、Plus、Pro 如何选择：Codex 与 API 计费
headline: ChatGPT Go、Plus、Pro 分别适合谁？同时厘清 Codex 与 OpenAI API 的关系
description: 基于 2026 年 4 月 23 日可查的官方信息，本文对比 ChatGPT Go、Plus、Pro（含 $100/$200 两档 Pro），说明 Codex 与 API 的关系，并明确订阅不包含 API 计费。
summary: 如果你在 Go、Plus、Pro 之间犹豫，或不确定 Codex、OpenAI API 与 ChatGPT 订阅的边界，本文提供一套可直接落地的判断框架。
category: AI 订阅对比
pubDate: 2026-03-31
updatedDate: 2026-04-24
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

如果你第一次接触 OpenAI 的付费体系，通常会在以下四个问题上反复确认：

- `ChatGPT Go / Plus / Pro` 到底差在哪
- `Codex` 是不是单独买的产品
- `OpenAI API` 和 ChatGPT 订阅是什么关系
- 我买了 ChatGPT Plus 或 Pro，还要不要再为 API 付费

本文只做一件事：把这四个问题讲清楚，帮助你在约 10 分钟内判断自己该选哪一档。

口径说明：文中信息基于 **2026-04-23** 可访问的 OpenAI 官方页面。价格统一按 **美元** 描述，**仅供参考，最终以下单页与账单页为准**。

## 1. 先给结论：四个高频问题可以这样理解

1. `Go / Plus / Pro` 是 **ChatGPT（chatgpt.com）里的个人订阅档位**，主要区别是可用模型、功能范围和额度。
2. `Codex` 是 OpenAI 的 **AI 编程代理**，不是“另一个聊天会员”；它目前和 ChatGPT 订阅有包含关系。
3. `OpenAI API` 是 **开发者平台（platform.openai.com）** 的能力，给你接入自己产品、脚本或自动化流程。
4. **ChatGPT 订阅不包含 API 用量**。API 需要在平台侧单独开通计费并按使用量付费。

可以用一句话区分：

- ChatGPT 订阅解决的是“我在 ChatGPT 里使用 AI”。
- API 解决的是“我把 AI 接到自己的产品或流程里”。

## 2. Go、Plus、Pro 本质上卖的是什么

Go、Plus、Pro 是同一条产品线的不同层级，核心差异在于“可用上限”和“工具范围”，并不是三个完全独立的产品。

| 档位 | 官方定位（简化） | 更适合谁 |
| --- | --- | --- |
| Go | 低价扩展档，在 Free 之上给更多消息、上传、图片、记忆等能力 | 预算敏感，但希望比免费版更能用的个人用户 |
| Plus | 面向重度日常用户，给更高模型/工具额度与更多高级功能 | 经常学习、写作、分析、研究的个人用户 |
| Pro | 面向高强度用户，提供更高上限和优先体验 | 每天高频重度使用、对限额和速度非常敏感的用户 |

按 2026-04-23 官方可查口径：

- `Plus`：帮助中心标注为 **$20/月**
- `Pro`：帮助中心目前是 **两档：$100/月 与 $200/月**（同为 Pro 能力，使用上限不同）
- `Go`：官方定义为低价档；发布文给出过 **美国区 $8/月** 口径，但 Go 价格支持地区差异化，最终以下单页为准

做选择时，建议再记住三点：

- Go/Plus/Pro 都是按月订阅，当前不支持年付预缴。
- Pro 的两档（$100 / $200）核心能力一致，主要差别是使用上限（官方口径约为 Plus 的 5x 与 20x）。
- 官方写的 “Unlimited/无限” 并不等于绝对无限，仍受滥用防护与使用条款约束。

## 3. Go、Plus、Pro 的功能与额度差异（截至 2026-04-23）

OpenAI 的额度会动态调整。下表只保留官方页面明确写出的差异，便于快速横向对比：

| 维度 | Go | Plus | Pro |
| --- | --- | --- | --- |
| 价格（USD） | 低价档（地区与币种可能影响展示；以下单页为准） | `$20/月` | `$100/月` 或 `$200/月`（约为 Plus 的 `5x / 20x` 使用上限） |
| GPT-5.3 消息额度 | 最多 `160 条 / 3 小时` | 最多 `160 条 / 3 小时` | GPT-5 系列为 `unlimited*`（受滥用防护约束） |
| Thinking（深度推理）额度 | 可在输入框的 `+` 菜单启用 Thinking，最多 `10 条 / 5 小时` | 可手动选择 GPT-5.4 Thinking，最多 `3000 条 / 周` | 含 GPT-5.4 Pro，GPT-5 系列为 `unlimited*`（受滥用防护约束） |
| Legacy models（如 4o） | 不包含 | 包含扩展访问 | 包含，且限制更高 |
| Agent mode | 不包含 | 包含，`40 条 / 月` | 包含，`400 条 / 月` |
| Sora | 不包含 | 包含 | 包含，且通常有更高优先级与并发上限 |
| Voice | 包含（具体额度以账号内显示为准） | 包含（具体额度以账号内显示为准） | `unlimited*`（受滥用防护约束） |
| Codex | 限时可用（按官方 `limited time` 口径） | 包含 | 包含 |

`*` 这里的 unlimited 指“高可用上限”，不是无条件无限；仍受 Terms of Use 与系统 guardrails 约束。

此外，还有三条常被误解的细节：

- Go/Plus 达到 `160 条 / 3 小时` 后，会切到 mini 版本直到窗口重置。
- Plus 的 `3000 条 / 周` 是“手动选择 Thinking”计数；系统从 Instant 自动切到 Thinking 不计入这个周额度。
- 如果你在产品内看到与本文不同的限额提示，应以你账号当下显示的数字为准。

## 4. Codex 与 Go/Plus/Pro 的关系

先明确定位：`Codex` 是编程代理（coding agent）。你可以在 CLI、IDE、Web、桌面端里用它完成代码理解、修改、运行与协作。

和订阅关系上，当前官方口径是：

- `Plus / Pro / Business / Enterprise / Edu` 包含 Codex
- `Free / Go` 在限时活动期也可用 Codex（按官方“limited time”说明）

这意味着 Codex 不是完全独立于 ChatGPT 的另一套会员。更准确地说：

- 你可以把 Codex 当作 ChatGPT 体系里的一个专业能力层；
- 不同档位可用额度和速率不同。

另一个对计费影响很大的细节是：Codex CLI 支持两种认证路径。

- 用 ChatGPT 账号登录（走订阅包含的额度）
- 用 API key 登录（走 API 计费）

因此，同样在“使用 Codex”，不同用户看到的扣费入口可能并不相同。

## 5. OpenAI API 是什么，与聊天订阅有何根本区别

`OpenAI API` 是开发者接口，不是聊天网页会员。它的核心用途是把模型能力接入你自己的业务系统，比如：

- 自建客服机器人或知识库问答
- 在工作流里做批量摘要、分类、抽取
- 在产品里接入文本、图像、语音等能力

计费方式也不同：API 主要是按调用量计费（例如按 token、按请求或按工具调用）。

以 OpenAI 官方 API 定价页在 2026-04-23 可见信息为例：

- GPT-5.4 文本输入约为 `2.50 USD / 1M tokens`
- GPT-5.4 文本输出约为 `15.00 USD / 1M tokens`

这类价格会随模型迭代和区域策略调整，做预算时要按你当下的官方价格页重算。

## 6. 关键问题：买了 ChatGPT 订阅，能直接用 API 吗

结论很直接：**不能抵扣，也不会自动赠送 API 用量。**

官方帮助中心给的是一致口径：

- ChatGPT（chatgpt.com）和 API 平台（platform.openai.com）是两套独立计费系统。
- ChatGPT 侧的订阅账单不会自动迁移到 API。
- 你要使用 API，需要在 API 平台单独添加支付方式并按量付费。

同一个 OpenAI 账号可以同时做两件事：

- 个人使用：订阅 Go / Plus / Pro
- 产品接入：单独开 API pay-as-you-go

这在团队场景里很常见，二者并不冲突。

## 7. 按场景选择，通常更不容易买错

如果你还在犹豫，可以按使用目标直接选择：

- 主要是个人日常聊天与轻量工具使用：先看 `Go`
- 每天都在做写作、分析、学习、研究：优先 `Plus`
- 高强度、长时、重度依赖 ChatGPT：考虑 `Pro`（一般先看 `$100` 档，超高负载再看 `$200` 档）
- 需要把模型接入你自己的产品或自动化流程：无论你是否订阅 ChatGPT，`API` 都要单独开通并单独付费

最后用三句话概括：

- `Go / Plus / Pro` 是“用 ChatGPT”的订阅选择；
- `API` 是“做你自己的 AI 产品”的工程选择；
- `Codex` 处在两者之间，既可以走 ChatGPT 订阅，也可以走 API key。

## 8. FAQ（高频问题）

### 8.1 Go 和 Plus 最核心的差别是什么？

从目标上看，Go 主要解决“够用且成本可控”，Plus 主要解决“高频且进阶”。
Go 更接近“高配免费版”，重点是提高基础能力上限；Plus 更接近“进阶工具包”，重点在高阶推理、legacy models、deep research、agent 和 Sora。

### 8.2 Go 能用 Thinking 吗？

能。Go 可以在输入框 `+` 菜单里启用 Thinking，官方公开额度是 `10 条 / 5 小时`。如果你经常做长推理任务，Plus 或 Pro 会更稳妥。

### 8.3 Plus 和 Pro 都能用 Agent 吗？额度差多少？

都能用。当前公开口径是：Plus `40 条 / 月`，Pro `400 条 / 月`。如果 Agent 是你的日常主力工具，Pro 的额度差距会很明显。

### 8.4 Pro 的 `$100` 和 `$200` 两档，核心区别是什么？

核心区别是“使用上限”，不是“功能有无”。两档都属于 Pro；官方口径里，`$100` 更适合高频个人项目，`$200` 更适合长时并行的重负载工作流。

### 8.5 Pro 写着 unlimited，是否等于完全无限？

不等于“无条件无限”。官方明确说明 unlimited 受 abuse guardrails 和使用条款约束；异常高频、自动化滥用或转售场景都可能触发限制。

### 8.6 超过 Go/Plus 的主模型额度后会怎样？

主模型额度在当前窗口内用完后，会自动切到 mini 版本；窗口重置后恢复。这里是滚动窗口，不是按自然日清零。

### 8.7 我买了 Plus/Pro，还需要单独给 API 付费吗？

需要。ChatGPT 订阅和 API 计费是两套系统，订阅费用不会抵扣 API 调用费用。

### 8.8 我能从 Plus 或 Pro 降到 Go 吗？

可以切换。官方口径是不会按比例退还当前周期费用；通常会在当前账期结束后切到 Go，并按 Go 费率续费。

## 官方参考

- [Introducing ChatGPT Go, now available worldwide](https://openai.com/index/introducing-chatgpt-go/)
- [ChatGPT Plans | Free, Go, Plus, Pro, Business, and Enterprise](https://chatgpt.com/pricing)
- [What is ChatGPT Go?](https://help.openai.com/en/articles/11989085-what-is-chatgpt-go)
- [What is ChatGPT Plus?](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- [About ChatGPT Pro plans](https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro)
- [GPT-5.3 and GPT-5.4 in ChatGPT](https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt)
- [ChatGPT agent（Availability and monthly limits）](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540)
- [Codex CLI (authentication and plan inclusion)](https://developers.openai.com/codex/cli)
- [Billing settings in ChatGPT vs Platform](https://help.openai.com/en/articles/9039756-billing-settings-in-chatgpt-vs-platform)
- [How can I move my ChatGPT subscription to the API?](https://help.openai.com/en/articles/8156019)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
