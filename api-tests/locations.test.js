const axios = require("axios");
const { MockUser } = require("./MockUser");

const BASE_URL = "http://localhost:3000";

const newUser = new MockUser();
let config = {};

describe("/api/locations", () => {
  beforeAll(async (done) => {
    await MockUser.clearDb(true);
    await newUser.create();
    await newUser.login();
    config = {
      headers: {
        authorization: `Bearer ${newUser.jwt}`,
        "Content-Type": "application/json",
      },
    };
    done();
  });

  test("POST / a logged-in user can post a new location to their diary", async () => {
    const newLocation = {
      name: "name",
    };

    const response = await axios
      .post(BASE_URL + "/api/locations/", newLocation, config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    expect(response.id).not.toBe(undefined);
    expect(response.error).toBe(undefined);
  });
});
