require("dotenv").config();

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  // create user - no authentication required
  router
    .post("/user", async (req, res) => {
      try {
        const newUser = await User.create({ ...req.body });
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(200).json({ error: error.errors });
      }
    })

    // login user - no authentication required
    .post("/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const targetUser = await User.findOne({
          where: {
            email,
          },
        });
        if (!targetUser) {
          return res.json({ error: "User does not exist." });
        }
        const accessToken = jwt.sign(
          {
            name: targetUser.display_name,
            uuid: targetUser.uuid,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken });
      } catch (error) {
        console.log(error.errors);
        res.json({ error: error.errors });
      }
    })

    // logout user - no authentication required
    .post("/logout", async (req, res) => {
      try {
        //
      } catch (error) {
        //
      }
    })

    // update user - authentication required
    .patch("/user", authenticateToken, async (req, res) => {
      const { uuid } = req.body;
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
    })

    // delete user - authentication required
    .delete("/user", authenticateToken, async (req, res) => {
      const { uuid } = req.body;
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
        await targetUser.destroy();
        return res.json({ success: "User deleted." });
      } catch (error) {
        return res.json({ error: error.errors });
      }
    });

  return router;
};
