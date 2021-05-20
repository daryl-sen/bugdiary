const express = require("express");
const router = express.Router();

module.exports = (models) => {
  const { User, UserType, Comment, Upvote } = models;

  router.post("/user-role", async (req, res) => {
    try {
      const newUserType = await UserType.create({ ...req.body });
      return res.json(JSON.stringify(newUserType));
    } catch (error) {
      console.log(error);
    }
  });

  router.delete("/user-role", async (req, res) => {
    const { roleId } = req.body;
    try {
      const targetRole = await UserType.findOne({
        where: { id: roleId },
      });
      targetRole.destroy();
      return res.end("Deleted");
    } catch (error) {
      console.log(error);
    }
    res.end("Error");
  });

  router.post("/create", async (req, res) => {
    try {
      const newUser = await User.create({ ...req.body });
      return res.json(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
    res.end("An error has occured");
  });

  return router;
};
