module.exports = function (app, database) {
    const ObjectID = require("mongodb").ObjectID;
    const notesURL = "/notes";
    const collection = database.collection("notes");

    const asyncMiddleware = fn =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        };

    app.get(notesURL + `/:id`, asyncMiddleware(async (req, res, next) => {
        const details = {"_id": new ObjectID(req.params.id)};
        const item = await collection.findOne(details);
        res.send(item);
    }));
    app.get(notesURL, asyncMiddleware(async (req, res, next) => {
        const result = await collection.find().toArray();
        res.send(result);
    }));
    app.post(notesURL, asyncMiddleware(async (req, res, next) => {
        const note = {body: req.body.body, title: req.body.title};
        const result = await collection.insertOne(note);
        res.send(result.ops[0]);
    }));
    app.put(notesURL + `/:id`, asyncMiddleware(async (req, res, next) => {
        const result = await collection.findOneAndUpdate(
            {"_id": new ObjectID(req.params.id)},
            {$set: {"body": req.body.body, "title": req.body.title}},
            {returnOriginal: false})
        res.send(result.value);
    }));
    app.delete(notesURL + `/:id`, asyncMiddleware(async (req, res, next) => {
        const details = {"_id": new ObjectID(req.params.id)};
        await collection.removeOne(details)
        res.send("Note " + req.params.id + " deleted!");
    }));
};

