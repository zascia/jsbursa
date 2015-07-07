var http = require('http');

http.createServer(function(req, res){
  res.writeHead('Content-Type', 'application/json');
  res.end('Hello world!');
}).listen(20007);