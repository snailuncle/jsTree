var net = require("net");
function send(message){
  var server = net.createServer(function (socket) {
    // console.log('socket=')
    // console.log(socket)
    // console.table(socket)
    socket.write("hello,i'm nodejs!" + "\r\n");
    socket.on("data", function (data) {
      console.log("recived from autojs:", data.toString());
      socket.write("这是来自nodejs的数据->nodejs abcdefg --->收到的数据是"+data.toString() + "\r\n");
      socket.pipe(socket);
    })
    socket.on("end", function () {
      console.log("客户端关闭连接");
    })
  });
  server.listen({
    port: 8811
  }, function () {
    var address = server.address();
    console.log(" opened server on address %j %s", address ,port);
  });
  // socket.write("这是来自nodejs的数据->nodejs xxxxxxxxxx" + "\r\n");
  // console.log('server=')
  // console.log(server);
}
var msg='用函数发送socket消息'
send(msg)
