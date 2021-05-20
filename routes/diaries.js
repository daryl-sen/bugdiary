const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Diary, User, Issue, Version, Type, Tag, Location } = models;
  router.get("/", (req, res) => {
    res.end("diaries route");
  });

  return router;
};
