脚本数组 = ['aaa', 'bbb', 'ccc']
脚本数组.map((file) => {
  engines.execScriptFile(files.cwd() + "/" + file + ".js")
})
end = () => {
  enginesAll = engines.all()
  log(enginesAll)
  enginesAll.map((ScriptEngine) => {
    if (engines.myEngine().toString() != ScriptEngine.toString()) {
      console.log('即将停止的脚本引擎' + ScriptEngine)
      ScriptEngine.forceStop()
    }
  })
  for (let i = 0; i < 10; i++) {
    sleep(1000)
    console.log(213);

  }
}
setTimeout(end, 5000)
