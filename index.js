const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5001;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zwthnu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const infoCollection = client
      .db("information")
      .collection("entries");
      
    app.get("/entries", async (req, res) => {
        const query = {};
        const cursor = await infoCollection.find(query);
        const routes = await cursor.toArray();
        res.send(routes);
      });

  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Siciliamia!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
