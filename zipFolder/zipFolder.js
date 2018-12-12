
function zipFolder(folder){
  var zipper = require('zip-local');
  // zipping a directory to disk with compression
  // the directory has the following structure
  // |-- hello-world.txt
  // |-- cpp
  //     |-- hello-world.cpp
  // |-- java
  //     |--hello-world.java
  console.log("即将打包的项目文件夹的名字是")
  var zipFileName=(folder.split('/')).pop()
  console.log("zipFileName=")
  console.log(zipFileName)
  zipper.sync.zip(folder+"/").compress().save("./zipFolder/"+zipFileName+".zip");
  console.log('打包完毕')
  console.log('打包后的zip文件在zipFolder文件夹中,名字是'+zipFileName+".zip")
  return 'zipFolder/'+zipFileName+".zip"
}


exports.zipFolder = zipFolder
