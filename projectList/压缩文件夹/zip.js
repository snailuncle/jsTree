
function zipFolder(folder){
  var zipper = require('zip-local');
  // zipping a directory to disk with compression
  // the directory has the following structure
  // |-- hello-world.txt
  // |-- cpp
  //     |-- hello-world.cpp
  // |-- java
  //     |--hello-world.java
  folder='../bbbbb'

  var zipFileName=(folder.split('/')).pop()
  console.log("zipFileName=")
  console.log(zipFileName)


  zipper.sync.zip(folder+"/").compress().save(zipFileName+".zip");

}
folder='../bbbbb'
zipFolder(folder)
