const axios = require("axios");
const { MockUser } = require("./MockUser");

const BASE_URL = "http://localhost:3000";

const newUser = new MockUser();
let config = {};

describe("/api/tags", () => {
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
    // create a new diary for the test user
    await axios.post(
      BASE_URL + "/api/diaries/diary",
      {
        uuid: "testdiary1",
        name: "My First Bug Diary",
        description: "disintermediate plug-and-play paradigms",
        passcode: "mypasscode",
        user_id: 1,
      },
      config
    );
    done();
  });

  test("POST / a logged-in user can post a new tag to their diary", async () => {
    const newTag = {
      name: "name",
      diary_id: 1,
    };

    const response = await axios
      .post(BASE_URL + "/api/tags/", newTag, config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    expect(response.id).not.toBe(undefined);
    expect(response.diary_id).toBe(1);
    expect(response.error).toBe(undefined);
  });

  test("GET /:uuid a logged-in user can see all the tags associated with the diary", async () => {
    const response = await axios
      .get(BASE_URL + "/api/tags/testdiary1", config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].id).not.toBe(undefined);
    expect(response[0].diary_id).toBe(1);
  });

  test("PATCH / the diary's owner can edit any specific tag", async () => {
    const response = await axios
      .patch(BASE_URL + "/api/tags/", { id: 1, name: "updated" }, config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    expect(response.error).toBe(undefined);
    expect(response.name).toBe("updated");
  });

  test("DELETE / the diary's owner can delete any specific tag", async () => {
    const response = await axios
      .delete(BASE_URL + "/api/tags/1", config)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    expect(response.error).toBe(undefined);
    expect(response.success).toBe(true);
  });
});
