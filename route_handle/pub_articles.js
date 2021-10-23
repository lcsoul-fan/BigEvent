const db = require("../db/db");

function addAticles(req, res) {
    console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('封面必须要上传！')
    }
    const reqData = {
        ...req.body,
        cover_img: req.file.filename,
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sqlStr = 'insert into pub_article set?'
    db.query(sqlStr, reqData, (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('发布失败')
        }
        res.cc('发布成功', 0)
    })
}

function getArticleList(req, res) {
    const reqinfo = req.query
    if (reqinfo.cate_id && reqinfo.state) {
        const countStr = 'select count(*) from pub_article where cate_id = ? and state = ?and is_delete = 0'
        db.query(countStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum - 1) {
                return res.cc('页面超过可查询的最大值')
            };
            const total = results[0]['count(*)']
            const sqlStr = 'select pub_article.*,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.cate_id = ? and pub_article.state = ? and pub_article.is_delete = 0'
            db.query(sqlStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                console.log(results.slice(4, 8));
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize),
                    total: total
                })
            })
        })

    } else if (reqinfo.cate_id && !reqinfo.state) {
        const countStr = 'select count(*) from pub_article where cate_id = ? and is_delete = 0'
        db.query(countStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum - 1) {
                return res.cc('页面超过可查询的最大值')
            };
            const total = results[0]['count(*)']
            const sqlStr = 'select pub_article.*,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.cate_id = ?and pub_article.is_delete = 0'
            db.query(sqlStr, [reqinfo.cate_id], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize),
                    total: total
                })
            })
        })

    } else if (!reqinfo.cate_id && reqinfo.state) {
        const countStr = 'select count(*) from pub_article where state = ?and is_delete = 0'
        db.query(countStr, [reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum - 1) {
                return res.cc('页面超过可查询的最大值')
            };
            const sqlStr = 'select pub_article.*,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.state = ? and pub_article.is_delete = 0'
            const total = results[0]['count(*)']
            db.query(sqlStr, [reqinfo.state], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize),
                    total: total
                })
            })
        })
    } else {
        const countStr = 'select count(*) from pub_article where is_delete = 0'
        db.query(countStr, (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum - 1) {
                return res.cc('页面超过可查询的最大值')
            };
            const total = results[0]['count(*)']
            const sqlStr = 'select pub_article.*,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.is_delete = 0'
            db.query(sqlStr, (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize),
                    total: total
                })
            })
        })

    }
}

function delArticle(req, res) {
    const id = req.params.id
    console.log(id);
    const sqlStr = 'update  pub_article set is_delete = "1" where id = ?'
    db.query(sqlStr, [id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('删除失败')
        }
        return res.cc('删除成功', 0)
    })
}

function getArticle(req, res) {
    const id = req.params.id
    const userid = req.user.id
    console.log(userid);

    const sqlStr = 'select username,nickname from userinfo where id =?'
    db.query(sqlStr, [userid], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        const username = results[0].nickname ? results[0].nickname : results[0].username
        const sqlStr = 'select pub_article.*,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.id = ?'
        db.query(sqlStr, [id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            results[0].username = username
            console.log(results);
            return res.send({
                status: 0,
                message: '获取文章成功',
                data: results

            })
        })
    })

}

function getArticleByid(req, res) {
    const id = req.params.id;
    const sqlStr = 'select pub_article.id,pub_article.title,pub_article.cate_id,pub_article.content,pub_article.cover_img,article_cates.name from pub_article inner join article_cates on pub_article.cate_id = article_cates.id where pub_article.id = ? and pub_article.is_delete = 0;';
    db.query(sqlStr, [id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        return res.send({
            status: 0,
            message: '获取信息成功',
            data: results
        })
    })
}

function updateArticle(req, res) {
    console.log(req.file);
    console.log(req.body);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('封面必须要上传！')
    }
    const reqData = {
        ...req.body,
        cover_img: req.file.filename,
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sqlStr = 'update pub_article set? where id = ?'
    db.query(sqlStr, [reqData, req.body.id], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('更新失败')
        }
        res.cc('更新成功', 0)
    })
}





module.exports = {
    addAticles,
    getArticleList,
    delArticle,
    getArticle,
    getArticleByid,
    updateArticle
}