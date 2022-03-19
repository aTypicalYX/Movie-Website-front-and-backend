const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

var check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization)
  console.log(authHeader)
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }
    req.decodedToken = decodedToken;
    console.log(decodedToken)
    next();
  });
};

module.exports=check;
