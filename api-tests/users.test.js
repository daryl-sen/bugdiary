const axios = require("axios");
const models = require("../models");

const BASE_URL = "http://localhost:3000";

const jwt = [];

describe("/api/users/user", () => {
  // test("GET /user: creates a new user, gets user info as response", async () => {
  //   //create a new user
  //   const newUser = {
  //     uuid: "jestuuid4",
  //     display_name: "Jester",
  //     email: "jester@fakeemail.com",
  //     password: "password",
  //     bio:
  //       "User created by Jest testing. If this user still exists, something wrong has happened.",
  //     user_type_id: 1,
  //   };

  //   const response = await axios
  //     .post(BASE_URL + "/api/users/user", newUser)
  //     .then((resp) => {
  //       return resp.data;
  //     });

  //   // console.log(response);

  //   expect(response.uuid).toBe(newUser.uuid);
  //   expect(response.display_name).toBe(newUser.display_name);
  //   expect(response.email).toBe(newUser.email);
  //   expect(response.password).toBe(newUser.password);
  //   expect(response.bio).toBe(newUser.bio);
  // });

  test("POST /login: users can log in and get a jwt response", async () => {
    const loginCreds = {
      email: "jester@fakeemail.com",
      password: "password",
    };
    const response = await axios
      .post(BASE_URL + "/api/users/login", loginCreds)
      .then((resp) => {
        return resp.data;
      });

    jwt[0] = response.accessToken;

    expect(jwt[0]).not.toBe(null);
  });
});
