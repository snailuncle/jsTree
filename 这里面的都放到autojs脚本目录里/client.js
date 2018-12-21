

// log(files.getSdcardPath())
// exit()


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
var sdPath=files.getSdcardPath()
var 脚本文件夹=files.join(sdPath, '脚本')
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
          log('服务器发给客户端执行脚本的命令->' + a)
          var data = a.toString()
          data = data.replace('runScript', '')
          log('正式脚本=' + data)
          eval(data)
          bw.write('iHadRunScript' + "\r\n"); //加上分行符，以便服务器按行读取
          bw.flush()
        }
        if (a.indexOf("项目更新信息") != -1) {
          log('服务器发给客户端脚本更新信息=->' + a)
          var data = a.toString()
          data = data.replace('项目更新信息', '')
          data = data.replace(/(^\s*)|(\s*$)/g, "");
          log('脚本更新信息=' + data)
          // 2018-12-14 09:10:22recived from autojs:
          // 手机Redmi Note 5A          收到更新脚本的信息
          // {"projectName":"某平台阅读脚本","scriptVersionNumber":"10"}
          bw.write('手机' + device.model + '收到更新脚本的信息' + data + "\r\n"); //加上分行符，以便服务器按行读取
          bw.flush()
          //下载文件
          var project = (JSON.parse(data))
          //如果在线版本号大于本地版本号,那么就更新,否则就不更新
          // 5A收到更新脚本的信息{"projectName":"某平台阅读脚本","scriptVersionNumber":"10","port":"3000"}
          var 在线版本号=project.scriptVersionNumber
          var 本地版本号=0
          //本地版本号先查看项目是否存在,不存在版本号为0
          //版本号在项目文件中的index.js文件中查询
          if(指定项目存在(project.projectName) && 指定项目中有index文件(project.projectName) && index文件中有版本号(project.projectName)){
            本地版本号=查询index文件中的版本号(project.projectName)
          }

          if(parseInt(在线版本号)>parseInt(本地版本号)){
            console.log('开始更新脚本')
            downloadFile(project)

          }else if(在线版本号=='666'){
            console.log('666无视版本号开始更新脚本')
            downloadFile(project)

          }else{
            console.log('本地版本已是最新版,不需要更新')
            if(index文件是否在运行中()){
              console.log('index文件是在运行中ING')
            }else{
              console.log('index文件没有运行,启动index.js')
              启动项目文件中的index文件(project.projectName)
              // alert('启动index完毕')
            }
















          }
        }
      }
      sleep(6000)
    };
  } catch (err) {
    log('err=')
    log(err)
    log('err.stack=')
    log(err.stack)
    sleep(5000)
    events.emit('socketERROR');
  }
}

function downloadFile(project) {
  console.log('进入downloadFile内部');
  var ip = config.serverIP;
  var port = project.port;
  // router.get('/download/:fileName', async function (ctx) {
  http: //localhost:3000/
    var url = ip + ":" + port + "/download/" + project.projectName
  console.log('手机请求的url=' + url);
  http.get(url, {}, function (res, err) {
    if (err) {
      console.error(err);
      return;
    }
    log("code = " + res.statusCode);
    console.log("HTTP Headers:")
    for (var headerName in res.headers) {
      console.log("%s: %s", headerName, res.headers[headerName]);
    }
    var bodyBytes = res.body.bytes()
    console.log('bodyBytes.length=')
    console.log(bodyBytes.length)
    var fileName = res.headers['Content-Disposition']
    console.log('Content-Disposition=')
    console.log(fileName);
    // Content-Disposition: attachment; filename="???????.zip"; filename*=UTF-8''%E6%9F%90%E5%B9%B3%E5%8F%B0%E9%98%85%E8%AF%BB%E8%84%9A%E6%9C%AC.zip

    if(fileName.indexOf("filename*=UTF-8") != -1){

          var fileNameReg = /filename\*=UTF-8''(.+?\.zip)/
          fileName = fileName.match(fileNameReg)[1]
          fileName = decodeURI(fileName)

    }else{
      var fileNameReg = /filename=\"(.+?\.zip)/
      fileName = fileName.match(fileNameReg)[1]
      // fileName = decodeURI(fileName)
    }
    console.log('正则匹配fileName结果=');
    console.log(fileName);
    var path = './' + fileName
    console.log('开始写入文件')
    console.log(path)
    console.log(bodyBytes.length)
    files.writeBytes(path, bodyBytes)
    console.log('下载并写入文件完毕,文件名字=');
    console.log(fileName);
    // 解压项目文件到/脚本文件夹中,并启动项目文件中的index.js
    解压文件(fileName)
    启动项目文件中的index文件(project.projectName)

  });
  console.log('函数运行完成downloadFile');
}


function 启动项目文件中的index文件(projectName){
  console.log('启动项目文件中的index文件开始')
  console.log('启动项目文件中的index文件(projectName)='+projectName)

// log(files.getSdcardPath())
// exit()
  var indexPath=files.getSdcardPath()+"/脚本/"+projectName+"/index.js"
  console.log('indexPath='+indexPath)
  停止除了自身的所有脚本()

  engines.execScriptFile(indexPath);

  console.log('启动项目文件中的index文件完毕')


}


function 解压文件(fileName){
  console.log('开始解压文件')
  var fileName=files.path('./'+fileName)
  var unzipFileName=fileName.replace('.zip','')
  com.stardust.io.Zip.unzip(new java.io.File(fileName), new java.io.File(unzipFileName))
  console.log('结束解压文件')
}


function 停止除了自身的所有脚本(){

  // 脚本数组 = ['aaa', 'bbb', 'ccc']
  // 脚本数组.map((file) => {
  //   engines.execScriptFile(files.cwd() + "/" + file + ".js")
  // })
  var enginesAll = engines.all()
  log(enginesAll)
  enginesAll.map((ScriptEngine) => {
    if (engines.myEngine().toString() == ScriptEngine.toString()) {} else {
      console.log('除了client.js其他即将停止的脚本引擎' + ScriptEngine)
      ScriptEngine.forceStop()
    }
  })

}





function 指定项目存在(projectName){
  var 指定项目文件夹=files.join(脚本文件夹, projectName)
  return files.exists(指定项目文件夹)
}
function 指定项目中有index文件(projectName){
  var 指定项目文件夹=files.join(脚本文件夹, projectName)



  var dir = 指定项目文件夹;
  var arr = files.listDir(dir);
  log(arr);
  for(let i=0;i<arr.length;i++){
    if(arr[i]=='index.js'){
      return true
    }
  }
  return false

}
function index文件中有版本号(projectName){
  var 指定项目文件夹=files.join(脚本文件夹, projectName)
  var indexPath=files.join(指定项目文件夹, 'index.js')
  var indexContent=files.read(indexPath)


  var scriptVersionNumberReg = /scriptVersionNumber=(\d+)/
  var svn = indexContent.match(scriptVersionNumberReg)
  if(svn){
    return true
  }
  return false
}

// 本地版本号=查询index文件中的版本号()

function 查询index文件中的版本号(projectName){
  var 指定项目文件夹=files.join(脚本文件夹, projectName)
  var indexPath=files.join(指定项目文件夹, 'index.js')
  var indexContent=files.read(indexPath)


  var scriptVersionNumberReg = /scriptVersionNumber=(\d+)/
  var svn = (indexContent.match(scriptVersionNumberReg))[1]
  return svn
}




function index文件是否在运行中(){
  var enginesAll = engines.all()
  log('enginesAll=')
  log(enginesAll)
  var indexRunning=false
  enginesAll.map((ScriptEngine) => {
    log('ScriptEngine.source=')
    log(ScriptEngine.source)
    if (String(ScriptEngine.source).indexOf('index.js') != -1){
      console.log('查到的运行中的index.js文件是')
      console.log(engines.myEngine().toString())
      indexRunning=true
    }
  })
  if(indexRunning){
    return true
  }
  return false
}
