function index文件是否在运行中(){
  var enginesAll = engines.all()
  log('enginesAll=')
  log(enginesAll)
  var indexRunning=false
  enginesAll.map((ScriptEngine) => {
    log('ScriptEngine.source=')
    log(ScriptEngine.source)
    if (String(ScriptEngine.source).indexOf('index.js') != -1){
      console.log('查到的运行中的index.js文件是')
      console.log(engines.myEngine().toString())
      indexRunning=true
    }
  })
  if(indexRunning){
    return true
  }
  return false
}
log(index文件是否在运行中())
