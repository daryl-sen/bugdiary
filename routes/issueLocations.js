const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Location, User } = models;
  router

    // create new location
    .post("/", authenticateToken, async (req, res) => {
      try {
        const newLocation = await Location.create({ ...req.body });
        return res.json(newLocation);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })

    // read location
    .get("/", authenticateToken, async (req, res) => {
      const uuid = req.body.uuid;
      try {
        const targetLocation = await Location.findOne({
          where: {
            uuid,
          },
        });
        return res.json(targetLocation);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // read all locations
    .get("/:diaryUuid", async (req, res) => {
      try {
        const targetDiary = await Diary.findOne({
          where: {
            uuid: req.params.diaryUuid,
          },
        });
        console.log(await targetDiary.getLocations());
        return res.json(await targetDiary.getLocations());
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // update location
    .patch("/", authenticateToken, async (req, res) => {
      try {
        const targetLocation = Location.findOne({
          where: {
            id: req.body.id,
          },
        });
        targetLocation.name = req.body.name;
        targetLocation.save();
        return res.json(targetLocation);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    })

    // delete location
    .delete("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    });
  return router;
};
