const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Tag, User } = models;
  router

    // create new tag
    .post("/", authenticateToken, async (req, res) => {
      try {
        const newTag = await Tag.create({ ...req.body });
        return res.json(newTag);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // read all tags
    .get("/:diaryUuid", authenticateToken, async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.diaryUuid,
          },
        });
        return res.json(await targetDiary.getTags());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update tag
    .patch("/", authenticateToken, async (req, res) => {
      try {
        const targetTag = await Tag.findOne({
          where: {
            id: req.body.id,
          },
        });
        targetTag.name = req.body.name;
        await targetTag.save();
        return res.json(targetTag);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // delete tag
    .delete("/:id", authenticateToken, async (req, res) => {
      try {
        const targetTag = await Tag.findOne({
          where: {
            id: req.params.id,
          },
        });
        targetTag.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
