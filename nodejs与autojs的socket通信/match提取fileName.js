fileContent="attachment; filename=\"???????.zip\"; filename*=UTF-8''%E6%9F%90%E5%B9%B3%E5%8F%B0%E9%98%85%E8%AF%BB%E8%84%9A%E6%9C%AC.zip"

log(fileContent)


// var  fileNameReg=/filename\*=UTF-8/
var  fileNameReg=/filename\*=UTF-8''(.+?\.zip)/
fileName=fileContent.match(fileNameReg)[1]
fileName=decodeURI(fileName)

console.log('正则匹配fileName结果=');

console.log(fileName);
