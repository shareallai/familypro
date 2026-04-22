---
locale: ja
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go・Plus・Pro比較ガイド：CodexとAPI課金の関係を整理"
headline: ChatGPT Go・Plus・Proとは？CodexとOpenAI APIを一度で理解
description: "2026年4月10日時点の公式情報をもとに、ChatGPT Go/Plus/Pro（Proの$100/$200を含む）の違い、Codexの含まれ方、API課金が別建てである点を整理します。"
summary: ChatGPT Go・Plus・Proのどれを選ぶべきか、CodexとOpenAI APIの関係をどう考えるべきかを、判断しやすい形で短時間で確認できる実践ガイドです。
category: AIサブスク比較
pubDate: 2026-03-31
updatedDate: 2026-04-22
author: Mark
service: General
tags:
  - ChatGPT Go
  - ChatGPT Plus
  - ChatGPT Pro
  - Codex
  - OpenAI API
  - AIサブスク
relatedTranslationKeys:
  - google-ai-plan-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: "ChatGPTプランを月額5.5USDから（公式価格より低い水準）"
  subtitle: "第三者購入ルートを選択可能 · 開通手順が明確 · 購入後サポートあり"
  buttonText: "ChatGPTプランの選択肢を見る"
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

OpenAIの料金体系を初めて見ると、次の4点で止まりやすいです。

- `ChatGPT Go / Plus / Pro` の違いは何か
- `Codex` は別料金の商品なのか
- `OpenAI API` とChatGPTサブスクはどうつながるのか
- Plus/Proを契約すればAPI料金は不要になるのか

このページの目的は1つです。上の4点を混同なく整理し、約10分で自分に合う選び方まで決められるようにすることです。

前提として、本文は **2026-04-10** 時点で確認できるOpenAI公式ページ情報を基準にしています。価格は **USD** で記載し、**参考情報** です。最終的には必ず現在の申込画面と請求画面を優先してください。

## 1. 先に結論：4つの疑問はこの枠組みで解ける

1. `Go / Plus / Pro` は `chatgpt.com` 上の **個人向けChatGPTサブスク階層** で、主な差はモデルアクセス、機能範囲、利用上限です。
2. `Codex` はOpenAIの **AIコーディングエージェント** で、別の「チャット会員」ではありません。
3. `OpenAI API` は `platform.openai.com` 側の **開発者向けインターフェース** です。
4. **ChatGPTサブスク料金にAPI利用料は含まれません。** APIは別会計で従量課金です。

最短で覚えるなら次の2行です。

- ChatGPTサブスクは「ChatGPT内でAIを使うための課金」。
- API課金は「自分のプロダクトや業務フローにAIを組み込むための課金」。

## 2. Go・Plus・Proは何を売っているのか

この3つは別商品ではなく、同じ製品ラインの階層違いです。実務上は「どこまで使えるか」の上限差が本質です。

| プラン | 公式ポジション（要約） | 向いている人 |
| --- | --- | --- |
| Go | Freeより使える低価格拡張。メッセージ、アップロード、画像、メモリ等が拡張 | 予算を抑えつつFreeより実用性を上げたい個人 |
| Plus | 日常ヘビーユーザー向け。高いモデル/ツール上限と高度機能 | 学習、執筆、分析、調査を頻繁に行う個人 |
| Pro | 最上位の上限と優先体験 | 毎日高頻度で使い、上限や速度に敏感なユーザー |

2026-04-10時点で公開ページから確認できる要点は次の通りです。

- `Plus`: **20 USD/月**
- `Pro`: **100 USD/月 と 200 USD/月 の2階層**（機能系統は同じで、主に上限が異なる）
- `Go`: 低価格枠として案内。公開文脈では **米国8 USD/月** の記述がある一方、地域差があるため最終確認は申込画面

この段階で押さえるべきポイントは3つです。

- Go/Plus/Proはいずれも月額課金で、現時点では年払い前払いは案内されていません。
- Proの100/200 USDは主に利用上限の差（公式文脈ではPlus比で概ね5x/20x）。
- "Unlimited" 表記は無条件の完全無制限ではなく、利用規約と不正利用対策の制約を受けます。

## 3. Go・Plus・Proの機能と上限（2026-04-10時点）

OpenAIの上限は調整されることがあります。以下は公式ページで明示されている差分だけを整理した比較です。

| 項目 | Go | Plus | Pro |
| --- | --- | --- | --- |
| 価格（USD） | 低価格枠（表示価格は地域/通貨で変動、最終は申込画面基準） | `20 USD/月` | `100 USD/月` または `200 USD/月`（Plus比で概ね `5x / 20x` 上限） |
| GPT-5.3 メッセージ上限 | 最大 `160件 / 3時間` | 最大 `160件 / 3時間` | GPT-5系は `unlimited*`（不正利用対策の制約あり） |
| Thinking上限 | 入力欄 `+` からThinkingを有効化し、最大 `10件 / 5時間` | GPT-5.4 Thinkingを手動選択で最大 `3000件 / 週` | GPT-5.4 Proを含み、GPT-5系は `unlimited*`（制約あり） |
| Legacy models（例: 4o） | なし | 拡張アクセスあり | あり（上限はさらに高い） |
| Agent mode | なし | あり、`40件 / 月` | あり、`400件 / 月` |
| Sora | なし | あり | あり（通常は優先度/並列上限が高い） |
| Voice | あり（上限クラスはFree相当） | あり（サブスク向け音声上限） | GPT-4o音声が `unlimited*`（制約あり） |
| Codex | 期間限定で利用可能（公式表現: `limited time`） | 含まれる | 含まれる |

`*` の unlimited は「高い実用上限」を意味し、無条件で際限なく使えるという意味ではありません。

誤解されやすい点を3つ補足します。

- Go/Plusで `160件 / 3時間` を使い切ると、ウィンドウが戻るまでmini系へ切り替わります。
- Plusの `3000件 / 週` はThinkingを手動選択した分が対象で、Instantから自動移行されたThinkingは通常この枠に含まれません。
- 製品内に表示されるあなたの上限が本記事と異なる場合は、必ずあなたの画面表示を優先してください。

## 4. CodexとGo・Plus・Proの関係

まず定義です。`Codex` はコーディング作業向けのエージェントで、CLI、IDE、Web、デスクトップでコード理解、編集、実行、連携に使えます。

現時点の公式案内では次の整理です。

- `Plus / Pro / Business / Enterprise / Edu` はCodexを含む
- `Free / Go` も期間限定でCodexにアクセス可能

つまりCodexは完全に別建ての会員商品というより、複数プランにまたがる専門機能レイヤーとして理解する方が正確です。

課金面で重要なのは、Codex CLIには認証経路が2つあることです。

- ChatGPTアカウントでサインイン: ChatGPTプランの上限として消費
- API keyでサインイン: API従量課金として計上

同じCodex利用でも、請求先が異なる理由はここにあります。

## 5. OpenAI APIとは何か。ChatGPTサブスクと何が違うか

`OpenAI API` は開発者向けインターフェースで、チャット会員そのものではありません。用途は、自分のプロダクトや業務フローにモデル機能を組み込むことです。例を挙げると次の通りです。

- 自社サポートBotやナレッジアシスタントの構築
- ワークフロー内での要約、分類、抽出処理
- 製品へのテキスト、画像、音声機能の統合

課金モデルも別です。APIは基本的に従量課金（token、リクエスト、ツール利用など）で計算されます。

2026-04-10時点で見える公式価格を例にすると、

- GPT-5.4 入力: およそ `2.50 USD / 1M tokens`
- GPT-5.4 出力: およそ `15.00 USD / 1M tokens`

モデル更新や地域戦略で価格は変わるため、予算計算は必ず最新の公式価格ページで再計算してください。

## 6. 重要質問：ChatGPTサブスクを買えばAPIは使えるか

結論は明確です。**サブスク料金でAPI利用料は相殺されず、APIクレジットも自動付与されません。**

ヘルプセンターの案内は一貫しています。

- ChatGPT（`chatgpt.com`）とPlatform（`platform.openai.com`）は別請求システム
- ChatGPT側の課金はAPI側へ移行されない
- API利用にはPlatform側で支払い設定を行い、従量で支払う必要がある

同じOpenAIアカウントで、次の2つを同時に運用することは可能です。

- 個人利用: Go / Plus / Pro
- 開発利用: API pay-as-you-go

これはチーム運用でも一般的な構成です。

## 7. 迷ったときは用途基準で選ぶ

買い間違いを減らすには、プラン名より利用シナリオで選ぶ方が安全です。

- 個人チャット中心で軽量利用: `Go` から開始
- 毎日、執筆・分析・学習・調査で使う: まず `Plus`
- 高頻度・長時間・上限感度が高い: `Pro`（通常は `100 USD` から、継続高負荷なら `200 USD`）
- モデルを自製品や自動化へ接続したい: ChatGPT契約有無に関わらず `API` を別途有効化

最後に3行でまとめます。

- `Go / Plus / Pro` は「ChatGPTを使うための選択」。
- `API` は「自分のAI機能を実装するための選択」。
- `Codex` は両者の中間にあり、ChatGPTログイン利用にもAPI key利用にも対応します。

## 8. FAQ

### 1) GoとPlusの実務上の最大差は？

Goは「安く、Freeより使える」を重視した層です。Plusは高い頻度で使う人向けに、上位機能と上限面で余裕が出る層です。

### 2) GoでThinkingは使える？

使えます。入力欄の `+` から有効化でき、公開上限は `10件 / 5時間` です。長い推論を定常的に回すなら、Plus以上の方が運用しやすいです。

### 3) PlusとProはどちらもAgentを使える？

どちらも使えます。公開値ではPlusが `40件 / 月`、Proが `400件 / 月` です。Agentを日常業務で使うほど差が効いてきます。

### 4) Proの100 USDと200 USDは何が違う？

中心は利用上限です。機能の有無を分けるものではなく、同じPro系でどこまで高負荷を許容するかの違いです。

### 5) Proのunlimitedは本当に無制限？

無条件無制限ではありません。公式にも不正利用対策や利用規約の制約が明記されています。

### 6) Go/Plusの主モデル上限を超えるとどうなる？

現在のローリングウィンドウ上限を使い切ると、リセットまでmini系に移行します。日付切り替えで一律リセットされる仕様ではありません。

### 7) Plus/Pro契約中でもAPIは別払い？

はい。ChatGPTサブスクとAPIは別会計で、サブスク料金はAPI利用料に充当されません。

### 8) PlusやProからGoに下げられる？

切り替え可能です。公開案内では当期分の按分返金は基本なく、次回課金サイクルからGoに反映される扱いです。

## References

- [Introducing ChatGPT Go, now available worldwide](https://openai.com/index/introducing-chatgpt-go/)
- [ChatGPT Plans | Free, Go, Plus, Pro, Business, and Enterprise](https://chatgpt.com/pricing)
- [What is ChatGPT Go?](https://help.openai.com/en/articles/11989085-what-is-chatgpt-go)
- [What is ChatGPT Plus?](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- [About ChatGPT Pro plans](https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro)
- [GPT-5.3 and GPT-5.4 in ChatGPT](https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt)
- [ChatGPT agent (availability and monthly limits)](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540)
- [Codex CLI (authentication and plan inclusion)](https://developers.openai.com/codex/cli)
- [Billing settings in ChatGPT vs Platform](https://help.openai.com/en/articles/9039756-billing-settings-in-chatgpt-vs-platform)
- [How can I move my ChatGPT subscription to the API?](https://help.openai.com/en/articles/8156019)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
