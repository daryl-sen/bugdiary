const axios = require("axios");
const { MockUser } = require("./MockUser");

const BASE_URL = "http://localhost:3000";

const newUser = new MockUser(
  "jestuuid",
  "Jester",
  "jester@fakeemail.com",
  "password",
  "User created by Jest testing. If this user still exists, something wrong has happened.",
  1
);

let config = {};

describe("/api/diaries/ for guest users", () => {
  test("GET /", async () => {
    const response = await axios
      .get(BASE_URL + "/api/diaries/")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(Array.isArray(response)).not.toBe(true);
  });

  test("GET /:uuid", async () => {
    const response = await axios
      .get(BASE_URL + "/api/diaries/testdiary1")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(response.targetDiary).toBe(undefined);
    expect(response.issues).toBe(undefined);
  });

  test("POST /diary", async () => {
    const response = await axios
      .post(BASE_URL + "/api/diaries/diary")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(response.id).toBe(undefined);
  });

  test("PATCH /diary", async () => {
    const response = await axios
      .patch(BASE_URL + "/api/diaries/diary")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(response.id).toBe(undefined);
  });

  test("DELETE /diary", async () => {
    const response = await axios
      .delete(BASE_URL + "/api/diaries/diary")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(response.success).toBe(undefined);
  });
});

describe("/api/diaries/ for guest users", () => {
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
  }, 20000);

  test("POST /diary", async () => {
    const response = await axios
      .post(
        BASE_URL + "/api/diaries/diary",
        {
          uuid: "testdiary1",
          name: "My First Bug Diary",
          description: "disintermediate plug-and-play paradigms",
          passcode: "mypasscode",
          user_id: 1,
        },
        config
      )
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).toBe(undefined);
    expect(response.id).not.toBe(undefined);
  });

  test("GET /", async () => {
    const response = await axios
      .get(BASE_URL + "/api/diaries/", config)
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).toBe(undefined);
    expect(Array.isArray(response)).toBe(true);
  });

  test("GET /:uuid", async () => {
    const response = await axios
      .get(BASE_URL + "/api/diaries/testdiary1", config)
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).toBe(undefined);
    expect(response.targetDiary).not.toBe(undefined);
    expect(response.issues).not.toBe(undefined);
  });

  test("PATCH /diary", async () => {
    const data = {
      uuid: "testdiary1",
    };
    const response = await axios
      .patch(BASE_URL + "/api/diaries/diary", data, config)
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).toBe(undefined);
    expect(response.id).not.toBe(undefined);
  });

  test("DELETE /diary", async () => {
    const response = await axios
      .delete(BASE_URL + "/api/diaries/diary/testdiary1", config)
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).toBe(undefined);
    expect(response.success).not.toBe(undefined);
  });
});
