const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatePostInput = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  if (!validator.isLength(data.text, { min: 5, max: 60 })) {
    errors.text = "Text should be between 5 and 60 charachters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Please enter text address";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
