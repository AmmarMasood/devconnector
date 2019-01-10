const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const passport = require("passport");
//validators
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");
//load user model
const User = mongoose.model("users");

module.exports = app => {
  //@desc test users route
  //@access public
  app.get("/api/users/test", (req, res) => {
    res.send({ msg: "User works" });
  });

  //@desc register user route
  //@access public
  app.post("/api/users/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exist!";
        return res.status(400).send(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.send(user);
              })
              .catch(err => res.status(400).send(err));
          });
        });
      }
    });
  });

  //@desc Login User
  //@access public
  app.post("/api/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //validation
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    //finding if user exist
    User.findOne({ email: email }).then(user => {
      if (!user) {
        errors.email = "email does not exist";
        return res.status(400).send(errors);
      }
      //comairing password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //is user mathces
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            keys.secretOrPrivateKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.send({ success: "true", token: "Bearer " + token });
            }
          );
        } else {
          errors.password = "Password does not match. Please try again";
          return res.status(404).send(errors);
        }
      });
    });
  });

  //@DESC CHECK CURRENT USER
  //@PRIVATE ROUTE
  app.get(
    "/api/users/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send({
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      });
    }
  );
};
