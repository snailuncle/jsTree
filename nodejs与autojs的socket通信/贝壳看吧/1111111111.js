
requestScreenCapture();
var 鸡蛋图片路径="/sdcard/点击.png"
var 鸡蛋图片=images.read(鸡蛋图片路径)

飞行模式=require('./开关飞行模式.js')

while(1){

  log(飞行模式)
  toastLog('打开飞行模式')
  飞行模式.打开()
  sleep(5000)
  toastLog('关闭飞行模式')

  飞行模式.关闭()
  sleep(5000)
  // exit()

  微信窗口文章=id('ald').findOne(2000)
  if(微信窗口文章){
    log('发现微信窗口文章')
    // alert('发现微信窗口文章')
  }else{
    alert('没有发现微信窗口文章')
    exit()
  }
  点击微信窗口文章(微信窗口文章)
  sleep(5000)
  // id = text1
  // packageName('com.tencent.mm').
  文章打开后的详情页=idContains('text1').findOne(2000)
  if(文章打开后的详情页){
    log('发现文章打开后的详情页')
    // alert('发现文章打开后的详情页')
  }else{
    alert('没有发现文章打开后的详情页')
    exit()
  }

  下滑一定时长(15)
  点击返回()
}

function 点击返回(){
  返回=desc('返回').findOne(2000)
if(返回){
  log('发现返回')
  // alert('发现返回')
  返回.parent().click()
}else{
  alert('没有发现返回')
  exit()
}


}
function 下滑一定时长(t){
  t=t || 7
  startTime=new Date().getTime()
  while(1){

    // 点击查看全文()
    点击图片查看全文()
    sleep(2000)
    从下往上滑动()
    sleep(5000)
    endTime=new Date().getTime()
    spendTime=endTime-startTime
    log('看文章时长',Math.floor(spendTime/1000),"秒")
    if(spendTime>(t*1000)){
      log('看文章'+t+'秒完成')
      break;
    }
  }


}

function 点击查看全文(){
  点击查看全文1=desc('fadsk').findOnce() || desc('1odj').findOnce()
  if(点击查看全文1){
    log('发现点击查看全文')
    // alert('发现点击查看全文')
    点击查看全文1.click()
  }else{
    log('没有发现点击查看全文')

  }

}


function 从下往上滑动(){
  log(arguments.callee.name+'开始')
  var w = device.width
  var h = device.height
  var x1 = Math.floor(w / 5 * 1)
  var y1 = Math.floor(h / 5 * 4)
  var x2 = Math.floor(w / 5 * 2)
  var y2 = Math.floor(h / 5 * 3)
  var duration = 500
  log('滑动参数=',x1, y1, x2, y2, duration)
  swipeRnd(x1, y1, x2, y2, duration)
  Swipe(x1, y1, x2, y2, duration)
  log(arguments.callee.name+'结束')

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

function 点击微信窗口文章(微信窗口文章){
  var x = 微信窗口文章.bounds().centerX()
  var y = 微信窗口文章.bounds().centerY()

  toastLog('点击微信窗口文章')

  Tap(x,y)
  sleep(5000)
  // gesture(100, [x, y], [x-10, y-5], [x-6, y-3])


  // press(x-100, y, 100)
  // sleep(100)
  // press(x, y, 100)
  log(x,y)
  log('已经点击了微信窗口的文章')
}












function 点击图片查看全文(){


  var xy=[111,398,940,1511]
  var x1=xy[0]
  var y1=xy[1]
  var x2=xy[2]
  var y2=xy[3]

    var img = captureScreen();
    var x=x1
    var y=y1
    var width=x2-x1
    var height=y2-y1
    var threshold=0.8

    var 鸡蛋坐标=  images.findImage(img, 鸡蛋图片, {
      region: [x, y, width, height],
      threshold: threshold
  })
    if(鸡蛋坐标){
      log('找到鸡蛋了',鸡蛋坐标)
      var x=鸡蛋坐标.x
      var y=鸡蛋坐标.y
      Tap(x,y)
      sleep(5000)
      log('点击了鸡蛋')
    }else{
      log('没有找到鸡蛋')
    }
    img.recycle()
}
