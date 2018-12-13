//请求横屏截图
requestScreenCapture();
//截图
var img = captureScreen();
var xy = [380,1314, 471, 1363]
var x1 = xy[0]
var y1 = xy[1]
var x2 = xy[2]
var y2 = xy[3]
var img = captureScreen();
var x = x1
var y = y1
var width = x2 - x1
var height = y2 - y1
var clip = images.clip(img, x,y,width,height);
// var clip = images.clip(img, 585,1143,622-585,1191-1143);
images.save(clip, "/sdcard/点击.png");
