

const Koa = require('koa');
const render = require('./src/index');
const path = require('path');
const bodyParser=require('koa-bodyparser')

const controller = require('./controller');
//引入子模块子路由
const router = require('koa-router')();
const jstreeapi=require('./router/jstreeapi.js')
const user=require('./router/admin/user.js')

const app = new Koa();



app.use(function (ctx, next) {   //设置上下文公共信息
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
  root: path.join(__dirname, 'view') ,    //挂在render  设置模板配置项
  extname: '.html',
});
// 最后一个middleware处理URL路由：

app.use(controller());
router.use('/jstreeapi',jstreeapi)
router.use('/user',user)
app.use(router.routes()).use(router.allowedMethods())


















// app.use(async function (ctx) {
//   const users = [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }];
//   await ctx.render('index', {   // 渲染content模板
//     users
//   });
// });


app.listen(3000);
console.log('open http://localhost:3000');


app.on('error', function (err) {
  console.log(err.stack);
});
