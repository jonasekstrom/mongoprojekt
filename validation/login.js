const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ogiltlig epostadress";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Epost måste fyllas i";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Lösenord måste fyllas i";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
