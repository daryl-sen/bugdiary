const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Diary, Type } = models;
  router

    // create new type
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

        const newType = await Type.create({
          name: req.body.name.toLowerCase(),
          diary_id: targetDiary.id,
        });
        return res.json(newType);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // read all types
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

        return res.json(await targetDiary.getTypes());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update type
    .patch("/:id", authenticateToken, async (req, res) => {
      try {
        const targetType = await Type.findOne({
          include: [Diary],
          where: {
            id: req.params.id,
          },
        });

        if (!targetType) {
          return res.json({ error: "No type with this id." });
        }

        const check = checkDiaryAuth(targetType.Diary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        targetType.name = req.body.name;
        await targetType.save();
        return res.json(targetType);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // delete type
    .delete("/:id", authenticateToken, async (req, res) => {
      try {
        const targetType = await Type.findOne({
          include: [Diary],
          where: {
            id: req.params.id,
          },
        });

        if (!targetType) {
          return res.json({ error: "No type with this id." });
        }

        const check = checkDiaryAuth(targetType.Diary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        targetType.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
