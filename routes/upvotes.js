const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Upvote, Issue, User } = models;
  router.get("/", (req, res) => {
    res.end("upvotes route");
  });

  return router;
};
