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

const addUserDataToMongoDb = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const companyNames = [];
  try {
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db.collection("users").find().toArray();

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

// returns an array of all Comments
const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const commentsList = [];
  try {
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db.collection("comments").find().toArray();

    if (result) {
      result.forEach((item) => {
        commentsList.push(item);
      });
      res.status(200).json({
        status: 200,
        data: commentsList,
        message: "All The Comments",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// Add Comment to MongoDB

const addComments = async (req, res) => {
  const comment = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Final_Project");

    const newCommnetToCollection = await db.collection("comments").insertOne({
      // _id: uuidv4(),
      _id: comment._id,
      body: comment.body,
      filmId: comment.filmId,
      parentId: comment.parentId,
      userId: comment.userId,
      username: comment.username,
      createdAt: comment.createdAt,
    });

    if (newCommnetToCollection.acknowledged) {
      res.status(200).json({
        status: 200,
        data: newCommnetToCollection,
        message: "The New Comment is Added to Comments Collection",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: "The Comment is Not Added to Collection" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// deletes a specified Comment from Collection
const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { _id } = req.params;

  console.log(_id);
  try {
    await client.connect();
    const db = client.db("Final_Project");

    const deleteItem = await db.collection("comments").deleteOne({ _id: _id });

    if (deleteItem.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Comment Is Deleted Successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: "The Operation Is Not Completed" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// Update The Commenst
const updateComment = async (req, res) => {
  const { updatedComment } = req.body;
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    const updateComment = await db.collection("comments").updateOne(
      { _id: _id },
      {
        $set: {
          body: updatedComment,
        },
      }
    );

    if (updateComment.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Comment is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The Comment Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

/// Get All Users Data

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userList = [];
  try {
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db.collection("users").find().toArray();

    if (result) {
      result.forEach((item) => {
        userList.push(item);
      });
      res.status(200).json({
        status: 200,
        data: userList,
        message: "List of All Users",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

//Add the Movie from  user watchList
const updateWatchList = async (req, res) => {
  const { newWatchList } = req.body;
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    const updateWatchList = await db.collection("users").updateOne(
      { email: email },
      {
        $push: {
          watchList: newWatchList,
        },
      }
    );

    if (updateWatchList.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The WatchList is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The WatchList Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

//Remove the Movie from  user watchList
const updateRemoveWatchList = async (req, res) => {
  const { newWatchList } = req.body;
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    const updateWatchList = await db.collection("users").updateOne(
      { email: email },
      {
        $pull: {
          watchList: newWatchList,
        },
      }
    );

    if (updateWatchList.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The WatchList is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The WatchList Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

//Add the Movie To  user LikedList
const likedMovie = async (req, res) => {
  const { newLikedMovie } = req.body;
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    const updateLikedList = await db.collection("users").updateOne(
      { email: email },
      {
        $push: {
          likedList: newLikedMovie,
        },
      }
    );

    if (updateLikedList.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The LikedList is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The LikedList Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

//Remove the Movie from  user LikedList
const unlikedMovie = async (req, res) => {
  const { newLikedMovie } = req.body;
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final_Project");
    const updateLikedList = await db.collection("users").updateOne(
      { email: email },
      {
        $pull: {
          likedList: newLikedMovie,
        },
      }
    );

    if (updateLikedList.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The LikedList is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The LikedList Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = {
  getComments,
  addComments,
  deleteComment,
  updateComment,
  updateWatchList,
  getAllUsers,
  updateRemoveWatchList,
  likedMovie,
  unlikedMovie,
};
