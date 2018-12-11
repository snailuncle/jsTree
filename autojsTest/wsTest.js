importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");
importClass("java.io.OutputStreamWriter");
importClass("java.io.BufferedWriter");
importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');



console.show();

var ip = "192.168.12.104";
var socket = new Socket(ip, 8811);
var out = socket.getOutputStream();
var bw = new DataOutputStream(out);
bw.writeBytes('123');
bw.flush;

function xt() {
    var xtb = "xxyyccvvbb" + new Date()
    bw.writeBytes(xtb);
    bw.flush;
    console.error("发送心跳包");
}
threads.start(function() { //在新线程执行的代码
    while (1) {
        xt();
        sleep(3300);
    }
});



var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区
while (1) {
    var a = bufferedReader.readLine();
    // log(a);
    try {
        log(a)
    } catch (err) {}
};
