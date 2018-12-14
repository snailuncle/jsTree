fn=()=>{
  // var s=ScriptEngine.cwd()
  var s=engines.myEngine().getSource()
  console.log(s)
  console.log('ccc的fn')
}

setInterval(fn,2000)
console.log('ccc存在过')
