
function 获取配置文件内容(){
  var 父目录=files.cwd()
  var 配置文件名="收壶配置文件.js"
  var 配置文件路径=files.join(父目录, 配置文件名)
  log("配置文件路径=",配置文件路径)
  var 配置文件内容 = files.read(配置文件路径)
  var result = JSON.parse(配置文件内容);
  for (var key in result) {
    log(key + ':' + result[key]);
  }
  return result
}
var circle = {};
circle.获取配置文件内容 = 获取配置文件内容
module.exports = circle;
