// uid=`cat /data/system/packages.list | grep com.sohu.inputmethod.sogou | busybox awk '{print $2}'`
// iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP

// 以上是android iptables 屏蔽某个app网络访问的内容，

var sh = new Shell(true);
sh.setCallback({
  onOutput : function (line) {
    //有新的一行输出时打印到控制台
    log(line);
  }
})


// cat /data/system/packages.list | grep  com.tencent.mobileqq > /sdcard/1qq.txt


// iptables -t filter -A OUTPUT -m owner --uid-owner=10105 -j DROP

// iptables -L INPUT --line-numbers
// iptables -nvL --line-number


//循环输入命令
var packageNmae = 'com.tencent.mobileqq'
// var cmd = "cat /data/system/packages.list | grep  " + packageNmae +' > /sdcard/1qq.txt'
var cmd =' iptables -t filter -A OUTPUT -m owner --uid-owner=10105 -j DROP'
// var cmd =' iptables  -D OUTPUT -m owner --uid-owner=10105 -j ACCEPT'


log(cmd)
//执行命令
sh.exec(cmd);

sh.exit();
