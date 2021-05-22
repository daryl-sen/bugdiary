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
      for (const errorObj of error.errors) {
        const { message, type, value } = errorObj;
        console.log(`ERROR: ${type}\n${message}\nValue received:${value}`);
      }
      return res.status(200).json({ errors: error.errors });
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
    try {
      //
    } catch (error) {
      //
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
