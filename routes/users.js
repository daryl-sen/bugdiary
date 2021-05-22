const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  // create user
  router.post("/user", async (req, res) => {
    try {
      const newUser = await User.create({ ...req.body });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(200).json({ error: error.errors });
    }
  });

  // login user
  router.post("/login", async (req, res) => {
    try {
      //
    } catch (error) {
      //
    }
  });

  // logout user
  router.post("/logout", async (req, res) => {
    try {
      //
    } catch (error) {
      //
    }
  });

  // update user
  router.patch("/user", async (req, res) => {
    const { uuid } = req.body;
    // return res.json(uuid);
    try {
      const targetUser = await User.findOne({
        where: {
          uuid,
        },
      });
      if (!targetUser) {
        return res.json({ error: "User not found" });
      }
      // dynamically update all keys provided in req.body
      for (const attribute in req.body) {
        targetUser[attribute] = req.body[attribute];
      }
      await targetUser.save();
      return res.json(targetUser);
    } catch (error) {
      return res.json({ error: error.errors });
    }
  });

  // delete user
  router.delete("/user", async (req, res) => {
    try {
      //
    } catch (error) {
      //
    }
  });

  return router;
};
