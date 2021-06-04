const axios = require("axios");
const BASE_URL = "http://localhost:3000";
const models = require("../models");

class MockUser {
  constructor(uuid, displayName, email, password, bio, userTypeId) {
    this.uuid = uuid || "jesteruuid";
    this.displayName = displayName || "Jester";
    this.email = email || "jester@fakeemail.com";
    this.password = password || "password";
    this.bio = bio || "This is a fake user created for unit testing.";
    this.userTypeId = userTypeId || 1;
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
    await models.sequelize.close();
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

  async login(email, password) {
    const loginCreds = {
      email: email || "jester@fakeemail.com",
      password: password || "password",
    };
    const response = await axios
      .post(BASE_URL + "/api/users/login", loginCreds)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });

    if (response.accessToken) {
      this.jwt = response.accessToken;
    }

    return response;
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
    return response;
  }
}

module.exports = { MockUser };
