const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Comment, Issue, User } = models;
  router.get("/", (req, res) => {
    res.end("comments route");
  });

  return router;
};
