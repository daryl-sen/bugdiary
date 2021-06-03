const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, User, Issue, Version, Type, Tag, Location } = models;
  router
    // all diaries belonging to the current user
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

    // specific diary
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
    })

    // create diary
    .post("/diary", async (req, res) => {
      try {
        const newDiary = await Diary.create({ ...req.body });
        return res.json(newDiary);
      } catch (err) {
        console.log(error);
        return res.status(500).json(error);
      }
    })

    // update diary
    .patch("diary", async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        for (const attribute in req.body) {
          targetDiary[attribute] = req.body[attribute];
        }
        await targetDiary.save();
        return res.json(targetDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    });

  return router;
};
