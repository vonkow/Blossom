var net=require('net');
var ws=require('websocket-server');
var svr=ws.createServer();
svr.addListener('listening',function() {
	console.log('listening');
});
svr.addListener('connection', function(con) {
	console.log('Opened connection: '+con.id);
	svr.send(con.id, 'Connected as: '+con.id);
	con.broadcast('<'+con.id+'> connected');
	con.addListener('message', function(msg) {
		console.log('<'+con.id+'> '+msg);
		con.broadcast('<'+con.id+'> '+msg);
		svr.send(con.id,msg+' back');
	});
});

svr.addListener('close', function(con) {
	console.log('Closed connection: '+con.id);
	con.broadcast('<'+con.id+'> disconnected');
});

svr.listen(8080);

/*
net.createServer(function(socket) {
	socket.setEncoding('utf8');
	socket.addListener('connect', function() {
		socket.write('Echo Server\r\n');
	});
	socket.addListener('data', function(data) {
		socket.write(data+' back');
	});
	socket.addListener('end', function() {
		socket.end();
	});
}).listen(8080,"127.0.0.1");
*/
