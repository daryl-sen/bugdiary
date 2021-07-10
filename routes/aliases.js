const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Diary } = models;
  router

    .get("/:alias", async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            alias: req.params.alias,
          },
        });
        if (!targetDiary) {
          res.redirect(`/errors`);
        }
        return res.redirect(`/diary/${targetDiary.uuid}`);
      } catch (err) {
        console.log(err);
        res.json(err);
      }
    })

    .post("/", async (req, res) => {
      try {
        const { aliasName, diaryId } = req.body;

        let target = await Alias.findOne({
          where: {
            name: aliasName,
          },
        });

        if (target) {
          return res.json({ error: "This alias is already in use." });
        }

        target = await Alias.create({
          ...req.body,
        });

        res.json(target);
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    });

  return router;
};
