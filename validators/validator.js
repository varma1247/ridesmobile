import Joi from "@hapi/joi"
const { registrationValidator } = require("./registrationValidator");
const { loginValidator } = require("./loginValidator");
module.exports = {
  registrationValidator: registrationValidator,
  loginValidator: loginValidator,
};
