const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Diary, User, Issue, Location } = models;
  router

    // create new location
    .post("/l", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read location
    .get("/l", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read all locations
    .get("/l", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // update location
    .patch("/l", authenticateToken, (req, res) => {
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
};
