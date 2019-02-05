var express = require('express');

const MongoClient    = require('mongodb').MongoClient;
var db = {url:"mongodb://localhost:27017/notes"};

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    require('./routes')(app, database);

    app.listen(8000, () => {
        console.log('We are live on ' + 8000);
    });

})

module.exports = app;
