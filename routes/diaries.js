const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, Issue, Version, Type, Location } = models;
  router

    // get information required for setting up new issues
    .get("/issue-setup/:uuid", async (req, res) => {
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
    .get("/:uuid", async (req, res) => {
      const targetUuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: targetUuid,
          },
        });

        const issuesPending = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
            status: "PENDING",
          },
          order: [["id", "DESC"]],
        });

        const issuesPrioritized = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
            status: "PRIORITIZED",
          },
          order: [["id", "DESC"]],
        });

        const issuesResolved = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
            status: "RESOLVED",
          },
          order: [["id", "DESC"]],
        });

        const issuesDeleted = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
            status: "DELETED",
          },
          order: [["id", "DESC"]],
        });

        return res.json({
          targetDiary,
          issuesPending,
          issuesPrioritized,
          issuesDeleted,
          issuesResolved,
        });
      } catch (err) {
        console.log(err);
        return res.end("diaries route");
      }
    })

    // create diary
    .post("/diary", async (req, res) => {
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
    })

    .patch("/extend/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        const newExpiry = new Date();
        newExpiry.setTime(newExpiry.getTime() + 90 * 24 * 60 * 60 * 1000);
        targetDiary.expiry_date = newExpiry;
        await targetDiary.save();
        return res.json(targetDiary);
      } catch (err) {
        console.log(err);
        return res.json({ error: err });
      }
    });

  return router;
};
