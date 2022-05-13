const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function (req, res, next) {
  let token = req.get("Authorization") || req.query.token || req.body.token;
  if (token) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        console.log("Error when decoding jwt: ", err);
        next(err);
      } else {
        console.log("Valid token: ", decoded.user);
        req.user = decoded.user;
        next();
      }
    });
  } else {
    console.error("No token found");
    next();
  }
};
