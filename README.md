Node.js and Express and TypeScript Web Application Sample
==========================

## What's this ?


以下の組み合わせで、ウェブアプリケーションを作成したサンプル。

- Node.js
- Express(Web Server)
- TypeScript
- PostgreSQL(RDBMS)
- Inversify
- inversify-express-utils

## Usage

DBを起動し、アプリケーションをビルド・起動する必要があります。

### DBの起動

`Docker` & `docker-comopose` とbashがあれば、以下のコマンドでPostgreSQLのDBを用意できます。

```bash
./env/local/db/start.sh
```

### アプリケーションの起動

```bash
npm install
npm run build
node ./dist/bundle.js
```

## author

Kazuhito Miura ( [@kazuhito_m](https://twitter.com/kazuhito_m "kazuhito_m on Twitter") )
