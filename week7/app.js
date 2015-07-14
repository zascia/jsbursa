var users = [
  { id: '1', name: 'Illya Klymov', phone: '+380504020799', role: 'Administrator' },
  { id: '2', name: 'Ivanov Ivan', phone: '+380670000002', role: 'Student', strikes: 1 },
  { id: '3', name: 'Petrov Petr', phone: '+380670000001', role: 'Support', location: 'Kiev' }
];
var userCurrentNum = users.length;

var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
  // console.log(req);
  var data = '';
  var parseUrl = url.parse(req.url);

  var path = req.method + ' ' + req.url;

  var headers = {
    'Content-type' : 'application/json'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE', 'Access-Control-Allow-Origin': req.headers.origin});
    res.end();
  }

  if(!req.headers['content-type'] || req.headers['content-type'].indexOf('application/json') === -1){
    res.writeHead(401);
    res.end();
    return;
  }

  if (req.method === 'GET' && parseUrl.pathname === '/refreshAdmins') {
    res.end();
    return;
  }

  if (req.method === 'GET') {
    res.writeHead(200, {
      "Control-Allow-Origin": "*",
      "Control-Allow-Methods": "GET, POST, PUT",
      "Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(users));
    res.end();
  }

  if (req.method === 'POST') {
    var userId = ++userCurrentNum;
    var role = 'student';
    var dataToSend = {role: role, id: userId};
    var dataToCreate = {role: role, id: userId, name: '', phone: ''};
    users.push(dataToCreate);
    res.writeHead(200, {
      "Control-Allow-Origin": "*",
      "Control-Allow-Methods": "GET, POST, PUT",
      "Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(dataToSend));
    res.end();
  }

  if (req.method === 'PUT') {
    req.on('data',  function(chunk){
      data += chunk.toString('UTF-8');
    });

    req.on('end', function() {
      // empty 200 OK response for now
      console.log('data', data);
      res.writeHead(200, "OK", {'Content-Type': 'application/json'});
      res.end();
    });

    /*var userId = ++userCurrentNum;
    var role = 'student';
    var dataToSend = {role: role, id: userId};
    res.writeHead(200, {
      "Control-Allow-Origin": "*",
      "Control-Allow-Methods": "GET, POST, PUT",
      "Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(dataToSend));*/
    res.end();
  }

});
if (module.parent) {
  module.exports = server
} else {
  server.listen(20007);
}

