---
locale: zh
translationKey: grok-build-commands-beginner-guide
title: Grok Build 常用命令实用教程：新手从安装到完成代码修改
headline: Grok Build 新手入门：先掌握这些命令和工作方式
description: 面向第一次使用 Grok Build 的开发者，从安装登录、项目检查和 Plan 模式讲起，结合一次真实代码修改，解释常用命令、权限、上下文、会话与自动化技巧，并给出安全排错思路。
summary: 不必先背完整的命令表。跟着本文完成一次“读懂项目、制定计划、修改代码、运行验证”的流程，再理解 Grok Build 的命令、会话和权限如何配合。
category: AI 开发工具
pubDate: 2026-08-28
updatedDate: 2026-08-28
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - AI Coding Agent
  - CLI
  - 新手教程
relatedTranslationKeys:
  - grok-build-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
  - codex-cursor-claude-code-local-dev-tools-guide
draft: false
---

第一次打开 Grok Build，最容易卡住的往往不是安装，而是不知道下一句该说什么。终端里既有 `grok inspect` 这样的系统命令，也有 `/plan`、`/compact` 这样的交互命令；界面还会询问是否允许读文件、改代码或运行脚本。把这些入口混在一起记，很快就会失去头绪。

更合适的入门方式，是先完成一次范围很小的真实任务：让 Grok Build 读取项目规则，解释准备修改的位置，给出计划，修改代码，再运行项目已有的验证命令。走完这条路径后，常用命令各自解决什么问题就会自然清楚。

本文内容已于 **2026-08-28** 根据 xAI 官方文档核对，面向已经有一个本地代码项目、但刚开始使用终端编码代理的读者。如果你更关心可用套餐、平台、模型和产品定位，可以先看[现有的 Grok Build 综合指南](/zh/blog/grok-build-guide/)。

## 1. 开始之前：Grok Build 到底在做什么

Grok Build 是运行在终端中的编码代理。它不只回答代码问题；在获得相应权限后，还能读取仓库、搜索文件、编辑代码、调用终端命令并检查结果。

它有三种主要使用形态：

- **交互式 TUI**：在项目目录运行 `grok`，进入全屏终端界面，适合日常开发。
- **Headless CLI**：用 `grok -p "..."` 发送单次任务，适合脚本和自动化。
- **ACP agent**：用 `grok agent stdio` 通过 Agent Client Protocol 接入其他应用。

刚入门时只需掌握第一种。Headless 和 ACP 是同一个工具的其他入口，不是必须同时学习的功能。

截至 **2026-08-28**，xAI 文档把 `grok-4.6` 列为 Grok Build 当前使用的主要模型。模型和命令仍可能随着客户端更新而变化；遇到本文与本机显示不同的情况，应以 `grok --help`、TUI 内的 `/help` 和当前官方文档为准。

## 2. 安装、登录并进入第一个项目

### 2.1 安装并检查版本

macOS、Linux 和 WSL 可以使用官方安装脚本：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows PowerShell 使用：

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

安装结束后先执行：

```bash
grok version
grok --help
```

第一条确认客户端可以运行，第二条显示当前版本真正支持的命令和参数。如果终端提示找不到 `grok`，先重新打开终端；仍然无效时，再检查安装程序提示的可执行文件目录是否已经加入 `PATH`。

客户端可以用下面的命令检查更新：

```bash
grok update --check
```

### 2.2 浏览器登录、设备码登录与 API Key

日常在本机交互使用，直接登录即可：

```bash
grok login
```

默认流程会打开浏览器。若你在 SSH、容器或没有可用浏览器的远程环境中，可以改用设备码登录：

```bash
grok login --device-auth
```

终端会给出网址和短代码，你可以在另一台有浏览器的设备上完成认证。

API Key 更适合脚本、CI/CD 或其他无人值守场景：

```bash
export XAI_API_KEY="xai-..."
grok -p "Explain this project"
```

不要把真实 API Key 写进代码、提交到 Git，或直接放进团队共享的示例文件。本地交互优先使用可刷新的账号登录；只有确实需要自动化时，再单独配置环境变量或受控的密钥管理方案。

### 2.3 在正确的目录启动

Grok Build 会根据当前工作目录寻找代码、配置和项目规则，因此不要在主目录里随手启动。先进入目标仓库：

```bash
cd path/to/your-project
grok inspect
grok
```

`grok inspect` 很适合作为第一次进入项目时的健康检查。它会显示 Grok 在当前目录发现的配置来源、指令文件、Skills、插件、Hooks 和 MCP servers。需要交给别人排查时，可以使用 `grok inspect --json` 获得机器可读结果，但要先检查输出里是否包含不适合分享的本地路径或配置内容。

## 3. 先分清三类命令

不少入门问题都来自同一个误会：看到的内容都以 `grok` 或 `/` 开头，就以为它们属于同一层。实际可以分成三类。

| 类型 | 在哪里运行 | 示例 | 用途 |
| --- | --- | --- | --- |
| CLI 子命令 | 普通终端 | `grok login`、`grok inspect` | 登录、检查配置、管理模型或会话 |
| 启动参数 | 启动 `grok` 时 | `grok -p "..."`、`grok --cwd app` | 决定本次如何启动、在哪工作、如何输出 |
| TUI 斜杠命令 | 进入 Grok Build 后 | `/plan`、`/context`、`/resume` | 控制当前交互会话 |

例如，`grok models` 要在普通 shell 中运行，用于列出可用模型；进入 TUI 后要切换模型，则使用：

```text
/model <name>
```

不知道某个功能属于哪一层时，不必猜。普通终端查 `grok --help` 或 `grok <subcommand> --help`；TUI 内输入 `/help`。

## 4. 跟着完成第一次代码任务

假设你已经进入一个能正常运行的项目，现在想修复一个小问题。第一次不要把“重构整个项目”交给代理，选一个能用测试或构建命令验证的任务更合适。

### 4.1 先让它读项目，不要立刻改

可以从下面这段提示开始：

```text
先阅读这个仓库的 AGENTS.md、README 和 package.json，解释项目结构、现有开发命令与需要遵守的修改约束。暂时不要修改文件。
```

如果问题指向明确文件，可以用 `@` 引用文件，例如：

```text
@src/components/Search.tsx 解释搜索状态是怎样流转的，暂时不要改代码。
```

这一步不是为了让模型复述整个仓库，而是确认它找对了规则、入口和验证命令。若仓库已有 `AGENTS.md`，Grok Build 会沿当前目录向 Git 仓库根目录查找这类指令文件。团队可以在其中固定构建命令、代码风格、禁止修改的目录和完成标准。

### 4.2 需求不明确时进入 Plan 模式

涉及多个文件、架构选择或高影响重构时，使用：

```text
/plan 修复搜索框清空后结果仍然保留的问题，并补充回归测试
```

Plan 模式会先探索项目并生成可审查的计划。你可以批准、针对某一步评论，或要求重写计划。批准前，计划模式会限制普通编辑工具修改项目文件。

这里有一个重要边界：**Plan 模式不是权限模式，也不是完整的安全沙箱。** 官方文档明确说明，Plan 模式主要限制编辑工具；读取、终端和 MCP 工具仍然遵循当前权限设置，而且 shell 本身仍可能通过重定向写文件。因此，在陌生项目或高风险环境里，不能把“正在 Plan”理解为“任何东西都不可能改变”。

一个可执行的计划至少要说清：

- 准备修改哪些文件，为什么是这些文件；
- 如何保留现有行为和接口；
- 用哪些测试、类型检查或构建命令验收；
- 如果验证失败，如何缩小问题范围。

### 4.3 执行后审查 diff 和验证结果

计划确认后，可以要求 Grok Build 开始修改：

```text
按计划执行。不要修改无关文件。完成后运行相关测试，并说明测试结果和剩余风险。
```

代理说“已经完成”并不等于任务经过验证。你仍应检查 Git diff，并确认它实际运行了仓库规定的测试、lint 或 build 命令。若项目没有自动测试，也要安排一个最小的人工复现步骤。

最后可以让它做一次收尾检查：

```text
检查当前 diff 是否包含无关改动、调试日志、密钥或生成文件；只报告发现，不要继续修改。
```

这种明确的“只检查、不修改”比含糊地说“再优化一下”更容易控制范围。

## 5. 新手最值得记住的常用命令

命令不需要一次背完。下面按使用时机分组，需要时回来查即可。

### 5.1 会话管理

| 命令 | 什么时候用 |
| --- | --- |
| `/new` | 当前任务已经结束，开始一个无关的新任务 |
| `/resume` | 恢复以前的会话 |
| `/sessions` | 切换、重命名或关闭活动会话 |
| `/rename <标题>` | 给当前会话起一个可识别的名称 |
| `/fork` | 从当前会话分出一条独立探索路径 |
| `/rewind` | 回到较早的对话节点 |
| `/export` | 把对话导出到文件或剪贴板 |

`/new` 和 `/compact` 不应混用：前者开启全新会话，适合换任务；后者保留当前任务的压缩摘要，适合上下文开始拥挤但工作还没有结束。

### 5.2 上下文与模型

| 命令 | 什么时候用 |
| --- | --- |
| `/context` | 查看当前上下文占用 |
| `/compact [说明]` | 压缩历史，同时提醒它必须保留哪些目标或约束 |
| `/model <name>` | 在 TUI 内切换可用模型 |
| `grok models` | 在普通终端列出当前账号可用的模型 |

上下文不是“模型记得的一切”。它是当前推理可见的对话、文件片段和工具结果。长时间反复贴日志、整份配置或无关文件，会挤占真正有用的信息。当回答开始重复旧结论、忽略新约束时，先用 `/context` 看占用，再决定是 `/compact` 还是开启新会话。

### 5.3 扩展与项目环境

| 命令 | 作用 |
| --- | --- |
| `/skills` | 打开扩展界面的 Skills 页签 |
| `/plugins` | 打开 Plugins 页签 |
| `/mcps` | 打开 MCP servers 页签 |
| `/hooks` | 打开 Hooks 页签 |
| `grok inspect` | 显示当前目录实际加载了哪些扩展和规则 |

这几个 TUI 命令会打开同一个扩展管理界面的不同页签。若 MCP 无法连接，普通终端里的 `grok mcp doctor [name]` 比反复重启更有用。

## 6. 五个容易混淆的概念

### 6.1 Plan 与权限模式

Plan 决定“先规划还是直接修改”；权限模式决定“工具调用是否需要你批准”。它们是两条不同的控制线。

- **Ask**：默认模式，未被规则允许的操作会请求批准。
- **Auto**：由分类器自动批准安全工具，高风险操作仍可能询问。
- **Always-approve**：跳过普通工具批准，但 deny 规则和部分 Hooks 仍可阻止操作。

刚入门建议保留 Ask。熟悉仓库以后，再为明确且低风险的命令建立精确 allow 规则。不要为了少点几次确认，就在来源不明的仓库里直接运行 `grok --always-approve`。

权限也不等于沙箱：权限决定是否准许运行，沙箱决定获准操作能够访问哪些文件和网络资源。即使你批准了一个命令，它仍可能被沙箱限制；反过来，没有足够约束的 Always-approve 也会扩大误操作风险。

### 6.2 会话、上下文与 Memory

**会话**是一次可恢复的工作记录；**上下文**是模型在当前回合能看到的信息；**Memory**则是跨会话保存的记忆。三者的生命周期不同。

项目事实和硬约束不应只依靠 Memory。构建命令、目录边界和安全规则更适合写进版本控制中的 `AGENTS.md`，这样团队成员和新的会话都能得到同一份事实源。

### 6.3 AGENTS.md、Skills、Plugins 与 MCP

- `AGENTS.md`：告诉代理在这个仓库里应遵循什么规则。
- Skills：封装可重复使用的工作方法、说明和脚本。
- Plugins：可以打包 Skills、agents、Hooks、MCP 和其他扩展。
- MCP：把外部服务或工具暴露给代理调用。

一个小项目通常先写好 `AGENTS.md` 就够了。只有当工作流需要反复复用，或者确实要连接外部系统时，再引入 Skills、Plugins 或 MCP。扩展越多，排查配置来源和权限边界也越重要。

### 6.4 账号登录与 API Key

浏览器或设备码登录适合人在环路中的交互式开发，并且凭据可以刷新。API Key 不可刷新，更适合脚本和 CI。两种方式都能让客户端调用模型，但认证来源、计费方式和团队策略可能不同，不能仅因为都能启动 Grok Build 就把它们当成同一套权益。

### 6.5 TUI、Headless 与 ACP

TUI 面向人在终端里的连续协作；Headless 面向一次性或可编排的命令；ACP 面向其他应用与代理框架。新手日常写代码用 TUI，批量检查或 CI 再考虑 Headless，需要把 Grok Build 嵌入别的工具时才需要 ACP。

## 7. 从能用到好用的实战技巧

### 7.1 提示词要同时给出目标、范围和验收方式

“帮我优化这个项目”没有可验证的结束条件。更稳定的写法是：

```text
修复移动端导航打开后页面仍可滚动的问题。只修改导航组件及其测试，不调整视觉样式。完成后运行相关单元测试和项目 build，并报告未覆盖的浏览器差异。
```

这段提示同时交代了问题、可改范围、不可改范围和验收命令。模型仍可能犯错，但你更容易判断它是否偏离任务。

### 7.2 大任务先 Plan，小任务直接做

Plan 适合需求含糊、跨模块或影响较大的工作；清晰的单文件修复、重命名和格式调整通常没有必要先生成长计划。计划本身也会消耗时间和上下文，不能把它当成每次任务的固定仪式。

### 7.3 让验证成为任务的一部分

不要只说“改完告诉我”，而要把验证写入同一条任务：

```text
修改完成后先运行目标测试，再运行项目 build。若命令失败，不要掩盖错误；说明失败发生在哪一步、是否由本次改动引起。
```

如果测试耗时很长，可以先跑与改动直接相关的最小集合，再在提交前跑完整验证。这样既能早发现方向错误，也不会把“代理生成了 diff”误认为“代码已经可交付”。

### 7.4 用精确规则代替全面放权

Grok Build 支持 `--allow` 和 `--deny` 权限规则。对固定的只读检查或测试命令，可以逐步建立精确允许范围；对删除、发布、推送等高影响操作，则保留确认或显式 deny。deny 的优先级高于 allow。

初学阶段不建议从网上复制一整套宽泛权限配置。先观察自己的项目反复使用哪些命令，再添加最小范围规则，更容易知道每一条授权放开了什么。

### 7.5 自动化先从只读任务开始

Headless 模式最小写法是：

```bash
grok -p "List TODO comments and group them by directory"
```

需要让脚本解析结果时，可以选择 JSON：

```bash
grok --no-auto-update \
  -p "Review the current diff and return only actionable findings" \
  --output-format json
```

`plain` 适合人读，`json` 在结束时输出一个 JSON 对象，`streaming-json` 则逐行输出事件。自动化和 CI 中加入 `--no-auto-update`，可以避免后台更新检查干扰固定流程。

不要把带 `--always-approve` 的写操作作为第一个自动化案例。先从解释代码、检查 TODO、审查 diff 等只读任务开始，确认输出格式、失败处理和费用边界后，再逐步开放修改能力。

## 8. 常见问题的排查顺序

### 8.1 `grok` 命令找不到

先重新打开终端，再检查安装程序提示的目录是否在 `PATH` 中。不要反复执行安装脚本而不看第一次安装输出，否则可能留下多个版本或不同路径的可执行文件。

### 8.2 远程环境无法打开浏览器

使用 `grok login --device-auth`，在另一台设备完成登录。用于无人值守脚本时再考虑 `XAI_API_KEY`，不要把个人 API Key 留在 shell history、仓库文件或 CI 日志中。

### 8.3 没有读取到项目规则

确认终端位于正确仓库，再执行：

```bash
grok inspect
```

检查它发现的指令文件和配置来源。若你从仓库外层目录启动，Grok 可能无法按预期找到项目内的 `AGENTS.md` 或 `.grok/config.toml`。

### 8.4 模型或斜杠命令与文章不同

先运行 `grok version` 和 `grok update --check`，再分别查看 `grok --help` 与 TUI 的 `/help`。部分命令只在相应功能可用时出现，账号权限、配置和客户端版本都可能影响可见内容。

### 8.5 回答开始重复或忽略新要求

用 `/context` 检查上下文。如果仍在处理同一任务，用 `/compact` 并说明必须保留的目标、已完成工作和验证要求；如果已经换了问题，则用 `/new`，不要继续背着上一项任务的长历史。

## 9. 一套适合新手的日常工作流

第一次使用时，可以把流程缩成下面几步：

1. 在项目目录运行 `grok inspect`，确认规则和扩展来源。
2. 运行 `grok`，先要求它阅读仓库规则并解释相关代码。
3. 对跨文件或高影响任务使用 `/plan`，审查范围与验证方案。
4. 保留 Ask 权限模式，只批准你看得懂、范围明确的操作。
5. 修改完成后检查 diff，并实际运行测试或 build。
6. 同一任务过长时用 `/context` 和 `/compact`；换任务时用 `/new`。

真正需要养成的不是“让代理一次生成更多代码”，而是把目标、边界和验证交代清楚。做到这一点后，再学习 Workflows、subagents、worktrees、Plugins 或 MCP，才会是在稳定流程上增加能力，而不是给一个尚未理顺的工作方式继续加复杂度。

## 官方参考

- [Grok Build：安装与快速开始](https://docs.x.ai/build/overview)
- [Grok Build CLI Reference](https://docs.x.ai/build/cli/reference)
- [Modes and Commands](https://docs.x.ai/build/modes-and-commands)
- [Plan Mode](https://docs.x.ai/build/features/plan-mode)
- [Permissions](https://docs.x.ai/build/features/permissions)
- [Headless & Scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Settings 与配置作用域](https://docs.x.ai/build/settings)
- [Skills、Plugins 与 Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [MCP Servers](https://docs.x.ai/build/features/mcp-servers)
