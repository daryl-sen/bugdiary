const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authenticate-token");

module.exports = (models) => {
  const { Issue, Diary, Type, User } = models;
  router

    // create new type
    .post("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read type
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // read all types
    .get("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // update type
    .patch("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    })

    // delete type
    .delete("/", authenticateToken, (req, res) => {
      try {
        //
      } catch (err) {
        //
      }
    });
};
