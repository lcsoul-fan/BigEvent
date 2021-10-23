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

    $('tbody').on('click', '#modify', function() {
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#updatearticle').html(),
            area: ['60%', '90%'],
        });
        var id = $(this).attr('data-id')
        $.ajax({
                method: 'GET',
                url: '/my/article/info/' + id,
                success: function(res) {
                    $('#title').attr('value', res.data[0].title)
                    $('#defaultval').html(res.data[0].name)
                    $('#defaultval').attr('value', res.data[0].cate_id)
                    $('#articleid').attr('value', res.data[0].id)
                    $image
                        .cropper('destroy') // 销毁旧的裁剪区域
                        .attr('src', '../uploads/' + res.data[0].cover_img) // 重新设置图片路径
                        .cropper(options)
                    $('textarea[name=content]').html(res.data[0].content)
                }
            })
            //初始化富文本编辑器
        initEditor();
        getArtCate();


        var $image = $('#image')
            // 2. 裁剪选项
        var options = {
                aspectRatio: 400 / 280,
                preview: '.img-preview'
            }
            // 3. 初始化裁剪区域
        $image.cropper(options)
            //选择图片文件
        $('#makechoose').on('click', function() {
            $('#chooseimg').click();
        })



        $('#chooseimg').change(function(e) {
            var file = e.target.files[0]
            if (file.length <= 0) {
                return
            }
            var imgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', imgURL) // 重新设置图片路径
                .cropper(options)
        })

        var state = "已发布";
        $('#draft').on('click', function() {
            state = '草稿'
        })

        $('#pubform').on('submit', function(e) {
            e.preventDefault();
            var fd = new FormData($(this)[0])
            fd.append('id', id)
            fd.append('state', state)
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    fd.append('cover_img', blob)
                    updateArticle(fd)
                })
        })

        function updateArticle(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/update/article',
                data: fd,
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('更新成功')
                    location.href = 'art_list.html'
                }

            })
        }

        function getArtCate() {
            $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    var htmlstr = template('temp_pub', res)
                    $('[name=cate_id]').append(htmlstr)
                    form.render();
                }
            })
        }

        // $('.layui-layer-setwin').on('click', function() {
        //     $('#content').html('')
        //     console.log($('#content').html());
        // })
    })
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