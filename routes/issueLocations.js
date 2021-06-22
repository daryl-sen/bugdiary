const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkDiaryAuth,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { Diary, Location } = models;
  router

    // create new location
    .post("/", authenticateToken, async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "No diary with this UUID." });
        }

        const newLocation = await Location.create({
          name: req.body.name.toLowerCase(),
          diary_id: targetDiary.id,
        });
        return res.json(newLocation);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // read all locations
    .get("/:diaryUuid", authenticateToken, async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.diaryUuid,
          },
        });

        if (!targetDiary) {
          return res.json({ error: "No diary with this UUID." });
        }

        return res.json(await targetDiary.getLocations());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update location
    .patch("/:id", authenticateToken, async (req, res) => {
      try {
        const targetLocation = await Location.findOne({
          include: [Diary],
          where: {
            id: req.params.id,
          },
        });

        if (!targetLocation) {
          return res.json({ error: "No location with this id." });
        }

        const check = checkDiaryAuth(
          targetLocation.Diary,
          req.auth.userInfo,
          req
        );
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        targetLocation.name = req.body.name;
        await targetLocation.save();
        return res.json(targetLocation);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // delete location
    .delete("/:id", authenticateToken, async (req, res) => {
      try {
        const targetLocation = await Location.findOne({
          where: {
            id: req.params.id,
          },
        });

        if (!targetLocation) {
          return res.json({ error: "No location with this id." });
        }

        const check = checkDiaryAuth(
          targetLocation.Diary,
          req.auth.userInfo,
          req
        );
        if (!check.authenticated) {
          return res.json({ error: check.message });
        }

        targetLocation.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
