const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Version, User } = models;
  router

    // create new version
    .post("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read version
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read all versions
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // update version
    .patch("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // delete version
    .delete("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    });
  return router;
};
