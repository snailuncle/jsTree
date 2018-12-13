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
var 连接服务器的次数 = 0
events.on('socketERROR', () => {
  与服务器socket通信()
});
与服务器socket通信()

function 与服务器socket通信() {
  try {
    log("连接服务器的次数=")
    log(连接服务器的次数)
    连接服务器的次数++;
    var socket = new Socket(ip, port);
    var out = socket.getOutputStream();
    var dataOS = new DataOutputStream(out);
    var outSW = new OutputStreamWriter(dataOS, "UTF-8");
    var bw = new BufferedWriter(outSW);
    //发送数据
    var t = config.getTime()
    var str = t + '这是来自autojs的数据->搜狗abc123'
    bw.write(str + "\r\n"); //加上分行符，以便服务器按行读取
    bw.flush()
    var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
    var inputStreamReader = new InputStreamReader(inputStream);
    var bufferedReader = new BufferedReader(inputStreamReader);
    while (1) {
      var a = bufferedReader.readLine();
      if (a && a.length > 3) {
        var t = config.getTime()
        log(t + '这是来自nodejs的数据->' + a)
        if (a.indexOf("giveMeMobileInfo") != -1) {
          var getMobileInfo = require('./getMobileInfo')
          mobileInfo = getMobileInfo()
          bw.write(mobileInfo + "\r\n"); //加上分行符，以便服务器按行读取
          bw.flush()
        }
        if (a.indexOf("runScript") != -1) {
          log('服务器发给客户端执行脚本的命令->'+a)
          var data=a.toString()
          data=data.replace('runScript','')
          log('正式脚本='+data)
          eval(data)
          bw.write('iHadRunScript' + "\r\n"); //加上分行符，以便服务器按行读取
          bw.flush()
        }
        if (a.indexOf("项目更新信息") != -1) {
          log('服务器发给客户端脚本更新信息=->'+a)
          var data=a.toString()
          data=data.replace('项目更新信息','')
          data=data.replace(/(^\s*)|(\s*$)/g, "");

          log('脚本更新信息='+data)

          bw.write('手机'+device.model+'收到更新脚本的信息'+data + "\r\n"); //加上分行符，以便服务器按行读取
          bw.flush()
        }
      }
      sleep(6000)
    };
  } catch (err) {
    log('err=')
    log(err)
    sleep(5000)
    events.emit('socketERROR');
  }
}
