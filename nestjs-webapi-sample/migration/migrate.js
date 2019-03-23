const {
    createDb,
    migrate
} = require("postgres-migrations");
const path = require('path');

function convertMigrationSettings(ormSetting) {
    const db = [];
    db.database = ormSetting.database;
    db.defaultDatabase = db.database;
    db.host = ormSetting.host;
    db.port = ormSetting.port;
    db.user = ormSetting.username;
    db.password = ormSetting.password;
    return db;
}

function migration(settings, dirName) {
    // マイグレーション用DDLの取得先。
    const migrateionsFilePath = path.join(__dirname, dirName);

    createDb(settings.database, settings)
        .then(() => migrate(settings, migrateionsFilePath))
        .then(() => console.log('DB Migrteion success! ' + dirName))
        .catch((err) => console.log(err));
}

// DB接続用設定を設定ファイルより抽出。
const configFilePath = path.join(__dirname, '..', 'systemconfig.json');
const config = require(configFilePath);

const sampleDb = convertMigrationSettings(config.sampleDb);
const otherDb = convertMigrationSettings(config.otherDb);

migration(sampleDb, 'sampleDb');
migration(otherDb, 'otherDb');