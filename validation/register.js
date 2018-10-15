const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Namnet måste vara minst 2 och max 30 tecken";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Namnfältet måste fyllas i";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Epostfältet måste fyllas i";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ogiltlig epostadress";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Lösenordsfältet måste fyllas i";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Lösenordet måste vara minst 6 tecken";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Bekräfta Lösenordetsfältet måste fyllas i";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Lösenorden matchar inte";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
