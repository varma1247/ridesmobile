import "text-encoding-polyfill";
const Joi = require("@hapi/joi");
module.exports = {
  postValidator: Joi.object({
    content: Joi.string().empty().min(1).max(100).required().messages({
      "string.base": "Content should be of type string",
      "string.min": "empty ride cannot be posted",
      "string.max": "Message too long!! max 100 characters...",
      "string.empty": "empty ride cannot be posted",
      "any.required": "empty ride cannot be posted",
    }),
  }),
};
