module.exports = app => {
  //@desc test profile route
  //@access public
  app.get("/api/profile/test", (req, res) => {
    res.send({ msg: "Profile works" });
  });
};
