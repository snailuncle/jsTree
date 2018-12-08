
var router = require('koa-router')();

// router.prefix('/jstreeapi')

router.get('/',async (ctx,next) => {
  ctx.body='jstreeapi首页'
})
router.get('/add',async (ctx,next) => {
  ctx.body='jstreeapi  add'
})
router.get('/delete',async (ctx,next) => {
  ctx.body='jstreeapi  delete'
})
router.get('/edit',async (ctx,next) => {
  ctx.body='jstreeapi  edit'
})
router.get('/find',async (ctx,next) => {
  ctx.body='jstreeapi  find'
})

module.exports=router.routes()
