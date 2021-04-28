const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory');
var Datastore = require('nedb')

var msgdb = {};
msgdb.messages = new Datastore();
msgdb.messages.loadDatabase();
msgdb.messages.createIndex({author_name: "text", content: "text"})

express = require('express');
const app = express()
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));
 
app.use('/api', api.default(db, msgdb));

// Démarre le serveur
app.on('close', () => {
    db.close();
});
exports.default = app;