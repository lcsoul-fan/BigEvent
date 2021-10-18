const db = require('../db/db')


function getArticleCates(req, res) {
    const sqlStr = 'select * from article_cates where is_delete=0'
    db.query(sqlStr, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        return res.send(results)

    })
}


function addArticleCates(req, res) {
    const articleinfo = req.body
    const sqlStr = 'insert into article_cates set ?'
    db.query(sqlStr, { name: articleinfo.name, alias: articleinfo.alias }, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        console.log(results);
        if (results.affectedRows == 1) {
            return res.cc('新增文章分类成功', 0)
        }
    })
}

function delArticleCates(req, res) {
    const id = req.query
    const sqlStr = 'select * from article_cates where id =?'
    db.query(sqlStr, [id.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length <= 0) {
            return res.cc('分类不存在')
        }
        const delsqlStr = 'update article_cates set is_delete =1'
        db.query(delsqlStr, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            return res.cc('删除成功', 0)
        })
    })
}



module.exports = {
    getArticleCates,
    addArticleCates,
    delArticleCates
}