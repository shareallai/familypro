---
locale: ja
translationKey: grok-build-guide
title: "Grok Build 2026実務ガイド：料金プラン、対応環境、モデル、利用上限の整理"
headline: Grok Build導入ガイド：CLI/TUI運用、主要コマンド、プラン選定
description: "最新の公式文書を基にGrok Buildの統合プラン、Grok 4.7とFast、インストール、CLIとTUI、主要コマンドを整理。週間共有枠とAPIの別料金、長いコンテキストの価格、権限とPlanの違いを説明し、既存の開発環境へ導入する前に確認すべき費用と運用条件をまとめます。"
summary: 既存の開発運用にGrok Buildを組み込むべきかを判断したいチーム向けに、契約条件、初期導入、日常運用で押さえるべき論点をまとめました。
category: AI開発ツール
pubDate: 2026-05-26
updatedDate: 2026-10-15
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

Grok Buildは、コードの理解、計画、編集、検証をターミナルで進めるためのエージェントです。クライアントの機能、アカウントで使えるモデル、サブスクとAPIのどちらに課金されるかを分けて確認しましょう。

**事実・価格確認日：2026-10-15。米ドル価格は参考情報で、適用税は含みません。公式料金表と実際の請求条件を優先してください。** 購入と移行については[新Grok料金体系](../xai-grok-x-subscription-plan-guide/)を参照してください。

## 1. Grok Buildとは何か

xAI公式ドキュメント上でのGrok Buildは、端末環境で動作するコーディングエージェントです。主な利用形態は次の3つです。

- マウス操作対応のフルスクリーンTUI
- スクリプト向けheadless CLI（`grok -p ...`）
- 外部アプリ連携向けACP（`grok agent stdio`）

実体としては、単なるチャット+コマンド実行ではありません。計画、コード変更、ファイル操作、ツール呼び出し、並列サブエージェントを一連の実行系として扱える点が中核です。

## 2. 現在のプランとアクセス条件

新規ユーザーはThe X Subscriptionを比較します。Freeは制限付き、Plusは月$8、Premiumは$30、Superは$100、Ultraは$200です。公式料金ページはPlusの機能にGrok Buildを記載しています。ログイン後にモデルと残りの利用枠を確認し、旧SuperGrokやX Premium+だけを購入条件と考えないでください。

Premium・Super・Ultraの枠はPlus比4倍・15倍・50倍ですが、固定の作業回数ではありません。Grok BotはPremium以上。旧契約は現在継続可能で、Buildを試すためだけにアカウントを統合する必要はありません。チームは席の割り当てと組織ポリシーも確認します。

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

リモート環境でブラウザを開けない場合はデバイスコードを使えます。通常のブラウザログイン後に必ず追加実行する手順ではありません。

```bash
grok login --device-auth
```

### 3.3 リポジトリで開始

```bash
cd your-project
grok inspect
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

## 6. モデルと設定の選び方

### 6.1 Grok 4.7とFast、旧モデル

現在のBuild入門ページは`grok-4.7`を紹介しています。API料金表には旧`grok-build-0.1`も残りますが、これを唯一または標準のモデルとする根拠にはできません。設定例の`grok-build`はクライアント側の設定名で、APIモデルIDと同一とは限りません。

Grok 4.7 Fastは同じモデルを高速な基盤で提供するもので、CursorとBuild内だけで利用し、その製品のプランで課金します。公開xAI APIにはなく、Build無料枠にも含まれません。応答が速くても消費単価は同じではありません。

### 6.2 実際のアカウントと設定を確認

shellの`grok models`で候補を確認し、TUIの`/model <name>`で切り替えます。独自モデルと標準モデルはユーザー設定`~/.grok/config.toml`に置きます。プロジェクトの`.grok/config.toml`は主にMCP、Plugins、権限ルール用で、ユーザー設定すべてを置けるわけではありません。`grok inspect`で読み込み元を確認してください。

## 7. 共有利用枠とAPI・Fast料金

### 7.1 サブスクの消費

有料席ごとに、対応するGrok・Cursorで使う対象の第一者モデルの週間枠を共有します。作業ごとに消費量が違うため、倍率から一日の質問・コード作業・動画本数を保証できません。`/usage`とアカウントの利用画面で通常週を観察します。

Cursorの第三者モデルは初回から別料金。公開Grok APIも週間枠とは別請求で、独自endpointはその提供元の請求条件に従います。

### 7.2 現在のAPI価格とFast

以下は標準グローバルendpointの`grok-4.7`、100万tokensあたりの米ドル価格です。長いコンテキストの閾値に達すると、超過分だけでなくリクエスト全体にその価格が適用されます。

| 入力コンテキスト | 入力 | キャッシュ入力 | 出力 |
| --- | --- | --- | --- |
| 200k tokens未満 | $2.00 | $0.50 | $6.00 |
| 200k tokens以上 | $4.00 | $1.00 | $12.00 |

FastはCursor/Buildのプラン内で短いコンテキストが標準単価の2倍、長いコンテキストが1.5倍です。ツール料金が追加される場合もあり、旧記事の「すべて千回$5」という概算は使えません。**データ日：2026-10-15、参考情報。地域endpoint、モデル、ツールと請求条件で総額は変わります。**

## 8. 日常コマンドと長い作業

`/model <name>`はモデル変更、`/plan [description]`は計画モードへの移行、`/view-plan`は計画の表示です。`/usage`で利用量、`/context`でコンテキストを確認し、`/compact`で圧縮します。`/new`と`/resume`は開始・再開、`/rewind`は以前の会話への移動。`/skills`、`/plugins`、`/mcps`で拡張画面を開きます。

`/goal <objective>`は検証可能な完了条件を持つ長期作業向けです。`/create-workflow`で作成、`/workflow <name>`で実行、`/workflows`で実行状況を表示します。`/loop`は周期的な指示、`/tasks`はバックグラウンド作業の一覧です。必要なときに使い、権限と費用を確認し、本機の`/help`を優先してください。

Planの編集制限と権限モードは別です。承認前に編集できるのは計画ファイルだけですが、bash・MCPはそれぞれの権限に従います。shellの書き込みまで禁止する読み取り専用サンドボックスではありません。

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

## 10. 導入を判断する手順

アカウント、モデル、課金元を確認して、小さな作業を試します。プロジェクトのルールを読み、計画を確認し、diffとテストまたはbuildで結果を検証してください。旧プラン名から権限を推測するより、実測した利用量でプランを選ぶほうが確実です。

GUIが必要なら実際の連携を試し、既存環境があるなら同じ作業の結果・総費用・移行負担を比較します。ツールを呼べることと、成果物が合格することは別です。

## References

- [Grok Build overview](https://docs.x.ai/build/overview)
- [CLI reference](https://docs.x.ai/build/cli/reference)
- [Modes and commands](https://docs.x.ai/build/modes-and-commands)
- [Plan mode](https://docs.x.ai/build/features/plan-mode)
- [Permissions](https://docs.x.ai/build/features/permissions)
- [Headless and scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Settings](https://docs.x.ai/build/settings)
- [Skills, Plugins and Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API pricing and Grok 4.7 Fast](https://docs.x.ai/developers/pricing)
- [The X Subscription pricing](https://x.ai/pricing)
- [Monthly and annual prices](https://docs.x.ai/x-subscription/pricing)
- [Weekly usage limits](https://docs.x.ai/x-subscription/usage-limits)
