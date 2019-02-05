const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const db = {url: "mongodb://localhost:27017/notes"};
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    require("./routes")(app, database);
});

module.exports = app;
