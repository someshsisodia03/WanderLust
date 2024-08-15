const Joi = require('joi');

const schema = Joi.object({
    comment:Joi.string().required(),
    rating:Joi.number().required().min(1).max(5),
    CreatedAt:Joi.date().allow(null),
}).required()
module.exports= schema;