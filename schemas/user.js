const Joi = require('joi')

const validator = Joi.object({
    "name": Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'NAME_REQUIRED',
            'string.empty': 'NAME_REQUIRED',
            'string.min': 'NAME_TOO_SHORT',
            'string.max': 'NAME_TOO_LARGE',
        }),
    "photo": Joi.string()
        .required()
        .uri()
        .messages({
            'any.required': 'PHOTO_REQUIRED',
            'string.empty': 'PHOTO_REQUIRED',
            'string.uri': 'INVALID_URL'
        }),
    "email": Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
        .messages({
            'any.required': 'EMAIL_REQUIRED',
            'string.empty': 'EMAIL_REQUIRED',
            'string.email': 'INVALID_EMAIL'
        }),
    "pass": Joi.string()
        .required()
        .min(8)
        .max(50)
        .alphanum()
        .messages({
            'any.required': 'PASS_REQUIRED',
            'string.empty': 'PASS_REQUIRED',
            'string.min': 'PASS_TOO_SHORT',
            'string.max': 'PASS_TOO_LARGE',
            'string.alphanum': 'PASS_ALPHANUMERIC_REQUIRED',
        }),
    "role": Joi.any()
        .required()
        .valid('user', 'admin')
        .messages({
            'any.required': 'ROLE_REQUIRED',
            'string.empty': 'ROLE_REQUIRED',
            'any.only': 'ROLE_NOT_ALLOWED'
        }),
    "from": Joi.string()
        .required()
        .messages({
            'any.required': 'FROM_REQUIRED',
            'string.empty': 'FROM_REQUIRED'
        }),
})

module.exports = validator