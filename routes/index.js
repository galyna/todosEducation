module.exports = function (app, database) {
    let ObjectID = require("mongodb").ObjectID;
    const notesURL = "/notes";
    const collection = database.collection("notes");
    app.get(notesURL + `/:id`, (req, res) => {
        const id = req.params.id;
        const details = {"_id": new ObjectID(id)};
        collection.findOne(details, (err, item) => {
            if (err) {
                res.send({"error": "An error has occurred"});
            } else {
                res.send(item);
            }
        });
    });
    app.get(notesURL, (req, res) => {
        collection.find().toArray((err, result) => {
            if (err) {
                res.send({"error": "An error has occurred"});
            } else {
                res.send(result);
            }
        });
    });
    app.post(notesURL, (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        collection.insertOne(note, (err, result) => {
            if (err) {
                res.send({"error": "An error has occurred"});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put(notesURL + `/:id`, (req, res) => {
        const id = req.params.id;
        const details = {"_id": new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        collection.updateOne(details, note, (err, result) => {
            if (err) {
                res.send({"error": "An error has occurred"});
            } else {
                res.send(note);
            }
        });
    });
    app.delete(notesURL + `/:id`, (req, res) => {
        const id = req.params.id;
        const details = {"_id": new ObjectID(id)};
        collection.removeOne(details, (err, item) => {
            if (err) {
                res.send({"error": "An error has occurred"});
            } else {
                res.send("Note " + id + " deleted!");
            }
        });
    });
};

