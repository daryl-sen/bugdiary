const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

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
        const newType = await Type.create({
          ...req.body,
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
        return res.json(await targetDiary.getTypes());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update type
    .patch("/", authenticateToken, async (req, res) => {
      try {
        const targetType = await Type.findOne({
          where: {
            id: req.body.id,
          },
        });
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
          where: {
            id: req.params.id,
          },
        });
        targetType.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
