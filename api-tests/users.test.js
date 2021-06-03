const axios = require("axios");
const models = require("../models");

const BASE_URL = "http://localhost:3000";

describe("/api/users/user", () => {
  test("GET /user: creates a new user, gets user info as response", async () => {
    //create a new user
    const newUser = {
      uuid: "jestuuid4",
      display_name: "Jester",
      email: "jester@fakeemail.com",
      password: "password",
      bio:
        "User created by Jest testing. If this user still exists, something wrong has happened.",
      user_type_id: 1,
    };

    const response = await axios
      .post(BASE_URL + "/api/users/user", newUser)
      .then((resp) => {
        return resp.data;
      });

    // console.log(response);

    expect(response.uuid).toBe(newUser.uuid);
    expect(response.display_name).toBe(newUser.display_name);
    expect(response.email).toBe(newUser.email);
    expect(response.password).toBe(newUser.password);
    expect(response.bio).toBe(newUser.bio);
  });
});
