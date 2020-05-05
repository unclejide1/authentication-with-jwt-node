const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const authToken = req.header("auth-token");
  if (!authToken) return res.status(400).send("Access Denied");

  try {
    const verifiedToken = jwt.verify(authToken, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
