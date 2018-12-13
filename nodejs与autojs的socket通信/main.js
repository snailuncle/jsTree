const child = require('child_process').fork('server.js');


child.on('message', (msg) => {
  console.log('小头爸爸收到大头儿子发来的的消息->'+msg)
});

function childSendMsg(){
  console.log('启动childSendMsg函数');

  child.send('大头儿子,你给手机发socket消息,让他们更新脚本吧');

  setTimeout(发送项目更新信息,6000)

}
function 发送项目更新信息(){
  console.log("发送项目更新信息");
  
  var projectName='项目名称'
  var scriptVersionNumber='项目脚本版本号'
  var 项目更新信息={
    "projectName":projectName,
    "scriptVersionNumber":scriptVersionNumber
  }
  项目更新信息=JSON.stringify(项目更新信息)
  child.send('项目更新信息'+项目更新信息)
}

setTimeout(childSendMsg,20000)





function clock(){
  var t = new Date();
  console.log(t);

}
setInterval(clock, 5000);
