const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle should be between 2 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Please enter the handle";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Please enter the skills";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Please enter the status";
  }

  if (!validator.isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  if (!validator.isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid url";
    }
  }
  if (!validator.isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }
  if (!validator.isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid url";
    }
  }
  if (!validator.isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.email = "Not a valid url";
    }
  }
  if (!validator.isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
