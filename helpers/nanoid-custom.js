const nanoid = require("nanoid").customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  20
);

const nanoidNum = require("nanoid").customAlphabet("1234567890", 5);

module.exports = {
  nanoid,
  nanoidNum,
};
