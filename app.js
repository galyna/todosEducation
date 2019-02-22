const express = require("express");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const db = {url: "mongodb://localhost:27017/notes"};
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


(async function() {

    let client;

    try {
        // Use connect method to connect to the Server
        client = await new MongoClient(db.url, { useNewUrlParser: true });
        client.connect(function(err, client){

            if(err){
                return console.log(err);
            }
            // взаимодействие с базой данных
            require("./notes")(app, client);

        });

    } catch (err) {
        console.log(err.stack);
    }

    process.on('SIGTERM', () => {
        console.log('Closing MongoClient');
        client.close(() => {
            console.log('MongoClient  closed.');
        });
    });

    if (client) {
        client.close();
    }
})();

module.exports = app;

