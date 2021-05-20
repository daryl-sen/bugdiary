const models = require("../models");
const fs = require("fs");

const getContent = (path) => {
  return JSON.parse(fs.readFileSync(path));
};

const jsonData = {
  User: getContent("./seeders/JSONseeds/users.json"),
  Comment: getContent("./seeders/JSONseeds/comments.json"),
  Diary: getContent("./seeders/JSONseeds/diaries.json"),
  Issue: getContent("./seeders/JSONseeds/issues.json"),
  Location: getContent("./seeders/JSONseeds/locations.json"),
  Tag: getContent("./seeders/JSONseeds/tags.json"),
  Type: getContent("./seeders/JSONseeds/types.json"),
  Upvote: getContent("./seeders/JSONseeds/upvotes.json"),
  UserType: getContent("./seeders/JSONseeds/userTypes.json"),
  Version: getContent("./seeders/JSONseeds/versions.json"),
};

for (const modelName in models) {
  if (modelName !== "Sequelize" && modelName !== "sequelize") {
    for (const instance of jsonData[modelName]) {
      models[modelName].create({ ...instance });
    }
    console.log(`Created entries for "${modelName}" model.`);
  }
}
