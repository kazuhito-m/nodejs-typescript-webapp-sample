# Nest.js WebAPI Sample.

## What's this ?

以下の組み合わせで、ウェブアプリケーションを作成したサンプル。

- Nest.js
- TypeORM

## Usage

DB を起動し、アプリケーションをビルド・起動する必要があります。

### DB の起動

上のフォルダの [README.md](../README.md) 参照。

### アプリケーションの起動

```bash
npm install
npm run build

cd ./dist
cp ../systemconfig.json ../log4js.json ./
node ./src/main.js
```

## Special characteristics

- 想定が「既存アプリケーションのリプレイス」であるため「DB はすでにある」前提
  - 「Entity クラスからのマイグレーション」はしない
  - 極力「SQL でマイグレーション」を行う
  - 本来「TypeORM で Entity を作っていれば PrimaryGeneratedColumn な列が作れるはず」だが、探した限りでは「Sequence 名を指定するところがない」「期待している Sequence がなければ null で Insert しようとする」ようであるので「自力で取ってセット」という実装になっている
