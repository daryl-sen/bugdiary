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
});
