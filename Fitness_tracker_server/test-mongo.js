const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrfuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log("URI is formatted with credentials:", uri.includes("undefined") ? "No (has undefined value)" : "Yes");

const client = new MongoClient(uri);
client.connect()
  .then(() => {
    console.log("Connected locally successfully!");
    process.exit(0);
  })
  .catch(e => {
    console.error("Local connection failed:", e.message);
    process.exit(1);
  });
