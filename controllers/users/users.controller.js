const profile = (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
};

module.exports = {
  profile,
};
 