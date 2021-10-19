const joi = require('joi');
const name = joi.string().required()
const alias = joi.string().required()
const id = joi.string().required()


// exports.article_schema = {
//     body: {
//         name,
//         alias
//     }
// }

// exports.article_id_schema = {
//     body: {
//         id
//     }
// }

module.exports = {
    article_cates_schema: { body: { name, alias } },
    article_id_schema: { query: { id } }
}