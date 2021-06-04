const axios = require("axios");
const BASE_URL = "http://localhost:3000";
const models = require("../models");

class MockUser {
  constructor(uuid, displayName, email, password, bio, userTypeId) {
    this.uuid = uuid;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.bio = bio;
    this.userTypeId = userTypeId;
    this.jwt = undefined;
  }

  static async clearDb(seedUserTypes) {
    await models.sequelize.sync({ force: true });

    if (seedUserTypes) {
      const mockUserTypes = [
        {
          type: "regular",
          description: "Regular user without special privileges.",
        },
        {
          type: "special",
          description: "A special user who enjoys some privileges.",
        },
        {
          type: "admin",
          description: "A user who helps manage the project.",
        },
      ];
      for (const type of mockUserTypes) {
        await models.UserType.create(type);
      }
    }
    models.sequelize.close();
  }

  get details() {
    return {
      uuid: this.uuid,
      display_name: this.displayName,
      email: this.email,
      password: this.password,
      bio: this.bio,
      user_type_id: this.userTypeId,
      jwt: this.jwt,
    };
  }

  async create() {
    return await axios
      .post(BASE_URL + "/api/users/user", this.details)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async login() {
    const loginCreds = {
      email: "jester@fakeemail.com",
      password: "password",
    };
    this.jwt = await axios
      .post(BASE_URL + "/api/users/login", loginCreds)
      .then((resp) => {
        return resp.data.accessToken;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return true;
  }

  async destroy() {
    const config = {
      headers: {
        authorization: `Bearer ${this.jwt}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .delete(BASE_URL + `/api/users/user/${this.uuid}`, config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

// const user1 = new MockUser(
//   "jestuuid",
//   "Jester",
//   "jester@fakeemail.com",
//   "password",
//   "User created by Jest testing. If this user still exists, something wrong has happened.",
//   1
// );

// (async () => {
//   await MockUser.clearDb(true);
//   await user1.create();
//   await user1.login();
//   await user1.destroy();
//   await user1.login();
// })();

module.exports = { MockUser };
