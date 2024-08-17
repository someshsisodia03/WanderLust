const Joi = require('joi');

const schema = Joi.object({
    comment:Joi.string().required(),
    rating:Joi.string().required(),
    CreatedAt:Joi.date().allow(null),
}).required()
module.exports= schema;