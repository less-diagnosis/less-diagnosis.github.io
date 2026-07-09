# less-diagnosis.github.io RUNBOOK

## 概要

このrepoは、`less-diagnosis.github.io` のGitHub Pages公開用正本repoです。

GitHub Pagesは、このrepoの `main` ブランチrootから公開する前提です。今後の編集対象は、この通常cloneのみです。

旧bare repoと退避フォルダは編集しません。

- 旧bare repo: `C:\Users\user\Desktop\AI作業用フォルダ\【git page公開用】\less-diagnosis.github.io.git`
- 退避フォルダ: `C:\Users\user\Desktop\AI作業用フォルダ\02_出力（AIの生成物）\03-コード・スクリプト・ツール類\less-diagnosis.github.io_backup_20260518`

## 構成

このrepoは1つのPages repoですが、中では次の2系統に分けています。

1. `/` - 夫婦のセックスレスタイプ診断本体
2. `/risk-check/` - レス悪化危険度チェック

メイン診断で使う画像は `assets/type-diagnosis/` にまとめています。`risk-check/` 側のHTML / CSS / JavaScript / 画像は、すべて `risk-check/` 配下で管理します。

## 初回セットアップ手順

追加インストールは不要です。PowerShellでPython 3が使えることを確認します。

```powershell
py -3 --version
```

## 起動コマンド

```powershell
cd "C:\Users\user\Desktop\AI作業用フォルダ\02_出力（AIの生成物）\03-コード・スクリプト・ツール類\less-diagnosis.github.io"
py -3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## 動作確認方法

- `index.html` が表示されること
- `risk-check/` が表示されること
- `assets/type-diagnosis/` 内の画像が表示されること
- 診断結果画面で、タイプ画像内の白い円と外側の金色の円が中央で揃っていること（PC・スマホの両方）
- `robots.txt` が開けること
- `sitemap.xml` が開けること
- 公開後に `https://less-diagnosis.github.io/` が表示されること

## 終了方法

簡易サーバーを起動したターミナルで `Ctrl+C` を押します。

## 通常の作業手順

1. 通常cloneで編集する。
2. ローカル表示確認を行う。
3. `git status` で変更ファイルを確認する。
4. `git diff` で変更内容を確認する。
5. commitする。
6. pushする。
7. GitHub Pagesの表示を確認する。

## 禁止事項

- 旧bare repoを直接編集しない。
- 退避フォルダで編集しない。
- 親repo全体に対して `git add -A` しない。
- `git push -f` を使わない。
- `git reset --hard` を使わない。
- `git clean` を使わない。

## archive候補

以下は将来的なarchive候補です。ただし、GitHub Pagesの表示確認が終わるまでarchiveしません。

- `C:\Users\user\Desktop\AI作業用フォルダ\02_出力（AIの生成物）\03-コード・スクリプト・ツール類\less-diagnosis.github.io_backup_20260518`
- `C:\Users\user\Desktop\AI作業用フォルダ\【git page公開用】\less-diagnosis.github.io.git`

## 注意点

- 公開物本体を変更した場合は、ローカル表示確認を必ず行います。
- 文書だけの変更でも、push前に `git status` と `git diff` を確認します。
- archiveや削除は、公開確認後に別作業として行います。
