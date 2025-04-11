const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token" });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
      console.log("The decoded user is: ", req.user);
    } catch (error) {
      res.status(403).json({ message: "Invalid Token" });
    }
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
