// IMPORTANT: Please run these tests AFTER seeding the database

const axios = require("axios");

const BASE_URL = "http://localhost:3000";

const jwt = [];

describe.skip("/api/users/", () => {
  test("GET /user: creates a new user, gets user info as response", async () => {
    const newUser = {
      uuid: "jestuuid",
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

    expect(response.uuid).toBe(newUser.uuid);
    expect(response.display_name).toBe(newUser.display_name);
    expect(response.email).toBe(newUser.email);
    expect(response.bio).toBe(newUser.bio);
  });

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

  test("POST /login: users should get an error message if email or password is wrong", async () => {
    const loginCreds1 = {
      email: "jester@wrongemail.com",
      password: "password",
    };

    const loginCreds2 = {
      email: "jester@fakeemail.com",
      password: "wrongPassword",
    };

    const response1 = await axios
      .post(BASE_URL + "/api/users/login", loginCreds1)
      .then((resp) => {
        return resp.data;
      });

    const response2 = await axios
      .post(BASE_URL + "/api/users/login", loginCreds2)
      .then((resp) => {
        return resp.data;
      });

    expect(response1.error).not.toBe(undefined);
    expect(response2.error).not.toBe(undefined);
  });

  test("PATCH /user: a user who is logged in can update their information.", async () => {
    const newDetails = {
      uuid: "jestuuid",
      bio: "This is my updated bio.",
    };

    const config = {
      headers: {
        authorization: `Bearer ${jwt[0]}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .patch(BASE_URL + "/api/users/user", newDetails, config)
      .then((resp) => {
        return resp.data;
      });

    expect(response.bio).toBe(newDetails.bio);
  });

  test("PATCH /user: users who are not logged in cannot edit account details", async () => {
    const response = await axios
      .patch(BASE_URL + "/api/users/user")
      .then((resp) => {
        return resp.data;
      });

    expect(response.error).not.toBe(undefined);
    expect(response.bio).toBe(undefined);
  });

  test("PATCH /user: users who are logged in cannot edit another user's details", async () => {
    const newDetails = {
      uuid: "uuid1", // user #1's uuid
      bio: "This is my updated bio.",
    };

    const config = {
      headers: {
        authorization: `Bearer ${jwt[0]}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .patch(BASE_URL + "/api/users/user", newDetails, config)
      .then((resp) => {
        return resp.data;
      });

    expect(response.error).not.toBe(undefined);
    expect(response.bio).toBe(undefined);
  });

  test("DELETE /user: users cannot delete other users.", async () => {
    const config = {
      headers: {
        authorization: `Bearer ${jwt[0]}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .delete(BASE_URL + "/api/users/user/uuid1", config)
      .then((resp) => {
        return resp.data;
      });

    expect(response.error).not.toBe(undefined);
    expect(response.success).toBe(undefined);
  });

  test("DELETE /user: Logged-in users can delete their own account", async () => {
    const config = {
      headers: {
        authorization: `Bearer ${jwt[0]}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .delete(BASE_URL + "/api/users/user/jestuuid", config)
      .then((resp) => {
        return resp.data;
      });

    expect(response.error).toBe(undefined);
    expect(response.success).not.toBe(undefined);
  });
});
