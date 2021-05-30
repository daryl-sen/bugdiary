const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, User, Issue, Version, Type, Tag, Location } = models;
  router
    .get("/", authenticateToken, async (req, res) => {
      const targetUuid = req.decodedUser.uuid;
      console.log(req.decodedUser.id);
      res.json(["helo"]);
    })

    .get("/top", (req, res) => {
      res.end("diaries route");
    });

  return router;
};
