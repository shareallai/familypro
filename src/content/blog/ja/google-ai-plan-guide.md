---
locale: ja
translationKey: google-ai-plan-guide
title: "Google AI Plus・Pro・Ultra完全比較：価格・上限・最適プランの選び方ガイド"
headline: Google AI Plus・Pro・Ultraの違いを実務目線で整理
description: "2026年4月21日時点で確認できるGoogle公式情報を基に、Google AI Plus・Pro・Ultraの価格、公開上限、NotebookLMやFlowなど主要機能の違いを比較し、どの用途にどのプランが合うかを判断しやすく整理します。"
summary: Google AI Plus・Pro・Ultraを、料金、AI credits、NotebookLMやGeminiの上限、実際の利用シーンで比較し、無駄なく選ぶための判断軸をまとめました。
category: AIサブスク比較
pubDate: 2026-03-25
updatedDate: 2026-04-22
author: Mark
service: Google AI
tags:
  - Google AI
  - Gemini
  - Google One
  - NotebookLM
  - Flow
  - Jules
  - AIサブスク
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: Google AIプランをより低コストで開始
  subtitle: 第三者購入ルートを選択可能 · 価格は変動する場合あり · 購入前に条件を確認
  buttonText: Google AIプランの選択肢を見る
  buttonLink: https://familypro.io/en/products/gemini?invite=7Dfd94eb
draft: false
---

GoogleのAIプランを調べ始めると、ほとんどの人が `Google AI Plus`、`Google AI Pro`、`Google AI Ultra` の3つで止まります。

難しいのは、差分が1か所にまとまっていないことです。`Gemini app`、`NotebookLM`、`Flow`、`Whisk` のような製品差に加え、`AI credits`、Google Oneストレージ、開発者向け特典、地域制限まで絡むため、単純な「上位プランほど良い」では判断しづらくなります。

**2026年4月21日** 時点で、個人向けGoogle AIプランの主軸はこの3階層です。比較で失敗しないために、次の3層に分けて見るのが実用的です。

- どの **AI製品** が使えるか
- どの **公開ハード上限** があるか（NotebookLM件数、AI creditsなど）
- `more access` のような **相対表現の上限** をどう読むか

この記事では、公式ページをなぞるだけでなく、実際の購入判断につながるポイントに絞って整理します。

- Plus、Pro、Ultraで何が使えるのか
- 数字で公開されている上限と、公開されていない上限は何か
- どの利用者がどのプランを選ぶべきか

価格は **米国公式価格（USD）** を基準に記載します。国・地域・キャンペーンによって表示が変わるため、購入前は必ず自分のGoogle One決済画面で再確認してください。

## 1. 先に結論: 多くの人は Plus と Pro の比較で足りる

- **Google AI Plus**: まずGoogle AI一式を使い始めたい人向け。GeminiとNotebookLMを中心に、画像・動画生成は時々使う想定。
- **Google AI Pro**: 日常業務で高頻度に使う人向け。Gemini、NotebookLM、Flow、開発系機能をしっかり回す層。
- **Google AI Ultra**: 高負荷の制作・開発・エージェント運用向け。最上位機能と高い上限が必要な層。

米国公式価格は次のとおりです。

- `Google AI Plus`: **$7.99/月**
- `Google AI Pro`: **$19.99/月**
- `Google AI Ultra`: **$249.99/月**

Google Oneストレージと月次AI creditsは次の配分です。

- `Plus`: **200GB**、**200 AI credits/月**
- `Pro`: **5TB**、**1,000 AI credits/月**
- `Ultra`: **30TB**、**25,000 AI credits/月**

最短で選ぶならこの3行で十分です。

- まず低コストで始める: `Plus`
- 毎日しっかり使う前提: `Pro`
- `Project Mariner / Project Genie / 大量動画生成` が明確に必要: `Ultra`

## 2. まず確認すべき差分はこの2つ

### 2.1 料金と基本枠の比較

| プラン | 米国価格 | ストレージ | 月次 AI credits | 想定ユーザー |
| --- | --- | --- | --- | --- |
| Google AI Plus | $7.99/月 | 200GB | 200/月 | 個人の導入、軽い制作 |
| Google AI Pro | $19.99/月 | 5TB | 1,000/月 | 業務利用、研究、開発 |
| Google AI Ultra | $249.99/月 | 30TB | 25,000/月 | 高負荷制作、エージェント運用 |

### 2.2 主要AI製品の含有範囲

| AI製品 / サービス | Plus | Pro | Ultra |
| --- | --- | --- | --- |
| Gemini app | あり | あり（上限高め） | あり（最上位上限） |
| NotebookLM | あり（Plus枠） | あり（Pro枠） | あり（Ultra枠） |
| Flow | あり | あり（上限高め） | あり（最上位上限） |
| Whisk | あり | あり（上限高め） | あり（最上位上限） |
| Gemini in Gmail / Workspace | あり（範囲小さめ） | あり（範囲拡大） | あり |
| Search AI Mode / Deep Search | あり | あり | あり |
| Jules | なし | あり | あり（上限高め） |
| Gemini CLI / Code Assist | なし | あり | あり |
| Google Antigravity | なし | あり | あり（上限高め） |
| Gemini in Chrome / Auto browse | なし | あり | あり |
| Project Mariner | なし | なし | あり |
| Project Genie | なし | なし | あり |
| Google Home Premium | なし | Standard | Advanced |
| YouTube Premium（個人） | なし | なし | あり（対応地域のみ） |
| Google Developer Program premium | なし | あり | あり |

ここで重要なのは、**すべてに固定回数の公開数値があるわけではない** という点です。特に `Gemini app`、`Flow`、`Whisk` の一部は相対表現で案内されています。

## 3. 価値判断に効く3つの上限

### 3.1 動画生成をするなら AI credits を最優先で確認

Googleは高コスト機能の一部を `AI credits` ベースで運用しています。公式ヘルプでは、creditsが `Flow`、`Whisk`、`Google Antigravity` で使えると明示されています。

月次配分:

- `Plus`: **200 AI credits/月**
- `Pro`: **1,000 AI credits/月**
- `Ultra`: **25,000 AI credits/月**

公式の理論上限換算（creditsを動画系に使った場合）は次のとおりです。

| モード | Plus | Pro | Ultra |
| --- | --- | --- | --- |
| Whisk `Veo 3 Fast` | 最大約10本 | 最大約50本 | 最大約1,250本 |
| Flow `Veo 2 Fast` | 最大約20本 | 最大約100本 | 最大約2,500本 |
| Flow `Veo 3.1 Fast` | 最大約10本 | 最大約50本 | 最大約2,500本 |
| Flow 高品質モード | 最大約2本 | 最大約10本 | 最大約250本 |
| Video edits | 最大約10回 | 最大約50回 | 最大約1,250回 |

運用で見落としやすいルール:

- creditsは **請求サイクルごとに更新**、**翌月繰り越し不可**
- 追加購入（top-up）は `Pro` / `Ultra` のみ、`Plus`は不可
- 公開top-upは `25USD=2,500`、`50USD=5,000`、`200USD=20,000`
- Google AI未加入の個人Googleアカウントにも、Whisk/Flow向けに **50 daily AI credits** の無料枠がある（毎日更新）

### 3.2 研究用途は NotebookLM 上限が実効値を決める

読解・調査・資料要約が主目的なら、Geminiのチャット回数よりNotebookLM上限のほうが実運用に効きます。

| 指標 | Plus | Pro | Ultra |
| --- | --- | --- | --- |
| Notebooks数 | 200/ユーザー | 500/ユーザー | 500/ユーザー |
| notebookあたり sources | 100 | 300 | 600 |
| Chats | 200/日 | 500/日 | 5,000/日 |
| Audio Overviews | 6/日 | 20/日 | 200/日 |
| Video Overviews | 6/日 | 20/日 | 200/日 |
| Reports / Flashcards / Quizzes | 20/日 | 100/日 | 1,000/日 |
| Deep Research | 3/日 | 20/日 | 200/日 |

この表が示すことは明確です。

- `Plus`: 個人学習や軽い調査には十分
- `Pro`: 長期プロジェクトの知識基盤として使える水準
- `Ultra`: 研究ワークステーションに近い運用を想定

### 3.3 Gemini app は主要な公開上限が出揃ってきた

以前は「more access」中心でしたが、現在の `Gemini Apps limits & upgrades` では `No plan / Plus / Pro / Ultra` の主要枠が公表されています。

ただしGoogle自身が、容量状況・実験運用・製品変更で上限が変わる可能性を明記しています。

**2026年4月21日** 時点で確認できる代表値:

| Gemini app項目 | Basic（Google AIプランなし） | Plus | Pro | Ultra |
| --- | --- | --- | --- | --- |
| Pro 3.1モデル | 基本アクセス（固定回数は未公開） | 30/日 | 100/日 | 500/日 |
| Thinkingモデル | 基本アクセス（1日の上限は変動する場合あり） | 90/日 | 300/日 | 1500/日 |
| Fastモデル | 一般アクセス | 一般アクセス | 一般アクセス | 一般アクセス |
| Context window | 32k | 128k | 1M | 1M |
| Deep Research reports | 5/月 | 12/日 | 20/日 | 120/日 |
| Nano Banana 2 画像生成/編集 | 20/日 | 50/日 | 100/日 | 1000/日 |
| Nano Banana Pro redo | - | 50/日 | 100/日 | 1000/日 |
| 動画生成 | - | 2/日（Veo 3.1 Lite） | 3/日（Veo 3.1 Lite） | 5/日（Veo 3.1 Pro） |
| 音楽生成（30秒トラック） | 10/日 | 20/日 | 50/日 | 100/日 |
| Dynamic view | 25 prompts/日 | 25 prompts/日 | 250 prompts/日 | 250 prompts/日 |
| Canvasのスライド生成 | 20/日 | 20/日 | 無制限 | 無制限 |
| Screen automation | 5 requests/日 | 12 requests/日 | 20 requests/日 | 120 requests/日 |
| Gemini Agent | - | - | - | 200 requests/日（同時3タスク） |
| Deep Think 3.1 | - | - | - | 10/日（192k context window） |

公式注記の要点:

- `1M context window` は約1,500ページの文書、または約30,000行コードに相当
- `Deep Think 3.1` は **192k tokens**
- 上限は将来変更されうる

## 4. 主要製品は何に使うと元が取れるか

### 4.1 Gemini app

Google AI全体の入口です。日常の文章生成、調査、画像・動画生成、推論、コード支援までここから始まります。

### 4.2 NotebookLM

価値は「会話」ではなく、**自分の資料に根拠を持たせて要約・整理できる点** です。学習、調査、企画、資料作成の生産性差が出やすい領域です。

### 4.3 Flow と Whisk

- `Flow`: AI映像制作寄り。継続した映像ワークフロー向け
- `Whisk`: 発想・試作寄り。画像起点の短尺動画化を素早く回したい時に有効

### 4.4 Workspace連携（Gmail / Docs / Meet / Calendar）

単体チャットAIとの差が出るポイントです。普段の業務導線にAIを埋め込みたい人ほど、`Pro`以上の価値が上がります。

### 4.5 Search AI Mode / Deep Search

検索結果の要約ではなく、調査フローとして使う機能です。比較検討や情報整理を短時間で回したい人に向きます。

### 4.6 Jules / Gemini CLI / Gemini Code Assist

コード補完だけでなく、タスク単位で作業を進めたい開発者向けです。開発目的なら `Pro` から現実的な選択肢になります。

### 4.7 Project Mariner / Project Genie

この2つは `Ultra` の判断材料です。

- `Project Mariner`: ブラウザ操作の自動化に寄る実験的機能
- `Project Genie`: text/image-to-world の研究プロトタイプ

日常用途では必須ではありません。必要性を説明できる場合のみ `Ultra` が合理的です。

### 4.8 YouTube Premium / Google Home / Developer Program

`Ultra`の分かりやすい体感価値はYouTube Premiumですが、地域制限があります。開発者なら、`Google Developer Program premium` とCloud credits（Proは$10/月、Ultraは$100/月）も比較軸に入れるべきです。

## 5. どの人がどのプランを選ぶべきか

### 5.1 Google AI Plus が向く人

- まずGoogle AIを体系的に使い始めたい
- GeminiとNotebookLM中心
- 画像/動画はたまに使う
- 月額を抑えたい

一言で言えば、`Plus` は導入の最適解です。

### 5.2 Google AI Pro が向く人

- Geminiをほぼ毎日使う
- NotebookLMを継続運用する
- Flow / Whiskを実務で使う
- CLIやCode Assistなど開発支援が必要
- 5TBストレージも実際に使う

一言で言えば、`Pro` は「体験プラン」ではなく「運用プラン」です。

### 5.3 Google AI Ultra が向く人

- 高頻度で動画・生成ワークフローを回す
- `Gemini Agent`、`Deep Think`、`Project Mariner`、`Project Genie` が必要
- 25,000 creditsや30TBなど高い枠を消化できる

該当しないなら、多くの場合 `Pro` のほうが費用対効果は高くなります。

## 6. 迷ったときの判断ルール

次の順で決めると失敗しにくくなります。

1. 必要なAI製品を先に固定する
2. 自分が当たりやすい上限（creditsかNotebookLMかGemini日次枠か）を特定する
3. `Ultra` 専用機能を本当に使うかを確認する

最短提案:

- まだ使用頻度が読めない: `Plus`
- 高頻度利用が見えている: `Pro`
- Ultra専用機能が明確に必要: `Ultra`

Google AIプランを購入予定で、長期コストを下げたい場合は、第三者プラットフォーム **FamilyPro** の選択肢もあります（Google公式販売ではありません）。

- [FamilyProのGoogle AIプランページ（任意）](https://familypro.io/en/products/gemini?invite=7Dfd94eb)

価格注記（データ日付: **2026-04-21**、参考情報）: 現在この第三者ページでは **Google Gemini AI - Pro** として案内され、見出し価格は **9.9 USD** です。第三者ページの価格やプラン内容は期間・地域・在庫で変動するため、購入時は決済画面の最新表示と保証条件を必ず確認してください。

最後にもう一度。Googleは上限が容量や地域で変動し得ることを明記しています。購入前に自分のGoogle Oneページで最新表示を確認するのが安全です。

## References

This article is based primarily on the following official Google pages (plus one optional purchase link), last checked on **April 21, 2026**:

- [Google AI Plans](https://one.google.com/about/google-ai-plans/)
- [Google AI Plus availability announcement](https://blog.google/products-and-platforms/products/google-one/google-ai-plus-availability/)
- [Google AI Ultra announcement](https://blog.google/products-and-platforms/products/google-one/google-ai-ultra/)
- [Get a Google AI Plus membership](https://support.google.com/googleone/answer/16548195)
- [Use Google AI Plus benefits](https://support.google.com/googleone/answer/16882689)
- [Use Google AI Pro benefits](https://support.google.com/googleone/answer/14534406)
- [Get Google AI Ultra benefits](https://support.google.com/googleone/answer/16286513)
- [Manage your AI credits with Google One](https://support.google.com/googleone/answer/16287445)
- [Gemini Apps limits & upgrades for Google AI subscribers](https://support.google.com/gemini/answer/16275805)
- [Upgrade NotebookLM](https://support.google.com/notebooklm/answer/16213268)
- [Use Gemini 3 Pro and Nano Banana Pro in AI Mode](https://support.google.com/websearch/answer/16011537)
- [Generate and edit images in AI Mode with Nano Banana Pro](https://support.google.com/websearch/answer/16649374)
- [FamilyPro third-party platform: Google AI plans page (optional purchase link)](https://familypro.io/en/products/gemini?invite=7Dfd94eb)
