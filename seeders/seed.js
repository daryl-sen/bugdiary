const models = require("../models");
const fs = require("fs");

const jsonData = {
  User: JSON.parse(fs.readFileSync("./seeders/JSONseeds/users.json")),
  Comment: JSON.parse(fs.readFileSync("./seeders/JSONseeds/comments.json")),
  Diary: JSON.parse(fs.readFileSync("./seeders/JSONseeds/diaries.json")),
  Issue: JSON.parse(fs.readFileSync("./seeders/JSONseeds/issues.json")),
  Location: JSON.parse(fs.readFileSync("./seeders/JSONseeds/locations.json")),
  Tag: JSON.parse(fs.readFileSync("./seeders/JSONseeds/tags.json")),
  Type: JSON.parse(fs.readFileSync("./seeders/JSONseeds/types.json")),
  Upvote: JSON.parse(fs.readFileSync("./seeders/JSONseeds/upvotes.json")),
  UserType: JSON.parse(fs.readFileSync("./seeders/JSONseeds/userTypes.json")),
  Version: JSON.parse(fs.readFileSync("./seeders/JSONseeds/versions.json")),
};

for (const modelName in models) {
  if (modelName !== "Sequelize" && modelName !== "sequelize") {
    for (const instance of jsonData[modelName]) {
      models[modelName].create({ ...instance });
    }
    console.log(`Created entries for "${modelName}" model.`);
  }
}
