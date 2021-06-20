const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  generateToken,
  verifyToken,
} = require("../helpers/jwtAuthentication");

module.exports = (models) => {
  const { User } = models;

  router
    .post("/", async (req, res) => {
      try {
        const newUser = await User.create({ ...req.body });
        const accessToken = generateToken({
          id: newUser.id,
          name: newUser.display_name,
          uuid: newUser.uuid,
        });
        req.session.jwt = accessToken;
        return res.status(201).json({ newUser, accessToken });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.errors });
      }
    })

    .get("/check-token", authenticateToken, async (req, res) => {
      if (!req.session.jwt && !req.auth.status) {
        return res.json({
          loggedIn: false,
          message: "Not logged in - no JWT or invalid JWT.",
        });
      } else if (req.session.jwt) {
        const userInfo = verifyToken(req.session.jwt);
        return res.json({
          loggedIn: true,
          userInfo: {
            name: userInfo.name,
            uuid: userInfo.uuid,
            id: userInfo.id,
            jwt: req.session.jwt,
          },
        });
      }
      return res.json({ loggedIn: true, message: "Logged in." });
    })

    .get("/check-unique", async (req, res) => {
      const email = req.query.email;
      const existingEmail = await User.count({
        where: {
          email,
        },
      });
      if (existingEmail) {
        return res.json({ unique: false });
      }
      return res.json({ unique: true });
    })

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

        const accessToken = generateToken({
          id: targetUser.id,
          name: targetUser.display_name,
          uuid: targetUser.uuid,
        });

        req.session.jwt = accessToken;
        res.json({ targetUser, accessToken });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    })

    .post("/logout", async (req, res) => {
      req.session = null;
      if (req.session.jwt) {
        return res.json({ success: "Logged out" });
      }
      return res.json({ error: "Not logged in." });
    })

    .patch("/", authenticateToken, async (req, res) => {
      const { uuid } = req.body;

      if (!req.auth.userInfo) {
        return res.json({
          error: "You must be logged in to change your account details.",
        });
      }

      if (req.auth.userInfo.uuid !== uuid) {
        return res.json({
          error: "You can only update your own account details.",
        });
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
        for (const attribute in req.body) {
          targetUser[attribute] = req.body[attribute];
        }
        await targetUser.save();
        return res.json(targetUser);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.errors });
      }
    })

    // delete user - authentication required
    .delete("/:uuid", authenticateToken, async (req, res) => {
      const uuid = req.params.uuid;

      if (!req.auth.userInfo) {
        return res.json({
          error: "You must be logged in to change your account details.",
        });
      }

      if (req.auth.userInfo.uuid !== uuid) {
        return res.json({
          error: "You cannot delete somebody else's account.",
        });
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
        await targetUser.destroy();
        return res.json({ success: "User deleted." });
      } catch (error) {
        return res.status(500).json({ error: error.errors });
      }
    });

  return router;
};
