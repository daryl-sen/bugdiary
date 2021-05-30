const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, User, Issue, Version, Type, Tag, Location } = models;
  router
    .get("/", authenticateToken, async (req, res) => {
      const targetId = req.decodedUser.id;
      try {
        const userDiaries = await Diary.findAll({
          where: {
            user_id: targetId,
          },
        });
        return res.json(userDiaries);
      } catch (err) {
        console.log(err);
      }
      return res.json({ error: err.errors });
    })

    .get("/top", (req, res) => {
      res.end("diaries route");
    });

  return router;
};
