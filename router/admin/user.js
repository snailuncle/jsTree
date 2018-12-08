
var router = require('koa-router')();

// router.prefix('/user')

router.get('/',async (ctx,next) => {
  // ctx.body='user首页'
  await ctx.render('admin/user/index')
})
router.get('/add',async (ctx,next) => {
  await ctx.render('admin/user/add')

})
router.get('/delete',async (ctx,next) => {
  await ctx.render('admin/user/delete')

})
router.get('/edit',async (ctx,next) => {
  await ctx.render('admin/user/edit')

})
router.get('/find',async (ctx,next) => {
  await ctx.render('admin/user/find')
})

module.exports=router.routes()
