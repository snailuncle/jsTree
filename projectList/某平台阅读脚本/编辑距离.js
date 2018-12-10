function minDistance(s1, s2) {
  const len1 = s1.length
  const len2 = s2.length

  let matrix = []

  for (let i = 0; i <= len1; i++) {
      // 构造二维数组
      matrix[i] = new Array()
      for (let j = 0; j <= len2; j++) {
          // 初始化
          if (i == 0) {
              matrix[i][j] = j
          } else if (j == 0) {
              matrix[i][j] = i
          } else {
              // 进行最小值分析
              let cost = 0
              if (s1[i - 1] != s2[j - 1]) { // 相同为0，不同置1
                  cost = 1
              }
              const temp = matrix[i - 1][j - 1] + cost

              matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, temp)
          }
      }
  }
  return matrix[len1][len2] //返回右下角的值
}

r=minDistance('jary','jerr123y') // 2
log("r=",r)

// 作者：张君卓mytac
// 链接：https://www.jianshu.com/p/90af98493661
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
