const express = require('express')
const router = express.Router()
const article = require('../route_handle/article')
const expressJoi = require('@escook/express-joi')
const article_schema = require('../schema/article_cates')

router.get('/article/cates', article.getArticleCates)
router.get('/article/cates/:id', article.getArticleCatesById)
router.post('/article/addcates', expressJoi(article_schema.article_cates_schema), article.addArticleCates)
router.get('/article/deletecate/:id', article.delArticleCates)
router.post('/article/updatecate', article.updateCate)

module.exports = router