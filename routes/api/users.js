module.exports = app => {
  //@desc test users route
  //@access public
  app.get("/api/users/test", (req, res) => {
    res.send({ msg: "User works" });
  });
};
