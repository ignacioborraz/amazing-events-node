const Joi = require('joi')

const validator = Joi.object({
    "comment" : Joi.string()
        .required()
        .min(3)
        .messages({
            'any.required': 'COMMENT_REQUIRED',
            'string.empty': 'COMMENT_REQUIRED',
            'string.min': 'COMMENT_TOO_SHORT',
        }),
    "user": Joi.string()
        .required()
        .messages({
            'any.required': 'USER_REQUIRED',
            'string.empty': 'USER_REQUIRED',
        }),
    "event": Joi.string()
        .required()
        .messages({
            'any.required': 'EVENT_REQUIRED',
            'string.empty': 'EVENT_REQUIRED',
        }),
    "date": Joi.string()
        .required()
        .messages({
            'any.required': 'DATE_REQUIRED',
            'string.empty': 'DATE_REQUIRED',
        }),
})

module.exports = validator