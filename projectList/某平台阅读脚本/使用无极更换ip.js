

获取配置文件内容 = require("./获取收壶配置文件内容")
配置文件内容 = 获取配置文件内容.获取配置文件内容()


var 当前手机编号=配置文件内容.手机编号
var 无极ip框的范围 = 配置文件内容["无极ip框"+当前手机编号]

var left=parseInt(无极ip框的范围[0])
var top=parseInt(无极ip框的范围[1])
var right=parseInt(无极ip框的范围[2])
var bottom=parseInt(无极ip框的范围[3])






function 使用无极更换ip(){
  launchApp("无极");
  log('启动无极')
  for(let i=0;i<15;i++){
    if(id('exit_vpn').findOnce()){break}
    sleep(1000)
  }
  while(1){


    sleep(2000)
    var 使用无极更换ip结果=false

    var 上一次的ip=记录上一次的ip()
    log("上一次的ip=",上一次的ip)


    var 是否点击了切换=点击切换()
    if(是否点击了切换){
      log('点击了切换')
      sleep(3000)

    }else{
      log('没有点击切换',"脚本异常","停止运行")
      exit()
    }

    var 切换后的ip=获取切换后的ip()
    if(切换后的ip){
      break;
    }else{
      sleep(2000)
    }
  }




  // text = 更换速度不要太快
  log("切换后的ip=",切换后的ip)
  if(切换后的ip == "未申请" || 切换后的ip == "更换速度不要太快"){
    log('切换Ip失败,未申请 或者 更换速度不要太快',"脚本停止")
    exit()
  }
  if(上一次的ip == 切换后的ip){
    log('两次ip一样,切换ip失败')
    log('切换Ip失败,两次ip一样',"脚本停止")
    exit()
  }else{
    切换按钮状态=id('exit_vpn').findOne(6000)
    if(切换按钮状态){
      切换按钮状态文本=切换按钮状态.text()
      if(切换按钮状态文本 == "切换失败"){
        log('切换ip失败','脚本停止')
      }else if(切换按钮状态文本 == "切换"){
        log('切换成功')
        使用无极更换ip结果=true
      }
    }
  }
  toastLog('使用无极切换ip运行完毕')
  log(使用无极更换ip结果)
  var ip效果=检测代理ip是否生效()
  toastLog(ip效果)
  sleep(6000)
  return ip效果
}

function 启动无极(){


}
function 登录无极(){
  var 登录按钮=id('loginbutton').text('登       陆').findOne(6000)
  if(登录按钮){
    log('找到了登录按钮')
    登录按钮.click()
  }else{
    log('没找到登录按钮')

  }
  log('登录无极')
}
function 初始化无极(){
  var 是否点击了尚未使用=false
  var 尚未使用=id('exit_vpn').text('尚未使用').findOne(6000)
  if(尚未使用){
    log('找到了尚未使用')
    var x = 尚未使用.bounds().centerX()
    var y = 尚未使用.bounds().centerY()
    press(x, y, 1)
    toastLog('点击了尚未使用',"sleep(6000")
    sleep(6000)
    // 尚未使用.click()
    是否点击了尚未使用=true
    return 是否点击了尚未使用
  }else{
    log('没找到尚未使用')
  }
  log('初始化无极')

}
function 记录上一次的ip(){
  var 上一次的ip=false
  // 4号手机  bounds = (108,734,972,869)
  var 上一次的ip窗口控件=bounds(left,top,right,bottom).findOne(6000)
  // 9号手机
  // var 上一次的ip窗口控件=bounds(72,497,648,587).findOne(6000)
  if(上一次的ip窗口控件){
    log('找到了ip窗口')
    上一次的ip=上一次的ip窗口控件.child(0).text()
    log('上一次的ip=',上一次的ip)
  }else{
    log('没找到ip窗口')
  }
  return 上一次的ip
}
function 点击切换(){
  var 是否点击了切换=false
  var 切换=id('exit_vpn').text('切换').findOne(6000)
  if(切换){
    log('找到了切换')
    切换.click()
    是否点击了切换=true
    return 是否点击了切换
  }else{
    log('没找到切换')
  }

}
function 获取切换后的ip(){
  var 切换后的ip=false




  for(let i=0;i<60;i++){
    var 切换=id('exit_vpn').findOnce()
    if(切换){
      if(切换.text() == '切换'){
        log('切换成功')
        break;
      }else{
        log('当前切换状态')
        log(切换.text())
      }
    }
    if(i == 55){
      log('切换时间过长','脚本停止')
      exit()
    }

    sleep(10000)

  }











  var 切换后的ip窗口控件=bounds(left,top,right,bottom).findOne(6000)
  if(切换后的ip窗口控件){
    log('找到了ip窗口')
    切换后的ip=切换后的ip窗口控件.child(0).text()
    log('切换后的ip=',切换后的ip)
  }else{
    log('没找到ip窗口',"重启无极")
    // exit()
  }
  return 切换后的ip
}

function 退出无极(){
  var appName="无极"

  停止app = require("./停止app")
  停止app.停止app(appName)


}

function 检测代理ip是否生效(){
  //从网页获取ip位置
  获取ip地址 = require("./获取ip地址")
  var 当前ip地址=获取ip地址.获取ip地址()
  if(当前ip地址 == "山西省临汾市 联通"){
    log('切换ip不成功',"脚本停止")
    exit()
  }
  当前ip地址=当前ip地址.split(' ')
  return 当前ip地址[0]
}

// c1=currentPackage()
// c2=currentActivity()
// log(c1) //org.wuji
// log(c2) //org.wuji.LoginActivity
// for(let i=0;i<3;i++){
//   使用无极更换ip()
//   home()
//   sleep(3000)

// }


// r=使用无极更换ip()
// log("r=",r)


var circle = {};
circle.使用无极更换ip = 使用无极更换ip
module.exports = circle;

