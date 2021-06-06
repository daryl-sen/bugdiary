const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

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
        const newLocation = await Location.create({
          ...req.body,
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
        return res.json(await targetDiary.getLocations());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update location
    .patch("/", authenticateToken, async (req, res) => {
      try {
        const targetLocation = await Location.findOne({
          where: {
            id: req.body.id,
          },
        });
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
        targetLocation.destroy();
        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
