require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");

const {
  sequelize,
  User,
  Comment,
  Diary,
  Issue,
  Location,
  Tag,
  Type,
  Upvote,
  UserType,
  Version,
} = require("./models");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SESSION_SECRET],
    maxAge: process.env.MAX_COOKIE_AGE,
  })
);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

const users = require("./routes/users");
const comments = require("./routes/comments");
const diaries = require("./routes/diaries");
const issues = require("./routes/issues");
const upvotes = require("./routes/upvotes");
const types = require("./routes/issueTypes");
const locations = require("./routes/issueLocations");
const tags = require("./routes/issueTags");
const versions = require("./routes/IssueVersions");
// const db = require("./models");

app.use("/api/users", users({ User, UserType, Comment, Upvote }));
app.use("/api/comments", comments({ Comment, Issue, User }));
app.use(
  "/api/diaries",
  diaries({ Diary, User, Issue, Version, Type, Tag, Location })
);
app.use(
  "/api/issues",
  issues({ Issue, Diary, Comment, Upvote, Location, Type, Version, Tag })
);
app.use("/api/upvotes", upvotes({ Upvote, Issue, User }));
app.use("/api/types", types({ Issue, Diary, Type, User }));
// app.use("/api/locations", locations({ Issue, Diary, Location, User }));
// app.use("/api/tags", tags({ Issue, Diary, Tag, User }));
// app.use("/api/versions", versions({ Issue, Diary, Version, User }));

app.listen(PORT, async () => {
  try {
    console.log(`Running on port: ${PORT}`);
    await sequelize.authenticate();
    console.log("Connected to database");
    if (process.env.RESETDB === "true") {
      await sequelize.sync({ force: true });
      console.log("Synced all models. All data have been deleted.");
    }
  } catch (error) {
    return console.log(error);
  }
});
