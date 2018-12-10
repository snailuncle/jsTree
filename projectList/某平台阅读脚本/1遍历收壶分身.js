



function 获取应用名(app关键字) {
  importClass(android.content.pm.PackageManager)
  var uc应用 = []
  var ucapp = {}
  pm = context.getPackageManager();
  var 有的 = pm.getInstalledPackages(PackageManager.GET_SHARED_LIBRARY_FILES)
  有的 = pm.getInstalledPackages(PackageManager.GET_META_DATA)
  有的 = 有的 + ""
  有的 = 有的.replace(/PackageInfo[^ ]+ /g, "")
  有的 = 有的.replace(/[\}|\[|\]| ]/g, "")
  有的 = 有的.split(",")
  for (let i of 有的) {
      var packageInfo = pm.getPackageInfo(i, 0);
      var appName = packageInfo.applicationInfo.loadLabel(context.getPackageManager()).toString()
      //appName = app.getAppName(i)
      if (appName.match(app关键字)) {
          log(appName)
          log("包名:" + i)
          ucapp = {
              "包名": i,
              "名称": appName
          }
          uc应用.push(ucapp) 
      }
  }
  return uc应用
}


// 关键字="收壶资讯"
// r=获取应用名(关键字)
// log(r)


var circle = {};

circle.获取应用名 = 获取应用名

module.exports = circle;





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
