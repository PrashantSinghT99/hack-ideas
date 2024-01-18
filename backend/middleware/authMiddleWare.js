const User = require("../models/UserModal");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id);
      if (req.user) {
        next();
      } else {
        // User not found in the database
        res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      // Token verification failed
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    // No token provided
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { protect };
