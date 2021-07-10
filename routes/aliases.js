const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Diary, Alias } = models;
  router

    .get("/:alias", async (req, res) => {
      try {
        const aliasEntry = await models.Alias.findOne({
          where: {
            name: req.params.alias,
          },
        });
        if (!aliasEntry) {
          return res.end("no alias found");
        }
        return res.json(aliasEntry);
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
