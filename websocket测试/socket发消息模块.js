var net = require("net");
var client=net.connect({port:8811},function(){
  console.log('连接到服务器')
})
client.write('发送消息')
client.on('data',function(data){
  console.log(data.toString())
  client.end()
})
client.on('end',function(){
  console.log('断开与服务器的连接');
  
})


function send(message){
  var server = net.createServer(function (socket) {
    // console.log('socket=')
    // console.log(socket)
    // console.table(socket)
    socket.write("hello,i'm nodejs!" + "\r\n");
    socket.on("data", function (data) {
      console.log("recived from autojs:", data.toString());
      socket.write("这是来自nodejs的数据->nodejs abcdefg --->收到的数据是"+data.toString() + "\r\n");
      socket.write(message + "\r\n");
      // socket.pipe(socket);
    })
    socket.on("end", function () {
      console.log("客户端关闭连接");
    })
  });
  var port=8811
  server.listen({
    port: port
  }, function () {
    var address = server.address();
    console.log(" opened server on address %j %s", address);
  });
  // socket.write("这是来自nodejs的数据->nodejs xxxxxxxxxx" + "\r\n");
  // console.log('server=')
  // console.log(server);
}
var msg='用函数发送socket消息-------------'
send(msg)
send(msg)
