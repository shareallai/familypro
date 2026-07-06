---
locale: ja
translationKey: google-ai-plan-guide
title: "Google AI Plus・Pro・Ultra比較：価格・上限・選び方ガイド"
headline: Google AI Plus・Pro・Ultraの違いを2026年版で整理
description: "2026年7月6日時点で確認できるGoogle公式情報を基に、Google AI Plus・Pro・Ultraの価格、ストレージ、利用上限、AI credits、NotebookLMやFlowの違いを比較します。"
summary: Google AI Plus・Pro・Ultraを、料金、ストレージ、compute-based利用枠、AI credits、NotebookLM、Flow、開発者向け機能で比較し、無駄なく選ぶための判断軸をまとめました。
category: AIサブスク比較
pubDate: 2026-03-25
updatedDate: 2026-07-06
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
  title: FamilyProでGoogle AI Proプランを提供
  subtitle: Proプランを選択可能 · 料金は明瞭 · 購入後サポートあり
  buttonText: FamilyProのProプランを見る
  buttonLink: https://familypro.io/en/products/gemini?invite=7Dfd94eb
draft: false
---

GoogleのAIプランを調べ始めると、ほとんどの人が `Google AI Plus`、`Google AI Pro`、`Google AI Ultra` の3つで止まります。

2026年版で特に注意したいのは、古い「日次プロンプト数」や「月次AI credits配分」だけで判断しないことです。GoogleはGemini appの利用枠を **compute-based usage limits** として説明しており、プロンプトの複雑さ、使うモデル/機能、チャットの長さによって消費量が変わります。

**2026年7月6日** 時点では、次の3層に分けて見るのが実用的です。

- どの **AI製品** が使えるか
- どの **公開ハード上限** があるか（NotebookLM、ストレージなど）
- Gemini/Flow/Antigravityのような **動的な利用枠** をどう読むか

この記事では、公式ページをなぞるだけでなく、実際の購入判断につながるポイントに絞って整理します。

- Plus、Pro、Ultraで何が使えるのか
- 数字で公開されている上限と、公開されていない上限は何か
- どの利用者がどのプランを選ぶべきか

価格は **2026年7月6日に確認できた公式ページ** を基準に記載します。国・地域・キャンペーン、アカウントごとの表示によって変わるため、購入前は必ず自分のGoogle One決済画面で再確認してください。

## 1. 先に結論: 多くの人は Plus と Pro の比較で足りる

- **Google AI Plus**: まずGoogle AI一式を使い始めたい人向け。現在の公式ヘルプでは、具体的なPlusプランにより **400GBまたは2TB** のストレージと説明されています。
- **Google AI Pro**: 日常業務で高頻度に使う人向け。現在の公式ヘルプでは、具体的なProプランにより **5TBまたは10TB** のストレージと説明されています。
- **Google AI Ultra**: 高負荷の制作・開発・エージェント運用向け。現在の公式ヘルプでは **20TBまたは30TB** のストレージ、Gemini/AntigravityでPro比 **5倍または20倍** の利用枠と説明されています。

米国価格の参考値は次のとおりです。

- `Google AI Plus`: **約$4.99/月**
- `Google AI Pro`: **$19.99/月**
- `Google AI Ultra`: **20TB / 30TBの複数構成があり、表示価格は地域・アカウントで変わる可能性あり**

Ultraは旧来の単一「$249.99/月 + 30TB」だけで説明すると不正確になりやすいため、必ずチェックアウト画面で確認してください。

最短で選ぶならこの3行で十分です。

- まず低コストで始める: `Plus`
- 毎日しっかり使う前提: `Pro`
- `Deep Think / Gemini Spark / Project Genie / 最高NotebookLM・Antigravity枠` が明確に必要: `Ultra`

## 2. まず確認すべき差分はこの2つ

### 2.1 料金と基本枠の比較

| プラン | 米国価格参考 | ストレージ | 利用枠の考え方 | 想定ユーザー |
| --- | --- | --- | --- | --- |
| Google AI Plus | 約$4.99/月 | 400GBまたは2TB | 標準Gemini利用枠の約2倍、追加AI credits購入不可 | 個人の導入、軽い制作 |
| Google AI Pro | $19.99/月が一般的 | 5TBまたは10TB | 標準Gemini利用枠の約4倍、Flow/Antigravity等でAI credits購入可 | 業務利用、研究、開発 |
| Google AI Ultra | 20TB/30TB構成で変動 | 20TBまたは30TB | Pro比5倍または20倍のGemini/Antigravity利用枠 | 高負荷制作、エージェント運用 |

### 2.2 主要AI製品の含有範囲

| AI製品 / サービス | Plus | Pro | Ultra |
| --- | --- | --- | --- |
| Gemini app | あり（標準比約2倍） | あり（標準比約4倍） | あり（Pro比5倍または20倍） |
| NotebookLM | あり（Plus枠） | あり（Pro枠） | あり（Ultra枠） |
| Flow | あり | あり（上限高め、AI credits購入可） | あり（最上位上限、AI credits購入可） |
| Whisk | あり | あり（上限高め） | あり（最上位上限） |
| Gemini in Gmail / Workspace | あり（範囲小さめ） | あり（範囲拡大） | あり |
| Search AI Mode / Deep Search | あり | あり | あり |
| Jules | なし | あり | あり（上限高め） |
| Gemini CLI / Code Assist | なし | あり | あり |
| Google Antigravity | なし | あり（上限高め、優先トラフィック） | あり（最高上限、優先トラフィック、新モデル優先アクセス） |
| Gemini in Chrome / Auto browse | なし | あり | あり |
| Gemini Spark | なし | なし | あり（主に米国） |
| Project Genie | なし | なし | あり |
| Google Home Premium | なし | Standard | Advanced |
| YouTube Premium | なし | Premium Lite（対応地域のみ） | Individual（対応地域のみ） |
| Google Developer Program premium | なし | あり | あり |

ここで重要なのは、**すべてに固定回数の公開数値があるわけではない** という点です。特に `Gemini app`、`Flow`、`Antigravity` は、固定日次回数より動的な利用枠として見るほうが安全です。

## 3. 価値判断に効く3つの上限

### 3.1 動画生成やエージェント開発では AI credits の新しい扱いを確認

旧版のように Plus / Pro / Ultra の固定月次creditsだけで判断するのは危険です。現在の公式ヘルプでは、各プロダクトに独自の利用上限があり、利用できる枠は機能とGoogle AIプランによって変わると説明されています。

重要なポイント:

- `Pro` と `Ultra` は、`Google Flow`、`Google Antigravity` など対応製品で追加AI creditsを購入できます。
- `Plus` は追加AI creditsを購入できません。
- AI creditsには有効期限がある場合があります。
- ファミリー共有では、対象機能のcreditsが共有プールになることがあります。

動画やAntigravityを高頻度で使うなら、`Plus`よりも追加credits購入ができる `Pro` 以上のほうが運用しやすくなります。


### 3.2 研究用途は NotebookLM 上限が実効値を決める

読解・調査・資料要約が主目的なら、Geminiのチャット回数よりNotebookLM上限のほうが実運用に効きます。

| 指標 | Plus | Pro | Ultra 20TB | Ultra 30TB |
| --- | --- | --- | --- | --- |
| Notebooks数 | 200/ユーザー | 500/ユーザー | 500/ユーザー | 500/ユーザー |
| notebookあたり sources | 100 | 300 | 500 | 600 |
| Chats | 200/日 | 500/日 | 2,500/日 | 5,000/日 |
| Audio Overviews | 6/日 | 20/日 | 100/日 | 200/日 |
| Video Overviews | 6/日 | 20/日 | 100/日 | 200/日 |
| Reports / Flashcards / Quizzes / Mind Maps | 20/日 | 100/日 | 500/日 | 1,000/日 |
| Deep Research | 3/日 | 20/日 | 75/日 | 200/日 |

この表が示すことは明確です。

- `Plus`: 個人学習や軽い調査には十分
- `Pro`: 長期プロジェクトの知識基盤として使える水準
- `Ultra`: 20TBと30TBでNotebookLMの上限が異なるため、研究負荷が高い人はここも確認が必要

### 3.3 Gemini app は旧固定日次表ではなく compute-based として見る

現在の `Gemini Apps limits & upgrades` では、Gemini Appsは **compute-based usage limits** と説明されています。プロンプトの複雑さ、使うモデル/機能、チャットの長さによって消費量が変わり、5時間ごとに更新されます（週上限まで）。

高レベルの比較は次のとおりです。

| プラン | Gemini app利用枠 |
| --- | --- |
| AIプランなし | Standard limits |
| Google AI Plus | Standardの2倍 |
| Google AI Pro | Standardの4倍 |
| Google AI Ultra | 具体プランによりProの5倍または20倍 |

Context windowは次のとおりです。

| プラン | Context window |
| --- | --- |
| AIプランなし | 32k tokens |
| Google AI Plus | 128k tokens |
| Google AI Pro | 1M tokens |
| Google AI Ultra | 1M tokens |

`1M context window` は約1,500ページの文書、または約30,000行コードに相当します。長い資料やコードを扱うなら、この差は旧来の日次回数表より重要です。

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
- 20TB / 30TBのストレージ構成や、NotebookLM / Antigravityの高い枠を消化できる

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

第三者価格注記（データ日付: **2026-07-06**、参考情報）: 第三者ページの価格、期間、地域表示、在庫は変動するため、購入時は決済画面の最新表示と保証条件を必ず確認してください。本文では第三者価格をGoogle公式価格として扱いません。

最後にもう一度。Googleは上限が容量や地域で変動し得ることを明記しています。購入前に自分のGoogle Oneページで最新表示を確認するのが安全です。

## References

This article is based primarily on the following official Google pages (plus one optional purchase link), last checked on **July 6, 2026**:

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
