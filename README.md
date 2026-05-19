# 夫婦のセックスレスタイプ診断

夫婦関係の状態から、セックスレスにつながりやすい要因を診断する静的サイトです。

## Files

- `index.html` - 夫婦のセックスレスタイプ診断の本体
- `assets/type-diagnosis/` - メイン診断で使うOGP画像とタイプ別アイコン
- `risk-check/` - 別ページの「レス悪化危険度チェック」
- `googleb468090bb4909fae.html` - Google Search Console確認用
- `robots.txt`, `sitemap.xml` - 公開用の共通ファイル

## Structure

このrepoは1つのGitHub Pages repoですが、公開物は次の2系統に分けています。

1. `/` - 夫婦のセックスレスタイプ診断
2. `/risk-check/` - レス悪化危険度チェック

メイン診断の素材は `assets/type-diagnosis/` にまとめ、`risk-check/` はその配下で完結させています。

## Publish

GitHub Pagesで公開する場合は、リポジトリの Pages 設定で `main` ブランチの `/root` を公開元にします。

## Operation

このリポジトリは、`less-diagnosis.github.io` のGitHub Pages公開用正本repoです。
静的HTML構成で、公開元は `main` ブランチのrootです。

作業手順は `RUNBOOK.md` を参照してください。

## URL

https://less-diagnosis.github.io/
