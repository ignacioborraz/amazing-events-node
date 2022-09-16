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
    "image" : Joi.string()
        .required()
        .uri()
        .messages({
            'any.required': 'IMG_REQUIRED',
            'string.empty': 'IMG_REQUIRED',
            'string.uri':'INVALID_URL'
        }),
    "price" : Joi.number().required()
        .required()
        .min(0)
        .max(500)
        .messages({
            'number.base': 'INVALID_PRICE',
            'any.required': 'PRICE_REQUIRED',
            'number.empty': 'PRICE_REQUIRED',
            'number.min': 'INVALID_PRICE',
            'number.max': 'PRICE_TOO_MUCH',
        }),
    "capacity" : Joi.number()
        .required()
        .integer()
        .min(10)
        .max(2000000)
        .messages({
            'number.base': 'INVALID_CAP',
            'any.required': 'CAP_REQUIRED',
            'number.empty': 'CAP_REQUIRED',
            'number.min': 'CAP_TOO_SMALL',
            'number.max': 'CAP_TOO_MUCH',
        }),
    "estimated" : Joi.number()
        .required()    
        .integer()
        .min(10)
        .max(2000000)
        .messages({
            'number.base': 'INVALID_EST',
            'any.required': 'EST_REQUIRED',
            'number.empty': 'EST_REQUIRED',
            'number.min': 'EST_TOO_SMALL',
            'number.max': 'EST_TOO_MUCH',
        }),
    "place" : Joi.string()
        .required()
        .min(3)
        .max(100)
        .messages({
            'any.required': 'PLACE_REQUIRED',
            'string.empty': 'PLACE_REQUIRED',
            'string.min': 'PLACE_TOO_SHORT',
            'string.max': 'PLACE_TOO_LARGE',
        }),
    "category" : Joi.any()
        .required()
        .valid('Food Fair','Museum','Costume Party','Music Concert','Race','Book Exchange','Cinema')
        .messages({
            'any.required': 'CATEGORY_REQUIRED',
            'string.empty': 'CATEGORY_REQUIRED',
            'any.only': 'CATEGORY_NOT_ALLOWED'
        }),
    "description" : Joi.string()
        .required()
        .min(3)
        .max(500)
        .messages({
            'any.required': 'DESCR_REQUIRED',
            'string.empty': 'DESCR_REQUIRED',
            'string.min': 'DESCR_TOO_SHORT',
            'string.max': 'DESCR_TOO_LARGE',
        }),
    "date" : Joi.date()
        .required()
        .greater(new Date)
        .messages({
            'any.required': 'DATE_REQUIRED',
            'string.empty': 'DATE_REQUIRED',
            'date.greater': 'INVALID_DATE'
        })
})

module.exports = validator