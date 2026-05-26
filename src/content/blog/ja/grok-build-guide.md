---
locale: ja
translationKey: grok-build-guide
title: "Grok Build 2026実務ガイド：料金プラン、対応環境、モデル、利用上限の整理"
headline: Grok Build導入ガイド：CLI/TUI運用、主要コマンド、プラン選定
description: xAIの2026年5月時点の公式発表とドキュメントを基に、Grok Buildの位置づけ、利用可能プラン、導入手順、対応環境、モデル、利用上限と料金、主要コマンドを実務目線で整理します。
summary: 既存の開発運用にGrok Buildを組み込むべきかを判断したいチーム向けに、契約条件、初期導入、日常運用で押さえるべき論点をまとめました。
category: AI開発ツール
pubDate: 2026-05-26
updatedDate: 2026-05-26
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - AI Coding Agent
  - CLI
  - 開発ワークフロー
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Buildの公開後、開発チームが最初に確認すべき論点は明確です。Codex CLI、Claude Code、Cursor Agentと比べて何が違うのか、そして既存の開発フローに今入れるべきかどうかです。

本記事は、判断に必要な実務情報に絞って整理します。**Grok Buildの定義、利用可能な契約、導入手順、CLI/TUIとGUIの関係、利用可能モデル、上限の読み方、実運用で使うコマンド** を順に確認します。

まず、日付の混同を避けるために公開タイムラインを押さえます。

- `2026-05-14`：xAI Developer Release NotesでGrok Buildがbetaとして掲載。
- `2026-05-19`：`grok-build-0.1` が早期アクセスのコーディングモデルとして掲載。
- `2026-05-25`：xAI News「Introducing Grok Build」で、対象契約向けに早期betaを公開。

## 1. Grok Buildとは何か

xAI公式ドキュメント上でのGrok Buildは、端末環境で動作するコーディングエージェントです。主な利用形態は次の3つです。

- マウス操作対応のフルスクリーンTUI
- スクリプト向けheadless CLI（`grok -p ...`）
- 外部アプリ連携向けACP（`grok agent stdio`）

実体としては、単なるチャット+コマンド実行ではありません。計画、コード変更、ファイル操作、ツール呼び出し、並列サブエージェントを一連の実行系として扱える点が中核です。

## 2. どのプランでGrok Buildを使えるか

`2026-05-25` の公式発表時点で、早期betaの対象として明示されている個人契約は次の2系統です。

- `SuperGrok`
- `X Premium Plus`

加えて、xAIの料金ページとチーム管理ドキュメントでは、法人運用でのライセンス割当導線も確認できます。

- `SuperGrok`（business license）
- `SuperGrok Heavy`（business license）

個人利用での確認手順は次の順序が安全です。

1. 契約が `SuperGrok` または `X Premium Plus` に該当するか確認。
2. CLIをインストールし、ログイン後に利用可否を検証。
3. 組織契約の場合は、管理者がGrok Businessでライセンスを割り当て。

## 3. 導入手順（約5分）

### 3.1 インストール

macOS / Linux / WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows（PowerShell）:

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 初回認証

```bash
grok
```

初回起動は通常ブラウザ認証です。ブラウザが使えない環境（リモートホスト、コンテナ等）ではAPIキー運用が可能です。

```bash
export XAI_API_KEY="xai-..."
grok
```

### 3.3 リポジトリで開始

```bash
cd your-project
grok
```

初回に有効なプロンプト例:

- 「このリポジトリの構造と起動経路を整理して」
- 「先にplanを作成し、まだ編集しないで」
- 「まずリスクを列挙し、その後で修正案を示して」

### 3.4 Headless運用と自動化

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

IDE連携や社内オーケストレーション連携ではACPを利用します。

```bash
grok agent stdio
```

## 4. CLIとGUIに対応しているか。codex.appに近いか

結論として、**Grok Buildは現時点でCLI/TUI中心の製品であり、独立したデスクトップGUIアプリではありません。**

- CLI: 対応しており、主入口。
- 画面操作: 対応しているが、端末内フルスクリーンTUI。
- codex.app型のGUI体験: ACP経由で外部アプリ側に実装可能だが、標準形態ではない。

したがって、GUI中心の運用を前提に導入するより、端末中心のエージェント基盤として評価する方が実態に合います。

## 5. 対応プラットフォーム

Getting Startedで明示されている導入環境は次の通りです。

- `macOS`
- `Linux`
- `WSL`
- `Windows PowerShell`

製品ライン全体としては、Grokの提供面は以下にも及びます。

- `Web`
- `iOS`
- `Android`
- `X`

ただし、Grok Buildそのものはあくまで端末向けコーディングエージェントという位置づけです。

## 6. 利用可能モデル

### 6.1 コアとなるコーディングモデル

Buildドキュメント上で明示されている主モデルは次です。

- `grok-build-0.1`（early access）

同モデルはxAI APIからも直接利用できるため、自社エージェントループへの組み込みにも使えます。

### 6.2 モデル切替とカスタム定義

セッション中は `/model <name>` で切替可能です。加えて設定ファイルではデフォルトモデルや `base_url` を使ったカスタムモデル定義も行えます。

実運用上は、表示されるモデル範囲がアカウント権限と設定ソースに依存します。

## 7. 利用上限の読み方

ここは誤解が起きやすいため、サブスク上限とAPI課金を分離して判断する必要があります。

### 7.1 サブスク側（SuperGrok / Premium+）

公開情報は、依然として「固定配分表」より「層別表現」が中心です。代表的には次の文言です。

- `higher rate limits`
- `enhanced quotas`
- `much higher rate limits`（Heavy）

つまり、階層差は確認できる一方、Grok Buildの1日固定回数は安定した公開表としては提示されていません。

実務上の評価手順:

1. `/usage` でtoken/credit消費を観測。
2. 実タスクで1週間程度の負荷試験を実施。
3. 制限到達頻度が高い場合にのみ上位プランを検討。

### 7.2 API側（従量課金）

`2026-05-15` 時点のxAIドキュメント口径では次の通りです。

- `grok-build-0.1`: input `$1.00 / 1M tokens`、cached input `$0.20 / 1M`、output `$2.00 / 1M`
- ツール呼び出しは別課金（例: `web_search`、`x_search`、`code_execution` は通常 `$5 / 1k calls`）

**データ日付：2026-05-26。価格情報は参考値であり、最終判断は常に公式課金ページの最新表示を優先してください。**

## 8. 実運用で使用頻度の高い内蔵コマンド

日常運用で使用頻度が高いのは次のコマンド群です。

- `/model <name>`：モデル切替
- `/plan`：現在の実行計画を確認
- `/usage`：token / credit使用量を確認
- `/context`：コンテキスト消費を確認
- `/new`：新規セッション開始
- `/resume`：過去セッション再開
- `/rewind`：会話状態を巻き戻し
- `/compact`：履歴を圧縮
- `/feedback`：セッションからフィードバック送信
- `/plugins`：プラグイン管理
- `/skills`：スキル管理
- `/mcps`：MCP連携管理

あわせて、shell側でよく使うコマンド:

- `/memory`
- `/imagine`
- `/imagine-video`

## 9. Grokの高頻度機能と適合シナリオ

### 9.1 Realtime Search（Web + X）

Web検索とX検索を同一回答フローに統合できる点は、鮮度要件の高い調査タスクで有効です。

### 9.2 エージェント型コーディング

単純なQ&Aに留まらず、権限付与後はリポジトリ探索、計画生成、変更実行、diff説明まで一連で扱えます。

### 9.3 並列サブエージェント

大規模タスクを並列探索に分解できるため、障害調査や多モジュール分析で効果が出やすい設計です。

### 9.4 Skills / Plugins / MCP拡張

ローカル規約・スキル群を読み取り、プラグインやMCPで外部能力を接続できるため、既存エージェント基盤からの移行も進めやすい構造です。

### 9.5 同一製品ラインでのマルチモーダル活用

画像・動画の生成/理解系を同一ラインで扱えるため、ドキュメント、デモ、コンテンツ制作系ワークフローとも接続しやすくなっています。

## 10. 結論：今すぐ導入が向くケースと、様子見が妥当なケース

即導入に向くケース:

- 端末中心で開発運用している
- 計画・編集・ツール実行を単一入口に集約したい
- すでに `SuperGrok` または `X Premium Plus` 権益を保有している

様子見が妥当なケース:

- 独立デスクトップGUIを主軸にしている
- 固定配分の明示性を重視している
- 他エージェント基盤への依存度が高く切替コストが大きい

要点を一言でまとめると、**Grok Buildは実務投入可能な水準に達している一方、最適適合は「端末優先・自動化優先」の開発環境です。**

## References

- [Introducing Grok Build (xAI News, 2026-05-25)](https://x.ai/news/grok-build-cli)
- [Grok Build Getting Started (xAI Docs)](https://docs.x.ai/build/overview)
- [Modes and Commands (xAI Docs)](https://docs.x.ai/build/modes-and-commands)
- [Headless and Scripting (xAI Docs)](https://docs.x.ai/build/cli/headless-scripting)
- [Skills, Plugins, and Marketplaces (xAI Docs)](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [Enterprise Deployments (xAI Docs)](https://docs.x.ai/build/enterprise)
- [xAI Developer Release Notes (May 2026 entries)](https://docs.x.ai/developers/release-notes)
- [xAI Pricing (Grok Plans)](https://x.ai/pricing)
- [xAI API Pricing](https://docs.x.ai/developers/pricing)
- [Manage Licenses and Users (Grok Business)](https://docs.x.ai/grok/management)
