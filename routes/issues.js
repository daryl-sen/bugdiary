const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const {
    Issue,
    Diary,
    Comment,
    Upvote,
    Location,
    Type,
    Version,
    Tag,
  } = models;
  router.get("/", (req, res) => {
    res.end("issues route");
  });

  return router;
};
