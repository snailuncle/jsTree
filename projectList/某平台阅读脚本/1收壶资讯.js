使用无极更换ip = require("./使用无极更换ip")


_sleep_=sleep
sleep=function(t){
  var k=0
  if(t>=3*1000){
    k=2*1000
  }else if(t>=2*1000){
    k=1*1000
  }else{
    k=0
  }
  _sleep_(t+random(-(k),k))
}
function 切换ip(){
  使用无极更换ip结果 = 使用无极更换ip.使用无极更换ip()
  log("使用无极更换ip结果=")
  log(使用无极更换ip结果)
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

























function 收壶资讯阅读(分身名字){
  循环次数=20
  for(let i=0;i<循环次数;i++){

    打开收壶资讯(分身名字)
    打开或者等待主页()
    有广告就上滑()
    点击一篇文章()
    文章或者视频=等待文章打开()
    if(文章或者视频){}
    else{
      log("等待文章打开时间过长,可能是ip网络差,结束这个app,并且更换ip重启")
      停止分身(分身名字)
      sleep(3000)
      切换ip()
      sleep(3000)
      continue;
    }
    显示循环次数(i)
    看文章或者视频完毕=看文章或者视频(文章或者视频)
    if(看文章或者视频完毕){
      从文章或者视频返回首页()
    }else{
      log('看文章或者视频完毕,返回值异常,停止脚本')
      exit()
    }
    刷新文章()
    sleep(3000)
  }
  显示循环次数(分身名字+"   "+循环次数+"结束")

}


function 显示循环次数(循环次数){
  var w = floaty.rawWindow(
    <frame  gravity="center" bg="#6600FF00">
      <vertical>
        <text  gravity="center" textSize="66sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">循环次数</text>
        <text  gravity="center" textSize="66sp" typeface="monospace" textStyle="bold" textColor="blue"  id="text">{循环次数}</text>
      </vertical>
    </frame>
  );
  w.setSize(-1, -1);
  w.setTouchable(false);
  sleep(2000)
  w.close();
  return true
}
function 有广告就上滑(){
  while(1){
    var 当前页面文字1=打印当前页面所有文字()
    if(当前页面文字1.indexOf('广告') != -1){
      刷新文章()
    }else{
      break;
    }
  }
}

function 从文章或者视频返回首页(){
  log(arguments.callee.name+'开始')
  var count=0
  while(1){
    back();
    sleep(5000)
    var 当前页面=当前页面是哪个页面()
    if(当前页面=="首页"){
      return true
    }
    count++;
    if(count > 5){
      log('从文章或者视频返回首页,发生异常,脚本停止')
      exit()
    }
  }

}


function 看文章(){
  log(arguments.callee.name+'开始')
  var count=0
  var 当前页面文字1=打印当前页面所有文字()
  var 滑动次数=0
  while(1){
    从下往上滑动()
    滑动次数++;
    sleep(2000)
    var 当前页面文字2=打印当前页面所有文字()
    if(滑动次数>2 && 两个字符串相似(当前页面文字1,当前页面文字2)){
      return true
    }
    当前页面文字1=打印当前页面所有文字()

    count++;
    if(count > 15){
      log('看文章超过5分钟,结束看文章')
      return true
    }
    sleep(2000)
  }

}

function 看视频(){
  log(arguments.callee.name+'开始')
  var count=0
  // text = 加载失败，点击重试
  while(1){
    var 分享=text('分享').findOnce()
    var 重新播放=text('重新播放').findOnce()
    var 加载失败=text('加载失败，点击重试').findOnce()
    if((分享 && 重新播放) || 加载失败){
      log('视频播放完毕')
      return true
    }


    count++;
    if(count > 30){
      log('看视频超过5分钟,结束看视频')
      return true

    }
    sleep(2000)
  }


}

function 看文章或者视频(文章或者视频){
  log(arguments.callee.name+'开始')
  log("看文章或者视频   文章或者视频=",文章或者视频)
  if(文章或者视频 == "文章"){
    log("看文章")
    return 看文章()
  }else if(文章或者视频 == "视频"){
    log("看视频")
    return 看视频()
  }else{
    log('看文章或者视频异常','脚本停止')
    log("文章或者视频=",文章或者视频)
    exit()
  }
}


function 等待文章打开(){
  log(arguments.callee.name+'开始')
  获取配置文件内容 = require("./获取收壶配置文件内容")
  配置文件内容 = 获取配置文件内容.获取配置文件内容()
  var 手机编号 = 配置文件内容.手机编号
  var count=0
  while(1){
    if(手机编号 == "6"){
      log('手机编号=6')
      // 注释的是6号手机
      var 文章标题=id('title').findOnce()  ||  text("导语").findOnce() ||  id('guess_title').findOnce()

      var 文章左返回=bounds(20,60,84,124).findOnce()
      var 文章右分享=bounds(636,60,700,124).findOnce()

      var 视频左返回=bounds(0,48,104,152).findOnce()
      var 视频标题=id('textTitle').findOnce()
      var 视频中间的柱子=bounds(308,48,412,453).findOnce()
    }else if(手机编号 == "4" || 手机编号 == "2" || 手机编号 == "5"){

      //这是4号手机
      var 文章标题=id('title').findOnce()  ||  text("导语").findOnce() ||  id('guess_title').findOnce()

      //bounds = (30,90,126,186)
      var 文章左返回=bounds(30,90,126,186).findOnce()
      //bounds = (954,90,1050,186)
      var 文章右分享=bounds(954,90,1050,186).findOnce()
      //bounds = (0,72,156,228)
      var 视频左返回=bounds(0,72,156,228).findOnce()
      //id = guess_title
      var 视频标题=id('textTitle').findOnce()
      //bounds = (462,72,618,679)
      var 视频中间的柱子=bounds(462,72,618,679).findOnce()
    }else if(手机编号 == "7"  ||  手机编号 == "11"){

      //这是7号
      var 文章标题=id('title').findOnce()  ||  text("导语").findOnce() ||  id('guess_title').findOnce()
      //bounds = (30,78,126,174)
      var 文章左返回=bounds(30,78,126,174).findOnce()
      //bounds = (954,78,1050,174)
      var 文章右分享=bounds(954,78,1050,174).findOnce()
      //bounds = (0,60,156,216)
      var 视频左返回=bounds(0,60,156,216).findOnce()
      var 视频标题=id('textTitle').findOnce()
      //bounds = (462,60,618,667)
      var 视频中间的柱子=bounds(462,60,618,667).findOnce()

    }else if(手机编号 == "1" || 手机编号 == "3"){

      //这是1号
      var 文章标题=id('title').findOnce()  ||  text("导语").findOnce() ||  id('guess_title').findOnce()
      //bounds = (30,78,126,174)
      var 文章左返回=bounds(30,84,126,180).findOnce()
      //bounds = (954,78,1050,174)
      var 文章右分享=bounds(954,84,1050,180).findOnce()
      //bounds = (0,60,156,216)
      var 视频左返回=bounds(0,66,156,222).findOnce()
      var 视频标题=id('textTitle').findOnce()
      //bounds = (462,60,618,667)
      var 视频中间的柱子=bounds(462,66,618,673).findOnce()

    }else if(手机编号 == "13"){

      //这是1号
      var 文章标题=id('title').findOnce()  ||  text("导语").findOnce() ||  id('guess_title').findOnce()
      //bounds = (30,78,126,174)
      var 文章左返回=bounds(20,62,84,126).findOnce()
      //bounds = (954,78,1050,174)
      var 文章右分享=bounds(636,62,700,126).findOnce()
      //bounds = (0,60,156,216)
      var 视频左返回=bounds(0,50,104,154).findOnce()
      var 视频标题=id('textTitle').findOnce()
      //bounds = (462,60,618,667)
      var 视频中间的柱子=bounds(308,50,412,455).findOnce()

    }





    else{
      log('还没有采集这个手机的编号的信息返回和分享的区域信息')
      exit()
    }






    log("文章标题=",文章标题)
    log("文章左返回=",文章左返回)
    log("文章右分享=",文章右分享)
    log("视频左返回=",视频左返回)
    log("视频标题=",视频标题)
    log("视频中间的柱子=",视频中间的柱子)






    if(文章标题 && 文章左返回 && 文章右分享){
      return "文章"
    }else if(视频左返回 && 视频标题 && 视频中间的柱子){
      return "视频"
    }else{
      sleep(4000)
    }

    count++;
    if(count > 10){
      log('等待文章打开异常,结束这个app,并且更换ip')
      return false
    }
  }



}



function swipeRnd(x1, y1, x2, y2, duration){
  log(arguments.callee.name+'开始')
  var k=20
  var x1=x1+random(-(k),k)
  var y1=y1+random(-(k),k)
  var x2=x2+random(-(k),k)
  var y2=y2+random(-(k),k)
  // swipe(x1, y1, x2, y2, duration)
  gesture(duration, [x1, y1], [x1+60, y1-80], [x2, y2])
  log(arguments.callee.name+'结束')

}
function pressRnd(x,y){
  log(arguments.callee.name+'开始')
  log("pressRnd(x,y)",x,y)
  var k=5
  var x=x+random(-(k),k)
  var y=y+random(-(k),k)
  press(x,y,1)
}

function 点击一篇文章(){
  log(arguments.callee.name+'开始')
  var count=0
  while(1){
    var 是否点击了文章=false
    var 文章标题s=id("article_title").boundsInside(0, 0, device.width, device.height).find()
    if(文章标题s){
      log("文章标题s列表长度=",文章标题s.length)
      var max=2
      var min=1
      var 随机数=Math.floor(Math.random()*(max-min+1)+min);



      for(let i=随机数;i<文章标题s.length;i++){
        var element=文章标题s[i]
        var x=element.bounds().centerX()
        var y=element.bounds().centerY()
        if(x>0 && y>(device.height/8*1)){

        }else{
          continue;
        }
        if(y<(Math.floor(device.height/6*5)) && x<(Math.floor(device.width))){
          var 文章=element
          if(文章 && 文章.text().length >= 8){
            var x = 文章.bounds().centerX()
            var y = 文章.bounds().centerY()
            pressRnd(x, y, 1)
            log('点击一篇文章, 点击了',x,y)
            是否点击了文章=true
            break
          }
        }
      }
    }else{
      刷新文章()
    }
    if(是否点击了文章){
      break
    }
    count++;
    if(count>10){
      log('点击一篇文章发生异常','脚本停止')
      exit
    }
    sleep(6000)
  }

}





function 刷新文章(){
  log(arguments.callee.name+'开始')
  var w = device.width
  var h = device.height
  var 底部高度区域 = Math.floor(h / 6 * 5)
  var 刷新按钮 = id('animation_view').boundsInside(0, 底部高度区域, w, h).findOnce()
  if(刷新按钮){
    log('发现刷新按钮')
    var max=10
    var min=1
    var 随机数=Math.floor(Math.random()*(max-min+1)+min);
    log("随机数=",随机数)
    if(随机数<=2){
      点击刷新按钮(刷新按钮)
      log('随机数<=2 点击了刷新按钮')
    }else{
      从下往上滑动()
      log('随机数>2没有找到刷新按钮,从下往上滑动')

    }
  }else{
    从下往上滑动()
    log('没有找到刷新按钮,从下往上滑动')
  }
  log(arguments.callee.name+'结束')

}

function 点击刷新按钮(刷新按钮){
  log(arguments.callee.name+'开始')
  var x=刷新按钮.bounds().centerX()
  var y=刷新按钮.bounds().centerY()
  pressRnd(x,y,1)
}


function 从下往上滑动(){
  log(arguments.callee.name+'开始')
  var w = device.width
  var h = device.height
  var x1 = Math.floor(w / 5 * 1)
  var y1 = Math.floor(h / 5 * 4)
  var x2 = Math.floor(w / 5 * 2)
  var y2 = Math.floor(h / 5 * 1)
  var duration = 500
  log('滑动参数=',x1, y1, x2, y2, duration)
  swipeRnd(x1, y1, x2, y2, duration)
  log(arguments.callee.name+'结束')

}


















function 打开或者等待主页(){
  log(arguments.callee.name+'开始')
  var 当前页面=当前页面是哪个页面()
  if(当前页面=="首页"){
    return true
  }
  var 首页控件坐标={"x":114,"y":1237}
  if(当前页面=="视频" || 当前页面=="追踪" || 当前页面=="任务"){
    pressRnd(首页控件坐标.x,首页控件坐标.y,1)
    sleep(1000)
    var 当前页面=当前页面是哪个页面()
    if(当前页面=="首页"){
      return true
    }
  }

  var timeStart = Date.now()

  while(1){

    app.startActivity({
      action: "android.intent.action.MAIN",
      packageName: "com.sohu.infonews",
      className: "com.sohu.quicknews.splashModel.activity.SplashActivity",
      category: ["android.intent.category.LAUNCHER"],
      flags: ["activity_new_task"]
    });
    sleep(15000)
    var 当前页面=当前页面是哪个页面()
    if(当前页面=="首页"){
      return true
    }
    var 首页控件坐标={"x":114,"y":1237}
    if(当前页面=="视频" || 当前页面=="追踪" || 当前页面=="任务"){
      pressRnd(首页控件坐标.x,首页控件坐标.y,1)
      sleep(1000)
      var 当前页面=当前页面是哪个页面()
      if(当前页面=="首页"){
        return true
      }
    }
    var timeEnd = Date.now()
    var timeDiff =  timeEnd - timeStart
    log("timeDiff=",timeDiff)
    if(timeDiff > 60 * 1000){
      log('打开或者等待主页异常,脚本停止')
      exit()
    }
  }






}

function 当前页面是哪个页面(){
  log(arguments.callee.name+'开始')
  var 首页=["推荐",'要闻',"视频",'娱乐','体育']
  var 视频=["推荐",'搞笑',"千里眼",'萌宠','美食']
  var 追踪=["追踪",'我的追踪']
  var 任务=["任务中心",'现金','狐币','好友']
  if(有没有多个文本控件(首页)){
    return '首页'
  }else if(有没有多个文本控件(视频)){
    return '视频'
  }else if(有没有多个文本控件(追踪)){
    return '追踪'
  }else if(有没有多个文本控件(任务)){
    return '任务'
  }else{
    return '未收录'
  }
}

function 有没有多个文本控件(arr) {
  log(arguments.callee.name+'开始')
  for (var i = 0; i < arr.length; i++) {
    var 文本=arr[i]
    if(有没有这个文本的控件(文本)){
    }else{
      return false
    }
  }
  return true
}



function 有没有这个文本的控件(文本) {
  log(arguments.callee.name+'开始')
  var 控件 = text(文本).findOnce() || desc(文本).findOnce()
  if (控件) {
    return true
  } else {
    return false
  }
}


function 打印当前页面所有文字() {
  log(arguments.callee.name+'开始')
  var 当前页面信息 = 获取当前页面信息()
  var getAllTextualContent = 当前页面信息.getAllTextualContent()
  log("打印当前页面所有文字=", getAllTextualContent)
  return getAllTextualContent
}

function 获取当前页面信息() {
  log(arguments.callee.name+'开始')
  const ROOT_NODE_NAME = 'FrameLayout';
  const TIMEOUT_FOR_LOOKUP_NODE = 250;

  // 获取当前应用的包名
  const getCurrentPackage = function getPackageNameOfTheForegroundApplication(timeout) {
    const node = getRootNode(timeout);
    return node !== null ? node.packageName() : currentPackage();
  };

  // 获取 FrameLayout 根节点
  const getRootNode = function getFrameLayoutNode(timeout) {
    return className(ROOT_NODE_NAME).findOne(timeout || TIMEOUT_FOR_LOOKUP_NODE);
  };

  // 获取所有指定节点及其子节点的描述内容和文本内容
  const getAllTextualContent = function getAllDescriptionAndTextUnderNodeRecursively(node) {
    let items = [];
    const getDescAndText = function (node) {
      if (node !== null) {
        items.push(node.desc());
        items.push(node.text());

        for (let len = node.childCount(), i = 0; i < len; i++) {
          getDescAndText(node.child(i));
        }
      }
    };

    getDescAndText(node || getRootNode());
    return items.filter(item => item !== '' && item !== null);
  };

  return {
    getCurrentPackage: getCurrentPackage,
    getAllTextualContent: getAllTextualContent,
  };
}



function 打开收壶资讯(分身名字){
  log(arguments.callee.name+'开始')
  var appName=分身名字
  var timeStart = Date.now()
  while(1){
    var 当前包名=currentPackage()
    var 当前appName = getAppName(当前包名);
    log('当前appName=',当前appName)
    if(当前appName=="收壶资讯"){
      log(arguments.callee.name+'结束')
      return true
    }else{
      launchApp(appName);
      sleep(15000)
    }
    var timeEnd = Date.now()
    var timeDiff =  timeEnd - timeStart
    log("timeDiff=",timeDiff)
    if(timeDiff > 60 * 1000){
      log('打开收壶资讯异常,脚本停止')
      exit()
    }
  }
  log(arguments.callee.name+'结束')
}




function 两个字符串相似(sm,sn){
  log(arguments.callee.name+'开始')
  var 最小编辑距离=minEditDist(sm,sn)
  if(最小编辑距离<10){
    return true
  }
  return false
}





function minEditDist(sm,sn){
  log(arguments.callee.name+'开始')
  var m=sm.length+1
  var n=sn.length+1
  var matrix = new Array();
  for ( var i = 0; i < m; i++) {
      matrix[i] = new Array();
      for ( var j = 0; j < n; j++) {
          matrix[i][j] = 0;
      }
  }
  matrix[0][0]=0
  for(let i=1;i<m;i++){
      matrix[i][0] = matrix[i-1][0] + 1
  }
  for(let j=1;j<n;j++){
      matrix[0][j] = matrix[0][j-1]+1
  }
  cost = 0
  for(let i=1;i<m;i++){
      for(let j=1;j<n;j++){
          if(sm[i-1]==sn[j-1]){
              cost = 0
          }
          else{
              cost = 1
          }
          matrix[i][j]=Math.min(matrix[i-1][j]+1,matrix[i][j-1]+1,matrix[i-1][j-1]+cost)
      }
  }
  return matrix[m-1][n-1]
}




var circle = {};
circle.收壶资讯阅读 = 收壶资讯阅读
module.exports = circle;

