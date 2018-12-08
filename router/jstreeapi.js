
var router = require('koa-router')();
var api = require('./jstree/api.js');

// router.prefix('/jstreeapi')

// 配置jstree的子路由

router.get('/',async (ctx,next)=>{
  ctx.body='jstreeapi首页'
})
router.use('/api',api)

module.exports=router.routes()
