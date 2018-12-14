const port = require("./config.json")
const config = require("./config.js")
const Koa = require('koa');
const render = require('./src/index');
const path = require('path');
const bodyParser = require('koa-bodyparser')
const controller = require('./controller');
const send = require('koa-send'); // "koa-send": "^4.1.0"

//引入子模块子路由
const router = require('koa-router')();
//websocket要导入的包
const route = require('koa-route')
const jstreeapi = require('./router/jstreeapi.js')
const user = require('./router/admin/user.js')
var app = new Koa();
// app = websockify(app);
// app.ws.use(function (ctx, next) {
//   return next(ctx)
// })
// app.ws.use(route.all('/ws', function (ctx, next) {
//   ctx.websocket.on('message', function (message) {
//     console.log('服务器收到的websocket消息=')
//     console.log(message)
//     ctx.websocket.send(message)
//   })
//   return next(ctx)
// }))
app.use(function (ctx, next) { //设置上下文公共信息
  ctx.state = ctx.state || {};
  ctx.state.now = new Date();
  ctx.state.ip = ctx.ip;
  ctx.state.version = '2.0.0';
  return next();
});
// 第一个middleware是记录URL以及页面执行时间：
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});
// 第二个middleware处理静态文件：
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(staticFiles('/dist/', __dirname + '/dist'));
// 第三个middleware解析POST请求：
app.use(bodyParser());
// 第四个middleware负责给ctx加上render()来使用Nunjucks：
render(app, {
  root: path.join(__dirname, 'view'), //挂在render  设置模板配置项
  extname: '.html',
});
// 最后一个middleware处理URL路由：
app.use(controller());
router.use('/jstreeapi', jstreeapi)
router.use('/user', user)
// 'GET /runIndex': fn_runIndex






router.get('/runIndex/:projectName', async (ctx, next) => {
  console.log('要运行的项目名称=')
  var projectName = ctx.params.projectName;
  console.log(projectName)
  ctx.response.body = `后端收到runIndex命令`;


  if (指定项目中有index文件(projectName)) {
    if (index文件中有版本号(projectName)) {

    } else {
      添加版本号(projectName)
    }
  } else {
    在指定项目中创建index文件(projectName)
  }





















































































  //将指定项目压缩
  var folder = './projectList/' + projectName
  var zipFilePath = zipFolder(folder)
  //告诉手机下载指定项目的压缩包
  var 版本号 = 1
  // 版本号读取所选项目的index.js文件,
  // 查看scriptVersionNumber字段
  var fs = require('fs');
  var indexFilePath = folder + '/index.js'
  if (!fs.existsSync(indexFilePath)) {
    // Do something
    console.log('请在项目中建立index.js文件');
    console.log('文件中必须有一行内容来指定项目版本号,如下');
    console.log('scriptVersionNumber=1');

    process.exit(1)
  }



  console.log('--------读取index.js文件开始--------');

  var fileContent = fs.readFileSync(indexFilePath, 'utf-8');

  console.log('--------读取index.js文件结束--------');

  //检查版本号
  var reg = /scriptVersionNumber=(\d+)/
  var 版本号 = fileContent.match(reg)[1]









  var 服务器下载端口 = port.httpPort
  project = {
    "projectName": projectName,
    "scriptVersionNumber": 版本号,
    'port': 服务器下载端口
  }
  tellMobileDownloadProjectZipFile(project)
  //下载完毕手机自动运行该项目中的index.js
  //默认版本号为1 如果在index中发现版本号,以index中的版本号为准
  //如果手机上的版本号小于当前版本号,那么就更新脚本.



})

function zipFolder(folder) {
  var zip = require('./zipFolder/zipFolder.js')
  console.log("zip=")
  console.log(zip)
  var zipFilePath = zip.zipFolder(folder)
  return './' + zipFilePath
}


function tellMobileDownloadProjectZipFile(projectName) {
  var t = config.getTime()
  console.log(t)
  // console.log('6秒后通知手机更新脚本');

  // setTimeout(childSendMsg,6000)
  childSendMsg(projectName)


}


// router.get('/runIndex',async (ctx,next) => {
//   ctx.response.body = `后端收到runIndex命令`;
//   app.ws.use(route.all('/', function (ctx, next) {
//     ctx.websocket.on('message', function (message_Mobile) {
//       console.log('服务器收到的手机的websocket消息=')
//       console.log(message_Mobile)
//       var message = "please run index.js"
//       ctx.websocket.send(message + "手机说"+message_Mobile)
//       if (message_Mobile == 'runIndexStart_OK') {
//         ctx.websocket.send('收到手机运行indexOK的消息')
//       }

//     })
//     return next(ctx)
//   }))

//   return next();
// })


//下载文件
router.get('/download/:fileName', async function (ctx) {
  // 为了方便演示，这里直接下载index页面


  var fileName = ctx.params.fileName + '.zip';
  console.log('要下载的文件的名字=' + fileName)
  // Set Content-Disposition to "attachment" to signal the client to prompt for download.
  // Optionally specify the filename of the download.
  // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
  // 也可以直接设置 ctx.set("Content-disposition", "attachment; filename=" + fileName);
  ctx.attachment(fileName);
  await send(ctx, fileName, {
    root: __dirname + '/zipFolder'
  });
});


app.use(router.routes()).use(router.allowedMethods())
// app.use(async function (ctx) {
//   const users = [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }];
//   await ctx.render('index', {   // 渲染content模板
//     users
//   });
// });
console.log('port=')
console.log(port)
app.listen(port.httpPort);
console.log('open           http://localhost:' + port.httpPort);
app.on('error', function (err) {
  console.log(err.stack);
});



//以下是socket部分,fork一个子进程,以便与手机通信===================================================================================


const child = require('child_process').fork('./socketServer.js');


child.on('message', (msg) => {
  console.log('大头儿子说->' + msg)
});

function childSendMsg(projectName) {
  console.log('启动childSendMsg函数');
  console.log('现在通知手机更新脚本')
  child.send('小头爸爸说->大头儿子,让他们更新脚本吧');

  // setTimeout(发送项目更新信息,6000)

  发送项目更新信息(projectName)
}

function 发送项目更新信息(project) {
  console.log("发送项目更新信息");

  // var projectName=project.projectName
  // var scriptVersionNumber=project.scriptVersionNumber
  // var 项目更新信息={
  //   "projectName":projectName,
  //   "scriptVersionNumber":scriptVersionNumber
  // }
  项目更新信息 = JSON.stringify(project)
  child.send('项目更新信息' + 项目更新信息)
}






// function clock(){
//   var t = new Date();
//   console.log(t);

// }
// setInterval(clock, 5000);





function 指定项目中有index文件(projectName){
  var fs= require('fs')
  var path  = require('path');  // node内置模块。

  var 指定项目文件夹=path.join(__dirname, './projectList', projectName)
  var indexPath=path.join(指定项目文件夹, 'index.js')

  if(fs.existsSync(indexPath)){
    return true
  }
  return false

}
function index文件中有版本号(projectName){
  var fs= require('fs')
  var path  = require('path');  // node内置模块。

  var 指定项目文件夹=path.join(__dirname, './projectList', projectName)
  var indexPath=path.join(指定项目文件夹, 'index.js')

  var indexContent=fs.readFileSync(indexPath, 'utf8');


  var scriptVersionNumberReg = /scriptVersionNumber=(\d+)/
  var svn = indexContent.match(scriptVersionNumberReg)
  if(svn){
    return true
  }
  return false
}
function 添加版本号(projectName){
  var fs= require('fs')
  var path  = require('path');  // node内置模块。

  var 指定项目文件夹=path.join(__dirname, './projectList', projectName)
  var indexPath=path.join(指定项目文件夹, 'index.js')
  var data='\nscriptVersionNumber=1\n'
  fs.appendFileSync(indexPath,data)
}
function 在指定项目中创建index文件(projectName){
  var fs= require('fs')
  var path  = require('path');  // node内置模块。

  var 指定项目文件夹=path.join(__dirname, './projectList', projectName)
  var indexPath=path.join(指定项目文件夹, 'index.js')
  var data='\nscriptVersionNumber=1\nalert("hello world")\n'
  fs.writeFileSync(indexPath,data)
}

