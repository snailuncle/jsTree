
function 解压文件(fileName){
  var fileName=files.path('./'+fileName)
  var unzipFileName=fileName.replace('.zip','')
  com.stardust.io.Zip.unzip(new java.io.File(fileName), new java.io.File(unzipFileName))
}
