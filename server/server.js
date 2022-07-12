const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");
const mongodb = require("mongodb");

const client = new mongodb.MongoClient("mongodb://localhost:27017/test");

client.connect().then(() => {
  const db = client.db("test");
  const collection = db.collection("api_data");
  let url = "https://api.publicapis.org/entries";
  let settings = { method: "Get" };

  fetch(url, settings)
    .then(async (res) => {

      const contentType = res['headers'].get('content-type');
      if (contentType == "text/plain; charset=utf-8") {
        throw new Error(await res.text());
      }
      return res.json()
    })
    .then(async (data) => {
      var response = data;
      // collection.
      collection.drop().finally(() => {
        collection
          .insertMany(response.entries)
          .then(() => console.log("inserted"))
          .catch((err) => {
            console.log("Inserting failed", err);
          });
      });
    }).catch((err) => {
      console.log("An error occurred fetching seed data: ", err);
      process.exit(1);
    });
});

app.use(cors());

app.get("/api", async (req, res) => {
  const collection = client.db("test").collection("api_data");
  let data = await collection.findOne({
    API: req.query.api,
  });

  res.json({ users: data });
});

app.listen(5000, () => {
  console.log("server running on port5000");
});
