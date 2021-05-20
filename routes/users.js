const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  router.get("/", (req, res) => {
    res.end("users route");
  });

  router.post("/create-role", async (req, res) => {
    try {
      const newUserType = await UserType.create({ ...req.body });
      return res.json(JSON.stringify(newUserType));
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const newUser = await User.create({ ...req.body });
      return res.json(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
    res.end("An error has occured");
  });

  return router;
};
