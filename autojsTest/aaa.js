
fn=()=>{
  // var s=ScriptEngine.cwd()
  var s=engines.myEngine().getSource()
  console.log(s)
}

setInterval(fn,2000)


