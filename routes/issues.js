const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { Issue, Diary, Location, Type } = models;
  router
    // create new issue
    .post("/", async (req, res) => {
      try {
        let refLocation = await Location.findOne({
          where: {
            name: req.body.location_name,
            diary_id: req.body.diary_id,
          },
        });
        if (!refLocation) {
          refLocation = await Location.create({
            name: req.body.location_name,
            diary_id: req.body.diary_id,
          });
        }
        let refType = await Type.findOne({
          where: {
            name: req.body.type_name,
            diary_id: req.body.diary_id,
          },
        });
        if (!refType) {
          refType = await Type.create({
            name: req.body.type_name,
            diary_id: req.body.diary_id,
          });
        }

        const newIssue = await Issue.create({
          ...req.body,
          type_id: refType.id,
          location_id: refLocation.id,
          reference: req.body.reference ? req.body.reference : undefined,
        });
        return res.json("newIssue");
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
    .patch("/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id, req.body.status);
      try {
        const targetIssue = await Issue.findOne({
          where: {
            id,
          },
        });
        for (const attribute in targetIssue.dataValues) {
          if (req.body[attribute]) {
            console.log("update", attribute);
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
