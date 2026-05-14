---
locale: en
translationKey: codex-cursor-claude-code-local-dev-tools-guide
title: "Local Dev Tools for Codex, Cursor, and Claude Code"
headline: "How to set up local tools for AI coding agents"
description: "Set up Mac and Windows for agent coding with rg, fd, jq, gh, PowerShell or WSL, and project-aligned Python, Node, Java, and Go tools."
summary: "A concise local setup guide for developers using Codex, Cursor, or Claude Code: search tools, config parsers, test commands, build tools, and OS-specific choices."
category: AI Tooling
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
  - Windows
  - Developer Tools
relatedTranslationKeys:
  - codex-claude-cursor-instructions-guide
  - openclaw-mac-codex-install-guide
draft: false
---

When Codex, Cursor, or Claude Code edits a repository, the model is only part of the system. The agent still has to search files, inspect config, run tests, start local services, and read Git diffs. If those commands are missing or inconsistent, the agent works with a distorted view of the project.

This guide was checked on **May 14, 2026**. It focuses on local developer machines on Mac and Windows. The rule of thumb is simple: install common CLI tools on the machine, but keep language versions and build commands aligned with each project.

## 1. Install the shared tools first

Most coding agents benefit from a small, predictable CLI base before any language-specific tooling.

| Area | Tools | Why they matter |
| --- | --- | --- |
| Search and file discovery | `ripgrep` / `rg`, `fd`, `tree` | Find code and list project files without crawling dependency folders |
| Config parsing | `jq`, `yq` | Read JSON, YAML, workflow files, and structured command output |
| Git workflow | `gh`, `git-delta` | Inspect PRs, CI, review context, and diffs |
| Task entry points | `just`, `make`, `shellcheck`, `shfmt` | Standardize commands and check shell scripts |
| Structural search | `ast-grep` | Search and rewrite code by syntax shape rather than plain text |
| Runtime management | `mise`, Volta, SDKMAN!, `uv` | Keep Node, Python, Java, and related tools reproducible |

On Mac, Homebrew is the most direct starting point:

```bash
xcode-select --install

brew install git gh ripgrep fd jq yq fzf bat eza tree git-delta hyperfine just shellcheck shfmt ast-grep uv mise
```

On Windows, use WinGet for desktop apps and runtimes, and Scoop for small CLI tools:

```powershell
winget --help
winget install Git.Git GitHub.cli

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop install ripgrep fd jq yq fzf bat eza tree delta hyperfine just shellcheck shfmt ast-grep uv mise
```

Install Docker Desktop only when the project needs containers, databases, queues, or isolated services. Installing every language runtime globally is usually worse than installing less: it gives the agent more ways to run the wrong version.

## 2. Why agents usually prefer `rg` over `grep`

`grep` is still useful for portable shell scripts. In a codebase, though, `rg` is usually the better default for an agent.

`rg` respects `.gitignore`, so it normally skips directories such as `node_modules/`, `dist/`, `.venv/`, and `target/`. Its output includes file paths, line numbers, and matched snippets, which gives the agent a clean next step. `rg --files` is also a practical repository index because it lists source files while honoring ignore rules.

The point is not that `grep` is obsolete. The point is that agent search should stay close to the files a developer would actually review.

## 3. Handle Mac and Windows differently

After installation, PATH is the first thing to verify. A command working in your terminal does not always mean a desktop agent launched from the OS can see the same command.

### 3.1 Mac: verify the Homebrew path

Apple Silicon Macs usually use `/opt/homebrew`; Intel Macs usually use `/usr/local`. Make sure the right `brew shellenv` line is loaded by your shell:

```bash
# Apple Silicon
eval "$(/opt/homebrew/bin/brew shellenv)"

# Intel Mac
eval "$(/usr/local/bin/brew shellenv)"
```

Then check the commands the agent is likely to call:

```bash
which rg fd jq yq gh
rg --version
fd --version
jq --version
yq --version
gh --version
```

If you changed PATH and launch the agent from the Dock or app launcher, restart the app before debugging further.

### 3.2 Windows: choose PowerShell or WSL

Windows is not one command environment. PowerShell, Git Bash, and WSL each have their own PATH, Node, Python, JDK, and package cache.

For frontend, Python, Go, and Java services that deploy to Linux, WSL is often the cleaner primary environment:

```powershell
wsl --install
wsl --list --online
```

For .NET, Windows desktop work, PowerShell automation, or repositories that depend on Windows paths, keep commands in native PowerShell:

```powershell
where.exe rg
where.exe fd
rg --version
fd --version
jq --version
gh --version
```

Avoid mixing PowerShell and WSL inside one repo unless the project explicitly documents that split. Write the intended environment into the project rules.

## 4. Add language tools by project

Language tooling should follow the repository, not personal habit. If the project has a lockfile, wrapper, toolchain file, or CI command, use that as the agent's default entry point.

### 4.1 Python

For new projects, `uv` is a good baseline because it can manage Python versions, virtual environments, dependencies, and command execution:

```bash
brew install uv
uv python install 3.12
uv tool install ruff
```

On Windows PowerShell:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uv python install 3.12
uv tool install ruff
```

Keep test and lint tools in the project when possible:

```bash
uv add --dev pytest ruff
uv run pytest
uv run ruff check .
uv run ruff format .
```

If the repo already uses `mypy`, `pyright`, or `basedpyright`, keep that choice. A useful project rule is: run Python commands through `uv run`, and run tests with `uv run pytest`.

### 4.2 JavaScript and TypeScript

The important choices are Node version and package manager. If the repo has `pnpm-lock.yaml`, do not run `npm install`. If `package.json` declares `packageManager`, follow it.

Mac:

```bash
brew install node mise
node --version
```

Windows:

```powershell
winget install OpenJS.NodeJS.LTS
node --version
corepack --version
corepack enable
```

If the project runs in WSL, install Node inside WSL instead of relying on Windows `node.exe`. Frontend repositories should expose clear scripts or commands for type checking, linting, tests, and browser checks, such as `pnpm exec tsc --noEmit`, `pnpm exec eslint .`, `pnpm exec vitest run`, and `pnpm exec playwright test`.

### 4.3 Java

For Java, check the JDK version before installing anything. Look at `pom.xml`, `build.gradle`, `.sdkmanrc`, `.java-version`, or CI configuration.

Example with JDK 21:

```bash
brew install --cask temurin@21
java -version
```

Windows:

```powershell
winget search Temurin
winget install EclipseAdoptium.Temurin.21.JDK
java -version
```

Prefer project wrappers:

```bash
./mvnw test
./gradlew test
```

Only fall back to local `mvn` or `gradle` when the repo does not provide a wrapper. That keeps local behavior closer to CI.

### 4.4 Go

Go already ships strong defaults for formatting, testing, and basic checks.

Mac:

```bash
brew install go
go version
```

Windows:

```powershell
winget install GoLang.Go
go version
```

Add common development tools:

```bash
go install golang.org/x/tools/gopls@latest
brew install golangci-lint delve
```

A typical verification path is:

```bash
gofmt -w .
go test ./...
go vet ./...
golangci-lint run
```

Pin `golangci-lint` in CI, a Makefile, a justfile, or a tool config when the team needs consistent results.

## 5. Put the environment contract in project rules

Tools only answer whether a command exists. Project rules tell the agent which command is correct.

If you have not organized those files yet, see the related guide: [AGENTS.md, CLAUDE.md, and Cursor Rules, explained](/en/blog/codex-claude-cursor-instructions-guide/)

A compact rules block is often enough:

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

This removes guesswork from later agent sessions. The agent does not need to infer your package manager, test command, or forbidden output directories from scratch.

## 6. Closing note

Agent coding makes local tools more important, not less. The model can plan edits, but the local environment proves whether those edits build, test, and fit the repository.

Set up `rg`, `fd`, `jq`, `yq`, `gh`, the right language runtime, and the project verification commands first. On Mac, make PATH predictable. On Windows, decide whether PowerShell or WSL is the primary execution environment. That foundation matters more than adding another editor plugin.

## References

- <a href="https://brew.sh/" rel="nofollow">Homebrew</a>
- <a href="https://learn.microsoft.com/en-us/windows/package-manager/winget/" rel="nofollow">Microsoft Learn: WinGet</a>
- <a href="https://scoop.sh/" rel="nofollow">Scoop</a>
- <a href="https://learn.microsoft.com/en-us/windows/wsl/install" rel="nofollow">Microsoft Learn: Install WSL</a>
- <a href="https://learn.microsoft.com/en-us/windows/terminal/" rel="nofollow">Microsoft Learn: Windows Terminal</a>
- <a href="https://github.com/BurntSushi/ripgrep" rel="nofollow">ripgrep GitHub repository</a>
- <a href="https://github.com/sharkdp/fd" rel="nofollow">fd GitHub repository</a>
- <a href="https://jqlang.org/download/" rel="nofollow">jq Download</a>
- <a href="https://github.com/mikefarah/yq" rel="nofollow">yq GitHub repository</a>
- <a href="https://cli.github.com/manual/" rel="nofollow">GitHub CLI Manual</a>
- <a href="https://github.com/casey/just" rel="nofollow">just GitHub repository</a>
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
