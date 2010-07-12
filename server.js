var http=require('http'),
	fs=require('fs'),
	url=require('url'),
	app=require('./app');

var simpleCat=function(filePath){
	return fs.readFileSync(filePath);
};

var running=true;
var t;
var counter=0;

var clockTimer=function() {
	console.log('tick '+counter++);
	if (running) t=setTimeout(clockTimer,1000);
}

t=setTimeout(clockTimer,1000);
http.createServer(function(req, res){
	var u = url.parse(req.url),
		p = u.pathname.split('/');
	console.log(u.pathname);
	console.log(p.length);
	for (var x=0;x<p.length;x++) {
		console.log(x+' '+p[x]);
	}
	if (p[1]=='sprites') {
		var ftype = p[p.length-1].split('.')[1];
		console.log(ftype);
		res.writeHead(200, {'Content-Type': 'image/'+ftype});
		res.end(simpleCat('.'+u.pathname));
	} else if (p[1]=='ajax') {
		res.writeHead(200, {'Content-Type': 'application/ajax'});
		var ary = [];
		for (var x=2;x<p.length; x++) {
			ary.push(p[x]);
		}
		if (ary.length>0) {
			var cont = app.dispatch(ary);
		}
		if (cont) {
			res.end(cont);
		} else {
			res.end('');
		}
	} else if (p[1]=='rosewood.js') {
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.end(simpleCat('../Rosewood/rosewood.js'));
	} else if (p[1]=='') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(simpleCat('./play.html'));
	}
	console.log('Request');
}).listen(8000, "127.0.0.1");
console.log('Server Up!');
