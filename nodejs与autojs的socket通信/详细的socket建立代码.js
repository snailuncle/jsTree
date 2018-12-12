// 1 引入模块
const net = require('net');
// 2 创建服务器
let clientArr = [];
const server = net.createServer();
// 3 绑定链接事件
server.on('connection', (person) => {
  console.log(clientArr.length);
  // 记录链接的进程
  person.id = clientArr.length;
  clientArr.push(person);
  person.setEncoding('utf8');
  // 客户socket进程绑定事件
  person.on('data', (chunk) => {
    console.log(chunk);
    clientArr.forEach((val) => {
      // 数据写入全部客户进程中
      val.write(chunk);
    })
  })
  person.on('close', (p1) => {
    clientArr[p1.id] = null;
  })
  person.on('error', (p1) => {
    clientArr[p1.id] = null;
  })
})
server.listen(800);
// ---------------------
// 作者：yiqiebyjian
// 来源：CSDN
// 原文：https://blog.csdn.net/yiqiebyjian/article/details/79644482
// 版权声明：本文为博主原创文章，转载请附上博文链接！
