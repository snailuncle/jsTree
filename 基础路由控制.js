const Koa=require('koa')
const app=new Koa()
const router=require('koa-router')()
//解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
const bodyParser=require('koa-bodyparser')

// 导入controller middleware:
const controller = require('./controller');


app.listen(3000)
app.use(async(ctx,next)=>{
  console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  await next()
})
app.use(bodyParser());
app.use(router.routes())
app.use(controller());

