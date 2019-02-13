const express = require("express");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const db = {url: "mongodb://localhost:27017/notes"};
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// const client = await MongoClient.connect...
// })()
MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    require(".")(app, database);
});

module.exports = app;
