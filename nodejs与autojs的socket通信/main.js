const child = require('child_process').fork('server.js');

child.send('大头儿子,你给手机发socket消息,让他们更新脚本吧');


child.on('message', (msg) => {
  console.log('小头爸爸收到大头儿子发来的的消息->'+msg)
});









function clock(){
  var t = new Date();
  console.log(t);

}
setInterval(clock, 5000);
