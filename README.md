Node.js and TypeScript Web Application Sample
===

## What's this ?

以下の組み合わせで、ウェブアプリケーションを作成したサンプル。

- Node.js
- TypeScript
- PostgreSQL(RDBMS)
- pg
- WebPack

WebFramework の個別の組み合わせは、サンプルとして以下のフォルダに。

- [inversify-webapi-sample](inversify-webapi-sample/README.md)
- [nestjs-webapi-sample](nestjs-webapi-sample/README.md)

## Premise

以下の環境が前提です。

- Node.js : v10.11.0 or later
- npm : 6.9.0 or later

## Usage

DB を起動し、アプリケーションをビルド・起動する必要があります。

### DB の起動

`Docker` & `docker-comopose` と bash があれば、以下のコマンドで PostgreSQL の DB を用意できます。

```bash
./env/local/db/start.sh
```

### アプリケーションの起動

個々フォルダの `README.md` 参照。

## author

Kazuhito Miura ( [@kazuhito_m](https://twitter.com/kazuhito_m 'kazuhito_m on Twitter') )
