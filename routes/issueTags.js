const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Tag, User } = models;
  router

    // create new tag
    .post("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read tag
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read all tags
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // update tag
    .patch("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // delete tag
    .delete("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    });
};
