const express = require('express')
const router = express.Router()
const article = require('../route_handle/article')

router.get('/article/cates', article.getArticleCates)
router.post('/article/addcates', article.addArticleCates)
router.get('/article/deletecate', article.delArticleCates)

module.exports = router