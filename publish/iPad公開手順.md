# iPad公開手順

このフォルダは、そのまま静的ホスティングへ上げられる iPad 公開用一式です。
今回の `ipad-publish.zip` は、iPad 用の保存領域を Desktop 版と分けた初期状態版です。

## いちばん簡単な使い方

1. `ipad-publish.zip` を静的ホスティングへアップロードします。
2. 公開された `https://.../専門医試験_問題集.html` を iPad の Safari で開きます。
3. Safari の共有メニューから `ホーム画面に追加` を選びます。
4. 以後はホーム画面のアイコンから起動します。

## 初期状態について

- この iPad 公開版は、Desktop で使っているローカル版とは別の保存名で動きます。
- そのため、Desktop 側の使用履歴を残したまま、iPad 側だけ初期状態から始められます。
- 今回の初期化は最初の一度だけで、この版を使い始めたあとの iPad 側の学習履歴は通常どおり残ります。

## 含まれている主なファイル

- `専門医試験_問題集.html`
- `app.css`
- `app.js`
- `questions.json`
- `questions-data.js`
- `manifest.webmanifest`
- `service-worker.js`
- `apple-touch-icon-180.png`
- `icon-192.png`
- `icon-512.png`

## 更新するとき

1. 問題や解説を修正します。
2. `build_ipad_bundle.ps1` を実行します。
3. 新しくできた `ipad-publish` または `ipad-publish.zip` を、前回と同じ公開先へ上書きします。
4. iPad で Safari の対象ページを再読み込みしてから、ホーム画面アプリを開き直します。

必要なら `build_ipad_bundle.ps1` の `DbName` を変えることで、もう一度まっさらな iPad 版を作れます。

## 補足

- 直接 `file://` で開いても学習はできますが、ホーム画面アプリ化や Service Worker 更新は `http/https` 公開時に安定します。
- 同じ Wi-Fi 内での一時利用なら、PC / Mac からローカル配信して iPad で開く方法でも使えます。
