var net = require("net");
var config = require('./config')
/**
 * 创建server
 */
function t1() {
  var server = net.createServer(function (socket) {
    var t = config.getTime()
    socket.write(t + "hello,i'm nodejs!"+"\r\n");
    console.log(t + "client connected! %j:%j", socket.remoteAddress, socket.remotePort);
    socket.on("data", function (data) {
      var t = config.getTime()
      console.log(t + "recived from autojs:", data.toString());
      socket.write(t + "这是来自nodejs的数据->海贼王啥时候完结??"+"\r\n");
    })
    socket.on("close", function (had_error) {
      if (!had_error) {
        console.log("client closed success! %j:%j", socket.remoteAddress, socket.remotePort);
      } else {
        console.log("client close error! %j:%j", socket.remoteAddress, socket.remotePort);
      }
    })
    socket.on("error", function (err) {
      console.log("!!!err!!!", err);
    });
    //setTimeout(function(){
    //    socket.end("我结束了","utf8");
    //},3000);
  });
  server.listen({
    port: config.port
  }, function () {
    var t = config.getTime()
    var address = server.address();
    console.log(t + " opened server on address %j ", address);
  });
}
t1();
