const express = require('express')
const router = express.Router()
const pub_articles = require('../route_handle/pub_articles')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../uploads') })

router.post('/article/add', upload.single('cover_img'), pub_articles.addAticles)
router.get('/article/list', pub_articles.getArticleList)
router.get('/article/delete/:id', pub_articles.delArticle)
router.get('/article/:id', pub_articles.getArticle)
router.get('/article/info/:id', pub_articles.getArticleByid)
router.post('/update/article', upload.single('cover_img'), pub_articles.updateArticle)

module.exports = router