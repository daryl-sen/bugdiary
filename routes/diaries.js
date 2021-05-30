const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, User, Issue, Version, Type, Tag, Location } = models;
  router
    .get("/", (req, res) => {
      res.end("diaries route");
    })

    .get("/diaries", authenticateToken, (req, res) => {
      res.json(["helo"]);
    });

  return router;
};
