require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const { sequelize, User } = require("./models");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("Hello");
});

// app.post("/create-user", async (req, res) => {
//   const { name, email, role } = req.body;

//   try {
//     const user = await User.create({ name, email, role });
//     return res.json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true });
    console.log(`Running on port: ${PORT}`);
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    return console.log(error);
  }
});
