const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Please enter email address";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
