const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateEducationInput = data => {
  let errors = {};

  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.school = !isEmpty(data.school) ? data.school : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Please enter degree";
  }

  if (validator.isEmpty(data.school)) {
    errors.school = "Please enter school";
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Please enter your field of study";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Please enter from date";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
