# 焦点距離・画角・等価F値計算器

静的 HTML だけで動作する、焦点距離・画角・等価 F 値の計算ページです。

公開ページ: <https://akihiko-fuji.github.io/focal-length-calc/>

## 構成

```text
.
├── index.html   # 公開される HTML 本体
├── LICENSE      # Apache License 2.0
└── README.md    # このファイル
```

## ローカルでの確認

ビルド工程はありません。任意の静的ファイルサーバーでリポジトリルートを配信してください。

```bash
python3 -m http.server 8000
```

起動後、ブラウザで <http://localhost:8000/> を開きます。

npm を使う場合は、次のコマンドでも同じ確認ができます。

```bash
npm run serve
```

## 検証

最低限のリポジトリ検証として、公開エントリポイントである `index.html` が存在することを確認します。

```bash
npm test
```

## デプロイ

GitHub Pages でリポジトリのルートディレクトリを公開する想定です。

1. GitHub のリポジトリ設定で **Pages** を開きます。
2. **Build and deployment** の Source に **Deploy from a branch** を選びます。
3. 公開対象のブランチと `/ (root)` を選びます。
4. 保存後、GitHub Pages の公開 URL で `index.html` が配信されます。

## ライセンス

このリポジトリは [Apache License 2.0](LICENSE) の下で公開されています。
