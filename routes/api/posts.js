const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const Profile = mongoose.model("profiles");
const passport = require("passport");
const validatePostInput = require("../../validator/posts");

module.exports = app => {
  //@desc test posts route
  //@access public
  app.get("/api/posts/test", (req, res) => {
    res.send({ msg: "Posts works" });
  });

  //@desc test posts route
  //@access private
  app.post(
    "/api/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
        res.status(400).send(errors);
      }
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        _user: req.user.id
      });
      newPost.save().then(post => res.send(post));
    }
  );

  //@desc get all the posts
  //@access public
  app.get("/api/posts", (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(post => {
        res.json(post);
      })
      .catch(err => res.status(404).json({ noposts: "sorry no posts found" }));
  });

  //@desc get the posts just by an id
  //@access public
  app.get("/api/posts/:post_id", (req, res) => {
    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        res.json(post);
      })
      .catch(err => res.status(404).send({ nopost: "sorry no post found" }));
  });

  //@desc this will delete the post
  //@access private
  app.delete(
    "/api/posts/:post_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id }).then(profile => {
        Post.findById({ _id: req.params.post_id }).then(post => {
          //check for post owner
          if (post._user.toString() !== req.user.id) {
            //we did toString to convert post._user to string because we wanted to compare it with string.
            return res
              .status(401)
              .send({ post: "You cannot delete this post" });
          }
          post
            .remove()
            .then(() => {
              res.send({ success: true });
            })
            .catch(err =>
              res.status(404).send({ postnotfound: "cant find post" })
            );
        });
      });
    }
  );

  //@desc the will add like to the post\
  //@private route
  app.post(
    "/api/posts/like/:post_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (
              post.likes.filter(like => like._user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(404)
                .send({ alreadyliked: "You have already liked the post" });
            }

            post.likes.unshift({ _user: req.user.id });
            post.save().then(post => res.send(post));
          })
          .catch(err => {
            res.status(404).send({ nopost: "cant find the post" });
          });
      });
    }
  );

  //@desc this will unlike the post\
  //@private route
  app.post(
    "/api/posts/unlike/:post_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (
              post.likes.filter(like => like._user.toString() === req.user.id)
                .length === 0
            ) {
              return res.status(404).send({
                notliked: "You need to first like to dislike the post"
              });
            }

            const removeIndex = post.likes
              .map(item => item._user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.send(post));
          })
          .catch(err => {
            res.status(404).send({ nopost: "cant find the post" });
          });
      });
    }
  );

  //@desc add comment on a post
  //@access private
  app.post(
    "/api/posts/comment/:post_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body); //we can use Post-valdiator because all we are checking is the text, same goes for here
      if (!isValid) {
        res.status(400).send(errors);
      }
      Post.findById(req.params.post_id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            _user: req.user.id
          };
          post.comments.unshift(newComment);
          post.save().then(post => res.send(post));
        })
        .catch(err => {
          res.status(404).send({ postnotfound: "no post found" });
        });
    }
  );

  //@desc delete comment on a post
  //@access private
  app.delete(
    "/api/posts/comment/:id/:comment_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: "Comment does not exist" });
          }

          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          // Splice comment out of array
          post.comments.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    }
  );
};
