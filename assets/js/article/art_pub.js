// const { template } = require("../../lib/template-web");

$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //初始化富文本编辑器
    initEditor()
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
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

        fd.forEach(function(v, k) {
            console.log(k, v);
        })


    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('发布成功')
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
                $('[name=cate_id]').html(htmlstr)
                form.render();
            }
        })
    }
})