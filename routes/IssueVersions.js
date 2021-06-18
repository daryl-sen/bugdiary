const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Diary, Version } = models;
  router

    // create new version
    .post("/", authenticateToken, async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "No diary with this UUID." });
        }

        const newVersion = await Version.create({
          ...req.body,
          diary_id: targetDiary.id,
        });
        return res.json(newVersion);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // read all versions
    .get("/:diaryUuid", authenticateToken, async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.diaryUuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "No diary with this UUID." });
        }

        return res.json(await targetDiary.getVersions());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update version
    .patch("/:id", authenticateToken, async (req, res) => {
      try {
        const targetVersion = await Version.findOne({
          include: [Diary],
          where: {
            id: req.params.id,
          },
        });

        if (!targetVersion) {
          return res.json({ error: "No version with this id." });
        }

        const check = checkDiaryAuth(
          targetVersion.Diary,
          req.auth.userInfo,
          req
        );
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

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

        if (!targetVersion) {
          return res.json({ error: "No version with this id." });
        }

        targetVersion.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
