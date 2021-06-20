require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");

const models = require("./models");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SESSION_SECRET],
    maxAge: process.env.MAX_COOKIE_AGE,
  })
);

const users = require("./routes/users");
const comments = require("./routes/comments");
const diaries = require("./routes/diaries");
const issues = require("./routes/issues");
const upvotes = require("./routes/upvotes");
const types = require("./routes/issueTypes");
const locations = require("./routes/issueLocations");
const tags = require("./routes/issueTags");
const versions = require("./routes/IssueVersions");

app.use("/api/users", users(models));
app.use("/api/diaries", diaries(models));
app.use("/api/diaries/issues", issues(models));
app.use("/api/diaries/issues/comments", comments(models));
app.use("/api/diaries/issues/upvotes", upvotes(models));
app.use("/api/diaries/issues/types", types(models));
app.use("/api/diaries/issues/locations", locations(models));
app.use("/api/diaries/issues/tags", tags(models));
app.use("/api/diaries/issues/versions", versions(models));

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, async () => {
  try {
    console.log(`Running on port: ${PORT}`);
    await models.sequelize.authenticate();
    console.log("Connected to database");
    if (process.env.RESETDB === "true") {
      await models.sequelize.sync({ force: true });
      console.log("Synced all models. All data have been deleted.");
    }
  } catch (error) {
    return console.log(error);
  }
});
