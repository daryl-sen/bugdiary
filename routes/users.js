const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;
  router.get("/", (req, res) => {
    res.end("users route");
  });

  return router;
};
