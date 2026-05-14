---
locale: zh
translationKey: codex-cursor-claude-code-local-dev-tools-guide
title: Codex、Cursor、Claude Code：智能编程 Agent 本地开发工具与多语言技术栈配置指南
headline: AI Agent 编程，本地工具该怎么配？
description: 面向 Mac 与 Windows 开发者，说明 Codex、Cursor、Claude Code 常用的本地工具配置：先装 rg、fd、jq、gh 等通用 CLI，再按 Python、JavaScript、Java、Go 项目选择版本管理、测试和构建命令，并在 Windows 上固定 PowerShell 或 WSL，减少路径与版本误判，提升本地构建和测试稳定性。
summary: 按 Agent 真实会调用的命令来准备本地环境：搜索、解析配置、运行测试、构建项目，再分别处理 Mac、Windows、WSL 和多语言技术栈的差异。
category: AI 工具教程
pubDate: 2026-05-14
updatedDate: 2026-05-14
author: Mark
service: General
tags:
  - Codex
  - Cursor
  - Claude Code
  - AI Agent
  - Mac
  - 开发工具
relatedTranslationKeys:
  - codex-claude-cursor-instructions-guide
  - openclaw-mac-codex-install-guide
draft: false
---

用 Codex、Cursor、Claude Code 写代码时，本地环境不再只是“给人手动操作”的环境。Agent 会自己搜索文件、读取配置、运行测试、启动服务、检查 Git diff。它能否高效工作，很大程度取决于这些命令是否稳定可用。

本文核对日期为 **2026-05-14**。范围限定在 Mac 与 Windows 本地开发环境，不讨论三款 Agent 的安装和账号配置。原则很简单：常用 CLI 装在本机，版本敏感的语言工具跟项目走。

## 1. 先装通用工具，再补语言栈

Agent 高频调用的是一批小工具，而不是某个庞大的 IDE 插件。建议先准备这些：

| 类型 | 工具 | 用途 |
| --- | --- | --- |
| 搜索与文件发现 | `ripgrep` / `rg`、`fd`、`tree` | 找代码、列文件、避开依赖和构建产物 |
| 配置解析 | `jq`、`yq` | 读取 JSON、YAML、工作流和命令输出 |
| Git 协作 | `gh`、`git-delta` | 查看 PR、CI、diff 和 review 上下文 |
| 脚本入口 | `just`、`make`、`shellcheck`、`shfmt` | 固化项目命令，检查 shell 脚本 |
| 结构化搜索 | `ast-grep` | 按语法结构查找和批量重构 |
| 运行时管理 | `mise`、Volta、SDKMAN!、`uv` | 管理 Node、Python、Java 等版本 |

Mac 上可以用 Homebrew 起步：

```bash
xcode-select --install

brew install git gh ripgrep fd jq yq fzf bat eza tree git-delta hyperfine just shellcheck shfmt ast-grep uv mise
```

Windows 上建议把桌面应用和运行时交给 WinGet，把纯 CLI 小工具交给 Scoop：

```powershell
winget --help
winget install Git.Git GitHub.cli

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop install ripgrep fd jq yq fzf bat eza tree delta hyperfine just shellcheck shfmt ast-grep uv mise
```

项目需要数据库、中间件或隔离运行环境时，再安装 Docker Desktop。不要为了“以后可能用到”把所有语言工具都装成全局默认版本；这样反而更容易让 Agent 跑错解释器、包管理器或 JDK。

## 2. 为什么 `rg` 比 `grep` 更适合 Agent 工作流

`grep` 仍然适合写兼容脚本，但在代码仓库里，`rg` 更接近 Agent 的默认工作方式。

`rg` 默认尊重 `.gitignore`，通常会跳过 `node_modules/`、`dist/`、`.venv/`、`target/` 等目录。它的输出包含文件路径、行号和匹配片段，便于 Agent 继续打开文件、引用上下文、判断影响范围。`rg --files` 还可以快速列出项目内有效文件，比递归 `find` 更适合作为仓库索引入口。

这不是“新工具替代旧工具”的问题，而是搜索范围是否贴近源码。对 Agent 来说，少读无关文件，比多扫全仓更重要。

## 3. Mac 与 Windows 的关键差异

工具装好之后，最常见的问题是 PATH 不一致。你在终端里能运行，不代表桌面版 Cursor、Claude Code 或 Codex 启动的 shell 也能找到同一个命令。

### 3.1 Mac：确认 Homebrew 路径

Apple Silicon Mac 通常使用 `/opt/homebrew`，Intel Mac 通常使用 `/usr/local`。安装 Homebrew 后，确认 shell 初始化文件里有对应路径：

```bash
# Apple Silicon
eval "$(/opt/homebrew/bin/brew shellenv)"

# Intel Mac
eval "$(/usr/local/bin/brew shellenv)"
```

然后检查 Agent 会用到的命令：

```bash
which rg fd jq yq gh
rg --version
fd --version
jq --version
yq --version
gh --version
```

如果从 Dock 启动桌面应用，更新 PATH 后建议重启应用。

### 3.2 Windows：先选 PowerShell 还是 WSL

Windows 不是一个命令环境。PowerShell、Git Bash、WSL Ubuntu 各有自己的路径、Node、Python、JDK 和包缓存。

前端、Python、Go、Java 服务端项目如果最终部署到 Linux，通常可以选 WSL 作为主环境：

```powershell
wsl --install
wsl --list --online
```

.NET、Windows 桌面、PowerShell 自动化，或明确依赖 Windows 路径的项目，应坚持原生 PowerShell：

```powershell
where.exe rg
where.exe fd
rg --version
fd --version
jq --version
gh --version
```

不要在同一仓库里一半命令跑在 PowerShell，一半跑在 WSL。更好的做法是在项目规则里写清楚主执行环境。

## 4. 按技术栈补齐项目工具

语言工具的优先级不是“装得越多越好”，而是和项目保持一致。项目有 lockfile、wrapper、toolchain 声明时，Agent 应优先使用项目给出的入口。

### 4.1 Python

新项目可以优先考虑 `uv`，它同时处理 Python 版本、虚拟环境、依赖安装和命令运行：

```bash
brew install uv
uv python install 3.12
uv tool install ruff
```

Windows PowerShell 可用官方安装脚本：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uv python install 3.12
uv tool install ruff
```

项目内工具应进入项目依赖，而不是只放在全局环境：

```bash
uv add --dev pytest ruff
uv run pytest
uv run ruff check .
uv run ruff format .
```

如果项目已使用 `mypy`、`pyright` 或 `basedpyright`，沿用项目选择。给 Agent 的规则可以简单写成：Python 命令通过 `uv run` 执行，测试用 `uv run pytest`。

### 4.2 JavaScript / TypeScript

JS/TS 项目最重要的是 Node 版本和包管理器。看到 `pnpm-lock.yaml` 就不要跑 `npm install`；`package.json` 里有 `packageManager` 时，优先遵守它。

Mac：

```bash
brew install node mise
node --version
```

Windows 原生环境：

```powershell
winget install OpenJS.NodeJS.LTS
node --version
corepack --version
corepack enable
```

如果项目跑在 WSL，就在 WSL 里安装 Node，不要混用 Windows 的 `node.exe`。前端项目还应把类型检查、lint、测试和浏览器测试固化成项目脚本，例如 `pnpm exec tsc --noEmit`、`pnpm exec eslint .`、`pnpm exec vitest run`、`pnpm exec playwright test`。

### 4.3 Java

Java 先看 JDK 版本，再看 Maven/Gradle。不要只安装“最新 JDK”，应根据 `pom.xml`、`build.gradle`、`.sdkmanrc`、`.java-version` 或 CI 配置选择版本。

以 JDK 21 为例：

```bash
brew install --cask temurin@21
java -version
```

Windows：

```powershell
winget search Temurin
winget install EclipseAdoptium.Temurin.21.JDK
java -version
```

构建工具优先使用项目 wrapper：

```bash
./mvnw test
./gradlew test
```

只有项目没有 wrapper 时，再考虑本机的 `mvn` 或 `gradle`。这能减少本机版本和 CI 版本不一致带来的误判。

### 4.4 Go

Go 的基础工具链已经覆盖格式化、测试和静态检查。Mac：

```bash
brew install go
go version
```

Windows：

```powershell
winget install GoLang.Go
go version
```

再补常用工具：

```bash
go install golang.org/x/tools/gopls@latest
brew install golangci-lint delve
```

常用收口命令是：

```bash
gofmt -w .
go test ./...
go vet ./...
golangci-lint run
```

`golangci-lint` 对版本比较敏感，团队项目最好把版本固定在 CI、Makefile、justfile 或工具配置里。

## 5. 把环境约定写进项目规则

装工具只能解决“有没有命令”的问题。要减少误操作，还需要告诉 Agent 本项目应该怎么运行。

如果你还没整理过，可以先读这篇站内文章：[AGENTS.md、CLAUDE.md、.cursor/rules 到底是什么关系？](/zh/blog/codex-claude-cursor-instructions-guide/)

项目规则里至少写清楚这些内容：

```md
- Prefer `rg` and `rg --files` for search.
- On Windows, run project commands in PowerShell unless this file explicitly says WSL.
- Do not edit generated directories such as `dist/`, `.astro/`, `target/`, `build/`, `.venv/`, or `node_modules/`.
- JavaScript commands must use the package manager indicated by the lockfile.
- Python commands must use `uv run` when `uv.lock` exists.
- Java commands should prefer `./mvnw` or `./gradlew` when wrappers exist.
- Go checks should run `go test ./...` before finishing.
- Run the project build command before reporting success.
```

这些规则比口头提醒可靠。下一次新会话开始时，Agent 不需要重新猜你的包管理器、测试命令和禁改目录。

## 6. 结语

AI Agent 编程不意味着本地环境不重要。恰恰相反，Agent 越深入参与修改、测试和构建，本地命令越需要稳定。

先把 `rg`、`fd`、`jq`、`yq`、`gh`、语言运行时、测试命令和项目规则打通。Mac 用户处理好 Homebrew 与 PATH；Windows 用户先固定 PowerShell 或 WSL。做到这些，比堆更多插件更有用。

## 官方参考

- <a href="https://brew.sh/" rel="nofollow">Homebrew</a>
- <a href="https://learn.microsoft.com/en-us/windows/package-manager/winget/" rel="nofollow">Microsoft Learn: WinGet</a>
- <a href="https://scoop.sh/" rel="nofollow">Scoop</a>
- <a href="https://learn.microsoft.com/en-us/windows/wsl/install" rel="nofollow">Microsoft Learn: Install WSL</a>
- <a href="https://learn.microsoft.com/en-us/windows/terminal/" rel="nofollow">Microsoft Learn: Windows Terminal</a>
- <a href="https://github.com/BurntSushi/ripgrep" rel="nofollow">ripgrep GitHub 仓库</a>
- <a href="https://github.com/sharkdp/fd" rel="nofollow">fd GitHub 仓库</a>
- <a href="https://jqlang.org/download/" rel="nofollow">jq Download</a>
- <a href="https://github.com/mikefarah/yq" rel="nofollow">yq GitHub 仓库</a>
- <a href="https://cli.github.com/manual/" rel="nofollow">GitHub CLI Manual</a>
- <a href="https://github.com/casey/just" rel="nofollow">just GitHub 仓库</a>
- <a href="https://www.shellcheck.net/" rel="nofollow">ShellCheck</a>
- <a href="https://github.com/mvdan/sh" rel="nofollow">shfmt / mvdan-sh</a>
- <a href="https://ast-grep.github.io/guide/quick-start.html" rel="nofollow">ast-grep Quick Start</a>
- <a href="https://mise.jdx.dev/installing-mise.html" rel="nofollow">mise Installation</a>
- <a href="https://docs.astral.sh/uv/getting-started/installation/" rel="nofollow">uv Installation</a>
- <a href="https://docs.astral.sh/ruff/installation/" rel="nofollow">Ruff Installation</a>
- <a href="https://github.com/microsoft/pyright/blob/main/docs/installation.md" rel="nofollow">Pyright Installation</a>
- <a href="https://nodejs.org/api/corepack.html" rel="nofollow">Node.js Corepack</a>
- <a href="https://playwright.dev/docs/intro" rel="nofollow">Playwright Installation</a>
- <a href="https://sdkman.io/install/" rel="nofollow">SDKMAN! Installation</a>
- <a href="https://adoptium.net/temurin/" rel="nofollow">Eclipse Temurin</a>
- <a href="https://learn.microsoft.com/en-us/windows/dev-environment/java/" rel="nofollow">Microsoft Learn: Get started with Java on Windows</a>
- <a href="https://go.dev/doc/install/" rel="nofollow">Go: Download and install</a>
- <a href="https://go.dev/gopls/" rel="nofollow">gopls</a>
- <a href="https://golangci-lint.run/docs/welcome/install/local/" rel="nofollow">golangci-lint Local Installation</a>
- <a href="https://docs.docker.com/desktop/setup/install/mac-install/" rel="nofollow">Docker Desktop for Mac</a>
- <a href="https://docs.docker.com/desktop/setup/install/windows-install/" rel="nofollow">Docker Desktop for Windows</a>
