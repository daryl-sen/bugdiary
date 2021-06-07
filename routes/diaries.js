const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, Issue, Version, Type, Location } = models;
  router

    // get information required for setting up new issues
    .get("/issue-setup/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        const diaryLocations = await Location.findAll({
          where: {
            diary_id: targetDiary.id,
          },
        });
        const diaryTypes = await Type.findAll({
          where: {
            diary_id: targetDiary.id,
          },
        });
        const latestVersion = await Version.findAll({
          limit: 1,
          where: {
            diary_id: targetDiary.id,
          },
          order: [["createdAt", "DESC"]],
        });
        return res.json({
          targetDiary,
          diaryLocations,
          diaryTypes,
          latestVersion,
        });
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    })

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

        // if (targetDiary.user_id !== req.decodedUser.id) {
        //   return res.json({ error: "You cannot see another user's diaries." });
        // }

        const issues = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
          },
          order: [["id", "DESC"]],
        });
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
    .delete("/diary/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        if (targetDiary.user_id !== req.decodedUser.id) {
          return res.json({
            error: "You cannot delete a diary that belongs to someone else.",
          });
        }
        targetDiary.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json({ error: err.error });
      }
    });

  return router;
};
