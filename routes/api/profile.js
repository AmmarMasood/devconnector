const mongoose = require("mongoose");
const Profile = mongoose.model("profiles");
const User = mongoose.model("users");
const passport = require("passport");
const profileInputValidator = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");

module.exports = app => {
  //@desc test profile route
  //@access public
  app.get("/api/profile/test", (req, res) => {
    res.send({ msg: "Profile works" });
  });

  // @route   GET api/profile/all
  // @desc    Get all profiles
  // @access  Public
  app.get("/api/profile/all", (req, res) => {
    const errors = {};

    Profile.find()
      .populate("_user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  });

  //@desc gets current user profile
  //@acces private
  app.get(
    "/api/profile/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id })
        .populate("_user", ["name", "avatar"]) //gets the name and avatar of the current user and add it to profile
        .then(profile => {
          const errors = {};
          if (!profile) {
            errors.profile = "Profile for this user does not exist";
            return res.status(400).send(errors);
          }
          res.send(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );

  //@gets the profile with given handler
  //@ public route
  app.get("/api/profile/handle/:handle", (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .populate("_user", ["name", "avatar"]) //gets the name and avatar of the current user and add it to profile
      .then(profile => {
        const errors = {};
        if (!profile) {
          errors.profile = "Profile for this user does not exist";
          return res.status(400).send(errors);
        }
        res.send(profile);
      })
      .catch(err => res.status(404).json(err));
  });

  //@desc add user experience into profile
  //@private route
  app.post(
    "/api/profile/experience",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { isValid, errors } = validateExperienceInput(req.body);
      if (!isValid) {
        res.status(400).send(errors);
      }
      Profile.findOne({ _user: req.user.id }).then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add to experience array.
        profile.experience.unshift(newExp);
        profile.save().then(profile => {
          res.send(profile);
        });
      });
    }
  );

  //@desc add user education into profile
  //@private route
  app.post(
    "/api/profile/education",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { isValid, errors } = validateEducationInput(req.body);
      if (!isValid) {
        res.status(400).send(errors);
      }
      Profile.findOne({ _user: req.user.id }).then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldOfStudy: req.body.fieldOfStudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add to experience array.
        profile.education.unshift(newEdu);
        profile.save().then(profile => {
          res.send(profile);
        });
      });
    }
  );

  //@desc delete user experience from profile
  //@private route
  app.delete(
    "/api/profile/experience/:exp_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id }).then(profile => {
        //get romve index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //removing that index from experience
        profile.experience.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      });
    }
  );

  //@desc delete user education from profile
  //@private route
  app.delete(
    "/api/profile/education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _user: req.user.id }).then(profile => {
        //get romve index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //removing that index from experience
        profile.education.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      });
    }
  );

  //@desc delete user profile and the user
  //@private route
  app.delete(
    "/api/profile/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOneAndDelete({ _user: req.user.id }).then(() => {
        User.findOneAndDelete({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );

  //@desc creates user profile
  //@Access private
  app.post(
    "/api/profile/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { isValid, errors } = profileInputValidator(req.body);
      if (!isValid) {
        res.status(400).send(errors);
      }
      const profileInput = {};
      profileInput._user = req.user.id;
      if (req.body.handle) profileInput.handle = req.body.handle;
      if (req.body.company) profileInput.company = req.body.company;
      if (req.body.website) profileInput.website = req.body.website;
      if (req.body.location) profileInput.location = req.body.location;
      if (req.body.status) profileInput.status = req.body.status;
      if (req.body.bio) profileInput.bio = req.body.bio;
      if (req.body.githubusername)
        profileInput.githubusername = req.body.githubusername;
      //since skills we a string of comma seprates values, we are going to save it as a array
      if (typeof req.body.skills !== "undefined") {
        profileInput.skills = req.body.skills.split(",");
      }
      //saving socials, since its is an object of objects we do it like this
      profileInput.socials = {};
      if (req.body.youtube) profileInput.socials.youtube = req.body.youtube;
      if (req.body.twitter) profileInput.socials.twitter = req.body.twitter;
      if (req.body.facebook) profileInput.socials.facebook = req.body.facebook;
      if (req.body.linkedin) profileInput.socials.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileInput.socials.instagram = req.body.instagram;

      Profile.findOne({ _user: req.user.id }).then(user => {
        if (user) {
          //update the user profile
          Profile.findOneAndUpdate(
            { _user: req.user.id },
            { $set: profileInput },
            { new: true }
          ).then(profile => res.send(profile));
        } else {
          //create the user profile
          //check if the handle already exist
          Profile.findOne({ handle: req.body.handle }).then(profile => {
            if (profile) {
              //if handle exists
              errors.handle = "handle already exists";
              res.status(400).send(errors);
            }
            //create profile
            new Profile(profileInput).save().then(profile => {
              res.send(profile);
            });
          });
        }
      });
    }
  );
};
