
threads.start(function () {
  //在新线程执行的代码
  while (1) {
    autojs打开app提醒=textMatches(/Auto.js 正在尝试开启.*是否允许？/).findOnce()
    if(autojs打开app提醒){
      log("autojs打开app提醒=",autojs打开app提醒.text())
      click('允许')
      sleep(2000)
    }else{
      log('没有找到autojs打开app提醒')
    }
    sleep(2000)
  }
});


初始化配置文件 = require("./初始化收壶配置文件")
初始化配置文件.初始化配置文件()

使用无极更换ip = require("./使用无极更换ip")
收壶资讯阅读 = require("./1收壶资讯")

获取应用名 = require("./1遍历收壶分身.js")
收壶分身列表=获取应用名.获取应用名("收壶资讯")
// [ { '包名': 'dkmodel.dtw.szh', '名称': '3收壶资讯分身' },
//   { '包名': 'dkmodel.sru.lom', '名称': '4收壶资讯分身' },
//   { '包名': 'dkmodel.kid.van', '名称': '2收壶资讯分身' },
//   { '包名': 'dkmodel.fxd.dzb', '名称': '9收壶资讯分身' },
//   { '包名': 'dkmodel.bce.knm', '名称': '5收壶资讯分身' },
//   { '包名': 'dkmodel.pyo.yth', '名称': '7收壶资讯分身' },
//   { '包名': 'com.sohu.infonews', '名称': '收壶资讯' },
//   { '包名': 'dkmodel.ztv.mnl', '名称': '1收壶资讯分身' },
//   { '包名': 'dkmodel.voq.uqo', '名称': '6收壶资讯分身' },
//   { '包名': 'dkmodel.htt.mwl', '名称': '8收壶资讯分身' } ]
获取配置文件内容 = require("./获取收壶配置文件内容")
配置文件内容 = 获取配置文件内容.获取配置文件内容()



// var 手机编号 = 配置文件内容.手机编号
// var 第几个分身路径 = 配置文件内容.第几个分身路径
// log("第几个分身路径=",第几个分身路径)
// 从第几个分身开始=files.read(第几个分身路径)
// 从第几个分身开始=/\d+/.exec(从第几个分身开始)
// 从第几个分身开始=从第几个分身开始[0]
// 从第几个分身开始=parseInt(从第几个分身开始)


for(let i=0;i<收壶分身列表.length;i++){
  var 当前分身名字=收壶分身列表[i]["名称"]
  if(当前分身名字 && 当前分身名字.length>3){

  }else{
    continue;
  }
  if(是否已经完成今日阅读任务(当前分身名字)){
    log(当前分身名字,"已经完成今日任务")
    continue
  }else{
    log(当前分身名字,"没有完成今日任务")
  }
  切换ip()
  sleep(3000)
  开始阅读(当前分身名字)
  sleep(3000)
  停止分身(当前分身名字)
  // files.write(第几个分身路径, 从第几个分身开始+1);
  记录完成任务的app名字(当前分身名字)
  sleep(3000)
}
显示完成的分身()

function 显示完成的分身(){
  var 保存今日完成阅读任务的app名字的路径 = 配置文件内容.保存今日完成阅读任务的app名字的路径
  var 指定号码路径 = 保存今日完成阅读任务的app名字的路径
  var r=files.read(指定号码路径)
  log(r)
  alert(r)
}



function 记录完成任务的app名字(当前分身名字){
  var 保存今日完成阅读任务的app名字的路径 = 配置文件内容.保存今日完成阅读任务的app名字的路径
  var 指定号码路径 = 保存今日完成阅读任务的app名字的路径
  var file = open(指定号码路径, "r")
  var textArr = file.readlines()
  log(textArr)
  file.close()
  if (textArr && textArr.hasOwnProperty('length')  && textArr.length > 0) {} else {
    files.write(指定号码路径, "\n"+当前分身名字);
    return true;
  }
  newTextArr = []
  for (let i = 0; i < textArr.length; i++) {
    if(textArr[i] && textArr[i].hasOwnProperty('length')  && textArr[i].length>3){
      newTextArr.push(textArr[i])
    }
  }
  newTextArr[textArr.length] = 当前分身名字
  newTextArr=newTextArr.join("\n")
  files.write(指定号码路径,newTextArr)
}


function 是否已经完成今日阅读任务(当前分身名字){
  // 保存今日完成阅读任务的app名字的路径
  var 保存今日完成阅读任务的app名字的路径 = 配置文件内容.保存今日完成阅读任务的app名字的路径
  var 指定号码路径 = 保存今日完成阅读任务的app名字的路径
  var file = open(指定号码路径, "r")
  var textArr = file.readlines()
  log(textArr)
  file.close()
  if (textArr && textArr.hasOwnProperty('length')  && textArr.length > 0) {} else {
    log('保存今日完成阅读任务的app名字的路径文本为空')
    log(当前分身名字,'没有完成阅读任务')
    return false;
  }
  for (let i = 0; i < textArr.length; i++) {
    var 当前行内容 = textArr[i]
    if (当前行内容==当前分身名字) {
      return true
    }
  }
  return false
}

function 切换ip(){
  使用无极更换ip结果 = 使用无极更换ip.使用无极更换ip()
  log("使用无极更换ip结果=")
  log(使用无极更换ip结果)
}

// 1收壶资讯.js
function 开始阅读(当前分身名字){
  收壶资讯阅读.收壶资讯阅读(当前分身名字)
}
function 停止分身(当前分身名字){
  停止app(当前分身名字)
}
function 停止app(appName){
  packageName=getPackageName(appName)
  // var result = shell.exitAndWaitFor("am force-stop "+packageName+" ", true);
  var result = shell("am force-stop "+packageName+" ", true);
  log(result);
  if(result.code == 0){
    toastLog("执行成功,exit执行成功");
    return true;
  }else{
    toastLog("执行失败！请到控制台查看错误信息,exit执行失败");
    exit()
  }
}


// function 停止app(appName){
//   log('appName=',appName)
//   packageName=getPackageName(appName)
//   log('packageName=',packageName)

//   // var result = shell("am force-stop "+packageName+" ", true);
//   // log(result);
//   // if(result.code == 0){
//   //   toastLog("执行成功,exit执行成功");
//   // }else{
//   //   toastLog("执行失败！请到控制台查看错误信息,exit执行失败");
//   // }

//   // sleep(6000)
//   // return true;



//   app.openAppSetting(packageName)
//   结束app标志=false
//   while(1){

//     结束运行=text('强行停止').findOnce() || text('结束运行').findOnce()
//     if(结束运行){
//       log('找到了结束运行')

//       var x = 结束运行.bounds().centerX()
//       var y = 结束运行.bounds().centerY()
//       press(x, y, 1)




//       // 结束运行.click()
//       sleep(2000)
//       for(let i=0;i<6;i++){
//         if(i == 5){
//           结束app标志=true

//         }
//         确定=text('确定').findOnce()
//         if(确定){
//           log('找到了结束运行的确认按钮')
//           var x = 确定.bounds().centerX()
//           var y = 确定.bounds().centerY()
//           press(x, y, 1)
//           // 确定.click()

//           结束app标志=true
//           break;
//         }else{
//           log('没有找到结束运行的确认按钮')
//         }
//         sleep(1000)
//       }
//     }else{
//       log('没有找到结束运行')

//       sleep(1000)
//     }
//     sleep(1000)
//     if(结束app标志){
//       break;
//     }
//   }
// }

// 停止app('收壶资讯')

// var circle = {};
// circle.停止app = 停止app
// module.exports = circle;
