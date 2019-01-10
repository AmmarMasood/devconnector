const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Please enter job title";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Please enter company you are working on";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Please enter from date";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
