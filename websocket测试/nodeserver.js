var net = require('net');
var HOST = '127.0.0.1';
var PORT = 11111;

net.createServer(function(socket) {
    console.log('connection: ' +
        socket.remoteAddress + ':' + socket.remotePort);

    socket.on('data', function(data) {
        console.log('From client : ' + data);
        socket.write('From server : successfully received!\n' );
    });

    socket.on('close', function(data) {
        console.log('close: ' + socket.remoteAddress + ' ' + socket.remotePort);
    });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
