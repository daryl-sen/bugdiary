const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Location, User } = models;
  router

    // create new location
    .post("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read location
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read all locations
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // update location
    .patch("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // delete location
    .delete("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    });
  return router;
};
