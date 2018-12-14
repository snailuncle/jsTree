Response.body
{Object}
当前响应的内容。他有以下属性和函数：

bytes() {Array} 以字节数组形式返回响应内容


console.show();
http.get("www.baidu.com", {}, function(res, err){
    if(err){
        console.error(err);
        return;
    }
    log("code = " + res.statusCode);
    var bodyBytes=res.body.bytes()
    var path='./'
    files.writeBytes(path, bytes)
});
