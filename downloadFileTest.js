const koa = require('koa'); // "koa": "^2.2.0"
const app = new koa();
const router = require('koa-router')(); // "koa-router": "^7.2.0"
const send = require('koa-send'); // "koa-send": "^4.1.0"

router.get('/', async function (ctx) {
    var fileName = 'index.html';
    await send(ctx, fileName, { root: __dirname + '/public' });
});

router.get('/download', async function (ctx) {
    // 为了方便演示，这里直接下载index页面
    var fileName = 'index.html';
    // Set Content-Disposition to "attachment" to signal the client to prompt for download.
    // Optionally specify the filename of the download.
    // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
    // 也可以直接设置 ctx.set("Content-disposition", "attachment; filename=" + fileName);
    ctx.attachment(fileName);
    await send(ctx, fileName, { root: __dirname + '/public' });
});

app
    .use(router.routes())
    .use(router.allowedMethods());

    port=3000
app.listen(port);

console.log('open           http://localhost:' + port);
