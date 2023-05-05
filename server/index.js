"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getComments,
  addComments,
  deleteComment,
  updateComment,
  updateWatchList,
  getAllUsers,
  updateRemoveWatchList,
  likedMovie,
  unlikedMovie,
  likedPerson,
  unlikedPerson,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // Comments Endpoints
  .get("/api/all-comments", getComments)
  .post("/api/add-comments", addComments)
  .delete("/api/add-comments/:_id", deleteComment)
  .patch("/api/add-comments/:_id", updateComment)

  // Users Endpoints
  .get("/api/users", getAllUsers)
  .patch("/api/users-add-watchlist/:email", updateWatchList)
  .patch("/api/users-remove-watchlist/:email", updateRemoveWatchList)
  .patch("/api/users-add-like/:email", likedMovie)
  .patch("/api/users-remove-like/:email", unlikedMovie)
  .patch("/api/users-add-person-like/:email", likedPerson)
  .patch("/api/users-remove-person-like/:email", unlikedPerson)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
