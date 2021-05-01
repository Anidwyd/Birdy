const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('memory');
var Datastore = require('nedb')

var msgdb = {};
msgdb.messages = new Datastore();
msgdb.messages.loadDatabase();
//msgdb.messages.createIndex({author_name: "text", content: "text"})

const express = require('express');
// const cors = require('cors');
const app = express()
const session = require("express-session");

const allowCrossDomain = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(db, msgdb));
app.use(express.json());

// Démarre le serveur
app.on('close', () => {
    db.close();
});

exports.default = app;