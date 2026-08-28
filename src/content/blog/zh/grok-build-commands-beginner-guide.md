---
locale: zh
translationKey: grok-build-commands-beginner-guide
title: Grok Build 常用命令实用教程：新手从安装到完成代码修改
headline: Grok Build 新手入门：先掌握这些命令和工作方式
description: 面向第一次使用 Grok Build 的开发者，从安装登录、项目检查和 Plan 模式讲起，结合一次真实代码修改，解释常用命令、权限、上下文、会话与自动化技巧，并给出安全排错思路。
summary: 本文从一次小型代码修改入手，说明如何安装和启动 Grok Build、怎样审查计划与改动，以及日常会用到的命令、会话和权限设置。
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

将终端切换到一个代码项目，输入 `grok`，Grok Build 就会在这个项目中启动。你可以请它解释一段代码，也可以让它寻找问题、修改文件并运行测试。与普通聊天工具不同，它面对的不是你临时粘贴的一小段代码，而是当前目录里的整个仓库；它能做多少，则取决于你给了哪些权限。

对于初次使用者，最稳妥的做法不是先背命令，而是挑一个改动范围清楚、结果容易验证的小问题。例如，修正一处错误提示，或为已有函数补一条测试。先让 Grok Build 阅读项目，再审查它的计划，确认修改结果，最后运行测试。经历过这一轮，`/plan`、`/context` 和 `/resume` 之类的命令便不再是孤立的名词，而是工作进行到某个阶段时自然会用到的工具。

下文就沿着这条路径展开。内容已于 **2026-08-28** 按 xAI 官方文档核对；如果你主要想了解套餐、模型和产品定位，可另阅 [Grok Build 综合指南](/zh/blog/grok-build-guide/)。

## 1. 先认识日常使用的 Grok Build

Grok Build 是一款终端编码代理。它可以读取和搜索仓库，在获得许可后编辑文件、调用终端命令，并根据测试或构建结果继续处理问题。日常开发最常见的入口，是在项目目录中运行 `grok`，进入全屏终端界面，也就是官方文档所说的 TUI。

它还有两种面向集成的用法。`grok -p "..."` 可以在没有交互界面的情况下执行单次任务，适合脚本和自动化；`grok agent stdio` 则通过 Agent Client Protocol（ACP）把 Grok Build 接入其他应用。刚开始使用时不必兼顾这两种形式，先熟悉 TUI 已足以完成多数日常工作。

截至 **2026-08-28**，官方文档将 `grok-4.6` 列为 Grok Build 当前使用的主要模型。客户端仍在更新，本文与本机界面若有差异，应以 `grok --help`、TUI 中的 `/help` 和最新官方文档为准。

## 2. 安装、登录并进入第一个项目

### 2.1 安装与版本检查

macOS、Linux 和 WSL 可以使用官方安装脚本：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows PowerShell 使用：

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

安装完成后，先确认命令已经可以使用：

```bash
grok version
grok --help
```

`grok version` 显示当前版本，`grok --help` 则列出该版本实际支持的命令和参数。如果终端仍然找不到 `grok`，可以先重开终端，再检查安装程序给出的可执行文件目录是否已经加入 `PATH`。

客户端可以用下面的命令检查更新：

```bash
grok update --check
```

### 2.2 登录方式

在本机交互使用时，运行：

```bash
grok login
```

默认登录流程会打开浏览器。在 SSH、容器或其他没有浏览器的环境中，可以改用设备码：

```bash
grok login --device-auth
```

终端随后会显示一个网址和短代码，认证可以在另一台有浏览器的设备上完成。

API Key 更适合脚本、CI/CD 或其他无人值守场景：

```bash
export XAI_API_KEY="xai-..."
grok -p "Explain this project"
```

API Key 不应写入代码、提交到 Git，也不宜直接放进团队共享的示例文件。个人电脑上的交互式使用通常采用账号登录；脚本和 CI 中再通过环境变量或密钥管理服务提供 API Key。

### 2.3 从项目目录启动

当前工作目录决定了 Grok Build 从哪里寻找代码、配置和项目规则。使用前应先进入目标仓库：

```bash
cd path/to/your-project
grok inspect
grok
```

这里的 `grok inspect` 不会启动交互会话，而是列出当前目录中发现的配置来源、指令文件、Skills、插件、Hooks 和 MCP servers。第一次进入陌生项目时，先看一遍这份结果，通常能提前发现工作目录错误或规则未被读取等问题。`grok inspect --json` 可以生成便于程序处理的输出；对外分享前，仍需检查其中是否包含本地路径或配置内容。

## 3. 命令为什么看起来不一样

安装教程和使用界面中会出现三种不同形式的命令。它们分别作用于客户端、启动过程和当前会话，运行位置也不相同。

| 类型 | 在哪里运行 | 示例 | 用途 |
| --- | --- | --- | --- |
| CLI 子命令 | 普通终端 | `grok login`、`grok inspect` | 登录、检查配置、管理模型或会话 |
| 启动参数 | 启动 `grok` 时 | `grok -p "..."`、`grok --cwd app` | 决定本次如何启动、在哪工作、如何输出 |
| TUI 斜杠命令 | 进入 Grok Build 后 | `/plan`、`/context`、`/resume` | 控制当前交互会话 |

例如，`grok models` 要在普通 shell 中运行，用于列出可用模型；进入 TUI 后要切换模型，则使用：

```text
/model <name>
```

不确定一条命令应该在哪里输入时，可以在普通终端查看 `grok --help` 或 `grok <subcommand> --help`；进入 TUI 后，则用 `/help` 查看当前可用的斜杠命令。

## 4. 完成第一次代码修改

初次尝试宜选择边界清楚的任务。相比“重构整个项目”，修正一个可复现的界面问题、调整一段错误文案，或为现有逻辑补充测试，都更容易判断结果是否正确。

### 4.1 先读项目，再谈修改

进入 TUI 后，可以先输入：

```text
先阅读这个仓库的 AGENTS.md、README 和 package.json，解释项目结构、现有开发命令与需要遵守的修改约束。暂时不要修改文件。
```

如果问题指向明确文件，可以用 `@` 引用文件，例如：

```text
@src/components/Search.tsx 解释搜索状态是怎样流转的，暂时不要改代码。
```

这一步的目的不是让模型复述所有目录，而是确认它找到了真正的入口、项目规则和验证命令。若仓库已有 `AGENTS.md`，Grok Build 会从当前目录向 Git 仓库根目录查找这类指令文件。构建命令、代码风格、禁改目录和完成标准，都适合写在这里，成为团队共同维护的项目说明。

### 4.2 需要权衡时，先看计划

涉及多个文件、架构选择或高影响重构时，使用：

```text
/plan 修复搜索框清空后结果仍然保留的问题，并补充回归测试
```

Plan 模式会先探索相关代码，再给出一份可审查的修改计划。你可以逐项评论，也可以退回重写；计划获得批准后，Grok Build 才进入正式修改阶段。对于跨文件改动、架构选择或需求仍有歧义的任务，这一步尤其有用。

不过，Plan 模式并不等同于只读环境。官方文档说明，它主要限制编辑工具；读取、终端和 MCP 工具仍受当前权限设置管理，shell 也可能通过重定向写入文件。因此，即便处于 Plan 模式，仍应留意工具调用和授权提示。

审查计划时，主要看四件事：

- 准备修改哪些文件，为什么是这些文件；
- 如何保留现有行为和接口；
- 用哪些测试、类型检查或构建命令验收；
- 如果验证失败，如何缩小问题范围。

### 4.3 修改完成后仍要验收

计划确认后，可以要求 Grok Build 开始修改：

```text
按计划执行。不要修改无关文件。完成后运行相关测试，并说明测试结果和剩余风险。
```

“已经完成”只表示代理停止了本轮工作，并不能代替验收。此时应查看 Git diff，确认改动没有越过约定范围，再检查测试、lint 或 build 是否确实运行并通过。项目若没有自动化测试，也应保留一条能够人工复现的检查路径。

最后可以让它做一次收尾检查：

```text
检查当前 diff 是否包含无关改动、调试日志、密钥或生成文件；只报告发现，不要继续修改。
```

在收尾阶段限定“只报告，不再修改”，可以避免一次已经收敛的改动又因笼统的“继续优化”而扩大。

## 5. 日常最常用的命令

完成过一次任务后，下面这些命令大多已经有了具体用途。可以按会话、上下文和扩展三组查阅，无须一次记住全部。

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

`/new` 用于更换任务，`/compact` 则用于继续当前任务。后者会压缩已有对话，保留一份较短的上下文摘要；若工作主题已经改变，直接新建会话通常更清楚。

### 5.2 上下文与模型

| 命令 | 什么时候用 |
| --- | --- |
| `/context` | 查看当前上下文占用 |
| `/compact [说明]` | 压缩历史，同时提醒它必须保留哪些目标或约束 |
| `/model <name>` | 在 TUI 内切换可用模型 |
| `grok models` | 在普通终端列出当前账号可用的模型 |

上下文是模型在当前会话中能够看到的对话、文件片段和工具结果，并不等于一份永久记忆。大量重复日志、完整配置和无关文件会占去空间。当回答开始重复旧结论或遗漏新约束时，可先用 `/context` 查看占用，再决定压缩当前会话还是另开一项任务。

### 5.3 扩展与项目环境

| 命令 | 作用 |
| --- | --- |
| `/skills` | 打开扩展界面的 Skills 页签 |
| `/plugins` | 打开 Plugins 页签 |
| `/mcps` | 打开 MCP servers 页签 |
| `/hooks` | 打开 Hooks 页签 |
| `grok inspect` | 显示当前目录实际加载了哪些扩展和规则 |

这些 TUI 命令打开的是同一个扩展管理界面，只是停留在不同页签。MCP 无法连接时，可以退出到普通终端，运行 `grok mcp doctor [name]` 查看诊断结果。

## 6. 使用一段时间后会遇到的几个概念

### 6.1 Plan 与权限模式

Plan 决定是否先形成一份待审查的修改方案；权限模式决定工具调用是否需要人工批准。两者彼此独立。

- **Ask**：默认模式，未被规则允许的操作会请求批准。
- **Auto**：由分类器自动批准安全工具，高风险操作仍可能询问。
- **Always-approve**：跳过普通工具批准，但 deny 规则和部分 Hooks 仍可阻止操作。

初次使用时保留 Ask 较为稳妥。熟悉仓库以后，可以为明确且低风险的命令建立精确的 allow 规则。`grok --always-approve` 会跳过普通工具授权，不适合在来源不明的仓库中为了省去确认而随意开启。

权限与沙箱也不是一回事。前者决定一个操作能否开始，后者限制获准操作可以访问的文件和网络资源。某条命令即使得到批准，仍可能受到沙箱限制；缺少约束的 Always-approve，则会扩大误操作的范围。

### 6.2 会话、上下文与 Memory

会话保存一段可恢复的工作记录；上下文是模型当前能够读取的信息；Memory 则用于跨会话保留记忆。三者的保存时间和作用范围并不相同。

项目事实和硬性约束不宜只留在 Memory 中。构建命令、目录边界和安全规则更适合写入受版本控制的 `AGENTS.md`，以便团队成员和新的会话都读取同一份说明。

### 6.3 AGENTS.md、Skills、Plugins 与 MCP

- `AGENTS.md` 记录当前仓库需要遵守的规则。
- Skills 保存可以复用的工作方法、说明和脚本。
- Plugins 可以把 Skills、agents、Hooks、MCP 等扩展打包在一起。
- MCP 把外部服务或工具接入代理的工作环境。

对于小型项目，一份清楚的 `AGENTS.md` 往往已经足够。等到某套流程需要反复使用，或项目确实需要连接外部系统时，再逐步引入 Skills、Plugins 或 MCP。扩展越多，配置来源和权限边界也越需要定期检查。

### 6.4 账号登录与 API Key

浏览器或设备码登录适合有人参与的交互式开发，登录凭据可以刷新。API Key 不可刷新，更常用于脚本和 CI。两种方式都能让客户端调用模型，但认证来源、计费方式和团队策略可能不同，不能据此认定它们属于同一套权益。

### 6.5 TUI、Headless 与 ACP

TUI 适合人在终端里连续协作，Headless 适合一次性命令和自动化流程，ACP 则供其他应用或代理框架接入。日常写代码先用 TUI；需要批量检查或接入 CI 时，再考虑 Headless；只有把 Grok Build 嵌入其他工具时，才会用到 ACP。

## 7. 让 Grok Build 更可靠地完成任务

### 7.1 提示词要同时给出目标、范围和验收方式

“帮我优化这个项目”既没有边界，也没有可验证的结束条件。可以把要求改写为：

```text
修复移动端导航打开后页面仍可滚动的问题。只修改导航组件及其测试，不调整视觉样式。完成后运行相关单元测试和项目 build，并报告未覆盖的浏览器差异。
```

这段话给出了问题、修改范围、不可改变的部分和验收方式。即使结果有误，也容易看出偏差出现在哪里。

### 7.2 大任务先 Plan，小任务直接做

Plan 适合需求仍有歧义、跨越多个模块或影响较大的工作。单文件修复、重命名和格式调整若已有明确路径，通常不必先生成长计划。计划本身同样占用时间和上下文，没有必要把它变成每项任务的固定步骤。

### 7.3 让验证成为任务的一部分

验证应当写进任务，而不是留到代理声称完成之后再补问：

```text
修改完成后先运行目标测试，再运行项目 build。若命令失败，不要掩盖错误；说明失败发生在哪一步、是否由本次改动引起。
```

测试耗时较长时，可以先运行与改动直接相关的最小集合，提交前再完成全量验证。这样既能及早发现方向错误，也不会把一份已经生成的 diff 误当作可交付结果。

### 7.4 用精确规则代替全面放权

Grok Build 支持 `--allow` 和 `--deny` 权限规则。固定的只读检查或测试命令可以逐步加入精确的允许范围；删除、发布、推送等高影响操作，则应保留人工确认，或设置明确的 deny。规则冲突时，deny 的优先级高于 allow。

与其复制一套宽泛的权限配置，不如先观察项目中反复使用的命令，再按需要添加最小范围的规则。这样更容易说明每一项授权究竟放开了什么。

### 7.5 自动化先从只读任务开始

熟悉交互式使用后，可以从只读任务开始尝试 Headless：

```bash
grok -p "List TODO comments and group them by directory"
```

需要让脚本解析结果时，可以选择 JSON：

```bash
grok --no-auto-update \
  -p "Review the current diff and return only actionable findings" \
  --output-format json
```

`plain` 适合直接阅读，`json` 在任务结束时给出一个 JSON 对象，`streaming-json` 则逐行输出事件。在自动化和 CI 中加入 `--no-auto-update`，可以避免后台更新检查干扰固定流程。

自动化的第一步不宜是带有 `--always-approve` 的写操作。先用它解释代码、检查 TODO 或审查 diff，确认输出格式、失败处理和费用边界以后，再考虑开放修改能力。

## 8. 出现问题时从哪里查起

### 8.1 `grok` 命令找不到

先重新打开终端，再检查安装程序提示的目录是否在 `PATH` 中。反复执行安装脚本却忽略第一次的输出，可能留下多个版本或指向不同路径的可执行文件。

### 8.2 远程环境无法打开浏览器

使用 `grok login --device-auth`，在另一台设备完成登录。无人值守脚本再考虑 `XAI_API_KEY`；个人 API Key 不应留在 shell history、仓库文件或 CI 日志中。

### 8.3 没有读取到项目规则

确认终端位于正确仓库，再执行：

```bash
grok inspect
```

检查输出中的指令文件和配置来源。从仓库以外的目录启动时，Grok Build 可能无法按预期找到项目内的 `AGENTS.md` 或 `.grok/config.toml`。

### 8.4 模型或斜杠命令与文章不同

先运行 `grok version` 和 `grok update --check`，再分别查看 `grok --help` 与 TUI 中的 `/help`。有些命令只在相应功能可用时出现；账号权限、本地配置和客户端版本都会影响最终显示的内容。

### 8.5 回答开始重复或忽略新要求

先用 `/context` 检查上下文。仍在处理同一任务时，可以用 `/compact`，并说明需要保留的目标、既有结论和验证要求；任务已经改变时，则用 `/new` 开始新的会话，避免旧内容继续影响判断。

## 9. 把它放进日常开发流程

一次较为稳妥的使用过程并不复杂：在项目目录运行 `grok inspect`，确认规则与配置来源；启动 Grok Build 后，先让它阅读项目规则和相关代码；任务涉及多个文件或存在取舍时，再进入 `/plan`。修改完成后查看 diff，运行测试或 build，然后决定是否保留结果。会话变长时用 `/context` 和 `/compact` 整理信息，工作主题改变时则用 `/new` 重新开始。

Grok Build 的价值不在于一次生成尽可能多的代码，而在于把理解、修改和验证放在同一段工作过程里。先把任务边界和验收方法说清楚，再逐步学习 Workflows、subagents、worktrees、Plugins 或 MCP，这些扩展才会真正改善现有流程，而不是增加一层尚未消化的复杂性。

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
