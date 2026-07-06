---
locale: zh
translationKey: google-ai-plan-guide
title: Google AI Plus、Pro、Ultra 怎么选？价格、额度与权益指南
headline: Google AI Plus、Pro、Ultra 选购指南：看懂新额度和真实差异
description: 基于 2026 年 7 月 6 日 Google 官方页面，梳理 Google AI Plus、Pro、Ultra 的价格、存储、用量机制和适用人群，帮你避免按旧额度表误判。
summary: 这篇指南会对比 Google AI Plus、Pro、Ultra 的价格、存储、compute-based 用量、AI credits、NotebookLM、Flow、Antigravity 等关键差异，帮你判断哪一档更适合你。
category: AI 订阅对比
pubDate: 2026-03-25
updatedDate: 2026-07-06
author: Mark
service: Google AI
tags:
  - Google AI
  - Gemini
  - Google One
  - NotebookLM
  - Flow
  - Jules
  - AI 订阅
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: FamilyPro 提供 Google AI Pro 方案
  subtitle: Pro 版本可选 · 价格透明 · 支持售后
  buttonText: 立即查看 FamilyPro Pro 方案
  buttonLink: https://familypro.io/en/products/gemini?invite=7Dfd94eb
draft: false
---

如果你最近在评估 Google 的 AI 套餐，通常会反复比较三个名称：`Google AI Plus`、`Google AI Pro`、`Google AI Ultra`。

从 2026 年 5 月之后的官方口径看，这篇文章最需要更新的一点是：不能再只按旧的“每天多少条提示”或“每月固定多少 AI credits”来判断。Google 已经把 Gemini app 的核心用量改成 **compute-based usage limits**：一次请求消耗多少，取决于提示复杂度、使用的模型/功能，以及当前对话长度；额度每 5 小时刷新，直到触及周上限。

截至 **2026 年 7 月 6 日**，更稳妥的比较方式是拆成三层：

- 一层是 **AI 产品服务**，比如 Gemini、NotebookLM、Flow、Whisk、Jules、Gemini CLI。
- 一层是 **仍有硬数字的额度**，比如 `NotebookLM` 的 notebooks、sources、reports 等上限，以及 Google One 存储。
- 还有一层是 **动态用量池**，比如 Gemini app、Flow、Antigravity 等产品里的 compute-based limits 与可额外购买的 AI credits。

因此，本文不按官网目录逐条复述，而是聚焦三件事：

- Plus、Pro、Ultra 各自到底包含哪些 AI 服务。
- 哪些额度 Google 有公开数字，哪些没有。
- 在不盲目上最高配的前提下，你应选择哪一档。

文中价格与权益以 **2026 年 7 月 6 日可查官方页面** 为基准；不同国家和地区的价格、促销、存储档位和可用功能会变动，购买前请回到你自己的 Google One 结账页核对一次。价格与第三方购买信息仅作参考，不构成购买建议。

## 1. 先给结论：大多数人只需要在 Plus 和 Pro 之间做选择

- **Google AI Plus**：入门档。适合想系统体验 Google AI、主要用 Gemini / NotebookLM、偶尔用 Flow 或视频生成功能的人。官方当前写明 Plus 包含 **400GB 或 2TB** 存储，具体取决于你所在地区和可选 Plus 方案。
- **Google AI Pro**：主力档。适合重度使用 Gemini、NotebookLM、Flow、Workspace AI、Jules、Antigravity 或开发者工具的人。官方当前写明 Pro 包含 **5TB 或 10TB** 存储。
- **Google AI Ultra**：高强度档。适合代理式开发、高频视频/创作、Deep Think、Gemini Spark、Project Genie、最高 NotebookLM 上限等场景。官方当前写明 Ultra 可能是 **20TB 或 30TB** 存储，并且按具体 Ultra 方案提供比 Pro 高 **5 倍或 20 倍** 的 Gemini / Antigravity 用量。

如果只看美国公开价格与近期官方/结账页口径，常见基准大致是：

- `Google AI Plus`：**约 $4.99/月**
- `Google AI Pro`：**$19.99/月**
- `Google AI Ultra`：已出现 **20TB / 30TB** 两种 Ultra 档位，不同地区与账号看到的价格可能不同

这类价格必须按结账页复核。尤其是 Ultra，2026 年官方页面已经不再只是旧文章里的单一 “$249.99/月 + 30TB” 叙述。

如果你只想看简化建议：

- 预算敏感、还在试用阶段：先上 `Plus`
- 明确会高频使用 Gemini、NotebookLM、Workspace、Flow 或开发者工具：直接 `Pro`
- 仅当你已经确认需要 `Deep Think / Gemini Spark / Project Genie / 最高 Antigravity 与 NotebookLM 上限 / Ultra 独占能力` 时，再考虑 `Ultra`

## 2. 在功能清单之前，先看三档最核心的差别

### 2.1 一张表先看懂

| 套餐 | 美国区价格参考 | 存储空间 | 用量机制 | 核心适合人群 |
| --- | --- | --- | --- | --- |
| Google AI Plus | 约 $4.99/月 | 400GB 或 2TB | Gemini 约为标准用量 2 倍；不支持购买额外 AI credits | 个人入门、家庭共享、轻度创作 |
| Google AI Pro | $19.99/月常见 | 5TB 或 10TB | Gemini 约为标准用量 4 倍；可购买 AI credits 扩展 Flow / Antigravity 等 | 主力用户、研究、办公、开发 |
| Google AI Ultra | 视 20TB / 30TB 方案而定 | 20TB 或 30TB | Gemini / Antigravity 相比 Pro 高 5 倍或 20 倍，取决于具体 Ultra 档 | 高强度创作、代理工作流、重度开发 |

### 2.2 每档大致都包含哪些 AI 产品

| AI 产品 / 服务 | Plus | Pro | Ultra |
| --- | --- | --- | --- |
| Gemini app | 有，约标准用量 2 倍 | 有，约标准用量 4 倍 | 有，比 Pro 高 5 倍或 20 倍 |
| NotebookLM | 有，Plus 额度 | 有，Pro 额度 | 有，Ultra 额度 |
| Flow | 有 | 有，更高额度，可买 AI credits | 有，最高额度，可买 AI credits |
| Whisk | 有 | 有，更高额度 | 有，最高额度 |
| Gemini in Gmail / Workspace | 有，基础范围 | 有，范围更大 | 有 |
| Search AI Mode | 有，更多访问 | 有，更高访问 | 有，最高访问 |
| Deep Search（Search） | 有 | 有 | 有 |
| Jules | 无 | 有，更高额度 | 有，最高任务与并发上限 |
| Gemini CLI / Gemini Code Assist | 无 | 有 | 有 |
| Google Antigravity | 无 | 有，更高额度和优先流量 | 有，最高额度、优先流量和新模型优先访问 |
| Google Photos 生成式 AI | 官方未明确列出 | 更高额度 | 最高额度 |
| Gemini in Chrome / Auto browse | 无 | 有 | 有 |
| Gemini Spark | 无 | 无 | 有，当前美国区为主 |
| Project Genie | 无 | 无 | 有 |
| Google Home Premium | 无 | Standard | Advanced |
| YouTube Premium | 无 | Premium Lite（可用地区） | Individual（可用地区） |
| Google Developer Program premium | 无 | 有 | 有 |

这里先提醒一个关键点：

- **不是所有服务都带公开硬数字额度。**
- 像 `NotebookLM`、`AI credits` 这类，Google 公布得相对透明。
- 像 `Gemini app`、`Flow`、`Antigravity` 的不少能力，现在更接近动态用量池，而不是固定“每天 N 次”的表格。

## 3. 真正决定值不值的，是三组关键额度

### 3.1 如果你会做视频或代理式开发，先看 AI credits 的新定位

旧版文章把 AI credits 写成 Plus / Pro / Ultra 各自固定的月度 credits，这是现在最容易误导读者的部分。

Google 当前帮助页的重点已经变成：

- 每个产品都有自己的 AI 用量限制。
- 用量取决于你使用的功能和 Google AI 方案。
- `Google AI Pro` 与 `Google AI Ultra` 用户在触及计划上限后，可以购买 AI credits 来扩展 `Google Flow`、`Google Antigravity` 和其他支持 credits 的产品。
- `Google AI Plus` 用户不能购买额外 AI credits；如果此前买过 credits，切到 Plus 后仍可在支持的产品中使用剩余额度。
- AI credits 可能有有效期；家庭共享时 credits 可能以家庭池方式被共享。

因此，如果你主要做视频或代理式开发，不要只问“套餐送多少 credits”，而要问：

- 你的常用产品是否支持 AI credits。
- 你是否需要在 Pro / Ultra 里额外购买 credits。
- 你的账号、地区、家庭共享和第三方订阅渠道是否影响 credits 购买资格。

如果你的核心需求就是视频生成，可优先按以下方式选择：

- 偶尔做视频，先 `Plus`，但不要假设可以随时加购 credits
- 稳定做内容，`Pro` 更稳，因为可购买 credits 扩展 Flow 等用量
- 大量跑视频或 Antigravity agent 工作流，才考虑 `Ultra`

### 3.2 如果你是研究型用户，NotebookLM 往往比 Gemini 更关键

如果你买 Google AI 主要是为了读资料、做研究、做输出，NotebookLM 的价值通常比 Gemini 聊天窗口更大。

当前官方公开的 NotebookLM 上限已经细分到 Standard、Plus、Pro、Ultra 20TB、Ultra 30TB。这里只列最常影响个人选择的付费档：

| 指标 | Plus | Pro | Ultra 20TB | Ultra 30TB |
| --- | --- | --- | --- |
| Notebooks 数量 | 200 个/用户 | 500 个/用户 | 500 个/用户 | 500 个/用户 |
| 每个 notebook 的 sources | 100 | 300 | 500 | 600 |
| Chats | 200 次/天 | 500 次/天 | 2,500 次/天 | 5,000 次/天 |
| Audio Overviews | 6 次/天 | 20 次/天 | 100 次/天 | 200 次/天 |
| Video Overviews | 6 次/天 | 20 次/天 | 100 次/天 | 200 次/天 |
| Reports / Flashcards / Quizzes / Mind Maps | 20 次/天 | 100 次/天 | 500 次/天 | 1,000 次/天 |
| Deep Research | 3 次/天 | 20 次/天 | 75 次/天 | 200 次/天 |

这组表很重要，因为它直接告诉你：

- `Plus` 已经够个人学习、课程、轻研究。
- `Pro` 才开始进入“长期项目资料库”和“重度知识工作”区间。
- `Ultra 20TB` 和 `Ultra 30TB` 在 NotebookLM 上不是完全一样，尤其是 sources、chats、Deep Research 和各类生成物上限。

### 3.3 Gemini app：不要再按旧的固定日额度表购买

这里需要纠正一个常见误解：

- Google 的 `Gemini Apps limits & upgrades` 帮助页已经明确写明，Gemini Apps 采用 **compute-based usage limits**。
- 这些限制会考虑提示复杂度、所用模型/功能、对话长度。
- 用量每 5 小时刷新，直到达到 weekly limit。
- 官方明确说明，Gemini Apps limits 可能变化，访问也会受测试、实验或可用性影响。

当前官方给出的核心比较方式是：

| 方案 | Gemini app 用量 |
| --- | --- |
| 无 AI plan | Standard limits |
| Google AI Plus | 标准用量的 2 倍 |
| Google AI Pro | 标准用量的 4 倍 |
| Google AI Ultra | 取决于订阅，约为 Pro 的 5 倍或 20 倍 |

上下文窗口仍然有清晰数字：

| 方案 | Context window |
| --- | --- |
| 无 AI plan | 32k tokens |
| Google AI Plus | 128k tokens |
| Google AI Pro | 1M tokens |
| Google AI Ultra | 1M tokens |

Google 在同一页还说明，`1M context window` 大致相当于同时理解 **约 1,500 页文本** 或 **30,000 行代码**。所以，如果你买套餐主要为了长文档、代码库、研究资料，`Pro` 的价值仍然很明确；但如果你只是想用聊天窗口问日常问题，旧版那种逐项固定次数表已经不是最可靠的购买依据。

如果你买套餐时主要关注 Gemini 本身，更实用的理解方式是：

- `Plus` 是低成本增强访问和 128k 上下文窗口
- `Pro` 的关键升级在于 **1M context window**、4 倍标准用量、Workspace / Flow / Jules / Antigravity 等完整生态
- `Ultra` 才是 Deep Think、Gemini Spark、Project Genie、最高 Antigravity / NotebookLM 上限和优先访问的组合

## 4. 这些 AI 产品各自负责什么，哪些值得你为之付费

下面这部分不谈营销口号，只讨论实际使用场景。很多人看到一串产品名会觉得“都想要”，但把用途拆开后，通常很快就能判断哪些对自己有价值，哪些只是名称上显得强大。

### 4.1 Gemini app：Google AI 套餐的总入口

Gemini app 是整个 Google AI 订阅体系的核心入口。聊天、写作、推理、代码、Deep Research、图片生成、视频生成，基本都从这里发起。

如果把 Google AI 视为一套操作系统，Gemini app 可以理解为主桌面。

- `Plus`：提供“更多 access”
- `Pro`：提供更适合高频使用的上限
- `Ultra`：提供 Agent、Deep Think 与最高额度

### 4.2 NotebookLM：最像“研究助理”的产品，也是很多人真正会天天用的功能

NotebookLM 的价值不是闲聊，而是 **基于你自己上传的来源材料做有出处的总结和问答**。

你可以把 PDF、网页、课程资料、访谈纪要、项目文档丢进去，然后让它生成：

- 摘要
- Audio Overviews
- Video Overviews
- Reports
- Flashcards
- Quizzes
- Deep Research

如果你是学生、分析师、研究员、内容策划，NotebookLM 往往是整个套餐里最值钱的部分之一。

### 4.3 Flow：Google 的 AI 影视生成工具，适合认真做视频的人

Flow 是 Google 对外强调很多的 AI 影视工具。官方定位是 `AI filmmaking tool`，主要围绕 Veo、Imagen、Gemini 做视频工作流。

它适合做：

- text-to-video
- ingredients-to-video
- frames-to-video
- clips、scenes、stories 的连续生成

简而言之，Flow 不是“随手出一张图”的工具，而是更偏向视频创作工作流。

### 4.4 Whisk：更偏快速灵感生成和图生视频

Whisk 更像视觉灵感工具，而不是精修型工具。它的核心场景是：

- 快速做视觉概念探索
- 通过图片参考生成新的视觉方向
- 使用 `Whisk Animate` 把图变成短视频

如果你的工作需要大量风格试验、概念图、情绪板、草图式创作，Whisk 的价值会比 Flow 更快显现。

### 4.5 Gemini in Gmail / Docs / Vids / Meet / Calendar：Google 最大的生态优势之一

这类权益是 Google AI 和纯聊天类 AI 最大的差异之一。

`Plus` 当前重点覆盖：

- Gmail
- Calendar
- Meet

`Pro` 进一步扩大到：

- Gmail
- Docs
- Vids
- 以及更多 Workspace 场景

它们本质上在做同一件事：把 Gemini 直接嵌入 Google 自家的办公工具。

### 4.6 Search 里的 AI Mode / Deep Search：把搜索升级成研究工具

Google AI 订阅不仅提升 Gemini app，也同步提升 Search 的 AI Mode。

但这里最容易写错的一点是：`AI Mode` 和 `Deep Search` 不能完全视作同一项权益。

更稳妥的理解是：

- `Plus / Pro / Ultra`：都明确包含 `Deep Search`
- `Plus`：AI Mode 获得更多访问权限
- `Pro / Ultra`：帮助页还单列了 `Gemini 3 Pro model in AI Mode`
- `Pro / Ultra`：更明确包含部分 `agentic capabilities`
- 美国区 `Pro / Ultra`：有 `AI-powered calling for local businesses`

Google 目前公开得最清楚的一个 Search AI Mode 硬额度，是图像生成：

- 无订阅用户：**20 images / 24 hours**
- `Google AI Plus`：**50 images / 24 hours**
- `Google AI Pro`：**100 images / 24 hours**
- `Google AI Ultra`：**1,000 images / 24 hours**

### 4.7 Jules：Google 的 AI coding agent，重点不是补全，而是代你处理任务

Jules 不是传统意义上的代码补全插件，它更接近一个会独立处理任务的 coding agent。

Google 官方对它的描述包括：

- 读取代码库
- 理解开发意图
- 处理多个任务
- 与 GitHub 仓库集成

`Pro` 已提供更高的 task limits 和 concurrency，`Ultra` 则进一步提高。

### 4.8 Gemini CLI 和 Gemini Code Assist：终端 + IDE 的开发辅助，Pro 才开始真正有存在感

这两个产品是 `Pro` 和 `Ultra` 开始真正“像生产力套餐”的原因之一。

- `Gemini CLI`：终端里的 AI agent
- `Gemini Code Assist`：VS Code / JetBrains 里的代码辅助

如果你平时就有命令行工作流、脚本工作流、代码解释和改写需求，`Pro` 的性价比会明显高于 `Plus`。

### 4.9 Google Antigravity：更偏专业开发与 agent orchestration，不是日常轻度用途

Google Antigravity 并非面向普通用户的邮件或周报场景，而是更偏向专业开发与 agentic development platform。

当前官方口径下：

- `Pro`：可用，额度更高
- `Ultra`：额度最高，带 prioritized traffic，并优先访问新模型

这类权益通常只有在你确实会运行更复杂的代理式工作流时，价值才会显现。

### 4.10 Gemini in Chrome / Auto browse / Project Mariner：浏览器自动化三件套

这是 Google 这轮 AI 套餐里很容易被忽略的一组能力。

- `Gemini in Chrome` / `Auto browse`：让 Gemini 帮你做网页里的多步操作
- `Project Mariner`：更进一步的浏览器自动化研究原型

公开规则里比较关键的点有：

- `Auto browse` 目前是 `Pro / Ultra`
- 需 Chrome 144+
- 需登录 Chrome
- 有明显的地区限制
- `Project Mariner` 是 `Ultra`，且当前为美国区早期访问

Google 官方还写明，`Project Mariner` 最多可同时跑 **10 个任务**。

### 4.11 Google Photos Generative AI：Photo to video、Remix，属于锦上添花型权益

Google Photos 现在也被纳入套餐差异的一部分。

这类能力主要包括：

- `Photo to video`
- `Remix`

按当前官方套餐页的写法，这类 Google Photos AI 权益明确写在 `Pro` 和 `Ultra` 下，`Plus` 并没有被清楚列成独立档位。

`Pro` 和 `Ultra` 都有更高额度，`Ultra` 最高。

如果你本来就重度用 Google Photos，这部分是有附加价值的；如果你不在 Google Photos 生态里，它的重要性就没那么高。

### 4.12 Gemini capabilities in Google Earth：地理分析增强，行业价值大于大众价值

这个能力目前主要面向 `Pro / Ultra`，且官方说明强调了地区限制。

它适合的不是普通搜索，而是：

- 地理信息分析
- 边界可视化
- 场址、选址、区域比较

这是一个很典型的“有行业价值，但不是大众刚需”的能力。

### 4.13 Project Genie：AI 互动世界生成，更像前沿展示而不是日常生产力

Project Genie 是 `Ultra` 的实验型研究原型，官方定义是 `text and image-to-world prototype`。

你可以把它理解成：

- 根据文本和图像生成互动环境
- 更接近 AI 世界模型展示
- 不属于成熟生产力工具

它的意义更多在于展示 Google AI 的前沿能力，而不是提供面向大众的稳定生产力工具。

### 4.14 Google Home Premium：对有设备的人有用，对没设备的人价值有限

这部分对有 Google Home 设备的人有价值，对没有设备的人基本没有意义。

- `Pro`：`Google Home Premium Standard`
- `Ultra`：`Google Home Premium Advanced`

如果你家里没有 Google Home 生态，不用把这部分权益算进主要购买理由。

### 4.15 YouTube Premium：Ultra 里最容易被普通用户立刻感知到的权益

`Ultra` 在部分国家和地区会直接附带 `YouTube Premium` 个人版。

这类权益对普通用户很直观：

- 去广告
- 后台播放
- 离线播放
- YouTube Music

但注意，它不是全球统一送，还是要看国家和地区。

### 4.16 Google Developer Program premium：Pro 和 Ultra 都有，但 Ultra 更“像礼包”

很多人会误以为这是 `Ultra` 独占，其实不是。

当前官方口径下：

- `Pro`：有 `Google Developer Program premium`，并附 **$10/月 Google Cloud credits**
- `Ultra`：同样有，但 Cloud credits 提升到 **$100/月**

如果你是开发者，别只看“Gemini 聊天次数”，这一块经常才是 Pro / Ultra 真正的隐藏价值。

## 五、如何选购，才更不容易踩坑？

### 5.1 什么人适合买 Google AI Plus

如果你符合下面几条，通常适合 `Plus`：

- 想系统体验 Google AI，而不是只偶尔试一试
- 平时主要用 Gemini、NotebookLM
- 会偶尔做图、做视频，但不是高强度生产
- 希望预算低一些
- 希望把 Google AI 带进家庭共享体系

简要结论：`Plus` 是“先把 Google AI 用起来”的套餐。

### 5.2 什么人适合买 Google AI Pro

`Pro` 通常是最适合大多数重度用户的一档。

适合买 Pro 的典型人群包括：

- 每天都在用 Gemini
- 高度依赖 NotebookLM
- 会经常用 Flow / Whisk
- 需要 Gemini CLI / Code Assist / Jules
- 本来就需要 5TB Google One 存储
- 会认真用 Workspace 里的 AI 能力

简要结论：`Pro` 不是 Plus 的小升级，而是从“能体验”跨到“能长期高频使用”。

### 5.3 什么人适合买 Google AI Ultra

`Ultra` 并不适合按预算上限直接购买，它的价值高度集中在以下能力：

- 超高 `AI credits`
- `Project Mariner`
- `Project Genie`
- `Gemini Agent`
- `Deep Think`
- `YouTube Premium`
- 20TB / 30TB 存储档位
- 更高开发者权益

如果你用不到这些，`Ultra` 基本不划算。

简要结论：`Ultra` 适合高强度创作者、开发者和代理工作流用户，不是普通升级用户。

## 六、如果你还在犹豫，可以直接按这套逻辑选择

要真正理解 Google AI 套餐，不应只看价格，而应分开看三件事：

- 你需要哪些 **AI 产品**
- 你是否在意 **公开硬额度**
- 你是否真的会用到 **Ultra 独占能力**

如果你只想看最省事的建议：

- 还不确定自己是否会高频使用：先买 `Plus`
- 已经确定会天天使用 Gemini、NotebookLM、Flow，或者你是开发者：直接 `Pro`
- 仅当你明确需要 `Project Mariner / Project Genie / 超高 AI credits / Ultra 独占能力` 时，再上 `Ultra`

如果你已经确定会买 Google AI 套餐，也更看重长期成本，这里有一个可选购买渠道（来自第三方平台 **FamilyPro**，非 Google 官方售卖渠道）：

- [FamilyPro Google AI 套餐页面（可选）](https://familypro.io/en/products/gemini?invite=7Dfd94eb)

第三方价格说明（数据日期：**2026-07-06**，仅供参考）：第三方页面的套餐时长、可用规格、地区可见性和价格可能动态变化；下单前请以实际结账页为准，并优先核对售后条款。本文不把第三方页面价格作为 Google 官方价格。

最后请记住：Google 官方已明确说明，许多额度会随容量、地区和实验状态变化。购买前，建议回到自己的 Google One 页面再次核对最新权益。

## 官方参考

本文主要基于以下 Google 官方页面整理（并附可选购买链接），最后核对日期为 **2026 年 7 月 6 日**：

- [Google AI Plans 官方套餐页](https://one.google.com/about/google-ai-plans/)
- [Google AI Plus 扩展公告](https://blog.google/products-and-platforms/products/google-one/google-ai-plus-availability/)
- [Google AI Ultra 官方公告](https://blog.google/products-and-platforms/products/google-one/google-ai-ultra/)
- [Get a Google AI Plus membership](https://support.google.com/googleone/answer/16548195)
- [Use Google AI Plus benefits](https://support.google.com/googleone/answer/16882689)
- [Use Google AI Pro benefits](https://support.google.com/googleone/answer/14534406)
- [Get Google AI Ultra benefits](https://support.google.com/googleone/answer/16286513)
- [Manage your AI credits with Google One](https://support.google.com/googleone/answer/16287445)
- [Gemini Apps limits & upgrades for Google AI subscribers](https://support.google.com/gemini/answer/16275805)
- [Upgrade NotebookLM](https://support.google.com/notebooklm/answer/16213268)
- [Use Gemini 3 Pro and Nano Banana Pro in AI Mode](https://support.google.com/websearch/answer/16011537)
- [Generate and edit images in AI Mode with Nano Banana Pro](https://support.google.com/websearch/answer/16649374)
- [FamilyPro 第三方平台：Google AI 套餐页（可选购买链接）](https://familypro.io/en/products/gemini?invite=7Dfd94eb)
