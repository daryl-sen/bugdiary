const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
  addAuthenticatedDiary,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Diary, Issue, Version, Type, Location, Status } = models;
  router

    .post("/passcode-auth/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      const receivedPasscode = req.body.passcode;

      if (
        req.session.authenticatedDiaries &&
        req.session.authenticatedDiaries.includes(uuid)
      ) {
        return res.json({ error: "Already authenticated." });
      }

      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "Diary not found." });
        }

        if (!targetDiary.passcode && targetDiary.user_id) {
          return res.json({
            error:
              "The owner of this diary has not set up sharing by passcode. Only the owner can modify this diary.",
          });
        }

        if (!(await targetDiary.checkPassword(receivedPasscode))) {
          return res.json({ error: "You have entered an incorrect password." });
        } else {
          addAuthenticatedDiary(targetDiary.uuid, req);
          return res.json(targetDiary);
        }
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

        if (!targetDiary) {
          return res.json({ error: "There is no diary with that UUID." });
        }

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
        return res.status(500).json({ error: err });
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
            user_id: req.auth.userInfo.id,
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
      console.log("fetching diary content");
      const { showResolved, showDeleted } = req.query;

      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.uuid,
          },
        });
        if (!targetDiary) {
          return res.json({ error: "No diary associated with this UUID." });
        }

        const resolvedCount = await targetDiary.countIssues({
          where: {
            status_id: 4,
          },
        });
        const pendingCount = await targetDiary.countIssues({
          where: {
            status_id: 2,
          },
        });
        const prioritizedCount = await targetDiary.countIssues({
          where: {
            status_id: 1,
          },
        });

        const auth = checkDiaryAuth(targetDiary, req.auth.userInfo, req);

        const issues = await Issue.findAll({
          include: [Type, Location, Version, Status],
          where: {
            diary_id: targetDiary.id,
            private: auth.authenticated ? [1, 0] : 0,
            status_id: [
              2,
              1,
              showResolved > 0 ? 4 : undefined,
              showDeleted > 0 ? 5 : undefined,
            ],
          },
          order: [
            ["status_id", "ASC"],
            ["id", "DESC"],
          ],
        });
        return res.json({
          targetDiary,
          issues,
          counts: {
            pendingCount,
            resolvedCount,
            prioritizedCount,
          },
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    // create diary
    .post("/", authenticateToken, async (req, res) => {
      try {
        const newDiary = await Diary.create({
          ...req.body,
          user_id: req.auth.userInfo ? req.auth.userInfo.id : null,
          // uuid: undefined,
          expiry_date: undefined,
          created_at: undefined,
        });
        addAuthenticatedDiary(newDiary.uuid, req);
        return res.json(newDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    // update diary
    .patch("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        const check = checkDiaryAuth(targetDiary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        for (const attribute in req.body) {
          if (attribute === "passcode") {
            targetDiary.passcode = await Diary.generateHash(req.body.passcode);
          } else if (attribute === "alias") {
            const duplicate = await Diary.findOne({
              where: {
                alias: req.body.alias,
              },
            });
            if (duplicate) {
              return res.json({ error: "This alias is currently in use." });
            }
          } else {
            targetDiary[attribute] = req.body[attribute];
          }
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

        const check = checkDiaryAuth(targetDiary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
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

        const check = checkDiaryAuth(targetDiary, req.auth.userInfo, req);
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        const newExpiry = new Date();
        newExpiry.setTime(newExpiry.getTime() + 90 * 24 * 60 * 60 * 1000);
        targetDiary.expiry_date = newExpiry;
        await targetDiary.save();
        return res.json(targetDiary);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    })

    .get("/counts/:uuid", async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.uuid,
          },
        });
        if (!targetDiary) {
          return res.json({ error: "No diary associated with this UUID." });
        }

        const resolvedCount = await targetDiary.countIssues({
          where: {
            status_id: 4,
          },
        });
        const pendingCount = await targetDiary.countIssues({
          where: {
            status_id: 2,
          },
        });
        const prioritizedCount = await targetDiary.countIssues({
          where: {
            status_id: 1,
          },
        });

        res.json({
          resolvedCount,
          pendingCount,
          prioritizedCount,
        });
      } catch (err) {
        console.log(err);
        res.json({ error: "Could not fetch diary stats." });
      }
    });

  return router;
};
