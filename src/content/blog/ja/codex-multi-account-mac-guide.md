---
locale: ja
translationKey: codex-multi-account-mac-guide
title: "MacのCodex複数アカウント管理：軽量ツールで素早く切り替える方法"
headline: Codexを多重起動できなくなった後、Macで複数のChatGPTアカウントを管理する
description: "2026年8月現在、CODEX_HOMEによるCodexの多重起動は安定しません。codex-authとcodex-barで複数のChatGPTアカウントを保存し、利用枠を確認して素早く切り替える方法を解説します。"
summary: CODEX_HOMEでCodexを多重起動する従来の方法は、安定して使えなくなりました。これからは複数のアカウントを保存し、必要なときに現在のアカウントを切り替える方が実用的です。
category: AIツールガイド
pubDate: 2026-05-14
updatedDate: 2026-08-28
author: Mark
service: General
tags:
  - Codex
  - ChatGPT
  - macOS
  - 複数アカウント
  - codex-auth
  - codex-bar
relatedTranslationKeys:
  - chatgpt-go-plus-pro-codex-api-guide
  - openclaw-mac-codex-install-guide
  - codex-claude-cursor-instructions-guide
  - gpt-5-5-vs-gpt-5-4-vs-gpt-5-3-codex-guide
draft: false
---

以前、`CODEX_HOME` と `open -n -a Codex` を組み合わせてMac上に2つのCodex環境を開いていたなら、もうそのコマンドにこだわる必要はありません。2026-08-28現在、この方法では2つのChatGPTアカウントのログイン状態を安定して並行保持できなくなっています。

一方で、複数アカウントを使い分けたい事情は変わりません。1つのアカウントでCodexの利用枠を使い切っても、別のアカウントには余裕がある。そのたびにサインアウトと認証を繰り返すのは面倒です。現在の現実的な解決策は、多重起動を試すことではなく、アカウントを保存しておき、必要に応じて現在のアカウントを切り替えることです。

そこでおすすめしたいのが、[Loongphy/codex-auth](https://github.com/Loongphy/codex-auth) と [xingcan-hu/codex-bar](https://github.com/xingcan-hu/codex-bar) の組み合わせです。前者はアカウント管理を担い、後者はアカウントと残りの利用枠をMacのメニューバーに表示します。2つのCodex Appを同時にオンラインにしたり、アカウント間の利用枠を合算したりはできませんが、日々の切り替えはかなり楽になります。

## 1. 従来の方法が使えなくなった理由

以前は、2つ目のCodexプロセスに別のローカルディレクトリを指定していました。

```bash
CODEX_HOME="$HOME/.codex-work" open -n -a Codex
```

この方法が成立するには、macOSが独立したCodexプロセスを新たに起動し、そのプロセスが指定された `CODEX_HOME` を採用する必要があります。Codex Appの挙動が変わった現在、この2つの条件では信頼できるアカウント分離になりません。`open -n` を繰り返したり、ディレクトリ名を変えたりして一時的に動くことはあっても、安定した運用方法とは言えません。

代わりに、現在のログイン状態は1つだけにします。ほかのアカウントの認証情報をツールで保存し、使うアカウントを現在の状態へ切り替える仕組みです。2つのウィンドウに別々のアカウントを表示するほど直感的ではありませんが、サインアウトから認証までを毎回やり直す手間は省けます。

## 2. 2つの軽量ツールの役割

この構成の土台は `codex-auth` です。ターミナルからアカウントのログイン、保存、一覧表示、切り替えを行い、複数アカウントのレジストリを管理します。コマンドラインに慣れているなら、これだけでも十分です。

`codex-bar` は、そのレジストリを使う小さなmacOSメニューバーアプリです。現在のアカウントについて、5時間枠と週間枠の残量を表示し、別のアカウントもクリックで選択できます。新しいアカウントのログイン、削除、別名の設定は引き続き `codex-auth` で行い、メニューバーは頻繁に使う確認と切り替えに専念します。

対応環境には少し違いがあります。`codex-auth` のドキュメントにはCodex CLI、VS Code拡張機能、Codex Appが記載されています。Codex CLIまたはCodex Appでアカウントを切り替えた後は、新しいログイン状態を反映させるためにクライアントを再起動してください。再起動なしの切り替えを試みる実験的な `codex-auth app` コマンドもありますが、作者は不安定で、公式クライアントの更新により動かなくなる可能性があると明記しています。日常運用の前提には向きません。

`codex-bar` はmacOS専用で、macOS 13以降が必要です。現在は公式のビルド済みインストーラがなく、Apple Command Line Toolsを使ってソースからビルドします。ChatGPT/Codexログインだけに対応し、API Keyには対応していません。期限切れトークンの更新も行いません。

## 3. codex-authでアカウントを保存する

インストール前に、Node.jsと公式Codex CLIを用意します。次の2つのコマンドで、Codex CLIと `codex-auth` をグローバルにインストールできます。

```bash
npm install -g @openai/codex
npm install -g @loongphy/codex-auth
```

まだグローバルにインストールしたくない場合は、`npx @loongphy/codex-auth list` でも実行できます。通常は、まず1つのChatGPTアカウントでログインし、ほかのアカウントも同じ手順で追加します。

```bash
codex-auth login

# 通常のログインが難しい場合はデバイス認証を使う
codex-auth login --device-auth
```

保存後の確認と切り替えには、次のコマンドを使います。

```bash
# 全アカウントと現在のアカウントを確認する
codex-auth list
codex-auth list --active

# 対話式で選ぶか、一覧の番号を指定して切り替える
codex-auth switch
codex-auth switch 02
```

切り替えた後は、Codex CLIまたはCodex Appを再起動します。VS Code拡張機能にすぐ反映されない場合は、ウィンドウを再読み込みするかVS Codeを再起動してください。ここで切り替わるのは `~/.codex/auth.json` が示す現在のアカウントであり、複数のCodexをバックグラウンドで同時実行するわけではありません。

## 4. アカウント情報をMacのメニューバーに置く

利用枠を頻繁に確認するなら、`codex-bar` も追加します。macOS 13以降でApple Command Line Toolsが入っていることを確認し、ソースからビルドしてください。

```bash
git clone https://github.com/xingcan-hu/codex-bar.git
cd codex-bar
./scripts/test.sh
./scripts/build_app.sh
./scripts/install.sh /Applications
open "/Applications/Codex Bar.app"
```

起動すると、`~/.codex/accounts/registry.json` が読み込まれます。メニューにアカウントが表示されない場合、アプリの故障ではなく、まだ `codex-auth login` でレジストリにアカウントを追加していない可能性があります。

メニューを開くと、各アカウントの5時間枠と週間枠の残量を確認できます。別のアカウントを選ぶと、その認証スナップショットが `~/.codex/auth.json` にコピーされます。クライアントが古い状態をメモリに保持しないよう、切り替え後は実行中のCodex CLIまたはCodex Appを再起動してください。

## 5. CodexBarを第一候補にしなかった理由

[steipete/CodexBar](https://github.com/steipete/CodexBar) は、より成熟し、広く使われているプロジェクトです。2026-08-28現在、GitHubでは約2万600スターを獲得しています。macOSではReleaseをダウンロードするほか、Homebrewでもインストールできます。

```bash
brew install --cask codexbar
```

CodexBarの魅力は機能の広さです。Codexだけでなく、Claude、Cursor、Gemini、GitHub Copilotなど、多くのサービスについて利用枠、リセット時刻、稼働状態、ローカルの費用情報をまとめられます。メニューバーアプリはmacOS 14以降が必要で、付属CLIにはmacOS版とLinux版があります。複数のAIサービスを日常的に使う人には、この統合ビューが役立ちます。

ただし、私が必要としているのは数個のChatGPT/Codexアカウントの管理だけです。自分のMacでCodexBarを使ったときは、`codex-auth` と `codex-bar` の組み合わせよりCPUとメモリの使用量が明らかに大きかったため、機能の少ない軽量な構成を選びました。

これは統一条件で測ったベンチマークではなく、あくまで手元の環境での観察です。CodexBarのバージョン、有効にしたサービス数、更新間隔、Macの環境によって負荷は変わります。複数サービスの監視が必要なら、実際にインストールし、アクティビティモニタで現行版の動作を確認して決めるのが確実です。

## 6. 第三者製アカウントツールの注意点

便利さの理由は認証ファイルを直接管理することにあるため、これらを認証情報として慎重に扱ってください。`codex-auth` はアカウントごとの認証ファイルを保存し、切り替え時に現在の `~/.codex/auth.json` を置き換えます。`codex-bar` も同じレジストリを読み、選択された認証スナップショットを現在の位置へコピーします。クラウドストレージやコードリポジトリへアップロードしたり、他人へ送ったりしてはいけません。

利用枠を更新するため、両ツールはChatGPTのアクセストークンを使い、OpenAI/ChatGPTのバックエンド利用状況エンドポイントへリクエストします。これは公開された安定APIではないため、フィールドやアクセス方法が変わる可能性があります。`codex-auth` では `--skip-api` を指定してローカルセッションの記録だけを読むこともできますが、記録が欠けていたり、数時間遅れていたりする場合があります。

複数アカウントでログイン操作を減らしたいだけなら、まず `codex-auth` を使えば目的を果たせます。利用枠の確認と切り替えをメニューバーで行いたくなったら `codex-bar` を追加してください。より高機能なCodexBarは、多くのAIサービスを一か所で管理し、常駐時の負荷が増えることを許容できる人に向いています。

## References

- [Loongphy/codex-auth：Codexアカウント管理CLI](https://github.com/Loongphy/codex-auth)
- [xingcan-hu/codex-bar：codex-auth用の軽量macOSメニューバーアプリ](https://github.com/xingcan-hu/codex-bar)
- [steipete/CodexBar：複数サービスの利用状況を監視するアプリ](https://github.com/steipete/CodexBar)
- [OpenAI：Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [OpenAI Codex GitHubリポジトリ](https://github.com/openai/codex)
