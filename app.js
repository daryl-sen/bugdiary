require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const { sequelize, User } = require("./models");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("Hello");
});

const users = require("./routes/users");
const comments = require("./routes/comments");
const diaries = require("./routes/diaries");
const issues = require("./routes/issues");
const upvotes = require("./routes/upvotes");
const db = require("./models");

app.use("/api/users", users(db));
app.use("/api/comments", comments(db));
app.use("/api/diaries", diaries(db));
app.use("/api/issues", issues(db));
app.use("/api/upvotes", upvotes(db));

app.listen(PORT, async () => {
  try {
    // await sequelize.sync({ force: true });
    console.log(`Running on port: ${PORT}`);
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    return console.log(error);
  }
});
