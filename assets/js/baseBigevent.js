$.ajaxPrefilter(function(options) {
    //统一拼接请求地址
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    //统一对需要权限的定制增加 headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            'Authorization': sessionStorage.getItem('token') || ""
        }
    }
    //统一对未授权登录进行处理，返回login页面
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
            sessionStorage.removeItem('token');
            location.href = 'login.html';
        }
    }
})