require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

const users = require("./routes/users");
const comments = require("./routes/comments");
const diaries = require("./routes/diaries");
const issues = require("./routes/issues");
const upvotes = require("./routes/upvotes");
const db = require("./models");

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
