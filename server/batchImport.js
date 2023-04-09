const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const comments = require("./DataComments.json");
console.log("MONGO_URI", MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

let commentsList = [];

comments.map((item) => {
  let tempProduct = {
    _id: uuidv4(),
    ...item,
  };
  commentsList.push(tempProduct);
});

// console.log(commentsList);
/**
 * imports all relevant data to mongoDB
 */
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    await db.collection("comments").insertMany(commentsList);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

batchImport();
