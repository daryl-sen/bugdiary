const { nanoid } = require("../helpers/nanoid-custom");
const axios = require("axios");

(async () => {
  for (let i = 0; i < 1000; i++) {
    await axios.post("http://localhost:3000/api/diaries/issues/", {
      reference: "",
      details: nanoid(),
      status_id: 2,
      reporter_name: "Me",
      reporter_email: "email@fakemail.com",
      resolve_date: null,
      priority: 1,
      diary_id: 1,
      type_id: 1,
      location_id: 1,
      version_id: 1,
      private: 0,
      type_name: "typo",
      location_name: "about us",
    });
    console.log("created");
  }
})();
