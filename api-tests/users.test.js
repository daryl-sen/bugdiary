const axios = require("axios");
const { MockUser } = require("./MockUser");

const BASE_URL = process.env.REACT_APP_API_URL;

describe("/api/users/", () => {
  beforeAll(async (done) => {
    await MockUser.clearDb(true);
    done();
  }, 40000);

  const newUser = new MockUser();

  test("GET /user: creates a new user, gets user info as response", async () => {
    const response = await newUser.create();

    expect(response.uuid).toBe(newUser.details.uuid);
    expect(response.display_name).toBe(newUser.details.display_name);
    expect(response.email).toBe(newUser.details.email);
    expect(response.bio).toBe(newUser.details.bio);
  });

  test("POST /login: users can log in and get a jwt response", async () => {
    const response = await newUser.login();
    expect(newUser.jwt).not.toBe(undefined);
  });

  test("POST /login: users should get an error message if email or password is wrong", async () => {
    const wrongEmailResponse = await newUser.login(
      "wrong@wrongemail.com",
      "password"
    );

    const wrongPasswordResponse = await newUser.login(
      undefined,
      "wrongPassword"
    );

    expect(wrongEmailResponse.error).not.toBe(undefined);
    expect(wrongPasswordResponse.error).not.toBe(undefined);
  });

  test("PATCH /user: a user who is logged in can update their information.", async () => {
    const newDetails = {
      uuid: newUser.uuid,
      bio: "This is my updated bio.",
    };

    const config = {
      headers: {
        authorization: `Bearer ${newUser.jwt}`,
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
    const otherUser = new MockUser(
      "jestuuid2",
      "Jester 2",
      "jester2@fakeemail.com",
      "password",
      "User created by Jest testing. If this user still exists, something wrong has happened.",
      1
    );

    otherUser.create();

    const newDetails = {
      uuid: otherUser.uuid,
      bio: "This is my updated bio.",
    };

    const config = {
      headers: {
        authorization: `Bearer ${newUser.jwt}`,
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
        authorization: `Bearer ${newUser.jwt}`,
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
    const response = await newUser.destroy();

    expect(response.error).toBe(undefined);
    expect(response.success).not.toBe(undefined);
  });
});
