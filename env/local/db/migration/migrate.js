const {
    createDb,
    migrate
} = require("postgres-migrations")

console.log('__dirnameだけど…:' + __dirname);

/*
createDb("database-name", {
        defaultDatabase: "postgres", // optional, default: "postgres"
        user: "postgres",
        password: "password",
        host: "localhost",
        port: 5432,
    })
    .then(() => {
        return migrate({
            database: "database-name",
            user: "postgres",
            password: "password",
            host: "localhost",
            port: 5432,
        }, "path/to/migration/files")
    })
    .then(() => {
        console.log('ここに来るときは？');
    })
    .catch((err) => {
        console.log(err)
    })
*/