const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

  if (token == null) {
    return res.sendStatus(401); // if no token, return Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // if token is not valid, return Forbidden
    }
    req.user = user; // set the user object in the request
    next(); // proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
