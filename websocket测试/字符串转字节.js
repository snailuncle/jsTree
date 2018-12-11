stringToBytes=function ( str ) {

  var ch, st, re = [];
  for (var i = 0; i < str.length; i++ ) {
      ch = str.charCodeAt(i);  // get char
      st = [];                 // set up "stack"

     do {
          st.push( ch & 0xFF );  // push byte to stack
          ch = ch >> 8;          // shift value down by 1 byte
      }

      while ( ch );
      // add stack contents to result
      // done because chars have "wrong" endianness
      re = re.concat( st.reverse() );
  }
  // return an array of bytes
  return re;
}

var str   = '000000'
var bytes = []
bytes = stringToBytes(str)

console.log(bytes)
