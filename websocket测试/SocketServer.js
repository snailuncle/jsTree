var net = require("net");
var server = net.createServer(function (socket) {
  // console.log('socket=')
  // console.log(socket)
  // console.table(socket)
  socket.write("hello,i'm nodejs!" + "\r\n");
  socket.on("data", function (data) {
    console.log("recived from autojs:", data.toString());
    socket.write("这是来自nodejs的数据->nodejs abcdefg --->收到的数据是"+data.toString() + "\r\n");
  })
});
server.listen({
  port: 8811
}, function () {
  var address = server.address();
  console.log(" opened server on address %j ", address);
});
// socket.write("这是来自nodejs的数据->nodejs xxxxxxxxxx" + "\r\n");
console.log('server=')
console.log(server);

