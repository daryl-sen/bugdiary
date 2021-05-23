require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  console.log("cookies", req.cookies.jwt);

  if (!authHeader) {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return res.status(401).json({ error: "JWT not received" });
    }
  } else {
    token = authHeader.split(" ")[1];
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid JWT" });
    }
    req.decodedUser = user;
  });
  next();
};

module.exports = {
  authenticateToken,
};
