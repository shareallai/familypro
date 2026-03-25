---
locale: zh
translationKey: codex-claude-cursor-instructions-guide
title: Codex、Claude、Cursor 指令文件扫盲：项目规则到底怎么放？
headline: AGENTS.md、CLAUDE.md、.cursor/rules 到底是什么关系？
description: 基于 2026 年 3 月 25 日官方文档，系统讲清 Codex、Claude Code、Cursor 的项目主指令、Rules、skills 和用户级配置该放哪里、何时加载、分别解决什么问题，以及哪些会默认生效。
summary: 如果你总在 AGENTS.md、CLAUDE.md、.cursor/rules、skills 之间来回混淆，这篇文章会把三套机制的职责边界、加载方式和迁移思路一次讲清。
category: AI 工具教程
pubDate: 2026-03-25
updatedDate: 2026-03-25
author: Mark
service: General
tags:
  - Codex
  - Claude Code
  - Cursor
  - AGENTS.md
  - CLAUDE.md
  - Cursor Rules
draft: false
---

如果你最近同时在折腾 Codex、Claude Code 和 Cursor，很容易被几种文件名绕晕：`AGENTS.md`、`CLAUDE.md`、`.cursor/rules/*.mdc`、`SKILL.md`、`.claude/commands/*.md`，看起来都像“给 AI 立规矩”，但它们不是一回事。

真正该先分清的，不是文件名，而是**这条规则到底属于哪一层**：

- 是项目一打开就该默认带上的主指令。
- 还是只有做某类任务时才该触发的专项 SOP。
- 还是你个人机器上的用户级偏好。

这篇文章基于 **2026 年 3 月 25 日** 可见的官方文档整理，只回答一个最实用的问题：**同样是给 AI Agent 定规矩，Codex、Claude Code、Cursor 分别应该把规范写在哪里，哪些会默认生效，哪些只是按需加载。**

## 先看结论

如果你只想先记住一张表，先看这个：

| 工具 | 项目主入口 | 专项流程 / skill | 用户级位置 | 最该记住的点 |
| --- | --- | --- | --- | --- |
| Codex | `AGENTS.md` | `.agents/skills/<skill>/SKILL.md` | `~/.codex/AGENTS.md` | `AGENTS.md` 是启动就读的主指令，skill 是按需加载 |
| Claude Code | `CLAUDE.md` 或 `.claude/CLAUDE.md` | `.claude/skills/<skill>/SKILL.md`，旧的 `.claude/commands/*.md` 仍兼容 | `~/.claude/CLAUDE.md` | `CLAUDE.md` 是项目记忆入口，rules 和 skills 用来拆分或专项化 |
| Cursor | `.cursor/rules/*.mdc`，也支持根目录 `AGENTS.md` 简化写法 | Skills / Agents / Plugins 是另外的能力层 | 主要是 Cursor Settings 里的 User Rules | Cursor 最原生的项目约束机制仍然是 Rules，`AGENTS.md` 更像简化入口 |

如果继续压缩成一句话：

- **Codex 想默认生效**，先写 `AGENTS.md`
- **Claude Code 想默认生效**，先写 `CLAUDE.md`
- **Cursor 想默认生效**，优先写 `.cursor/rules/*.mdc`，简单项目也可用根目录 `AGENTS.md`
- **三者都想做专项 SOP**，再写各自的 skill，而不是把 skill 当成项目主指令

## 一、先分清三种东西

很多讨论会混乱，是因为把三类东西混成了一类。

### 1. 项目主指令

这类文件解决的是“我一进入这个项目，你就先按这些规则干活”。它们的特点通常是：

- 会在会话开始时就被加载，或者非常早地进入上下文
- 内容更适合放项目级约束，比如目录结构、测试命令、代码规范、内容规范
- 目标是**默认生效**

对应到三套工具，最典型的就是：

- Codex 的 `AGENTS.md`
- Claude Code 的 `CLAUDE.md`
- Cursor 的 `.cursor/rules/*.mdc`，或它支持的根目录 `AGENTS.md`

### 2. 专项 skill / workflow

这类文件解决的是“只有当任务属于某一类时，才加载这套工作流”。它们更像 SOP 包，不像项目入口。

所以 skill 适合放：

- 发布博客的检查清单
- 某个框架的特定开发流程
- 某种 review 流程
- 某类自动化脚本的使用说明

它们不适合承担“这个项目的所有默认规则”。

### 3. 用户级配置

这类东西不是项目共享规范，而是你个人机器上的长期偏好，比如：

- 默认先跑什么命令
- 你偏好的包管理器
- 你的常用工作流习惯

所以当你说“我想全局都这样”，要先想清楚你说的是**这个仓库所有人都该这样**，还是**只有我这台机器都这样**。

## 二、Codex：`AGENTS.md` 是主入口，skill 是按需读

Codex 这套机制最容易总结，因为官方写得很明确：`AGENTS.md` 是项目级主指令，skills 走 progressive disclosure。

### 2.1 `AGENTS.md` 会在开工前进入指令链

OpenAI 官方文档写得很直白：Codex 会在开始工作前读取 `AGENTS.md` 文件，而且不是只看一个固定位置。

它的加载逻辑可以概括成三层：

- 用户级：先看 `~/.codex/AGENTS.override.md`，没有再看 `~/.codex/AGENTS.md`
- 项目级：从项目根一路走到当前工作目录，逐层找 `AGENTS.override.md` 或 `AGENTS.md`
- 越靠近当前目录的文件，优先级越高

这意味着 Codex 的 `AGENTS.md` 不是“放着备用”，而是**默认会参与启动时上下文构建**。如果你有必须长期生效的仓库约束，最稳妥的放置点就是它。

### 2.2 skill 不是默认全量读，而是先读元数据

Codex skills 的关键点不是“也能写规则”，而是**它不会像 `AGENTS.md` 那样无条件整份读入**。

官方文档对它的描述是 progressive disclosure。更直白一点说就是：

- Codex 先看到 skill 的元数据，比如 `name`、`description`、路径
- 只有它判断这个 skill 和当前任务相关，才会继续加载完整 `SKILL.md`
- skill 目录里还可以带 `references/`、`scripts/`、`assets/`，这些也是按需使用

所以在 Codex 里，最实用的分工应该是：

- **仓库硬规则**写 `AGENTS.md`
- **专项工作流**写 `.agents/skills/<skill>/SKILL.md`

### 2.3 看到 `AGENT.md` 不代表官方改名了

这里顺手说一个常见误区。

你在真实项目里，确实可能看到 `AGENT.md`、`.agents.md`、`TEAM_GUIDE.md` 之类的文件名。但这通常是团队自己通过 fallback 文件名或项目约定兼容出来的结果，不代表 Codex 官方主文件名变了。

**截至 2026 年 3 月 25 日，Codex 官方项目主指令文件名仍然是 `AGENTS.md`。**

## 三、Claude Code：`CLAUDE.md` 是项目记忆入口，rules 和 skills 是拆分层

Claude Code 和 Codex 很像，但又不完全一样。最容易理解的方式是：**它把项目主说明、模块化规则和专项 skill 分成了三层。**

### 3.1 `CLAUDE.md` 是项目级长期说明

Anthropic 官方现在把 `CLAUDE.md` 直接定义为“persistent instructions”。

几个关键点很重要：

- `CLAUDE.md` 会在每次会话开始时进入上下文
- 项目里既可以放在根目录 `./CLAUDE.md`，也可以放在 `./.claude/CLAUDE.md`
- Claude Code 会从当前工作目录往上找目录层级中的 `CLAUDE.md`
- 当前目录以下的子目录 `CLAUDE.md` 不会在启动时全量加载，而是当 Claude 读取这些子目录文件时再按需带上

这个设计的实际含义是：Claude Code 的项目范围，和你**从哪个目录启动会话**关系很大。你在 `foo/` 启动，和在 `foo/bar/` 启动，读到的项目指令链可能并不一样。

### 3.2 `.claude/rules/` 更像模块化规则，而不是单独取代 `CLAUDE.md`

Claude Code 现在官方支持把规则拆到 `.claude/rules/`。

你可以把它理解成：当项目越来越大时，不要把所有内容都塞进一个巨大的 `CLAUDE.md`，而是把不同主题拆成独立规则文件。它的好处是：

- 没带 `paths` 的规则，可以像项目级规则一样常驻加载
- 带了 `paths` 的规则，只在 Claude 处理匹配文件时生效
- 适合把测试规范、API 规范、前端规范拆开维护

所以在 Claude Code 体系里，更准确的理解不是“只有 `CLAUDE.md` 才算规则”，而是：

- `CLAUDE.md` 是入口
- `.claude/rules/` 是模块化拆分
- `.claude/skills/` 是专项技能包

### 3.3 `.claude/skills` 是正式目录，旧 `.claude/commands` 还兼容

Anthropic 当前文档已经把 custom commands 和 skills 基本合流了。

也就是说：

- 新项目更建议用 `.claude/skills/<skill>/SKILL.md`
- 旧的 `.claude/commands/*.md` 仍然可用
- 两者都可以形成 slash command，但 skill 支持更完整的 supporting files 能力

这也解释了为什么很多老文章还在讲 `.claude/commands`，而新文档更强调 `.claude/skills`。不是前者突然失效了，而是官方推荐路径已经偏向 skill。

### 3.4 `CLAUDE.md` 很像 Codex 的 `AGENTS.md`，但注入位置不一样

如果你从 Codex 迁移到 Claude Code，一个实用心智模型是：

- Codex 的仓库主指令，对应 Claude Code 的 `CLAUDE.md`
- Codex 的 `.agents/skills`，对应 Claude Code 的 `.claude/skills`

但两者还是有一个值得知道的差别：Anthropic 文档明确写了，`CLAUDE.md` 的内容是在系统提示之后，以一条 user message 的形式送进上下文的。它当然很重要，但它不是不可违背的硬系统层配置。

## 四、Cursor：先把它理解成 Rules 系统，不是 `AGENTS.md` 那一套

Cursor 最容易让人误判的地方，是你看到它也谈“规则”、也谈“技能”、也谈“agent”，就会下意识把它往 Codex / Claude Code 的文件命名体系里套。

但如果你问的是**项目级约束应该放哪**，当前最稳的答案仍然是：**优先理解成 `.cursor/rules/*.mdc`。**

### 4.1 `.cursor/rules/*.mdc` 是 Cursor 的原生项目规则格式

Cursor 官方规则文档把 Project Rules 定义得很清楚：

- 规则文件放在 `.cursor/rules`
- 每个规则文件用 `.mdc` 格式编写
- 规则支持 metadata + 内容
- 可以根据不同应用方式决定是否常驻、是否按文件模式自动附着、是否交给 Agent 自己判断是否需要

如果你是团队协作场景，这套机制最大的价值是：**规则本身可以跟项目一起进版本控制，而不是只活在某个人的本地设置里。**

### 4.2 Cursor 的“默认生效”主要靠 Rules，而不是 skill

Cursor 当然也有 Skills、Agents、Plugins，但它们更像能力扩展层，不是“项目主约束入口”的最核心答案。

所以如果你要迁移一套团队规范，最不容易出错的做法仍然是：

- 先把项目级约束写进 `.cursor/rules/*.mdc`
- 再考虑要不要补更专项的 Skills / Agents / Plugins

这一点和 Codex / Claude Code 的差别非常大。后两者会把“项目主说明文件”单独命名出来，而 Cursor 更像是把**规则系统本身**当作项目入口。

### 4.3 补充一句：Cursor 现在正式把 `AGENTS.md` 也列进来了

这里补一个容易踩坑的细节。

Cursor 当前官方 Rules 文档里，已经把 `AGENTS.md` 作为一种可识别的 agent instructions 形式单独列出来了，而且明确把它定位成 `.cursor/rules` 的简单替代方案。

但如果你问“在 Cursor 里最原生、最细粒度、最适合项目长期维护的机制是什么”，结论仍然更接近 `.cursor/rules/*.mdc`。因为 `AGENTS.md` 在 Cursor 里更像单文件、无 metadata、无复杂作用域控制的简化入口。

再补一条更容易被忽略的细节：Cursor 官方 CLI 文档还说明，CLI 会把项目根目录里的 `AGENTS.md` 和 `CLAUDE.md` 一并当作 rules 读取。所以如果你跨工具复用项目说明，Cursor 并不是完全看不懂这些文件名；只是它自己的原生规则中心依然是 Rules。

## 五、最容易搞混的四个点

### 5.1 skill 不是项目主指令

这个误区最常见。

很多人把 skill 当成“高级一点的项目规范文件”，然后期待它像 `AGENTS.md` 或 `CLAUDE.md` 一样默认全量生效，最后就会觉得“怎么老是不触发”。

其实三套工具的共通规律都差不多：

- 项目主指令负责默认规则
- skill 负责专项任务

把两者混用，通常只会让效果变差。

### 5.2 文件名长得像，不等于加载逻辑一样

同样是 Markdown 文件：

- Codex 的核心是 `AGENTS.md`
- Claude Code 的核心是 `CLAUDE.md`
- Cursor 的核心是 `.cursor/rules/*.mdc`

别因为它们最后都长得像文档，就以为加载时机、优先级、作用范围也一样。

### 5.3 Claude Code 的“项目范围”特别依赖启动目录

这一点和很多人直觉不一样。

Anthropic quickstart 的标准方式就是先 `cd /path/to/your/project` 再运行 `claude`。再配合 `CLAUDE.md` 的层级加载机制，你就会明白：**Claude Code 的项目感知，本质上是跟当前工作目录绑定得很深的。**

### 5.4 真实仓库里的文件名可能带团队私货

不少团队会用：

- `AGENT.md`
- `INSTRUCTIONS.md`
- `TEAM_GUIDE.md`
- `PLAYBOOK.md`

这不奇怪。但你写对外教程时，最好把“团队自定义命名”和“官方默认机制”分开讲，不然读者很容易误以为这些名字是官方统一标准。

## 六、如果你要做三端迁移，最实用的映射是这样

假设你现在手里有一套现成的项目规范，想同时适配 Codex、Claude Code、Cursor，最务实的拆法通常是三层。

### 第一层：仓库默认规则

把必须默认生效的内容写成各自的项目主入口：

- Codex：`AGENTS.md`
- Claude Code：`CLAUDE.md`
- Cursor：`.cursor/rules/*.mdc`

这层适合放：

- 仓库结构
- build / test / lint 命令
- 提交规范
- 安全边界
- 目录级别约束

### 第二层：专项 SOP

把只有某类任务才需要的流程拆成 skills。

这层适合放：

- 博客发布流程
- 发布前检查
- 特定框架开发 SOP
- review 清单
- 自动化脚本调用方式

### 第三层：个人偏好

把不该强加给团队、但你自己希望长期复用的习惯，放到用户级配置：

- Codex：`~/.codex/AGENTS.md`
- Claude Code：`~/.claude/CLAUDE.md`
- Cursor：User Rules / Settings

这样拆完以后，三套工具虽然长得不一样，但管理逻辑会清楚很多：

- **默认规则**和**专项流程**分开
- **团队共享**和**个人偏好**分开
- **项目入口**和**能力扩展**分开

## 结论

如果你只记一句话，请记这句：**Codex 和 Claude Code 都有很明确的“项目主说明文件”概念，而 Cursor 更像是把项目规则系统本身做成了主入口。**

所以别再用一个 skill 去硬扛整个项目规范，也别把 Cursor 的 Rules、Codex 的 `AGENTS.md`、Claude Code 的 `CLAUDE.md` 当成同名替换关系。它们解决的是相似问题，但加载方式和职责边界并不一样。

如果你下一步要做的是把同一套项目规范同时适配这三端，最稳的做法不是追求“一个文件通吃”，而是先按这篇文章的三层结构拆开，再做映射。

## 参考文档

- <a href="https://developers.openai.com/codex/guides/agents-md" rel="nofollow">OpenAI Developers: Custom instructions with AGENTS.md</a>
- <a href="https://developers.openai.com/codex/skills" rel="nofollow">OpenAI Developers: Agent Skills</a>
- <a href="https://code.claude.com/docs/en/quickstart" rel="nofollow">Claude Code Docs: Quickstart</a>
- <a href="https://code.claude.com/docs/en/memory" rel="nofollow">Claude Code Docs: How Claude remembers your project</a>
- <a href="https://code.claude.com/docs/en/slash-commands" rel="nofollow">Claude Code Docs: Extend Claude with skills</a>
- <a href="https://code.claude.com/docs/en/permission-modes" rel="nofollow">Claude Code Docs: Choose a permission mode</a>
- <a href="https://cursor.com/docs/rules" rel="nofollow">Cursor Docs: Rules</a>
