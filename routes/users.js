const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  // create user
  router.post("/user", async (req, res) => {
    try {
      //
    } catch (error) {
      //
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
