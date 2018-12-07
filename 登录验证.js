const Koa=require('koa')
const app=new Koa()
const router=require('koa-router')()
//解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
const bodyParser=require('koa-bodyparser')
app.listen(3000)
app.use(async(ctx,next)=>{
  console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  await next()
})
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
});

router.post('/signin', async (ctx, next) => {
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});
app.use(bodyParser());
app.use(router.routes())

