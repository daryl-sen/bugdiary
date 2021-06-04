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
    .get("/:uuid", authenticateToken, async (req, res) => {
      const targetUuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: targetUuid,
          },
        });

        if (targetDiary.user_id !== req.decodedUser.id) {
          return res.json({ error: "You cannot see another user's diaries." });
        }

        const issues = await targetDiary.getIssues();
        return res.json({
          targetDiary,
          issues,
        });
      } catch (err) {
        console.log(err);
        return res.end("diaries route");
      }
    })

    // create diary
    .post("/diary", authenticateToken, async (req, res) => {
      try {
        const newDiary = await Diary.create({ ...req.body });
        return res.json(newDiary);
      } catch (err) {
        console.log(err);
        return res.json({ error: err });
      }
    })

    // update diary
    .patch("/diary", authenticateToken, async (req, res) => {
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
    })

    // delete diary
    .delete("/diary", authenticateToken, async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        targetDiary.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json({ error: err.error });
      }
    });

  return router;
};
