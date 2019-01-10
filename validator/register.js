const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Please enter username";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Please enter email address";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter password";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Please enter confirm password";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords does not match!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
