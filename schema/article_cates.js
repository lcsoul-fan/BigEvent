const joi = require('joi');
const name = joi.string().required()
const alias = joi.string().required()

exports = {
    body: {
        name,
        alias
    }
}