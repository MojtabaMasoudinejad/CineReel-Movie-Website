"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// returns an array of all companies
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const companyNames = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const result = await db.collection("companies").find().toArray();

    if (result) {
      result.forEach((item) => {
        companyNames.push(item.name);
      });
      res.status(200).json({
        status: 200,
        data: companyNames,
        message: "All The Companies",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of specific  company Items
const getSpecificCompanyItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { company } = req.params;

  const specificCompanyitems = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const allCompanyNames = await db.collection("companies").find().toArray();
    const allProductNames = await db.collection("products").find().toArray();

    if (allCompanyNames && allProductNames) {
      allCompanyNames.map((item) => {
        if (item.name.toLowerCase() === company.toLowerCase()) {
          allProductNames.map((product) => {
            if (product.companyId === item._id) {
              specificCompanyitems.push(product);
            }
          });
          res.status(200).json({
            status: 200,
            data: specificCompanyitems,
            message: "All The product for Specific Company",
          });
        }
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = {
  getCompanies,
  getSpecificCompanyItems,
};
