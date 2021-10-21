// const { template } = require("../../lib/template-web");

// const { template } = require("../../lib/template-web");

// const { template } = require("../../lib/template-web");

$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        'pagenum': 1,
        'pagesize': 2,
        'cate_id': "",
        'state': ''
    }
    initGetArtlist();
    getTypeList();

    var indexdel = null
    $('tbody').on('click', '#del', function(e) {
        var num = document.querySelectorAll('#del').length
        console.log(num);
        var id = $(this).attr('data-id')
        console.log(id);
        indexdel = layer.open({
            title: '提示',
            content: '确认删除吗？',
            yes: function() {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg('删除成功')
                        if (num == 1) {
                            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                        }

                        initGetArtlist()
                    }
                })
            }

        });
    })

    var indexinfo = null
    $('tbody').on('click', '#artinfo', function(e) {
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                var strhtml = template('tempartinfo', res.data[0])
                var areaWidth = $('#tblartlist').width() * 0.8
                indexinfo = layer.open({
                    type: 1,
                    title: '预览文章',
                    content: strhtml,
                    area: [areaWidth + 'px', '500px'],
                    offset: '100px'
                });
            }
        })

    })

    $('#typeform').submit(function(e) {
        e.preventDefault();
        q.cate_id = $('#typelist').val();
        q.state = $('[name = state]').val();
        console.log(q.cate_id);
        console.log(q.state);
        initGetArtlist()
    })

    function getTypeList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('获取分类失败')
                }
                var strhtml = template('temp_typelist', res)
                $('#typelist').html(strhtml)
                form.render()
            }
        })
    }

    function initGetArtlist() {
        console.log(q);
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res);
                var str = template('temp_artlist', res)
                $('tbody').html(str)
                initPage(res)
            }
        })
    }

    function initPage(res) {
        laypage.render({
            elem: 'page',
            count: res.total,
            curr: q.pagenum,
            limit: q.pagesize,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 5, 7, 10],
            jump: function(obj, first) {
                q.pagesize = obj.limit;
                q.pagenum = obj.curr;
                if (!first) {
                    initGetArtlist()
                }
            }

        });
    }



})

template.defaults.imports.dateformat = function(date) {
    var newdate = new Date(date);
    var y = newdate.getFullYear();
    var m = newdate.getMonth() + 1;
    var d = padzero(newdate.getDate());
    var hh = padzero(newdate.getHours());
    var mm = padzero(newdate.getMinutes());
    var ss = padzero(newdate.getSeconds());
    return y + '-' + m + '-' + d + " " + hh + ':' + mm + ':' + ss;
}

template.defaults.imports.clearelem = function(str) {
    return str.split('"')[0]
}


function padzero(num) {
    return num > 9 ? num : '0' + num
}