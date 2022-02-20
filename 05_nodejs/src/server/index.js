const express = require('express');
const os = require('os');

const app = express();
const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb://localhost:27017/";

const bp = require('body-parser');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

MongoClient.connect(dburl, (err, db) => {
    if (err) throw err;

    let dbo = db.db("shoppingapp");

    dbo.dropDatabase();

    main(dbo);
});


function resetProducts(dbo) {
    const initData = {
        "products": [
            "mayo", "tea", "cucumber",
            "cheese", "milk", "shake"
        ].map((e, i) => ({
            "name": e,
            "id": i
        }))
    };

    dbo.dropCollection("products", (e, r) => {
        console.log(r);
        const products = dbo.collection("products");

        products.insertMany(initData.products, (e, r) => {
            console.log("RESET");
            console.log(r.result);
        });


    });


}

function main(dbo) {

    resetProducts(dbo);

    const products = dbo.collection("products")

    app.use(express.static('dist'));
    app.get('/api', (req, res) => res.send({ message: "Hello" }));

    app.get('/api/products', (q, s) => {
        products.find().toArray((err, ret) => {
            s.send(ret);
        });

    });

    app.post("/api/buy", (q, s) => {
        console.log("RECV");

        const plist = q.body.tobuy;
        const query = { id: { $in: plist.map(e => e.id) } };
        products.find(query).toArray((e, r) => {
            console.log(r);
            const toDelete = r;
            if (r.length != plist.length) {
                s.send({ success: 0, result: toDelete });
            } else {
                products.deleteMany(query, (e, r) => {
                    console.log("DELETED " + r.deletedCount);
                    s.send({ success: 1 });
                });
            }

        });
    });

    app.get("/api/reset", (q, s) => {
        resetProducts(dbo);
        s.send("OK");
    });

    app.listen(3001, () => console.log('Listening on port 3001!'));
}

