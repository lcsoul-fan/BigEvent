const db = require("../db/db");

function addAticles(req, res) {
    console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('封面必须要上传！')
    }
    const reqData = {
        ...req.body,
        cover_img: req.file.filename,
        pub_time: new Date(),
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
        const countStr = 'select count(*) from pub_article where cate_id = ? and state = ?'
        db.query(countStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum) {
                return res.cc('页面超过可查询的最大值')
            };
            const sqlStr = 'select * from pub_article where cate_id = ? and state = ?'
            db.query(sqlStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                console.log(results.slice(4, 8));
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize)
                })
            })
        })

    } else if (reqinfo.cate_id && !reqinfo.state) {
        const countStr = 'select count(*) from pub_article where cate_id = ? and state = ?'
        db.query(countStr, [reqinfo.cate_id, reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum) {
                return res.cc('页面超过可查询的最大值')
            };
            const sqlStr = 'select * from pub_article where cate_id = ?'
            db.query(sqlStr, [reqinfo.cate_id], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize)
                })
            })
        })

    } else if (!reqinfo.cate_id && reqinfo.state) {
        const countStr = 'select count(*) from pub_article where state = ?'
        db.query(countStr, [reqinfo.state], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum) {
                return res.cc('页面超过可查询的最大值')
            };
            const sqlStr = 'select * from pub_article where state = ?'
            db.query(sqlStr, [reqinfo.state], (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize)
                })
            })
        })
    } else {
        const countStr = 'select count(*) from pub_article'
        db.query(countStr, (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results[0]['count(*)'] / reqinfo.pagesize < reqinfo.pagenum) {
                return res.cc('页面超过可查询的最大值')
            };
            const sqlStr = 'select * from pub_article'
            db.query(sqlStr, (err, results) => {
                if (err) {
                    res.cc(err)
                }
                return res.send({
                    status: 0,
                    message: '获取文章列表成功',
                    data: results.slice((reqinfo.pagenum - 1) * reqinfo.pagesize, (reqinfo.pagenum - 1) * reqinfo.pagesize + reqinfo.pagesize)
                })
            })
        })

    }
}





module.exports = {
    addAticles,
    getArticleList
}