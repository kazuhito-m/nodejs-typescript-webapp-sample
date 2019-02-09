const {
    createDb,
    migrate
} = require("postgres-migrations");
const path = require('path');

const migrateionsFilePath = path.join(__dirname, 'migrations');

// createDb("database-name", {
//         defaultDatabase: "postgres", // optional, default: "postgres"
//         user: "postgres",
//         password: "password",
//         host: "localhost",
//         port: 5432,
//     })
//     .then(() => {
//         return migrate({
//             database: "database-name",
//             user: "postgres",
//             password: "password",
//             host: "localhost",
//             port: 5432,
//         }, migrateionsFilePath);
//     })
//     .then(() => {
//         console.log('ここに来るときは？');
//     })
//     .catch((err) => {
//         console.log(err)
//     });