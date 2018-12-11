const port = require("./config.json")
const Koa = require('koa');
const render = require('./src/index');
const path = require('path');
const bodyParser = require('koa-bodyparser')
const controller = require('./controller');
//引入子模块子路由
const router = require('koa-router')();
//websocket要导入的包
const route = require('koa-route')
const websockify = require('koa-websocket')
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
app = websockify(app);
app.ws.use(function (ctx, next) {
  return next(ctx)
})



router.get('/runIndex',async (ctx,next) => {
  ctx.response.body = `请稍后...`;
  app.ws.use(route.all('/', function (ctx, next) {
    ctx.websocket.on('message', function (message_Mobile) {
      console.log('服务器收到的手机的websocket消息=')
      console.log(message_Mobile)
      var message = "please run index.js"
      ctx.websocket.send(message + "手机说"+message_Mobile)
      if (message_Mobile == 'runIndexStart_OK') {
        ctx.websocket.send('收到手机运行indexOK的消息')
      }

    })
    return next(ctx)
  }))

  return next();
})







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
console.log('open http://localhost:' + port.httpPort);
app.on('error', function (err) {
  console.log(err.stack);
});
