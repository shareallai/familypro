---
locale: en
translationKey: codex-claude-cursor-instructions-guide
title: "Codex vs Claude Code vs Cursor: Where Project Rules Actually Go"
headline: AGENTS.md, CLAUDE.md, and Cursor Rules, explained
description: Official docs checked March 25, 2026. This guide explains where Codex, Claude Code, and Cursor expect project rules, skills, and user-level config.
summary: If you keep mixing up AGENTS.md, CLAUDE.md, .cursor/rules, and skills, this guide breaks down what each layer is for, when it loads, and how to map one workflow across all three tools.
category: AI Tooling
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

If you work across Codex, Claude Code, and Cursor, it is very easy to blur together a few similar-looking files: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/*.mdc`, `SKILL.md`, and even older folders like `.claude/commands/*.md`. They all look like "instructions for the agent," but they do not play the same role.

The first thing to separate is not the filename. It is the **layer**:

- Is this the main project instruction that should apply by default?
- Is this a task-specific SOP that should only load when relevant?
- Or is it a user-level preference that belongs on one machine, not in the repo?

This article is based on the official docs visible on **March 25, 2026**. The goal is simple: explain where Codex, Claude Code, and Cursor expect project-level instructions, how skills fit in, what loads by default, and what only loads on demand.

## Start with the short version

If you only want one table, make it this one:

| Tool | Main project entry point | Task-specific workflow / skill | User-level location | The one thing to remember |
| --- | --- | --- | --- | --- |
| Codex | `AGENTS.md` | `.agents/skills/<skill>/SKILL.md` | `~/.codex/AGENTS.md` | `AGENTS.md` is the default project instruction file; skills are loaded progressively |
| Claude Code | `CLAUDE.md` or `.claude/CLAUDE.md` | `.claude/skills/<skill>/SKILL.md`; older `.claude/commands/*.md` still work | `~/.claude/CLAUDE.md` | `CLAUDE.md` is the main project memory entry point; rules and skills split work by scope |
| Cursor | `.cursor/rules/*.mdc`; root `AGENTS.md` is also supported as a simpler option | Skills / Agents / Plugins are separate capability layers | Mostly User Rules in Cursor settings | Rules are still Cursor's native project constraint system; `AGENTS.md` is more of a lightweight shortcut |

If you compress it even further:

- Want Codex rules to apply by default? Put them in `AGENTS.md`
- Want Claude Code rules to apply by default? Put them in `CLAUDE.md`
- Want Cursor rules to apply by default? Prefer `.cursor/rules/*.mdc`, with root `AGENTS.md` as the simple alternative
- Want a task-specific workflow in any of the three? Use a skill, not the main project instruction file

## 1. Separate the three layers first

Most confusion comes from mixing three different things together.

### 1.1 Main project instructions

These answer the question: "When the agent enters this repo, what should it know right away?"

That usually means:

- loaded at session start, or very early in context assembly
- used for repo-wide rules, build commands, test commands, architecture, naming, and safety boundaries
- intended to apply by default

In practice, that means:

- `AGENTS.md` for Codex
- `CLAUDE.md` for Claude Code
- `.cursor/rules/*.mdc`, or the simpler root `AGENTS.md`, for Cursor

### 1.2 Task-specific skills or workflows

These answer a different question: "If this task belongs to a certain category, what specialized workflow should the agent follow?"

That makes skills a good place for:

- blog publishing workflows
- review checklists
- framework-specific SOPs
- release checklists
- script usage guides

They are usually the wrong place for "everything the project always wants."

### 1.3 User-level preferences

These are not shared project rules. They are long-lived preferences for one person or one machine, such as:

- your default package manager habits
- your preferred debugging workflow
- personal coding preferences that should not be forced on a team

That distinction matters. "I want this everywhere" can mean "every repo on my machine" or "every contributor in this project." Those are not the same thing.

## 2. Codex: `AGENTS.md` is the main layer, skills are demand-loaded

Codex is the cleanest system to summarize because the official docs are explicit about the split: `AGENTS.md` is the project instruction layer, while skills use progressive disclosure.

### 2.1 `AGENTS.md` is part of startup context

OpenAI's docs describe `AGENTS.md` as something Codex reads before starting work, and not just from one fixed location.

The practical model looks like this:

- user scope: Codex checks `~/.codex/AGENTS.override.md`, then `~/.codex/AGENTS.md`
- project scope: it walks from the project root toward the current working directory, checking for `AGENTS.override.md` or `AGENTS.md`
- more specific files closer to your current directory take precedence

That is why `AGENTS.md` is not a backup note. It is the place for repo-level instructions that really should apply by default.

### 2.2 Skills are not fully loaded up front

Codex skills are useful for a different reason: they do not consume full context unless Codex decides they are relevant.

The docs call this progressive disclosure:

- Codex starts with each skill's metadata, such as `name`, `description`, and file path
- it loads the full `SKILL.md` only when it decides to use that skill
- additional files such as `references/`, `scripts/`, and `assets/` are also used as needed rather than blindly loaded

So the practical split in Codex is straightforward:

- put hard project rules in `AGENTS.md`
- put specialized workflows in `.agents/skills/<skill>/SKILL.md`

### 2.3 Seeing `AGENT.md` in the wild does not mean the official name changed

This is one of the easier mistakes to make.

Real repositories often contain names like `AGENT.md`, `.agents.md`, `TEAM_GUIDE.md`, or other house conventions. That does not mean the official Codex project instruction filename changed.

As of **March 25, 2026**, the official Codex project instruction filename is still `AGENTS.md`.

## 3. Claude Code: `CLAUDE.md` is the project memory entry point, with rules and skills around it

Claude Code feels similar to Codex at a glance, but the internal shape is slightly different. The easiest way to think about it is: **project memory, modular rules, and skills are separate layers.**

### 3.1 `CLAUDE.md` is the persistent project instruction file

Anthropic describes `CLAUDE.md` as persistent instructions.

The key points are:

- `CLAUDE.md` is loaded at the start of each session
- project instructions can live in either `./CLAUDE.md` or `./.claude/CLAUDE.md`
- Claude Code walks up the directory tree from the current working directory to find relevant `CLAUDE.md` files
- `CLAUDE.md` files in subdirectories are not fully loaded at launch; they are brought in when Claude reads files in those subdirectories

That design has a practical consequence: in Claude Code, the effective project scope depends heavily on **where you launch the session**.

### 3.2 `.claude/rules/` is for modular project rules

Claude Code now officially supports `.claude/rules/` for splitting project instructions into smaller files.

That is useful when one big `CLAUDE.md` starts turning into a dumping ground. With `.claude/rules/`, you can separate testing rules, API rules, frontend rules, or security rules into distinct files.

The main behavior to remember is:

- rules without `paths` frontmatter load at launch
- rules with `paths` apply when Claude works with matching files
- this keeps always-on instructions separate from file-scoped rules

So in Claude Code, the cleaner mental model is:

- `CLAUDE.md` is the main entry point
- `.claude/rules/` is the modular rule layer
- `.claude/skills/` is the task-specific layer

### 3.3 `.claude/skills` is the modern skill directory; old `.claude/commands` still exists

Anthropic's current docs have largely merged custom commands and skills into one broader extension story.

In practice:

- new projects should generally prefer `.claude/skills/<skill>/SKILL.md`
- older `.claude/commands/*.md` content is still supported
- both can surface slash-command style workflows, but skills are the more complete long-term format

That is why older guides still talk about `.claude/commands`, while newer docs lean toward `.claude/skills`.

### 3.4 `CLAUDE.md` plays a similar role to Codex `AGENTS.md`, but not at the same instruction level

If you are mapping concepts across tools, a reasonable translation is:

- Codex `AGENTS.md` roughly maps to Claude Code `CLAUDE.md`
- Codex `.agents/skills` roughly maps to Claude Code `.claude/skills`

But there is still an important detail: Anthropic explicitly says `CLAUDE.md` content is delivered after the system prompt as a user message. In other words, it is very important context, but it is not a hidden system-level hard override.

## 4. Cursor: think "Rules first," not "just another AGENTS.md system"

Cursor is the easiest one to misread because it also talks about rules, agents, and skills, which makes people want to force it into the same naming model as Codex or Claude Code.

But if the question is "Where should project-level constraints live?", the safest starting point is still: **Cursor Rules.**

### 4.1 `.cursor/rules/*.mdc` is Cursor's native project rule format

Cursor's official rules docs define project rules around `.cursor/rules`.

At a high level:

- rules live in `.cursor/rules`
- they use the `.mdc` format
- they support metadata plus instruction content
- they can be set up to load always, attach based on matching files, or be attached when the agent decides they are relevant

For team workflows, the biggest advantage is simple: these rules live in the repo and can be versioned with the project.

### 4.2 Default project behavior in Cursor still centers on Rules

Cursor also has Skills, Agents, and Plugins, but those are better understood as capability layers, not the primary answer to "where do my project rules go?"

So if you are migrating a team-wide instruction set into Cursor, the safest baseline is:

- put project-level defaults in `.cursor/rules/*.mdc`
- add Skills / Agents / Plugins only when you actually need those extra layers

That is a meaningful difference from Codex and Claude Code, which both present a single named project instruction file more directly.

### 4.3 Cursor now explicitly recognizes `AGENTS.md` too

There is one detail worth calling out because older explanations often miss it.

Cursor's current docs also recognize root `AGENTS.md` as an instruction format, and position it as a simpler alternative to `.cursor/rules`.

That does **not** mean Rules stopped mattering. It means Cursor gives you two levels:

- `AGENTS.md` for a simpler single-file setup
- `.cursor/rules/*.mdc` for the more native, scoped, metadata-friendly rules system

There is one more useful detail here: Cursor's CLI docs also say the CLI reads project-root `AGENTS.md` and `CLAUDE.md` as rules. So if you are reusing instruction files across tools, Cursor is not completely blind to those names. It just still treats Rules as its native rule center.

## 5. The four things people mix up most often

### 5.1 A skill is not your main project instruction file

This is the most common mistake.

People write a skill and expect it to behave like `AGENTS.md` or `CLAUDE.md`, then wonder why it does not always fire.

Across all three tools, the practical split is similar:

- main project instructions are for default behavior
- skills are for specialized tasks

If you try to make one skill carry the whole repository policy, you usually get worse results.

### 5.2 Similar filenames do not imply similar loading behavior

These are all markdown-based files, but they are not equivalent:

- Codex centers on `AGENTS.md`
- Claude Code centers on `CLAUDE.md`
- Cursor centers on `.cursor/rules/*.mdc`

Treating them as direct name substitutions is where confusion usually starts.

### 5.3 Claude Code is especially sensitive to where you launch it

Anthropic's quickstart pattern is still "go to the project directory, then run `claude`."

Combined with directory-based `CLAUDE.md` loading, that means Claude Code's effective project context is tightly bound to your working directory. Launching from the repo root and launching from a nested subdirectory are not the same thing.

### 5.4 Real repos often contain custom filenames that are not official standards

You will see files like:

- `AGENT.md`
- `INSTRUCTIONS.md`
- `TEAM_GUIDE.md`
- `PLAYBOOK.md`

That is normal. But if you are writing documentation for other people, it helps to separate team-specific naming from official behavior. Otherwise readers walk away thinking the naming itself is standardized across tools when it is not.

## 6. If you need a practical migration map, use three layers

Suppose you already have a project instruction set and want to support Codex, Claude Code, and Cursor without turning the repo into a mess. The most practical model is a three-layer split.

### 6.1 Layer one: shared repo defaults

Put default repo-wide rules into each tool's main project layer:

- Codex: `AGENTS.md`
- Claude Code: `CLAUDE.md`
- Cursor: `.cursor/rules/*.mdc`

This layer is where things like these belong:

- repo structure
- build / test / lint commands
- safety boundaries
- commit expectations
- directory-level constraints

### 6.2 Layer two: task-specific SOPs

Put specialized workflows into skills.

This is the right layer for:

- blog publishing workflows
- release checklists
- framework-specific SOPs
- review procedures
- script usage instructions

### 6.3 Layer three: personal preferences

Put preferences that should not be forced on the whole team into user-level config:

- Codex: `~/.codex/AGENTS.md`
- Claude Code: `~/.claude/CLAUDE.md`
- Cursor: User Rules / Settings

Once you split things that way, the overall management model gets much cleaner:

- default rules are separate from specialized workflows
- shared team instructions are separate from personal habits
- project entry points are separate from capability extensions

## Conclusion

If you only remember one sentence, make it this one: **Codex and Claude Code both have a very explicit "main project instruction file" concept, while Cursor is more naturally centered on a project rules system.**

That is why a skill should not be asked to carry your whole repo policy, and why `AGENTS.md`, `CLAUDE.md`, and Cursor Rules are not just three names for the same thing. They solve closely related problems, but they load differently and they sit at different layers of the tool.

If you need one workflow to span all three, do not start by forcing everything into one shared file. Start by separating default project rules, task-specific SOPs, and user-level preferences. The mapping becomes much easier after that.

## References

- <a href="https://developers.openai.com/codex/guides/agents-md" rel="nofollow">OpenAI Developers: Custom instructions with AGENTS.md</a>
- <a href="https://developers.openai.com/codex/skills" rel="nofollow">OpenAI Developers: Agent Skills</a>
- <a href="https://code.claude.com/docs/en/quickstart" rel="nofollow">Claude Code Docs: Quickstart</a>
- <a href="https://code.claude.com/docs/en/memory" rel="nofollow">Claude Code Docs: How Claude remembers your project</a>
- <a href="https://code.claude.com/docs/en/slash-commands" rel="nofollow">Claude Code Docs: Extend Claude with skills</a>
- <a href="https://code.claude.com/docs/en/permission-modes" rel="nofollow">Claude Code Docs: Choose a permission mode</a>
- <a href="https://cursor.com/docs/rules" rel="nofollow">Cursor Docs: Rules</a>
