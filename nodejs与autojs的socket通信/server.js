console.log('运行server.js')


var net = require("net");
var config = require('./config')
/**
 * 创建server
 */
function removeBlank(str){
  var result=str.replace(/^\s+|\s+$/g,'');
  return result
}
function recordClientInfo(client){
  // 唯一标识码 做键名
  var fs = require('fs'); //文件模块
  var path = require('path'); //系统路径模块

  fs.exists("./clientInfo.json", function(exists) {
    console.log("./clientInfo.json")
    console.log(exists ? "存在" : "不存在");
    var file = path.join(__dirname, './clientInfo.json');
    if(!exists){
      //指定创建目录及文件名称，__dirname为执行当前js文件的目录
      //写入文件
      var content = {}
      var 唯一标识码=client.唯一标识码
      content[唯一标识码]=client

      var content = JSON.stringify(content);
      fs.writeFile(file, content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('客户端信息文件创建成功，地址：' + file);
        console.log("本次记录的客户端为");
        console.log(content);


      });

    }else{




      fs.readFile(file,'utf8',function (err, data) {
        if(err) console.log(err);
        var clientInfo=JSON.parse(data);
        var 唯一标识码=client.唯一标识码
        clientInfo[唯一标识码]=client
        // fs.writeFileSync('test1.json',t)
        var content = JSON.stringify(clientInfo);
        fs.writeFile(file, content, function(err) {
          if (err) {
              return console.log(err);
          }
          console.log('客户端信息写入成功,写入文件为：' + file);
          console.log("本次记录的客户端为");
          console.log(content);
        });

});

    }
  });



}

function t1() {
  var once=false
  var server = net.createServer(function (socket) {
    var t = config.getTime()
    socket.write(t + "hello,i'm nodejs! giveMeMobileInfo"+"\r\n");
    console.log(t + "client connected! %j:%j", socket.remoteAddress, socket.remotePort);

    socket.on("customEvent", function (msg) {
      console.log('Received customEvent->'+msg);
    });
    socket.emit('customEvent','与on同级别 socket emit customEvent')

    socket.on("data", function (data) {
      socket.emit('customEvent','data事件内部 socket emit customEvent')

      var t = config.getTime()
      var mobileInfo=''
      if((data.toString()).indexOf('thisIsMobileInfo') != -1){
        var data=data.toString()
        data=data.replace('thisIsMobileInfo','')
        mobileInfo=JSON.parse(data)
        mobileInfo.ip=socket.remoteAddress
        mobileInfo.port=socket.remotePort
        mobileInfo.客户端登记时间=t+""
        console.log("服务器收到的手机信息mobileInfo=")
        console.log(mobileInfo);
        console.table(mobileInfo);
        recordClientInfo(mobileInfo)
        var scriptContent='alert(\''+ JSON.stringify(mobileInfo) +'\')'
          if(mobileInfo){
            socket.write("runScript"+scriptContent+"\r\n");
            // once=true

          }
      }


      if(removeBlank(data.toString()) == 'iHadRunScript'){
        console.log('手机执行脚本完毕->'+scriptContent);
      }else if((data.toString()).indexOf('iHadRunScript') != -1){
        console.log('indexOf手机执行脚本完毕,手机传过来的数据==='+data.toString()+"===");
      }

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



process.on('message', (msg) => {
  console.log('大头儿子收到小头爸爸发来的的消息->'+msg)
  process.send(`\n小头爸爸,我收到你的消息了,剩下的事情交给我了\n`);
  // process.send(`\nhello parent\n`);
  // process.send('[worker] worker received!');
  命令所有手机更新指定项目的脚本()
});

function 命令所有手机更新指定项目的脚本(){
  for(let i=0;i<所有的手机.length;i++){
    var socket=所有的手机[i]
    socket.write("都起床,小头爸爸说,得更新脚本啦");
  }

}
