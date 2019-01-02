module.exports = app => {
  //@desc test posts route
  //@access public
  app.get("/api/posts/test", (req, res) => {
    res.send({ msg: "Posts works" });
  });
};
