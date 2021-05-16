const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory');

const req1 = `
    CREATE TABLE IF NOT EXISTS users(
        login VARCHAR(256) NOT NULL PRIMARY KEY,
        password VARCHAR(256) NOT NULL,
        lastname VARCHAR(256) NOT NULL,
        firstname VARCHAR(256) NOT NULL
    );
`;
req1.exec(req1, (err) => {
    if (err) {
        throw err;
    }
});