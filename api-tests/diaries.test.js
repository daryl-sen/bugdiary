// IMPORTANT: Please run these tests AFTER seeding the database

const axios = require("axios");

const BASE_URL = "http://localhost:3000";

const jwt = [];

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
      .get(BASE_URL + "/api/diaries/diary")
      .then((resp) => {
        return resp.data;
      });
    expect(response.error).not.toBe(undefined);
    expect(response.id).toBe(undefined);
  });
});
