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
    next();
    return;
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      req.auth = { status: false, message: "Invalid JWT" };
      next();
      return;
    }
    req.auth = { status: true, userInfo: user };
    next();
    return;
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const generateToken = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const checkAuthenticatedDiaries = (req) => {
  if (req.session.authenticatedDiaries) {
    return req.session.authenticatedDiaries;
  }
  return [];
};

const addAuthenticatedDiary = (newUuid, req) => {
  if (req.session.authenticatedDiaries) {
    return [...req.session.authenticatedDiaries, newUuid];
  }
  req.session.authenticatedDiaries = [newUuid];
  return [newUuid];
};

const checkDiaryAuth = (diaryObj, userObj, req) => {
  // diary belongs to a user
  if (diaryObj && diaryObj.user_id) {
    if (userObj) {
      // user is logged in
      if (diaryObj.user_id === userObj.id) {
        // user is the diary owner
        return {
          authenticated: true,
        };
      } else {
        // user is not the diary owner
        return {
          authenticated: false,
          message:
            "You cannot make changes to a diary that belongs to someone else",
        };
      }
    } else {
      // diary has an owner but user is not logged in
      return {
        authenticated: false,
        message:
          "Please sign in to confirm that you are the owner of this diary.",
      };
    }
  }

  // diary does not belong to anyone
  if (checkAuthenticatedDiaries(req).includes(diaryObj.uuid)) {
    return {
      authenticated: true,
    };
  }
  return {
    authenticated: false,
  };
};

module.exports = {
  authenticateToken,
  generateToken,
  checkAuthenticatedDiaries,
  addAuthenticatedDiary,
  checkDiaryAuth,
  verifyToken,
};
