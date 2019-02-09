const {
    createDb,
    migrate
} = require("postgres-migrations");
const path = require('path');

// DB接続用設定を設定ファイルより抽出。
const configFilePath = path.join(__dirname, '..', '..', '..', '..', 'config', 'settings.json');
const pgDbSettings = require(configFilePath).pg;
pgDbSettings.defaultDatabase = pgDbSettings.database;

// マイグレーション用DDLの取得先。
const migrateionsFilePath = path.join(__dirname, 'migrations');

createDb(pgDbSettings.database, pgDbSettings)
    .then(() => migrate(pgDbSettings, migrateionsFilePath))
    .then(() => console.log('DB Migrteion success!'))
    .catch((err) => console.log(err));