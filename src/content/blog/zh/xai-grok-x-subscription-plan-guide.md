---
locale: zh
translationKey: xai-grok-x-subscription-plan-guide
title: Grok 新套餐体系详解：统一订阅价格、权益与迁移指南
headline: Grok 新套餐体系：Plus、Premium、Super 和 Ultra 怎么选
description: 对比 xAI 最新 Grok 套餐的月付与年付价格、共享周额度和适合人群，说明 SuperGrok 转 Premium 的条件、Heavy 权益确认、老用户暂缓迁移的情形，以及迁移退款和重复扣款的具体处理规则。
summary: 新用户按实际用量选择 Plus、Premium、Super 或 Ultra。SuperGrok 老用户在同价且需要 Cursor 或 X Premium+ 时可优先考虑 Premium；依赖旧优惠、第三方模型额度或 Heavy 专属权益的人，应先核对再迁移。
category: AI 订阅对比
pubDate: 2026-10-13
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok
  - xAI
  - The X Subscription
  - SuperGrok
  - SuperGrok Heavy
  - Cursor
relatedTranslationKeys:
  - grok-plan-guide
  - grok-build-guide
draft: false
---

**现有 SuperGrok 和 SuperGrok Heavy 用户目前可以保留原订阅，无需立即迁移。** 新用户则从 Free、Plus、Premium、Super 和 Ultra 中选择。是否迁移，主要看新增权益是否有用、总费用是否合适，以及原有功能和额度能否满足工作需要。

xAI 于 **2026 年 10 月 12 日**推出 [The X Subscription](https://x.ai/news/x-subscription)，将 Grok、Grok Bot、Cursor 和 X 权益纳入统一订阅。

**数据核对日期：2026-10-15。美元价格为官方标价，仅供参考，未含适用税费；实际价格、促销及购买入口以账户结账页为准。** 迁移入口正在逐步开放，暂未出现入口不影响旧订阅继续使用。

## 1. 新套餐包含什么

[官方订阅总览](https://docs.x.ai/x-subscription/overview)说明，Grok 与 Cursor 使用同一工作区和账单，共享每周包含的 Grok 模型用量。连接个人 X 账号后，可获得所选档位对应的 X 权益。

Grok 负责问答、语音和图像视频生成，Cursor 用于编程，Grok Bot 用于把任务交给云端 AI 代理持续执行。它们共用订阅，不代表每个档位都开放所有功能：Grok Bot 从 Premium 起包含。

新 Premium 属于这套统一订阅，与原 X Premium 不同；新 Super 也不能仅凭名称认定为旧 SuperGrok 的更名版。若要先辨认原套餐名称，可读[Grok 新旧订阅区别与老用户选择指南](../grok-plan-guide/)。

## 2. Grok 套餐月付与年付价格

下表依据 [官方价格文档](https://docs.x.ai/x-subscription/pricing)。年付折合月费按年价除以 12 计算，年付需按年付款。

| 套餐 | 月付价格 | 年付价格 | 年付折合月费 | 包含用量，相对 Plus |
| --- | --- | --- | --- | --- |
| Free | $0 | $0 | $0 | 有限访问，不适用倍数比较 |
| Plus | $8/月 | $80/年 | 约 $6.67/月 | 基础档 |
| Premium | $30/月 | $300/年 | $25/月 | 4 倍 |
| Super | $100/月 | $1,000/年 | 约 $83.33/月 | 15 倍 |
| Ultra | $200/月 | $2,000/年 | 约 $166.67/月 | 50 倍 |

按 [官网定价页](https://x.ai/pricing)，Plus 适合轻量 AI 使用；Premium 增加最新 Grok 模型、更快的聊天响应和云端代理等功能；Super 提供高峰期模型访问优先权。Ultra 的个人用量最高，仍受额度限制。

Grok Bot 从 Premium 开始包含，消耗同一周额度，没有独立的额外额度。Plus 不包含 Grok Bot。

连接个人 X 账号后，Plus 提供蓝标、创作者工具和较少广告；Premium、Super、Ultra 提供完整 X Premium+ 权益。原 X Premium+ 用户若要保留这些功能，应选择 Premium 或更高档位，详见 [官方 X 权益说明](https://docs.x.ai/x-subscription/x-premium)。

Teams 从 $30/席位/月起，提供 Premium、Super、Ultra，可混合席位档位。需要集中管理和账单的团队，应按实际席位数计算费用。

## 3. 周额度如何计算，哪些用量另收费

[官方用量说明](https://docs.x.ai/x-subscription/usage-limits)规定，同一付费席位在 Grok 与 Cursor 中符合套餐规则的 Grok 模型用量，消耗同一周额度，不同任务的消耗不同。Premium 的“4 倍 Plus”不能换算成固定的每日提问、图片或视频次数。

例如，在 Cursor 执行大型代码任务后，留给 Grok 的额度会减少；不使用 Cursor 时，可以将额度集中用于 Grok。两边没有各自独立的一份完整额度。

**Cursor 中的 Claude、GPT 等第三方模型从第一次使用起就另收费，不包含在周额度内。** Grok 模型超出包含额度后，可以等周额度刷新，或充值继续使用。比较成本时，应计入订阅费和额外用量，并检查自动充值与支出上限。按[额外用量与充值规则](https://docs.x.ai/x-subscription/extra-usage)，自动充值需要自行开启，迁移不会自动打开；预付余额与月度支出上限是两项独立控制，有余额也可能因达到上限而停止额外用量。

**Grok API 访问资格也不等于 API 调用额度。** [官网定价页](https://x.ai/pricing)明确说明，API 按标准模型价格另计费，不使用套餐周额度。如果你要把 Grok 接入自己的程序，应另外估算 API 账单。

自助团队套餐中，每个席位有自己的周额度，席位之间不共享；团队共享的是额外用量的预付余额。Enterprise 按合同执行。

Grok 4.7 Fast 在 Cursor / Grok Build 内的消耗还需单独考虑。官方 API 价格文档说明，Fast 是同一模型的更快基础设施版本，普通上下文按标准 token 费率的 2 倍、长上下文按 1.5 倍计入所在产品套餐；它不在公开 API 提供，Build 免费档也不包含。别把更快理解成同一周额度能完成同样多的任务。

## 4. SuperGrok 和 Heavy 老用户权益如何处理

### 4.1 不迁移：目前保留原套餐、价格和功能

[官方迁移说明](https://docs.x.ai/x-subscription/do-i-have-to-switch)和[订阅总览](https://docs.x.ai/x-subscription/overview)均说明，迁移是可选的；不更改或取消订阅，原套餐、价格和功能继续保留。

这项规则适用于存量 Grok 订阅，但官方没有公布 Heavy 与新套餐的完整权益对照表。按目前的保留规则，继续订阅旧 Heavy 不会仅因新套餐发布就自动失去原权益；账号专属折扣、赠送权益和续费安排，仍应核对账单及活动条款。

### 4.2 主动迁移：账户合并不可撤回

[账户合并流程](https://docs.x.ai/x-subscription/unify-accounts)说明，迁移会将符合条件的 Grok 与 Cursor 账号统一到一个账户、工作区、套餐和账单。**合并完成后无法撤回，官方支持也不能恢复。**

[取消说明](https://docs.x.ai/x-subscription/cancel)进一步明确，取消新订阅不会拆分账号，也不会恢复旧 Cursor、SuperGrok 或 X Premium 订阅。因此，需要保留原账号独立性或退回旧套餐的人，不宜通过合并来试用。

## 5. 迁移退款与重复扣款如何处理

按 [官方账单与退款说明](https://docs.x.ai/x-subscription/invoices-and-refunds)，参与迁移的符合条件的直接计费订阅会被取消，未使用时间按比例退款，月付和年付均适用。退款退回原支付方式；新套餐即时生效并全额收费，退款另行到账，不抵扣新套餐结账金额。

| 原购买渠道 | 迁移后的处理 |
| --- | --- |
| 网页直接付费 | 参与迁移的符合条件的旧订阅自动取消；未纳入迁移的账号订阅不受影响 |
| Apple 购买的 Cursor | 需自行在 Apple 订阅设置中取消，并向 Apple 申请退款，否则可能继续扣款 |
| Apple 购买的 Grok、Grok Bot 或 X Premium | 官方取消并请求未使用时间的退款，是否批准由 Apple 决定 |
| Google Play 购买的 Grok、Grok Bot 或 X Premium | 迁移后检查 Play 订阅；如果仍会续费，需在那里取消 |

操作前记录原套餐、实际续费金额、到期日和附加权益。已有付费 Cursor 的用户，从 [Cursor 合并入口](https://cursor.com/unify)开始；从 Grok 出发可使用 [xAI 账户合并入口](https://accounts.x.ai/unify)。邮箱不必相同，但应确认选中了正确的账号，避免误将工作账号与私人账号合并。

完成后检查原支付渠道的续费状态，以及新工作区的账单和用量。新套餐可以使用，并不代表所有旧订阅都已停止扣款。

## 6. 社交媒体与用户社区怎么评价新套餐

**公开讨论核对日期：2026-10-15。** 以下整理自 Reddit 和 Cursor 官方论坛可访问的帖子，用来呈现具体用户的关注点，不是满意度调查，也不能据此判断多数用户支持或反对。社区对价格的判断、额度体验和模型行为的描述，应与官方规则分开看。

### 6.1 合并订阅有吸引力，但新旧名称容易混淆

Reddit 的 [Grok Bot 套餐讨论](https://www.reddit.com/r/GrokBot/comments/1x4n5bu/the_x_subscription_what_grok_cursor_and_x_users/)把“Premium 将原先合计约 $90/月的权益放进 $30/月套餐”作为分享中的卖点，同时提醒 Bot 会与聊天、编程共用额度。对原本就在为多个产品付费的人，减少重复订阅是值得核算的收益；这个价格比较不代表三份旧套餐的额度直接相加。

另一个 [r/grok 套餐改名求助帖](https://www.reddit.com/r/grok/comments/1x52age/hi_i_just_noticed_that_the_plan_names_have_changed/)中，发帖者看到 Plus、Premium、Super、Ultra 后，首先问的是自己原来的 SuperGrok 现在属于哪一档。回复中出现了按名称和价格直接对应新旧档位的说法，但这种社区速记不能代替权益核对：尤其不能据此认定 Heavy 就是 Ultra。

### 6.2 Cursor 用户更关心第三方模型的实际成本

在 [r/cursor 的套餐解释求助帖](https://www.reddit.com/r/cursor/comments/1x5dp6w/please_explain_what_is_going_on_with_cursor/)中，用户询问 Auto 模式会怎样变化，回复则围绕第三方模型费用、旧订阅是否受影响展开，且解释并不一致。[Cursor 官方论坛的发布讨论](https://forum.cursor.com/t/introducing-the-x-subscription/174450)里，也有旧 Ultra 用户追问迁移后是否还有 Claude、GPT 等模型的包含用量，以及不迁移能否维持原安排。

这类顾虑对应的是账单结构的变化。已确认的规则是：统一订阅中的第三方模型从首次使用起另计费；这不等于所有旧 Cursor 用户都已被自动切换。对依赖这些模型的开发者，订阅总价更低仍可能伴随额外模型支出，应按自己的工作量比较。

### 6.3 Heavy 用户担心的是视频产量，而不只是月费

在 [Heavy 与 Ultra 视频生成对比求助帖](https://www.reddit.com/r/GrokAiDiscussion/comments/1x55chn/grok_ultra_sub/)中，一名主要制作 Imagine 视频的 Heavy 用户注意到新档位价格较低，却仍在询问 Ultra 的实际视频容量，并担心迁移后无法恢复旧订阅。

这个问题无法用“50 倍 Plus”直接回答。帖子中的个人产量描述不是官方配额，也不是同条件对照测试，本文不据此给出 Heavy 与 Ultra 的产量换算。对以视频为主要用途的读者，更有用的比较是相同模型、时长、分辨率下能完成多少任务；在这些条件尚未确认前，保留原套餐有助于避免不可撤回的迁移影响现有工作。

## 7. 新用户怎么选，老用户要不要迁移

以下为基于价格和权益规则的选择建议，不是官方对任务次数的保证。

### 7.1 新用户：先月付，再按用量升级

| 使用情况 | 优先选择 | 判断条件 |
| --- | --- | --- |
| 偶尔问答，尚未确定付费需求 | Free | 先用实际任务测试 |
| AI 用得少，主要需要 X 蓝标和创作者工具 | Plus | 不需要 Grok Bot |
| 日常使用 Grok，也想用代码代理 | Premium | 从 $30/月观察一至两个正常工作周的用量 |
| 每天编程或运行自动化，低档额度经常不足 | Super | 已确认需要更高周额度 |
| 持续高强度使用，Super 也不够 | Ultra | 能明确说明为何需要 $200/月的档位 |

偶尔超额可比较充值成本；每周都用到上限，再考虑升级。确认长期用量后再决定年付。

### 7.2 SuperGrok 转 Premium：同价且需要新增权益时可考虑

[官方公告](https://x.ai/news/x-subscription)将 Premium 描述为包含 SuperGrok、Cursor Pro 和 X Premium+ 权益。**如果你目前为 SuperGrok 支付 $30/月，迁移报价也是 $30/月，并且需要 Cursor 中的 Grok 编程能力或 X Premium+，可优先考虑 Premium。**

这个建议基于同价增加所需权益，不代表旧 Cursor Pro 的第三方模型额度也包含在内，也不保证同时大量使用 Grok 与 Cursor 时额度足够。

如果你分别订阅 SuperGrok 和 X Premium+，且新报价低于两项实际账单之和、所需权益均已确认，合并值得考虑。另有 Cursor 订阅的人，还应计算迁移后的第三方模型费用。

### 7.3 这些用户应暂缓迁移

| 当前情况 | 建议 | 需要确认什么 |
| --- | --- | --- |
| 只用 Grok，额度够用，不需要 Cursor 或 X Premium+ | 先保留原套餐 | 是否有实际需要的新增权益或更低价格 |
| 旧 SuperGrok 续费优惠更低 | 比价后再决定 | 同一计费周期的新旧实际费用 |
| 工作依赖旧 Cursor 的 Claude、GPT 等包含额度 | 核算费用后再决定 | 迁移后另付的模型费用是否超过订阅节省 |
| 依赖 Heavy 专属模型、附加权益或特殊优惠 | 权益确认前保留 Heavy | 目标套餐是否保留这些具体权益 |
| Grok 经常用满，还准备大量使用 Cursor | 确认新额度后再决定 | 共享周额度能否支持两边的任务 |
| 必须分开工作与私人账号，或需要退回旧套餐 | 不要合并试用 | 账户合并无法撤回，取消也不恢复旧订阅 |

**目前无法根据公开资料认定 Heavy 与 Ultra 权益完全相同，也无法给出只用 Grok 的用户迁移后能多做多少任务。** 如果这些是你的购买条件，应先向官方支持确认，再操作迁移。

## 官方参考

- [xAI：The X Subscription 发布公告](https://x.ai/news/x-subscription)
- [xAI 最新套餐定价页](https://x.ai/pricing)
- [官方文档：月付、年付及团队价格](https://docs.x.ai/x-subscription/pricing)
- [官方文档：统一订阅总览](https://docs.x.ai/x-subscription/overview)
- [官方文档：是否必须切换](https://docs.x.ai/x-subscription/do-i-have-to-switch)
- [官方文档：共享周额度与额外用量](https://docs.x.ai/x-subscription/usage-limits)
- [官方文档：额外用量、充值与支出上限](https://docs.x.ai/x-subscription/extra-usage)
- [官方文档：X Premium 用户迁移及权益](https://docs.x.ai/x-subscription/x-premium)
- [官方文档：账户合并流程](https://docs.x.ai/x-subscription/unify-accounts)
- [官方文档：账单和退款](https://docs.x.ai/x-subscription/invoices-and-refunds)
- [官方文档：取消统一订阅](https://docs.x.ai/x-subscription/cancel)
- [Cursor 官方账户合并入口](https://cursor.com/unify)
- [xAI 官方账户合并入口](https://accounts.x.ai/unify)

**社区讨论来源（非官方套餐规则）：**

- [Reddit r/GrokBot：统一套餐的组合价格与共享额度讨论](https://www.reddit.com/r/GrokBot/comments/1x4n5bu/the_x_subscription_what_grok_cursor_and_x_users/)
- [Reddit r/grok：套餐改名后的档位辨认问题](https://www.reddit.com/r/grok/comments/1x52age/hi_i_just_noticed_that_the_plan_names_have_changed/)
- [Reddit r/cursor：Auto 模式与新套餐计费求助](https://www.reddit.com/r/cursor/comments/1x5dp6w/please_explain_what_is_going_on_with_cursor/)
- [Cursor 官方论坛：统一订阅发布后的用户问答](https://forum.cursor.com/t/introducing-the-x-subscription/174450)
- [Reddit r/GrokAiDiscussion：Heavy 与 Ultra 视频生成容量求助](https://www.reddit.com/r/GrokAiDiscussion/comments/1x55chn/grok_ultra_sub/)

- [Grok 4.7 Fast / API pricing](https://docs.x.ai/developers/pricing)
