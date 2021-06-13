const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, Version } = models;
  router

    // create new version
    .post("/", async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        const newVersion = await Version.create({
          ...req.body,
          diary_id: targetDiary.id,
        });
        return res.json(newVersion);
      } catch (err) {
        console.log(err);
        return res.json({ error: err });
      }
    })

    // read all versions
    .get("/:diaryUuid", async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.diaryUuid,
          },
        });
        return res.json(await targetDiary.getVersions());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update version
    .patch("/", authenticateToken, async (req, res) => {
      try {
        const targetVersion = await Version.findOne({
          where: {
            id: req.body.id,
          },
        });
        targetVersion.name = req.body.name;
        await targetVersion.save();
        return res.json(targetVersion);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // delete version
    .delete("/:id", authenticateToken, async (req, res) => {
      try {
        const targetVersion = await Version.findOne({
          where: {
            id: req.params.id,
          },
        });
        targetVersion.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
