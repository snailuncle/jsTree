enginesAll = engines.all()
log(enginesAll)
enginesAll.map((ScriptEngine) => {
  if (engines.myEngine() == ScriptEngine) {} else {
    console.log('即将停止的脚本引擎' + ScriptEngine)
    ScriptEngine.forceStop()
  }
})
