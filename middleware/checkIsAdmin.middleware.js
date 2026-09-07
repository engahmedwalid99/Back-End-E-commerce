const checkIsAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorizeed action. 🚫",
    });
  }
  next();
};

module.exports = checkIsAdmin;
