require("dotenv").config();

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");
const jwt = require("jsonwebtoken");

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  // create user - no authentication required
  router
    .post("/user", async (req, res) => {
      try {
        const newUser = await User.create({ ...req.body });
        const accessToken = jwt.sign(
          {
            id: newUser.id,
            name: newUser.display_name,
            uuid: newUser.uuid,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        req.session.jwt = accessToken;
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(200).json({ error: error.errors });
      }
    })

    .get("/check-token", async (req, res) => {
      if (!req.session.jwt) {
        return res.status(401).json({
          error: "Not logged in",
        });
      }
      return res.json({
        jwt: req.session.jwt,
      });
    })

    // .get("/check-unique", async (req, res) => {
    //   const email = req.query.email;
    //   const existingEmail = await User.count({
    //     where: {
    //       email,
    //     },
    //   });
    //   console.log(email);
    //   if (existingEmail) {
    //     return res.status(200).json({ unique: false });
    //   }
    //   return res.status(200).json({ unique: true });
    // })

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

        if (!(await targetUser.checkPassword(password))) {
          return res.json({ error: "You have entered an incorrect password." });
        }

        const accessToken = jwt.sign(
          {
            id: targetUser.id,
            name: targetUser.display_name,
            uuid: targetUser.uuid,
          },
          process.env.ACCESS_TOKEN_SECRET
        );

        req.session.jwt = accessToken;
        res.json({ accessToken });
      } catch (error) {
        console.log(error);
        res.json({ error: error.errors });
      }
    })

    // logout user - no authentication required
    .post("/logout", async (req, res) => {
      if (req.session.jwt) {
        req.session = null;
        return res.json({ success: "Logged out" });
      }
      return res.json({ error: "Not logged in." });
    })

    // update user - authentication required
    .patch("/user", authenticateToken, async (req, res) => {
      const { uuid } = req.body;

      if (req.decodedUser.uuid !== uuid) {
        return res
          .status(401)
          .json({ error: "You can only update your own account details." });
      }

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
