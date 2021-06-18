const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Issue, Diary, Location, Type } = models;
  router
    // create new issue
    .post("/", authenticateToken, async (req, res) => {
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
        return res.json(newIssue);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
    })

    // get individual issue
    .get("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          where: {
            uuid,
          },
        });

        if (!targetIssue) {
          return res.json({ error: "No issue with this UUID exists." });
        }

        return res.json(targetIssue);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
    })

    // update issue
    .patch("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          include: [Diary],
          where: {
            uuid,
          },
        });

        if (!targetIssue) {
          return res.json({ error: "No issue with this UUID exists." });
        }

        const check = checkDiaryAuth(targetIssue.Diary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        for (const attribute in targetIssue.dataValues) {
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
    .delete("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetIssue = await Issue.findOne({
          where: {
            uuid,
          },
        });

        if (!targetIssue) {
          return res.json({ error: "No issue with this UUID exists." });
        }

        const check = checkDiaryAuth(targetIssue.Diary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        await targetIssue.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    });

  return router;
};
