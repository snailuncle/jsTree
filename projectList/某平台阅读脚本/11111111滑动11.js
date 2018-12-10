
while(1){
  从下往上滑动()
  sleep(2000)
}

function 从下往上滑动(){
  log(arguments.callee.name+'开始')
  var w = device.width
  var h = device.height
  var x1 = Math.floor(w / 5 * 1)
  var y1 = Math.floor(h / 5 * 4)
  var x2 = Math.floor(w / 5 * 2)
  var y2 = Math.floor(h / 5 * 1)
  var duration = 300
  log('滑动参数=',x1, y1, x2, y2, duration)


  swipeRnd2(144,1024,288,256,300)
  // swipeRnd(x1, y1, x2, y2, duration)
}



function swipeRnd(x1, y1, x2, y2, duration){
  log(arguments.callee.name+'开始')
  var k=20
  var x1=x1+random(-(k),k)
  var y1=y1+random(-(k),k)
  var x2=x2+random(-(k),k)
  var y2=y2+random(-(k),k)
  swipe(x1, y1, x2, y2, duration)
}
function swipeRnd2(x1, y1, x2, y2, duration){
  gesture(duration, [x1, y1], [x1+60, y1-80], [x2, y2])
}
