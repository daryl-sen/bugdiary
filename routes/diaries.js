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

    .get("/:uuid", async (req, res) => {
      const targetUuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: targetUuid,
          },
        });

        const issues = await targetDiary.getIssues();
        return res.json({
          targetDiary,
          issues,
        });
      } catch (err) {
        console.log(err.errors);
      }
      return res.end("diaries route");
    });

  return router;
};
