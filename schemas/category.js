const Joi = require('joi')

const validator = Joi.object({
    "name" : Joi.string()
        .required()
        .min(3)
        .max(100)
        .messages({
            'any.required': 'NAME_REQUIRED',
            'string.empty': 'NAME_REQUIRED',
            'string.min': 'NAME_TOO_SHORT',
            'string.max': 'NAME_TOO_LARGE',
        }),
    "description" : Joi.string()
        .required()
        .min(3)
        .max(300)
        .messages({
            'any.required': 'DESC_REQUIRED',
            'string.empty': 'DESC_REQUIRED',
            'string.min': 'DESC_TOO_SHORT',
            'string.max': 'DESC_TOO_LARGE',
        })
})

module.exports = validator