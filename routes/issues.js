const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Issue, Diary } = models;
  router
    // create new issue
    .post("/", async (req, res) => {
      try {
        const newIssue = await Issue.create({ ...req.body });
        return res.json(newIssue);
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    })

    // get individual issue
    .get("/:uuid", async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          where: {
            uuid,
          },
        });
        return res.json(targetIssue);
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    })

    // update issue
    .patch("/:uuid", async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          where: {
            uuid,
          },
        });
        for (const attribute of targetIssue) {
          if (req.body[attribute]) {
            targetIssue[attribute] = req.body[attribute];
          }
        }
        await targetIssue.save();
        return res.json(targetIssue);
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    })

    // delete issue
    .delete("/:uuid", async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          where: {
            uuid,
          },
        });
        await targetIssue.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    });

  return router;
};
