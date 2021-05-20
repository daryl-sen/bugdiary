const models = require("../models");

const fs = require("fs");

const [
  users,
  comments,
  diaries,
  locations,
  tags,
  types,
  upvotes,
  userTypes,
  versions,
] = [
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/users.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/comments.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/diaries.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/issues.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/locations.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/tags.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/types.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/upvotes.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/userTypes.json")),
  JSON.parse(fs.readFileSync("./seeders/JSONseeds/versions.json")),
];

console.log(users);

for (const modelName in models) {
  if (modelName !== "Sequelize" && modelName !== "sequelize") {
    console.log(true, modelName);
  }
}
