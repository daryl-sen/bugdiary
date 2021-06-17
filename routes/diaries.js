const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  generateToken,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Diary, Issue, Version, Type, Location } = models;
  router

    .post("/passcode-auth/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      const receivedPasscode = req.body.passcode;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "Diary not found." });
        }

        if (targetDiary.passcode === receivedPasscode) {
          let token;
          if (!req.auth.error) {
            token = generateToken({
              ...req.auth,
              authenticatedDiaries: [
                ...req.auth.authenticatedDiaries,
                targetDiary.uuid,
              ],
            });
          } else {
            token = generateToken({
              authenticatedDiaries: [targetDiary.uuid],
            });
          }
          req.session.jwt = token;
          return res.json({ success: true });
        }
        console.log(targetDiary.passcode, receivedPasscode);
        return res.json({ error: "Incorrect diary passcode." });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    // get information required for setting up new issues
    .get("/issue-setup/:uuid", async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        const diaryLocations = await Location.findAll({
          where: {
            diary_id: targetDiary.id,
          },
        });
        const diaryTypes = await Type.findAll({
          where: {
            diary_id: targetDiary.id,
          },
        });
        let latestVersion = await Version.findAll({
          limit: 1,
          where: {
            diary_id: targetDiary.id,
          },
          order: [["createdAt", "DESC"]],
        });
        if (!latestVersion) {
          latestVersion = await Version.create({
            name: "v1.0.0",
          });
        }
        return res.json({
          targetDiary,
          diaryLocations,
          diaryTypes,
          latestVersion,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
    })

    // all diaries belonging to the current user
    .get("/", authenticateToken, async (req, res) => {
      if (!req.auth.status) {
        return res.json({
          error: "You must be logged in to see all your diaries.",
        });
      }

      try {
        const userDiaries = await Diary.findAll({
          where: {
            user_id: req.auth.user.id,
          },
        });
        return res.json(userDiaries);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.errors });
      }
    })

    // specific diary
    .get("/:uuid", authenticateToken, async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.uuid,
          },
        });

        const issues = await Issue.findAll({
          include: [Type, Location, Version],
          where: {
            diary_id: targetDiary.id,
            private: req.auth.status ? 1 : 0, // true or false
          },
          order: [["id", "DESC"]],
        });

        return res.json({
          targetDiary,
          issues,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    // create diary
    .post("/", async (req, res) => {
      try {
        const newDiary = await Diary.create({ ...req.body });
        return res.json(newDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    // update diary
    .patch("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        for (const attribute in req.body) {
          targetDiary[attribute] = req.body[attribute];
        }
        await targetDiary.save();
        return res.json(targetDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })

    // delete diary
    .delete("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        if (targetDiary.user_id !== req.decodedUser.id) {
          return res.json({
            error: "You cannot delete a diary that belongs to someone else.",
          });
        }
        targetDiary.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.error });
      }
    })

    .patch("/extend/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });
        const newExpiry = new Date();
        newExpiry.setTime(newExpiry.getTime() + 90 * 24 * 60 * 60 * 1000);
        targetDiary.expiry_date = newExpiry;
        await targetDiary.save();
        return res.json(targetDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    });

  return router;
};
