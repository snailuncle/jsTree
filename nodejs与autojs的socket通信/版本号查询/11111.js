function 启动项目文件中的index文件(projectName){
  console.log('启动项目文件中的index文件开始')

// log(files.getSdcardPath())
// exit()
  var indexPath=files.getSdcardPath()+"/脚本/"+projectName+"/index.js"
  console.log('indexPath='+indexPath)
  停止除了自身的所有脚本()

  engines.execScriptFile(indexPath);

  console.log('启动项目文件中的index文件完毕')


}

启动项目文件中的index文件('helloParent')
