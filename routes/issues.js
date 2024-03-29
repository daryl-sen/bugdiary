const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const {
    Issue,
    Diary,
    Location,
    Type,
    Version,
    Sequelize,
    Status,
    sequelize,
  } = models;
  const { Op } = Sequelize;
  router
    // create new issue
    .post("/", authenticateToken, async (req, res) => {
      try {
        const transaction = await sequelize.transaction();
        const issueCount = await Issue.count({
          where: {
            diary_id: req.body.diary_id,
          },
        });

        let refLocation = await Location.findOne({
          where: {
            name: req.body.location_name.toLowerCase(),
            diary_id: req.body.diary_id,
          },
        });
        if (!refLocation) {
          refLocation = await Location.create({
            name: req.body.location_name.toLowerCase(),
            diary_id: req.body.diary_id,
          });
        }
        let refType = await Type.findOne({
          where: {
            name: req.body.type_name.toLowerCase(),
            diary_id: req.body.diary_id,
          },
        });
        if (!refType) {
          refType = await Type.create({
            name: req.body.type_name.toLowerCase(),
            diary_id: req.body.diary_id,
          });
        }

        const newIssue = await Issue.create({
          ...req.body,
          type_id: refType.id,
          location_id: refLocation.id,
          status_id: 2,
          reference: req.body.reference || "#" + (issueCount + 1),
        });

        newIssue.dataValues.Type = refType;
        newIssue.dataValues.Location = refLocation;
        newIssue.dataValues.Status = await Status.findOne({ where: { id: 2 } });

        await transaction.commit();

        return res.json(newIssue);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
    })

    // search for issues (UUID belongs to DIARY)
    .get("/:uuid/search", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      const { showResolved, showDeleted, searchTerm } = req.query;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "No diary found." });
        }

        const auth = checkDiaryAuth(targetDiary, req.auth.userInfo, req);

        const issues = await Issue.findAll({
          include: [Type, Location, Version, Status],
          where: {
            status_id: [
              2,
              1,
              showResolved > 0 ? 4 : undefined,
              showDeleted > 0 ? 5 : undefined,
            ],
            private: auth.authenticated ? [1, 0] : 0,
            diary_id: targetDiary.id,
            [Op.or]: [
              { details: { [Op.iLike]: "%" + searchTerm.toLowerCase() + "%" } },
              {
                reference: { [Op.iLike]: "%" + searchTerm.toLowerCase() + "%" },
              },
              {
                reporter_name: {
                  [Op.iLike]: "%" + searchTerm.toLowerCase() + "%",
                },
              },
            ],
          },
          order: [
            ["status_id", "ASC"],
            ["id", "DESC"],
          ],
        });
        return res.json({ issues });
      } catch (err) {
        console.log(err);
        return res.json({ error: err });
      }
    })

    // get individual issue (UUID belongs to ISSUE)
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
          include: [Diary, Status],
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
