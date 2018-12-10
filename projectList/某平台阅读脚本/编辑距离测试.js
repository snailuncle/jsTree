function minEditDist(sm,sn){
  var m=sm.length+1
  var n=sn.length+1



  var matrix = new Array(); //先声明一维
  for ( var i = 0; i < m; i++) { //一维长度为2
      matrix[i] = new Array(); //再声明二维
      for ( var j = 0; j < n; j++) { //二维长度为3
          matrix[i][j] = 0; // 赋值，每个数组元素的值为i+j
      }
  }


  return matrix
}

mindist=minEditDist("i1","ivan2")
print(mindist)
