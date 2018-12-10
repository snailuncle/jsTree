
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

显示循环次数(1)

// setBackground = function setBackground() {/*
//   void setBackground(android.graphics.drawable.Drawable)
//   */}

// 144,1024,288,256,300
