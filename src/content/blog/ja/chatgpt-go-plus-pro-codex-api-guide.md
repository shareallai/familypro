---
locale: ja
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go・Plus・Pro比較ガイド：CodexとAPI課金の関係を整理"
headline: ChatGPT Go・Plus・Proとは？CodexとOpenAI APIを一度で理解
description: "2026年10月14日に確認した公式情報でChatGPT Go・Plus・Proを比較。GPT-6.1 Sol、Astra、Lunaの用途と利用画面、Codexの利用条件、Proの3つの料金、APIの別課金を解説します。新モデルを通常のChatでも使えると誤解しないためのガイドです。"
summary: "使いたい作業からプランを選び、Work・Codexの新モデルとAPI課金の違いを確認。月額料金だけでは分からない利用条件も整理します。"
category: AIサブスク比較
pubDate: 2026-03-31
updatedDate: 2026-10-14
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
  title: "familyproでChatGPTプランを5.5USDから"
  subtitle: "価格を抑えて導入 · 開通が速い · 購入後サポート"
  buttonText: "familyproで申し込む"
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

ChatGPT Go・Plus・Proを選ぶときは、まず使う場所を確認しましょう。通常のChatで会話する、エージェントにコードや文書を扱わせる、自分の製品にモデルを組み込む。それぞれで利用できるモデルと課金が異なります。

プラン、モデル、API価格の確認日は **2026-10-14** です。米ドル価格は**参考情報**で、実際の支払額は申込画面、地域の税金、請求書で確認してください。段階的な提供、クライアント、ワークスペース設定も利用可否に影響します。

## 1. Go・Plus・Proの料金と選び方

[Work・Codexの公式料金ページ](https://learn.chatgpt.com/docs/pricing)では、個人向けプランが次のように掲載されています。選び方は目安であり、実行できるタスク数の保証ではありません。

| プラン | 月額の参考価格、USD | 検討する場面 |
| --- | --- | --- |
| Free | $0 | まず軽い作業を試したい |
| Go | $8 | 予算を抑え、軽量なCodex作業を使いたい |
| Plus | $20 | コードや文書を扱うエージェント作業を継続的に行う |
| Pro | $100 / $200 / $500 | 頻繁に上限に達する、または明確な速度要件がある |

Proは現在3つの料金帯があります。「$100と$200の2種類で機能は同じ」という説明では不十分です。**Ultrafastへのアクセス**はPro $500に掲載されており、モデルやクライアントにも条件があります。以前の5x/20xをあらゆるタスクに使える換算値と考えず、現在の申込画面とアカウントの上限を比較してください。

通常の会話が目的なら、Chatのモデルとツールを直接確認しましょう。Work・Codexのモデル一覧は、通常のChatのモデル一覧とは異なります。

## 2. 新モデル：GPT-6.1 Sol・GPT-6 Astra・GPT-6 Luna

新モデルを紹介する主な例として、GPT-5.4はもう適切ではありません。[現在のモデル文書](https://learn.chatgpt.com/docs/models)では、次のように用途が分かれます。

| モデル | 向いている作業 | 選ぶ目安 |
| --- | --- | --- |
| GPT-6.1 Sol | コード、アプリ、文書にまたがる複数段階の作業 | 日常的な複雑な作業でまず試す |
| GPT-6 Astra | 継続的な推論と判断が必要な難しい一連の作業 | 難易度に見合う使用量とコストを許容できる場合 |
| GPT-6 Luna | 要約、抽出、分類、範囲を絞ったコード修正 | 明確で反復的な作業を低予算で処理する場合 |

ChatGPTでは、**GPT-6.1 Sol、GPT-6 Sol、GPT-6 LunaはWork・Codexで利用でき、通常のChatでは提供されません**。GPT-6.1 Solの初期提供対象はPlus、Pro、Business、Enterprise、Eduで、Free・Goは含まれません。Enterprise・Eduでは管理者による有効化が必要な場合があります。自分のアカウントとクライアントで確認してください。

OpenAIはGPT-5.5をChatGPT、Work、Codexから **2026年10月14日** に退役させると告知しています。APIはこの退役の対象ではありません。保存済み設定、スクリプト、定期タスクで指定している場合は利用可能なモデルに変更し、APIも同日に終了すると解釈しないでください。

## 3. Codexは含まれる？利用枠はどう見る？

Codexはコードを理解、変更、実行できるエージェントです。現在の公式料金ページではFree・Goも対象に掲載され、単なる期間限定キャンペーンとしては説明されていません。ただし、**Free・GoのGPT-6 Lunaはデスクトップアプリで段階的に提供**されます。PlusではWeb、CLI、IDE拡張など、利用できる入口が増えます。

WorkとCodexは利用枠を共有します。モデル、コンテキスト、推論の強さ、ツールによって消費が変わるため、1メッセージが一定の作業量を意味するわけではありません。以前のChatのメッセージ上限やAPIのtoken単価から、Codexで実行できるタスク数を計算することはできません。

残りの利用枠とリセット時刻はUsage画面で確認します。Plus・Proは上限到達後にChatGPT creditsを購入できますが、API残高とは別です。小さな作業はLuna、複雑な作業はSolやAstraで試してから、上位プランが必要か判断しましょう。

## 4. APIの別課金と新モデルの価格

製品、スクリプト、サービスからAPI keyで呼び出す場合はAPI課金になります。ChatGPTの月額料金にAPI creditsが自動付与されたり、API料金が相殺されたりするわけではありません。CodexでもChatGPTログインはプランの利用枠、API key認証はAPIの請求を使います。

以下は **2026-10-14に確認したStandard・短いコンテキストのテキスト料金**です。単位は100万tokensあたりのUSDで、参考情報です。

| APIモデルID | 入力 | キャッシュ入力 | キャッシュ書き込み | 出力 |
| --- | --- | --- | --- | --- |
| `gpt-6.1-sol` | $2.00 | $0.10 | $2.50 | $10.00 |
| `gpt-6-astra` | $10.00 | $1.00 | $12.50 | $50.00 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.125 | $0.50 |

例えばSolで未キャッシュ入力100万tokens、出力20万tokensを使うと、この単価では **$4** です。キャッシュ書き込み、ツールなどの費用は含みません。長いコンテキストには別単価があり、Batch、Flex、Fast、Ultrafastなどの処理モードでも料金が変わる場合があります。予算は[最新のAPI料金表](https://developers.openai.com/api/docs/pricing)で計算してください。

## 5. 外部アプリでPlus・Proの利用枠を使える？

対応アプリと対象アカウントであれば使えます。[Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)では、対象のPlus・Proユーザーが既存のWork・Codex利用枠を使う権限をアプリに与えられます。**ログインと利用枠の使用許可は別の権限**です。ChatGPTログインボタンがあるだけで、呼び出し料金が月額プランに含まれるとは限りません。

新たな利用枠や汎用API keyが追加されるわけではなく、アプリ独自の料金が発生することもあります。自分の連携でこの方法を使えるか確認してください。通常のAPI keyによる呼び出しは引き続き別課金です。

## 6. 実際の作業に合わせて決める

軽い利用ならFree・Goから試し、複雑なWork・Codex作業が多ければPlusとGPT-6.1 Solの提供状況を確認します。上限で頻繁に中断する、または対応するUltrafastモードが必要な場合にProの3つの料金帯を比較しましょう。

製品への組み込みはAPI予算を別に計算し、明確な大量処理にはLuna、複雑な作業にはSol、さらに難しい作業にはAstraを試します。第三者の販売プランでは、具体的なプラン、アカウントの利用方法、Codex権限、サポート条件を確認してください。安い価格だけでは、公式Proの特典や全モデルへのアクセスは保証されません。

## References

- [ChatGPT Work and Codex pricing](https://learn.chatgpt.com/docs/pricing)
- [Models and availability in Work and Codex](https://learn.chatgpt.com/docs/models)
- [GPT-6.1 Sol API model](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [GPT-6 Astra API model](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [GPT-6 Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)
