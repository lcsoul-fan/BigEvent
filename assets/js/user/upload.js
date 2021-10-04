// const layuiAll = require("../../assets/lib/layui/layui.all")

$(function() {
    var layer = layui.layer
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#upload').on('click', function() {
        $('#file').click();
    })

    $('#file').change(function(e) {
        var file = e.target.files[0]
        if (file.length <= 0) {
            return layer.msg('请先选择图片')
        }
        var newInmageUrl = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newInmageUrl) // 重新设置图片路径
            .cropper(options)
    })

    $('#sure').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符
        $.ajax({
            url: '/my/update/avatar',
            data: { 'avatar': dataURL },
            method: 'POST',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('头像更新成功')
                window.parent.getUserInfo()
            }
        })
    })
})