const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters long";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "You must enter a name";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "You must enter an mail address";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "You must enter a password";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password needs to be atleast 6 characters long";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Verify password field cannot be empty";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords doesn't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
