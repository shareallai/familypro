---
locale: ja
translationKey: codex-multi-account-mac-guide
title: "MacでCodexを多重起動：Plusの上限後に別アカウントへ切り替える方法"
headline: MacでCodexを多重起動し、別のPlusアカウントを保持する
description: "macOSでCODEX_HOMEとopen -n -a Codexを使い、Codexのローカルログイン状態を分ける方法。Plusアカウントの上限に達したとき、別アカウントへ切り替えたい人向けです。"
summary: 1つ目のPlusアカウントがCodexの上限に達したとき、別のCODEX_HOMEで2つ目のログイン状態を残しておくと切り替えが楽になります。
category: AIツールガイド
pubDate: 2026-05-14
updatedDate: 2026-05-14
author: Mark
service: General
tags:
  - Codex
  - ChatGPT Plus
  - macOS
  - 複数アカウント
  - CODEX_HOME
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

困る場面はかなり具体的です。1つ目のChatGPT PlusアカウントでCodexの上限に達したが、もう1つのPlusアカウントはまだ使える。1つのCodexだけで運用していると、いったんサインアウトし、別アカウントでサインインし直し、あとでまた戻す必要があります。

macOSでは、別のローカルhomeを指定して2つ目のCodex環境を開けます。

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

通常のCodexは `~/.codex` を使い続けます。このコマンドで開いたCodexは `~/.codex-work` を使うため、別のPlusアカウントでログイン状態を保持できます。アカウントAの上限に達したら、アカウントBのCodexウィンドウへ移るだけで済みます。

これは上限回避でも、2つのPlus枠を1つにまとめる方法でもありません。Codexの利用量は、ログイン中のChatGPTアカウントごとに扱われます。ここで分けているのは、Mac上のローカルログイン状態です。

## 1. どんなときに使うべきか

一番向いているのは、2つのPlusアカウントを実際に使い分ける場合です。アカウントAのCodex上限に達したあと、アカウントBをすぐ使いたいなら、2つのCodex環境を分けておく価値があります。

たまに切り替えるだけなら、手動でサインアウトしても大きな問題にはなりません。毎日のように使うなら、認証、ブラウザ遷移、コールバック待ちを繰り返さないことの効果が大きくなります。

個人用と仕事用を分ける用途にも使えますが、本記事の主題はそこではありません。ここでは「1つ目のPlusアカウントの上限に達したあと、別のPlusアカウントへすぐ移る」ことに絞ります。

## 2. 手順

まず、いつも通りCodexを開き、1つ目のPlusアカウントでログインします。このインスタンスは通常、デフォルトのディレクトリを使います。

```bash
~/.codex
```

次にTerminalで以下を実行します。

```bash
mkdir -p "$HOME/.codex-work"
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

新しく開いたCodexは `~/.codex-work` を使います。このウィンドウで2つ目のPlusアカウントにログインします。

macOSの `open` に環境変数を明示的に渡すなら、次の書き方も使えます。

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

以後、2つ目のアカウントを開くときは同じ `CODEX_HOME` を使います。ディレクトリ名は `~/.codex-work` でも `~/.codex-plus2` でも構いません。ただし、プロジェクトのリポジトリに入れたり、公開ストレージへ同期したりしないでください。

## 3. このコマンドが効く理由

見るべき部分は2つです。

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

`CODEX_HOME` は、Codexがどのローカルhomeを使うかを決めます。ログイン状態、設定、セッション索引、キャッシュなどはこのディレクトリに紐づきます。通常は `~/.codex` ですが、ここでは `~/.codex-work` を使わせています。

`open -n -a Codex` はmacOS側の起動指定です。`-a Codex` はCodexアプリを開く指定、`-n` はすでにCodexが起動していても新しいインスタンスを開く指定です。`-n` がないと、既存ウィンドウが前面に出るだけで、別の `CODEX_HOME` が使われないことがあります。

つまり、`open -n` で別インスタンスを作り、`CODEX_HOME` で別のローカル状態を持たせる、という仕組みです。

`open` のオプションを確認したい場合は、Terminalで次を実行します。

```bash
man open
```

`open(1)` の `(1)` はUnix manualの「ユーザーコマンド」章を表します。macOSに標準で入っているコマンドの説明であり、追加インストールするツールではありません。

## 4. 分離できたか確認する

通常のCodexウィンドウはアカウントAでログインしたままにします。次に、もう一度このコマンドで2つ目のウィンドウを開きます。

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

そのウィンドウでアカウントBにログインします。いったん閉じてから同じコマンドで開き直し、通常ウィンドウがアカウントA、2つ目のウィンドウがアカウントBを覚えていれば分離できています。

うまく分かれない場合は、まず次を確認します。

- `-n` を付けているか。
- 毎回同じ `CODEX_HOME` を指定しているか。
- Terminalから起動しており、環境変数が新しいプロセスへ渡っているか。

それでも不安定なら、2つ目のCodexを完全に終了し、次の形式で開き直します。

```bash
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

## 5. WeChat、WhatsApp、Telegramにも使えるか

考え方は参考になりますが、このコマンドをそのまま使うことはできません。

Codexで成立するのは、Codexが `CODEX_HOME` を読み、ローカル状態を別ディレクトリに置けるためです。WeChat、WhatsApp、Telegramのようなメッセージアプリは、ログイン状態を `~/Library/Containers`、`~/Library/Application Support`、Keychain、ブラウザprofile、App Groupコンテナ、またはサーバー側のデバイス管理に置くことがあります。`CODEX_HOME` を指定しても、そもそも読みません。

WeChatは無理に複数デスクトップインスタンスを開く用途には向きません。`open -n -a WeChat` で2つ目のプロセスが起動しても、同じローカルデータを取り合う可能性があります。

WhatsAppは、公式の複数アカウント機能、リンク済みデバイス、または別ブラウザprofileのWhatsApp Webを使う方が安全です。出所不明の多重起動版は避けるべきです。

Telegramは公式クライアントの複数アカウント機能を先に使います。複数プロセスを起動するより、アプリ内で切り替える方が分かりやすいです。

重要なのは、ウィンドウを2つ出せるかではなく、状態を安全に分離できるかです。分離できなければ、多重起動に見えているだけです。

## 6. 注意点

`~/.codex-work` を別のMacへそのままコピーしないでください。ログイン情報やローカル状態を含む可能性があります。新しいMacでは、改めてログインする方が安全です。

`~/.codex-work` を削除すると、2つ目のCodex環境のローカル状態も消えます。通常は再ログインが必要になり、設定、セッション索引、キャッシュも失われることがあります。

これは公式のアカウント切り替え機能ではありません。macOSの多重起動とCodexのローカルhome指定を組み合わせた実用的な運用方法です。

## 7. 最後に残すコマンド

```bash
# メインアカウント
open -a Codex

# 2つ目のPlusアカウント
open -n -a Codex --env CODEX_HOME="$HOME/.codex-work"
```

目的が「1つ目のPlusアカウントでCodex上限に達したあと、別のPlusアカウントへすぐ移りたい」だけなら、この2つで足ります。

## References

- [Apple Developer: Reading UNIX Manual Pages](https://developer.apple.com/documentation/os/reading-unix-manual-pages)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [openai/codex GitHub README](https://github.com/openai/codex)
- [Multiple Accounts Coming to WhatsApp](https://about.fb.com/news/2023/10/multiple-accounts-on-whatsapp/)
- [WhatsApp Adds New Features to Simplify Storage, Switch Accounts, and More](https://about.fb.com/news/2026/03/whatsapp-new-features-simplify-storage-switch-accounts/)
- [Telegram: Autoplaying Videos, Automatic Downloads and Multiple Accounts](https://telegram.org/blog/autoplay)
