const JWT = require("jsonwebtoken");

const checkUserLogedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "failed",
      message: "Authorization header is required",
    });
  }

  const [method, token] = authHeader.split(" ");

  if (method !== "Bearer" || !token) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid authorization format",
    });
  }

  try {
    const checkToken = JWT.verify(token, process.env.JWT_SECRET);

    req.user = checkToken;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
};

module.exports = checkUserLogedIn;
