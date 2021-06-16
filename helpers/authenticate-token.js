/*
  function will create req.auth, which contains an object
  { 
    status: BOOL,
    message: STRING, // undefined is no error
    userInfo: OBJ // undefined if there's any error
  }
*/

require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    req.auth = { status: false, message: "No JWT Received" };
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      req.auth = { status: false, message: "Invalid JWT" };
    }
    req.auth = { status: true, userInfo = user}
  });
  next();
};

module.exports = {
  authenticateToken,
};
