var config = require('./config')
importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");
importClass("java.io.OutputStreamWriter");
importClass("java.io.BufferedWriter");
importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');
console.show();
var ip = config.serverIP;
var port = config.port;
var socket = new Socket(ip, port);
var out = socket.getOutputStream();
var dataOS = new DataOutputStream(out);
var outSW = new OutputStreamWriter(dataOS, "UTF-8");
var bw = new BufferedWriter(outSW);
//发送数据
var t=config.getTime()
var str = t+'这是来自autojs的数据->搜狗abc123'
bw.write(str + "\r\n"); //加上分行符，以便服务器按行读取
bw.flush()

function heartBeat() {
  var t=config.getTime()
  var HeartBeatContent = t+"这是来自autojs的心跳包HeartBeat"
  bw.write(HeartBeatContent);
  bw.flush();
}
threads.start(function () {
  while (1) {
    sleep(3000);
    heartBeat();
  }
});
var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream);
var bufferedReader = new BufferedReader(inputStreamReader);
while (1) {
  var a = bufferedReader.readLine();
  try {
    if(a && a.length > 3){
      var t=config.getTime()
      log(t+'这是来自nodejs的数据->' + a)
    }
  } catch (err) {
    console.log(err)
  }
  sleep(3000)
};
