

s=new WebSocket('ws://127.0.0.1:3333/');
log(s)

exit()

var CreateWebSocket = (function () {
  return function (urlValue) {
    return new WebSocket(urlValue);
    // return new MozWebSocket(urlValue);
    // return false;
  }
})()
// 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
var webSocket = CreateWebSocket("ws://127.0.0.1:3333/");
// var webSocket = CreateWebSocket("ws://127.0.0.1:3000/");
webSocket.onopen = function (evt) {
  // 一旦连接成功，就发送第一条数据
  webSocket.send("第一条数据")
}
webSocket.onmessage = function (evt) {
  // 这是服务端返回的数据
  console.log("服务端说" + evt.data)
}
// 关闭连接
webSocket.onclose = function (evt) {
  console.log("Connection closed.")
}
// input事件发送数据
// document.getElementById("submit").onclick = function () {
//   var str = document.getElementById("pl").value
//   console.log('要发送的数据=' + str)
//   webSocket.send(str)
// }
